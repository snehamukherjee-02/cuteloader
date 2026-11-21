/**
 * Minimal Chrome DevTools Protocol client for QA scripts (no dependencies:
 * Node 22+ ships a global WebSocket). Launches headless Chrome, opens pages,
 * evaluates code, and records console errors and uncaught exceptions.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export function findChrome(): string {
  const c = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((p) => p && existsSync(p));
  if (!c) throw new Error("Chrome/Edge not found (set CHROME_PATH)");
  return c;
}

export interface ConsoleEntry {
  type: string;
  text: string;
  url?: string;
}

export class Browser {
  private proc!: ChildProcess;
  private profile!: string;
  private ws!: WebSocket;
  private id = 0;
  private pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();
  private listeners = new Set<(method: string, params: Record<string, unknown>) => void>();
  readonly logs: ConsoleEntry[] = [];

  static async launch(extraArgs: string[] = [], port = 9300 + Math.floor(Math.random() * 500)): Promise<Browser> {
    const b = new Browser();
    b.profile = mkdtempSync(join(tmpdir(), "cl-cdp-"));
    b.proc = spawn(
      findChrome(),
      ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, `--user-data-dir=${b.profile}`, ...extraArgs, "about:blank"],
      { stdio: "ignore" },
    );
    let target: { webSocketDebuggerUrl: string } | undefined;
    for (let i = 0; i < 100 && !target; i++) {
      await new Promise((r) => setTimeout(r, 100));
      try {
        const list = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()) as { type: string; webSocketDebuggerUrl: string }[];
        target = list.find((t) => t.type === "page");
      } catch {
        /* not up yet */
      }
    }
    if (!target) throw new Error("Chrome did not start");
    b.ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise<void>((res, rej) => {
      b.ws.onopen = () => res();
      b.ws.onerror = () => rej(new Error("CDP websocket failed"));
    });
    b.ws.onmessage = (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && b.pending.has(msg.id)) {
        const p = b.pending.get(msg.id)!;
        b.pending.delete(msg.id);
        if (msg.error) p.reject(new Error(msg.error.message));
        else p.resolve(msg.result);
      } else if (msg.method) {
        b.onEvent(msg.method, msg.params ?? {});
        for (const l of b.listeners) l(msg.method, msg.params ?? {});
      }
    };
    await b.send("Runtime.enable");
    await b.send("Page.enable");
    await b.send("Log.enable");
    await b.send("Network.enable");
    return b;
  }

  private onEvent(method: string, params: Record<string, unknown>) {
    if (method === "Runtime.consoleAPICalled") {
      const args = (params.args as { value?: unknown; description?: string }[]) ?? [];
      this.logs.push({ type: String(params.type), text: args.map((a) => String(a.value ?? a.description ?? "")).join(" ") });
    } else if (method === "Runtime.exceptionThrown") {
      const d = params.exceptionDetails as { text?: string; exception?: { description?: string }; url?: string };
      this.logs.push({ type: "exception", text: d.exception?.description ?? d.text ?? "exception", url: d.url });
    } else if (method === "Log.entryAdded") {
      const e = params.entry as { level: string; text: string; url?: string };
      this.logs.push({ type: `log-${e.level}`, text: e.url ? `${e.text} [${e.url}]` : e.text, url: e.url });
    }
  }

  send<T = Record<string, unknown>>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve: resolve as (v: unknown) => void, reject }));
  }

  /** Navigate and wait for the load event (plus a short settle period). Returns the main document status. */
  async goto(url: string, settleMs = 400): Promise<number> {
    let status = 0;
    const onResponse = (method: string, params: Record<string, unknown>) => {
      if (method === "Network.responseReceived" && params.type === "Document" && !status) {
        status = Number((params.response as { status: number }).status);
      }
    };
    this.listeners.add(onResponse);
    const loaded = new Promise<void>((res) => {
      const l = (method: string) => {
        if (method === "Page.loadEventFired") {
          this.listeners.delete(l);
          res();
        }
      };
      this.listeners.add(l);
    });
    await this.send("Page.navigate", { url });
    await Promise.race([loaded, new Promise((r) => setTimeout(r, 30000))]);
    await new Promise((r) => setTimeout(r, settleMs));
    this.listeners.delete(onResponse);
    return status;
  }

  async evaluate<T>(expression: string, timeoutMs = 300000): Promise<T> {
    const res = await Promise.race([
      this.send<{ result: { value: T }; exceptionDetails?: { exception?: { description?: string }; text?: string } }>("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      }),
      new Promise<never>((_, rej) => setTimeout(() => rej(new Error("evaluate timeout")), timeoutMs)),
    ]);
    if (res.exceptionDetails) throw new Error(res.exceptionDetails.exception?.description ?? res.exceptionDetails.text ?? "evaluation failed");
    return res.result.value;
  }

  async setViewport(width: number, height: number, mobile = false) {
    await this.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  }

  async screenshot(): Promise<Buffer> {
    const r = await this.send<{ data: string }>("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    return Buffer.from(r.data, "base64");
  }

  async close() {
    try {
      this.ws.close();
    } catch {
      /* ignore */
    }
    this.proc.kill();
    await new Promise((r) => setTimeout(r, 300));
    try {
      rmSync(this.profile, { recursive: true, force: true });
    } catch {
      /* chrome may still hold files */
    }
  }
}

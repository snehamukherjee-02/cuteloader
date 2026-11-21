/**
 * Export QA: generates every export format for every loader (default + a customized
 * config) and verifies them OUTSIDE the app.
 *
 *   node scripts/test-exports.ts
 *
 *  - HTML: standalone demo documents load in Chrome and the loader animates
 *  - SVG:  files parse as XML, load as <img>, and animate inline
 *  - JS:   window.CuteLoader mount/show/hide/track behave as documented
 *  - Embed: one-piece snippet renders and animates
 *  - React: components type-check with tsc (strict) and render with react-dom/server
 */
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { defaultConfig, sanitizeConfig } from "../src/lib/engine.ts";
import {
  exportEmbed,
  exportHtmlDocument,
  exportJs,
  exportReact,
  exportSvg,
  componentName,
} from "../src/lib/codegen.ts";
import type { AnimationSource, LoaderConfig } from "../src/types/animation.ts";

const require = createRequire(import.meta.url);
const CATEGORIES = ["cute", "abstract", "minimal", "technology", "nature", "business", "food"];
const loaders: AnimationSource[] = [];
for (const c of CATEGORIES) {
  const p = resolve(`src/animations/${c}.ts`);
  if (existsSync(p)) loaders.push(...((await import(pathToFileURL(p).href)).default as AnimationSource[]));
}
console.log(`Testing exports for ${loaders.length} loaders…`);

const out = resolve(".scratch/exports");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "react"), { recursive: true });
const o = { siteUrl: "https://example.com", attribution: true };

function customized(def: AnimationSource): LoaderConfig {
  return sanitizeConfig(def, {
    ...defaultConfig(def),
    primary: "#ef4444",
    secondary: "#0ea5e9",
    accent: "#22c55e",
    size: 88,
    speed: 1.7,
    stroke: (def.stroke ?? 4) + 1.5,
    intensity: 1.3,
    reverse: true,
    transparent: false,
    background: "#fff7ed",
  });
}

const failures: string[] = [];

/* --------------------------- write all files --------------------------- */
for (const def of loaders) {
  const dir = join(out, def.slug);
  mkdirSync(dir, { recursive: true });
  for (const [tag, cfg] of [["default", defaultConfig(def)], ["custom", customized(def)]] as const) {
    writeFileSync(join(dir, `demo-${tag}.html`), exportHtmlDocument(def, cfg, o));
    writeFileSync(join(dir, `${tag}.svg`), exportSvg(def, cfg, o));
    writeFileSync(join(dir, `embed-${tag}.html`), `<!doctype html><meta charset="utf-8"><body>${exportEmbed(def, cfg, { ...o, attribution: tag === "default" })}</body>`);
  }
  writeFileSync(join(dir, "loader.js"), exportJs(def, customized(def), o));
  writeFileSync(join(out, "react", `${componentName(def)}.tsx`), exportReact(def, customized(def), o));
  // Plain-JS syntax check.
  try {
    execFileSync(process.execPath, ["--check", join(dir, "loader.js")], { stdio: "pipe" });
  } catch (e) {
    failures.push(`${def.slug}: JS export has a syntax error: ${(e as Error).message.split("\n")[0]}`);
  }
}

/* --------------------------- React: tsc + SSR --------------------------- */
const names = loaders.map((d) => componentName(d));
writeFileSync(
  join(out, "react", "index.tsx"),
  names.map((n) => `export { ${n} } from "./${n}";`).join("\n") +
    `\nimport { ${names.join(", ")} } from "./index";\nexport const all = [${names.join(", ")}];\n`,
);
writeFileSync(
  join(out, "react", "usage.tsx"),
  names
    .slice(0, 5)
    .map((n) => `import { ${n} } from "./${n}";`)
    .join("\n") +
    `\nexport function Usage() {\n  return (<div>${names
      .slice(0, 5)
      .map((n) => `<${n} size={40} speed={2} label="Busy" className="x" />`)
      .join("")}</div>);\n}\n`,
);
writeFileSync(
  join(out, "react", "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "Bundler",
        jsx: "react-jsx",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        typeRoots: [resolve("node_modules/@types")],
        types: ["react"],
      },
      include: ["./*.tsx"],
    },
    null,
    2,
  ),
);
try {
  execFileSync(process.execPath, [require.resolve("typescript/bin/tsc"), "-p", join(out, "react", "tsconfig.json")], {
    stdio: "pipe",
    cwd: resolve("."),
  });
  console.log("✓ React exports type-check (tsc --strict)");
} catch (e) {
  const msg = String((e as { stdout?: Buffer }).stdout ?? e).slice(0, 2000);
  failures.push(`React exports failed type-checking:\n${msg}`);
}

const ts = require("typescript") as typeof import("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ssrPages: string[] = [];
for (const def of loaders) {
  const name = componentName(def);
  const src = exportReact(def, customized(def), o);
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} as Record<string, unknown> };
  new Function("require", "module", "exports", js)(require, mod, mod.exports);
  const Comp = mod.exports[name] as (p: object) => unknown;
  if (typeof Comp !== "function" || mod.exports.default !== Comp) {
    failures.push(`${def.slug}: React export does not export ${name} (named + default)`);
    continue;
  }
  const html: string = renderToStaticMarkup(React.createElement(Comp, { size: 64, label: "Loading test" }));
  if (!html.includes('role="status"') || !html.includes("<svg") || !html.includes("Loading test")) {
    failures.push(`${def.slug}: React SSR output is missing status role, svg or label`);
  }
  ssrPages.push(`<section data-slug="${def.slug}" data-kind="react">${html}</section>`);
}
console.log(`✓ React components rendered with react-dom/server (${ssrPages.length})`);
writeFileSync(join(out, "react-ssr.html"), `<!doctype html><meta charset="utf-8"><body>${ssrPages.join("\n")}</body>`);

/* --------------------------- browser harness --------------------------- */
const harness = `<!doctype html><html><head><meta charset="utf-8"><title>export harness</title></head><body>
<div id="react-host"></div><pre id="out"></pre>
<script>
const slugs = ${JSON.stringify(loaders.map((l) => l.slug))};
const results = { failures: [], checked: 0 };
const fail = (m) => results.failures.push(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
function loadFrame(src) {
  return new Promise((resolve, reject) => {
    const f = document.createElement("iframe");
    f.style.cssText = "width:320px;height:240px";
    f.onload = () => resolve(f);
    f.onerror = reject;
    f.src = src;
    document.body.appendChild(f);
  });
}
function animated(svg) { return svg && svg.getAnimations({ subtree: true }).length > 0; }
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = () => reject(new Error("script failed: " + src));
    document.head.appendChild(s);
  });
}
(async () => {
  for (const slug of slugs) {
    // HTML documents + embed snippets (standalone pages)
    for (const page of ["demo-default.html", "demo-custom.html", "embed-default.html", "embed-custom.html"]) {
      const f = await loadFrame(slug + "/" + page);
      const doc = f.contentDocument;
      const svg = doc.querySelector("svg");
      const status = doc.querySelector('[role="status"]');
      if (!svg || !status) fail(slug + "/" + page + ": missing svg or status wrapper");
      else if (!animated(svg)) fail(slug + "/" + page + ": loader does not animate");
      else if (svg.getBoundingClientRect().width < 10) fail(slug + "/" + page + ": loader has no size");
      if (page.includes("custom") && svg) {
        const cs = getComputedStyle(svg);
        if (cs.getPropertyValue("--c1").trim() !== "#ef4444") fail(slug + "/" + page + ": customized color not applied");
      }
      f.remove();
      results.checked++;
    }
    // SVG files: XML-valid, loadable as <img>, animated inline
    for (const file of ["default.svg", "custom.svg"]) {
      const text = await (await fetch(slug + "/" + file)).text();
      const xml = new DOMParser().parseFromString(text, "image/svg+xml");
      if (xml.querySelector("parsererror")) { fail(slug + "/" + file + ": invalid XML"); continue; }
      const ok = await new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth > 0); i.onerror = () => res(false); i.src = slug + "/" + file; });
      if (!ok) fail(slug + "/" + file + ": does not load as <img>");
      const holder = document.createElement("div");
      holder.innerHTML = text.replace(/<!--[\\s\\S]*?-->/, "");
      document.body.appendChild(holder);
      await wait(20);
      if (!animated(holder.querySelector("svg"))) fail(slug + "/" + file + ": SVG does not animate");
      holder.remove();
      results.checked++;
    }
    // JavaScript export API
    try {
      delete window.CuteLoader;
      await loadScript(slug + "/loader.js");
      const api = window.CuteLoader;
      if (!api) throw new Error("window.CuteLoader missing");
      const box = document.createElement("div"); document.body.appendChild(box);
      const node = api.mount(box, { label: "Mounted" });
      if (!node.querySelector("svg") || node.getAttribute("role") !== "status" || !node.textContent.includes("Mounted")) fail(slug + "/loader.js: mount() output wrong");
      await wait(10);
      if (!animated(node.querySelector("svg"))) fail(slug + "/loader.js: mounted loader does not animate");
      box.remove();
      const overlay = () => document.querySelector(".cl-overlay");
      api.show(); api.show();
      if (!overlay() || overlay().hidden) fail(slug + "/loader.js: show() did not display overlay");
      api.hide();
      if (overlay().hidden) fail(slug + "/loader.js: hide() is not reference-counted");
      api.hide();
      if (!overlay().hidden) fail(slug + "/loader.js: overlay still visible after balanced hide()");
      const v = await api.track(Promise.resolve(42));
      if (v !== 42) fail(slug + "/loader.js: track() did not resolve with the original value");
      if (!overlay().hidden) fail(slug + "/loader.js: overlay visible after track() settled");
      let rejected = false;
      await api.track(Promise.reject(new Error("x"))).catch(() => { rejected = true; });
      if (!rejected || !overlay().hidden) fail(slug + "/loader.js: track() rejection not propagated/cleaned up");
      overlay().remove();
      api.show({ delay: 80 }); api.hide();
      await wait(120);
      if (document.querySelector(".cl-overlay")) fail(slug + "/loader.js: delayed show() appeared after hide()");
      document.querySelectorAll('style[id^="cl-style-"]').forEach((s) => s.remove());
      results.checked++;
    } catch (e) { fail(slug + "/loader.js: " + e.message); }
  }
  // React SSR markup animates in a real browser
  const ssr = await (await fetch("react-ssr.html")).text();
  const host = document.getElementById("react-host");
  host.innerHTML = new DOMParser().parseFromString(ssr, "text/html").body.innerHTML;
  await wait(30);
  for (const sec of host.querySelectorAll("section[data-kind=react]")) {
    if (!animated(sec.querySelector("svg"))) fail(sec.dataset.slug + ": React SSR markup does not animate");
    results.checked++;
  }
  document.getElementById("out").textContent = "RESULT_START" + JSON.stringify(results) + "RESULT_END";
})().catch((e) => { document.getElementById("out").textContent = "RESULT_START" + JSON.stringify({ failures: ["harness crashed: " + e.message], checked: 0 }) + "RESULT_END"; });
</script></body></html>`;
writeFileSync(join(out, "harness.html"), harness);

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((c) => c && existsSync(c));
if (!chrome) {
  console.log("! Chrome not found; skipping browser checks");
} else {
  const profile = mkdtempSync(join(tmpdir(), "cl-exp-"));
  let dom = "";
  try {
    dom = execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--allow-file-access-from-files",
        `--user-data-dir=${profile}`,
        "--virtual-time-budget=600000",
        "--dump-dom",
        pathToFileURL(join(out, "harness.html")).href,
      ],
      { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"], timeout: 600000 },
    );
  } finally {
    try { rmSync(profile, { recursive: true, force: true }); } catch { /* ignore */ }
  }
  const m = dom.match(/RESULT_START([\s\S]*?)RESULT_END/);
  if (!m) {
    failures.push("browser harness produced no result");
  } else {
    const r = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    console.log(`✓ Browser checks run: ${r.checked}`);
    failures.push(...r.failures);
  }
}

if (failures.length) {
  console.log(`\n✗ ${failures.length} problem(s):`);
  for (const f of failures.slice(0, 80)) console.log("  - " + f);
  process.exit(1);
}
console.log(`\nAll export checks passed for ${loaders.length} loaders.`);

"use client";

import { Download, Film, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AnimationSource, LoaderConfig } from "@/types/animation";
import { downloadFile } from "@/lib/clipboard";
import { track } from "@/lib/analytics";
import { Segmented, ToggleField } from "@/components/editor/controls";

export function GifExporter({ def, cfg }: { def: AnimationSource; cfg: LoaderConfig }) {
  const [size, setSize] = useState("160");
  const [fps, setFps] = useState("25");
  const [transparent, setTransparent] = useState(cfg.transparent);
  // Everything that affects the output. A render only counts while its key still matches,
  // so changing any setting invalidates the previous GIF without an effect.
  const key = JSON.stringify([def.slug, cfg, size, fps, transparent]);
  const [job, setJob] = useState<{
    key: string;
    status: "idle" | "working" | "done" | "error";
    progress: number;
    message?: string;
    result?: { url: string; blob: Blob };
  }>({ key: "", status: "idle", progress: 0 });
  const abort = useRef<AbortController | null>(null);
  const lastUrl = useRef<string | null>(null);

  const state: typeof job = job.key === key ? job : { key, status: "idle", progress: 0 };
  const result = state.result ?? null;

  useEffect(
    () => () => {
      abort.current?.abort();
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
    },
    [],
  );

  const background = cfg.transparent ? "#ffffff" : cfg.background;

  const run = async () => {
    abort.current?.abort();
    const ctrl = new AbortController();
    abort.current = ctrl;
    const runKey = key;
    setJob({ key: runKey, status: "working", progress: 0 });
    try {
      const { renderGif } = await import("@/lib/gif-capture");
      const blob = await renderGif({
        def,
        cfg,
        size: Number(size),
        fps: Number(fps),
        transparent,
        background,
        signal: ctrl.signal,
        onProgress: (p) => setJob({ key: runKey, status: "working", progress: p }),
      });
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
      const url = URL.createObjectURL(blob);
      lastUrl.current = url;
      setJob({ key: runKey, status: "done", progress: 1, result: { url, blob } });
      track("gif_export", { slug: def.slug, size: Number(size), fps: Number(fps) });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setJob({
        key: runKey,
        status: "error",
        progress: 0,
        message:
          (e as Error).name === "SecurityError"
            ? "Your browser blocked reading the rendered frames. Try a current Chrome, Edge or Firefox."
            : (e as Error).message || "Something went wrong while rendering.",
      });
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          GIF export captures one seamless loop of your customized loader frame by frame, right here in your browser.
          GIFs are larger than CSS/SVG and only support 256 colors with hard-edged transparency, so use them where code
          isn&apos;t an option: emails, slide decks, chat apps or no-code builders.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Size</span>
          <Segmented
            label="GIF size"
            size="sm"
            value={size}
            onChange={setSize}
            options={[
              { value: "96", label: "96px" },
              { value: "160", label: "160px" },
              { value: "240", label: "240px" },
              { value: "320", label: "320px" },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Frame rate</span>
          <Segmented
            label="GIF frame rate"
            size="sm"
            value={fps}
            onChange={setFps}
            options={[
              { value: "20", label: "20 fps" },
              { value: "25", label: "25 fps" },
              { value: "50", label: "50 fps" },
            ]}
          />
        </div>
        <ToggleField
          label="Transparent background"
          description={`Edges are blended onto ${background.toUpperCase()}. Use a solid background for the cleanest result.`}
          checked={transparent}
          onChange={setTransparent}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={run}
            disabled={state.status === "working"}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-strong disabled:opacity-60"
          >
            {state.status === "working" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Film className="h-4 w-4" aria-hidden="true" />
            )}
            {state.status === "working" ? `Rendering… ${Math.round(state.progress * 100)}%` : "Render GIF"}
          </button>
          {result && (
            <button
              type="button"
              onClick={() => {
                downloadFile(`${def.slug}.gif`, result.blob);
                track("download", { slug: def.slug, format: "gif" });
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-2"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download GIF ({Math.max(1, Math.round(result.blob.size / 1024))} KB)
            </button>
          )}
        </div>
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
      <div className="checker grid min-h-56 place-items-center rounded-2xl border border-border p-4" aria-live="polite">
        {result ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={result.url} alt={`Animated GIF of the ${def.name} loader`} className="max-w-full" />
        ) : (
          <p className="max-w-[16rem] text-center text-sm text-subtle">
            {state.status === "working" ? "Capturing frames…" : "Your GIF preview will appear here."}
          </p>
        )}
      </div>
    </div>
  );
}

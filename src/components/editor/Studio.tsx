"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Copy,
  Download,
  Link2,
  Pause,
  Play,
  Redo2,
  RotateCcw,
  RefreshCw,
  Shuffle,
  Undo2,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Grid2x2,
} from "lucide-react";
import type { AnimationSource, CategoryId, LoaderConfig } from "@/types/animation";
import { buildCss, buildSvg, cycleSeconds, defaultConfig, LIMITS, sanitizeConfig } from "@/lib/engine";
import { exportConfig, FILE_NAMES } from "@/lib/codegen";
import { copyText, downloadFile } from "@/lib/clipboard";
import { track } from "@/lib/analytics";
import { loadAnimation } from "@/animations/load";
import { ColorField, ControlGroup, IconButton, Segmented, SliderField, ToggleField } from "./controls";
import { ExportPanel, type ExportTab } from "@/components/export/ExportPanel";

/* ------------------------------ history ------------------------------ */

interface History {
  past: LoaderConfig[];
  present: LoaderConfig;
  future: LoaderConfig[];
  lastPush: number;
}

type Action =
  | { type: "set"; patch: Partial<LoaderConfig>; coalesce?: boolean }
  | { type: "replace"; cfg: LoaderConfig }
  | { type: "undo" }
  | { type: "redo" };

function reducer(s: History, a: Action): History {
  switch (a.type) {
    case "set": {
      const next = { ...s.present, ...a.patch };
      const now = Date.now();
      // Slider drags arrive as many events; fold them into one undo step.
      if (a.coalesce && now - s.lastPush < 600) return { ...s, present: next, future: [], lastPush: now };
      return { past: [...s.past, s.present].slice(-80), present: next, future: [], lastPush: now };
    }
    case "replace":
      return { past: [...s.past, s.present].slice(-80), present: a.cfg, future: [], lastPush: 0 };
    case "undo":
      if (!s.past.length) return s;
      return { past: s.past.slice(0, -1), present: s.past[s.past.length - 1], future: [s.present, ...s.future], lastPush: 0 };
    case "redo":
      if (!s.future.length) return s;
      return { past: [...s.past, s.present], present: s.future[0], future: s.future.slice(1), lastPush: 0 };
  }
}

/* ------------------------------ palettes ------------------------------ */

const PALETTES: [string, string, string][] = [
  ["#8b5cf6", "#f472b6", "#fbbf24"],
  ["#6366f1", "#22d3ee", "#a78bfa"],
  ["#10b981", "#84cc16", "#facc15"],
  ["#f43f5e", "#fb923c", "#fde68a"],
  ["#0ea5e9", "#6366f1", "#f0abfc"],
  ["#ec4899", "#8b5cf6", "#38bdf8"],
  ["#14b8a6", "#0ea5e9", "#a3e635"],
  ["#f97316", "#ef4444", "#facc15"],
  ["#334155", "#94a3b8", "#38bdf8"],
  ["#c084fc", "#f9a8d4", "#fef08a"],
  ["#2563eb", "#7dd3fc", "#fbbf24"],
  ["#059669", "#6ee7b7", "#fda4af"],
];

/* ------------------------------ share links ------------------------------ */

function encodeShare(slug: string, cfg: LoaderConfig): string {
  const json = JSON.stringify({ l: slug, ...cfg });
  return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeShare(value: string): (Partial<LoaderConfig> & { l?: string }) | null {
  try {
    const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(b64))));
  } catch {
    return null;
  }
}

type BgMode = "checker" | "light" | "dark";

export interface CatalogEntry {
  slug: string;
  name: string;
  category: CategoryId;
  /** Display name of the category, used for picker groups. */
  categoryName?: string;
}

export function Studio({
  def: initialDef,
  siteUrl,
  catalog,
  initialTab = "html",
  sharePath,
}: {
  def: AnimationSource;
  siteUrl: string;
  /** When provided, the studio shows a loader picker (generator pages). */
  catalog?: CatalogEntry[];
  initialTab?: ExportTab;
  /** Path used for share links (defaults to the loader's own page). */
  sharePath?: string;
}) {
  const [def, setDef] = useState(initialDef);
  const [hist, dispatch] = useReducer(reducer, undefined, () => ({
    past: [],
    present: defaultConfig(initialDef),
    future: [],
    lastPush: 0,
  }));
  const cfg = hist.present;
  const [bg, setBg] = useState<BgMode>("checker");
  const [zoom, setZoom] = useState<"0.5" | "1" | "2">("1");
  const [paused, setPaused] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [switching, setSwitching] = useState(false);
  const customized = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 1800);
  };

  const set = useCallback((patch: Partial<LoaderConfig>, coalesce = false) => {
    dispatch({ type: "set", patch, coalesce });
    if (!customized.current) {
      customized.current = true;
      track("customize_click", { slug: def.slug });
    }
  }, [def.slug]);

  const switchTo = useCallback(
    async (category: CategoryId, slug: string, cfgOverride?: Partial<LoaderConfig>) => {
      setSwitching(true);
      try {
        const next = await loadAnimation(category, slug);
        if (!next) return;
        setDef(next);
        dispatch({ type: "replace", cfg: sanitizeConfig(next, { ...defaultConfig(next), ...cfgOverride }) });
        track("animation_preview", { slug: next.slug, source: "generator" });
      } finally {
        setSwitching(false);
      }
    },
    [],
  );

  // Sync with the URL hash (#c=...): restores shared configurations on load and
  // when a share link is pasted into the same tab.
  useEffect(() => {
    const applyHash = () => {
      const m = window.location.hash.match(/[#&]c=([\w-]+)/);
      if (!m) return;
      const data = decodeShare(m[1]);
      if (!data) return;
      if (catalog && data.l && data.l !== initialDef.slug) {
        const entry = catalog.find((c) => c.slug === data.l);
        if (entry) void switchTo(entry.category, entry.slug, data);
      } else if (!data.l || data.l === initialDef.slug) {
        dispatch({ type: "replace", cfg: sanitizeConfig(initialDef, data) });
      }
      document.getElementById("studio")?.scrollIntoView({ block: "start" });
    };
    const frame = requestAnimationFrame(applyHash);
    window.addEventListener("hashchange", applyHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", applyHash);
    };
  }, [catalog, initialDef, switchTo]);

  // Keyboard shortcuts: Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z / Ctrl+Y (ignored while typing in a text field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "INPUT" && (el as HTMLInputElement).type !== "range")) return;
      if (!(e.ctrlKey || e.metaKey)) return;
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "undo" });
      } else if ((k === "z" && e.shiftKey) || k === "y") {
        e.preventDefault();
        dispatch({ type: "redo" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const zoomN = Number(zoom);
  const css = useMemo(() => buildCss(def, cfg), [def, cfg]);
  const svg = useMemo(
    () => buildSvg(def, { ...cfg, size: Math.round(cfg.size * zoomN) }, { label: `${def.name} preview` }),
    [def, cfg, zoomN],
  );

  const labels = def.colorLabels ?? {};
  const files = FILE_NAMES(def);
  const idx = catalog ? catalog.findIndex((c) => c.slug === def.slug) : -1;

  const previewBg =
    bg === "light" ? "bg-white" : bg === "dark" ? "bg-[#15131c]" : "checker";

  const shareUrl = () => `${siteUrl}${sharePath ?? `/animations/${def.category}/${def.slug}/`}#c=${encodeShare(def.slug, cfg)}`;

  const importConfig = async (file: File) => {
    try {
      const data = JSON.parse(await file.text());
      if (catalog && typeof data.loader === "string" && data.loader !== def.slug) {
        const entry = catalog.find((c) => c.slug === data.loader);
        if (entry) {
          await switchTo(entry.category, entry.slug, data);
          notify("Configuration loaded");
          return;
        }
      }
      dispatch({ type: "replace", cfg: sanitizeConfig(def, data) });
      notify("Configuration loaded");
    } catch {
      notify("That file isn't a valid configuration");
    }
  };

  return (
    <div className="space-y-5">
      {catalog && (
        <div className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-3 shadow-soft sm:flex-row sm:items-center">
          <label htmlFor="studio-pick" className="px-1 text-sm font-semibold">
            Loader
          </label>
          <div className="flex flex-1 items-center gap-2">
            <IconButton
              label="Previous loader"
              onClick={() => {
                const p = catalog[(idx - 1 + catalog.length) % catalog.length];
                void switchTo(p.category, p.slug);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </IconButton>
            <select
              id="studio-pick"
              value={def.slug}
              onChange={(e) => {
                const entry = catalog.find((c) => c.slug === e.target.value);
                if (entry) void switchTo(entry.category, entry.slug);
              }}
              className="h-9 min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3 text-sm font-medium outline-none focus:border-brand"
            >
              {[...new Set(catalog.map((c) => c.category))].map((cat) => {
                const items = catalog.filter((c) => c.category === cat);
                return (
                  <optgroup key={cat} label={items[0].categoryName ?? cat}>
                    {items.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            <IconButton
              label="Next loader"
              onClick={() => {
                const n = catalog[(idx + 1) % catalog.length];
                void switchTo(n.category, n.slug);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </IconButton>
            <IconButton
              label="Random loader"
              onClick={() => {
                const others = catalog.filter((c) => c.slug !== def.slug);
                const r = others[Math.floor(Math.random() * others.length)];
                void switchTo(r.category, r.slug);
              }}
            >
              <Shuffle className="h-4 w-4" />
            </IconButton>
          </div>
          <a href={`/animations/${def.category}/${def.slug}/`} className="px-1 text-sm font-semibold text-brand-strong hover:underline">
            About this loader
          </a>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* ---------------- Preview ---------------- */}
        <section aria-label="Live preview" className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-4">
            <div className="flex items-center gap-1.5">
              <IconButton label={paused ? "Play animation" : "Pause animation"} onClick={() => setPaused((p) => !p)} active={paused}>
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </IconButton>
              <IconButton
                label="Restart animation"
                onClick={() => {
                  setRestartKey((k) => k + 1);
                  setPaused(false);
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </IconButton>
              <span className="ml-1 hidden font-mono text-xs text-subtle sm:inline">
                {cycleSeconds(def, cfg)}s cycle{!cfg.loop ? " · plays once" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Segmented
                label="Preview background"
                size="sm"
                value={bg}
                onChange={setBg}
                options={[
                  { value: "checker", label: "Transparent", icon: <Grid2x2 className="h-3.5 w-3.5" aria-hidden="true" /> },
                  { value: "light", label: "Light", icon: <Sun className="h-3.5 w-3.5" aria-hidden="true" /> },
                  { value: "dark", label: "Dark", icon: <Moon className="h-3.5 w-3.5" aria-hidden="true" /> },
                ]}
              />
              <Segmented
                label="Preview zoom"
                size="sm"
                value={zoom}
                onChange={setZoom}
                options={[
                  { value: "0.5", label: "½×" },
                  { value: "1", label: "1×" },
                  { value: "2", label: "2×" },
                ]}
              />
            </div>
          </div>
          <div
            className={`relative grid min-h-[300px] flex-1 place-items-center overflow-auto p-6 sm:min-h-[380px] ${previewBg}`}
            data-cl-paused={paused ? "" : undefined}
            aria-busy={switching}
          >
            <div key={`${def.slug}-${restartKey}`} className="grid place-items-center">
              <style>{css}</style>
              <div
                className="grid place-items-center"
                style={cfg.transparent ? undefined : { background: cfg.background, padding: 16 * zoomN, borderRadius: 16 * zoomN }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
            {switching && <span className="absolute bottom-3 right-4 text-xs text-subtle">Loading…</span>}
          </div>
        </section>

        {/* ---------------- Controls ---------------- */}
        <section aria-labelledby="customize-heading" className="rounded-3xl border border-border bg-surface shadow-soft">
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
            <h2 id="customize-heading" className="text-lg font-extrabold tracking-tight">
              Customize
            </h2>
            <div className="flex items-center gap-1.5">
              <IconButton label="Undo (Ctrl+Z)" onClick={() => dispatch({ type: "undo" })} disabled={!hist.past.length}>
                <Undo2 className="h-4 w-4" />
              </IconButton>
              <IconButton label="Redo (Ctrl+Shift+Z)" onClick={() => dispatch({ type: "redo" })} disabled={!hist.future.length}>
                <Redo2 className="h-4 w-4" />
              </IconButton>
              <IconButton
                label="Reset to defaults"
                onClick={() => {
                  dispatch({ type: "replace", cfg: defaultConfig(def) });
                  notify("Reset to defaults");
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          <ControlGroup
            title="Colors"
            aside={
              <button
                type="button"
                onClick={() => {
                  const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
                  set({ primary: p[0], secondary: p[1], accent: p[2] });
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-brand-strong hover:bg-brand-soft"
              >
                <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
                Shuffle
              </button>
            }
          >
            <ColorField label={labels.primary ?? "Primary"} value={cfg.primary} onChange={(v) => set({ primary: v }, true)} />
            <ColorField label={labels.secondary ?? "Secondary"} value={cfg.secondary} onChange={(v) => set({ secondary: v }, true)} />
            {def.colors.accent && (
              <ColorField label={labels.accent ?? "Accent"} value={cfg.accent} onChange={(v) => set({ accent: v }, true)} />
            )}
          </ControlGroup>

          <ControlGroup title="Background">
            <ToggleField
              label="Transparent"
              description="Turn off to export with a solid background."
              checked={cfg.transparent}
              onChange={(v) => set({ transparent: v })}
            />
            <ColorField label="Background" value={cfg.background} disabled={cfg.transparent} onChange={(v) => set({ background: v, transparent: false }, true)} />
          </ControlGroup>

          <ControlGroup title="Motion & size">
            <SliderField
              label="Size"
              unit="px"
              value={cfg.size}
              min={LIMITS.size.min}
              max={LIMITS.size.max}
              step={LIMITS.size.step}
              onChange={(v) => set({ size: v }, true)}
            />
            <SliderField
              label="Speed"
              numeric={false}
              value={cfg.speed}
              min={LIMITS.speed.min}
              max={LIMITS.speed.max}
              step={LIMITS.speed.step}
              format={(v) => `${v.toFixed(2)}× · ${cycleSeconds(def, { speed: v })}s`}
              onChange={(v) => set({ speed: v }, true)}
            />
            {def.stroke != null && (
              <SliderField
                label="Stroke width"
                numeric={false}
                value={cfg.stroke}
                min={LIMITS.stroke.min}
                max={LIMITS.stroke.max}
                step={LIMITS.stroke.step}
                format={(v) => v.toFixed(1)}
                onChange={(v) => set({ stroke: v }, true)}
              />
            )}
            {def.intensity && (
              <SliderField
                label="Intensity"
                numeric={false}
                value={cfg.intensity}
                min={LIMITS.intensity.min}
                max={LIMITS.intensity.max}
                step={LIMITS.intensity.step}
                format={(v) => `${Math.round(v * 100)}%`}
                onChange={(v) => set({ intensity: v }, true)}
              />
            )}
            {def.direction && (
              <ToggleField label="Reverse direction" checked={cfg.reverse} onChange={(v) => set({ reverse: v })} />
            )}
            <ToggleField label="Loop" description="Off = play one cycle, then stop." checked={cfg.loop} onChange={(v) => set({ loop: v })} />
          </ControlGroup>

          <div className="grid grid-cols-2 gap-2 border-t border-border p-4 sm:px-5">
            <button
              type="button"
              onClick={async () => {
                if (await copyText(exportConfig(def, cfg))) notify("Configuration copied");
              }}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-surface-2 hover:text-text"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Copy config
            </button>
            <button
              type="button"
              onClick={() => {
                downloadFile(files.config, exportConfig(def, cfg), "application/json");
                track("download", { slug: def.slug, format: "config" });
              }}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-surface-2 hover:text-text"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download config
            </button>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-surface-2 hover:text-text"
            >
              <Upload className="h-3.5 w-3.5" aria-hidden="true" /> Load config
            </button>
            <button
              type="button"
              onClick={async () => {
                if (await copyText(shareUrl())) notify("Share link copied");
              }}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-surface-2 hover:text-text"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> Share link
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importConfig(f);
                e.target.value = "";
              }}
            />
          </div>
          <p className="min-h-6 px-5 pb-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400" role="status" aria-live="polite">
            {flash && (
              <span className="inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                {flash}
              </span>
            )}
          </p>
        </section>
      </div>

      <ExportPanel def={def} cfg={cfg} siteUrl={siteUrl} initialTab={initialTab} />
    </div>
  );
}

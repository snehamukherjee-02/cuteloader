/**
 * Code generators. Every export is produced from the same engine output that
 * drives the live preview, so copied code always matches what the user sees.
 */
import type { AnimationSource, LoaderConfig } from "@/types/animation";
import { buildCss, buildSvg, className, cssVariables, cycleSeconds, formatCss, minifyCss, pixelSize } from "./engine";
import { prettyMarkup, svgToJsx } from "./markup";

export type ExportFormat = "html" | "react" | "svg" | "js" | "embed";

export interface ExportOptions {
  /** Absolute site URL, used for the optional attribution link. */
  siteUrl: string;
  /** Include the optional credit comment + link. */
  attribution: boolean;
  /** Screen-reader label. */
  label?: string;
}

type Def = Pick<
  AnimationSource,
  "slug" | "name" | "category" | "css" | "svg" | "colors" | "colorLabels" | "duration" | "viewBox" | "stroke" | "intensity" | "direction"
>;

export function pageUrl(def: Pick<AnimationSource, "slug" | "category">, siteUrl: string): string {
  return `${siteUrl}/animations/${def.category}/${def.slug}/`;
}

export function componentName(def: Pick<AnimationSource, "name">): string {
  const base = def.name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  return `${/^[0-9]/.test(base) ? "L" : ""}${base}Loader`;
}

const HELPER_CSS =
  ".cl-wrap{display:inline-grid;place-items:center}" +
  ".cl-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}";

function wrapBackgroundCss(cfg: LoaderConfig): string {
  return cfg.transparent ? "" : `.cl-wrap{background:${cfg.background};padding:16px;border-radius:16px}`;
}

const overlayCss = (cfg: LoaderConfig) =>
  `.cl-overlay{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:${
    cfg.transparent ? "rgba(255,255,255,.75)" : cfg.background
  }}.cl-overlay[hidden]{display:none}`;

function creditComment(def: Def, o: ExportOptions): string {
  return `${def.name} loader by CuteLoader — ${pageUrl(def, o.siteUrl)}`;
}

function creditLink(o: ExportOptions): string {
  return `<a class="cl-credit" href="${o.siteUrl}/" target="_blank" rel="noopener noreferrer">Loading animation by CuteLoader</a>`;
}

/* ------------------------------ HTML + CSS ------------------------------ */

export function exportCss(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const css = formatCss(minifyCss(buildCss(def, cfg) + HELPER_CSS + wrapBackgroundCss(cfg)));
  const head = o.attribution ? `/* ${creditComment(def, o)} */\n` : "";
  return `${head}${css}\n`;
}

export function exportHtml(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const svg = prettyMarkup(buildSvg(def, cfg), 1);
  const label = o.label ?? "Loading…";
  const lines = [
    `<div class="cl-wrap" role="status" aria-live="polite">`,
    svg,
    `  <span class="cl-sr-only">${escapeText(label)}</span>`,
    `</div>`,
  ];
  if (o.attribution) {
    lines.unshift(`<!-- ${creditComment(def, o)} -->`);
    lines.push("", "<!-- Optional credit: place it anywhere, e.g. in your footer. Thank you! -->", creditLink(o));
  }
  return lines.join("\n") + "\n";
}

/** A complete, standalone HTML page. Used for the "download .html" action and export tests. */
export function exportHtmlDocument(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const bg = cfg.transparent ? "#ffffff" : cfg.background;
  const css = exportCss(def, { ...cfg, transparent: true }, { ...o, attribution: false })
    .trim()
    .split("\n")
    .map((l) => (l ? "    " + l : l))
    .join("\n");
  const html = exportHtml(def, cfg, o)
    .trim()
    .split("\n")
    .map((l) => (l ? "    " + l : l))
    .join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeText(def.name)} loader</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; gap: 12px; background: ${bg}; font-family: system-ui, sans-serif; }
      .cl-credit { font-size: 12px; color: #6b6880; }
${css}
    </style>
  </head>
  <body>
${html}
  </body>
</html>
`;
}

/* --------------------------------- Embed -------------------------------- */

export function exportEmbed(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const css = exportCss(def, cfg, { ...o, attribution: false })
    .trim()
    .split("\n")
    .map((l) => (l ? "  " + l : l))
    .join("\n");
  const label = o.label ?? "Loading…";
  const out: string[] = [];
  if (o.attribution) out.push(`<!-- ${creditComment(def, o)} -->`);
  out.push("<style>", css, "</style>");
  out.push(`<div class="cl-wrap" role="status" aria-live="polite">`);
  out.push(prettyMarkup(buildSvg(def, cfg), 1));
  out.push(`  <span class="cl-sr-only">${escapeText(label)}</span>`, `</div>`);
  if (o.attribution) out.push(creditLink(o));
  return out.join("\n") + "\n";
}

/* ---------------------------------- SVG --------------------------------- */

export function exportSvg(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const css = buildCss(def, cfg, { pretty: true })
    .split("\n")
    .map((l) => (l ? "    " + l : l))
    .join("\n");
  const svg = buildSvg(def, cfg, { standalone: true, background: true, label: o.label ?? "Loading" });
  // Inject a readable <style> block as the first child of the root element.
  const open = svg.indexOf(">") + 1;
  const root = svg.slice(0, open);
  const body = prettyMarkup(svg.slice(open, -"</svg>".length), 1);
  const comment = o.attribution ? `<!-- ${creditComment(def, o)} -->\n` : "";
  return `${comment}${root}\n  <style>\n${css}\n  </style>\n${body}\n</svg>\n`;
}

/* --------------------------------- React -------------------------------- */

export function exportReact(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const name = componentName(def);
  const css = buildCss(def, cfg, { pretty: true, includeVars: false }) + "\n" + formatCss(HELPER_CSS);
  const { width, height } = pixelSize(def, 100);
  const ratio = height / width;
  const labels = def.colorLabels ?? {};
  const hasAccent = !!def.colors.accent;
  const hasStroke = def.stroke != null;
  const hasAmp = !!def.intensity;
  const base = def.duration;

  const props: string[] = [
    `  /** Rendered width in px (height follows the aspect ratio). */\n  size?: number;`,
    `  /** ${labels.primary ?? "Primary"} color. */\n  primary?: string;`,
    `  /** ${labels.secondary ?? "Secondary"} color. */\n  secondary?: string;`,
  ];
  if (hasAccent) props.push(`  /** ${labels.accent ?? "Accent"} color. */\n  accent?: string;`);
  props.push(`  /** Speed multiplier: 1 = default, 2 = twice as fast. */\n  speed?: number;`);
  if (hasStroke) props.push(`  /** Stroke width in SVG units. */\n  stroke?: number;`);
  if (hasAmp) props.push(`  /** Motion intensity, 0.4–1.6. */\n  intensity?: number;`);
  if (!cfg.transparent) props.push(`  /** Background behind the loader. Pass "transparent" to remove it. */\n  background?: string;`);
  props.push(`  /** Text announced to screen readers. */\n  label?: string;`, `  className?: string;`);

  const defaults: string[] = [
    `size = ${cfg.size}`,
    `primary = "${cfg.primary}"`,
    `secondary = "${cfg.secondary}"`,
  ];
  if (hasAccent) defaults.push(`accent = "${cfg.accent}"`);
  defaults.push(`speed = ${cfg.speed}`);
  if (hasStroke) defaults.push(`stroke = ${cfg.stroke}`);
  if (hasAmp) defaults.push(`intensity = ${cfg.intensity}`);
  if (!cfg.transparent) defaults.push(`background = "${cfg.background}"`);
  defaults.push(`label = "${(o.label ?? "Loading").replace(/"/g, "")}"`, `className`);

  const vars: string[] = [`    "--c1": primary,`, `    "--c2": secondary,`];
  if (hasAccent) vars.push(`    "--c3": accent,`);
  vars.push(`    "--d": \`\${${base} / speed}s\`,`);
  if (hasStroke) vars.push(`    "--sw": stroke,`);
  if (hasAmp) vars.push(`    "--amp": intensity,`);

  const header = o.attribution
    ? `/**\n * ${creditComment(def, o)}\n * Free to use. Attribution appreciated, never required.\n */\n`
    : "";
  const wrapStyle = cfg.transparent
    ? ""
    : ` style={{ background, padding: background === "transparent" ? 0 : 16, borderRadius: 16 }}`;
  const heightExpr = ratio === 1 ? "size" : `Math.round(size * ${round4(ratio)})`;

  return `${header}import type { CSSProperties } from "react";

export interface ${name}Props {
${props.join("\n")}
}

const CSS = \`
${escapeTemplate(css)}
\`;

export function ${name}({
  ${defaults.join(",\n  ")},
}: ${name}Props) {
  const vars = {
${vars.join("\n")}
  } as CSSProperties;

  return (
    <span className={className ? \`cl-wrap \${className}\` : "cl-wrap"} role="status" aria-live="polite"${wrapStyle}>
      <style>{CSS}</style>
      <svg
        className="${className(def.slug)}"
        viewBox="${def.viewBox ?? "0 0 100 100"}"
        width={size}
        height={${heightExpr}}
        style={vars}
        aria-hidden="true"
        focusable="false"
      >
${svgToJsx(def.svg, 4)}
      </svg>
      <span className="cl-sr-only">{label}</span>
    </span>
  );
}

export default ${name};
`;
}

/* ------------------------------ JavaScript ------------------------------ */

export function exportJs(def: Def, cfg: LoaderConfig, o: ExportOptions): string {
  const css = minifyCss(buildCss(def, cfg) + HELPER_CSS + overlayCss(cfg));
  const svg = buildSvg(def, cfg);
  const id = `cl-style-${def.slug}`;
  const header = o.attribution
    ? `/*! ${creditComment(def, o)} (attribution optional) */\n`
    : "";
  const label = JSON.stringify(o.label ?? "Loading…");
  return `${header}/**
 * Usage:
 *   CuteLoader.mount("#target")            // inline loader inside an element
 *   CuteLoader.show({ delay: 200 })        // full-screen overlay (skipped if hidden within 200ms)
 *   CuteLoader.hide()                      // calls are reference-counted
 *   CuteLoader.track(fetch("/api/data"))   // overlay until the promise settles
 */
(function (w, d) {
  "use strict";
  var CSS = ${JSON.stringify(css)};
  var SVG = ${JSON.stringify(svg)};
  var LABEL = ${label};
  var overlay = null;
  var count = 0;
  var timer = null;

  function ensureStyles() {
    if (d.getElementById("${id}")) return;
    var style = d.createElement("style");
    style.id = "${id}";
    style.textContent = CSS;
    d.head.appendChild(style);
  }

  function createLoader(label) {
    var wrap = d.createElement("div");
    wrap.className = "cl-wrap";
    wrap.setAttribute("role", "status");
    wrap.setAttribute("aria-live", "polite");
    wrap.innerHTML = SVG; // static markup generated by CuteLoader
    var text = d.createElement("span");
    text.className = "cl-sr-only";
    text.textContent = label || LABEL;
    wrap.appendChild(text);
    return wrap;
  }

  function reveal(label) {
    timer = null;
    ensureStyles();
    if (!overlay) {
      overlay = d.createElement("div");
      overlay.className = "cl-overlay";
      overlay.appendChild(createLoader(label));
      d.body.appendChild(overlay);
    }
    overlay.hidden = false;
  }

  var api = {
    mount: function (target, options) {
      var host = typeof target === "string" ? d.querySelector(target) : target;
      if (!host) throw new Error("CuteLoader: mount target not found");
      ensureStyles();
      var node = createLoader(options && options.label);
      host.appendChild(node);
      return node;
    },
    show: function (options) {
      options = options || {};
      count += 1;
      if (count > 1) return;
      if (options.delay > 0) {
        timer = setTimeout(function () { reveal(options.label); }, options.delay);
      } else {
        reveal(options.label);
      }
    },
    hide: function () {
      if (count === 0) return;
      count -= 1;
      if (count > 0) return;
      if (timer) { clearTimeout(timer); timer = null; }
      if (overlay) overlay.hidden = true;
    },
    track: function (promise, options) {
      api.show(options);
      return Promise.resolve(promise).finally(api.hide);
    }
  };

  w.CuteLoader = api;
})(window, document);
`;
}

/* ------------------------------ Config JSON ------------------------------ */

export function exportConfig(def: Pick<AnimationSource, "slug">, cfg: LoaderConfig): string {
  return JSON.stringify({ loader: def.slug, version: 1, ...cfg }, null, 2) + "\n";
}

/** Machine-friendly summary of the CSS variables (shown in the HTML tab). */
export function variableSummary(def: Def, cfg: LoaderConfig): { name: string; value: string; role: string }[] {
  const labels = def.colorLabels ?? {};
  const roles: Record<string, string> = {
    "--c1": `${labels.primary ?? "Primary"} color`,
    "--c2": `${labels.secondary ?? "Secondary"} color`,
    "--c3": `${labels.accent ?? "Accent"} color`,
    "--d": "Duration of one cycle",
    "--sw": "Stroke width",
    "--amp": "Motion intensity",
  };
  return cssVariables(def, cfg).map(([name, value]) => ({ name, value, role: roles[name] ?? "" }));
}

export const FILE_NAMES = (def: Def) => ({
  html: `${def.slug}.html`,
  css: `${def.slug}.css`,
  doc: `${def.slug}-demo.html`,
  react: `${componentName(def)}.tsx`,
  svg: `${def.slug}.svg`,
  js: `${def.slug}.js`,
  embed: `${def.slug}-embed.html`,
  config: `${def.slug}.cuteloader.json`,
});

export function durationLabel(def: Pick<AnimationSource, "duration">, cfg: LoaderConfig): string {
  return `${cycleSeconds(def, cfg)}s`;
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeTemplate(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

export { className };

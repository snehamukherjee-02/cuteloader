/**
 * The CuteLoader animation engine.
 *
 * One definition (inner SVG + scoped CSS) is turned into:
 *   - the CSS used by live previews and exports (buildCss)
 *   - the SVG markup used inline and for .svg downloads (buildSvg)
 *
 * This file must stay dependency-free and use only erasable TypeScript syntax:
 * it is imported by Next.js code *and* executed directly by Node in /scripts.
 */
import type { AnimationSource, LoaderConfig } from "../types/animation";

type Def = Pick<
  AnimationSource,
  "slug" | "css" | "svg" | "colors" | "duration" | "viewBox" | "stroke" | "intensity" | "direction"
>;

export const DEFAULT_VIEWBOX = "0 0 100 100";
/** Reduced-motion users get the same loader, three times calmer. */
export const REDUCED_MOTION_FACTOR = 3;

export const LIMITS = {
  size: { min: 24, max: 400, step: 4 },
  speed: { min: 0.25, max: 3, step: 0.05 },
  stroke: { min: 1, max: 14, step: 0.5 },
  intensity: { min: 0.4, max: 1.6, step: 0.05 },
} as const;

export function className(slug: string): string {
  return `cl-${slug}`;
}

export function defaultConfig(def: Pick<AnimationSource, "colors" | "stroke">): LoaderConfig {
  return {
    primary: def.colors.primary,
    secondary: def.colors.secondary,
    accent: def.colors.accent ?? def.colors.secondary,
    background: "#ffffff",
    transparent: true,
    size: 120,
    speed: 1,
    stroke: def.stroke ?? 4,
    intensity: 1,
    reverse: false,
    loop: true,
  };
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && HEX.test(value);
}

function clamp(n: unknown, min: number, max: number, fallback: number): number {
  const v = typeof n === "number" ? n : typeof n === "string" ? Number(n) : NaN;
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

/**
 * Coerces untrusted input (URL hash, pasted JSON, form fields) into a safe config.
 * Every value that ends up inside generated CSS/SVG passes through here, so a
 * crafted value can never break out of a CSS declaration or an attribute.
 */
export function sanitizeConfig(def: Pick<AnimationSource, "colors" | "stroke">, input: unknown): LoaderConfig {
  const base = defaultConfig(def);
  if (!input || typeof input !== "object") return base;
  const o = input as Record<string, unknown>;
  const color = (k: "primary" | "secondary" | "accent" | "background") =>
    isHexColor(o[k]) ? (o[k] as string).toLowerCase() : base[k];
  return {
    primary: color("primary"),
    secondary: color("secondary"),
    accent: color("accent"),
    background: color("background"),
    transparent: typeof o.transparent === "boolean" ? o.transparent : base.transparent,
    size: Math.round(clamp(o.size, LIMITS.size.min, LIMITS.size.max, base.size)),
    speed: round(clamp(o.speed, LIMITS.speed.min, LIMITS.speed.max, base.speed), 2),
    stroke: round(clamp(o.stroke, LIMITS.stroke.min, LIMITS.stroke.max, base.stroke), 2),
    intensity: round(clamp(o.intensity, LIMITS.intensity.min, LIMITS.intensity.max, base.intensity), 2),
    reverse: typeof o.reverse === "boolean" ? o.reverse : base.reverse,
    loop: typeof o.loop === "boolean" ? o.loop : base.loop,
  };
}

export function round(n: number, places = 3): number {
  const f = 10 ** places;
  return Math.round(n * f) / f;
}

/** Seconds for one main cycle at the configured speed. */
export function cycleSeconds(def: Pick<AnimationSource, "duration">, cfg: Pick<LoaderConfig, "speed">): number {
  return round(def.duration / cfg.speed, 3);
}

export function parseViewBox(viewBox: string = DEFAULT_VIEWBOX): [number, number, number, number] {
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isFinite(p))) return [0, 0, 100, 100];
  return parts as [number, number, number, number];
}

/** Width/height in px for a given config size (size = the longer side). */
export function pixelSize(def: Pick<AnimationSource, "viewBox">, size: number): { width: number; height: number } {
  const [, , w, h] = parseViewBox(def.viewBox);
  if (w >= h) return { width: size, height: Math.round((size * h) / w) };
  return { width: Math.round((size * w) / h), height: size };
}

/** CSS custom properties for a config. Only the variables a loader supports are emitted. */
export function cssVariables(def: Def, cfg: LoaderConfig): [string, string][] {
  const vars: [string, string][] = [
    ["--c1", cfg.primary],
    ["--c2", cfg.secondary],
  ];
  if (def.colors.accent) vars.push(["--c3", cfg.accent]);
  vars.push(["--d", `${cycleSeconds(def, cfg)}s`]);
  if (def.stroke != null) vars.push(["--sw", String(cfg.stroke)]);
  if (def.intensity) vars.push(["--amp", String(cfg.intensity)]);
  return vars;
}

export interface CssOptions {
  /** Pretty-print for humans (exports). Default: minified. */
  pretty?: boolean;
  /** Emit the custom-property block. React exports pass props instead. */
  includeVars?: boolean;
}

export function buildCss(def: Def, cfg: LoaderConfig, opts: CssOptions = {}): string {
  const root = "." + className(def.slug);
  const parts: string[] = [];
  const vars =
    opts.includeVars !== false ? cssVariables(def, cfg).map(([k, v]) => `${k}:${v};`).join("") : "";
  parts.push(`${root}{${vars}display:block;overflow:visible}`);
  parts.push(
    def.css
      .replace(/ROOT/g, root)
      .replace(/K_/g, `${className(def.slug)}-`)
      // Every timing derives from --d, so one variable scales the whole loader,
      // and the reduced-motion factor (--rm) can calm it down without touching markup.
      .replace(/var\(--d\)/g, "calc(var(--d) * var(--rm, 1))"),
  );
  parts.push(`@media (prefers-reduced-motion:reduce){${root}{--rm:${REDUCED_MOTION_FACTOR}}}`);
  if (cfg.reverse && def.direction) {
    parts.push(`${root},${root} *{animation-direction:reverse!important}`);
  }
  if (!cfg.loop) {
    parts.push(`${root},${root} *{animation-iteration-count:1!important;animation-fill-mode:both!important}`);
  }
  const min = minifyCss(parts.join("\n"));
  return opts.pretty ? formatCss(min) : min;
}

export interface SvgOptions {
  /** Add xmlns and an embedded <style> so the file works on its own. */
  standalone?: boolean;
  /** Embed this CSS in a <style> element inside the SVG. */
  css?: string;
  /** Paint the configured background (ignored when cfg.transparent). */
  background?: boolean;
  /** Accessible label. When omitted the SVG is aria-hidden (the wrapper announces). */
  label?: string;
  /** Emit width/height attributes from cfg.size. Default true. */
  sized?: boolean;
}

export function buildSvg(def: Def, cfg: LoaderConfig, opts: SvgOptions = {}): string {
  const viewBox = def.viewBox ?? DEFAULT_VIEWBOX;
  const attrs: string[] = [];
  if (opts.standalone) attrs.push('xmlns="http://www.w3.org/2000/svg"');
  attrs.push(`class="${className(def.slug)}"`, `viewBox="${viewBox}"`);
  if (opts.sized !== false) {
    const { width, height } = pixelSize(def, cfg.size);
    attrs.push(`width="${width}"`, `height="${height}"`);
  }
  if (opts.label) attrs.push('role="img"', `aria-label="${escapeAttr(opts.label)}"`);
  else attrs.push('aria-hidden="true"', 'focusable="false"');

  const style = opts.css ? `<style>${opts.css}</style>` : "";
  let bg = "";
  if (opts.background && !cfg.transparent) {
    const [x, y, w, h] = parseViewBox(viewBox);
    bg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cfg.background}"/>`;
  }
  return `<svg ${attrs.join(" ")}>${style}${bg}${def.svg.trim()}</svg>`;
}

export function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ------------------------------------------------------------------ */
/* CSS minify / pretty-print (small, predictable, no dependencies)     */
/* ------------------------------------------------------------------ */

export function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();
}

interface CssNode {
  head: string;
  children?: CssNode[];
}

function parseCssBlock(s: string, start: number): [CssNode[], number] {
  const nodes: CssNode[] = [];
  let i = start;
  while (i < s.length && s[i] !== "}") {
    let j = i;
    let paren = 0;
    while (j < s.length) {
      const c = s[j];
      if (c === "(") paren++;
      else if (c === ")") paren--;
      else if (paren === 0 && (c === "{" || c === ";" || c === "}")) break;
      j++;
    }
    const head = s.slice(i, j).trim();
    if (s[j] === "{") {
      const [children, end] = parseCssBlock(s, j + 1);
      nodes.push({ head, children });
      i = end + 1;
    } else {
      if (head) nodes.push({ head });
      i = s[j] === ";" ? j + 1 : j;
    }
  }
  return [nodes, i];
}

function prettyDecl(d: string): string {
  const idx = d.indexOf(":");
  if (idx === -1) return d;
  return `${d.slice(0, idx).trim()}: ${d.slice(idx + 1).trim()}`;
}

function prettySelector(sel: string): string {
  return sel.replace(/,/g, ", ").replace(/>/g, " > ").replace(/\s+/g, " ");
}

function printCss(nodes: CssNode[], depth: number, inKeyframes: boolean): string {
  const pad = "  ".repeat(depth);
  const out: string[] = [];
  for (const n of nodes) {
    if (!n.children) {
      out.push(`${pad}${prettyDecl(n.head)};`);
      continue;
    }
    const isAt = n.head.startsWith("@");
    const head = isAt ? n.head.replace(/:/g, ": ").replace(/\s+/g, " ") : prettySelector(n.head);
    const allDecls = n.children.every((c) => !c.children);
    if (inKeyframes && allDecls) {
      out.push(`${pad}${head} { ${n.children.map((c) => prettyDecl(c.head) + ";").join(" ")} }`);
    } else {
      const kf = /^@(-webkit-)?keyframes/.test(n.head);
      out.push(`${pad}${head} {\n${printCss(n.children, depth + 1, kf)}\n${pad}}`);
    }
  }
  return out.join(depth === 0 ? "\n\n" : "\n");
}

export function formatCss(minified: string): string {
  const [nodes] = parseCssBlock(minified, 0);
  return printCss(nodes, 0, false);
}

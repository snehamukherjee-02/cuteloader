/**
 * Animation QA: static lint + real-browser checks + a filmstrip screenshot.
 *
 *   node scripts/check-animations.ts                 # all categories
 *   node scripts/check-animations.ts cute minimal    # some categories
 *
 * Outputs (gitignored):
 *   .scratch/check-<name>.html   filmstrip page (open it in a browser to see live loaders)
 *   .scratch/check-<name>.png    screenshot: 4 frozen frames per loader + a dark-background frame
 *   .scratch/check-<name>.json   machine-readable report
 *
 * Exit code 1 when any loader has errors. Requires Chrome or Edge (set CHROME_PATH to override).
 */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { buildCss, buildSvg, defaultConfig, className } from "../src/lib/engine.ts";
import type { AnimationSource } from "../src/types/animation.ts";

const CATEGORIES = ["cute", "abstract", "minimal", "technology", "nature", "business", "food"];
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const cats = args.length ? args : CATEGORIES;
const outName = args.length ? args.join("-") : "all";

const loaders: AnimationSource[] = [];
for (const c of cats) {
  const p = resolve(`src/animations/${c}.ts`);
  if (!existsSync(p)) {
    console.log(`(skip ${c}: src/animations/${c}.ts not found)`);
    continue;
  }
  const mod = await import(pathToFileURL(p).href);
  const list = (mod.default ?? []) as AnimationSource[];
  for (const l of list) {
    if (l.category !== c) console.log(`! ${l.slug}: category "${l.category}" but defined in ${c}.ts`);
  }
  loaders.push(...list);
}
if (!loaders.length) {
  console.log("No loaders found.");
  process.exit(1);
}

/* ---------------------------- static lint ---------------------------- */
type Issues = Record<string, { errors: string[]; warnings: string[] }>;
const issues: Issues = {};
const err = (slug: string, m: string) => (issues[slug] ??= { errors: [], warnings: [] }).errors.push(m);
const warn = (slug: string, m: string) => (issues[slug] ??= { errors: [], warnings: [] }).warnings.push(m);

const seen = new Set<string>();
const HEX = /^#[0-9a-f]{6}$/i;
for (const l of loaders) {
  const s = l.slug;
  issues[s] ??= { errors: [], warnings: [] };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) err(s, "slug must be kebab-case");
  if (seen.has(s)) err(s, "duplicate slug");
  seen.add(s);
  for (const k of ["name", "description", "details", "kind", "svg", "css"] as const) {
    if (!l[k] || typeof l[k] !== "string") err(s, `missing ${k}`);
  }
  if (l.description && (l.description.length < 60 || l.description.length > 220))
    warn(s, `description length ${l.description.length} (aim 60–220)`);
  if (l.details && l.details.length < 220) warn(s, `details is short (${l.details.length} chars, aim 300+)`);
  if (!Array.isArray(l.tags) || l.tags.length < 3) warn(s, "add at least 3 tags");
  if (!(l.duration >= 0.4 && l.duration <= 8)) err(s, "duration must be 0.4–8 seconds");
  if (!HEX.test(l.colors?.primary ?? "") || !HEX.test(l.colors?.secondary ?? "")) err(s, "colors.primary/secondary must be #rrggbb");
  if (l.colors?.accent && !HEX.test(l.colors.accent)) err(s, "colors.accent must be #rrggbb");
  if (!(l.popularity >= 1 && l.popularity <= 100)) err(s, "popularity must be 1–100");

  const css = l.css ?? "";
  const svg = l.svg ?? "";
  if (!css.includes("ROOT")) err(s, "css must scope rules with ROOT");
  const kf = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
  if (!kf.length) err(s, "no @keyframes found");
  for (const k of kf) if (!k.startsWith("K_")) err(s, `keyframes "${k}" must start with K_`);
  const used = new Set([...css.matchAll(/\bK_[\w-]+/g)].map((m) => m[0]));
  for (const k of kf) if (!used.has(k) || css.split(k).length < 3) warn(s, `keyframes ${k} defined but never used`);
  for (const u of used) if (!kf.includes(u)) err(s, `animation uses ${u} but no @keyframes ${u} exists`);
  const hard = css.replace(/var\([^)]*\)/g, "").match(/(?<![\w.#-])\d*\.?\d+m?s\b/g);
  if (hard) err(s, `hard-coded time values ${[...new Set(hard)].join(", ")} — derive all timing from var(--d)`);
  if (/var\(--d\s*,/.test(css)) err(s, "do not give var(--d) a fallback");
  if (/prefers-reduced-motion/.test(css)) err(s, "the engine handles reduced motion; remove the media query");
  if (!/var\(--c1\)/.test(css)) err(s, "css never uses var(--c1) (primary color)");
  if (!/var\(--c2\)/.test(css)) err(s, "css never uses var(--c2) (secondary color)");
  if (l.colors?.accent && !/var\(--c3\)/.test(css)) err(s, "colors.accent set but css never uses var(--c3)");
  if (!l.colors?.accent && /var\(--c3\)/.test(css)) err(s, "css uses var(--c3) but colors.accent is not set");
  if (l.stroke != null && !/var\(--sw\)/.test(css)) err(s, "stroke set but css never uses var(--sw)");
  if (l.stroke == null && /var\(--sw\)/.test(css)) err(s, "css uses var(--sw) but stroke is not set");
  if (l.intensity && !/var\(--amp\)/.test(css)) err(s, "intensity: true but css never uses var(--amp)");
  if (!l.intensity && /var\(--amp\)/.test(css)) err(s, "css uses var(--amp) but intensity is not true");
  if (/content\s*:/.test(css)) err(s, "do not use the content property");
  if (/\bd\s*:\s*path\(/.test(css)) err(s, "CSS d:path() animation is not supported in Safari — use transforms");
  if (/filter\s*:/.test(css) || /<filter/.test(svg)) warn(s, "filters are expensive — avoid unless essential");

  for (const [re, m] of [
    [/<script/i, "no <script>"],
    [/<style/i, "no <style> inside svg (put CSS in css)"],
    [/\sstyle=/i, "no inline style= attributes (use classes + css)"],
    [/\son[a-z]+=/i, "no event-handler attributes"],
    [/<(animate|animateTransform|animateMotion|set)\b/i, "no SMIL — CSS animations only"],
    [/<(foreignObject|image|use)\b/i, "no foreignObject/image/use elements"],
    [/href=/i, "no href attributes"],
    [/<svg\b/i, "svg must be the INNER markup (no outer <svg>)"],
  ] as [RegExp, string][]) {
    if (re.test(svg)) err(s, m);
  }
  for (const m of svg.matchAll(/\sid="([^"]+)"/g)) {
    if (!m[1].startsWith(`${s}-`)) err(s, `id "${m[1]}" must start with "${s}-"`);
  }
  const classes = new Set([...svg.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)));
  for (const c of classes) {
    if (!new RegExp(`\\.${c.replace(/[-]/g, "\\-")}(?![\\w-])`).test(css)) warn(s, `class "${c}" is never styled`);
  }
}

/* ---------------------------- browser checks ---------------------------- */
const FRAMES = [0, 0.25, 0.5, 0.75];
const rows = loaders
  .map((l) => {
    const cfg = defaultConfig(l);
    const css = buildCss(l, cfg);
    const inline = buildSvg(l, { ...cfg, size: 96 });
    const standalone = buildSvg(l, cfg, { standalone: true, css, label: "Loading" });
    const frames = FRAMES.map(
      (f) => `<div class="qa-cell" data-t="${f}">${inline}<span>${Math.round(f * 100)}%</span></div>`,
    ).join("");
    return `<section class="qa-row" data-slug="${l.slug}" data-d="${l.duration}">
      <style>${css}</style>
      <div class="qa-meta"><b>${l.name}</b><small>${l.slug} · ${l.duration}s</small></div>
      ${frames}
      <div class="qa-cell qa-dark" data-t="0.4">${inline}<span>dark</span></div>
      <div class="qa-cell qa-live">${inline}<span>live</span></div>
      <script type="text/plain" class="qa-standalone">${standalone.replace(/<\/script/gi, "<\\/script")}</script>
    </section>`;
  })
  .join("\n");

const page = `<!doctype html><html><head><meta charset="utf-8"><title>Loader QA</title>
<style>
  body{margin:0;padding:16px;font:13px system-ui,sans-serif;background:#f6f4fb;color:#222}
  .qa-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #e4def0}
  .qa-meta{width:170px;display:flex;flex-direction:column}
  .qa-meta small{color:#777}
  .qa-cell{position:relative;width:112px;height:112px;display:grid;place-items:center;background:#fff;border-radius:12px;border:1px solid #ece6f6}
  .qa-cell.qa-dark{background:#15131c}
  .qa-cell > span{position:absolute;bottom:2px;right:6px;font-size:10px;color:#999}
  pre{white-space:pre-wrap}
</style></head><body>
<h3>Loader QA — ${loaders.length} loaders · frames at 0/25/50/75% of --d</h3>
${rows}
<pre id="report"></pre>
<script>
(function(){
  const report = {};
  const props = ["transform","opacity","fill","stroke","strokeDashoffset","strokeDasharray","visibility","translate","rotate","scale","fillOpacity","strokeOpacity","strokeWidth"];
  function snapshot(svg){
    return [...svg.querySelectorAll("*")].map(el => { const cs = getComputedStyle(el); return props.map(p => cs[p]).join("|"); }).join("\\n");
  }
  for (const row of document.querySelectorAll(".qa-row")) {
    const slug = row.dataset.slug, d = Number(row.dataset.d) * 1000;
    const r = report[slug] = { errors: [], warnings: [], animations: 0, elements: 0 };
    // 1) standalone SVG parses as XML
    const src = row.querySelector(".qa-standalone").textContent;
    const doc = new DOMParser().parseFromString(src, "image/svg+xml");
    if (doc.querySelector("parsererror")) r.errors.push("standalone SVG is not valid XML: " + doc.querySelector("parsererror").textContent.slice(0, 160));
    const cells = [...row.querySelectorAll(".qa-cell[data-t]")];
    const snaps = [];
    cells.forEach((cell, idx) => {
      const svg = cell.querySelector("svg");
      const anims = svg.getAnimations({ subtree: true });
      if (idx === 0) {
        r.animations = anims.length;
        r.elements = svg.querySelectorAll("*").length;
        if (!anims.length) r.errors.push("no running animations (check keyframe names / selectors)");
        // every element whose computed animation-name is set must have that many animations
        for (const el of svg.querySelectorAll("*")) {
          const names = getComputedStyle(el).animationName;
          if (names && names !== "none") {
            const n = names.split(",").length, got = el.getAnimations().length;
            if (got < n) r.errors.push("element ." + (el.getAttribute("class")||el.tagName) + " declares " + n + " animation(s) but only " + got + " run");
          }
        }
        // durations must divide or be multiples of --d so the whole loader loops seamlessly
        const bad = new Set();
        for (const a of anims) {
          const dur = a.effect.getTiming().duration;
          const ratio = dur / d, inv = d / dur;
          const nice = (Math.abs(ratio - Math.round(ratio)) < 0.02 && Math.round(ratio) >= 1 && Math.round(ratio) <= 4) || (Math.abs(inv - Math.round(inv)) < 0.02 && Math.round(inv) >= 1);
          if (!nice) bad.add((dur/1000).toFixed(3) + "s");
        }
        if (bad.size) r.warnings.push("durations " + [...bad].join(", ") + " are not d×n or d/n — loop will not be seamless");
        if (r.elements > 90) r.warnings.push(r.elements + " elements — consider simplifying");
      }
      const t = Number(cell.dataset.t) * d;
      for (const a of anims) { a.pause(); a.currentTime = t; }
      snaps.push(snapshot(svg));
      // content must stay inside the viewBox (standalone SVG files clip at the viewBox)
      const box = svg.getBoundingClientRect();
      const tol = box.width * 0.03;
      for (const el of svg.querySelectorAll("path,circle,rect,ellipse,line,polyline,polygon,text")) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 && b.height === 0) continue;
        if (getComputedStyle(el).opacity === "0") continue;
        if (b.left < box.left - tol || b.top < box.top - tol || b.right > box.right + tol || b.bottom > box.bottom + tol) {
          r.warnings.push("." + (el.getAttribute("class")||el.tagName) + " leaves the viewBox at " + Math.round(Number(cell.dataset.t)*100) + "%");
          break;
        }
      }
    });
    if (snaps.length > 1 && snaps.every(s => s === snaps[0])) r.errors.push("frames at 0/25/50/75% are identical — no visible motion");
    r.warnings = [...new Set(r.warnings)];
  }
  // Markers are assembled at runtime so this script's own source can never match the reader's regex.
  document.getElementById("report").textContent = ["REPORT", "BEGIN"].join("_") + JSON.stringify(report) + ["REPORT", "FINISH"].join("_");
})();
</script></body></html>`;

const scratch = resolve(".scratch");
mkdirSync(scratch, { recursive: true });
const htmlPath = join(scratch, `check-${outName}.html`);
const pngPath = join(scratch, `check-${outName}.png`);
writeFileSync(htmlPath, page);

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean) as string[];
const chrome = candidates.find((c) => existsSync(c));
let browser: Record<string, { errors: string[]; warnings: string[]; animations: number; elements: number }> = {};
let browserFailed = false;
if (!chrome) {
  console.log("! Chrome/Edge not found — skipping browser checks (set CHROME_PATH)");
} else {
  const url = pathToFileURL(htmlPath).href;
  const run = (extra: string[]) => {
    const profile = mkdtempSync(join(tmpdir(), "cl-chrome-"));
    try {
      return execFileSync(
        chrome,
        ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${profile}`, "--virtual-time-budget=4000", ...extra, url],
        { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"], timeout: 120000 },
      );
    } finally {
      try { rmSync(profile, { recursive: true, force: true }); } catch { /* chrome may still hold files */ }
    }
  };
  const dom = run(["--dump-dom"]);
  const pre = dom.match(/<pre id="report">([\s\S]*?)<\/pre>/)?.[1] ?? "";
  const m = pre.match(/REPORT_BEGIN([\s\S]*?)REPORT_FINISH/);
  if (m) {
    const json = m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
    browser = JSON.parse(json);
  } else {
    browserFailed = true;
    console.log("✗ the QA page did not produce a report (its script probably crashed) — browser checks did not run");
  }
  const height = 60 + loaders.length * 131;
  run([`--screenshot=${pngPath}`, `--window-size=1010,${height}`]);
}

/* ---------------------------- output ---------------------------- */
let failed = 0;
const summary: Record<string, unknown> = {};
for (const l of loaders) {
  const st = issues[l.slug] ?? { errors: [], warnings: [] };
  const br = browser[l.slug];
  const errors = [...st.errors, ...(br?.errors ?? [])];
  // A loader with no browser result must never pass silently.
  if (chrome && !br) errors.push(browserFailed ? "browser checks did not run (QA page crashed)" : "no browser result for this loader");
  const warnings = [...st.warnings, ...(br?.warnings ?? [])];
  summary[l.slug] = { errors, warnings, animations: br?.animations, elements: br?.elements };
  const mark = errors.length ? "✗" : warnings.length ? "△" : "✓";
  if (errors.length) failed++;
  console.log(`${mark} ${l.slug.padEnd(24)} ${br ? `${br.animations} anims, ${br.elements} els` : ""}`);
  for (const e of errors) console.log(`    error: ${e}`);
  for (const w of warnings) console.log(`    warn:  ${w}`);
}
writeFileSync(join(scratch, `check-${outName}.json`), JSON.stringify(summary, null, 2));
console.log(`\n${loaders.length} loaders, ${failed} with errors.`);
if (existsSync(pngPath)) console.log(`Screenshot: ${pngPath}`);
console.log(`Live page:  ${htmlPath}`);
void readFileSync;
void className;
process.exit(failed ? 1 : 0);

/**
 * Generates static social images and icons with headless Chrome:
 *   public/og/default.png, public/og/category-<id>.png, public/og/<slug>.png,
 *   public/og/blog-<slug>.png, public/icon-192.png, public/icon-512.png,
 *   src/app/apple-icon.png, src/app/favicon.ico
 *
 *   npm run og
 *
 * Outputs are committed, so production builds never need a browser.
 */
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { buildCss, buildSvg, defaultConfig } from "../src/lib/engine.ts";
import { CATEGORIES } from "../src/data/categories.ts";
import type { AnimationSource } from "../src/types/animation.ts";
import type { Article } from "../src/types/content.ts";
import { Browser } from "./cdp.ts";

const run = promisify(execFile);
const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((c) => c && existsSync(c));
if (!chrome) {
  console.error("Chrome/Edge not found (set CHROME_PATH)");
  process.exit(1);
}

const loaders: AnimationSource[] = [];
for (const c of ["cute", "abstract", "minimal", "technology", "nature", "business", "food"]) {
  const p = resolve(`src/animations/${c}.ts`);
  if (existsSync(p)) loaders.push(...((await import(pathToFileURL(p).href)).default as AnimationSource[]));
}
const bySlug = new Map(loaders.map((l) => [l.slug, l]));
const articles: Article[] = [];
const blogDir = resolve("src/content/blog");
if (existsSync(blogDir)) {
  for (const f of readdirSync(blogDir).filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
    articles.push((await import(pathToFileURL(join(blogDir, f)).href)).default as Article);
  }
}

const scratch = resolve(".scratch/og");
mkdirSync(scratch, { recursive: true });
mkdirSync(resolve("public/og"), { recursive: true });

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const logo = readFileSync(resolve("src/app/icon.svg"), "utf8");

function loaderMarkup(def: AnimationSource, size: number) {
  const cfg = defaultConfig(def);
  return { css: buildCss(def, cfg), svg: buildSvg(def, { ...cfg, size }) };
}

/** Page shell: freezes every animation at 35% of its loader's cycle so stills look mid-motion. */
function page(body: string, css: string, transparent = false) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  body{font-family:"Segoe UI",system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;color:#1d1a2c;${transparent ? "background:transparent" : "background:#fbfaff"}}
  ${css}</style></head><body>${body}
  <script>
    for (const svg of document.querySelectorAll("svg[data-d]")) {
      const t = Number(svg.dataset.d) * 1000 * 0.35;
      for (const a of svg.getAnimations({ subtree: true })) { a.pause(); a.currentTime = t; }
    }
  </script></body></html>`;
}

function withData(svg: string, def: AnimationSource) {
  return svg.replace("<svg ", `<svg data-d="${def.duration}" `);
}

const BASE_CSS = `
  .bg{position:absolute;inset:0;background:
    radial-gradient(600px 400px at 85% 15%, rgba(255,111,177,.18), transparent 70%),
    radial-gradient(700px 500px at 10% 100%, rgba(124,92,255,.16), transparent 70%), #fbfaff}
  .brand{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:800;letter-spacing:-.02em}
  .brand svg{width:48px;height:48px}
  .brand b{background:linear-gradient(90deg,#7c5cff,#ff6fb1);-webkit-background-clip:text;color:transparent}
  .title{position:absolute;left:72px;top:190px;width:600px;font-size:64px;line-height:1.04;font-weight:800;letter-spacing:-.035em}
  .sub{position:absolute;left:72px;bottom:120px;width:600px;font-size:26px;line-height:1.35;color:#615d78}
  .pill{position:absolute;left:72px;bottom:56px;display:inline-flex;gap:10px;align-items:center;padding:10px 20px;border-radius:999px;background:#1d1a2c;color:#fff;font-size:20px;font-weight:700}
  .tile{position:absolute;right:72px;top:85px;width:460px;height:460px;border-radius:56px;display:grid;place-items:center;box-shadow:0 30px 60px -30px rgba(40,24,90,.35);border:1px solid #ebe6f7}
`;

const jobs: { name: string; html: string; out: string; size?: [number, number]; transparent?: boolean }[] = [];

function tileBg(accent: string) {
  return `background:linear-gradient(150deg, color-mix(in srgb, ${accent} 20%, #fff), #f6f3ff)`;
}

// Loader images
for (const def of loaders) {
  const cat = CATEGORIES.find((c) => c.id === def.category)!;
  const wide = def.viewBox && !def.viewBox.endsWith("100 100");
  const m = loaderMarkup(def, wide ? 400 : 300);
  const title = def.name.length > 18 ? `<span style="font-size:56px">${esc(def.name)}</span>` : esc(def.name);
  jobs.push({
    name: def.slug,
    out: resolve(`public/og/${def.slug}.jpg`),
    html: page(
      `<div class="bg"></div><div class="brand">${logo}<span>Cute<b>Loader</b></span></div>
       <div class="title">${title}<br><span style="color:#8a86a0;font-size:44px">loading animation</span></div>
       <div class="sub">Free ${esc(cat.name.toLowerCase())} loader. Customize colors, speed &amp; size, then copy HTML/CSS, React or SVG.</div>
       <div class="pill">Free · No signup · CSS &amp; SVG</div>
       <div class="tile" style="${tileBg(cat.accent)}">${withData(m.svg, def)}</div>`,
      BASE_CSS + m.css,
    ),
  });
}

// Category images
for (const cat of CATEGORIES) {
  const picks = loaders.filter((l) => l.category === cat.id).sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const parts = picks.map((d) => loaderMarkup(d, 150));
  jobs.push({
    name: `category-${cat.id}`,
    out: resolve(`public/og/category-${cat.id}.jpg`),
    html: page(
      `<div class="bg"></div><div class="brand">${logo}<span>Cute<b>Loader</b></span></div>
       <div class="title" style="font-size:60px">${esc(cat.name)}<br><span style="color:#8a86a0;font-size:42px">loading animations</span></div>
       <div class="sub">${esc(cat.tagline)} Free to customize and use.</div>
       <div class="pill">${loaders.filter((l) => l.category === cat.id).length} free loaders</div>
       <div class="tile" style="${tileBg(cat.accent)};grid-template-columns:1fr 1fr;padding:40px;gap:10px">${parts
         .map((p, i) => `<div style="display:grid;place-items:center">${withData(p.svg, picks[i])}</div>`)
         .join("")}</div>`,
      BASE_CSS + parts.map((p) => p.css).join(""),
    ),
  });
}

// Default image
{
  const picks = ["bouncing-bunny", "minimal-ring", "blooming-flower", "terminal-typing", "liquid-morph", "three-dot-pulse"]
    .map((s) => bySlug.get(s))
    .filter((d): d is AnimationSource => !!d);
  const parts = picks.map((d) => loaderMarkup(d, 120));
  jobs.push({
    name: "default",
    out: resolve("public/og/default.jpg"),
    html: page(
      `<div class="bg"></div><div class="brand">${logo}<span>Cute<b>Loader</b></span></div>
       <div class="title">Loading, but make it <span style="background:linear-gradient(90deg,#7c5cff,#ff6fb1,#ffb38a);-webkit-background-clip:text;color:transparent">beautiful.</span></div>
       <div class="sub">${loaders.length} free, customizable website loaders. Copy HTML/CSS, React, SVG or GIF.</div>
       <div class="pill">Free forever · No signup</div>
       <div class="tile" style="background:#fff;grid-template-columns:repeat(2,1fr);padding:34px;gap:6px">${parts
         .map((p, i) => `<div style="display:grid;place-items:center">${withData(p.svg, picks[i])}</div>`)
         .join("")}</div>`,
      BASE_CSS + parts.map((p) => p.css).join(""),
    ),
  });
}

// Blog images
for (const a of articles) {
  const def = a.relatedAnimations.map((s) => bySlug.get(s)).find(Boolean) ?? loaders[0];
  const m = loaderMarkup(def, 260);
  const size = a.title.length > 60 ? 50 : a.title.length > 40 ? 56 : 62;
  jobs.push({
    name: `blog-${a.slug}`,
    out: resolve(`public/og/blog-${a.slug}.jpg`),
    html: page(
      `<div class="bg"></div><div class="brand">${logo}<span>Cute<b>Loader</b> <span style="font-weight:600;color:#8a86a0">· Blog</span></span></div>
       <div class="title" style="font-size:${size}px;width:640px">${esc(a.title)}</div>
       <div class="pill">Tutorial · tested code</div>
       <div class="tile" style="background:linear-gradient(150deg,#efeaff,#fff);width:400px;height:400px;top:115px">${withData(m.svg, def)}</div>`,
      BASE_CSS + m.css,
    ),
  });
}

// Icons (transparent background)
for (const [size, out] of [
  [512, resolve("public/icon-512.png")],
  [192, resolve("public/icon-192.png")],
  [180, resolve("src/app/apple-icon.png")],
  [32, resolve(".scratch/og/favicon-32.png")],
] as [number, string][]) {
  jobs.push({
    name: `icon-${size}`,
    out,
    size: [size, size],
    transparent: true,
    html: `<!doctype html><html><head><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style></head><body>${logo}</body></html>`,
  });
}

async function shoot(job: (typeof jobs)[number]) {
  const file = join(scratch, `${job.name}.html`);
  writeFileSync(file, job.html);
  const [w, h] = job.size ?? [1200, 630];
  const profile = mkdtempSync(join(tmpdir(), "cl-og-"));
  try {
    await run(
      chrome!,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        `--user-data-dir=${profile}`,
        "--virtual-time-budget=3000",
        ...(job.transparent ? ["--default-background-color=00000000"] : []),
        `--window-size=${w},${h}`,
        `--screenshot=${job.out}`,
        pathToFileURL(file).href,
      ],
      { timeout: 120000 },
    );
  } finally {
    try { rmSync(profile, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

console.log(`Rendering ${jobs.length} images…`);
// Social cards: JPEG via one CDP browser (much smaller than PNG; crawlers accept both).
const cards = jobs.filter((j) => j.out.endsWith(".jpg"));
const icons = jobs.filter((j) => !j.out.endsWith(".jpg"));
let done = 0;
const browser = await Browser.launch(["--allow-file-access-from-files", "--hide-scrollbars"]);
try {
  await browser.setViewport(1200, 630);
  for (const job of cards) {
    const file = join(scratch, `${job.name}.html`);
    writeFileSync(file, job.html);
    await browser.goto(pathToFileURL(file).href, 250);
    await browser.evaluate("document.fonts.ready.then(() => true)");
    const shot = await browser.send<{ data: string }>("Page.captureScreenshot", { format: "jpeg", quality: 86 });
    writeFileSync(job.out, Buffer.from(shot.data, "base64"));
    done++;
    if (done % 20 === 0) console.log(`  ${done}/${jobs.length}`);
  }
} finally {
  await browser.close();
}
// Icons need transparency: PNG via the screenshot CLI.
for (const job of icons) {
  await shoot(job);
  done++;
}

// favicon.ico: a single 32×32 PNG wrapped in an ICO container (supported by all current browsers).
const png = readFileSync(resolve(".scratch/og/favicon-32.png"));
const ico = Buffer.alloc(6 + 16);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt8(0, 8);
ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
writeFileSync(resolve("src/app/favicon.ico"), Buffer.concat([ico, png]));
console.log(`Done: ${jobs.length} images + favicon.ico`);

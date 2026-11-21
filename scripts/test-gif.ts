/**
 * GIF export QA: compiles the real gif modules for the browser, renders GIFs for a
 * sample of loaders in headless Chrome, then verifies each file independently:
 * valid GIF89a structure, loop extension, expected frame count, dimensions, and
 * that the frames actually differ (i.e. the animation was captured).
 *
 *   node --import ./scripts/register.mjs scripts/test-gif.ts [slug ...]
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import type { AnimationSource } from "../src/types/animation.ts";
import { Browser } from "./cdp.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript") as typeof import("typescript");

const all: AnimationSource[] = [];
for (const c of ["cute", "abstract", "minimal", "technology", "nature", "business", "food"]) {
  const p = resolve(`src/animations/${c}.ts`);
  if (existsSync(p)) all.push(...((await import(pathToFileURL(p).href)).default as AnimationSource[]));
}
const wanted = process.argv.slice(2);
const sample = wanted.length
  ? all.filter((a) => wanted.includes(a.slug))
  : ["bouncing-bunny", "minimal-ring", "terminal-typing", "blooming-flower", "gradient-waves", "line-loader", "processing-gears", "neon-rings"]
      .map((s) => all.find((a) => a.slug === s))
      .filter((a): a is AnimationSource => !!a);

const out = resolve(".scratch/gif");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// Compile engine + gif modules to browser ES modules.
for (const [src, name] of [
  ["src/lib/engine.ts", "engine.js"],
  ["src/lib/gif.ts", "gif.js"],
  ["src/lib/gif-capture.ts", "gif-capture.js"],
]) {
  const js = ts
    .transpileModule(readFileSync(resolve(src), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText.replace(/from "\.\/engine"/g, 'from "./engine.js"')
    .replace(/from "\.\/gif"/g, 'from "./gif.js"');
  writeFileSync(join(out, name), js);
}

writeFileSync(join(out, "defs.js"), `export default ${JSON.stringify(sample)};`);
writeFileSync(
  join(out, "harness.html"),
  `<!doctype html><meta charset="utf-8"><body><pre id="out"></pre>
<script type="module">
import defs from "./defs.js";
import { renderGif } from "./gif-capture.js";
import { defaultConfig } from "./engine.js";
window.__result = (async () => {
  const results = [];
  for (const def of defs) {
    try {
      const cfg = defaultConfig(def);
      const t0 = performance.now();
      const blob = await renderGif({ def, cfg, size: 160, fps: 25, transparent: false, background: "#ffffff" });
      const ms = Math.round(performance.now() - t0);
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let bin = ""; for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
      const url = URL.createObjectURL(blob);
      const img = await new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = url; });
      results.push({ slug: def.slug, ms, size: bytes.length, b64: btoa(bin), decodes: !!img && img.naturalWidth > 0, w: img?.naturalWidth, h: img?.naturalHeight });
    } catch (e) { results.push({ slug: def.slug, error: String(e && e.message || e) }); }
  }
  return JSON.stringify(results);
})();
</script>`,
);

// Real-time run over CDP (no virtual time), so the timings are what users experience.
const browser = await Browser.launch(["--allow-file-access-from-files"]);
interface GifResult { slug: string; ms: number; size: number; b64: string; decodes: boolean; w: number; h: number; error?: string }
let results: GifResult[] = [];
try {
  await browser.goto(pathToFileURL(join(out, "harness.html")).href, 200);
  await browser.evaluate("new Promise(r => { const t = setInterval(() => { if (window.__result) { clearInterval(t); r(true); } }, 50); })");
  results = JSON.parse(await browser.evaluate<string>("window.__result", 600000));
} finally {
  await browser.close();
}
const errors = browser.logs.filter((l) => l.type === "exception" || l.type === "error");
if (errors.length) console.log("console errors:", errors.slice(0, 5));

/** Minimal independent GIF parser: walks the block structure and LZW-decodes frames. */
function parseGif(buf: Buffer) {
  if (buf.toString("ascii", 0, 6) !== "GIF89a") throw new Error("bad signature");
  const w = buf.readUInt16LE(6), h = buf.readUInt16LE(8);
  const packed = buf[10];
  let p = 13;
  const gctSize = packed & 0x80 ? 3 * (1 << ((packed & 7) + 1)) : 0;
  p += gctSize;
  let loop = false, frames = 0, totalDelay = 0;
  const frameData: Uint8Array[] = [];
  while (p < buf.length) {
    const b = buf[p++];
    if (b === 0x3b) break;
    if (b === 0x21) {
      const label = buf[p++];
      if (label === 0xf9) totalDelay += buf.readUInt16LE(p + 2);
      if (label === 0xff && buf.toString("ascii", p + 1, p + 12) === "NETSCAPE2.0") loop = true;
      while (buf[p] !== 0) p += buf[p] + 1;
      p++;
    } else if (b === 0x2c) {
      const fw = buf.readUInt16LE(p + 4), fh = buf.readUInt16LE(p + 6);
      p += 9;
      const minCode = buf[p++];
      const chunks: number[] = [];
      while (buf[p] !== 0) { const n = buf[p]; for (let i = 1; i <= n; i++) chunks.push(buf[p + i]); p += n + 1; }
      p++;
      frameData.push(lzwDecode(Uint8Array.from(chunks), minCode, fw * fh));
      frames++;
    } else throw new Error(`unexpected block 0x${b.toString(16)} at ${p - 1}`);
  }
  return { w, h, loop, frames, totalDelay, frameData };
}

function lzwDecode(data: Uint8Array, minCode: number, pixels: number): Uint8Array {
  const clear = 1 << minCode, eoi = clear + 1;
  let size = minCode + 1, next = eoi + 1;
  let dict: number[][] = [];
  const reset = () => { dict = []; for (let i = 0; i < clear; i++) dict[i] = [i]; size = minCode + 1; next = eoi + 1; };
  reset();
  const out = new Uint8Array(pixels);
  let o = 0, bits = 0, cur = 0, prev: number[] | null = null;
  for (let i = 0; i < data.length; i++) {
    cur |= data[i] << bits; bits += 8;
    while (bits >= size) {
      const code = cur & ((1 << size) - 1); cur >>>= size; bits -= size;
      if (code === clear) { reset(); prev = null; continue; }
      if (code === eoi) return out;
      let entry: number[];
      if (dict[code]) entry = dict[code];
      else if (code === next && prev) entry = [...prev, prev[0]];
      else throw new Error(`invalid LZW code ${code}`);
      for (const v of entry) if (o < pixels) out[o++] = v;
      if (prev && next < 4096) { dict[next++] = [...prev, entry[0]]; if (next === 1 << size && size < 12) size++; }
      prev = entry;
    }
  }
  return out;
}

let failed = 0;
for (const r of results) {
  if (!r.error && !r.b64) r.error = `harness returned no data (keys: ${Object.keys(r).join(",")})`;
  if (r.error) { console.log(`✗ ${r.slug}: ${r.error}`); failed++; continue; }
  const buf = Buffer.from(r.b64, "base64");
  writeFileSync(join(out, `${r.slug}.gif`), buf);
  try {
    const g = parseGif(buf);
    const distinct = new Set(g.frameData.map((f) => Buffer.from(f).toString("base64").slice(0, 0) + Buffer.from(f).toString("base64"))).size;
    const problems: string[] = [];
    if (!r.decodes) problems.push("browser could not decode it");
    if (!g.loop) problems.push("no loop extension");
    if (g.frames < 8) problems.push(`only ${g.frames} frames`);
    if (distinct < Math.min(4, g.frames)) problems.push(`only ${distinct} distinct frames (animation not captured)`);
    if (g.w !== r.w || g.h !== r.h) problems.push("size mismatch");
    const def = sample.find((s) => s.slug === r.slug)!;
    console.log(
      `${problems.length ? "✗" : "✓"} ${r.slug.padEnd(20)} ${g.w}×${g.h}, ${g.frames} frames (${distinct} distinct), loop ${(g.totalDelay / 100).toFixed(2)}s vs cycle ${def.duration}s, ${(r.size / 1024).toFixed(1)} KB, ${r.ms} ms`,
    );
    if (problems.length) { failed++; console.log("    " + problems.join("; ")); }
  } catch (e) {
    failed++;
    console.log(`✗ ${r.slug}: invalid GIF (${(e as Error).message})`);
  }
}
console.log(failed ? `\n${failed} GIF export(s) failed.` : `\nAll ${results.length} GIF exports valid. Files in .scratch/gif/`);
process.exit(failed ? 1 : 0);

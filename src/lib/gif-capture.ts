/**
 * Turns a live CSS-animated SVG into GIF frames, deterministically:
 *  1. render the loader offscreen with its real CSS,
 *  2. pause every animation and seek it to time t (Web Animations API),
 *  3. bake the computed styles into a static SVG clone,
 *  4. rasterize that clone to a canvas.
 * No screen recording, no server, no third-party code.
 */
import type { AnimationSource, LoaderConfig } from "@/types/animation";
import { buildCss, buildSvg, parseViewBox } from "./engine";
import { encodeGif, type RgbaFrame } from "./gif";

const PROPS = [
  "transform",
  "transform-origin",
  "transform-box",
  "translate",
  "rotate",
  "scale",
  "opacity",
  "fill",
  "fill-opacity",
  "stroke",
  "stroke-opacity",
  "stroke-width",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "visibility",
  "display",
  "stop-color",
  "stop-opacity",
  "font-family",
  "font-size",
  "font-weight",
  "letter-spacing",
  "mix-blend-mode",
];

export interface GifRequest {
  def: AnimationSource;
  cfg: LoaderConfig;
  size: number;
  fps: number;
  transparent: boolean;
  background: string;
  onProgress?: (p: number) => void;
  signal?: AbortSignal;
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

/** Length of one seamless loop: the LCM of all animation cycles (in 10ms units), capped. */
export function loopLength(durationsMs: number[], fallback: number, cap: number): number {
  const units = durationsMs.filter((d) => d > 0 && Number.isFinite(d)).map((d) => Math.max(1, Math.round(d / 10)));
  if (!units.length) return fallback;
  let l = units[0];
  for (const u of units.slice(1)) {
    l = (l * u) / gcd(l, u);
    if (l * 10 > cap) return cap;
  }
  return Math.min(l * 10, cap);
}

function sameFrame(a: Uint8ClampedArray, b: Uint8ClampedArray): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "sync";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not rasterize frame"));
    img.src = url;
  });
}

export async function renderGif(req: GifRequest): Promise<Blob> {
  const { def, size, fps, onProgress, signal } = req;
  const cfg: LoaderConfig = { ...req.cfg, loop: true, size };
  const [vx, vy, vw, vh] = parseViewBox(def.viewBox);
  const width = vw >= vh ? size : Math.round((size * vw) / vh);
  const height = vw >= vh ? Math.round((size * vh) / vw) : size;

  // 1. Live, offscreen copy of the loader.
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;left:-10000px;top:0;pointer-events:none;";
  host.innerHTML = `<style>${buildCss(def, cfg)}</style>${buildSvg(def, { ...cfg, size })}`;
  document.body.appendChild(host);

  try {
    const svg = host.querySelector("svg") as SVGSVGElement;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const anims = svg.getAnimations({ subtree: true });
    for (const a of anims) a.pause();

    const cycle = (def.duration / cfg.speed) * 1000;
    const durations = anims.map((a) => Number(a.effect?.getTiming().duration) || 0);
    const total = loopLength(durations, cycle, cycle * 4);
    const frameCount = Math.max(8, Math.min(150, Math.round((total / 1000) * fps)));
    const step = total / frameCount;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Canvas is not available in this browser");

    const sources = Array.from(svg.querySelectorAll("*"));
    const frames: RgbaFrame[] = [];
    const serializer = new XMLSerializer();
    let elapsedCs = 0;

    for (let i = 0; i < frameCount; i++) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
      const t = i * step;
      for (const a of anims) a.currentTime = t;

      // 2–3. Bake computed styles into a static clone.
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("width", String(width));
      clone.setAttribute("height", String(height));
      clone.removeAttribute("class");
      const targets = Array.from(clone.querySelectorAll("*"));
      sources.forEach((src, idx) => {
        const dst = targets[idx] as SVGElement | undefined;
        if (!dst) return;
        const cs = getComputedStyle(src);
        const decl: string[] = [];
        for (const p of PROPS) {
          const v = cs.getPropertyValue(p);
          if (!v || (p === "transform" && v === "none")) continue;
          decl.push(`${p}:${v}`);
        }
        decl.push("animation:none", "transition:none");
        dst.setAttribute("style", decl.join(";"));
        dst.removeAttribute("class");
      });
      clone.querySelectorAll("style").forEach((s) => s.remove());

      const markup = serializer.serializeToString(clone);
      const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }));
      try {
        const img = await loadImage(url);
        ctx.clearRect(0, 0, width, height);
        if (!req.transparent) {
          ctx.fillStyle = req.background;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(img, 0, 0, width, height);
      } finally {
        URL.revokeObjectURL(url);
      }
      const data = ctx.getImageData(0, 0, width, height).data;
      // Distribute rounding so the total GIF duration matches the loop exactly.
      const targetCs = Math.round(((i + 1) * step) / 10);
      const delay = Math.max(2, targetCs - elapsedCs);
      const prev = frames[frames.length - 1];
      if (prev && sameFrame(prev.data, data)) {
        // Stepped animations hold still for several frames: extend the previous frame instead.
        prev.delayCs += delay;
      } else {
        frames.push({ data: new Uint8ClampedArray(data), delayCs: delay });
      }
      elapsedCs = targetCs;
      onProgress?.(((i + 1) / frameCount) * 0.85);
      if (i % 6 === 5) await new Promise((r) => setTimeout(r, 0));
    }

    void vx;
    void vy;
    const bytes = encodeGif(frames, {
      width,
      height,
      transparent: req.transparent,
      matte: hexToRgb(req.background),
    });
    onProgress?.(1);
    return new Blob([bytes.buffer as ArrayBuffer], { type: "image/gif" });
  } finally {
    host.remove();
  }
}

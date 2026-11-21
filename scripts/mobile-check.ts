/**
 * Responsive check: emulates phone/tablet viewports over CDP, reports horizontal
 * overflow (and the elements causing it), and saves screenshots.
 *   node --import ./scripts/register.mjs scripts/mobile-check.ts [baseUrl] [path ...]
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { Browser } from "./cdp.ts";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const paths = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ["/", "/animations/", "/animations/cute/", "/animations/abstract/neon-rings/", "/loading-animation-generator/", "/blog/", "/guides/", "/css-loaders/", "/showcase/"];
const viewports = [
  { name: "phone", w: 375, h: 812, mobile: true },
  { name: "tablet", w: 820, h: 1180, mobile: true },
];
mkdirSync(".scratch/mobile", { recursive: true });
const b = await Browser.launch();
let problems = 0;
try {
  for (const vp of viewports) {
    await b.setViewport(vp.w, vp.h, vp.mobile);
    for (const p of paths) {
      await b.goto(base + p, 800);
      const r = await b.evaluate<{ sw: number; iw: number; offenders: string[] }>(`(() => {
        const iw = window.innerWidth, sw = document.documentElement.scrollWidth;
        const offenders = [];
        if (sw > iw) {
          for (const el of document.querySelectorAll("body *")) {
            const rect = el.getBoundingClientRect();
            if (rect.right > iw + 1 && rect.width > 0) {
              let anc = el.parentElement, clipped = false;
              while (anc && anc !== document.body) {
                const ov = getComputedStyle(anc).overflowX;
                if (ov === "auto" || ov === "scroll" || ov === "hidden" || ov === "clip") { clipped = true; break; }
                anc = anc.parentElement;
              }
              if (!clipped) offenders.push(el.tagName.toLowerCase() + "." + String(el.className).slice(0, 60) + " right=" + Math.round(rect.right));
            }
          }
        }
        return { sw, iw, offenders: offenders.slice(0, 6) };
      })()`);
      const ok = r.sw <= r.iw;
      if (!ok) problems++;
      console.log(`${ok ? "✓" : "✗"} ${vp.name} ${p} scrollWidth=${r.sw} viewport=${r.iw}`);
      for (const o of r.offenders) console.log("    " + o);
      const name = `${vp.name}${p.replace(/\//g, "_") || "_"}.png`;
      writeFileSync(`.scratch/mobile/${name}`, await b.screenshot());
    }
  }
} finally {
  await b.close();
}
console.log(problems ? `\n${problems} page(s) overflow horizontally.` : "\nNo horizontal overflow.");

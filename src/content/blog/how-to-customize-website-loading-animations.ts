import type { Article } from "@/types/content";

const demoHtml = `<div class="demo">
  <div class="stage" id="stage">
    <svg class="my-loader" id="loader" viewBox="0 0 100 100" width="112" height="112" aria-hidden="true" focusable="false">
      <circle class="track" cx="50" cy="50" r="36" />
      <circle class="arc" cx="50" cy="50" r="36" />
      <circle class="dot" cx="50" cy="50" r="10" />
    </svg>
    <p class="contrast" id="contrast"></p>
  </div>
  <form class="controls" id="controls">
    <label>Primary <input type="color" name="c1" value="#6d28d9" /></label>
    <label>Secondary <input type="color" name="c2" value="#f472b6" /></label>
    <label>Speed <input type="range" name="speed" min="0.25" max="3" step="0.05" value="1" /> <output name="speedOut">1×</output></label>
    <label>Stroke <input type="range" name="sw" min="2" max="14" step="0.5" value="8" /></label>
    <label>Intensity <input type="range" name="amp" min="0.4" max="1.6" step="0.05" value="1" /></label>
    <label><input type="checkbox" name="reverse" /> Reverse</label>
    <label><input type="checkbox" name="dark" /> Dark background</label>
  </form>
  <pre id="css"></pre>
</div>`;

const demoCss = `body { margin: 0; font: 14px/1.4 system-ui, sans-serif; color: #1f1b2e; background: #ffffff; }
.demo { display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: 12px 16px; padding: 16px; }
.stage { display: grid; place-items: center; align-content: center; gap: 6px; min-height: 180px; border: 1px solid #e4def0; border-radius: 12px; background: #ffffff; transition: background-color 0.2s; }
.stage.dark { background: #15131c; color: #ece9f3; }
.contrast { margin: 0; padding: 0 8px; font-size: 11px; text-align: center; }
.controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 12px; align-content: start; }
.controls label { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.controls input[type="range"] { flex: 1; min-width: 0; }
.controls input[type="color"] { width: 36px; height: 26px; padding: 0; border: 1px solid #c9c2e0; border-radius: 6px; }
output { min-width: 3em; font-variant-numeric: tabular-nums; }
pre { grid-column: 1 / -1; margin: 0; padding: 10px 12px; overflow: auto; font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace; background: #f6f4fb; border-radius: 10px; }
@media (max-width: 520px) {
  .demo { grid-template-columns: minmax(0, 1fr); }
  .stage { min-height: 150px; }
  .controls label { gap: 4px; font-size: 12px; }
}

.my-loader { --c1: #6d28d9; --c2: #f472b6; --d: 1.2s; --sw: 8; --amp: 1; display: block; }
.my-loader .track { fill: none; stroke: var(--c1); stroke-width: var(--sw); opacity: 0.18; }
.my-loader .arc {
  fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round;
  stroke-dasharray: 56.55 169.65; transform-origin: 50px 50px;
  animation: spin var(--d) linear infinite;
}
.my-loader .dot {
  fill: var(--c2); transform-box: fill-box; transform-origin: center;
  animation: pulse var(--d) ease-in-out infinite;
}
.my-loader.is-reversed .arc { animation-direction: reverse; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 50% { transform: scale(calc(1 + 0.6 * var(--amp))); } }
@media (prefers-reduced-motion: reduce) {
  .my-loader .arc, .my-loader .dot { animation-duration: calc(var(--d) * 3); }
}`;

const demoJs = `function init() {
  const BASE = 1.2; // seconds per cycle at 1x speed
  const form = document.getElementById("controls");
  const loader = document.getElementById("loader");
  const stage = document.getElementById("stage");
  const cssOut = document.getElementById("css");
  const contrastOut = document.getElementById("contrast");

  // WCAG relative luminance and contrast ratio
  function luminance(hex) {
    const [r, g, b] = hex.match(/\\w\\w/g).map((c) => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  }

  function update() {
    const f = form.elements;
    const vars = {
      "--c1": f.c1.value,
      "--c2": f.c2.value,
      "--d": (BASE / Number(f.speed.value)).toFixed(2) + "s",
      "--sw": f.sw.value,
      "--amp": f.amp.value,
    };
    for (const [name, value] of Object.entries(vars)) loader.style.setProperty(name, value);
    loader.classList.toggle("is-reversed", f.reverse.checked);
    stage.classList.toggle("dark", f.dark.checked);
    f.speedOut.value = f.speed.value + "×";

    const ratio = contrast(f.c1.value, f.dark.checked ? "#15131c" : "#ffffff");
    contrastOut.textContent = "Primary vs background: " + ratio.toFixed(2) + ":1" + (ratio >= 3 ? " (meets 3:1)" : " (below 3:1)");

    cssOut.textContent =
      ".my-loader {\\n" +
      Object.entries(vars).map(([name, value]) => "  " + name + ": " + value + ";").join("\\n") +
      "\\n}" +
      (f.reverse.checked ? "\\n.my-loader .arc { animation-direction: reverse; }" : "");
  }

  form.addEventListener("input", update);
  form.addEventListener("submit", (event) => event.preventDefault());
  update();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();`;

const article: Article = {
  slug: "how-to-customize-website-loading-animations",
  title: "How to Customize Website Loading Animations",
  seoTitle: "Customize Loading Animations: Colors, Speed, Dark Mode",
  description:
    "Customize a website loading animation: brand colors with real contrast, size, speed, easing, stroke, intensity, direction and dark mode via CSS variables.",
  excerpt:
    "Colors, size, speed, stroke, intensity, direction and dark mode: what each dial does to a loading animation, the numbers that keep it readable, and when to edit CSS instead of using the studio.",
  publishedAt: "2026-11-21",
  tags: ["Customization", "CSS", "Dark mode", "Design"],
  relatedAnimations: ["minimal-ring", "wave-bars", "neon-rings", "elegant-spinner", "cute-planet"],
  blocks: [
    {
      type: "p",
      text: "Customizing a loading animation comes down to a handful of dials: color, size, speed, stroke weight, motion intensity and direction, plus a dark-mode variant. When a loader exposes those dials as CSS custom properties, you can change all of them from your own stylesheet without touching the SVG. Every CuteLoader loader does: `--c1` and `--c2` hold the colors (plus `--c3` on loaders with an accent), `--d` the cycle duration, and, where a loader supports them, `--sw` the stroke width and `--amp` the motion intensity.",
    },
    {
      type: "p",
      text: "This guide explains what each dial does, the numbers that keep a loader readable, and when to use the visual studio on a loader page versus editing the exported CSS. Try the dials in the demo first:",
    },
    {
      type: "demo",
      html: demoHtml,
      css: demoCss,
      js: demoJs,
      height: 465,
      caption: "Every control writes one CSS custom property. The readout checks the primary color's contrast against the background.",
    },
    { type: "h2", text: "The dials, as custom properties" },
    {
      type: "table",
      head: ["Variable", "Controls", "In the studio", "Present on"],
      rows: [
        ["`--c1`, `--c2`", "Primary and secondary colors", "Color pickers labeled by role, such as Arc and Track", "Every loader"],
        ["`--c3`", "Accent color", "Third color picker", "Loaders with an accent"],
        ["`--d`", "Duration of one cycle, e.g. `0.9s`", "Speed, 0.25× to 3×", "Every loader"],
        ["`--sw`", "Stroke width in SVG units", "Stroke width", "Stroke-based loaders"],
        ["`--amp`", "Motion intensity multiplier", "Intensity, 0.4 to 1.6", "Some loaders"],
      ],
    },
    {
      type: "p",
      text: "An exported loader declares these variables on its own root class, and every rule below reads them. Here is the top of a default Minimal Ring export:",
    },
    {
      type: "code",
      lang: "css",
      filename: "Exported CSS (excerpt)",
      code: `.cl-minimal-ring {
  --c1: #6366f1;
  --c2: #a5b4fc;
  --d: 0.9s;
  --sw: 8;
  display: block;
  overflow: visible;
}

.cl-minimal-ring .arc {
  stroke: var(--c1);
  stroke-width: var(--sw);
  animation: cl-minimal-ring-spin calc(var(--d) * var(--rm,1)) linear infinite;
}`,
    },
    {
      type: "p",
      text: "To customize it, override the variables on the **same class**, in a stylesheet that loads after the export. Setting them on a parent element doesn't work: the loader declares its own values, and a value declared on an element always beats one it would inherit. Variables also accept other variables, which is how you wire a loader to your design tokens:",
    },
    {
      type: "code",
      lang: "css",
      filename: "your-styles.css",
      code: `.cl-minimal-ring {
  --c1: var(--brand-600);
  --c2: var(--brand-200);
  --d: 1.2s;
}`,
    },
    {
      type: "p",
      text: "Notice that the duration is wrapped as `calc(var(--d) * var(--rm,1))`. The export sets `--rm` to 3 inside a `prefers-reduced-motion` query, so your custom duration is still slowed down for people who asked for less motion. For more on how this variable-driven structure works, see [how to build a reusable CSS loader](/blog/how-to-build-a-reusable-css-loader/).",
    },
    { type: "h2", text: "Brand colors that still read" },
    {
      type: "p",
      text: "Give the brand color to the part that moves, because that's what people watch, and use a lighter tint or a low-opacity version for the track. Then check contrast. WCAG's [non-text contrast criterion, 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), asks for 3:1 between graphics people need and the colors around them, and it's a sensible floor for a loader's moving part. Pastel brand colors are where this goes wrong:",
    },
    {
      type: "code",
      lang: "js",
      code: `// WCAG contrast ratio between two hex colors
function luminance(hex) {
  const [r, g, b] = hex.match(/\\w\\w/g).map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

contrast("#f9a8d4", "#ffffff"); // 1.81: a pastel pink nearly disappears on white
contrast("#db2777", "#ffffff"); // 4.60: the deeper pink reads clearly
contrast("#6d28d9", "#15131c"); // 2.59: a purple that's 7.10:1 on white fails on near-black`,
    },
    {
      type: "p",
      text: "The last line is the one that catches people: contrast depends on the background, so a color that works in light mode can fail in dark mode. Check each theme separately. The secondary color can be softer when it's a track or a background shape, but if the loader only makes sense when both colors are visible, as with two dots that alternate, both need to hold up.",
    },
    { type: "h2", text: "Size relative to context" },
    {
      type: "p",
      text: "Size follows from where the loader sits: about one line of text inside a button, 32–48 px in a card, 48–96 px when it holds a whole page. The studio's size control covers 24 to 400 px. For loaders inside buttons and text, size in `em` so the loader scales with the font:",
    },
    {
      type: "code",
      lang: "css",
      code: `.button .cl-minimal-ring {
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.25em;
  --sw: 12; /* thicker, because it's drawn small */
}`,
    },
    { type: "h3", text: "Stroke weight scales with size" },
    {
      type: "p",
      text: "`--sw` is measured in SVG units, and CuteLoader loaders are drawn on a 100-unit canvas, so the rendered stroke is `--sw × size ÷ 100` pixels. Minimal Ring's default of 8 draws about a 2 px line at 24 px, which can look faint, and a 32 px line at 400 px, which looks heavy. Raise `--sw` for small loaders and lower it for large ones, aiming, as a rule of thumb, for a rendered stroke of roughly 2.5–6 px. Matching it to your typography helps too: thin rings sit well beside light, airy type, and chunkier strokes beside bold UI.",
    },
    { type: "h2", text: "Speed, duration and easing" },
    {
      type: "p",
      text: "`--d` is the length of one full cycle. Because every timing in a CuteLoader loader is derived from it, as a multiple or a fraction, changing that one value speeds up or slows down the whole animation without breaking its rhythm. The studio's speed control divides the base duration: 2× halves `--d`, and 0.5× doubles it.",
    },
    {
      type: "ul",
      items: [
        "**Faster isn't more reassuring.** A spinner turning several times a second reads as frantic. In our experience, most spinners feel settled at roughly one rotation per 0.8–1.5 seconds; very slow ones can look stalled.",
        "**Rotation should be linear.** Easing on a continuous spin makes it speed up and slow down every turn, which reads as stuttering.",
        "**Pulses and bounces want ease-in-out**, which mimics how real objects accelerate and settle.",
        "**Stagger with negative delays.** When several parts animate on the same cycle, a negative `animation-delay` such as `calc(var(--d) * -0.25)` offsets them while making the loader look mid-motion from its very first frame, instead of starting with everything lined up.",
      ],
    },
    { type: "h2", text: "Motion intensity" },
    {
      type: "p",
      text: "`--amp` multiplies how far things travel or how much they grow, between 0.4 and 1.6 in the studio. Loaders that support it use it inside their keyframes, for example `translateY(calc(var(--amp) * -14px))`. Turn it down for dense dashboards, small sizes and loaders that sit beside text people are reading, where large movement pulls the eye away. Turn it up for splash screens and empty states where the loader is the only thing on screen. Wave Bars is a good one to experiment with:",
    },
    {
      type: "loader",
      slug: "wave-bars",
      caption: "Wave Bars supports intensity: lower values give a subtle ripple, higher values a bold equalizer.",
    },
    { type: "h2", text: "Reversing direction" },
    {
      type: "p",
      text: "Spinners, orbits and flows look just as correct running the other way, so reversing them is a free way to match a logo's rotation or to pair two loaders that turn against each other. In an export with reverse enabled, a single rule handles it: `animation-direction: reverse` on the loader and all of its children. The studio only offers the control where it works. Characters and bounces have a direction built into their timing, such as anticipation before a jump, and reversed they look like a film played backwards.",
    },
    { type: "h2", text: "Dark mode with custom properties" },
    {
      type: "p",
      text: "Because the colors are variables, a dark theme is a few overrides. Lighter tints usually work better on dark backgrounds, and very saturated colors can look harsh on near-black. If your site follows the operating system setting:",
    },
    {
      type: "code",
      lang: "css",
      code: `@media (prefers-color-scheme: dark) {
  .cl-minimal-ring { --c1: #a5b4fc; --c2: #4338ca; }
}

/* Or, with a theme toggle that sets data-theme on <html>: */
[data-theme="dark"] .cl-minimal-ring { --c1: #a5b4fc; --c2: #4338ca; }`,
    },
    {
      type: "p",
      text: "Modern browsers also support [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark), which picks one of two colors based on the active color scheme and has worked across major browsers since 2024. It needs `color-scheme` set, and it lets one declaration serve both the system preference and a toggle:",
    },
    {
      type: "code",
      lang: "css",
      code: `:root { color-scheme: light dark; }        /* follow the system */
[data-theme="dark"] { color-scheme: dark; } /* or force it from a toggle */

.cl-minimal-ring {
  --c1: light-dark(#4f46e5, #a5b4fc);
  --c2: light-dark(#c7d2fe, #4338ca);
}`,
    },
    {
      type: "p",
      text: "Re-check contrast for each theme, and preview against your real background: the studio lets you switch between light, dark, transparent and a custom background color for exactly this reason. A transparent export takes on whatever background the page has.",
    },
    { type: "h2", text: "Studio or exported CSS?" },
    {
      type: "table",
      head: ["", "Studio on the loader page", "Editing exported CSS"],
      rows: [
        ["Best for", "Finding the look: colors, size, speed, stroke, intensity, direction", "Wiring the look into your site: tokens, themes, per-page variations"],
        ["Feedback", "Live preview on light, dark, transparent or custom backgrounds", "Your real page and components"],
        ["Safety net", "Undo and redo, reset, a share link, configuration as JSON", "Version control"],
        ["Output", "HTML + CSS, React + TypeScript, SVG file, plain JavaScript, embed snippet, animated GIF", "Whatever your stylesheet says, at runtime"],
        ["Dark mode", "Preview it; export one look at a time", "Both themes from one export"],
      ],
    },
    {
      type: "p",
      text: "The workflow that works best is both: design in the studio on a page such as [Minimal Ring](/animations/minimal/minimal-ring/), export, then move the values into your stylesheet as variable overrides so they follow your tokens and themes. Two exports behave differently. The React component takes the same settings as props (`primary`, `secondary`, `speed`, `stroke` and so on) and applies them inline, so change props rather than writing CSS overrides, which inline values would beat. And the GIF and standalone SVG files have their settings baked in, so re-export them from the studio when the design changes.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Save the studio's configuration JSON or share link next to your design tokens. When someone asks why the loader is that exact purple at 1.2 seconds, the answer is one click away, and you can reopen the same settings to tweak them.",
    },
    {
      type: "p",
      text: "Ready to try it on a real design? Start from the [loading animation library](/animations/), or read the [loading animation best practices](/blog/website-loading-animation-best-practices/) for how big, how fast and how long a loader should be once it's customized.",
    },
  ],
  faqs: [
    {
      q: "Why doesn't setting --c1 on a parent element change my loader's color?",
      a: "Because the exported loader declares `--c1` on its own root class, and a value declared on an element beats one it would inherit from a parent. Override the variable on the loader's class instead, for example `.cl-minimal-ring { --c1: #db2777; }`, in a stylesheet loaded after the export, or with a more specific selector such as `.dark .cl-minimal-ring`.",
    },
    {
      q: "What contrast does a loading animation need?",
      a: "Aim for at least 3:1 between the moving part and its background, the threshold WCAG 1.4.11 uses for meaningful graphics. Check light and dark themes separately, since a color that passes on white can fail on near-black. Decorative tracks and backgrounds can be softer as long as the moving part stays clear.",
    },
    {
      q: "How do I make my loader slower without breaking reduced-motion support?",
      a: "Change `--d` (or use the studio's speed control) rather than editing individual animation durations. Every timing in a CuteLoader export is calculated from `--d` and multiplied by a reduced-motion factor that the export sets to 3 when the user prefers reduced motion, so a custom duration stays proportionally calmer for those users.",
    },
    {
      q: "Can I change a loader's colors at runtime with JavaScript?",
      a: "Yes. Set the custom property on the loader element: `loader.style.setProperty(\"--c1\", \"#db2777\")`. The change applies on the next frame without restarting the animation. For React exports, pass a new `primary` or `secondary` prop instead.",
    },
  ],
};

export default article;

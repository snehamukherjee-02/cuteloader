import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "css",
  framework: "CSS",
  title: "Customize, Theme and Place a CSS Loading Animation",
  seoTitle: "CSS Loading Animation: Custom Properties and Dark Mode",
  description: "Customize a CuteLoader CSS loading animation with custom properties, theme it for dark mode with prefers-color-scheme or [data-theme], and place it anywhere.",
  intro: "Every CuteLoader export is an inline SVG styled by a short stylesheet, and nearly everything you might want to change is a CSS custom property. This guide shows how to recolor, resize and retime a loader without touching its keyframes, how to theme it for dark mode with prefers-color-scheme or a data-theme attribute, and three placement patterns you'll use again and again: a full-screen overlay, an inline loader in a card, and a spinner inside a button.",
  summary: "Custom properties, dark mode, placement",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "A loader exported from CuteLoader with the **HTML/CSS** tab: the markup and its stylesheet. The examples use a demo ring; every loader is customized the same way.",
        "A stylesheet of your own that loads **after** the exported one, so your overrides win when specificity is equal.",
        "If you haven't placed a loader on a page yet, start with the [plain HTML guide](/guides/html/).",
      ],
    },
    { type: "h2", text: "How the exported CSS is organized" },
    { type: "p", text: "Here is the demo ring's export, plus the `.cl-overlay` helper class that ships with the JavaScript export and that this guide uses for the full-screen pattern:" },
    {
      type: "code",
      lang: "css",
      filename: "css/cuteloader.css",
      code: `.cl-demo-ring {
  --c1: #8b5cf6;
  --c2: #f472b6;
  --d: 1.4s;
  --sw: 6;
  display: block;
  overflow: visible;
}
.cl-demo-ring .track { fill: none; stroke: var(--c1); stroke-width: var(--sw); opacity: .25; }
.cl-demo-ring .spin { transform-origin: 50px 50px; animation: cl-demo-ring-spin calc(var(--d) * var(--rm,1)) linear infinite; }
.cl-demo-ring .dot { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: cl-demo-ring-pulse calc(calc(var(--d) * var(--rm,1)) / 2) ease-in-out infinite; }
@keyframes cl-demo-ring-spin { to { transform: rotate(360deg); } }
@keyframes cl-demo-ring-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(.7); } }
@media (prefers-reduced-motion: reduce) { .cl-demo-ring { --rm: 3; } }
.cl-wrap { display: inline-grid; place-items: center; }
.cl-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.cl-overlay { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; background: rgba(255, 255, 255, 0.75); }
.cl-overlay[hidden] { display: none; }`,
    },
    { type: "p", text: "The root rule, `.cl-demo-ring`, declares the settings. Everything below it only reads them:" },
    {
      type: "table",
      head: ["Property", "Controls", "Notes"],
      rows: [
        ["`--c1`", "Primary color", "Every loader"],
        ["`--c2`", "Secondary color", "Every loader"],
        ["`--c3`", "Accent color", "Loaders with a third color"],
        ["`--d`", "Length of one cycle", "Every animation timing is derived from it"],
        ["`--sw`", "Stroke width", "Loaders drawn with strokes, in SVG units"],
        ["`--amp`", "Motion intensity", "Loaders with an intensity setting"],
        ["`--rm`", "Reduced-motion multiplier", "Set to 3 by the media query"],
      ],
    },
    { type: "loader", slug: "wave-bars", caption: "Wave Bars reads the same variables, so every technique below applies to it unchanged; only its class name, `cl-wave-bars`, is different." },
    { type: "h2", text: "Override the variables on the loader itself" },
    { type: "p", text: "The variables are declared on the loader element, not inherited from above. That has one important consequence: setting `--c1` on a parent does nothing, because the loader's own declaration beats any inherited value. Target the loader:" },
    {
      type: "code",
      lang: "css",
      filename: "css/loader-custom.css",
      code: `/* Load after cuteloader.css. */

/* Every demo ring on the site */
.cl-demo-ring {
  --c1: #0ea5e9; /* track */
  --c2: #f97316; /* dot */
}

/* Only inside the checkout (higher specificity, so order doesn't matter) */
.checkout .cl-demo-ring {
  --c1: #16a34a;
  --c2: #16a34a;
}

/* Has no effect: .cl-demo-ring sets its own --c1 */
.sidebar {
  --c1: #e11d48;
}

/* Tie the loader to your design tokens, so it follows your theme */
.app .cl-demo-ring {
  --c1: var(--brand-primary, #8b5cf6);
  --c2: var(--brand-accent, #f472b6);
}`,
    },
    { type: "p", text: "For a one-off change you can also use an inline style on the `<svg>`, such as `style=\"--c2: #e11d48\"`." },
    { type: "h2", text: "Size, stroke and speed" },
    { type: "p", text: "The SVG's `width` and `height` attributes set its default size, and CSS `width` and `height` override them. Sizing in `em` makes a loader follow the text around it, which is perfect for buttons and status lines." },
    {
      type: "code",
      lang: "css",
      filename: "css/loader-size.css",
      code: `/* A fixed size */
.card .cl-demo-ring {
  width: 48px;
  height: 48px;
}

/* Follow the font size */
.btn .cl-demo-ring {
  width: 1.25em;
  height: 1.25em;
  --sw: 10; /* SVG units: thicker lines read better at small sizes */
}

/* Faster: one cycle every 0.8 s instead of 1.4 s */
.cl-demo-ring.is-fast {
  --d: 0.8s;
}

/* Reduced motion: twice as slow instead of three times */
@media (prefers-reduced-motion: reduce) {
  .cl-demo-ring {
    --rm: 2;
  }
}`,
    },
    { type: "p", text: "`--sw` is measured in the SVG's own units (its viewBox is 100 units wide), so the stroke scales along with the loader: at 20 pixels, the default of 6 draws a line barely more than a pixel thick. Avoid `transform: scale()` for sizing; it doesn't change the space the loader occupies, so neighbors won't move out of the way." },
    { type: "h2", text: "Dark mode with prefers-color-scheme and [data-theme]" },
    { type: "p", text: "Most sites need both: follow the operating system by default, but let a visitor override it with a theme switch that sets `data-theme` on the `<html>` element. Define your loader colors as tokens on `:root`, switch the tokens, and let the loader read them:" },
    {
      type: "code",
      lang: "css",
      filename: "css/loader-theme.css",
      code: `:root {
  --loader-c1: #8b5cf6;
  --loader-c2: #f472b6;
  --loader-veil: rgba(255, 255, 255, 0.75);
}

/* Follow the system, unless the visitor picked the light theme… */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --loader-c1: #c4b5fd;
    --loader-c2: #f9a8d4;
    --loader-veil: rgba(17, 15, 26, 0.75);
  }
}

/* …and honor an explicit dark choice. */
:root[data-theme="dark"] {
  --loader-c1: #c4b5fd;
  --loader-c2: #f9a8d4;
  --loader-veil: rgba(17, 15, 26, 0.75);
}

.cl-demo-ring {
  --c1: var(--loader-c1);
  --c2: var(--loader-c2);
}
.cl-overlay,
.card-loading {
  background: var(--loader-veil);
}`,
    },
    { type: "p", text: "The switch itself only flips the attribute:" },
    {
      type: "code",
      lang: "js",
      filename: "js/theme-toggle.js",
      code: `const root = document.documentElement;

document.getElementById("theme-toggle").addEventListener("click", () => {
  const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = root.dataset.theme ? root.dataset.theme === "dark" : systemDark;
  root.dataset.theme = isDark ? "light" : "dark";
});`,
    },
    { type: "p", text: "Lighter, less saturated colors usually work best on dark backgrounds. Whatever you pick, check that the moving part stands out from the background in both themes; WCAG's non-text contrast guideline asks for at least 3:1 for graphics people need to understand." },
    { type: "h2", text: "Three placement patterns" },
    { type: "p", text: "This page uses all three. The overlay starts with `hidden`, and the card and button show their loading states; your script toggles them (see the [JavaScript guide](/guides/javascript/))." },
    {
      type: "code",
      lang: "html",
      filename: "index.html",
      code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Settings</title>
  <link rel="stylesheet" href="css/cuteloader.css">
  <link rel="stylesheet" href="css/loader-theme.css">
  <link rel="stylesheet" href="css/loader-placement.css">
</head>
<body>
  <button type="button" id="theme-toggle">Toggle theme</button>

  <!-- 1. Full-screen overlay -->
  <div id="page-loader" class="cl-overlay" hidden>
    <div class="cl-wrap" role="status" aria-live="polite">
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
      <span class="cl-sr-only">Saving your settings…</span>
    </div>
  </div>

  <!-- 2. Inline in a card -->
  <article class="card" aria-busy="true">
    <h2>Monthly report</h2>
    <p>Revenue, refunds and top products.</p>
    <div class="card-loading">
      <div class="cl-wrap loader-delay" role="status" aria-live="polite">
        <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
        <span class="cl-sr-only">Loading the monthly report…</span>
      </div>
    </div>
  </article>

  <!-- 3. Inside a button -->
  <button type="submit" class="btn" aria-disabled="true">
    <span class="cl-wrap" aria-hidden="true">
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    </span>
    <span>Saving…</span>
  </button>

  <script src="js/theme-toggle.js"></script>
</body>
</html>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "css/loader-placement.css",
      code: `/* Card: the loader covers the card's content without changing its size */
.card {
  position: relative;
  min-height: 10rem;
  padding: 1rem;
  border-radius: 12px;
}
.card-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: inherit;
}
.card-loading[hidden] {
  display: none;
}
.card-loading .cl-demo-ring {
  width: 48px;
  height: 48px;
}

/* Button: the loader is sized in em and painted in the text color */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
.btn .cl-demo-ring {
  width: 1.25em;
  height: 1.25em;
  --sw: 10;
  --c1: currentColor;
  --c2: currentColor;
}
.btn[aria-disabled="true"] {
  cursor: progress;
  opacity: 0.85;
}

/* Fade a loader in after 200 ms, so quick responses never flash it */
.loader-delay {
  animation: loader-delay-in 0.2s ease-out 0.2s both;
}
@keyframes loader-delay-in {
  from { opacity: 0; }
}`,
    },
    { type: "h3", text: "Full-screen overlay" },
    { type: "p", text: "Use it only when the whole page genuinely can't be used, such as while a form is saved before a redirect. The helper fixes the overlay to the viewport and centers the loader. The `.cl-overlay[hidden]` rule is essential: without it, `display: grid` would override the browser's built-in rule for `hidden` and the overlay would never disappear. Show and hide it by setting `hidden` from your script." },
    { type: "h3", text: "Inline in a card" },
    { type: "p", text: "The card reserves its own height, and the loader covers it with an absolutely positioned layer, so nothing jumps when the loader appears or when the content replaces it. `aria-busy=\"true\"` on the card tells assistive technology that the card is being updated; remove it once the content is in place. The `loader-delay` class fades the animation in only after 200 ms. Because a CSS animation restarts whenever an element goes from hidden to shown, the delay applies every time you show the loader." },
    { type: "h3", text: "Inside a button" },
    { type: "p", text: "Here the loader is purely visual: the button's own text says \"Saving…\", so the wrapper gets `aria-hidden=\"true\"` and drops `role=\"status\"`, `aria-live` and the hidden label. Setting `--c1` and `--c2` to `currentColor` paints the ring in the button's text color, so it matches every button style automatically. Prefer `aria-disabled=\"true\"` over `disabled` while saving: disabling a focused button moves keyboard focus back to the start of the page." },
    { type: "h2", text: "Try it" },
    {
      type: "demo",
      html: `<div class="toolbar">
  <button type="button" id="theme-toggle">Toggle theme</button>
  <button type="button" id="show-overlay">Show overlay for 2 s</button>
</div>
<div class="grid">
  <article class="card" id="report" aria-busy="true">
    <h2>Inline in a card</h2>
    <p id="report-body">Monthly report</p>
    <div class="card-loading" id="report-loading">
      <div class="cl-wrap loader-delay" role="status" aria-live="polite">
        <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
        <span class="cl-sr-only">Loading the monthly report…</span>
      </div>
    </div>
    <button type="button" class="link" id="reload-report">Reload</button>
  </article>
  <article class="card">
    <h2>Custom properties</h2>
    <div class="row">
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false" style="--c1: #0ea5e9; --c2: #f97316"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false" style="--d: 0.7s"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false" style="--sw: 12"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    </div>
    <p class="hint">Colors, <code>--d: 0.7s</code>, <code>--sw: 12</code></p>
  </article>
  <article class="card">
    <h2>Inside a button</h2>
    <button type="button" class="btn" id="save"><span>Save changes</span></button>
    <p class="hint" id="save-status" role="status"></p>
  </article>
</div>
<div id="page-loader" class="cl-overlay" hidden>
  <div class="cl-wrap" role="status" aria-live="polite">
    <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    <span class="cl-sr-only">Saving your settings…</span>
  </div>
</div>`,
      css: `.cl-demo-ring {
  --c1: #8b5cf6;
  --c2: #f472b6;
  --d: 1.4s;
  --sw: 6;
  display: block;
  overflow: visible;
}
.cl-demo-ring .track { fill: none; stroke: var(--c1); stroke-width: var(--sw); opacity: .25; }
.cl-demo-ring .spin { transform-origin: 50px 50px; animation: cl-demo-ring-spin calc(var(--d) * var(--rm,1)) linear infinite; }
.cl-demo-ring .dot { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: cl-demo-ring-pulse calc(calc(var(--d) * var(--rm,1)) / 2) ease-in-out infinite; }
@keyframes cl-demo-ring-spin { to { transform: rotate(360deg); } }
@keyframes cl-demo-ring-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(.7); } }
@media (prefers-reduced-motion: reduce) { .cl-demo-ring { --rm: 3; } }
.cl-wrap { display: inline-grid; place-items: center; }
.cl-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.cl-overlay { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; background: rgba(255, 255, 255, 0.75); }
.cl-overlay[hidden] { display: none; }

:root { --loader-c1: #8b5cf6; --loader-c2: #f472b6; --loader-veil: rgba(255, 255, 255, 0.75); --bg: #f7f5fc; --card: #ffffff; --text: #1f2937; --muted: #6b7280; --line: #e7e1f3; --btn: #7c3aed; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --loader-c1: #c4b5fd; --loader-c2: #f9a8d4; --loader-veil: rgba(17, 15, 26, 0.75); --bg: #121019; --card: #1c1926; --text: #ece9f5; --muted: #a39fb3; --line: #2e2a3b; --btn: #a78bfa; }
}
:root[data-theme="dark"] { --loader-c1: #c4b5fd; --loader-c2: #f9a8d4; --loader-veil: rgba(17, 15, 26, 0.75); --bg: #121019; --card: #1c1926; --text: #ece9f5; --muted: #a39fb3; --line: #2e2a3b; --btn: #a78bfa; }
.cl-demo-ring { --c1: var(--loader-c1); --c2: var(--loader-c2); }
.cl-overlay, .card-loading { background: var(--loader-veil); }

body { margin: 0; padding: 16px; font: 14px/1.5 system-ui, sans-serif; background: var(--bg); color: var(--text); }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.toolbar button, .link { font: inherit; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--line); background: var(--card); color: var(--text); cursor: pointer; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
.card { position: relative; min-height: 9rem; padding: 12px; border-radius: 12px; background: var(--card); border: 1px solid var(--line); }
.card h2 { font-size: 0.95rem; margin: 0 0 8px; }
.card-loading { position: absolute; inset: 0; display: grid; place-items: center; border-radius: inherit; }
.card-loading[hidden] { display: none; }
.card-loading .cl-demo-ring { width: 48px; height: 48px; }
.row { display: flex; gap: 6px; }
.row .cl-demo-ring { width: 44px; height: 44px; }
.hint { color: var(--muted); font-size: 0.8rem; margin: 6px 0 0; min-height: 1.2em; }
.btn { display: inline-flex; align-items: center; gap: 0.5em; font: inherit; font-weight: 600; padding: 8px 14px; border: 0; border-radius: 8px; background: var(--btn); color: #ffffff; cursor: pointer; }
.btn .cl-demo-ring { width: 1.25em; height: 1.25em; --sw: 10; --c1: currentColor; --c2: currentColor; }
.btn[aria-disabled="true"] { cursor: progress; opacity: 0.85; }
.loader-delay { animation: loader-delay-in 0.2s ease-out 0.2s both; }
@keyframes loader-delay-in { from { opacity: 0; } }`,
      js: `(() => {
  function start() {
    const root = document.documentElement;
    const ring = '<svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>';

    document.getElementById("theme-toggle").addEventListener("click", () => {
      const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = root.dataset.theme ? root.dataset.theme === "dark" : systemDark;
      root.dataset.theme = isDark ? "light" : "dark";
    });

    const overlay = document.getElementById("page-loader");
    document.getElementById("show-overlay").addEventListener("click", () => {
      overlay.hidden = false;
      setTimeout(() => { overlay.hidden = true; }, 2000);
    });

    const report = document.getElementById("report");
    const reportLoading = document.getElementById("report-loading");
    const reportBody = document.getElementById("report-body");
    function loadReport() {
      report.setAttribute("aria-busy", "true");
      reportLoading.hidden = false;
      reportBody.textContent = "Monthly report";
      setTimeout(() => {
        reportLoading.hidden = true;
        report.removeAttribute("aria-busy");
        reportBody.textContent = "Revenue is up 4% on last month.";
      }, 1800);
    }
    document.getElementById("reload-report").addEventListener("click", loadReport);
    loadReport();

    const save = document.getElementById("save");
    const status = document.getElementById("save-status");
    save.addEventListener("click", () => {
      if (save.getAttribute("aria-disabled") === "true") return;
      save.setAttribute("aria-disabled", "true");
      save.innerHTML = '<span class="cl-wrap" aria-hidden="true">' + ring + "</span><span>Saving…</span>";
      status.textContent = "";
      setTimeout(() => {
        save.removeAttribute("aria-disabled");
        save.innerHTML = "<span>Save changes</span>";
        status.textContent = "Saved.";
      }, 1500);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();`,
      height: 460,
      caption: "Placement patterns and theming from this guide. The theme follows your system until you press the toggle.",
    },
    { type: "h2", text: "Accessibility notes" },
    {
      type: "ul",
      items: [
        "Keep `role=\"status\"`, `aria-live=\"polite\"` and a specific hidden label on standalone loaders. Inside a button, hide the loader with `aria-hidden=\"true\"` and let the button text speak.",
        "Put `aria-busy=\"true\"` on the region being updated and remove it when the update is done.",
        "An overlay is not a dialog: don't move focus into it and don't trap focus.",
        "The export already slows every loader down for `prefers-reduced-motion`. Adjust `--rm` inside that media query if you want a different factor, rather than removing motion entirely; a frozen loader looks like a frozen page.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Toggle these patterns around real requests in the [JavaScript guide](/guides/javascript/), or start from the [plain HTML guide](/guides/html/).",
        "Using a framework? The [React guide](/guides/react/) shows the same ideas as components.",
        "Explore more [CSS loaders](/css-loaders/) and [SVG loaders](/svg-loaders/), or build a simple spinner with the [CSS spinner generator](/css-spinner-generator/).",
        "Preview colors and speed before exporting in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["wave-bars", "smooth-progress-ring", "elegant-spinner"],
  faqs: [
    {
      q: "Why doesn't setting --c1 on a parent element change the loader?",
      a: "The export declares its variables on the loader element itself (`.cl-demo-ring`), and a value declared on an element always beats one it would inherit. Override the variables in a rule that targets the loader, such as `.sidebar .cl-demo-ring`, or edit the export to read your own tokens, for example `--c1: var(--brand-primary, #8b5cf6)`.",
    },
    {
      q: "Do I have to edit the exported file to change colors?",
      a: "No. Keep the export untouched and put overrides in a stylesheet that loads after it. Equal specificity plus a later position wins, and a more specific selector wins anywhere. That keeps re-exporting painless when you switch loaders later.",
    },
    {
      q: "How do I make the loader match my text color?",
      a: "Set `--c1` and `--c2` to `currentColor` on the loader. The SVG shapes then use the `color` of the element they sit in, which is ideal inside buttons and links.",
    },
    {
      q: "Can I turn the animation off for reduced motion?",
      a: "You can, but a motionless loader looks like a stuck page. The export slows the animation to a third of its speed instead, which keeps the \"still working\" signal while removing most of the movement. Change the factor with `--rm` inside the media query.",
    },
  ],
};

export default guide;

import type { Article } from "@/types/content";

const article: Article = {
  slug: "how-to-use-svg-loading-animations",
  title: "How to Use SVG Loading Animations",
  seoTitle: "How to Use SVG Loading Animations: Inline, img or CSS",
  description:
    "Inline SVG, img, CSS background or object? See what each can animate and style, then build a stroke-dasharray spinner and get sizing and accessibility right.",
  excerpt:
    "Where you put an SVG loader decides what you can do with it. We tested what animates and what you can restyle in each embedding method, then built the stroke-dasharray spinner behind most arc loaders.",
  publishedAt: "2026-11-21",
  tags: ["SVG", "CSS", "Accessibility", "Tutorial"],
  relatedAnimations: ["smooth-progress-ring", "blooming-flower", "orbiting-dots"],
  blocks: [
    {
      type: "p",
      text: "For most SVG loading animations, the best choice is to paste the SVG inline. Inline SVG is part of your page, so your CSS can recolor it, `currentColor` and custom properties flow into it, your reduced-motion rules reach it, and you can give it an accessible name. Use an `<img>` or a CSS background when you want a cached, self-contained file that you won't restyle from the page. Use `<object>` only when the file needs to run its own scripts.",
    },
    {
      type: "p",
      text: "Below, we test each embedding method, build an arc spinner with stroke-dasharray, and cover the details that catch people out: transform origins, viewBox sizing and accessibility.",
    },
    { type: "h2", text: "What works in each embedding method" },
    {
      type: "p",
      text: "We loaded one SVG file into Chrome four ways. The file contained a CSS animation, a `<script>` that changed a color, a shape filled with `currentColor` and a `prefers-reduced-motion` rule. The page's own stylesheet also tried to recolor the shapes. Here is what happened:",
    },
    {
      type: "table",
      head: ["", "Inline `<svg>`", "`<img>`", "CSS background", "`<object>`"],
      rows: [
        ["CSS animations in the file play", "Yes", "Yes", "Yes", "Yes"],
        ["Page CSS can restyle the shapes", "Yes", "No", "No", "No"],
        ["`currentColor` follows the page", "Yes", "No (black)", "No (black)", "No (black)"],
        ["Scripts can control it", "Yes, page scripts", "No", "No", "Yes, its own scripts"],
        ["Page's reduced-motion CSS applies", "Yes", "No, put it in the file", "No, put it in the file", "No, put it in the file"],
        ["Cached as a separate file", "No", "Yes", "Yes", "Yes"],
        ["Accessible name", "`role=\"img\"` and `aria-label`", "`alt` text", "None, decoration only", "Varies; hide it and use text"],
      ],
    },
    {
      type: "p",
      text: "Two rows surprise people. First, animations do play inside an `<img>`: MDN's restrictions for [SVG used as an image](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_as_an_image) cover scripts and external resources such as linked stylesheets and fonts, not a `<style>` element inside the file, and in our test SMIL `<animate>` elements played too. Second, `currentColor` inside an `<img>` resolves to black, not the color of the surrounding text.",
    },
    { type: "h3", text: "Inline SVG" },
    {
      type: "p",
      text: "Inline is the most capable option, and it's what CuteLoader is built on: every loader in the library is inline SVG plus scoped CSS, with custom properties such as `--c1` and `--c2` for colors and `--d` for the cycle duration, so a stylesheet can retheme it. The costs: the markup ships inside every page instead of being cached once, and any `id` inside it, such as a gradient's, must be unique on the page. If you show the same loader in many places, render it from a component or template partial.",
    },
    { type: "h3", text: "Image tags and CSS backgrounds" },
    {
      type: "p",
      text: "An `<img>` or a `background-image` treats the file as a sealed picture. Colors, keyframes and the reduced-motion rule all have to live in a `<style>` element inside the file, because your page's CSS can't reach in. In exchange, the browser caches the file, which suits a loader you show unchanged on many pages.",
    },
    {
      type: "code",
      lang: "html",
      code: `<img src="/images/spinner.svg" width="48" height="48" alt="Loading">`,
    },
    {
      type: "p",
      text: "Always give the `<img>` a width and height. That reserves space so the layout doesn't jump, and it protects you from files that don't declare a size: in our test, an SVG with only a viewBox in an `<img>` without dimensions stretched to the full 500-pixel width of its container.",
    },
    {
      type: "p",
      text: "A CSS background is invisible to assistive technology, so use it only as decoration next to real text, such as on a button's `::after` pseudo-element. If you inline the file as a data URI, encode `#` as `%23`, or the browser treats everything after it as a URL fragment.",
    },
    {
      type: "code",
      lang: "css",
      code: `.button.is-loading::after {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 0.5em;
  vertical-align: -0.125em;
  background: url("/images/spinner.svg") center / contain no-repeat;
}`,
    },
    {
      type: "callout",
      tone: "tip",
      text: "To recolor a one-color SVG file without editing it, use it as a CSS `mask` on an element and set that element's `background-color`, which can be `currentColor` or a custom property. In Chrome, animations inside the file keep playing in a mask; check your other target browsers before relying on that.",
    },
    { type: "h3", text: "The object element" },
    {
      type: "p",
      text: "`<object data=\"spinner.svg\" type=\"image/svg+xml\">` loads the SVG as a separate document: scripts inside it run, but your page's CSS still doesn't apply. It suits files with their own interactive scripting, which loaders almost never need.",
    },
    { type: "h2", text: "Build an arc spinner with stroke-dasharray" },
    {
      type: "p",
      text: "Most SVG arc spinners rely on two stroke properties. `stroke-dasharray` turns a stroke into a repeating pattern of dashes and gaps, and `stroke-dashoffset` slides that pattern along the path. Animate both on a circle and you get an arc that grows, travels and shrinks.",
    },
    {
      type: "code",
      lang: "html",
      code: `<svg class="arc-spinner" viewBox="0 0 50 50" width="48" height="48"
     aria-hidden="true" focusable="false">
  <circle class="track" cx="25" cy="25" r="20" />
  <g class="spin">
    <circle class="arc" cx="25" cy="25" r="20" pathLength="100" />
  </g>
</svg>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "arc-spinner.css",
      code: `.arc-spinner circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 5;
}

.arc-spinner .track { opacity: 0.2; }

.arc-spinner .spin {
  transform-origin: 25px 25px;
  animation: arc-rotate 2s linear infinite;
}

.arc-spinner .arc {
  stroke-linecap: round;
  stroke-dasharray: 25 100;
  animation: arc-dash 1.5s ease-in-out infinite;
}

@keyframes arc-rotate {
  to { transform: rotate(360deg); }
}

@keyframes arc-dash {
  0%   { stroke-dasharray: 1 100;  stroke-dashoffset: 0; }
  50%  { stroke-dasharray: 60 100; stroke-dashoffset: -15; }
  100% { stroke-dasharray: 1 100;  stroke-dashoffset: -99; }
}

@media (prefers-reduced-motion: reduce) {
  .arc-spinner .spin { animation-duration: 6s; }
  .arc-spinner .arc  { animation-duration: 4.5s; }
}`,
    },
    { type: "p", text: "Here is how the pieces fit together:" },
    {
      type: "ul",
      items: [
        "`pathLength=\"100\"` makes the browser treat the circle as 100 units long, whatever its radius, so dash values read as percentages instead of fractions of a 125.66-unit circumference. MDN's compatibility data lists support on `<circle>` since Chrome 57, Firefox 61 and Safari 14.",
        "**A gap of 100** guarantees that only one dash fits on the circle at a time.",
        "**The keyframes** grow the dash from 1 to 60 units, then shrink it back to 1 as its tail races to the end of the path. A circle's path starts and ends at the same point, so each cycle joins the next without a jump.",
        "`stroke-linecap: round` draws a dot even when the dash is one unit long, and the static `stroke-dasharray: 25 100` leaves a quarter arc on screen if animations never run.",
        "**The rotation** on the `<g>` uses a different duration from the dash (2s against 1.5s), so the arc lands somewhere new each cycle instead of repeating the same lap.",
        "`stroke: currentColor` makes the spinner take the text color of wherever you put it.",
      ],
    },
    {
      type: "p",
      text: "One trade-off: when we blocked Chrome's main thread with JavaScript for 2.5 seconds, the rotation kept going but the arc stopped growing and shrinking. Dash changes are repainted on the main thread, while transforms can be handled by the compositor, so the spinner degrades gracefully. The full results are in our [CSS spinner vs SVG loader comparison](/blog/css-spinner-vs-svg-loader/).",
    },
    { type: "h3", text: "The same spinner as a standalone file" },
    {
      type: "p",
      text: "To use the spinner as an `<img>` or background, move the CSS into the file, replace `currentColor` with a real color, and include the reduced-motion rule there. The whole file is under 1 KB:",
    },
    {
      type: "code",
      lang: "xml",
      filename: "spinner.svg",
      code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="48" height="48">
  <style>
    circle { fill: none; stroke: #7c3aed; stroke-width: 5; }
    .track { opacity: 0.2; }
    .spin { transform-origin: 25px 25px; animation: rotate 2s linear infinite; }
    .arc { stroke-linecap: round; stroke-dasharray: 25 100; animation: dash 1.5s ease-in-out infinite; }
    @keyframes rotate { to { transform: rotate(360deg); } }
    @keyframes dash {
      0%   { stroke-dasharray: 1 100;  stroke-dashoffset: 0; }
      50%  { stroke-dasharray: 60 100; stroke-dashoffset: -15; }
      100% { stroke-dasharray: 1 100;  stroke-dashoffset: -99; }
    }
    @media (prefers-reduced-motion: reduce) {
      .spin { animation-duration: 6s; }
      .arc { animation-duration: 4.5s; }
    }
  </style>
  <circle class="track" cx="25" cy="25" r="20"/>
  <g class="spin">
    <circle class="arc" cx="25" cy="25" r="20" pathLength="100"/>
  </g>
</svg>`,
    },
    {
      type: "p",
      text: "The demo shows both versions side by side, the file loaded through a data URI. Change the page color: the inline spinner follows it, while the `<img>` keeps the purple baked into its file. Both keep animating.",
    },
    {
      type: "demo",
      height: 250,
      caption: "Left: inline SVG styled by the page. Right: the same spinner as a self-contained file in an img tag.",
      html: `<div class="row" id="row">
  <figure>
    <svg class="arc-spinner" viewBox="0 0 50 50" width="64" height="64" aria-hidden="true" focusable="false">
      <circle class="track" cx="25" cy="25" r="20" />
      <g class="spin"><circle class="arc" cx="25" cy="25" r="20" pathLength="100" /></g>
    </svg>
    <figcaption>Inline SVG</figcaption>
  </figure>
  <figure>
    <img width="64" height="64" alt="" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='48' height='48'><style> circle { fill: none; stroke: %237c3aed; stroke-width: 5; } .track { opacity: 0.2; } .spin { transform-origin: 25px 25px; animation: rotate 2s linear infinite; } .arc { stroke-linecap: round; stroke-dasharray: 25 100; animation: dash 1.5s ease-in-out infinite; } @keyframes rotate { to { transform: rotate(360deg); } } @keyframes dash { 0%25 { stroke-dasharray: 1 100; stroke-dashoffset: 0; } 50%25 { stroke-dasharray: 60 100; stroke-dashoffset: -15; } 100%25 { stroke-dasharray: 1 100; stroke-dashoffset: -99; } } @media (prefers-reduced-motion: reduce) { .spin { animation-duration: 6s; } .arc { animation-duration: 4.5s; } } </style><circle class='track' cx='25' cy='25' r='20'/><g class='spin'><circle class='arc' cx='25' cy='25' r='20' pathLength='100'/></g></svg>">
    <figcaption>Same file as &lt;img&gt;</figcaption>
  </figure>
</div>
<div class="swatches">
  <span>Page color:</span>
  <button type="button" data-color="#7c3aed" style="background:#7c3aed" aria-label="Purple"></button>
  <button type="button" data-color="#0d9488" style="background:#0d9488" aria-label="Teal"></button>
  <button type="button" data-color="#ea580c" style="background:#ea580c" aria-label="Orange"></button>
  <button type="button" data-color="#db2777" style="background:#db2777" aria-label="Pink"></button>
</div>`,
      css: `.arc-spinner circle { fill: none; stroke: currentColor; stroke-width: 5; }
.arc-spinner .track { opacity: 0.2; }
.arc-spinner .spin { transform-origin: 25px 25px; animation: arc-rotate 2s linear infinite; }
.arc-spinner .arc { stroke-linecap: round; stroke-dasharray: 25 100; animation: arc-dash 1.5s ease-in-out infinite; }
@keyframes arc-rotate { to { transform: rotate(360deg); } }
@keyframes arc-dash {
  0% { stroke-dasharray: 1 100; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 60 100; stroke-dashoffset: -15; }
  100% { stroke-dasharray: 1 100; stroke-dashoffset: -99; }
}
@media (prefers-reduced-motion: reduce) {
  .arc-spinner .spin { animation-duration: 6s; }
  .arc-spinner .arc { animation-duration: 4.5s; }
}
body { display: block; place-items: normal; min-height: 0; margin: 0; padding: 20px 16px; font: 14px/1.4 system-ui, sans-serif; color: #3b3450; background: #f7f5fb; }
.row { display: flex; justify-content: center; gap: 48px; color: #7c3aed; }
figure { margin: 0; display: grid; justify-items: center; gap: 10px; padding: 18px 22px; background: #fff; border: 1px solid #e4def0; border-radius: 12px; }
figcaption { font-size: 13px; color: #5b5470; }
.swatches { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 22px; }
.swatches button { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 1px #c9c2d8; cursor: pointer; }`,
      js: `document.addEventListener("click", (event) => {
  const swatch = event.target.closest("[data-color]");
  if (!swatch) return;
  document.getElementById("row").style.color = swatch.dataset.color;
});`,
    },
    { type: "h2", text: "Rotate and scale shapes around the right point" },
    {
      type: "p",
      text: "The most common SVG animation bug is a shape that swings off to one side instead of spinning or pulsing in place. Two defaults cause it. For SVG elements, `transform-origin` starts at `0 0`, the top-left corner of the SVG's coordinate system. And keywords such as `center` are measured against the whole viewBox, because the default `transform-box` is `view-box`.",
    },
    { type: "p", text: "That leaves two reliable recipes:" },
    {
      type: "code",
      lang: "css",
      code: `/* Rotate around the center of a 0 0 50 50 viewBox */
.spin {
  transform-origin: 25px 25px;
}

/* Scale or rotate a shape around its own center */
.dot {
  transform-box: fill-box;
  transform-origin: center;
}`,
    },
    {
      type: "p",
      text: "Inside an SVG, `px` values in `transform-origin` and `translate()` are viewBox units, not screen pixels, so `25px 25px` is the center of a `0 0 50 50` viewBox at any rendered size. `transform-box: fill-box` makes `center` mean the center of the shape's own bounding box; MDN's [transform-box reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-box) lists it as widely available since January 2020. The demo runs one pulse animation with all three settings.",
    },
    {
      type: "demo",
      height: 245,
      caption: "The same scale animation with three different transform origins.",
      html: `<div class="panels">
  <figure>
    <svg viewBox="0 0 120 40" class="origin-default"><circle cx="20" cy="20" r="11"/><circle cx="60" cy="20" r="11"/><circle cx="100" cy="20" r="11"/></svg>
    <figcaption><b>Default</b><br>scales toward 0 0</figcaption>
  </figure>
  <figure>
    <svg viewBox="0 0 120 40" class="origin-center"><circle cx="20" cy="20" r="11"/><circle cx="60" cy="20" r="11"/><circle cx="100" cy="20" r="11"/></svg>
    <figcaption><b>transform-origin: center</b><br>scales toward the viewBox center</figcaption>
  </figure>
  <figure>
    <svg viewBox="0 0 120 40" class="origin-fill-box"><circle cx="20" cy="20" r="11"/><circle cx="60" cy="20" r="11"/><circle cx="100" cy="20" r="11"/></svg>
    <figcaption><b>+ transform-box: fill-box</b><br>each dot pulses in place</figcaption>
  </figure>
</div>`,
      css: `body { display: block; place-items: normal; min-height: 0; margin: 0; padding: 16px; font: 13px/1.35 system-ui, sans-serif; color: #3b3450; background: #f7f5fb; }
.panels { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px; }
figure { margin: 0; padding: 14px; background: #fff; border: 1px solid #e4def0; border-radius: 12px; text-align: center; }
svg { display: block; width: 100%; max-width: 180px; height: auto; margin: 0 auto 10px; overflow: visible; }
figcaption { color: #5b5470; }
circle { fill: #7c3aed; animation: pulse 1.2s ease-in-out infinite; }
circle:nth-child(2) { animation-delay: -0.8s; }
circle:nth-child(3) { animation-delay: -0.4s; }
.origin-center circle { transform-origin: center; }
.origin-fill-box circle { transform-box: fill-box; transform-origin: center; }
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.45); }
}
@media (max-width: 520px) {
  .panels { grid-template-columns: 1fr; gap: 8px; }
  figure { display: flex; align-items: center; gap: 14px; padding: 10px 12px; text-align: left; }
  svg { flex: none; width: 120px; margin: 0; }
}`,
    },
    {
      type: "p",
      text: "One more trap: if a shape has a `transform` attribute and you also animate its `transform` in CSS, the CSS value replaces the attribute entirely. Put the attribute on a wrapping `<g>` and animate the inner element.",
    },
    { type: "h2", text: "Size the loader with viewBox" },
    {
      type: "p",
      text: "The `viewBox` defines the SVG's internal coordinate system, and `width` and `height` decide how big it renders. Everything scales together, including stroke widths: a 5-unit stroke in a 50-unit viewBox is 4.8 pixels wide at 48 pixels and 1.6 pixels at 16.",
    },
    {
      type: "ul",
      items: [
        "**Keep width and height attributes as defaults.** An inline SVG with only a viewBox stretches to the width of its container (500 pixels in our test, for a loader meant to be 48). CSS such as `width: 2em; height: 2em` still overrides the attributes.",
        "**Keep everything inside the viewBox,** including half the stroke width, because content outside it is clipped. A circle with a radius of 20 and a stroke of 5 reaches 22.5 units from its center, which fits a 50-unit box.",
        "**Prefer a square viewBox.** If the proportions differ, the default `preserveAspectRatio` scales the drawing to fit and centers it.",
      ],
    },
    { type: "h2", text: "Make the SVG loader accessible" },
    { type: "p", text: "An SVG on its own announces nothing useful. Pick one of two patterns:" },
    {
      type: "code",
      lang: "html",
      code: `<!-- Decorative: a status message carries the meaning -->
<div role="status">
  <svg class="arc-spinner" aria-hidden="true" focusable="false" viewBox="0 0 50 50">…</svg>
  Loading results…
</div>

<!-- Meaningful image: the graphic itself has a name -->
<svg class="arc-spinner" role="img" aria-label="Loading" viewBox="0 0 50 50">…</svg>`,
    },
    {
      type: "p",
      text: "Use the first pattern for anything that appears while someone waits. A `role=\"status\"` element is a live region, so screen readers announce changes to its content: keep the empty element in the page and write the message into it when loading starts, as our [CSS loading spinner tutorial](/blog/how-to-create-css-loading-animation/) shows. `role=\"img\"` with an `aria-label` names the graphic, but it isn't a live region, so a spinner that appears later won't be announced. For an `<img>`, the equivalents are `alt=\"Loading\"` or an empty `alt` plus a status message.",
    },
    {
      type: "p",
      text: "`focusable=\"false\"` only matters in old versions of Internet Explorer, which put SVG elements in the tab order; it's harmless elsewhere. And remember where reduced-motion rules must live: in your stylesheet for inline SVG, and inside the file for `<img>`, backgrounds and `<object>`. In our Chrome test, a `prefers-reduced-motion` rule inside the file applied in all three.",
    },
    {
      type: "loader",
      slug: "smooth-progress-ring",
      caption: "Smooth Progress Ring from the minimal collection. Like every CuteLoader loader, it's inline SVG and CSS that you can recolor, resize and export.",
    },
    { type: "h2", text: "Where to go next" },
    {
      type: "p",
      text: "To start from a finished design instead of a blank file, browse the [SVG loaders](/svg-loaders/) collection: every loader can be customized in the browser and exported as HTML and CSS, a React component, or a standalone SVG file. Or build your own in the [SVG loader generator](/svg-loader-generator/).",
    },
    {
      type: "loader",
      slug: "blooming-flower",
      caption: "Blooming Flower: organic shapes like petals are where an SVG loader pulls ahead of anything built from CSS boxes.",
    },
  ],
  faqs: [
    {
      q: "Why can't my CSS change the color of an SVG loader in an img tag?",
      a: "An SVG used as an image is a separate document, so selectors in your page's stylesheet never match anything inside it, and `currentColor` inside the file falls back to black. Inline the SVG so it can inherit your styles, edit the colors in the file's own `<style>` element, or, for a one-color shape, use the file as a CSS mask and color it with `background-color`.",
    },
    {
      q: "Should I animate SVG loaders with CSS or with SMIL?",
      a: "Both work in current browsers, and in our test both played inside an `<img>`. CSS animations share syntax with the rest of your styles, respond to custom properties, and can be slowed by a page-level reduced-motion rule when the SVG is inline. SMIL elements such as `<animate>` can also animate SVG attributes that aren't CSS properties. CuteLoader uses CSS only, so play and pause, speed and reduced motion work the same way for every loader.",
    },
    {
      q: "Does an inline SVG loader slow down my page?",
      a: "Rarely. The arc spinner in this article is under 1 KB including its CSS, and inline markup paints with the HTML, with no extra request. That makes inline the right choice for a loader that must appear immediately, such as a page preloader. The trade-off is caching: inline bytes are downloaded with every page that includes them, so a large loader repeated across many pages can be better as a cached file.",
    },
  ],
};

export default article;

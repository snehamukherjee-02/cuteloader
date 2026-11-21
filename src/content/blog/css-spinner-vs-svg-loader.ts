import type { Article } from "@/types/content";

const article: Article = {
  slug: "css-spinner-vs-svg-loader",
  title: "CSS Spinner vs SVG Loader: Which Is Better?",
  seoTitle: "CSS Spinner vs SVG Loader: Which Should You Use?",
  description:
    "CSS spinners vs SVG loaders compared on shapes, theming, size, accessibility, reuse and performance, with main-thread test results and clear recommendations.",
  excerpt:
    "Neither one wins everywhere. We compared CSS spinners and SVG loaders on what they can draw, how they theme, size and reuse, and blocked the main thread to see which animations keep running.",
  publishedAt: "2026-11-21",
  tags: ["Performance", "CSS", "SVG", "Comparison"],
  relatedAnimations: ["minimal-ring", "elegant-spinner", "sleeping-cat", "infinity-loop"],
  blocks: [
    {
      type: "p",
      text: "Use a CSS spinner for simple shapes such as rings, dots and bars, especially inside buttons and lines of text. Use an SVG loader when the shape is more ambitious, such as an arc that grows and shrinks, an icon, a character or a brand mark, or when you need the loader as a self-contained file. Whichever you choose, keep the essential motion on `transform` and `opacity`. In our tests, that decided performance far more than CSS versus SVG did.",
    },
    {
      type: "p",
      text: "Some definitions first. Both kinds usually animate with the same CSS `@keyframes`; the difference is what gets drawn. A CSS spinner is built from boxes, using borders, backgrounds, `border-radius` and pseudo-elements. An SVG loader is built from vector shapes, such as `<circle>` and `<path>`, inside an `<svg>` element.",
    },
    { type: "h2", text: "CSS spinner vs SVG loader at a glance" },
    {
      type: "table",
      head: ["", "CSS spinner", "SVG loader"],
      rows: [
        ["Markup", "One element, plus pseudo-elements", "An `<svg>` with one or more shapes"],
        ["Shapes", "Rings, dots, bars and squares built from borders, radii and gradients", "Any vector shape: arcs, paths, icons, characters, text"],
        ["Strokes", "Borders only, so an arc can't change length", "Real strokes with dashes, round caps and `pathLength`"],
        ["Theming", "Custom properties and `currentColor`", "The same when inline; none from page CSS in an `<img>`"],
        ["Our example ring, gzipped", "223 bytes", "276 bytes"],
        ["Scaling", "Grows with `em`, but pixel borders stay fixed", "The viewBox scales everything, strokes included"],
        ["Performance", "Smooth when you animate transform or opacity", "The same rule; dash animations need the main thread"],
        ["Accessibility", "Needs a text alternative", "Needs a text alternative; can also be a named image"],
        ["Reuse across frameworks", "A class name and one element work anywhere", "Markup to paste, a file, or a component"],
        ["Design handoff", "Hand-coded", "Drawn in a vector tool and exported"],
      ],
    },
    { type: "h2", text: "Shapes: the clearest difference" },
    {
      type: "p",
      text: "CSS can draw more than most people expect. One element with a border makes a ring, `conic-gradient()` with a radial mask makes a gradient ring, and two pseudo-elements add extra parts. But every piece is still a box. You can't bend a border into a leaf, and you can't make a border arc grow and shrink, because each side of a border is a fixed quarter of the ring; our [CSS loading animation tutorial](/blog/how-to-create-css-loading-animation/) explains why.",
    },
    {
      type: "p",
      text: "SVG has no such limit. Anything a designer can draw in a vector tool can be exported and animated, and strokes come with dash patterns, round caps and `pathLength`, which is how the familiar growing arc works. Characters, illustrated scenes and logos are SVG territory.",
    },
    {
      type: "loader",
      slug: "sleeping-cat",
      caption: "Sleeping Cat breathes, flicks its tail and lets z's drift up. A character like this is out of reach for CSS boxes, yet it's about 4.3 KB of SVG and CSS before compression.",
    },
    { type: "h2", text: "Theming, sizing and reuse" },
    {
      type: "p",
      text: "Inline, the two theme the same way: custom properties and `currentColor` reach both. The gap opens when an SVG becomes a file. In an `<img>` or a CSS background, your stylesheet can't recolor it, as the side-by-side demo in our guide to [using SVG loading animations](/blog/how-to-use-svg-loading-animations/) shows.",
    },
    {
      type: "p",
      text: "Sizing favors SVG. The viewBox scales everything together, strokes included, so a loader drawn once looks right at 16 pixels and at 160. A CSS spinner sized in `em` grows with the text, but a `5px` border stays 5 pixels, so set the thickness in `em` or through a custom property if you resize often.",
    },
    {
      type: "p",
      text: "Reuse favors CSS. A class name and one element work in server-rendered HTML, React, Vue or ASP.NET without a build step. SVG markup has to be pasted into every template or wrapped in a component, and JSX wants camelCase attribute names such as `strokeWidth`. That's why CuteLoader exports every loader in several formats: HTML and CSS, a React and TypeScript component, plain JavaScript and a standalone SVG file.",
    },
    { type: "h2", text: "File size" },
    {
      type: "p",
      text: "Both are small. The CSS ring in the demo below is 284 bytes of minified HTML and CSS, or 223 bytes gzipped. The equivalent SVG ring is 418 bytes, or 276 gzipped. Even a detailed character stays modest: Sleeping Cat is about 4.3 KB minified and 1.3 KB gzipped. Unless you put dozens of different loaders on one page, size won't decide this.",
    },
    {
      type: "code",
      lang: "html",
      code: `<!-- CSS ring -->
<span class="css-ring" aria-hidden="true"></span>

<!-- SVG ring -->
<svg class="svg-ring" viewBox="0 0 50 50" width="48" height="48" aria-hidden="true">
  <circle cx="25" cy="25" r="20" />
  <circle class="arc" cx="25" cy="25" r="20" pathLength="100" />
</svg>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "rings.css",
      code: `.css-ring {
  display: inline-block;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border: 5px solid #e5e7eb;
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: ring-spin 0.8s linear infinite;
}

.svg-ring { animation: ring-spin 0.8s linear infinite; }
.svg-ring circle { fill: none; stroke: #e5e7eb; stroke-width: 5; }
.svg-ring .arc { stroke: #7c3aed; stroke-dasharray: 25 100; stroke-linecap: round; }

@keyframes ring-spin { to { transform: rotate(360deg); } }`,
    },
    { type: "h2", text: "Performance: what we measured" },
    {
      type: "p",
      text: "Loaders appear exactly when the page is busy, so the question that matters is which animations keep moving while JavaScript hogs the main thread. We tested in Chrome 157. Each loader ran on its own page while a script blocked the main thread for 2.5 seconds, and we used the DevTools protocol's screencast to count the frames the browser kept producing during the block.",
    },
    {
      type: "table",
      head: ["Loader", "What animates", "Kept moving while blocked?"],
      rows: [
        ["CSS border ring", "`transform: rotate()`", "Yes"],
        ["CSS conic-gradient ring", "`transform: rotate()`", "Yes"],
        ["CSS conic-gradient ring", "Gradient angle via `@property`", "No"],
        ["SVG ring", "`transform` on the `<svg>` element", "Yes"],
        ["SVG ring", "`transform` on a `<g>` inside the SVG", "Yes"],
        ["HTML and SVG shapes", "`opacity`", "Yes"],
        ["SVG arc", "`stroke-dashoffset`", "No"],
        ["SVG arc", "`stroke-dasharray`", "No"],
        ["SVG arc", "Rotation plus `stroke-dasharray`", "Rotation yes, dash no"],
      ],
    },
    {
      type: "p",
      text: "The dividing line isn't CSS versus SVG; it's the property. Transforms and opacity kept running everywhere, including on shapes inside an SVG. Anything that changes how a shape is painted, such as a dash pattern or a gradient angle, froze until the thread was free. That matches web.dev's advice to [restrict animations to transform and opacity](https://web.dev/articles/animations-guide). We only tested Chrome, and other engines make their own decisions, so treat transform and opacity as the safe set everywhere and test anything else in the browsers you support.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "To check your own loaders, open Chrome DevTools, choose More tools, then Rendering, and turn on Paint flashing. Areas that repaint are highlighted in green: a transform-only spinner stays quiet, while a dash or gradient-angle animation flashes on every frame.",
    },
    {
      type: "p",
      text: "Try it in your own browser. The button runs a two-second busy loop, the same kind of stall a large JSON parse or a slow framework boot can cause.",
    },
    {
      type: "demo",
      height: 330,
      caption: "Press the button and watch which loaders keep moving while the main thread is blocked.",
      html: `<div class="demo">
  <div class="loaders">
    <figure>
      <span class="css-ring" aria-hidden="true"></span>
      <figcaption><b>CSS ring</b>transform</figcaption>
    </figure>
    <figure>
      <svg class="svg-ring" viewBox="0 0 50 50" width="48" height="48" aria-hidden="true"><circle cx="25" cy="25" r="20" /><circle class="arc" cx="25" cy="25" r="20" pathLength="100" /></svg>
      <figcaption><b>SVG ring</b>transform</figcaption>
    </figure>
    <figure>
      <svg class="svg-dash" viewBox="0 0 50 50" width="48" height="48" aria-hidden="true"><circle cx="25" cy="25" r="20" /><circle class="arc" cx="25" cy="25" r="20" pathLength="100" /></svg>
      <figcaption><b>SVG arc</b>stroke-dashoffset</figcaption>
    </figure>
    <figure>
      <span class="conic-ring" aria-hidden="true"></span>
      <figcaption><b>CSS gradient</b>@property angle</figcaption>
    </figure>
  </div>
  <button type="button" id="block">Block the main thread for 2 seconds</button>
</div>`,
      css: `.demo { width: 100%; max-width: 640px; box-sizing: border-box; padding: 16px; text-align: center; }
.loaders { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
figure { margin: 0; padding: 14px 6px 10px; background: #f7f5fb; border: 1px solid #e4def0; border-radius: 12px; }
figcaption { margin-top: 8px; font-size: 12px; line-height: 1.35; color: #5b5470; }
figcaption b { display: block; font-size: 13px; color: #1f1a2e; }
button { font: inherit; font-size: 14px; padding: 9px 16px; border: 0; border-radius: 10px; background: #7c3aed; color: #fff; cursor: pointer; }
.css-ring {
  display: inline-block; box-sizing: border-box; width: 48px; height: 48px;
  border: 5px solid #e5e7eb; border-top-color: #7c3aed; border-radius: 50%;
  animation: ring-spin 0.8s linear infinite;
}
.svg-ring { animation: ring-spin 0.8s linear infinite; }
svg circle { fill: none; stroke: #e5e7eb; stroke-width: 5; }
svg .arc { stroke: #7c3aed; stroke-dasharray: 25 100; stroke-linecap: round; }
.svg-dash .arc { animation: dash-move 0.8s linear infinite; }
@property --angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.conic-ring {
  display: inline-block; width: 48px; height: 48px; border-radius: 50%;
  background: conic-gradient(from var(--angle), #7c3aed 0 25%, #e5e7eb 0);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5.5px), #000 calc(100% - 5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 5.5px), #000 calc(100% - 5px));
  animation: angle-spin 0.8s linear infinite;
}
@keyframes ring-spin { to { transform: rotate(360deg); } }
@keyframes dash-move { to { stroke-dashoffset: -100; } }
@keyframes angle-spin { to { --angle: 360deg; } }
@media (max-width: 520px) {
  .loaders { grid-template-columns: repeat(2, 1fr); }
  figure { padding: 10px 6px 8px; }
}`,
      js: `document.addEventListener("click", (event) => {
  const button = event.target.closest("#block");
  if (!button) return;
  button.textContent = "Blocking…";
  // Let the new label paint, then hog the main thread for two seconds.
  requestAnimationFrame(() => setTimeout(() => {
    const start = performance.now();
    while (performance.now() - start < 2000) {}
    button.textContent = "Done. Run it again";
  }, 0));
});`,
    },
    {
      type: "p",
      text: "The practical rule: if a loader may run while your app boots or parses a large response, put its essential motion on a transform. Paint-based effects, like an arc that grows and shrinks, can still be part of the design, as decoration that pauses gracefully.",
    },
    { type: "h2", text: "Accessibility is a tie" },
    {
      type: "p",
      text: "Neither kind announces anything on its own. Both need the same pattern: hide the graphic from assistive technology and write a short message into a `role=\"status\"` live region. SVG adds two options, `role=\"img\"` with an `aria-label` inline or `alt` text on an `<img>`, but neither announces a loader that appears later. Reduced motion works the same way for both: a `prefers-reduced-motion` media query, which for an SVG file has to live inside the file.",
    },
    { type: "h2", text: "Which should you use?" },
    {
      type: "ul",
      items: [
        "**A spinner inside a button or a line of text:** CSS. One element, sized in `em`, colored with `currentColor`.",
        "**An indeterminate bar across a page or card:** CSS. A track with a pseudo-element moving on `translateX()` keeps the motion on a transform.",
        "**An arc that grows and shrinks:** SVG with stroke dashes, plus a rotation on a transform so it keeps turning if the main thread stalls.",
        "**A mascot, logo or illustrated preloader:** SVG, inline so it paints with the HTML. Our guide to [building a cute website preloader](/blog/how-to-create-a-cute-website-preloader/) walks through one.",
        "**Only an image slot available,** such as a CMS field: an SVG file with its CSS embedded, in an `<img>`.",
        "**A design-system primitive:** a CSS spinner for everyday loading states, with SVG components for illustrated waiting or empty states.",
      ],
    },
    {
      type: "loader",
      slug: "elegant-spinner",
      caption: "Elegant Spinner: an arc that stretches to three quarters of a circle and gathers back in as it turns, the kind of motion a CSS border can't draw.",
    },
    { type: "h2", text: "Next steps" },
    {
      type: "p",
      text: "To build a ring yourself, start with the CSS tutorial linked above or the [CSS spinner generator](/css-spinner-generator/); for vector shapes, try the [SVG loader generator](/svg-loader-generator/). Every loader in the CuteLoader library is inline SVG and CSS with custom properties for colors, duration and stroke width, so you can theme it like a CSS spinner and still get shapes that CSS can't draw.",
    },
  ],
  faqs: [
    {
      q: "Are SVG loaders slower than CSS spinners?",
      a: "Not inherently. In our Chrome test, rotations and opacity changes kept running during a 2.5-second main-thread block whether they were applied to an HTML element, an `<svg>` element or a shape inside one. What froze were paint-based animations: SVG stroke dashes and a CSS gradient whose angle was animated through `@property`. Pick the property carefully and either technology performs well.",
    },
    {
      q: "Can a CSS spinner have a gradient?",
      a: "Yes. Paint the element with `conic-gradient()` and cut out the middle with a radial-gradient `mask` to get a gradient ring. Then rotate the whole element with `transform` instead of animating the gradient's angle: in our test, the rotated version kept spinning while the main thread was blocked, and the animated-angle version froze.",
    },
    {
      q: "When is an animated GIF better than either?",
      a: "Only when you can't use CSS or SVG at all, such as somewhere that accepts nothing but an image file. GIFs are limited to 256 colors per palette and to pixels that are either fully transparent or fully opaque, so soft edges look jagged on some backgrounds, and you can't recolor them, scale them cleanly or slow them down for reduced motion. CuteLoader offers GIF export for those cases.",
    },
    {
      q: "Which is easier to customize?",
      a: "For a simple ring, CSS: change a few custom properties. For anything more detailed, an SVG loader built on custom properties is just as easy. Every CuteLoader loader exposes its colors as `--c1`, `--c2` and `--c3` and its cycle duration as `--d`, plus stroke width (`--sw`) and motion intensity (`--amp`) where a loader supports them. The studio on each loader page edits these visually and exports the result.",
    },
  ],
};

export default article;

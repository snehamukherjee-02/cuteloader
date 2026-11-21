import type { Article } from "@/types/content";

const article: Article = {
  slug: "how-to-build-a-reusable-css-loader",
  title: "How to Build a Reusable CSS Loader",
  seoTitle: "How to Build a Reusable CSS Loader Component",
  description:
    "Turn a spinner into a reusable CSS loader: a custom-property API, BEM variants, button and overlay placements, a tiny JavaScript helper and one file to ship.",
  excerpt:
    "Most codebases end up with five slightly different spinners. Build one loader with a small custom-property API, three variants, ready-made button and overlay placements and a short helper script, packaged as a single CSS file.",
  publishedAt: "2026-11-21",
  tags: ["CSS", "Components", "JavaScript", "Tutorial"],
  relatedAnimations: ["minimal-ring", "line-loader", "expanding-circle", "thin-gradient-ring"],
  blocks: [
    {
      type: "p",
      text: "A reusable CSS loader is a small component with a public API. Give it one class, a handful of custom properties for size, color, thickness and speed, modifier classes for its variants, and placement rules for text, buttons and overlays. Ship it as one CSS file plus an optional script that shows and hides it. This guide builds that component and explains the decisions that keep it working across a whole codebase.",
    },
    {
      type: "p",
      text: "If you haven't built a CSS spinner before, start with our [CSS loading spinner tutorial](/blog/how-to-create-css-loading-animation/), which explains the border trick and the keyframes this component reuses.",
    },
    { type: "h2", text: "Start with the API, not the animation" },
    {
      type: "p",
      text: "Before writing keyframes, decide what people using the loader should be able to change without reading its source. Those knobs become custom properties with a `--loader-` prefix, and together they're the component's contract:",
    },
    {
      type: "table",
      head: ["Custom property", "Default", "What it controls"],
      rows: [
        ["`--loader-size`", "`1.5em`", "Width and height of the ring and pulse"],
        ["`--loader-color`", "`currentColor`", "The moving part"],
        ["`--loader-track`", "20% of the color", "The faint ring or bar behind it"],
        ["`--loader-thickness`", "`0.15em`", "Ring stroke and bar height"],
        ["`--loader-speed`", "`0.8s` ring, `1.2s` pulse and bar", "Duration of one cycle"],
        ["`--loader-overlay`", "70% white", "Background of the region overlay"],
      ],
    },
    {
      type: "p",
      text: "Two defaults do a lot of work. `currentColor` means a loader matches the text around it with no configuration, so it looks right in a dark button, a red error banner or a muted footnote. Sizes in `em` mean it scales with the font size of its context.",
    },
    { type: "h3", text: "Make the API inheritable" },
    {
      type: "p",
      text: "There's a subtle choice in how the defaults are applied. If the loader declared `--loader-size: 1.5em` on itself, that declaration would beat any value inherited from a parent, so you could only resize a loader by targeting it directly. Instead, the component reads each public property with a fallback and stores the result in a private property, marked by an underscore:",
    },
    {
      type: "code",
      lang: "css",
      code: `.loader {
  --_size: var(--loader-size, 1.5em);
  --_color: var(--loader-color, currentColor);
  width: var(--_size);
}

/* Now one declaration themes every loader inside the panel. */
.dark-panel {
  --loader-color: #fbbf24;
  --loader-size: 2rem;
}`,
    },
    {
      type: "p",
      text: "The public properties are never declared by the component, so they inherit from wherever you set them: a single loader, a card, a page section or `:root`. The private `--_` properties are implementation details you can rename freely; the public ones are a promise.",
    },
    { type: "h2", text: "Variants: classes for design, attributes for state" },
    {
      type: "p",
      text: "There are two popular ways to express variants: BEM modifier classes such as `.loader--bar`, or data attributes such as `[data-variant=\"bar\"]`. Both have the same specificity as a single class, so neither causes cascade surprises. A useful rule is to use classes for design choices that are fixed when you write the markup, and data attributes for state that JavaScript toggles at runtime. In this component the variant is a class, and the loading state of a button is `data-loading`.",
    },
    {
      type: "p",
      text: "Every variant here is drawn by the `::before` pseudo-element, so all three share identical markup: `<span class=\"loader\" aria-hidden=\"true\"></span>`. Switching variants means changing one class, and server templates, React components and the helper script all generate the same element.",
    },
    { type: "h2", text: "The complete stylesheet" },
    {
      type: "code",
      lang: "css",
      filename: "loader.css",
      code: `/*
 * loader.css: a reusable CSS loader
 *
 * Markup:      <span class="loader" aria-hidden="true"></span>
 * Variants:    .loader--pulse, .loader--bar
 * Placements:  inline (default), button[data-loading], .loader-overlay
 * Public API (set on the loader or on any ancestor; all optional):
 *   --loader-size        1.5em
 *   --loader-color       currentColor
 *   --loader-track       20% of --loader-color
 *   --loader-thickness   0.15em
 *   --loader-speed       0.8s ring, 1.2s pulse and bar
 *   --loader-overlay     rgb(255 255 255 / 0.7)
 */
@layer loader {
  .loader {
    --_size: var(--loader-size, 1.5em);
    --_color: var(--loader-color, currentColor);
    --_track: var(--loader-track, color-mix(in srgb, var(--_color) 20%, transparent));
    --_thickness: var(--loader-thickness, 0.15em);
    --_speed: var(--loader-speed, 0.8s);
    --_motion: 1;

    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: var(--_size);
    height: var(--_size);
    vertical-align: middle;
  }

  .loader::before {
    content: "";
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    border: var(--_thickness) solid var(--_track);
    border-top-color: var(--_color);
    border-radius: 50%;
    animation: loader-spin calc(var(--_speed) * var(--_motion)) linear infinite;
  }

  /* Variant: pulse */
  .loader--pulse { --_speed: var(--loader-speed, 1.2s); }
  .loader--pulse::before {
    border: 0;
    background: var(--_color);
    animation-name: loader-pulse;
    animation-timing-function: ease-out;
  }

  /* Variant: indeterminate bar */
  .loader--bar {
    --_speed: var(--loader-speed, 1.2s);
    width: 100%;
    height: var(--_thickness);
    overflow: hidden;
    border-radius: 999px;
    background: var(--_track);
  }
  .loader--bar::before {
    width: 40%;
    border: 0;
    border-radius: inherit;
    background: var(--_color);
    animation-name: loader-slide;
    animation-timing-function: ease-in-out;
  }

  /* Placement: inside a button */
  button[data-loading] {
    position: relative;
    cursor: progress;
  }
  button[data-loading] > * { visibility: hidden; }
  button[data-loading] > .loader {
    --loader-size: 1.25em;
    position: absolute;
    inset: 0;
    margin: auto;
    visibility: visible;
  }

  /* Placement: covering a region */
  .loader-overlay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    border-radius: inherit;
    background: var(--loader-overlay, rgb(255 255 255 / 0.7));
  }
  .loader-overlay > .loader--bar {
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Screen-reader-only text */
  .loader-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @keyframes loader-spin { to { transform: rotate(360deg); } }
  @keyframes loader-pulse {
    from { transform: scale(0.2); opacity: 1; }
    to   { transform: scale(1); opacity: 0; }
  }
  @keyframes loader-slide {
    from { transform: translateX(-100%); }
    to   { transform: translateX(250%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .loader { --_motion: 3; }
  }
}`,
    },
    { type: "p", text: "A few lines in there deserve a note:" },
    {
      type: "ul",
      items: [
        "**Every animation is a transform or an opacity change,** including the bar, which slides with `translateX()` instead of animating `left` or `width`. Those are the properties browsers can animate without repainting.",
        "**One multiplier handles reduced motion.** Every duration is `--_speed` times `--_motion`, so a single media query makes all three variants three times slower for people who ask for less motion, the same approach the CuteLoader library takes.",
        "**Keyframe names are global,** unlike classes inside a component framework, so they carry the `loader-` prefix too.",
        "**The whole file sits in a cascade layer.** Styles outside any layer always beat layered styles, whatever their specificity, as MDN's [@layer reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer) explains. A project can override any rule with a plain selector and never needs `!important`.",
      ],
    },
    {
      type: "demo",
      height: 290,
      caption: "The three variants, a loader sized to its text, and a panel that themes every loader inside it with two custom properties.",
      html: `<div class="demo">
  <div class="variants">
    <figure><span class="loader" aria-hidden="true"></span><figcaption>.loader</figcaption></figure>
    <figure><span class="loader loader--pulse" aria-hidden="true"></span><figcaption>.loader--pulse</figcaption></figure>
    <figure class="wide"><span class="loader loader--bar" aria-hidden="true"></span><figcaption>.loader--bar</figcaption></figure>
  </div>
  <p class="inline">Syncing your files <span class="loader" style="--loader-size: 1em" aria-hidden="true"></span></p>
  <div class="dark-panel">
    <span class="loader" aria-hidden="true"></span>
    <span class="loader loader--pulse" aria-hidden="true"></span>
    <p>Two custom properties on this panel theme both loaders.</p>
  </div>
</div>`,
      css: `@layer loader {
  .loader {
    --_size: var(--loader-size, 1.5em);
    --_color: var(--loader-color, currentColor);
    --_track: var(--loader-track, color-mix(in srgb, var(--_color) 20%, transparent));
    --_thickness: var(--loader-thickness, 0.15em);
    --_speed: var(--loader-speed, 0.8s);
    --_motion: 1;
    position: relative; display: inline-block; flex-shrink: 0;
    width: var(--_size); height: var(--_size); vertical-align: middle;
  }
  .loader::before {
    content: ""; position: absolute; inset: 0; box-sizing: border-box;
    border: var(--_thickness) solid var(--_track); border-top-color: var(--_color); border-radius: 50%;
    animation: loader-spin calc(var(--_speed) * var(--_motion)) linear infinite;
  }
  .loader--pulse { --_speed: var(--loader-speed, 1.2s); }
  .loader--pulse::before { border: 0; background: var(--_color); animation-name: loader-pulse; animation-timing-function: ease-out; }
  .loader--bar { --_speed: var(--loader-speed, 1.2s); width: 100%; height: var(--_thickness); overflow: hidden; border-radius: 999px; background: var(--_track); }
  .loader--bar::before { width: 40%; border: 0; border-radius: inherit; background: var(--_color); animation-name: loader-slide; animation-timing-function: ease-in-out; }
  @keyframes loader-spin { to { transform: rotate(360deg); } }
  @keyframes loader-pulse { from { transform: scale(0.2); opacity: 1; } to { transform: scale(1); opacity: 0; } }
  @keyframes loader-slide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }
  @media (prefers-reduced-motion: reduce) { .loader { --_motion: 3; } }
}
.demo { width: 100%; max-width: 640px; box-sizing: border-box; padding: 16px; color: #3b3450; }
.variants { display: flex; gap: 12px; color: #7c3aed; font-size: 24px; }
.variants figure { flex: 1; margin: 0; padding: 14px 10px 10px; display: grid; grid-template-rows: 1fr auto; justify-items: center; align-items: center; gap: 10px; background: #f7f5fb; border: 1px solid #e4def0; border-radius: 12px; }
.variants .wide { flex: 2; }
.variants .wide .loader { --loader-thickness: 6px; }
figcaption { font: 12px ui-monospace, Menlo, Consolas, monospace; color: #5b5470; }
.inline { margin: 14px 0; font-size: 15px; }
.dark-panel { --loader-color: #fbbf24; --loader-size: 2rem; display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-radius: 12px; background: #1f1a2e; color: #e9e4f5; }
.dark-panel p { margin: 0; font-size: 13px; }
@media (max-width: 520px) {
  .variants { flex-wrap: wrap; }
  .variants .wide { flex-basis: 100%; }
}`,
    },
    { type: "h2", text: "Placements: inline, button and overlay" },
    { type: "h3", text: "Inline with text" },
    {
      type: "p",
      text: "The default loader is an inline block aligned to the middle of the line, so it can sit inside a sentence. Set `--loader-size: 1em` to match the text exactly.",
    },
    { type: "h3", text: "Inside a button" },
    {
      type: "p",
      text: "Wrap the button's label in an element. While the button has `data-loading`, the label becomes `visibility: hidden`, which hides it but keeps its space, so the button doesn't change width. The loader is centered on top in the button's own text color. Mark the button with `aria-disabled=\"true\"` rather than the `disabled` attribute: disabling a focused button can drop keyboard focus, which leaves keyboard and screen reader users stranded.",
    },
    {
      type: "code",
      lang: "html",
      code: `<button type="button" id="save" class="button" data-loading aria-disabled="true">
  <span>Save changes</span>
  <span class="loader" aria-hidden="true"></span>
</button>`,
    },
    { type: "h3", text: "Covering a region" },
    {
      type: "p",
      text: "To show that a card or table is refreshing, add a `.loader-overlay` containing a loader as the last child of the region, and give the region `position: relative` and `aria-busy=\"true\"`. The overlay dims the old content instead of removing it, so the layout stays put. A bar inside an overlay pins itself to the top edge, like a progress line.",
    },
    { type: "h2", text: "A tiny JavaScript helper" },
    {
      type: "p",
      text: "The markup above is easy to write by hand, but the logic around it is easy to get wrong: showing the loader only when a request is slow, ignoring double clicks, cleaning up when the request fails and telling screen reader users what happened. A short helper handles all of that:",
    },
    {
      type: "code",
      lang: "js",
      filename: "loader.js",
      code: `// loader.js: show a CSS loader on a button or region while a task runs.
const busy = new WeakSet();
let announcer;

function announce(message) {
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.className = "loader-sr";
    announcer.setAttribute("role", "status");
    document.body.append(announcer);
  }
  // Update in a later task, so a just-created live region is registered first.
  setTimeout(() => { announcer.textContent = message; }, 100);
}

export async function withLoader(target, task, options = {}) {
  const { label = "Loading…", done = "", variant = "", delay = 300 } = options;
  if (busy.has(target)) return;
  busy.add(target);

  const loader = document.createElement("span");
  loader.className = variant ? \`loader loader--\${variant}\` : "loader";
  loader.setAttribute("aria-hidden", "true");
  const isButton = target.tagName === "BUTTON";
  let shown = null;

  // Only show the loader if the task takes longer than \`delay\` milliseconds.
  const timer = setTimeout(() => {
    if (isButton) {
      target.dataset.loading = "";
      target.setAttribute("aria-disabled", "true");
      shown = loader;
    } else {
      if (getComputedStyle(target).position === "static") target.style.position = "relative";
      target.setAttribute("aria-busy", "true");
      shown = document.createElement("div");
      shown.className = "loader-overlay";
      shown.append(loader);
    }
    target.append(shown);
    announce(label);
  }, delay);

  try {
    return await task();
  } finally {
    clearTimeout(timer);
    busy.delete(target);
    if (shown) {
      shown.remove();
      delete target.dataset.loading;
      target.removeAttribute("aria-disabled");
      target.removeAttribute("aria-busy");
      if (done) announce(done);
    }
  }
}`,
    },
    {
      type: "code",
      lang: "js",
      code: `import { withLoader } from "./loader.js";

const save = document.querySelector("#save");
save.addEventListener("click", () =>
  withLoader(save, () => fetch("/api/save", { method: "POST" }), {
    label: "Saving…",
    done: "Saved",
  }),
);

const orders = document.querySelector("#orders");
const response = await withLoader(orders, () => fetch("/api/orders"), {
  label: "Loading orders…",
  variant: "bar",
});`,
    },
    {
      type: "ul",
      items: [
        "**It takes a function, not a promise.** That lets the busy check run before the request starts, so a double click doesn't send two requests.",
        "**Nothing appears for fast tasks.** If the task settles within 300 milliseconds, the loader never shows and nothing is announced, which avoids a flicker on fast connections.",
        "**Cleanup lives in the finally block.** The loader disappears whether the request succeeds or throws, and the error still reaches your code.",
        "**One live region serves the whole page.** The helper creates a single `role=\"status\"` element and writes messages into it on a later task, which is what MDN's [guide to ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) recommends when a region is created with JavaScript.",
      ],
    },
    {
      type: "p",
      text: "For more patterns around requests, such as timeouts and error states, see our guide to [adding a loader to an AJAX request](/blog/add-loader-to-ajax-request/). The demo below runs the helper with simulated requests.",
    },
    {
      type: "demo",
      height: 300,
      caption: "The helper in action: a button with an in-place loader, and a card with an overlay. Requests are simulated with timers.",
      html: `<div class="demo">
  <button type="button" class="button" id="save"><span>Save changes</span></button>
  <section class="card" id="orders">
    <header><h2>Recent orders</h2><button type="button" class="link" id="refresh"><span>Refresh</span></button></header>
    <ul><li>#1042 · Matcha starter set · $38</li><li>#1041 · Bamboo whisk · $19</li><li>#1040 · Tea bowl · $45</li></ul>
  </section>
</div>`,
      css: `@layer loader {
  .loader {
    --_size: var(--loader-size, 1.5em);
    --_color: var(--loader-color, currentColor);
    --_track: var(--loader-track, color-mix(in srgb, var(--_color) 20%, transparent));
    --_thickness: var(--loader-thickness, 0.15em);
    --_speed: var(--loader-speed, 0.8s);
    --_motion: 1;
    position: relative; display: inline-block; flex-shrink: 0;
    width: var(--_size); height: var(--_size); vertical-align: middle;
  }
  .loader::before {
    content: ""; position: absolute; inset: 0; box-sizing: border-box;
    border: var(--_thickness) solid var(--_track); border-top-color: var(--_color); border-radius: 50%;
    animation: loader-spin calc(var(--_speed) * var(--_motion)) linear infinite;
  }
  .loader--bar { --_speed: var(--loader-speed, 1.2s); width: 100%; height: var(--_thickness); overflow: hidden; border-radius: 999px; background: var(--_track); }
  .loader--bar::before { width: 40%; border: 0; border-radius: inherit; background: var(--_color); animation-name: loader-slide; animation-timing-function: ease-in-out; }
  button[data-loading] { position: relative; cursor: progress; }
  button[data-loading] > * { visibility: hidden; }
  button[data-loading] > .loader { --loader-size: 1.25em; position: absolute; inset: 0; margin: auto; visibility: visible; }
  .loader-overlay { position: absolute; inset: 0; display: grid; place-items: center; border-radius: inherit; background: var(--loader-overlay, rgb(255 255 255 / 0.7)); }
  .loader-overlay > .loader--bar { position: absolute; top: 0; left: 0; }
  .loader-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  @keyframes loader-spin { to { transform: rotate(360deg); } }
  @keyframes loader-slide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }
  @media (prefers-reduced-motion: reduce) { .loader { --_motion: 3; } }
}
.demo { width: 100%; max-width: 560px; box-sizing: border-box; padding: 16px; color: #2f2a3d; }
.button { font: inherit; font-size: 15px; padding: 10px 18px; border: 0; border-radius: 10px; background: #7c3aed; color: #fff; cursor: pointer; }
.card { --loader-thickness: 4px; margin-top: 16px; padding: 14px 16px; border: 1px solid #e4def0; border-radius: 12px; background: #fff; }
.card header { display: flex; justify-content: space-between; align-items: center; }
.card h2 { margin: 0; font-size: 16px; }
.link { font: inherit; font-size: 14px; padding: 4px 8px; border: 0; background: none; color: #6d28d9; cursor: pointer; }
.card ul { margin: 10px 0 0; padding-left: 18px; font-size: 14px; line-height: 1.8; }`,
      js: `const busy = new WeakSet();
let announcer;

function announce(message) {
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.className = "loader-sr";
    announcer.setAttribute("role", "status");
    document.body.append(announcer);
  }
  setTimeout(() => { announcer.textContent = message; }, 100);
}

async function withLoader(target, task, options = {}) {
  const { label = "Loading…", done = "", variant = "", delay = 300 } = options;
  if (busy.has(target)) return;
  busy.add(target);
  const loader = document.createElement("span");
  loader.className = variant ? "loader loader--" + variant : "loader";
  loader.setAttribute("aria-hidden", "true");
  const isButton = target.tagName === "BUTTON";
  let shown = null;
  const timer = setTimeout(() => {
    if (isButton) {
      target.dataset.loading = "";
      target.setAttribute("aria-disabled", "true");
      shown = loader;
    } else {
      if (getComputedStyle(target).position === "static") target.style.position = "relative";
      target.setAttribute("aria-busy", "true");
      shown = document.createElement("div");
      shown.className = "loader-overlay";
      shown.append(loader);
    }
    target.append(shown);
    announce(label);
  }, delay);
  try {
    return await task();
  } finally {
    clearTimeout(timer);
    busy.delete(target);
    if (shown) {
      shown.remove();
      delete target.dataset.loading;
      target.removeAttribute("aria-disabled");
      target.removeAttribute("aria-busy");
      if (done) announce(done);
    }
  }
}

// Simulated requests stand in for fetch().
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

document.addEventListener("click", (event) => {
  if (event.target.closest("#save")) {
    withLoader(document.getElementById("save"), () => wait(1500), { label: "Saving…", done: "Saved" });
  }
  if (event.target.closest("#refresh")) {
    withLoader(document.getElementById("orders"), () => wait(2000), { label: "Refreshing orders…", done: "Orders updated" });
  }
});`,
    },
    {
      type: "loader",
      slug: "line-loader",
      caption: "Line Loader from the CuteLoader library: two segments racing along a track, a richer take on the bar variant for page tops and panels.",
    },
    { type: "h2", text: "Package it as one file" },
    {
      type: "ul",
      items: [
        "**Keep everything in loader.css,** with the API documented in the header comment so nobody has to read the rules to use it. The script is optional and only needed for the show-and-hide logic.",
        "**Prefix every name,** including classes, custom properties and keyframes, so the file can drop into any project without collisions.",
        "**Treat public names as an API.** Renaming `--loader-color` or `.loader--bar` is a breaking change that deserves a major version if you publish the file as a package. Private `--_` properties can change in any release.",
        "**Ship it however your project ships CSS:** a `<link>` tag, an `@import`, or a bundler import. Because it lives in its own layer, load order doesn't decide who wins.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "The finished stylesheet is 1.9 KB minified and 760 bytes gzipped. The helper is 1.4 KB with comments and extra whitespace removed, or about 600 bytes gzipped.",
    },
    {
      type: "p",
      text: "A ring, a pulse and a bar cover most everyday loading states. When you want something with more character, the [CSS loaders](/css-loaders/) collection has designs you can customize in the browser and export as HTML and CSS, with the same custom-property approach, and the [minimal loading animations](/animations/minimal/) are a natural next step from this component.",
    },
    {
      type: "loader",
      slug: "minimal-ring",
      caption: "Minimal Ring: the same idea as the default variant, with a configurable stroke and a track color you can set separately.",
    },
  ],
  faqs: [
    {
      q: "Why use custom properties instead of Sass variables?",
      a: "Sass variables disappear at build time, so changing a size or color means writing a new class or recompiling. Custom properties exist in the browser: they inherit, they can be set on any ancestor or inline, and they can change inside media queries, container queries or a dark-mode selector. That makes them the natural public API for a component that has to fit many contexts.",
    },
    {
      q: "Should variants be classes or data attributes?",
      a: "Either works, and a class and an attribute selector have the same specificity. Classes suit fixed design choices that you write into markup, such as `.loader--bar`. Data attributes suit state that JavaScript toggles, such as `data-loading` on a button, because an attribute can hold only one value at a time and is easy to set with `element.dataset`.",
    },
    {
      q: "How do I use this loader in React or Vue?",
      a: "Import loader.css once and render the element wherever you need it: `<span className=\"loader loader--bar\" aria-hidden=\"true\" />` in React, or the same tag with `class` in Vue. Show it conditionally from your own loading state; the helper script is optional in a framework, because the framework already re-renders when the state changes.",
    },
    {
      q: "Why wrap the stylesheet in a cascade layer?",
      a: "Normal declarations outside any layer beat declarations inside a layer, regardless of specificity. Wrapping the component in `@layer loader` means a project can override it with simple selectors and without `!important`. The one reversal to remember is that `!important` declarations inside a layer beat unlayered `!important` ones.",
    },
  ],
};

export default article;

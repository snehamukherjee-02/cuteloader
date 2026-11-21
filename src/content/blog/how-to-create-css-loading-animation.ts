import type { Article } from "@/types/content";

const article: Article = {
  slug: "how-to-create-css-loading-animation",
  title: "How to Create a Loading Spinner Using HTML and CSS",
  seoTitle: "CSS Loading Animation: Build a Spinner in HTML & CSS",
  description:
    "Build a CSS loading spinner from scratch: the border trick, custom properties, keyframes, screen reader support and reduced motion, plus a three-dot variant.",
  excerpt:
    "A ring spinner is one element, one border trick and one keyframe. Build it step by step, then make it themeable, accessible and comfortable for people who prefer reduced motion.",
  publishedAt: "2026-11-21",
  tags: ["CSS", "Spinners", "Accessibility", "Tutorial"],
  relatedAnimations: ["minimal-ring", "three-dot-pulse", "elegant-spinner"],
  blocks: [
    {
      type: "p",
      text: "A CSS loading spinner is a square element with a thick border, one side of which is painted a different color. `border-radius: 50%` rounds it into a ring, and a `@keyframes` rule rotates it forever. Here is the entire CSS loading animation:",
    },
    {
      type: "code",
      lang: "html",
      code: `<span class="spinner"></span>`,
    },
    {
      type: "code",
      lang: "css",
      code: `.spinner {
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 5px solid #e5e7eb;
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    },
    {
      type: "p",
      text: "That works, but it isn't finished: it's awkward to resize or recolor, screen readers can't tell anything is happening, and it spins at full speed for people who asked their operating system for less motion. The rest of this guide rebuilds it step by step, explains each line, and ends with a three-dot variant.",
    },
    { type: "h2", text: "Step 1: The border trick" },
    {
      type: "p",
      text: "Start with a box whose width and height are equal and give it a border on all four sides. CSS draws each side of a border as a separate piece, and you can color each piece independently. Where two sides meet, the browser joins them on a diagonal, and when the border widths are equal that join sits at exactly 45 degrees.",
    },
    {
      type: "p",
      text: "Round the box with `border-radius: 50%` and those diagonal joins land at the 1:30, 4:30, 7:30 and 10:30 positions of a clock face. Each side of the border becomes exactly one quarter of the ring, centered on its own edge. Color the top side and you get a 90-degree arc at the top. The other three sides stay light gray and become the track.",
    },
    {
      type: "code",
      lang: "css",
      code: `.spinner {
  display: inline-block;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border: 5px solid #e5e7eb;  /* all four sides: the track */
  border-top-color: #7c3aed;  /* one side repainted: the arc */
  border-radius: 50%;         /* square to circle */
}`,
    },
    { type: "p", text: "Two of those lines are easy to overlook:" },
    {
      type: "ul",
      items: [
        "`box-sizing: border-box` keeps the spinner 48 pixels wide **including** its border. Without it, the 5px border is added outside the width and the spinner occupies 58 pixels, which throws off any layout you build around it.",
        "`display: inline-block` lets a `<span>` accept a width and height. Use a span rather than a div: a `<button>` may only contain phrasing content, so a span is valid inside a button and a div is not.",
      ],
    },
    {
      type: "p",
      text: "Once you see each side as a quarter, other shapes follow: two adjacent sides make a half ring, opposite sides with transparent neighbors make two arcs and no track, and three sides leave a single gap. The demo further down shows all four spinning.",
    },
    { type: "h2", text: "Step 2: Replace hard-coded values with custom properties" },
    {
      type: "p",
      text: "Hard-coded pixels and hex codes mean a new class for every size and color. Custom properties solve that. Declare the defaults on the spinner and read them back with `var()`:",
    },
    {
      type: "code",
      lang: "css",
      code: `.spinner {
  --size: 48px;
  --thickness: 5px;
  --color: #7c3aed;
  --track: color-mix(in srgb, var(--color) 18%, transparent);
  --speed: 0.8s;

  display: inline-block;
  box-sizing: border-box;
  width: var(--size);
  height: var(--size);
  border: var(--thickness) solid var(--track);
  border-top-color: var(--color);
  border-radius: 50%;
  animation: spin var(--speed) linear infinite;
}`,
    },
    {
      type: "p",
      text: "The track is mixed from the main color, so changing `--color` recolors the arc and the track together. `color-mix()` works in all current major browsers. If you support older ones, watch out for one gotcha: a second `--track` declaration won't act as a fallback, because a custom property's value is only checked when it's used. Set a plain color inside `@supports not (color: color-mix(in srgb, red, blue))` instead.",
    },
    {
      type: "p",
      text: "Now you can resize or recolor any spinner by overriding variables where it's used. A spinner inside a button can match the button's text exactly:",
    },
    {
      type: "code",
      lang: "css",
      code: `.button .spinner {
  --size: 1em;
  --thickness: 2px;
  --color: currentColor;
}`,
    },
    {
      type: "p",
      text: "`--track` is computed from `--color`, so it follows along and becomes a faint tint of the text color. Notice that this override targets the spinner itself rather than the button. The spinner declares its own defaults, and its own declarations beat any value it would inherit from a parent. If you'd rather theme a whole region by setting variables on a container, see [how to build a reusable CSS loader](/blog/how-to-build-a-reusable-css-loader/), which uses fallback values for exactly that.",
    },
    { type: "h3", text: "Variations on the border trick" },
    {
      type: "code",
      lang: "css",
      code: `.spinner.two-sides { border-right-color: var(--color); }
.spinner.opposite  { border-color: var(--color) transparent; }
.spinner.three-sides {
  border-color: var(--color);
  border-left-color: var(--track);
}`,
    },
    { type: "h2", text: "Step 3: The keyframes and timing" },
    {
      type: "code",
      lang: "css",
      code: `@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    },
    {
      type: "p",
      text: "There is no `from` keyframe. When one is missing, the browser starts from the element's own value, which here is no rotation at all. A full 360-degree turn ends exactly where it began, so the loop has no visible seam.",
    },
    {
      type: "p",
      text: "**Use linear timing.** With the default `ease`, every revolution speeds up and then slows down. Because the ring looks identical at the start and end of each turn, that reads as a stutter rather than a spin. Somewhere between `0.6s` and `1s` per turn looks busy without looking frantic, but that is a design call, so tune it to your interface.",
    },
    {
      type: "p",
      text: "**Animate the transform, not the layout.** web.dev's guide to [high-performance CSS animations](https://web.dev/articles/animations-guide) recommends restricting animations to `transform` and `opacity`, which browsers can update at the compositing stage without recalculating layout or repainting. That matters more for a loader than for most animations, because a loader is on screen precisely when the page is busy. In our own test, this spinner kept turning in Chrome while JavaScript blocked the main thread for 2.5 seconds. The [CSS spinner vs SVG loader comparison](/blog/css-spinner-vs-svg-loader/) shows which animations froze during that test.",
    },
    {
      type: "p",
      text: "You don't need `will-change: transform` here. The browser already promotes an element while its transform animates, and web.dev advises saving `will-change` for problems you have actually measured.",
    },
    { type: "h2", text: "Step 4: Tell assistive technology what is happening" },
    {
      type: "p",
      text: "A spinning border means nothing to a screen reader. To announce the loading state, write a short message into a live region. An element with `role=\"status\"` is a polite live region: screen readers read changes to it when the user is idle, without interrupting whatever they were doing.",
    },
    {
      type: "p",
      text: "Live regions announce changes, not content that was already there when they appeared. MDN's [guide to ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) recommends establishing the region before you update it, and says the most reliable way is to include it in the initial markup. So keep an empty status element in the page and write into it:",
    },
    {
      type: "code",
      lang: "html",
      code: `<div id="status" class="status" role="status"></div>
<ul id="team" class="team"></ul>`,
    },
    {
      type: "code",
      lang: "js",
      code: `const status = document.getElementById("status");
const team = document.getElementById("team");

function startLoading() {
  team.setAttribute("aria-busy", "true");
  status.innerHTML =
    '<span class="spinner" aria-hidden="true"></span> Loading team members…';
}

function finishLoading(names) {
  team.replaceChildren(...names.map((name) => {
    const item = document.createElement("li");
    item.textContent = name;
    return item;
  }));
  team.setAttribute("aria-busy", "false");
  status.textContent = \`Loaded \${names.length} team members.\`;
}`,
    },
    {
      type: "ul",
      items: [
        "The spinner gets `aria-hidden=\"true\"` because it's decoration. The words carry the meaning.",
        "The message is visible, which helps everyone. If your design only has room for the spinner, keep the words for screen readers with the visually hidden class below.",
        "`aria-busy` tells assistive technology that the list is being updated. Screen reader support for it varies, so treat it as a bonus on top of the status message, not a replacement for it.",
        "Announce the end as well as the start. “Loaded 3 team members.” tells a screen reader user that the wait is over.",
      ],
    },
    {
      type: "code",
      lang: "css",
      code: `.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}`,
    },
    { type: "h2", text: "Step 5: Respect reduced motion" },
    {
      type: "p",
      text: "People can ask their operating system to reduce motion, and CSS exposes that setting as the [prefers-reduced-motion media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). The tempting fix is `animation: none`, but a motionless arc looks like a frozen page, which is the one thing a loader exists to rule out. The W3C's explanation of WCAG's [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) criterion makes the same point: it treats a loading animation as essential when, without it, users could think the content was frozen or broken.",
    },
    { type: "p", text: "So slow the spinner down instead. Three times slower keeps the meaning and removes most of the motion:" },
    {
      type: "code",
      lang: "css",
      code: `@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: calc(var(--speed) * 3);
  }
}`,
    },
    {
      type: "p",
      text: "Because the speed lives in a variable, that one rule covers every spinner on the page. CuteLoader takes the same approach: every loader in the library automatically runs three times slower for visitors who prefer reduced motion. The other option is to swap movement for a change in opacity, as the dots variant below does.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "To check your reduced-motion styles without changing system settings, open Chrome DevTools, press Ctrl+Shift+P (Cmd+Shift+P on a Mac), and run “Emulate CSS prefers-reduced-motion: reduce”.",
    },
    { type: "h2", text: "The complete spinner" },
    {
      type: "p",
      text: "Here is everything in one stylesheet. The demo uses it together with the dots styles from the next section and the step 4 script, wired to two buttons. Press one to start a simulated two-second request.",
    },
    {
      type: "code",
      lang: "css",
      filename: "spinner.css",
      code: `.spinner {
  --size: 48px;
  --thickness: 5px;
  --color: #7c3aed;
  --track: color-mix(in srgb, var(--color) 18%, transparent);
  --speed: 0.8s;

  display: inline-block;
  box-sizing: border-box;
  width: var(--size);
  height: var(--size);
  border: var(--thickness) solid var(--track);
  border-top-color: var(--color);
  border-radius: 50%;
  animation: spin var(--speed) linear infinite;
}

.spinner.two-sides { border-right-color: var(--color); }
.spinner.opposite  { border-color: var(--color) transparent; }
.spinner.three-sides {
  border-color: var(--color);
  border-left-color: var(--track);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: calc(var(--speed) * 3);
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}`,
    },
    {
      type: "demo",
      height: 310,
      caption: "The spinner and dots from this article, announced through a role=\"status\" region. The row below shows the border variations.",
      html: `<div class="card">
  <div class="card-head">
    <h2>Team members</h2>
    <div class="actions">
      <button type="button" data-loader="spinner">Load with spinner</button>
      <button type="button" data-loader="dots" class="secondary">Load with dots</button>
    </div>
  </div>
  <div id="status" class="status" role="status"></div>
  <ul id="team" class="team"></ul>
</div>
<div class="variants" aria-hidden="true">
  <figure><span class="spinner"></span><figcaption>one side</figcaption></figure>
  <figure><span class="spinner two-sides"></span><figcaption>two sides</figcaption></figure>
  <figure><span class="spinner opposite"></span><figcaption>opposite sides</figcaption></figure>
  <figure><span class="spinner three-sides"></span><figcaption>three sides</figcaption></figure>
</div>`,
      css: `.spinner {
  --size: 48px;
  --thickness: 5px;
  --color: #7c3aed;
  --track: color-mix(in srgb, var(--color) 18%, transparent);
  --speed: 0.8s;
  display: inline-block;
  box-sizing: border-box;
  width: var(--size);
  height: var(--size);
  border: var(--thickness) solid var(--track);
  border-top-color: var(--color);
  border-radius: 50%;
  animation: spin var(--speed) linear infinite;
}
.spinner.two-sides { border-right-color: var(--color); }
.spinner.opposite { border-color: var(--color) transparent; }
.spinner.three-sides { border-color: var(--color); border-left-color: var(--track); }
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: calc(var(--speed) * 3); }
}
.dots {
  --dot: 0.5em;
  --color: #7c3aed;
  --speed: 1s;
  display: inline-flex;
  gap: calc(var(--dot) * 0.6);
  vertical-align: middle;
}
.dots span {
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--color);
  animation: dot-bounce var(--speed) ease-in-out infinite;
}
.dots span:nth-child(1) { animation-delay: calc(var(--speed) * -0.3); }
.dots span:nth-child(2) { animation-delay: calc(var(--speed) * -0.15); }
@keyframes dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-80%); opacity: 1; }
}
@keyframes dot-fade {
  0%, 60%, 100% { opacity: 0.4; }
  30% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .dots span { animation-name: dot-fade; }
}
body { display: block; place-items: normal; min-height: 0; margin: 0; padding: 16px; font: 15px/1.5 system-ui, sans-serif; color: #1f1a2e; background: #f7f5fb; }
.card { background: #fff; border: 1px solid #e4def0; border-radius: 12px; padding: 14px 16px; }
.card-head { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; }
.card h2 { margin: 0; font-size: 16px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
button { font: inherit; font-size: 14px; padding: 6px 12px; border-radius: 8px; border: 1px solid #7c3aed; background: #7c3aed; color: #fff; cursor: pointer; }
button.secondary { background: #fff; color: #6d28d9; }
.status { display: flex; align-items: center; gap: 10px; min-height: 36px; margin-top: 10px; color: #4b4560; }
.status .spinner { --size: 26px; --thickness: 3px; }
.team { display: flex; flex-wrap: wrap; gap: 6px; min-height: 30px; margin: 4px 0 0; padding: 0; list-style: none; }
.team li { padding: 2px 10px; border-radius: 999px; background: #f1ecfb; color: #4c1d95; font-size: 14px; }
.variants { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 28px; margin-top: 16px; }
.variants figure { margin: 0; display: grid; justify-items: center; gap: 6px; font-size: 12px; color: #6b6480; }`,
      js: `let timer;

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-loader]");
  if (!button) return;
  const status = document.getElementById("status");
  const team = document.getElementById("team");
  const loader = button.dataset.loader === "dots"
    ? '<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span>'
    : '<span class="spinner" aria-hidden="true"></span>';

  team.setAttribute("aria-busy", "true");
  team.replaceChildren();
  status.innerHTML = loader + " Loading team members…";

  clearTimeout(timer);
  timer = setTimeout(() => {
    const names = ["Ana", "Ben", "Chloé"];
    team.replaceChildren(...names.map((name) => {
      const item = document.createElement("li");
      item.textContent = name;
      return item;
    }));
    team.setAttribute("aria-busy", "false");
    status.textContent = "Loaded " + names.length + " team members.";
  }, 2000);
});`,
    },
    {
      type: "loader",
      slug: "minimal-ring",
      caption: "Minimal Ring from the CuteLoader library. Open it to change its colors, size and speed, then export it as HTML and CSS.",
    },
    { type: "h2", text: "Variant: three bouncing dots" },
    {
      type: "p",
      text: "Dots suit inline contexts, such as “Sending…” in a chat box, where a ring can feel heavy. The markup changes, but the principles carry over: custom properties for the API, `transform` and `opacity` for the motion, and a reduced-motion rule.",
    },
    {
      type: "code",
      lang: "html",
      code: `<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "dots.css",
      code: `.dots {
  --dot: 0.5em;
  --color: #7c3aed;
  --speed: 1s;

  display: inline-flex;
  gap: calc(var(--dot) * 0.6);
  vertical-align: middle;
}

.dots span {
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--color);
  animation: dot-bounce var(--speed) ease-in-out infinite;
}

.dots span:nth-child(1) { animation-delay: calc(var(--speed) * -0.3); }
.dots span:nth-child(2) { animation-delay: calc(var(--speed) * -0.15); }

@keyframes dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-80%); opacity: 1; }
}

/* Reduced motion: same rhythm, no movement */
@keyframes dot-fade {
  0%, 60%, 100% { opacity: 0.4; }
  30% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .dots span { animation-name: dot-fade; }
}`,
    },
    { type: "p", text: "Four details make this version work:" },
    {
      type: "ul",
      items: [
        "**Sizes in em units.** The dots scale with the surrounding font size, so the same markup fits a small button label or a large heading.",
        "**A percentage translate.** Percentages in `translateY()` refer to the element's own size, so the bounce height scales with the dots.",
        "**Negative delays.** A negative `animation-delay` starts an animation partway through its cycle. The first dot starts 30% of the way in and the second 15%, so the dots are already in a wave on the first frame instead of all starting together. Writing the delays as fractions of `--speed` keeps the wave's shape when you change the speed.",
        "**A reduced-motion swap.** Instead of slowing the bounce down, the media query swaps the keyframes for a fade with the same timing. The glow still travels from left to right, but nothing moves.",
      ],
    },
    {
      type: "loader",
      slug: "three-dot-pulse",
      caption: "Three Dot Pulse, a ready-made dots loader you can recolor and resize in the CuteLoader studio.",
    },
    { type: "h2", text: "Where to go from here" },
    {
      type: "p",
      text: "You now have a spinner you can resize, recolor and announce, and you know why each line is there. To package it as a small component with variants and ready-made button and overlay placements, continue with [how to build a reusable CSS loader](/blog/how-to-build-a-reusable-css-loader/). If you'd rather adjust a ring visually and copy the result, try the [CSS spinner generator](/css-spinner-generator/), or browse the [minimal loading animations](/animations/minimal/) for ring, dot and bar designs you can customize and export.",
    },
  ],
  faqs: [
    {
      q: "Why does my CSS spinner wobble or look oval?",
      a: "Almost always because the box isn't a perfect square. Check that the width and height resolve to the same value, that the element isn't `display: inline` (inline elements ignore width and height), and that a flex parent isn't squashing it; `flex-shrink: 0` fixes that. Sizes that resolve to fractional pixels can also make the ring wobble slightly as it turns, so whole-pixel sizes give the steadiest result.",
    },
    {
      q: "How do I stop the spinner when loading finishes?",
      a: "Remove it from the DOM, or hide it with the `hidden` attribute. CSS animations don't run on an element with `display: none`, so a hidden spinner costs nothing, and showing it again restarts the animation from the beginning. Avoid hiding it with `opacity: 0`: it keeps animating and still takes up space. Whichever you choose, update the status message too, so screen reader users hear that loading has finished.",
    },
    {
      q: "Should I show a spinner for every request?",
      a: "No. In his 1993 book Usability Engineering, Jakob Nielsen describes 0.1 second as the limit for a response to feel instantaneous and 1 second as the limit for keeping the user's flow of thought, and notes that delays under a second normally need no special feedback. A spinner that appears for 200 milliseconds just flickers. A common pattern is to wait 300 to 500 milliseconds before showing it. For waits longer than about 10 seconds, Nielsen's third limit, show real progress instead of an endless loop.",
    },
    {
      q: "Can I build the spinner from a pseudo-element instead of extra markup?",
      a: "Yes. Move the spinner declarations into a rule such as `.button.is-loading::after` and add `content: \"\"`, and the button gets a spinner without a new element. A pseudo-element can't take `aria-hidden`, but an empty `content` string gives assistive technology nothing to read, so it stays decorative. You still need a status message somewhere on the page for screen reader users.",
    },
  ],
};

export default article;

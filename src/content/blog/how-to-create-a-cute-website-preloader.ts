import type { Article } from "@/types/content";

const article: Article = {
  slug: "how-to-create-a-cute-website-preloader",
  title: "How to Create a Cute Website Preloader",
  seoTitle: "How to Create a Cute Website Preloader (SVG + CSS)",
  description:
    "Build a cute website preloader in SVG and CSS: squash and stretch, follow-through, a fade-out when the page is ready, and rules that keep it from hurting LCP.",
  excerpt:
    "A preloader can give a site personality without slowing anyone down. Build a hopping mochi character from a few kilobytes of inline SVG and CSS, show it only when loading is slow, and get out of the way fast.",
  publishedAt: "2026-11-21",
  tags: ["Preloaders", "SVG", "Animation", "Performance"],
  relatedAnimations: ["bouncing-bunny", "happy-mushroom", "bubble-friends", "floating-cloud"],
  blocks: [
    {
      type: "p",
      text: "A cute website preloader is a small animated character on a full-screen overlay that covers the page while it loads, then fades away. To do it well, draw the character in inline SVG and CSS so it paints with the HTML, delay its appearance so fast loads never see it, remove the overlay the moment the page is usable, and give reduced-motion visitors a calmer version. The character built below is under 3 KB of minified markup and CSS.",
    },
    {
      type: "p",
      text: "First, the uncomfortable part: most content sites don't need a preloader. A server-rendered article can show text as it arrives, and covering it only delays reading. Preloaders earn their place on app shells, games, 3D product viewers and other pages that genuinely have nothing useful to show until a script finishes. If that's your situation, here's how to make one people enjoy.",
    },
    { type: "h2", text: "Design principles: personality without delay" },
    {
      type: "p",
      text: "Character animators have been making a few drawings feel alive for a century. In The Illusion of Life: Disney Animation (1981), Frank Thomas and Ollie Johnston described twelve principles of animation, and three of them do most of the work in a tiny loop:",
    },
    {
      type: "ul",
      items: [
        "**Squash and stretch.** Soft things deform: they flatten when they land and stretch when they move fast. Keep the volume roughly constant, so a character that gets wider also gets shorter.",
        "**Follow-through and overlapping action.** Loose parts such as ears, leaves and tails lag behind when the body starts moving and keep going after it stops. This is the cheapest way to make a loop look organic.",
        "**Slow in and slow out.** Motion eases toward its extremes. A hop slows down on the way up and speeds up on the way down, like anything thrown into the air.",
      ],
    },
    {
      type: "p",
      text: "Three constraints matter even more than the principles. Keep the loop short, around one to two seconds, so it reads as activity rather than a scene to watch. Keep it tiny, because a preloader that needs its own download is one more thing to wait for. And keep it optional: it should appear only when loading is slow and leave the moment it's no longer needed.",
    },
    {
      type: "loader",
      slug: "bouncing-bunny",
      caption: "Bouncing Bunny from the CuteLoader library uses the same tricks: it crouches before take-off, stretches in the air, squashes on landing and flops its ears a beat behind.",
    },
    { type: "h2", text: "Step 1: Draw the character in SVG" },
    {
      type: "p",
      text: "Our character is a mochi with a sprout on its head. It's built from simple paths and circles in a `0 0 120 120` viewBox, arranged in groups that match how it should move. Everything that hops sits inside `.mochi-body`. The shadow sits outside it, because shadows stay on the ground. The sprout and the eyes get their own groups, so they can move on their own.",
    },
    {
      type: "code",
      lang: "html",
      filename: "mochi.svg (inline)",
      code: `<svg class="mochi" viewBox="0 0 120 120" width="120" height="120"
     aria-hidden="true" focusable="false">
  <ellipse class="mochi-shadow" cx="60" cy="113" rx="24" ry="4.5" />
  <g class="mochi-body">
    <g class="mochi-sprout">
      <path class="mochi-stem" d="M60 55 C59 49 60 44 63 40" />
      <path class="mochi-leaf" d="M63 40 C66 31 77 29 82 33 C78 40 70 43 63 40 Z" />
      <path class="mochi-leaf" d="M61 45 C56 38 49 38 46 41 C50 46 56 47 61 45 Z" />
    </g>
    <path class="mochi-blob"
          d="M60 54 C80 54 92 70 92 90 C92 104 79 110 60 110 C41 110 28 104 28 90 C28 70 40 54 60 54 Z" />
    <g class="mochi-eyes">
      <circle cx="48" cy="84" r="4" /><circle class="shine" cx="46.6" cy="82.6" r="1.3" />
      <circle cx="72" cy="84" r="4" /><circle class="shine" cx="70.6" cy="82.6" r="1.3" />
    </g>
    <ellipse class="mochi-cheek" cx="40" cy="93" rx="6" ry="3.5" />
    <ellipse class="mochi-cheek" cx="80" cy="93" rx="6" ry="3.5" />
    <path class="mochi-mouth" d="M55 91 Q60 96 65 91" />
  </g>
</svg>`,
    },
    {
      type: "p",
      text: "The drawing leaves room above the sprout, because the character hops 20 units up and stretches on take-off. Anything that leaves the viewBox gets clipped in a standalone file, so plan the headroom before you animate.",
    },
    { type: "h2", text: "Step 2: Animate the hop with squash and stretch" },
    {
      type: "code",
      lang: "css",
      filename: "mochi.css",
      code: `.mochi {
  --mochi-body: #fff1f6;
  --mochi-cheek: #f472b6;
  --mochi-leaf: #4ade80;
  --mochi-ink: #3b2f4a;
  --mochi-speed: 1.2s;
  overflow: visible;
}
.mochi-blob { fill: var(--mochi-body); stroke: var(--mochi-ink); stroke-width: 2.5; }
.mochi-stem { fill: none; stroke: var(--mochi-ink); stroke-width: 2.5; stroke-linecap: round; }
.mochi-leaf { fill: var(--mochi-leaf); stroke: var(--mochi-ink); stroke-width: 2; stroke-linejoin: round; }
.mochi-eyes circle { fill: var(--mochi-ink); }
.mochi-eyes .shine { fill: #fff; }
.mochi-cheek { fill: var(--mochi-cheek); opacity: 0.55; }
.mochi-mouth { fill: none; stroke: var(--mochi-ink); stroke-width: 2.2; stroke-linecap: round; }
.mochi-shadow { fill: var(--mochi-ink); opacity: 0.18; }

/* Pivot points in viewBox units: the feet, the shadow's center,
   the base of the stem and the line of the eyes. */
.mochi-body   { transform-origin: 60px 110px; animation: mochi-hop var(--mochi-speed) infinite; }
.mochi-shadow { transform-origin: 60px 113px; animation: mochi-shadow var(--mochi-speed) infinite; }
.mochi-sprout { transform-origin: 60px 55px;  animation: mochi-sprout var(--mochi-speed) infinite; }
.mochi-eyes   { transform-origin: 60px 84px;  animation: mochi-blink calc(var(--mochi-speed) * 2) infinite; }

@keyframes mochi-hop {
  0%   { transform: translateY(0) scale(1.1, 0.9);      animation-timing-function: ease-in; }
  12%  { transform: translateY(-6px) scale(0.9, 1.12);  animation-timing-function: ease-out; }
  45%  { transform: translateY(-20px) scale(1, 1);      animation-timing-function: ease-in; }
  78%  { transform: translateY(-3px) scale(0.94, 1.07); animation-timing-function: linear; }
  86%  { transform: translateY(0) scale(1.16, 0.84);    animation-timing-function: ease-out; }
  100% { transform: translateY(0) scale(1.1, 0.9); }
}

@keyframes mochi-shadow {
  0%, 100% { transform: scale(1.05); opacity: 0.18; animation-timing-function: ease-out; }
  45%      { transform: scale(0.6);  opacity: 0.08; animation-timing-function: ease-in; }
  86%      { transform: scale(1.15); opacity: 0.22; animation-timing-function: ease-out; }
}

@keyframes mochi-sprout {
  0%, 100% { transform: rotate(6deg); }
  20%      { transform: rotate(16deg); }
  55%      { transform: rotate(-10deg); }
  92%      { transform: rotate(20deg); }
}

@keyframes mochi-blink {
  0%, 90%, 96%, 100% { transform: scaleY(1); }
  93%                { transform: scaleY(0.1); }
}`,
    },
    { type: "p", text: "Each part of that stylesheet maps to one of the principles:" },
    {
      type: "ul",
      items: [
        "**The hop tells a small story.** At 0% the mochi crouches in anticipation, at 12% it stretches as it launches, at 45% it's round at the top of the arc, at 78% it stretches again as it falls, and at 86% it squashes on impact. Each squash keeps the area close to the original: 1.16 × 0.84 is about 0.97.",
        "**The squash happens at the feet.** The body's `transform-origin` is the bottom of the blob, `60px 110px`, so it flattens into the ground instead of shrinking toward its middle. Inside an SVG, `px` values here are viewBox units; our guide to [using SVG loading animations](/blog/how-to-use-svg-loading-animations/) covers transform origins in detail.",
        "**Easing is set per keyframe.** A keyframe's `animation-timing-function` applies until the next keyframe, so `ease-out` on the way up and `ease-in` on the way down give the hop its gravity. As [MDN notes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timing-function), a timing function on the 100% keyframe is never used.",
        "**The shadow shares the rhythm.** It shrinks and fades at the top of the arc and spreads on impact, which sells the height better than the hop alone.",
        "**The sprout follows through.** It rotates around the base of its stem, and each extreme lands slightly after the body's: it drags behind the launch, overshoots past the top and flops forward after the landing.",
        "**The blink runs on a double-length cycle,** so it happens on every other hop instead of becoming a tic.",
      ],
    },
    { type: "h2", text: "Step 3: Add the overlay and fade it out" },
    {
      type: "p",
      text: "The overlay's CSS goes in a `<style>` element in the `<head>` and its markup is the first thing in the `<body>`, so it paints with the first bytes of HTML and needs no extra request. Nothing about showing it depends on JavaScript.",
    },
    {
      type: "code",
      lang: "html",
      code: `<head>
  <style>/* mochi.css and preloader.css, inlined */</style>
  <noscript><style>.preloader { display: none; }</style></noscript>
</head>
<body>
  <div class="preloader" id="preloader">
    <svg class="mochi" viewBox="0 0 120 120" width="120" height="120"
         aria-hidden="true" focusable="false"><!-- the mochi --></svg>
    <span class="visually-hidden">Loading…</span>
  </div>
  <!-- your page -->
</body>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "preloader.css",
      code: `.preloader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: #fff7fb;
  transition: opacity 0.4s ease, visibility 0.4s;
  /* Failsafe: fade out after 8 seconds even if the script never runs. */
  animation: preloader-failsafe 0.4s ease 8s forwards;
}

.preloader.is-done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Show the character only if loading takes a while. */
.preloader .mochi {
  opacity: 0;
  animation: preloader-appear 0.3s ease-out 0.4s forwards;
}

@keyframes preloader-appear { to { opacity: 1; } }
@keyframes preloader-failsafe { to { opacity: 0; visibility: hidden; } }`,
    },
    {
      type: "code",
      lang: "js",
      filename: "preloader.js",
      code: `function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.classList.add("is-done");
  const remove = () => preloader.remove();
  preloader.addEventListener("transitionend", remove, { once: true });
  setTimeout(remove, 600); // in case transitionend never fires
}

// Server-rendered page: hide as soon as the HTML has been parsed.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hidePreloader);
} else {
  hidePreloader();
}
// Single-page app: call hidePreloader() after your first render instead.`,
    },
    { type: "p", text: "A few decisions in there are deliberate:" },
    {
      type: "ul",
      items: [
        "**The character waits 0.4 seconds before fading in.** Jakob Nielsen's response-time limits, from his 1993 book Usability Engineering, note that delays under a second normally need no special feedback. On a fast load, visitors see only a moment of background color, never a character that flashes and vanishes.",
        "**The overlay leaves on readiness, not on load.** The `load` event waits for every image and iframe on the page, which can take far longer than the content people came for. Hide it on `DOMContentLoaded` for a server-rendered page, or right after your app's first render.",
        "**Clicks pass through during the fade,** thanks to `pointer-events: none`, and the element is removed afterwards so it can't trap focus or keep animating.",
        "**Two safety nets.** If JavaScript is disabled, the `<noscript>` style hides the overlay. If a script error stops `hidePreloader()` from running, the CSS failsafe fades it out after 8 seconds.",
      ],
    },
    {
      type: "demo",
      height: 360,
      caption: "The mochi preloader over a mock page. Loading is simulated with a 2.6-second timer; press Replay to see it again.",
      html: `<div class="page">
  <header><span class="logo">Mochi Tea Co.</span><nav>Shop · Journal · About</nav></header>
  <main>
    <h1>Hand-whisked matcha, delivered</h1>
    <div class="cards"><div class="card"><i></i>Ceremonial</div><div class="card"><i></i>Hojicha</div><div class="card"><i></i>Genmaicha</div></div>
    <button type="button" id="replay">Replay preloader</button>
  </main>
</div>
<div class="preloader" id="preloader">
  <svg class="mochi" viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" focusable="false">
    <ellipse class="mochi-shadow" cx="60" cy="113" rx="24" ry="4.5" />
    <g class="mochi-body">
      <g class="mochi-sprout">
        <path class="mochi-stem" d="M60 55 C59 49 60 44 63 40" />
        <path class="mochi-leaf" d="M63 40 C66 31 77 29 82 33 C78 40 70 43 63 40 Z" />
        <path class="mochi-leaf" d="M61 45 C56 38 49 38 46 41 C50 46 56 47 61 45 Z" />
      </g>
      <path class="mochi-blob" d="M60 54 C80 54 92 70 92 90 C92 104 79 110 60 110 C41 110 28 104 28 90 C28 70 40 54 60 54 Z" />
      <g class="mochi-eyes">
        <circle cx="48" cy="84" r="4" /><circle class="shine" cx="46.6" cy="82.6" r="1.3" />
        <circle cx="72" cy="84" r="4" /><circle class="shine" cx="70.6" cy="82.6" r="1.3" />
      </g>
      <ellipse class="mochi-cheek" cx="40" cy="93" rx="6" ry="3.5" />
      <ellipse class="mochi-cheek" cx="80" cy="93" rx="6" ry="3.5" />
      <path class="mochi-mouth" d="M55 91 Q60 96 65 91" />
    </g>
  </svg>
  <span class="visually-hidden">Loading…</span>
</div>`,
      css: `.mochi { --mochi-body: #fff1f6; --mochi-cheek: #f472b6; --mochi-leaf: #4ade80; --mochi-ink: #3b2f4a; --mochi-speed: 1.2s; overflow: visible; }
.mochi-blob { fill: var(--mochi-body); stroke: var(--mochi-ink); stroke-width: 2.5; }
.mochi-stem { fill: none; stroke: var(--mochi-ink); stroke-width: 2.5; stroke-linecap: round; }
.mochi-leaf { fill: var(--mochi-leaf); stroke: var(--mochi-ink); stroke-width: 2; stroke-linejoin: round; }
.mochi-eyes circle { fill: var(--mochi-ink); }
.mochi-eyes .shine { fill: #fff; }
.mochi-cheek { fill: var(--mochi-cheek); opacity: 0.55; }
.mochi-mouth { fill: none; stroke: var(--mochi-ink); stroke-width: 2.2; stroke-linecap: round; }
.mochi-shadow { fill: var(--mochi-ink); opacity: 0.18; }
.mochi-body { transform-origin: 60px 110px; animation: mochi-hop var(--mochi-speed) infinite; }
.mochi-shadow { transform-origin: 60px 113px; animation: mochi-shadow var(--mochi-speed) infinite; }
.mochi-sprout { transform-origin: 60px 55px; animation: mochi-sprout var(--mochi-speed) infinite; }
.mochi-eyes { transform-origin: 60px 84px; animation: mochi-blink calc(var(--mochi-speed) * 2) infinite; }
@keyframes mochi-hop {
  0% { transform: translateY(0) scale(1.1, 0.9); animation-timing-function: ease-in; }
  12% { transform: translateY(-6px) scale(0.9, 1.12); animation-timing-function: ease-out; }
  45% { transform: translateY(-20px) scale(1, 1); animation-timing-function: ease-in; }
  78% { transform: translateY(-3px) scale(0.94, 1.07); animation-timing-function: linear; }
  86% { transform: translateY(0) scale(1.16, 0.84); animation-timing-function: ease-out; }
  100% { transform: translateY(0) scale(1.1, 0.9); }
}
@keyframes mochi-shadow {
  0%, 100% { transform: scale(1.05); opacity: 0.18; animation-timing-function: ease-out; }
  45% { transform: scale(0.6); opacity: 0.08; animation-timing-function: ease-in; }
  86% { transform: scale(1.15); opacity: 0.22; animation-timing-function: ease-out; }
}
@keyframes mochi-sprout {
  0%, 100% { transform: rotate(6deg); }
  20% { transform: rotate(16deg); }
  55% { transform: rotate(-10deg); }
  92% { transform: rotate(20deg); }
}
@keyframes mochi-blink {
  0%, 90%, 96%, 100% { transform: scaleY(1); }
  93% { transform: scaleY(0.1); }
}
.preloader { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; background: #fff7fb; transition: opacity 0.4s ease, visibility 0.4s; animation: preloader-failsafe 0.4s ease 8s forwards; }
.preloader.is-done { opacity: 0; visibility: hidden; pointer-events: none; }
.preloader .mochi { opacity: 0; animation: preloader-appear 0.3s ease-out 0.4s forwards; }
@keyframes preloader-appear { to { opacity: 1; } }
@keyframes preloader-failsafe { to { opacity: 0; visibility: hidden; } }
@media (prefers-reduced-motion: reduce) {
  .mochi-body { animation: mochi-breathe calc(var(--mochi-speed) * 2) ease-in-out infinite; }
  .mochi-shadow, .mochi-sprout { animation: none; }
}
@keyframes mochi-breathe { 50% { transform: scale(1.03, 0.97); } }
.visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
body { display: block; place-items: normal; min-height: 0; background: #fbfaf7; color: #2f2a1f; }
.page { padding: 14px 18px; }
header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; font-size: 13px; color: #6b6352; }
.logo { font-weight: 800; font-size: 16px; color: #3f6212; }
h1 { margin: 22px 0 14px; font-size: 22px; line-height: 1.2; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.card { padding: 10px; border-radius: 12px; background: #fff; border: 1px solid #ebe5d6; font-size: 13px; font-weight: 600; }
.card i { display: block; height: 64px; margin-bottom: 8px; border-radius: 8px; background: linear-gradient(135deg, #bef264, #65a30d); }
.card:nth-child(2) i { background: linear-gradient(135deg, #fde68a, #b45309); }
.card:nth-child(3) i { background: linear-gradient(135deg, #fef3c7, #a3a35a); }
#replay { margin-top: 16px; font: inherit; font-size: 14px; padding: 8px 14px; border: 0; border-radius: 10px; background: #3f6212; color: #fff; cursor: pointer; }`,
      js: `let template; // a copy of the overlay, for the Replay button

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  template = template || preloader.cloneNode(true);
  preloader.classList.add("is-done");
  const remove = () => preloader.remove();
  preloader.addEventListener("transitionend", remove, { once: true });
  setTimeout(remove, 600);
}

// Simulate a slow page: hide after 2.6 seconds instead of on DOMContentLoaded.
setTimeout(hidePreloader, 2600);

document.addEventListener("click", (event) => {
  if (!event.target.closest("#replay")) return;
  document.body.append(template.cloneNode(true));
  setTimeout(hidePreloader, 2600);
});`,
    },
    { type: "h2", text: "Don't let the preloader hurt LCP" },
    {
      type: "p",
      text: "[Largest Contentful Paint](https://web.dev/articles/lcp) measures when the biggest image or text block in the viewport renders, and web.dev recommends 2.5 seconds or less at the 75th percentile of page loads. A careless preloader can push it back. Four rules prevent that:",
    },
    {
      type: "ul",
      items: [
        "**Cover the page; don't hide it.** It's tempting to set the content to `opacity: 0` until the preloader finishes, but Chrome excludes elements with an opacity of 0 from LCP, so your LCP moves to whenever you reveal them. Covering the page lets the browser lay out, decode and paint the real content underneath, ready to appear the instant the overlay fades.",
        "**Keep it inline and small.** The mochi, the overlay and the script together come to about 4 KB minified, or 1.4 KB gzipped. An animation library plus a data file, or a large GIF, is another download competing with your hero image for bandwidth.",
        "**Don't block rendering.** Showing the overlay needs only inline CSS, and hiding it needs a few lines of script at the end of the body or in a deferred file. Never make the first paint wait for a preloader script.",
        "**Remove it early and cap it.** Hide on readiness rather than `load`, and keep the failsafe, so a slow third-party script can't keep visitors staring at a cartoon.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Metrics can't tell you how long people actually look at the overlay. Load your page with network throttling in Chrome DevTools and time it yourself: if the mochi hops more than a couple of times on a mid-range connection, the page needs to load faster, not a cuter preloader.",
    },
    { type: "h2", text: "Respect reduced motion" },
    {
      type: "p",
      text: "A hopping character is exactly the kind of movement some people ask their operating system to reduce. Swap the hop for a gentle breath, stop the shadow and sprout, and keep the blink and the overlay's fade, which don't move anything across the screen:",
    },
    {
      type: "code",
      lang: "css",
      code: `@media (prefers-reduced-motion: reduce) {
  .mochi-body { animation: mochi-breathe calc(var(--mochi-speed) * 2) ease-in-out infinite; }
  .mochi-shadow, .mochi-sprout { animation: none; }
}

@keyframes mochi-breathe { 50% { transform: scale(1.03, 0.97); } }`,
    },
    {
      type: "p",
      text: "The breath still uses the feet as its pivot, so the mochi looks settled rather than frozen. Loaders from the CuteLoader library handle this automatically by running three times slower for visitors who prefer reduced motion.",
    },
    { type: "h2", text: "Or start from a ready-made character" },
    {
      type: "p",
      text: "If you'd rather not draw your own, the [cute loading animations](/animations/cute/) collection has characters built on the same principles. Each one can be recolored and resized in the browser, then exported as HTML and CSS, a React component or plain JavaScript. The JavaScript export includes `show()` and `hide()` helpers that replace the overlay logic above, and the [loading animation generator](/loading-animation-generator/) lets you design a loader from scratch. For broader guidance on when any loader should appear, read our [website loading animation best practices](/blog/website-loading-animation-best-practices/).",
    },
    {
      type: "loader",
      slug: "happy-mushroom",
      caption: "Happy Mushroom winds up before each jump, and its soft cap trails behind the stem before squishing down on landing.",
    },
  ],
  faqs: [
    {
      q: "Does every website need a preloader?",
      a: "No. If your page can show useful content as it arrives, as most server-rendered sites can, a full-screen preloader only delays it. Preloaders make sense when there's genuinely nothing to show until a script finishes: app shells, games, 3D viewers and heavy configurators. For everything else, put small loaders where data is actually loading.",
    },
    {
      q: "Should the preloader disappear on DOMContentLoaded or on load?",
      a: "Usually DOMContentLoaded, or your app's first render. `DOMContentLoaded` fires once the HTML is parsed and deferred scripts have run, so a server-rendered page is ready to read. The `load` event also waits for every image and iframe, including ones far below the fold, which can keep the overlay up long after the content is ready.",
    },
    {
      q: "Can I use a GIF or a Lottie file instead of SVG?",
      a: "You can, but both are extra downloads that compete with your real content, and the preloader can't appear until they arrive. GIFs are also limited to 256 colors and hard-edged transparency. Inline SVG and CSS paint with the HTML itself, scale cleanly, take your brand colors from custom properties, and can respond to reduced-motion settings.",
    },
    {
      q: "Is a full-screen preloader accessible?",
      a: "It can be. Hide the decorative SVG with `aria-hidden=\"true\"` and include visually hidden text such as “Loading…”. Keep the overlay up only briefly, because keyboard focus can still reach links hidden behind it; for longer waits, add the `inert` attribute to the main content until it's ready. Then remove the overlay from the DOM so it doesn't linger.",
    },
  ],
};

export default article;

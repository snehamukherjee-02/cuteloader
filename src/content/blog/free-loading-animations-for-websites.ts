import type { Article } from "@/types/content";

const article: Article = {
  slug: "free-loading-animations-for-websites",
  title: "25 Best Free CSS Loading Animations for Websites",
  seoTitle: "25 Best Free CSS Loading Animations for Websites",
  description:
    "25 free CSS loading animations hand-picked for buttons, dashboards, preloaders, playful brands, dev tools and calm apps, with honest notes on where each fits.",
  excerpt:
    "An editorial selection of 25 free loading animations from the CuteLoader library, grouped by the job they do best, with honest notes on where each one fits and how to choose.",
  publishedAt: "2026-11-21",
  tags: ["Inspiration", "CSS", "Loaders", "Free Resources"],
  relatedAnimations: ["elegant-spinner", "line-loader", "blooming-flower", "bubble-friends", "ai-neural-pulse"],
  blocks: [
    {
      type: "p",
      text: "These are 25 free CSS loading animations from the CuteLoader library, grouped by the job they do best: buttons and forms, dashboards, full-page preloaders, playful brands, developer and AI tools, and calm or wellness products. Each is a small inline SVG animated entirely with CSS keyframes, with no JavaScript, GIFs or animation libraries required. All of them are free for personal and commercial projects, with no signup, and attribution is appreciated but optional.",
    },
    {
      type: "p",
      text: "This is an editorial selection, not a popularity ranking. We chose each loader for how well it fits a specific job, how clearly it reads at the size that job needs, and how it holds up on both light and dark backgrounds, checking each one frame by frame on white and near-black tiles. The order within each group isn't a ranking either.",
    },
    {
      type: "p",
      text: "Every loader page has a studio where you can change the colors, background, size and speed, plus stroke width, motion intensity and direction where a loader supports them. You can then export it as HTML and CSS, a React and TypeScript component, an SVG file, plain JavaScript, an embed snippet or a GIF. Visitors who prefer reduced motion automatically get a version that runs three times slower.",
    },
    { type: "h2", text: "Buttons and forms" },
    {
      type: "p",
      text: "Small spaces need simple shapes with strong contrast, because a button spinner may only be 16 to 20 pixels wide. These four stay legible at that size.",
    },
    {
      type: "ul",
      items: [
        "[Minimal Ring](/animations/minimal/minimal-ring/): a quarter arc travels around a faint track at an even pace, the most familiar way to say loading. Its stroke control runs from a hairline for large empty states to a heavy weight for tiny button spinners.",
        "[Elegant Spinner](/animations/minimal/elegant-spinner/): one arc stretches to three quarters of a circle and gathers back in as it turns, the indeterminate spinner familiar from polished product interfaces. It shifts between two tones on alternate turns; set both colors to the same value for a single-color version.",
        "[Three Dot Pulse](/animations/minimal/three-dot-pulse/): three dots swell and brighten in a left-to-right beat with almost no height, so it fits inside a submit button, next to an inline save message or in a chat typing indicator.",
        "[Expanding Circle](/animations/minimal/expanding-circle/): soft rings ripple out from a solid dot like a calm radar ping. It suggests listening rather than crunching, which suits a form waiting for a reply, a device pairing or a location lookup.",
      ],
    },
    {
      type: "loader",
      slug: "elegant-spinner",
      caption: "Elegant Spinner: our pick when a primary button needs a spinner that looks deliberate rather than default.",
    },
    { type: "h2", text: "Dashboards and data" },
    {
      type: "p",
      text: "Dashboards often show several loading states at once, so these picks stay restrained and hint at the kind of work happening.",
    },
    {
      type: "ul",
      items: [
        "[Line Loader](/animations/minimal/line-loader/): two rounded segments race along a slim track at different speeds. Pin it to the top of the page during route changes or under a toolbar while a table refreshes, and reverse its direction for right-to-left layouts.",
        "[Smooth Progress Ring](/animations/minimal/smooth-progress-ring/): a ring fills clockwise behind a rounded knob, pauses and unwinds. It feels like progress without promising a percentage, which suits report generation, uploads and checkout processing.",
        "[Wave Bars](/animations/minimal/wave-bars/): five bars roll in a sine wave, equalizer style, for voice features, audio uploads and live metrics. Its intensity control sets how far each bar travels.",
        "[Rotating Squares](/animations/minimal/rotating-squares/): an outlined square and a solid core counter-rotate in crisp quarter steps, like precise gears. It gives analytics panels and settings pages an engineered feel where a soft circle looks out of place.",
        "[Data Transfer](/animations/technology/data-transfer/): packets travel both ways between a laptop and the cloud on two color-coded lanes. It explains itself at a glance in upload, backup, sync and import or export dialogs.",
      ],
    },
    {
      type: "loader",
      slug: "line-loader",
      caption: "Line Loader: an indeterminate bar that works at the top of a page, a card or a table.",
    },
    { type: "h2", text: "Full-page preloaders" },
    {
      type: "p",
      text: "A full-page preloader is seen at a large size and, ideally, only briefly. These four look their best big, and each makes a clear impression in a single cycle.",
    },
    {
      type: "ul",
      items: [
        "[Infinity Loop](/animations/abstract/infinity-loop/): a gradient streak glides around a figure-eight track and flares each time it crosses the center. Its single, steady path is easy to follow at hero size, and it suits messages about continuous work, such as syncing or backups.",
        "[Blooming Flower](/animations/nature/blooming-flower/): a blossom unfurls petal by petal, turns slowly and folds closed again. Every cycle starts and ends as a closed bud, so it makes a graceful splash screen with no visible jump.",
        "[Neon Rings](/animations/abstract/neon-rings/): three dashed neon tubes counter-rotate inside soft halos, drawn without a single filter. It's made for dark gaming, nightlife and music pages, and it still holds up on white.",
        "[Ocean Waves](/animations/nature/ocean-waves/): a seaside scene inside a porthole, with parallax waves, a bobbing sailboat and a warm sun. The round frame keeps it tidy on light or dark pages, which makes it an easy fit for travel and booking sites.",
      ],
    },
    {
      type: "p",
      text: "Before adding any full-page preloader, read our guide to [creating a cute website preloader](/blog/how-to-create-a-cute-website-preloader/): it covers when a preloader is worth it and how to keep one from delaying your content.",
    },
    {
      type: "loader",
      slug: "blooming-flower",
      caption: "Blooming Flower opens and closes on a seamless cycle, which makes it one of the gentlest splash screens in the library.",
    },
    { type: "h2", text: "Playful brands" },
    {
      type: "p",
      text: "Character loaders turn a wait into a small moment of personality. Each of these uses classic animation tricks, such as squash and stretch or parts that move a beat late, to feel alive in a loop of a second or two.",
    },
    {
      type: "ul",
      items: [
        "[Bouncing Bunny](/animations/cute/bouncing-bunny/): a chubby bunny crouches, stretches and squashes on every hop while its ears flop a beat behind. Kids' apps, pet shops and friendly checkout waits are its natural home.",
        "[Bubble Friends](/animations/cute/bubble-friends/): three bubble buddies, each with its own face, hop in a rolling wave. It's a three-dot loader with a sense of humor, and each friend takes its own color.",
        "[Dancing Strawberry](/animations/cute/dancing-strawberry/): a strawberry sways on its tip while its leafy cap wobbles a moment late and music notes pop up. It brings instant charm to food delivery, recipe and grocery apps.",
        "[Waving Ghost](/animations/cute/waving-ghost/): a lavender ghost floats, waves and ripples its scalloped hem. Halloween is the obvious use, but it works year-round on playful 404 pages and in chat widgets waiting for a reply.",
      ],
    },
    {
      type: "loader",
      slug: "bubble-friends",
      caption: "Bubble Friends: a friendlier replacement for a plain three-dot loader in chat and community products.",
    },
    { type: "h2", text: "Developer tools and AI products" },
    {
      type: "p",
      text: "These four borrow their imagery from terminals, code and machine learning without becoming noisy.",
    },
    {
      type: "ul",
      items: [
        "[Terminal Typing](/animations/technology/terminal-typing/): a tiny terminal types `npm run dev` one keystroke at a time and prints two lines of output. It fits CLI landing pages, developer onboarding and deploy previews.",
        "[Code Brackets](/animations/technology/code-brackets/): the `</>` icon springs apart while its slash flips end over end, then lands back in a clean pose. It's a compact mark for code playgrounds, API consoles and documentation search.",
        "[AI Neural Pulse](/animations/technology/ai-neural-pulse/): activation waves sweep left to right through a three-layer network and finish with a sparkle. The steady direction reads as reasoning rather than random activity, which suits assistants waiting on a reply.",
        "[Processing Gears](/animations/technology/processing-gears/): three gears mesh at true tooth ratios, so the teeth genuinely interlock. Use it for settings being applied, background jobs and build pipelines; reversing the direction keeps the mesh correct.",
      ],
    },
    {
      type: "loader",
      slug: "ai-neural-pulse",
      caption: "AI Neural Pulse: activation flows through the network in one direction, a good match for a model that's thinking.",
    },
    { type: "h2", text: "Calm and wellness" },
    {
      type: "p",
      text: "Slow, soft loops make waiting feel like a pause rather than a delay. These are the picks for meditation and sleep apps, health portals and any brand with a quiet palette.",
    },
    {
      type: "ul",
      items: [
        "[Sleeping Cat](/animations/cute/sleeping-cat/): a ginger cat breathes slowly, flicks its tail and lets little z's drift up. It's a natural pick for longer waits, overnight sync screens and bedtime apps.",
        "[Fluid Circles](/animations/abstract/fluid-circles/): four translucent circles bloom apart and fold back on an inhale-and-exhale rhythm, mixing new tints where they overlap, like a breathing exercise.",
        "[Moon Phases](/animations/nature/moon-phases/): the moon waxes and wanes through one smooth cycle, with a shadow that curves the way it does in the real sky. Its four-second cycle is deliberately unhurried, suited to sleep trackers and night themes.",
        "[Raindrops](/animations/nature/raindrops/): drops fall into a still puddle one after another and send out overlapping ripples. Its shapes are simple enough to hold up at very small sizes, and its steady rhythm suits weather apps and sleep sounds.",
      ],
    },
    {
      type: "loader",
      slug: "sleeping-cat",
      caption: "Sleeping Cat never hurries, which is exactly what you want on a screen people may watch for a while.",
    },
    { type: "h2", text: "How to choose the right loading animation" },
    {
      type: "ul",
      items: [
        "**Match the size.** Buttons, table cells and inline text need the simple shapes from the first group. Detailed scenes need room, so preview any loader at the exact size you'll use; the studio's size control runs from 24 to 400 pixels.",
        "**Match the wait.** Quick, simple loops suit waits of a second or two. For longer waits, a slower and calmer loop feels less frantic, and if a wait regularly lasts more than about ten seconds, show real progress instead of an endless loop.",
        "**Match the background.** Loaders with their own frame, such as Ocean Waves or Moon Phases, look the same anywhere. Open shapes take on your page's background, so check contrast in both light and dark themes.",
        "**Match the brand with color, not a different loader.** Every loader has two or three named color roles, so a design that fits the job but not the palette is usually a few clicks from fitting both.",
        "**Pair it with words.** An animation alone tells a screen reader nothing, so keep a short text message alongside it; our [CSS loading spinner tutorial](/blog/how-to-create-css-loading-animation/) shows a reliable pattern.",
      ],
    },
    { type: "h2", text: "What an export looks like" },
    {
      type: "p",
      text: "Here is the actual HTML and CSS export of Three Dot Pulse after recoloring it teal in the studio. The colors and timing are plain custom properties at the top of the CSS (`--c1`, `--c2` and `--d`), so you can still adjust them by hand later.",
    },
    {
      type: "code",
      lang: "html",
      code: `<div class="cl-wrap" role="status" aria-live="polite">
  <svg class="cl-three-dot-pulse" viewBox="0 0 100 100" width="40" height="40" aria-hidden="true" focusable="false">
    <circle class="dot d1" cx="22" cy="50" r="9" />
    <circle class="dot d2" cx="50" cy="50" r="9" />
    <circle class="dot" cx="78" cy="50" r="9" />
  </svg>
  <span class="cl-sr-only">Loading…</span>
</div>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "three-dot-pulse.css",
      code: `.cl-three-dot-pulse {
  --c1: #0f766e;
  --c2: #94a3b8;
  --d: 1.2s;
  display: block;
  overflow: visible;
}

.cl-three-dot-pulse .dot {
  fill: var(--c2);
  transform-box: fill-box;
  transform-origin: center;
  animation: cl-three-dot-pulse-pulse calc(var(--d) * var(--rm,1)) ease-in-out infinite;
}

.cl-three-dot-pulse .d1 {
  animation-delay: calc(calc(var(--d) * var(--rm,1)) * -0.5);
}

.cl-three-dot-pulse .d2 {
  animation-delay: calc(calc(var(--d) * var(--rm,1)) * -0.25);
}

@keyframes cl-three-dot-pulse-pulse {
  0%, 70%, 100% { transform: scale(.55); opacity: .45; fill: var(--c2); }
  35% { transform: scale(1); opacity: 1; fill: var(--c1); }
}

@media (prefers-reduced-motion: reduce) {
  .cl-three-dot-pulse {
    --rm: 3;
  }
}

.cl-wrap {
  display: inline-grid;
  place-items: center;
}

.cl-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}`,
    },
    {
      type: "callout",
      tone: "note",
      text: "The export wraps the loader in a `role=\"status\"` element with screen-reader text. If you insert that markup only when loading starts, some screen readers won't announce text that arrives together with its live region, so for important waits also write a short message into a status element that's already on the page.",
    },
    {
      type: "demo",
      height: 300,
      caption: "The exported Three Dot Pulse as a chat typing indicator. Press Send; the reply is simulated with a timer.",
      html: `<div class="chat">
  <div class="messages" id="messages">
    <p class="bubble them">Hi! Ask me anything about matcha.</p>
  </div>
  <div class="composer">
    <input id="text" value="Which grade should I buy?" aria-label="Message">
    <button type="button" id="send">Send</button>
  </div>
</div>
<template id="typing">
  <div class="cl-wrap" role="status" aria-live="polite">
    <svg class="cl-three-dot-pulse" viewBox="0 0 100 100" width="40" height="40" aria-hidden="true" focusable="false">
      <circle class="dot d1" cx="22" cy="50" r="9" />
      <circle class="dot d2" cx="50" cy="50" r="9" />
      <circle class="dot" cx="78" cy="50" r="9" />
    </svg>
    <span class="cl-sr-only">Loading…</span>
  </div>
</template>`,
      css: `.cl-three-dot-pulse { --c1: #0f766e; --c2: #94a3b8; --d: 1.2s; display: block; overflow: visible; }
.cl-three-dot-pulse .dot { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: cl-three-dot-pulse-pulse calc(var(--d) * var(--rm,1)) ease-in-out infinite; }
.cl-three-dot-pulse .d1 { animation-delay: calc(calc(var(--d) * var(--rm,1)) * -0.5); }
.cl-three-dot-pulse .d2 { animation-delay: calc(calc(var(--d) * var(--rm,1)) * -0.25); }
@keyframes cl-three-dot-pulse-pulse {
  0%, 70%, 100% { transform: scale(.55); opacity: .45; fill: var(--c2); }
  35% { transform: scale(1); opacity: 1; fill: var(--c1); }
}
@media (prefers-reduced-motion: reduce) { .cl-three-dot-pulse { --rm: 3; } }
.cl-wrap { display: inline-grid; place-items: center; }
.cl-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.chat { width: 100%; max-width: 460px; box-sizing: border-box; padding: 14px; }
.messages { height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 14px; background: #f8fafc; }
.bubble { margin: 0; max-width: 80%; padding: 8px 12px; border-radius: 14px; font-size: 14px; line-height: 1.4; }
.them { align-self: flex-start; background: #fff; border: 1px solid #e2e8f0; color: #1e293b; }
.me { align-self: flex-end; background: #0f766e; color: #fff; }
.them .cl-wrap { display: grid; height: 20px; }
.composer { display: flex; gap: 8px; margin-top: 10px; }
.composer input { flex: 1; min-width: 0; font: inherit; font-size: 14px; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 10px; }
.composer button { font: inherit; font-size: 14px; padding: 8px 16px; border: 0; border-radius: 10px; background: #0f766e; color: #fff; cursor: pointer; }`,
      js: `document.addEventListener("click", (event) => {
  if (!event.target.closest("#send")) return;
  const messages = document.getElementById("messages");
  const input = document.getElementById("text");
  const mine = document.createElement("p");
  mine.className = "bubble me";
  mine.textContent = input.value.trim() || "Hello!";
  const reply = document.createElement("div");
  reply.className = "bubble them";
  reply.append(document.getElementById("typing").content.cloneNode(true));
  messages.append(mine, reply);
  messages.scrollTop = messages.scrollHeight;
  setTimeout(() => {
    reply.textContent = "Ceremonial grade for drinking straight, culinary grade for lattes.";
    messages.scrollTop = messages.scrollHeight;
  }, 1800);
});`,
    },
    {
      type: "p",
      text: "Want more? Browse the full [loading animation library](/animations/) or design your own in the [loading animation generator](/loading-animation-generator/).",
    },
  ],
  faqs: [
    {
      q: "Are these loading animations really free for commercial use?",
      a: "Yes. CuteLoader loaders are free to use, modify and ship in personal and commercial projects, including client work. There's no signup, and attribution is appreciated but optional; the exports include an optional credit you can switch off.",
    },
    {
      q: "Are they pure CSS?",
      a: "They're drawn with inline SVG and animated entirely with CSS keyframes, so they need no JavaScript, GIFs or animation libraries. The HTML and CSS export is the SVG markup plus a stylesheet. SVG handles the shapes a box-based CSS spinner can't draw, such as characters and curved paths, while CSS handles the motion, colors and reduced-motion behavior.",
    },
    {
      q: "Will a loading animation slow down my site?",
      a: "Not noticeably at this size. A simple loader such as Minimal Ring is under 1 KB of markup and CSS, and even a detailed character such as Sleeping Cat is about 4 KB before compression. What matters more is when you show it: wait a few hundred milliseconds before displaying a loader, so fast responses never flash one at all.",
    },
    {
      q: "How did you choose these 25?",
      a: "Editorially, not from download counts or popularity data. We grouped the library by common jobs and picked the loaders that read most clearly at the size each job needs, look right on light and dark backgrounds, and suit the tone of that kind of product.",
    },
  ],
};

export default article;

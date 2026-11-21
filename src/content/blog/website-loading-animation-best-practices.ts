import type { Article } from "@/types/content";

const demoHtml = `<div class="demo">
  <div class="actions">
    <button type="button" data-ms="150">Fast (0.15 s)</button>
    <button type="button" data-ms="2000">Normal (2 s)</button>
    <button type="button" data-ms="9000">Long (9 s)</button>
  </div>
  <div class="card" id="card">
    <div class="loader" id="loader" hidden>
      <svg class="ring" viewBox="0 0 50 50" width="40" height="40" aria-hidden="true" focusable="false">
        <circle class="ring-track" cx="25" cy="25" r="20" />
        <circle class="ring-arc" cx="25" cy="25" r="20" />
      </svg>
      <p class="still">Still working. This is taking longer than usual.
        <button type="button" id="cancel">Cancel</button></p>
    </div>
    <p id="result">Choose a wait above.</p>
  </div>
  <p id="status" class="sr-only" role="status"></p>
</div>`;

const demoCss = `body { margin: 0; font: 15px/1.5 system-ui, sans-serif; color: #1f1b2e; background: #ffffff; }
.demo { padding: 16px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #c9c2e0; border-radius: 8px; background: #f6f3ff; color: #2e1065; cursor: pointer; }
button:hover { background: #ede7ff; }
.card { position: relative; margin-top: 12px; min-height: 120px; padding: 16px; border: 1px solid #e4def0; border-radius: 12px; }
.card p { margin: 0; }
.loader { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; gap: 8px; padding: 12px; text-align: center; background: rgb(255 255 255 / 0.9); border-radius: 12px; }
.loader[hidden] { display: none; }
.loader.is-static .ring { display: none; }
.loader:not(.is-static) .still { display: none; }
.still button { margin-left: 6px; }
.ring-track, .ring-arc { fill: none; stroke-width: 5; }
.ring-track { stroke: #e9e3fb; }
.ring-arc { stroke: #6d28d9; stroke-linecap: round; stroke-dasharray: 80 126; transform-origin: 25px 25px; animation: spin 0.9s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ring-arc { animation-duration: 2.7s; } }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }`;

const demoJs = `function init() {
  const DELAY = 300;        // show nothing for quick responses
  const MIN_VISIBLE = 500;  // once shown, stay long enough to read as intentional
  const STOP_MOTION = 5000; // stop moving after five seconds (WCAG 2.2.2)

  const card = document.getElementById("card");
  const loader = document.getElementById("loader");
  const result = document.getElementById("result");
  const status = document.getElementById("status");
  let timers = [];
  let shownAt = 0;

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function reset() {
    clearTimers();
    loader.hidden = true;
    loader.classList.remove("is-static");
    card.removeAttribute("aria-busy");
    shownAt = 0;
  }

  function start(ms) {
    reset();
    const startedAt = performance.now();
    card.setAttribute("aria-busy", "true");
    timers.push(setTimeout(() => {
      loader.hidden = false;
      shownAt = performance.now();
      status.textContent = "Loading report…";
    }, DELAY));
    timers.push(setTimeout(() => {
      loader.classList.add("is-static"); // the spinner is removed, so nothing moves
      status.textContent = "Still working. This is taking longer than usual.";
    }, STOP_MOTION));
    timers.push(setTimeout(() => finish(startedAt), ms)); // stands in for the real request
  }

  function finish(startedAt) {
    clearTimers();
    const wait = shownAt ? Math.max(0, MIN_VISIBLE - (performance.now() - shownAt)) : 0;
    timers.push(setTimeout(() => {
      reset();
      const seconds = ((performance.now() - startedAt) / 1000).toFixed(1);
      result.textContent = "Report ready after " + seconds + " s.";
      status.textContent = "Report ready.";
    }, wait));
  }

  document.querySelector(".actions").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) start(Number(button.dataset.ms));
  });

  document.getElementById("cancel").addEventListener("click", () => {
    reset();
    result.textContent = "Cancelled.";
    status.textContent = "Cancelled.";
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();`;

const article: Article = {
  slug: "website-loading-animation-best-practices",
  title: "Website Loading Animation Best Practices",
  seoTitle: "Website Loading Animation Best Practices (Checklist)",
  description:
    "When to show a loading animation and when not to, how big to make it, motion and accessibility rules, performance pitfalls, and a checklist to review against.",
  excerpt:
    "Most loading animation problems aren't about the animation: they come from showing it at the wrong time, in the wrong place, or for too long. Here are the rules, with a checklist.",
  publishedAt: "2026-11-21",
  tags: ["Best practices", "UX", "Accessibility", "Performance"],
  relatedAnimations: ["minimal-ring", "smooth-progress-ring", "line-loader", "three-dot-pulse", "bouncing-bunny"],
  blocks: [
    {
      type: "p",
      text: "A good website loading animation appears only when a wait is long enough to notice, sits where the content will arrive, says what it means to screen readers, calms down for people who prefer reduced motion, and never holds back content that is already available. The rest is detail: picking determinate or indeterminate, getting the size right, keeping it cheap to render and matching it to your brand.",
    },
    {
      type: "p",
      text: "Each rule is explained below, with a checklist at the end.",
    },
    { type: "h2", text: "When to show a loader, and when not to" },
    {
      type: "p",
      text: "The most useful thresholds are old ones. In his 1993 book Usability Engineering, Jakob Nielsen summarized research going back to the 1960s into three limits: about **0.1 second** feels instantaneous, about **1 second** keeps the user's flow of thought uninterrupted even though the delay is noticed, and about **10 seconds** is the limit for keeping attention on the task. Nielsen's advice was that delays between 0.1 and 1 second normally need no special feedback, and that waits beyond 10 seconds need a percent-done indicator. Mapped onto web interfaces:",
    },
    {
      type: "table",
      head: ["Expected wait", "What to show"],
      rows: [
        ["Under 0.1 s", "Nothing extra. Show the result, or a pressed state on the control that was used."],
        ["0.1 s to 1 s", "Immediate feedback on the control (pressed, busy or disabled styling), but no spinner yet. If you can't predict the duration, start one after a short delay so it only appears when the wait turns out to be long."],
        ["1 s to 10 s", "An indeterminate loader where the content will appear, or a skeleton when the layout is predictable."],
        ["Over 10 s", "A determinate progress indicator and a way to cancel, or move the work to the background and notify the user when it's done."],
      ],
    },
    {
      type: "p",
      text: "The delay is the rule people skip. A spinner that appears for 80 ms before the result reads as a flicker, not as feedback. Waiting 300 ms before showing anything, and keeping the loader up for at least half a second once it appears, removes nearly all flicker while still giving feedback well within Nielsen's one-second limit. These are our defaults, not a standard.",
    },
    {
      type: "p",
      text: "Some waits shouldn't get a loader at all. Autosave, background sync and analytics should never cover the page: a small \"Saved\" label is enough. Actions you can apply optimistically, such as a like, a toggle or reordering a list, should simply update and roll back if the server disagrees. And content that is already on screen should stay there during a refresh, with a subtle indicator rather than a blank panel.",
    },
    { type: "h2", text: "Determinate or indeterminate?" },
    {
      type: "p",
      text: "Use a **determinate** indicator (a bar or ring that fills) whenever you can measure progress: file uploads, imports with a known row count, multi-step setup. It answers the question users actually have, which is how long this will take. Use an **indeterminate** loader when you can't measure: a single API call, a search, a payment authorization.",
    },
    {
      type: "code",
      lang: "html",
      code: `<!-- Determinate: you know how far along it is -->
<label for="import-progress">Importing contacts</label>
<progress id="import-progress" max="100" value="40">40%</progress>

<!-- Indeterminate: no value attribute -->
<label for="sync-progress">Syncing</label>
<progress id="sync-progress"></progress>`,
    },
    {
      type: "p",
      text: "The native [`<progress>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress) is exposed to assistive technology as a progress bar without any ARIA, and dropping the `value` attribute switches it to indeterminate. Don't fake precision: a bar driven by a timer that creeps to 90% and then stalls is worse than an honest spinner, because the stall lands at the end of the wait, where it's felt most. [How to improve perceived loading speed](/blog/improve-perceived-loading-speed-with-animations/) covers what research says about progress behavior.",
    },
    { type: "h2", text: "Size and placement" },
    {
      type: "p",
      text: "Put the loader where the result will appear, and scope it to what is actually loading. A spinner inside the button that was clicked tells the user exactly which action is in progress; a full-screen overlay for the same save blocks the whole page and says less. Rules of thumb:",
    },
    {
      type: "table",
      head: ["Where", "What's loading", "Loader"],
      rows: [
        ["Inside a button", "That button's action", "About 1em, beside or in place of the label; keep the button's width"],
        ["Inline with text", "A single value or status", "16–24 px, or three small dots"],
        ["A card or panel", "That panel's data", "32–48 px centered in the panel, or a skeleton"],
        ["The whole page", "Nothing can be shown yet", "48–96 px centered, or a thin bar along the top"],
      ],
    },
    {
      type: "p",
      text: "Reserve the space the content will need. A loader that's 40 px tall replaced by a 600 px table pushes everything below it down, which users experience as a jump and which can count toward Cumulative Layout Shift. A `min-height` on the container, or a skeleton shaped like the result, keeps the page still.",
    },
    { type: "h2", text: "Motion and accessibility" },
    { type: "h3", text: "Reduce motion by calming it, not removing it" },
    {
      type: "p",
      text: "The [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) media query tells you the user has asked their operating system for less motion. For decorative animation, the right response is usually to turn it off. A loader is different, because it carries information: a spinner frozen mid-turn looks exactly like a page that has crashed. Slow it down, shorten its travel, or swap rotation for a gentle opacity pulse.",
    },
    {
      type: "code",
      lang: "css",
      code: `.spinner-arc { animation: spin 0.9s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .spinner-arc { animation-duration: 2.7s; } /* same feedback, a third of the speed */
}`,
    },
    {
      type: "p",
      text: "Every CuteLoader export does this automatically: when the media query matches, the whole loader runs three times slower, because every timing in it derives from one duration variable.",
    },
    { type: "h3", text: "Give it a voice" },
    {
      type: "p",
      text: "A loading animation is invisible to screen reader users unless you add words. Use a [`role=\"status\"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) element, which implies `aria-live=\"polite\"` and `aria-atomic=\"true\"`. Keep it in the page from the start and change its text: a live region inserted with its message already inside isn't announced reliably. Mark the region being replaced with `aria-busy=\"true\"`, and keep the status element outside it, since assistive technology may hold back changes inside a busy region.",
    },
    {
      type: "code",
      lang: "html",
      code: `<section id="results" aria-busy="true">…</section>
<p id="results-status" class="visually-hidden" role="status">Loading results…</p>`,
    },
    { type: "h3", text: "Loaders that run longer than five seconds" },
    {
      type: "p",
      text: "[WCAG success criterion 2.2.2, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) (Level A) covers moving content that starts automatically, lasts more than five seconds and is shown in parallel with other content: users need a way to pause, stop or hide it, unless the movement is essential. A note in the criterion addresses loaders directly. An animation during a preload phase can count as essential if no interaction can happen during that phase for any user, and if not showing progress could make people think the content is frozen or broken. So a full-page loader that is the only thing on screen is fine; a spinner that keeps turning beside content people are trying to read is the case to handle. The Understanding document also explains that \"starts automatically\" means not the direct result of a user's action, which makes loaders that start on page load the clearest example.",
    },
    {
      type: "p",
      text: "The practical fix is a time limit. After five seconds, replace the moving loader with a static message, such as \"Still working, this is taking longer than usual\", plus a cancel or retry button. That satisfies the criterion and is better feedback anyway, since a long wait deserves an explanation. The demo below does exactly this.",
    },
    {
      type: "demo",
      html: demoHtml,
      css: demoCss,
      js: demoJs,
      height: 280,
      caption: "A delayed loader with a minimum display time that becomes a static message with Cancel after five seconds. The work is simulated with timers.",
    },
    { type: "h3", text: "No flashing, enough contrast" },
    {
      type: "p",
      text: "Keep blinking and pulsing well under three flashes per second, the threshold in WCAG 2.3.1. And give the moving part a contrast of at least 3:1 against its background, the level WCAG 1.4.11 sets for graphics people need in order to understand the interface. Pale pastel arcs on white are the usual failure.",
    },
    { type: "h2", text: "Performance: the loader must not slow the page" },
    {
      type: "ul",
      items: [
        "**Animate `transform` and `opacity`.** Browsers can animate them without recalculating layout, often on the compositor thread, so the loader keeps moving smoothly even while the main thread is busy. Animating `width`, `top` or `margin` forces layout on every frame.",
        "**Hide loaders with `display: none`.** The `hidden` attribute removes the element from rendering and cancels its CSS animations. An element at `opacity: 0` or `visibility: hidden` keeps animating, invisibly, for as long as it exists.",
        "**Ship it inline.** A small inline SVG with CSS needs no extra request and no JavaScript, so it can appear before your scripts download.",
        "**Never hold back content that's ready.** A preloader that covers the page until `window.onload` delays everything behind it, including the element measured by [Largest Contentful Paint](https://web.dev/articles/lcp). Content faded in from `opacity: 0` doesn't count for LCP until it becomes visible, so a page that waits and then fades in pays that wait in its LCP score.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "Don't try to move the metric instead of the experience. An inline `<svg>` loader is never an LCP candidate itself, but a large block of splash-screen text can be, and web.dev notes that an LCP element removed from the DOM stays the LCP element unless something larger renders. A splash screen can make your LCP look fast while users are still waiting for the real content.",
    },
    { type: "h2", text: "Brand personality vs professionalism" },
    {
      type: "p",
      text: "A loader is a small, repeated piece of your brand, and its tone should match the moment, not just the logo. Playful characters from the [cute loading animations](/animations/cute/) collection suit consumer apps, creative tools and kids' products, especially for short waits. Calm, geometric designs from the [minimal loaders](/animations/minimal/) collection suit dashboards, finance, healthcare and anything involving money or personal data.",
    },
    {
      type: "p",
      text: "Duration changes the calculation. A bouncing bunny is charming for two seconds and grating at thirty, so long or repeated waits favor quieter designs. Context matters too: a joke during payment processing or after an error reads as careless. If your brand is playful but the product handles serious tasks, use personality on the marketing pages and the first-run experience, and a restrained loader in the core workflow. [How to customize website loading animations](/blog/how-to-customize-website-loading-animations/) covers adapting colors, speed and intensity so either style fits.",
    },
    {
      type: "loader",
      slug: "bouncing-bunny",
      caption: "Bouncing Bunny: personality for short waits in friendly, consumer-facing products.",
    },
    {
      type: "loader",
      slug: "smooth-progress-ring",
      caption: "Smooth Progress Ring: a restrained choice for dashboards and serious workflows.",
    },
    { type: "h2", text: "Checklist" },
    {
      type: "ul",
      items: [
        "Waits under about 300 ms show no loader, only immediate feedback on the control.",
        "Once visible, the loader stays up long enough not to flicker (around 500 ms).",
        "The loader appears where the content will arrive, scoped to what's loading.",
        "Space is reserved, so nothing jumps when content replaces the loader.",
        "Measurable work uses a determinate indicator; waits over about 10 seconds show progress and offer cancel.",
        "No fake progress that stalls near the end.",
        "A persistent `role=\"status\"` element announces loading, completion and failure in words.",
        "The region being replaced has `aria-busy=\"true\"`, with the status element outside it.",
        "`prefers-reduced-motion` slows or softens the loader instead of freezing it.",
        "Motion running beside other content stops, or can be stopped, after five seconds.",
        "Nothing flashes more than three times per second; the loader has at least 3:1 contrast.",
        "Animations use `transform` and `opacity`; hidden loaders use `display: none`.",
        "No preloader holds back content that's ready, and no trick is used to game LCP.",
        "Failures replace the loader with a message and a retry, never a spinner that runs forever.",
        "The loader's tone fits the moment: playful for short, friendly waits; calm for serious ones.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long should I wait before showing a loading animation?",
      a: "A few hundred milliseconds is a good starting point. We use 300 ms: responses faster than that never show a loader, and slower ones still get feedback well within the one-second limit Nielsen describes for keeping a user's flow of thought. Pair the delay with a minimum display time of around 500 ms, so a loader that does appear doesn't vanish a frame later.",
    },
    {
      q: "Do loading spinners have to meet WCAG 2.2.2 Pause, Stop, Hide?",
      a: "Only some do. The criterion applies to moving content that starts automatically, lasts more than five seconds and is shown in parallel with other content. A preload animation can count as essential when nothing can be done during that phase and hiding progress could make the page look broken. A spinner that keeps running beside readable content for more than five seconds needs a way to stop, which is easiest to provide by swapping it for a static message after five seconds.",
    },
    {
      q: "Should I turn loading animations off for users who prefer reduced motion?",
      a: "Usually not completely. A loader communicates status, and a frozen spinner looks like a crashed page. Slow it down, reduce how far things move, or switch to a soft opacity pulse. Skeleton screens are the exception: their static shapes still read as loading, so you can simply stop the shimmer.",
    },
    {
      q: "Are full-page preloaders bad for performance?",
      a: "They are when they hide content that's ready. Anything covered or faded out until the page finishes loading can't count as painted, so Largest Contentful Paint moves later by the time you held it back. If you need one, remove it as soon as the first meaningful content can render, not on `window.onload`, and prefer loaders scoped to the parts that are actually waiting.",
    },
  ],
};

export default article;

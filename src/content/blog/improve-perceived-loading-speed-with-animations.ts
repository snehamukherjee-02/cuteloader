import type { Article } from "@/types/content";

const demoHtml = `<div class="demo">
  <button type="button" id="replay">Replay the 2-second load</button>
  <div class="grid">
    <figure class="panel" data-mode="blank">
      <figcaption>Blank, then everything</figcaption>
      <div class="body"></div>
    </figure>
    <figure class="panel" data-mode="spinner">
      <figcaption>Spinner, then everything</figcaption>
      <div class="body"></div>
    </figure>
    <figure class="panel" data-mode="progressive">
      <figcaption>Skeleton, then each row as it arrives</figcaption>
      <div class="body"></div>
    </figure>
  </div>
</div>`;

const demoCss = `body { margin: 0; font: 14px/1.45 system-ui, sans-serif; color: #1f1b2e; background: #ffffff; }
.demo { padding: 16px; }
#replay { font: inherit; padding: 6px 12px; border: 1px solid #c9c2e0; border-radius: 8px; background: #f6f3ff; color: #2e1065; cursor: pointer; }
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
.panel { margin: 0; padding: 12px; border: 1px solid #e4def0; border-radius: 12px; }
figcaption { margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #5b5670; }
.body { position: relative; min-height: 150px; }
.row { display: flex; align-items: center; gap: 10px; height: 44px; }
.row.in { animation: fade-in 150ms ease-out; }
@keyframes fade-in { from { opacity: 0; } }
.avatar { flex: none; width: 30px; height: 30px; border-radius: 50%; background: #c4b5fd; }
.lines { flex: 1; display: grid; gap: 4px; }
.line { height: 9px; border-radius: 4px; background: #ece9f3; }
.text { min-width: 0; }
.text b, .text span { display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.text b { font-size: 13px; }
.text span { font-size: 12px; color: #5b5670; }
@media (max-width: 560px) {
  .grid { gap: 6px; }
  .panel { padding: 8px; }
  figcaption { font-size: 11px; }
  .avatar { display: none; }
}
.skeleton .avatar { background: #ece9f3; }
.spinner { position: absolute; inset: 0; display: grid; place-items: center; }
.spinner svg circle { fill: none; stroke-width: 5; }
.spinner .track { stroke: #e9e3fb; }
.spinner .arc { stroke: #6d28d9; stroke-linecap: round; stroke-dasharray: 80 126; transform-origin: 25px 25px; animation: spin 0.9s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .spinner .arc { animation-duration: 2.7s; } .row.in { animation: none; } }`;

const demoJs = `function init() {
  const ROWS = [
    { title: "Invoice #1042", meta: "Paid · 2 min ago", at: 600 },
    { title: "Invoice #1041", meta: "Sent · 1 h ago", at: 1200 },
    { title: "Invoice #1040", meta: "Overdue · 3 days", at: 2000 },
  ];
  const SPINNER =
    '<div class="spinner"><svg viewBox="0 0 50 50" width="36" height="36" aria-hidden="true">' +
    '<circle class="track" cx="25" cy="25" r="20"/><circle class="arc" cx="25" cy="25" r="20"/></svg></div>';
  let timers = [];

  function rowHtml(row) {
    return '<div class="avatar"></div><div class="text"><b>' + row.title + "</b><span>" + row.meta + "</span></div>";
  }
  function skeletonHtml() {
    return '<div class="avatar"></div><div class="lines"><div class="line" style="width:70%"></div><div class="line" style="width:45%"></div></div>';
  }
  function renderAll(body) {
    body.innerHTML = ROWS.map((r) => '<div class="row in">' + rowHtml(r) + "</div>").join("");
  }
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));

  function play() {
    timers.forEach(clearTimeout);
    timers = [];
    const last = ROWS[ROWS.length - 1].at; // everything is ready at 2 s in all three panels
    document.querySelectorAll(".panel").forEach((panel) => {
      const body = panel.querySelector(".body");
      body.innerHTML = "";
      const mode = panel.dataset.mode;
      if (mode === "blank") later(last, () => renderAll(body));
      if (mode === "spinner") {
        later(300, () => { body.innerHTML = SPINNER; }); // delayed, as it should be
        later(last, () => renderAll(body));
      }
      if (mode === "progressive") {
        body.innerHTML = ROWS.map(() => '<div class="row skeleton">' + skeletonHtml() + "</div>").join("");
        ROWS.forEach((row, i) => later(row.at, () => {
          const el = body.children[i];
          el.className = "row in";
          el.innerHTML = rowHtml(row);
        }));
      }
    });
  }

  document.getElementById("replay").addEventListener("click", play);
  play();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();`;

const article: Article = {
  slug: "improve-perceived-loading-speed-with-animations",
  title: "How to Improve Perceived Loading Speed with Animations",
  seoTitle: "Improve Perceived Performance with Loading Animations",
  description:
    "Make loading feel faster without faking it: response-time limits, instant feedback, skeletons, optimistic UI, progressive rendering, easing and honest metrics.",
  excerpt:
    "You can't always make a request faster, but you can make the wait feel shorter. Here's what actually changes perceived performance, and how to measure it without fooling yourself.",
  publishedAt: "2026-11-21",
  tags: ["Performance", "UX", "Skeleton screens", "Core Web Vitals"],
  relatedAnimations: ["line-loader", "smooth-progress-ring", "three-dot-pulse", "wave-bars"],
  blocks: [
    {
      type: "p",
      text: "Perceived performance is how fast a page feels, and animation gives you a surprising amount of control over it. Acknowledge every click in the very next frame. Show the shape of the content before the content itself, and render each part the moment it arrives instead of waiting for the slowest. Skip waits you can predict with optimistic updates. Time your loaders so they never flicker, and choose motion that starts quickly. Then check the result with real metrics such as LCP and INP, not with the animation.",
    },
    {
      type: "p",
      text: "None of this replaces making things genuinely faster. It makes the time that's left feel shorter and more predictable.",
    },
    { type: "h2", text: "Three numbers to design around" },
    {
      type: "p",
      text: "Jakob Nielsen's response-time limits, first published in 1993 and drawn from earlier research, still describe how waits feel. Around **0.1 second**, a response feels instantaneous. Around **1 second**, users notice the delay but their train of thought survives. Around **10 seconds**, their attention drifts to something else. Perceived-speed work is mostly about keeping each interaction on the right side of one of those lines, or, when you can't, making it obvious that progress is happening.",
    },
    {
      type: "p",
      text: "The modern metric that maps onto the first limit is [Interaction to Next Paint](https://web.dev/articles/inp). It measures the time from a click, tap or key press until the browser paints the next frame, and web.dev rates 200 ms or less as good. Its definition is the key insight for loading animations: what counts is how quickly the interface visibly reacts, not when the work finishes.",
    },
    { type: "h2", text: "Acknowledge the input in the next frame" },
    {
      type: "p",
      text: "A loader only helps if it gets painted. If a click handler sets a button to \"Exporting…\" and then runs half a second of synchronous work, the browser can't paint until the handler returns, so the user sees nothing at all, and then the finished result. Show the feedback first, then yield so the browser can paint it before the heavy part starts:",
    },
    {
      type: "code",
      lang: "js",
      code: `function nextFrame() {
  // Resolves after the browser has had a chance to paint.
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

exportButton.addEventListener("click", async () => {
  exportButton.setAttribute("aria-busy", "true");
  exportLabel.textContent = "Exporting…";
  await nextFrame();              // the busy state reaches the screen first

  const csv = buildCsv(rows);     // slow, synchronous work
  downloadFile(csv, "orders.csv");

  exportButton.removeAttribute("aria-busy");
  exportLabel.textContent = "Export CSV";
});`,
    },
    {
      type: "p",
      text: "The `requestAnimationFrame` plus `setTimeout` combination is the yielding technique web.dev's [guide to optimizing INP](https://web.dev/articles/optimize-inp) recommends for exactly this case: the callback runs after the next frame, in a new task. In our test, a click whose handler ran 300 ms of work before yielding registered an event duration of over 300 ms; with `await nextFrame()` moved in front of the work, the same click registered well under 100 ms. The user sees the busy state immediately. The long task still blocks the main thread afterwards, so break genuinely heavy work into chunks or move it to a worker as well.",
    },
    { type: "h2", text: "Skeleton screens: show the shape first" },
    {
      type: "p",
      text: "A skeleton screen renders grey placeholders in the shape of the content that's coming: the avatar circle, two lines of text, the card outline. It works because it answers two questions at once. Something is happening, and here is roughly what it will look like. When the data lands, nothing moves; the placeholders are simply filled in.",
    },
    {
      type: "ul",
      items: [
        "**Use it where the layout is predictable:** lists, feeds, cards, profile headers. Search results and generated content vary too much, so a skeleton that doesn't match causes a jump.",
        "**Match the real dimensions.** A skeleton row that's 40 px tall replaced by a 64 px row shifts everything below it, which is exactly what it was meant to prevent.",
        "**Keep the shimmer subtle**, or drop it. Animate it with `transform` rather than `background-position`, and stop it entirely for `prefers-reduced-motion` users; static grey shapes still read as loading.",
        "**Don't skeleton everything.** One skeleton for the area that's actually loading beats a whole page of grey boxes around content that's already there.",
      ],
    },
    {
      type: "p",
      text: "The [React loading animation patterns](/blog/how-to-add-loading-animations-in-react/) include a complete skeleton component with a transform-based shimmer.",
    },
    { type: "h2", text: "Progressive rendering: show what you have" },
    {
      type: "p",
      text: "A dashboard that loads three independent panels with `await Promise.all(...)` is exactly as slow as its slowest request, and it shows nothing until then. Render each panel as its data arrives instead, so the first useful content appears at the speed of the fastest request:",
    },
    {
      type: "code",
      lang: "js",
      code: `const panels = { profile: "/api/profile", orders: "/api/orders", tips: "/api/tips" };

for (const [name, url] of Object.entries(panels)) {
  const panel = document.querySelector(\`[data-panel="\${name}"]\`);
  panel.setAttribute("aria-busy", "true");
  getJSON(url)
    .then((data) => renderPanel(panel, name, data))
    .catch(() => renderPanelError(panel, name))
    .finally(() => panel.removeAttribute("aria-busy"));
}`,
    },
    {
      type: "p",
      text: "Each panel owns its loading state, its error and its retry, so one slow or broken endpoint no longer holds the whole page hostage. The same idea applies at every scale: give images `width` and `height` attributes so their space is reserved before they load, and let the server stream HTML so the browser can render the top of the page while the rest is still being generated.",
    },
    {
      type: "p",
      text: "The demo makes the difference tangible. All three panels finish at exactly two seconds. Only the way they spend those two seconds differs:",
    },
    {
      type: "demo",
      html: demoHtml,
      css: demoCss,
      js: demoJs,
      height: 310,
      caption: "Identical two-second loads: blank, spinner, and skeleton with progressive rows. The data is simulated with timers.",
    },
    { type: "h2", text: "Optimistic UI: skip the waits you can predict" },
    {
      type: "p",
      text: "Some requests almost always succeed: starring an item, toggling a setting, reordering a list. For those, the fastest loader is none. Update the interface immediately, send the request in the background, and roll back with a message on the rare failure:",
    },
    {
      type: "code",
      lang: "js",
      code: `async function toggleStar(button, itemId) {
  const wasStarred = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!wasStarred)); // update now

  try {
    const response = await fetch(\`/api/items/\${itemId}/star\`, {
      method: wasStarred ? "DELETE" : "PUT",
    });
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  } catch {
    button.setAttribute("aria-pressed", String(wasStarred)); // put it back
    showToast("Couldn't update the star. Please try again.");
  }
}`,
    },
    {
      type: "p",
      text: "Keep optimism for actions that are cheap to undo and rarely fail. Payments, deletions and anything with consequences outside the page should wait for the server and show a loader. In React 19, [`useOptimistic`](https://react.dev/reference/react/useOptimistic) packages this pattern: it shows the optimistic value while an action is pending and falls back to the real state when it settles.",
    },
    { type: "h2", text: "Timing: delays and minimum display times" },
    {
      type: "p",
      text: "A loader that flashes for a few frames makes a fast response feel slower and glitchy. Two numbers prevent it: a **delay** before the loader appears, and a **minimum display time** once it has. With a 300 ms delay and a 500 ms minimum:",
    },
    {
      type: "table",
      head: ["Response time", "Without the rules", "With them"],
      rows: [
        ["150 ms", "Spinner flashes for 150 ms", "No spinner; the result simply appears"],
        ["320 ms", "Spinner flashes for 320 ms", "Spinner at 300 ms, held until 800 ms"],
        ["2 s", "Spinner for 2 s", "Spinner from 300 ms to 2 s"],
      ],
    },
    {
      type: "p",
      text: "The middle row is the trade-off: content is held back by up to half a second to avoid a 20 ms flicker. If that bothers you, keep the delay and drop the minimum. The [AJAX loader guide](/blog/add-loader-to-ajax-request/) has a reference-counted helper with the delay built in.",
    },
    { type: "h2", text: "Easing and motion that feel faster" },
    {
      type: "ul",
      items: [
        "**Responses should start fast.** Use ease-out (quick start, gentle stop) for anything that appears in reaction to input: menus, toasts, content fading in. Ease-in starts slowly, and that first slow moment reads as lag.",
        "**Rotation should be linear.** An eased spinner speeds up and slows down every turn, which reads as stuttering.",
        "**Content should arrive quickly.** A 150 ms fade softens the swap from loader to content; a 600 ms fade leaves the content half-visible for most of a second after it has arrived.",
        "**Progress should never stall at the end.** In a small 2007 study of progress bars (Harrison, Amento, Kuznetsov and Bell, 22 participants, every bar lasting 5.5 seconds), bars that accelerated toward the end were perceived as faster than linear ones, and bars that paused near the end were perceived as slower.",
      ],
    },
    {
      type: "p",
      text: "That last finding suggests honest tactics rather than fake bars: run the slow or unpredictable stages of a multi-step job first, so any stalls happen early, and when you animate between real progress values, use a short ease-out transition so the bar responds promptly. Don't invent progress you can't measure; use an indeterminate loader such as the line loader below instead.",
    },
    {
      type: "loader",
      slug: "line-loader",
      caption: "Line Loader: an indeterminate bar that never pretends to know the percentage.",
    },
    { type: "h2", text: "Measure real metrics, without gaming them" },
    {
      type: "p",
      text: "Perceived speed is subjective, but the metrics that track it aren't. Collect them from real users with Google's `web-vitals` library, which reports each metric along with web.dev's rating:",
    },
    {
      type: "code",
      lang: "js",
      code: `import { onCLS, onINP, onLCP } from "web-vitals";

function report(metric) {
  navigator.sendBeacon(
    "/analytics/vitals",
    JSON.stringify({ name: metric.name, value: metric.value, rating: metric.rating, id: metric.id }),
  );
}

onLCP(report);
onINP(report);
onCLS(report);`,
    },
    {
      type: "ul",
      items: [
        "**[LCP](https://web.dev/articles/lcp)** (good at 2.5 s or less) moves later when a preloader hides content or content fades in from `opacity: 0`, because invisible elements don't count until they're shown.",
        "**INP** (good at 200 ms or less) improves when feedback reaches the screen in the next frame, as in the export example above.",
        "**CLS** (good at 0.1 or less) gets worse when a loader is replaced by content of a different size. Reserve the space.",
      ],
    },
    {
      type: "p",
      text: "There are ways to move these numbers without helping anyone, and they backfire because the experience doesn't change. A splash screen with a large block of text can become the LCP element and report a fast load while users wait for the real page. A handler that paints some trivial change before doing all its work lowers INP while the user still sees nothing useful. The test is simple: if the change you made wouldn't be noticed by a person watching the screen, it isn't a perceived-performance improvement.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Watch a recording. The Performance panel in Chrome DevTools shows screenshots frame by frame, which is the quickest way to see whether your busy state, skeleton or first content actually appears when you think it does.",
    },
    {
      type: "p",
      text: "For the rules on when loaders should appear at all, how big they should be and how to keep them accessible, continue with the [website loading animation best practices](/blog/website-loading-animation-best-practices/), or browse the [loading animation library](/animations/) for indeterminate bars, rings and skeleton-friendly designs.",
    },
  ],
  faqs: [
    {
      q: "Do skeleton screens actually feel faster than spinners?",
      a: "They tend to when the skeleton closely matches the content, because the page takes its final shape immediately and nothing jumps when the data arrives. A skeleton that doesn't match the real layout loses that advantage and adds a layout shift. For short, unpredictable waits, such as a button action or a search, a small delayed spinner is often the better choice.",
    },
    {
      q: "Is optimistic UI risky?",
      a: "Only when it's used for the wrong actions. It's ideal for cheap, reversible actions that rarely fail, such as stars, likes and toggles, as long as you roll back visibly on failure. Don't use it for payments, deletions or anything the user can't easily undo; show a loader and wait for the server instead.",
    },
    {
      q: "Can a loading animation improve my Core Web Vitals?",
      a: "Indirectly. Visible feedback in the next frame genuinely improves INP, and loaders or skeletons that reserve the right amount of space protect CLS. A loader can't improve LCP, which depends on when real content renders; a preloader that hides content until the page finishes loading makes it worse.",
    },
    {
      q: "What easing should a loading animation use?",
      a: "Continuous rotations should be linear so they don't appear to stutter. Elements that appear in response to input, and content fading in after loading, feel quickest with a short ease-out. Bouncing or pulsing loaders usually look most natural with ease-in-out, which matches how real objects accelerate and slow down.",
    },
  ],
};

export default article;

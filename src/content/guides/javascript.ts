import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "javascript",
  framework: "JavaScript",
  title: "Show a Loading Animation While JavaScript Fetches Data",
  seoTitle: "JavaScript Loading Animation for fetch() Requests",
  description: "Show a loading animation around fetch() in plain JavaScript: hide it reliably, delay it so fast responses never flash, and count concurrent requests.",
  intro: "Showing a spinner is easy; showing it only when it helps takes a little more care. This guide wraps fetch() in a small helper that waits 200 ms before showing the loader so fast responses never flash it, keeps it up while several requests overlap, and always hides it, even when a request fails. Then it shows the same patterns with CuteLoader's JavaScript export, which has them built in.",
  summary: "fetch, delays, counters, CuteLoader API",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "A loader exported from CuteLoader. Steps 1–4 use the **HTML/CSS** export; step 5 uses the **JavaScript** export instead. The examples use a demo ring, and any loader works the same way.",
        "A page that loads your code as a module with `<script type=\"module\">`, served over HTTP. Module scripts and `fetch()` don't work from `file://` URLs.",
        "An endpoint that returns JSON. The examples call `/api/team` and friends; swap in your own URLs.",
      ],
    },
    { type: "h2", text: "Step 1: Add the markup and CSS" },
    { type: "p", text: "Save the exported CSS, plus the overlay helper, as `css/cuteloader.css`:" },
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
    { type: "p", text: "Then add the region that receives the data and a full-screen overlay holding the loader. The overlay starts with the `hidden` attribute, and the `.cl-overlay[hidden]` rule keeps it hidden even though the overlay itself uses `display: grid`." },
    {
      type: "code",
      lang: "html",
      filename: "index.html",
      code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Team dashboard</title>
  <link rel="stylesheet" href="css/cuteloader.css">
</head>
<body>
  <main>
    <section id="team" aria-labelledby="team-title">
      <h2 id="team-title">Team</h2>
      <ul id="team-list"></ul>
      <p id="team-status" role="status"></p>
      <button type="button" id="load-team">Load team</button>
      <button type="button" id="load-dashboard">Load dashboard</button>
    </section>
  </main>

  <div id="page-loader" class="cl-overlay" hidden>
    <div class="cl-wrap" role="status" aria-live="polite">
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
      <span class="cl-sr-only">Loading…</span>
    </div>
  </div>

  <script type="module" src="js/app.js"></script>
</body>
</html>`,
    },
    { type: "h2", text: "Step 2: Show and hide around a single request" },
    { type: "p", text: "The simplest correct version shows the loader, awaits the request, and hides the loader in `finally`:" },
    {
      type: "code",
      lang: "js",
      filename: "js/load-team-basic.js",
      code: `const loader = document.getElementById("page-loader");
const team = document.getElementById("team");
const list = document.getElementById("team-list");
const status = document.getElementById("team-status");

async function loadTeam() {
  loader.hidden = false;
  team.setAttribute("aria-busy", "true");
  try {
    const response = await fetch("/api/team");
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const members = await response.json();
    list.replaceChildren(...members.map((member) => {
      const item = document.createElement("li");
      item.textContent = member.name;
      return item;
    }));
    status.textContent = \`\${members.length} team members loaded.\`;
  } catch (error) {
    console.error(error);
    status.textContent = "Couldn't load the team. Please try again.";
  } finally {
    loader.hidden = true;
    team.removeAttribute("aria-busy");
  }
}

document.getElementById("load-team").addEventListener("click", loadTeam);`,
    },
    { type: "p", text: "Two details make this robust. `fetch()` only rejects when the network fails, so a 404 or 500 has to be turned into an error by checking `response.ok`. And `finally` runs after success and failure alike, so no code path can leave the loader on screen." },
    { type: "p", text: "It still has two weaknesses. A response that arrives in 50 ms makes the overlay blink, which feels slower than showing nothing. And if two requests overlap, the first one to finish hides the loader while the second is still running." },
    { type: "h2", text: "Step 3: A reusable helper with a delay and a counter" },
    {
      type: "code",
      lang: "js",
      filename: "js/loader.js",
      code: `// Shows one loader element around async work.
//   delay:      don't show anything for work that finishes sooner than this
//   minVisible: once shown, keep it up at least this long, so it never blinks
export function createLoader(element, { delay = 200, minVisible = 400 } = {}) {
  let pending = 0; // operations in flight
  let shownAt = 0; // when the loader appeared (0 = not visible)
  let showTimer;
  let hideTimer;

  function start() {
    pending += 1;
    if (pending > 1) return; // already running
    clearTimeout(hideTimer); // new work arrived while a hide was scheduled
    if (shownAt) return; // still visible: keep it up
    showTimer = setTimeout(() => {
      element.hidden = false;
      shownAt = performance.now();
    }, delay);
  }

  function stop() {
    if (pending === 0) return; // ignore unbalanced calls
    pending -= 1;
    if (pending > 0) return; // other work is still running
    clearTimeout(showTimer); // finished before the delay: never shown
    if (!shownAt) return;
    const visibleFor = performance.now() - shownAt;
    hideTimer = setTimeout(() => {
      element.hidden = true;
      shownAt = 0;
    }, Math.max(0, minVisible - visibleFor));
  }

  async function track(promise) {
    start();
    try {
      return await promise;
    } finally {
      stop();
    }
  }

  return { start, stop, track };
}`,
    },
    { type: "p", text: "The counter is what makes concurrent requests safe: every `start()` adds one, every `stop()` removes one, and the loader hides only when the count returns to zero. The 200 ms delay means quick responses never show the loader at all, and the 400 ms minimum avoids the opposite problem, a loader that appears at 200 ms and vanishes at 220 ms. `track()` pairs the two calls with `try`/`finally`, so you can't forget the second one." },
    { type: "h2", text: "Step 4: Use it for single and concurrent requests" },
    {
      type: "code",
      lang: "js",
      filename: "js/app.js",
      code: `import { createLoader } from "./loader.js";

const loader = createLoader(document.getElementById("page-loader"));
const team = document.getElementById("team");
const list = document.getElementById("team-list");
const status = document.getElementById("team-status");

// Track the whole operation: fetch() resolves when the headers arrive,
// but the body still has to download.
async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(\`\${url} responded with \${response.status}\`);
  return response.json();
}

function describe(error) {
  return error.name === "TimeoutError"
    ? "The server took too long to answer. Please try again."
    : "Something went wrong. Please try again.";
}

async function loadTeam() {
  team.setAttribute("aria-busy", "true");
  status.textContent = "";
  try {
    const members = await loader.track(getJson("/api/team"));
    list.replaceChildren(...members.map((member) => {
      const item = document.createElement("li");
      item.textContent = member.name;
      return item;
    }));
    status.textContent = \`\${members.length} team members loaded.\`;
  } catch (error) {
    console.error(error);
    status.textContent = describe(error);
  } finally {
    team.removeAttribute("aria-busy");
  }
}

async function loadDashboard() {
  status.textContent = "";
  try {
    // Three requests at once: one loader, hidden after the last response.
    const [stats, alerts, tasks] = await Promise.all([
      loader.track(getJson("/api/stats")),
      loader.track(getJson("/api/alerts")),
      loader.track(getJson("/api/tasks")),
    ]);
    status.textContent = \`Dashboard loaded: \${stats.visitors} visitors, \${alerts.length} alerts, \${tasks.length} open tasks.\`;
  } catch (error) {
    console.error(error);
    status.textContent = describe(error);
  }
}

document.getElementById("load-team").addEventListener("click", loadTeam);
document.getElementById("load-dashboard").addEventListener("click", loadDashboard);`,
    },
    { type: "p", text: "Each request is tracked on its own, so the counter stays balanced even when `Promise.all()` rejects early: the other requests still settle and call `stop()` when they do. `AbortSignal.timeout()` puts an upper limit on a request that never answers, which would otherwise keep the loader up indefinitely. Use `Promise.allSettled()` instead if you'd rather show the parts that did load." },
    {
      type: "callout",
      tone: "tip",
      text: "Cancelling stale requests, such as an older search when the visitor keeps typing, works with the counter too. Abort the old request with an `AbortController`: its `fetch()` rejects with an `AbortError`, the `finally` inside `track()` still runs, and the count stays balanced. Just skip the error message when `error.name === \"AbortError\"`.",
    },
    { type: "h2", text: "Step 5: Or use CuteLoader's JavaScript export" },
    { type: "p", text: "The **JavaScript** tab exports one self-contained script that injects its own CSS and defines `window.CuteLoader`, with the delay, overlay and reference counting already built in. Load it with a classic script tag before your module:" },
    {
      type: "code",
      lang: "html",
      filename: "index.html",
      code: `<script src="js/cuteloader.js"></script>
<script type="module" src="js/app-cuteloader.js"></script>`,
    },
    {
      type: "code",
      lang: "js",
      filename: "js/app-cuteloader.js",
      code: `const list = document.getElementById("team-list");

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(\`\${url} responded with \${response.status}\`);
  return response.json();
}

// mount(): an inline loader inside an element; remove it when you're done.
async function reloadTeam() {
  const spinner = CuteLoader.mount(list, { label: "Loading the team…" });
  try {
    const members = await getJson("/api/team");
    list.replaceChildren(...members.map((member) => {
      const item = document.createElement("li");
      item.textContent = member.name;
      return item;
    }));
  } finally {
    spinner.remove();
  }
}

// show() / hide(): the full-screen overlay. With delay, quick saves never show it.
async function saveSettings(settings) {
  CuteLoader.show({ label: "Working on it…", delay: 200 });
  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error(\`Save failed with \${response.status}\`);
  } finally {
    CuteLoader.hide();
  }
}

// track(): show() until the promise settles, then hide(); returns its result.
function loadDashboard() {
  return Promise.all(
    ["/api/stats", "/api/alerts", "/api/tasks"].map((url) =>
      CuteLoader.track(getJson(url), { label: "Working on it…", delay: 200 }),
    ),
  );
}

document.getElementById("load-team").addEventListener("click", () => reloadTeam().catch(console.error));
document.getElementById("load-dashboard").addEventListener("click", () => loadDashboard().catch(console.error));`,
    },
    { type: "p", text: "Overlay calls are reference-counted: the overlay disappears only when every `show()` has a matching `hide()`, so concurrent requests behave just like the counter in step 3. Keep each `hide()` in a `finally` block, or let `track()` do the pairing for you. The overlay element is created the first time it appears and then reused, so its label comes from that first call; on a page that uses the overlay for several jobs, pass one general label everywhere, as above." },
    { type: "loader", slug: "three-dot-pulse", caption: "Three Dot Pulse is compact enough for both the overlay and inline use, and its JavaScript export offers the same mount, show, hide and track functions." },
    { type: "h2", text: "Try it" },
    {
      type: "demo",
      html: `<main>
  <section id="team" aria-labelledby="team-title">
    <h2 id="team-title">Team</h2>
    <ul id="team-list"><li>Press a button to load the team.</li></ul>
    <p id="team-status" role="status"></p>
    <div class="actions">
      <button type="button" data-run="slow">Slow request (1.5 s)</button>
      <button type="button" data-run="fast">Fast request (80 ms)</button>
      <button type="button" data-run="parallel">3 requests at once</button>
      <button type="button" data-run="fail">Failing request</button>
    </div>
  </section>
</main>
<div id="page-loader" class="cl-overlay" hidden>
  <div class="cl-wrap" role="status" aria-live="polite">
    <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    <span class="cl-sr-only">Loading…</span>
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

body { margin: 0; font: 15px/1.5 system-ui, sans-serif; background: #f8f7fc; color: #1f2937; }
main { max-width: 34rem; margin: 0 auto; padding: 16px; }
section { background: #ffffff; border: 1px solid #e7e1f3; border-radius: 12px; padding: 16px; }
h2 { margin: 0 0 8px; font-size: 1.1rem; }
ul { margin: 0; padding-left: 1.2rem; min-height: 4.5em; }
#team-status { min-height: 1.5em; color: #4b5563; font-size: 0.9rem; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
button { font: inherit; font-size: 0.9rem; padding: 6px 12px; border-radius: 8px; border: 1px solid #c4b5fd; background: #f5f3ff; color: #4c1d95; cursor: pointer; }
.cl-overlay .cl-demo-ring { width: 80px; height: 80px; }`,
      js: `(() => {
  function createLoader(element, { delay = 200, minVisible = 400 } = {}) {
    let pending = 0;
    let shownAt = 0;
    let showTimer;
    let hideTimer;
    function start() {
      pending += 1;
      if (pending > 1) return;
      clearTimeout(hideTimer);
      if (shownAt) return;
      showTimer = setTimeout(() => {
        element.hidden = false;
        shownAt = performance.now();
      }, delay);
    }
    function stop() {
      if (pending === 0) return;
      pending -= 1;
      if (pending > 0) return;
      clearTimeout(showTimer);
      if (!shownAt) return;
      const visibleFor = performance.now() - shownAt;
      hideTimer = setTimeout(() => {
        element.hidden = true;
        shownAt = 0;
      }, Math.max(0, minVisible - visibleFor));
    }
    async function track(promise) {
      start();
      try {
        return await promise;
      } finally {
        stop();
      }
    }
    return { start, stop, track };
  }

  // Demo only: a fake JSON request that answers (or fails) after \`ms\`.
  function fakeJson(data, ms, fail) {
    return new Promise((resolve, reject) => {
      setTimeout(() => (fail ? reject(new Error("HTTP 500")) : resolve(data)), ms);
    });
  }

  function start() {
    const loader = createLoader(document.getElementById("page-loader"));
    const team = document.getElementById("team");
    const list = document.getElementById("team-list");
    const status = document.getElementById("team-status");
    const people = [{ name: "Ada" }, { name: "Grace" }, { name: "Linus" }];

    function render(members) {
      list.replaceChildren(...members.map((member) => {
        const item = document.createElement("li");
        item.textContent = member.name;
        return item;
      }));
    }

    const runs = {
      slow: () => loader.track(fakeJson(people, 1500)).then((m) => { render(m); return "Slow request finished: the overlay appeared after 200 ms."; }),
      fast: () => loader.track(fakeJson(people, 80)).then((m) => { render(m); return "Fast request finished in 80 ms: no overlay, no flash."; }),
      parallel: () => Promise.all([
        loader.track(fakeJson(people.slice(0, 1), 400)),
        loader.track(fakeJson(people.slice(1, 2), 900)),
        loader.track(fakeJson(people.slice(2), 1400)),
      ]).then((parts) => { render(parts.flat()); return "3 requests finished: one overlay, hidden after the last one."; }),
      fail: () => loader.track(fakeJson(null, 1000, true)),
    };

    document.querySelector(".actions").addEventListener("click", async (event) => {
      const button = event.target.closest("button[data-run]");
      if (!button) return;
      team.setAttribute("aria-busy", "true");
      status.textContent = "";
      try {
        status.textContent = await runs[button.dataset.run]();
      } catch (error) {
        status.textContent = "The request failed, and the overlay was still hidden in finally.";
      } finally {
        team.removeAttribute("aria-busy");
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();`,
      height: 380,
      caption: "The helper from step 3 with simulated requests. A fast request never shows the overlay; three parallel requests show it once; a failed request still hides it.",
    },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "The exported loader announces its label politely through `role=\"status\"` and `aria-live=\"polite\"`. Make labels specific when you can: `CuteLoader.mount()` accepts a `label` option, and so does `show()` for the overlay.",
        "Set `aria-busy=\"true\"` on the region being updated and remove it afterwards, and report the outcome in a status element that stays on the page, like `#team-status`.",
        "The overlay blocks pointer clicks but never takes or traps focus. Don't move focus into it, and don't hide your page from assistive technology while it's showing.",
        "When a button starts the request, prefer `aria-disabled=\"true\"` plus an early return over `disabled`, which drops keyboard focus to the start of the page.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Customize colors, sizes and dark mode for the loader in the [CSS guide](/guides/css/).",
        "See the same patterns as components in the [React guide](/guides/react/) or the [Vue guide](/guides/vue/).",
        "Browse [JavaScript loaders](/javascript-loaders/) or the full [animation library](/animations/), and fine-tune any of them in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["three-dot-pulse", "orbiting-dots", "minimal-ring"],
  faqs: [
    {
      q: "Why does my loader sometimes stay on screen forever?",
      a: "Something called `show()` without a matching `hide()`: an early `return`, an exception before the hide, or a request that never settles. Hide in `finally` (or use a `track()` helper), and give requests a timeout with `AbortSignal.timeout()` so a stalled connection can't keep the loader up.",
    },
    {
      q: "Does fetch() reject on a 404 or 500 response?",
      a: "No. `fetch()` resolves for any HTTP response and rejects only on network failures, timeouts and aborts. Check `response.ok` (or `response.status`) and throw yourself, so the error reaches your `catch` block and the user sees a message.",
    },
    {
      q: "Should I use a full-screen overlay or an inline loader?",
      a: "Prefer inline loaders for anything that updates part of the page; people can keep reading and working elsewhere. Reserve the overlay for moments when the whole page genuinely can't be used, such as saving before a redirect.",
    },
    {
      q: "Can I use the helper with axios or other libraries?",
      a: "Yes. `track()` accepts any promise, so `loader.track(axios.get(\"/api/team\"))` works the same way. For app-wide coverage, call `start()` and `stop()` from your library's request and response hooks, making sure every start is matched by exactly one stop.",
    },
  ],
};

export default guide;

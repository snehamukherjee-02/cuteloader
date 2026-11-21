import type { Article } from "@/types/content";

const demoHtml = `<div class="demo">
  <div class="actions">
    <button type="button" data-ms="120">Fast (120 ms)</button>
    <button type="button" data-ms="1800">Slow (1.8 s)</button>
    <button type="button" data-burst>Three overlapping</button>
    <button type="button" data-fail>Failing request</button>
  </div>
  <div class="panel">
    <div id="loader" class="loader" hidden>
      <svg viewBox="0 0 50 50" width="44" height="44" aria-hidden="true" focusable="false">
        <circle class="track" cx="25" cy="25" r="20" />
        <circle class="arc" cx="25" cy="25" r="20" />
      </svg>
    </div>
    <div id="result" class="result">Pick a request above.</div>
  </div>
  <p class="meta">Pending requests: <b id="pending">0</b> · Loader appeared: <b id="shown">0</b> times</p>
  <p id="status" class="sr-only" role="status"></p>
</div>`;

const demoCss = `body { margin: 0; font: 15px/1.5 system-ui, sans-serif; color: #1f1b2e; background: #ffffff; }
.demo { padding: 16px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #c9c2e0; border-radius: 8px; background: #f6f3ff; color: #2e1065; cursor: pointer; }
button:hover { background: #ede7ff; }
.panel { position: relative; margin-top: 12px; min-height: 110px; border: 1px solid #e4def0; border-radius: 12px; }
.result { padding: 16px; }
.result.error { color: #9f1239; }
.result.error button { margin-left: 8px; }
.loader { position: absolute; inset: 0; display: grid; place-items: center; background: rgb(255 255 255 / 0.75); border-radius: 12px; }
.loader[hidden] { display: none; }
.track, .arc { fill: none; stroke-width: 5; }
.track { stroke: #e9e3fb; }
.arc { stroke: #6d28d9; stroke-linecap: round; stroke-dasharray: 80 126; transform-origin: 25px 25px; animation: spin 0.9s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .arc { animation-duration: 2.7s; } }
.meta { margin: 10px 0 0; font-size: 13px; color: #5b5670; }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }`;

const demoJs = `function init() {
  const result = document.getElementById("result");
  const status = document.getElementById("status");
  const pendingEl = document.getElementById("pending");
  const shownEl = document.getElementById("shown");
  let shown = 0;

  function createLoader(element, { delay = 250 } = {}) {
    let pending = 0;
    let timer = null;
    function start() {
      pending += 1;
      pendingEl.textContent = pending;
      if (pending === 1) {
        timer = setTimeout(() => {
          element.hidden = false;
          shownEl.textContent = ++shown;
          status.textContent = "Loading…";
        }, delay);
      }
    }
    function stop() {
      if (pending === 0) return;
      pending -= 1;
      pendingEl.textContent = pending;
      if (pending === 0) {
        clearTimeout(timer);
        element.hidden = true;
        status.textContent = "";
      }
    }
    async function track(promise) {
      start();
      try {
        return await promise;
      } finally {
        stop();
      }
    }
    return { track };
  }

  const loader = createLoader(document.getElementById("loader"));

  // Stand-in for fetch(): settles after ms milliseconds.
  function fakeRequest(ms, fail) {
    return new Promise((resolve, reject) => {
      setTimeout(() => (fail ? reject(new Error("The server returned 500.")) : resolve(ms)), ms);
    });
  }

  function showError(message, retry) {
    result.className = "result error";
    result.textContent = message;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Retry";
    button.addEventListener("click", retry);
    result.append(button);
    status.textContent = message;
  }

  async function run(requests) {
    try {
      const times = await Promise.all(requests.map((r) => loader.track(fakeRequest(r.ms, r.fail))));
      result.className = "result";
      result.textContent = "Loaded: " + times.map((t) => t + " ms").join(", ");
    } catch (error) {
      // The retry succeeds, so you can see the recovery path too.
      showError(error.message, () => run(requests.map((r) => ({ ms: r.ms }))));
    }
  }

  document.querySelector(".actions").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.hasAttribute("data-burst")) run([{ ms: 500 }, { ms: 1100 }, { ms: 2000 }]);
    else if (button.hasAttribute("data-fail")) run([{ ms: 900, fail: true }]);
    else run([{ ms: Number(button.dataset.ms) }]);
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();`;

const article: Article = {
  slug: "add-loader-to-ajax-request",
  title: "How to Add a Loader to an AJAX Request",
  seoTitle: "How to Add a Loader to an AJAX Request (fetch, jQuery)",
  description:
    "Show a loader for AJAX requests that never gets stuck: fetch with try/finally, timeouts, request counting, jQuery and axios hooks, upload progress and errors.",
  excerpt:
    "Showing a spinner is one line. Making sure it hides on errors, survives overlapping requests, skips fast responses and reports real upload progress takes a little more.",
  publishedAt: "2026-11-21",
  tags: ["AJAX", "JavaScript", "fetch", "jQuery", "axios"],
  relatedAnimations: ["three-dot-pulse", "minimal-ring", "line-loader", "data-transfer"],
  blocks: [
    {
      type: "p",
      text: "To add a loader to an AJAX request, show it right before the request starts and hide it in a `finally` block, so it disappears whether the request succeeds, fails or times out. Then route every show and hide through one small counter, so overlapping requests don't fight over the same spinner and fast responses never flash it. Everything else in this guide (timeouts, jQuery and axios hooks, upload progress and error states) builds on those two ideas.",
    },
    {
      type: "p",
      text: "The examples call a `/api/...` endpoint and assume a loader element that starts with the `hidden` attribute. Any markup works; the [JavaScript loading animation guide](/guides/javascript/) covers building one, and every loader in the library exports as plain HTML and CSS.",
    },
    { type: "h2", text: "The basic pattern: try/finally around fetch" },
    {
      type: "code",
      lang: "js",
      code: `const loader = document.getElementById("orders-loader");

async function getJSON(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(\`The server returned \${response.status}.\`);
  return response.json();
}

async function loadOrders() {
  loader.hidden = false;
  try {
    renderOrders(await getJSON("/api/orders"));
  } catch (error) {
    showError(error.message);
  } finally {
    loader.hidden = true; // runs on success, failure and timeout alike
  }
}`,
    },
    {
      type: "p",
      text: "Two things in this short block prevent the most common loader bugs. `fetch` only rejects when the request can't complete at all (no network, a blocked request, a CORS failure). A 404 or 500 resolves normally with `response.ok` set to `false`, so `getJSON` checks it and throws. And hiding the loader in `finally` instead of at the end of the `try` means an exception in `renderOrders` can't leave the spinner running over an empty panel.",
    },
    { type: "h2", text: "Timeouts and cancellation with AbortController" },
    {
      type: "p",
      text: "A request that hangs keeps the loader spinning indefinitely, and that reads as a frozen page. `fetch` has no timeout of its own, but it accepts an `AbortSignal`. [`AbortSignal.timeout()`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static) creates one that aborts with a `TimeoutError` after a set time, and `AbortSignal.any()` combines it with your own controller, so you can also cancel a search the user has already replaced. Both work in all current major browsers.",
    },
    {
      type: "code",
      lang: "js",
      code: `let current = null;

async function search(query) {
  current?.abort(); // cancel the search this one replaces
  const controller = (current = new AbortController());
  const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(8000)]);

  loader.hidden = false;
  try {
    renderResults(await getJSON(\`/api/search?q=\${encodeURIComponent(query)}\`, { signal }));
  } catch (error) {
    if (error.name === "AbortError") return; // replaced by a newer search
    showError(error.name === "TimeoutError" ? "The search took too long." : error.message);
  } finally {
    if (current === controller) loader.hidden = true; // only the latest search hides it
  }
}`,
    },
    {
      type: "p",
      text: "The guard in `finally` is the subtle part. When a second search aborts the first, the first request's `catch` and `finally` run a moment later, after the second search has already shown the loader. Without the `current === controller` check, the stale request hides the spinner while the new one is still in flight. Checking `error.name` also lets you tell the user something useful: a timeout deserves a different message from a server error, and a deliberate cancellation deserves none.",
    },
    { type: "h2", text: "Several requests at once: count them" },
    {
      type: "p",
      text: "Dashboards fire several requests in parallel. With a plain show and hide, the first response hides the loader while the others are still loading. A counter fixes that, and the same helper is the natural place for a short delay, so requests that finish in a couple of hundred milliseconds never show a spinner at all:",
    },
    {
      type: "code",
      lang: "js",
      code: `function createLoader(element, { delay = 250 } = {}) {
  let pending = 0;
  let timer = null;

  function start() {
    pending += 1;
    if (pending === 1) timer = setTimeout(() => { element.hidden = false; }, delay);
  }

  function stop() {
    if (pending === 0) return;
    pending -= 1;
    if (pending === 0) {
      clearTimeout(timer);
      element.hidden = true;
    }
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

const pageLoader = createLoader(document.getElementById("page-loader"));

async function loadDashboard() {
  const [user, orders] = await Promise.all([
    pageLoader.track(getJSON("/api/user")),
    pageLoader.track(getJSON("/api/orders")),
  ]);
  renderDashboard(user, orders);
}`,
    },
    {
      type: "p",
      text: "`track` hands back whatever the promise resolves to and rethrows whatever it rejects with, so it wraps any existing call without changing how you handle results. The loader stays up until the slowest request settles.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "If you export a loader as plain JavaScript from CuteLoader, you get this behavior built in: `CuteLoader.show()` and `CuteLoader.hide()` are reference-counted, `show({ delay: 250 })` skips the overlay when it's hidden again within 250 ms, and `CuteLoader.track(promise, { delay: 250 })` keeps the overlay up until the promise settles. See the [JavaScript loaders](/javascript-loaders/) page for the export.",
    },
    { type: "h2", text: "jQuery: $.ajax and the global AJAX events" },
    {
      type: "p",
      text: "For a single jQuery request, `.always()` is the equivalent of `finally`. The `fail` callback's second argument tells you what went wrong, and it is `\"timeout\"` when the request's `timeout` option runs out:",
    },
    {
      type: "code",
      lang: "js",
      code: `const $loader = $("#orders-loader").show();

$.ajax({ url: "/api/orders", dataType: "json", timeout: 8000 })
  .done(renderOrders)
  .fail((xhr, textStatus) => {
    showError(textStatus === "timeout" ? "The server took too long." : "Couldn't load orders.");
  })
  .always(() => $loader.hide());`,
    },
    {
      type: "p",
      text: "For a site-wide loader, jQuery's global events do the counting for you. `ajaxStart` fires when a request starts while no other jQuery request is active, and `ajaxStop` fires when the last active one finishes, successful or not. Pairing them with the counter from the previous section adds the delay:",
    },
    {
      type: "code",
      lang: "js",
      code: `const appLoader = createLoader(document.getElementById("app-loader"));

$(document).ajaxStart(appLoader.start).ajaxStop(appLoader.stop);

// Opt out for requests that shouldn't cover the page:
$.ajax({ url: "/api/heartbeat", global: false });`,
    },
    {
      type: "p",
      text: "Since jQuery 1.9 these events must be bound to `document`. They only see jQuery's own requests, so a `fetch` call elsewhere in the page needs its own `track()`. If jQuery's `.show()` and `.hide()` control an element, let jQuery own it: they set an inline `display` style, and once that's `none`, removing the `hidden` attribute won't make the element visible again.",
    },
    { type: "h2", text: "axios: interceptors" },
    {
      type: "p",
      text: "axios runs request interceptors before each request and response interceptors after it, which makes them a tidy place for a global loader. Put them on a dedicated instance, so calls that shouldn't show the loader can use plain `axios`:",
    },
    {
      type: "code",
      lang: "js",
      code: `const api = axios.create({ baseURL: "/api", timeout: 8000 });

// Register these before any other interceptors on the instance.
api.interceptors.request.use((config) => {
  appLoader.start();
  config.showsLoader = true; // mark the requests this loader counted
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.showsLoader) appLoader.stop();
    return response;
  },
  (error) => {
    if (error.config?.showsLoader) appLoader.stop(); // HTTP errors and timeouts
    return Promise.reject(error);
  },
);`,
    },
    {
      type: "p",
      text: "The marker matters more than it looks. Many snippets call `stop()` unconditionally in the response error handler, and some also call it in the request interceptor's error handler. Both go wrong when another interceptor fails first, say an auth interceptor that can't refresh a token: your `start()` never ran, yet the rejection still flows through every error handler after it, so the counter drops below the number of requests in flight and the loader disappears while a slow request is still loading. Stopping only for marked requests keeps the count exact.",
    },
    {
      type: "p",
      text: "Registration order is the other half. axios runs request interceptors in reverse order of registration, so the loader's interceptor, registered first, runs last, immediately before the request is sent. Nothing can then fail between `start()` and the network call without carrying the marked config. A timeout rejects with `error.code` set to `\"ECONNABORTED\"`, and the error handler stops the loader for it like any other failure.",
    },
    { type: "h2", text: "Upload progress with XMLHttpRequest" },
    {
      type: "p",
      text: "When you can measure progress, show it. A determinate bar tells the user how long to wait, which a spinner can't. `fetch` has no upload progress events, so uploads are the one place where `XMLHttpRequest` is still the right tool. Its [`upload` object](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) fires `progress` events while the request body is sent:",
    },
    {
      type: "code",
      lang: "js",
      code: `function upload(file, { onProgress = () => {}, onSent = () => {} } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // Register upload listeners before open() and send(), or they may never fire.
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    });
    xhr.upload.addEventListener("load", onSent); // every byte sent; server still working
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
      else reject(new Error(\`Upload failed with status \${xhr.status}.\`));
    });
    xhr.addEventListener("error", () => reject(new Error("Network error during upload.")));

    xhr.open("POST", "/api/uploads");
    xhr.responseType = "json";
    const body = new FormData();
    body.append("file", file);
    xhr.send(body);
  });
}`,
    },
    {
      type: "code",
      lang: "html",
      code: `<input type="file" id="file-input" />
<label for="upload-bar">Upload progress</label>
<progress id="upload-bar" max="100" value="0"></progress>
<p id="upload-status" role="status"></p>`,
    },
    {
      type: "code",
      lang: "js",
      code: `const input = document.getElementById("file-input");
const bar = document.getElementById("upload-bar");
const status = document.getElementById("upload-status");

input.addEventListener("change", async () => {
  const file = input.files[0];
  if (!file) return;
  bar.value = 0;
  status.textContent = \`Uploading \${file.name}…\`;
  try {
    await upload(file, {
      onProgress: (fraction) => { bar.value = Math.round(fraction * 100); },
      onSent: () => {
        bar.removeAttribute("value"); // indeterminate while the server processes it
        status.textContent = "Processing…";
      },
    });
    bar.value = 100;
    status.textContent = \`\${file.name} uploaded.\`;
  } catch (error) {
    status.textContent = error.message;
  }
});`,
    },
    {
      type: "p",
      text: "The `upload` `load` event is the detail most upload bars miss. It fires when the last byte has left the browser, which is not when the server has finished: virus scanning, image resizing or a database write can take several more seconds. Removing the `value` attribute switches the `<progress>` element to its indeterminate state, so the bar never sits at 100% looking stuck. The status line only changes at milestones, because a live region updated on every progress event would flood a screen reader.",
    },
    {
      type: "loader",
      slug: "data-transfer",
      caption: "Data Transfer: an upload-and-sync loader for the processing phase after the bytes have gone.",
    },
    { type: "h2", text: "Error states: replace the loader, don't just hide it" },
    {
      type: "p",
      text: "When a request fails, hiding the spinner isn't enough: the panel goes quiet and looks finished. Replace the loader with a message in the same place, and give the user a way forward:",
    },
    {
      type: "ul",
      items: [
        "**Say what happened in plain words.** \"Couldn't load orders\" beats \"Error 500\", and a timeout deserves its own message.",
        "**Offer a retry** right where the content should be, and keep whatever the user typed.",
        "**Keep the previous data** when a refresh fails. Stale results with a warning are more useful than an empty panel.",
        "**Announce it.** Put the message in a live region (`role=\"status\"`, or `role=\"alert\"` when the failure blocks the task) so screen reader users hear it too.",
      ],
    },
    {
      type: "p",
      text: "The demo below runs the counter from this article against simulated requests. The fast request finishes inside the 250 ms delay, so the loader never appears. The three overlapping requests keep it up until the slowest finishes, and the failing request swaps it for a message with a working retry.",
    },
    {
      type: "demo",
      html: demoHtml,
      css: demoCss,
      js: demoJs,
      height: 270,
      caption: "A delayed, reference-counted AJAX loader with an error state. Requests are simulated with timers.",
    },
    {
      type: "p",
      text: "Deciding when a loader should appear at all, and how big it should be, is the next question. The [website loading animation best practices](/blog/website-loading-animation-best-practices/) cover thresholds, placement and accessibility in more depth.",
    },
  ],
  faqs: [
    {
      q: "Why does my AJAX loader never disappear?",
      a: "Usually the code that hides it never runs. Either it sits after an `await` that throws (move it into `finally`), the request never settles (add a timeout with `AbortSignal.timeout()`), or a counter received more starts than stops. For jQuery's global events, `ajaxStop` waits for every active jQuery request, so one long-polling call keeps the loader up; give that request `global: false`.",
    },
    {
      q: "Why doesn't jQuery's ajaxStart fire for my fetch calls?",
      a: "`ajaxStart` and `ajaxStop` only track requests made through jQuery's `$.ajax` and its shorthands. `fetch` and `XMLHttpRequest` calls made directly don't pass through jQuery, so wrap them with your own counter (`track()` in this article) and call the same `start` and `stop` functions from the jQuery events.",
    },
    {
      q: "Should every AJAX request show a loader?",
      a: "No. Requests that usually finish within a few hundred milliseconds are better without one, which is why the helper waits 250 ms before showing anything. Background work such as polling, autosave and analytics shouldn't show a page-level loader at all. Save the overlay for requests that block what the user is trying to do, and prefer an inline loader for small actions.",
    },
    {
      q: "Can fetch report upload progress?",
      a: "Not today. `fetch` exposes no progress events for the request body, so use `XMLHttpRequest` and its `upload.onprogress` for upload bars. Download progress is possible with `fetch` by reading `response.body` as a stream and comparing the bytes received to the `Content-Length` header, when the server sends one.",
    },
  ],
};

export default article;

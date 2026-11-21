import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "html",
  framework: "Plain HTML",
  title: "How to Add a Loading Animation to a Plain HTML Page",
  seoTitle: "Plain HTML Loading Animation: Preloader and Inline Loader",
  description: "Add a loading animation to a plain HTML site: a full-page preloader that fades out once the page has loaded, plus an inline loader for content fetched later.",
  intro: "No framework and no build step: just HTML, CSS and a few lines of JavaScript. This guide adds a CuteLoader animation to a static page in two places: a full-page preloader that covers the page until it has finished loading and then fades away, and an inline loader inside one section while its content is fetched. Both work with screen readers, and both stay out of sight when the network is fast.",
  summary: "Page preloader + inline loader",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "A page you can edit, served over HTTP by any static host or local server. `fetch()` doesn't work on a page opened straight from disk with a `file://` URL.",
        "A loader exported from CuteLoader with the **HTML/CSS** tab. The examples use a small demo ring, but any loader works the same way because every export shares one structure. Browse the [animation library](/animations/) to pick yours.",
        "Basic HTML and CSS. The JavaScript is short and commented.",
      ],
    },
    { type: "h2", text: "Step 1: Add the exported CSS" },
    { type: "p", text: "The CSS tab gives you a self-contained stylesheet. Save it as `css/cuteloader.css`:" },
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
.cl-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }`,
    },
    { type: "p", text: "Three parts of that file matter here. The `.cl-demo-ring` rule holds the loader's settings as custom properties: `--c1` and `--c2` for its colors, `--d` for the length of one cycle and `--sw` for the stroke width. `.cl-wrap` centers the animation and its label, and `.cl-sr-only` hides the label visually while keeping it available to screen readers. The media query slows the animation to a third of its speed for visitors whose system asks for reduced motion." },
    {
      type: "callout",
      tone: "tip",
      text: "To use another loader, export it and replace both the CSS file and the `<svg>` element. Its class follows the pattern `cl-<slug>` (for example `cl-wave-bars`) in place of `cl-demo-ring`. The `cl-wrap` and `cl-sr-only` classes never change, so the rest of this guide works as written.",
    },
    { type: "loader", slug: "bouncing-bunny", caption: "Want something more playful for a preloader? Bouncing Bunny exports with exactly the same structure; only the class names and keyframes differ." },
    { type: "h2", text: "Step 2: Add the page markup" },
    { type: "p", text: "The page needs two copies of the loader: one inside a full-screen preloader, and one inside the section that loads its content later. The HTML export is the `div.cl-wrap` block. Paste it in both places and change each hidden label so it says what is loading." },
    {
      type: "code",
      lang: "html",
      filename: "index.html",
      code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bakery News</title>
  <link rel="stylesheet" href="css/cuteloader.css">
  <link rel="stylesheet" href="css/site.css">
  <!-- Only JavaScript can remove the preloader, so never show it without JavaScript. -->
  <noscript><style>.preloader { display: none; }</style></noscript>
</head>
<body>
  <div id="preloader" class="preloader">
    <div class="cl-wrap" role="status" aria-live="polite">
      <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
      <span class="cl-sr-only">Loading page…</span>
    </div>
  </div>

  <main>
    <h1>Bakery News</h1>
    <p>Fresh stories from our kitchen, updated every morning.</p>

    <section id="articles" class="articles" aria-labelledby="articles-title">
      <h2 id="articles-title">Latest articles</h2>
      <div class="articles-body">
        <ul id="articles-list" class="articles-list"></ul>
        <div id="articles-loader" class="section-loader" hidden>
          <div class="cl-wrap" role="status" aria-live="polite">
            <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
            <span class="cl-sr-only">Loading articles…</span>
          </div>
        </div>
      </div>
      <p id="articles-message" class="articles-message" role="status"></p>
      <button type="button" id="articles-reload">Reload articles</button>
    </section>
  </main>

  <script src="js/preloader.js"></script>
  <script src="js/articles.js"></script>
</body>
</html>`,
    },
    { type: "p", text: "The `<noscript>` rule is a safety net. If scripts are disabled or fail to download, nothing would ever remove the overlay, so it must not appear in the first place." },
    { type: "h2", text: "Step 3: Style the preloader and the section loader" },
    {
      type: "code",
      lang: "css",
      filename: "css/site.css",
      code: `/* Load this after cuteloader.css. */

/* Full-page preloader */
.preloader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: #ffffff;
  transition: opacity 0.4s ease, visibility 0.4s;
}
.preloader.is-done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.preloader .cl-demo-ring {
  width: 96px;
  height: 96px;
}
/* Fade the animation in after 200 ms, so fast page loads never flash it. */
.preloader .cl-wrap {
  animation: preloader-appear 0.3s ease-out 0.2s both;
}
@keyframes preloader-appear {
  from { opacity: 0; }
}

/* Inline loader for the articles section */
.articles-body {
  position: relative;
  min-height: 10rem;
}
.section-loader {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.8);
}
.section-loader[hidden] {
  display: none;
}`,
    },
    { type: "p", text: "A few details are deliberate:" },
    {
      type: "ul",
      items: [
        "`.preloader.is-done` fades the overlay out with `opacity` and `visibility`, and `pointer-events: none` lets clicks through at once instead of after the fade.",
        "CSS `width` and `height` override the SVG's `width=\"64\"` attributes, so the preloader can use a larger ring than the section.",
        "The preloader's animation fades in only after 200 ms. On a fast connection the page is ready before then, so visitors see the page appear instead of a loader that flickers for an instant.",
        "The section loader covers the list inside a box with a minimum height, so the layout doesn't jump when the loader appears or when the articles arrive.",
        "Any element you toggle with the `hidden` attribute that also sets `display` needs a `[hidden] { display: none; }` rule. Without it, `display: grid` overrides the browser's built-in rule and the element never hides.",
      ],
    },
    { type: "h2", text: "Step 4: Hide the preloader once the page has loaded" },
    {
      type: "code",
      lang: "js",
      filename: "js/preloader.js",
      code: `// Fades out the full-page preloader once the page has loaded.
(() => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  let hidden = false;

  function hidePreloader() {
    if (hidden) return;
    hidden = true;
    preloader.classList.add("is-done");
    // Remove it after the fade-out (or after 1 s if no transition runs).
    const remove = () => preloader.remove();
    preloader.addEventListener("transitionend", remove, { once: true });
    setTimeout(remove, 1000);
  }

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader, { once: true });
  }

  // Never hold a usable page hostage: give up after 8 seconds, even if a
  // slow image or third-party widget is still loading.
  setTimeout(hidePreloader, 8000);
})();`,
    },
    { type: "p", text: "The window `load` event fires once the HTML, stylesheets, images and iframes have all finished loading. If the script runs after that moment (for example when you add it with `async`), `document.readyState` is already `complete`, so it hides the preloader immediately. The 8-second cap matters more than it looks: one slow third-party image can hold back `load` for a long time." },
    { type: "h2", text: "Step 5: Load a section's content with an inline loader" },
    {
      type: "code",
      lang: "js",
      filename: "js/articles.js",
      code: `// Loads the article list into its section, with an inline loader.
(() => {
  const section = document.getElementById("articles");
  const loader = document.getElementById("articles-loader");
  const list = document.getElementById("articles-list");
  const message = document.getElementById("articles-message");
  const reloadButton = document.getElementById("articles-reload");
  let loading = false;

  async function loadArticles() {
    if (loading) return; // aria-disabled doesn't block clicks by itself
    loading = true;
    section.setAttribute("aria-busy", "true");
    reloadButton.setAttribute("aria-disabled", "true");
    message.textContent = "";
    // Show the loader only if the request is still running after 200 ms.
    const showTimer = setTimeout(() => { loader.hidden = false; }, 200);

    try {
      const response = await fetch("/api/articles.json");
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      const articles = await response.json();
      list.replaceChildren(...articles.map(toListItem));
      message.textContent = \`\${articles.length} articles loaded.\`;
    } catch (error) {
      console.error(error);
      message.textContent = "Sorry, the articles couldn't be loaded. Please try again.";
    } finally {
      clearTimeout(showTimer);
      loader.hidden = true;
      section.removeAttribute("aria-busy");
      reloadButton.removeAttribute("aria-disabled");
      loading = false;
    }
  }

  function toListItem(article) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = article.title; // never innerHTML for data from a server
    item.append(link);
    return item;
  }

  reloadButton.addEventListener("click", loadArticles);
  loadArticles();
})();`,
    },
    { type: "p", text: "This is the pattern to reuse for anything you fetch after the page has loaded:" },
    {
      type: "ol",
      items: [
        "Mark the section with `aria-busy=\"true\"` and start a 200 ms timer instead of showing the loader right away. Fast responses finish before the timer fires, so nothing flashes.",
        "Check `response.ok`. `fetch()` only rejects when the network fails; a 404 or 500 response resolves normally, so you have to turn it into an error yourself.",
        "Explain the problem in `catch`, and do all of the cleanup in `finally`: clear the timer, hide the loader and remove `aria-busy`. `finally` runs after success and after failure alike, so the loader can't get stuck on screen.",
        "Build the list with `textContent`, not `innerHTML`, so text from the server is never treated as markup.",
      ],
    },
    { type: "h2", text: "Try it" },
    {
      type: "demo",
      html: `<div id="preloader" class="preloader">
  <div class="cl-wrap" role="status" aria-live="polite">
    <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    <span class="cl-sr-only">Loading page…</span>
  </div>
</div>
<main>
  <h1>Bakery News</h1>
  <section id="articles" class="articles" aria-labelledby="articles-title">
    <h2 id="articles-title">Latest articles</h2>
    <div class="articles-body">
      <ul id="articles-list" class="articles-list"></ul>
      <div id="articles-loader" class="section-loader" hidden>
        <div class="cl-wrap" role="status" aria-live="polite">
          <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
          <span class="cl-sr-only">Loading articles…</span>
        </div>
      </div>
    </div>
    <p id="articles-message" class="articles-message" role="status"></p>
    <div class="actions">
      <button type="button" id="articles-reload">Reload articles</button>
      <button type="button" id="articles-fail">Simulate an error</button>
      <button type="button" id="replay">Replay preloader</button>
    </div>
  </section>
</main>`,
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

body { margin: 0; font: 15px/1.5 system-ui, sans-serif; background: #faf8ff; color: #1f2937; }
main { max-width: 34rem; margin: 0 auto; padding: 16px; }
h1 { font-size: 1.4rem; margin: 0 0 8px; }
h2 { font-size: 1.05rem; margin: 0 0 8px; }
.articles { background: #ffffff; border: 1px solid #e9e3f5; border-radius: 12px; padding: 16px; }
.articles-list { margin: 0; padding-left: 1.2rem; }
.articles-list a { color: #6d28d9; }
.articles-message { min-height: 1.5em; margin: 8px 0; font-size: 0.9rem; color: #4b5563; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
button { font: inherit; padding: 6px 12px; border-radius: 8px; border: 1px solid #c4b5fd; background: #f5f3ff; color: #4c1d95; cursor: pointer; }
button[aria-disabled="true"] { opacity: 0.6; cursor: progress; }

.preloader { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; background: #ffffff; transition: opacity 0.4s ease, visibility 0.4s; }
.preloader.is-done { opacity: 0; visibility: hidden; pointer-events: none; }
.preloader .cl-demo-ring { width: 96px; height: 96px; }
.preloader .cl-wrap { animation: preloader-appear 0.3s ease-out 0.2s both; }
@keyframes preloader-appear { from { opacity: 0; } }
.articles-body { position: relative; min-height: 8rem; }
.section-loader { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(255, 255, 255, 0.8); }
.section-loader[hidden] { display: none; }`,
      js: `(() => {
  function start() {
    const preloader = document.getElementById("preloader");
    const section = document.getElementById("articles");
    const loader = document.getElementById("articles-loader");
    const list = document.getElementById("articles-list");
    const message = document.getElementById("articles-message");
    const reloadButton = document.getElementById("articles-reload");
    let loading = false;

    // Demo only: pretend the page needs 1.2 s to load. A real page hides
    // the preloader on the window "load" event instead.
    function playPreloader() {
      preloader.classList.remove("is-done");
      setTimeout(() => preloader.classList.add("is-done"), 1200);
    }

    // Demo only: a fake request that answers after one second.
    function fakeFetch(fail) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const body = JSON.stringify([
            { title: "Sourdough, step by step", url: "#sourdough" },
            { title: "Why we proof overnight", url: "#proofing" },
            { title: "Five breads for beginners", url: "#beginners" },
          ]);
          resolve(new Response(fail ? "Server error" : body, { status: fail ? 500 : 200 }));
        }, 1000);
      });
    }

    async function loadArticles(fail) {
      if (loading) return;
      loading = true;
      section.setAttribute("aria-busy", "true");
      reloadButton.setAttribute("aria-disabled", "true");
      message.textContent = "";
      const showTimer = setTimeout(() => { loader.hidden = false; }, 200);
      try {
        const response = await fakeFetch(fail);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const articles = await response.json();
        list.replaceChildren(...articles.map(toListItem));
        message.textContent = \`\${articles.length} articles loaded.\`;
      } catch (error) {
        message.textContent = "Sorry, the articles couldn't be loaded. Please try again.";
      } finally {
        clearTimeout(showTimer);
        loader.hidden = true;
        section.removeAttribute("aria-busy");
        reloadButton.removeAttribute("aria-disabled");
        loading = false;
      }
    }

    function toListItem(article) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = article.url;
      link.textContent = article.title;
      item.append(link);
      return item;
    }

    reloadButton.addEventListener("click", () => loadArticles(false));
    document.getElementById("articles-fail").addEventListener("click", () => loadArticles(true));
    document.getElementById("replay").addEventListener("click", playPreloader);
    playPreloader();
    loadArticles(false);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();`,
      height: 420,
      caption: "The preloader and the section loader from this guide. The demo fakes a slow page and a one-second request; use the buttons to replay them or simulate a failed request.",
    },
    { type: "h2", text: "Accessibility checklist" },
    {
      type: "ul",
      items: [
        "The exported wrapper has `role=\"status\"` and `aria-live=\"polite\"`, so assistive technology treats its label as a status message that doesn't interrupt. Write labels that say what is loading, such as \"Loading articles…\".",
        "Some screen readers only announce changes to a live region that was already on the page, so the persistent `#articles-message` paragraph reports the outcome of every request.",
        "`aria-busy` tells assistive technology that the section is being rebuilt. Remove it as soon as the new content is in place.",
        "Never move focus to a loader or trap focus inside an overlay. The reload button uses `aria-disabled` during a request instead of `disabled`, because disabling a focused button sends keyboard focus back to the start of the page.",
        "Reduced motion is handled by the export itself: the loader keeps moving, but three times slower.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Recolor, resize and theme the loader for dark mode in the [CSS guide](/guides/css/).",
        "Reuse one helper for many requests, or try CuteLoader's JavaScript export, in the [JavaScript guide](/guides/javascript/).",
        "Find another style among the [HTML and CSS loaders](/html-css-loaders/), the [SVG loaders](/svg-loaders/) or the full [animation library](/animations/).",
        "Adjust colors, size and speed before exporting with the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["bouncing-bunny", "minimal-ring", "three-dot-pulse"],
  faqs: [
    {
      q: "Should the preloader wait for load or DOMContentLoaded?",
      a: "`DOMContentLoaded` fires as soon as the HTML has been parsed; `load` waits for images, stylesheets and iframes as well. Use `load` when late images would make the page jump around, and `DOMContentLoaded` when you would rather reveal the page sooner. Either way, keep the time cap so one slow resource can't block the page.",
    },
    {
      q: "Does a preloader hurt SEO?",
      a: "Crawlers read the HTML underneath the overlay, so the content is still there to index. The real cost falls on visitors, who can't see content that may already be usable. Save preloaders for pages that genuinely need one, hide them as early as you can, and prefer inline loaders for anything that loads after the first view.",
    },
    {
      q: "Can I use the loader without JavaScript?",
      a: "Yes. The animation itself is pure SVG and CSS, so you can place the export anywhere as a static element. JavaScript is only needed to hide or show it, which is why the `<noscript>` rule keeps the preloader away from visitors without scripts.",
    },
    {
      q: "How do I switch to a different loader later?",
      a: "Export the new loader, replace `css/cuteloader.css`, and swap each `<svg>` element for the new one. The class names change from `cl-demo-ring` to `cl-<slug>`, so update any of your own selectors that target the old class, such as `.preloader .cl-demo-ring`.",
    },
  ],
};

export default guide;

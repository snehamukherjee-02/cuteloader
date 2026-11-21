import type { CodeLang } from "@/types/content";

export interface TechSection {
  heading: string;
  paragraphs: string[];
  code?: { lang: CodeLang; code: string; filename?: string };
}

export interface TechPage {
  path: string;
  name: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  picks: string[];
  picksHeading: string;
  sections: TechSection[];
  guides: { href: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export const TECH_PAGES: TechPage[] = [
  {
    path: "/css-loaders/",
    name: "CSS loaders",
    h1: "CSS Loading Animations",
    seoTitle: "Free CSS Loading Animations & Spinners",
    seoDescription:
      "Free CSS loading animations powered by keyframes and custom properties. Tweak color, size, speed and stroke live, then copy clean, dependency-free CSS.",
    intro:
      "Every CuteLoader animation runs on plain CSS keyframes. There's no JavaScript animation library and no GIF, just a few kilobytes of CSS you can read, edit and theme with custom properties.",
    picksHeading: "CSS spinners developers reach for first",
    picks: ["minimal-ring", "elegant-spinner", "three-dot-pulse", "wave-bars", "thin-gradient-ring", "rotating-squares", "expanding-circle", "smooth-progress-ring"],
    sections: [
      {
        heading: "Why CSS is the right engine for loaders",
        paragraphs: [
          "A loader has one job: show that something is happening without competing with the work being done. CSS animations suit that job because browsers can run transform and opacity animations off the main thread. A busy JavaScript thread, which is usually why you're showing a loader, doesn't make the spinner stutter.",
          "Each exported loader animates only compositor-friendly properties: transforms, opacity and SVG stroke offsets. Timing comes from one variable, so speeding up or slowing down the whole animation is a one-line change.",
        ],
      },
      {
        heading: "Theme any loader with CSS custom properties",
        paragraphs: [
          "Exports expose the same variables: --c1, --c2 and --c3 for colors, --d for the cycle duration, --sw for stroke width and --amp for motion intensity where supported. Override them anywhere in your cascade, including dark mode, a brand theme class, or inline on a single instance.",
        ],
        code: {
          lang: "css",
          filename: "theme.css",
          code: `/* Default colors come from the export; override per theme */
.cl-minimal-ring {
  --c1: #6366f1;   /* arc */
  --c2: #c7d2fe;   /* track */
  --d: 0.9s;       /* one rotation */
}

@media (prefers-color-scheme: dark) {
  .cl-minimal-ring { --c1: #a5b4fc; --c2: #312e81; }
}

/* A smaller, faster variant inside buttons */
.btn .cl-minimal-ring { --d: 0.7s; width: 1em; height: 1em; }`,
        },
      },
      {
        heading: "Accessible by default",
        paragraphs: [
          "Exported markup wraps the animation in an element with role=\"status\" and a visually hidden “Loading…” label, so screen readers announce it without reading SVG shapes. A prefers-reduced-motion rule multiplies the cycle duration by three, so people who turn down motion in their OS still see that work is happening, just more calmly.",
        ],
      },
    ],
    guides: [
      { href: "/guides/css/", label: "CSS customization guide" },
      { href: "/guides/html/", label: "Add a loader to plain HTML" },
      { href: "/css-spinner-generator/", label: "CSS spinner generator" },
      { href: "/blog/how-to-create-css-loading-animation/", label: "Build a CSS spinner from scratch" },
    ],
    faqs: [
      {
        q: "Are these pure CSS loaders?",
        a: "The motion is pure CSS (keyframes), and the shapes are inline SVG, which gives crisp curves, strokes and gradients that border-radius tricks can't. No JavaScript is required to run them.",
      },
      {
        q: "Can I change the speed without editing keyframes?",
        a: "Yes. Every timing in the CSS is derived from the --d variable. Set --d to a longer duration to slow the loader down, or a shorter one to speed it up. Staggered parts stay in sync.",
      },
      {
        q: "Do CSS loaders work in all browsers?",
        a: "They use widely supported features: CSS keyframes, custom properties and transforms on SVG elements, which work in current Chrome, Edge, Firefox and Safari.",
      },
    ],
  },
  {
    path: "/svg-loaders/",
    name: "SVG loaders",
    h1: "Animated SVG Loaders",
    seoTitle: "Free Animated SVG Loaders – Download & Customize",
    seoDescription:
      "Download free animated SVG loaders that work in <img> tags, CSS backgrounds or inline. Customize colors and speed first; the animation is embedded in the file.",
    intro:
      "Download any loader as a single animated SVG file. The CSS animation is embedded inside the file, so it plays wherever browsers render SVG: an <img> tag, a CSS background, or inline markup.",
    picksHeading: "Illustrated SVG loaders worth downloading",
    picks: ["blooming-flower", "infinity-loop", "circuit-pulse", "ocean-waves", "sleeping-cat", "neon-rings", "growing-plant", "moon-phases"],
    sections: [
      {
        heading: "Three ways to use an animated SVG",
        paragraphs: [
          "Inline SVG gives you the most control: you can restyle it with your own CSS and it inherits your page's custom properties. An <img> tag is the simplest. The embedded animation still plays, but your page CSS can't reach inside the file, so customize colors before downloading. A CSS background-image works the same way as <img>, which is handy for pseudo-elements and button states.",
        ],
        code: {
          lang: "html",
          filename: "index.html",
          code: `<!-- 1. As an image: simplest, animation embedded in the file -->
<img src="/loaders/blooming-flower.svg" width="96" height="96" alt="Loading…">

<!-- 2. As a background, e.g. on a busy button -->
<button class="is-loading" aria-busy="true">Saving</button>
<style>
  .is-loading::after {
    content: ""; display: inline-block; width: 1em; height: 1em;
    background: url("/loaders/minimal-ring.svg") center / contain no-repeat;
  }
</style>`,
        },
      },
      {
        heading: "What works and what doesn't",
        paragraphs: [
          "CSS animations inside an SVG file play in all modern browsers when the file is displayed as an image or inline. Scripts inside SVG files are blocked in <img> tags, which is why CuteLoader files contain no JavaScript at all. Some design tools and many email clients only show the first frame of an animated SVG. For those, use the GIF export instead.",
          "Every downloaded file is validated as well-formed XML, keeps all shapes inside its viewBox, and includes the same reduced-motion rule as the HTML export.",
        ],
      },
    ],
    guides: [
      { href: "/svg-loader-generator/", label: "SVG loader generator" },
      { href: "/blog/how-to-use-svg-loading-animations/", label: "How to use SVG loading animations" },
      { href: "/blog/css-spinner-vs-svg-loader/", label: "CSS spinner vs SVG loader" },
      { href: "/guides/html/", label: "Plain HTML guide" },
    ],
    faqs: [
      {
        q: "Will an animated SVG play inside an <img> tag?",
        a: "Yes. CSS animations embedded in the SVG file play in <img> tags in current browsers. Only scripts are blocked, and CuteLoader files don't use any.",
      },
      {
        q: "Can I change the colors after downloading?",
        a: "Open the file in a text editor and change the --c1, --c2 and --c3 values at the top of its <style> block. When used inline, you can also override those variables from your page CSS.",
      },
      {
        q: "Why does my SVG look static in a design tool?",
        a: "Many design tools and email clients render only the first frame of an animated SVG. Use the GIF export for those destinations.",
      },
    ],
  },
  {
    path: "/html-css-loaders/",
    name: "HTML & CSS loaders",
    h1: "HTML & CSS Preloaders",
    seoTitle: "Free HTML CSS Preloaders & Page Loaders",
    seoDescription:
      "Copy-paste HTML and CSS preloaders for any website. Show a page loader until content is ready, hide it smoothly, and keep it accessible. No libraries needed.",
    intro:
      "Need a preloader for a static site, a landing page or a CMS theme? Every loader exports as a small HTML snippet plus a CSS block. Paste both, hide the loader when the page is ready, and you're done.",
    picksHeading: "Loaders that make great page preloaders",
    picks: ["bouncing-bunny", "line-loader", "pixel-loading", "three-dot-pulse", "gradient-waves", "firefly-glow", "code-brackets", "minimal-ring"],
    sections: [
      {
        heading: "A full-page preloader in a few lines",
        paragraphs: [
          "Put the exported loader inside a fixed overlay at the top of <body>, then remove it when the window finishes loading. Keep the overlay out of the way of your largest content: a preloader that hides the page for longer than necessary hurts both perceived speed and Largest Contentful Paint.",
        ],
        code: {
          lang: "html",
          filename: "index.html",
          code: `<body>
  <div id="preloader" class="preloader">
    <!-- paste the HTML export here (div.cl-wrap with the SVG) -->
  </div>

  <!-- your page -->

  <script>
    window.addEventListener("load", function () {
      var el = document.getElementById("preloader");
      el.classList.add("is-done");
      el.addEventListener("transitionend", function () { el.remove(); }, { once: true });
    });
  </script>
</body>

<style>
  .preloader { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center;
               background: #fff; transition: opacity .3s ease; }
  .preloader.is-done { opacity: 0; pointer-events: none; }
</style>`,
        },
      },
      {
        heading: "Inline loaders for sections and buttons",
        paragraphs: [
          "Preloaders aren't the only use. The same snippet works inside a card while its data loads, in a table body, or in a button during a form submit. Set the loader's width and height to match the context: 16–20px in buttons, 32–48px in cards, larger for empty states.",
          "Toggle the hidden attribute (or remove the element) when the content arrives, and set aria-busy=\"true\" on the region that is updating so assistive technology knows to wait.",
        ],
      },
    ],
    guides: [
      { href: "/guides/html/", label: "Plain HTML guide" },
      { href: "/guides/css/", label: "CSS guide" },
      { href: "/blog/how-to-create-a-cute-website-preloader/", label: "Create a cute website preloader" },
      { href: "/blog/website-loading-animation-best-practices/", label: "Loading animation best practices" },
    ],
    faqs: [
      {
        q: "Should I show a preloader on every page?",
        a: "Usually not. Preloaders make sense for heavy single-page apps or experiences that truly need assets before they can work. For content pages, render content as fast as possible and use inline loaders only for parts that load later.",
      },
      {
        q: "How do I hide the loader when the page is ready?",
        a: "Listen for the window load event (or your app's own ready signal), then fade the overlay out and remove it from the DOM so it can't block clicks.",
      },
      {
        q: "Does the HTML export work in WordPress or Webflow?",
        a: "Yes. Use the Embed export, which combines the styles and markup into one snippet you can paste into a custom HTML block.",
      },
    ],
  },
  {
    path: "/react-loaders/",
    name: "React loaders",
    h1: "React Loading Spinners",
    seoTitle: "Free React Loading Spinners (TypeScript)",
    seoDescription:
      "Free React loading spinners as typed, dependency-free TSX components. Customize first, then export a component with size, color and speed props.",
    intro:
      "Export any loader as a self-contained React component written in TypeScript. You get props for size, colors and speed, an accessible status role, and zero dependencies. Drop the file into your components folder and import it.",
    picksHeading: "Popular picks for React apps",
    picks: ["elegant-spinner", "bubble-friends", "ai-neural-pulse", "smooth-progress-ring", "colorful-blob", "terminal-typing", "wave-bars", "cute-planet"],
    sections: [
      {
        heading: "What the React export looks like",
        paragraphs: [
          "The generated component renders a wrapper with role=\"status\", the SVG, a visually hidden label, and a scoped <style> element. It uses no hooks and no context, so it renders anywhere: client components, Server Components, Suspense fallbacks and portals.",
        ],
        code: {
          lang: "tsx",
          filename: "Orders.tsx",
          code: `import { Suspense, lazy } from "react";
import { ElegantSpinnerLoader } from "./ElegantSpinnerLoader";

const OrdersTable = lazy(() => import("./OrdersTable"));

export function Orders() {
  return (
    <Suspense fallback={<ElegantSpinnerLoader size={48} primary="#6366f1" label="Loading orders" />}>
      <OrdersTable />
    </Suspense>
  );
}`,
        },
      },
      {
        heading: "Avoid the flash on fast requests",
        paragraphs: [
          "If a request usually finishes in under 200ms, showing a spinner can make the interface feel slower, because the spinner appears and vanishes in a blink. Delay showing it briefly, and once it's visible keep it on screen long enough to read as intentional. Our React article walks through a small useDelayedFlag hook for exactly this.",
        ],
      },
    ],
    guides: [
      { href: "/guides/react/", label: "React integration guide" },
      { href: "/guides/nextjs/", label: "Next.js guide" },
      { href: "/blog/how-to-add-loading-animations-in-react/", label: "Loading animation patterns in React" },
      { href: "/loading-animation-generator/", label: "Loading animation generator" },
    ],
    faqs: [
      {
        q: "Do I need to install a package?",
        a: "No. The export is a single .tsx file with no imports beyond React's types. Copy it into your project and import it like any other component.",
      },
      {
        q: "Does it work with Next.js Server Components?",
        a: "Yes. The component has no hooks or browser APIs, so it can render on the server, in loading.tsx files, and as a Suspense fallback.",
      },
      {
        q: "Can I use it in JavaScript instead of TypeScript?",
        a: "Yes. Rename the file to .jsx and delete the type annotations (the props interface and the CSSProperties cast). The rest is plain JSX.",
      },
    ],
  },
  {
    path: "/javascript-loaders/",
    name: "JavaScript loaders",
    h1: "JavaScript Loading Animations",
    seoTitle: "JavaScript Loading Animations with Show/Hide API",
    seoDescription:
      "Free JavaScript loading animations with a tiny show/hide/track API. Wrap any fetch call in a full-screen loader, avoid flashes with a delay, and stay accessible.",
    intro:
      "Prefer a single script tag? The JavaScript export bundles a loader's CSS and SVG with a tiny API: show, hide, mount and track. Wrap a fetch call and the overlay appears and disappears on its own.",
    picksHeading: "Loaders that suit async overlays",
    picks: ["data-transfer", "processing-gears", "line-loader", "orbiting-dots", "raindrops", "connected-nodes", "three-dot-pulse", "floating-cloud"],
    sections: [
      {
        heading: "The four-method API",
        paragraphs: [
          "CuteLoader.show() displays a full-screen overlay, and CuteLoader.hide() removes it. Calls are reference-counted, so parallel requests don't hide the overlay too early. CuteLoader.track(promise) does both around a promise. CuteLoader.mount(target) inserts an inline loader into any element. A delay option skips the overlay entirely for requests that finish quickly.",
        ],
        code: {
          lang: "js",
          filename: "app.js",
          code: `// After <script src="processing-gears.js"></script>
async function loadReport() {
  const res = await CuteLoader.track(fetch("/api/report"), { delay: 200 });
  if (!res.ok) throw new Error("Report failed to load");
  render(await res.json());
}

// Inline loader inside a card
const card = document.querySelector("#stats");
const spinner = CuteLoader.mount(card, { label: "Loading stats" });
fetchStats().finally(() => spinner.remove());`,
        },
      },
      {
        heading: "Safe and self-contained",
        paragraphs: [
          "The script injects its own scoped stylesheet once, creates DOM nodes with standard APIs, and writes the animation markup from a constant generated by CuteLoader. It never evaluates remote code. It works without build tools, which makes it a good fit for server-rendered sites, legacy apps and CMS themes.",
        ],
      },
    ],
    guides: [
      { href: "/guides/javascript/", label: "JavaScript guide" },
      { href: "/blog/add-loader-to-ajax-request/", label: "Add a loader to an AJAX request" },
      { href: "/blog/improve-perceived-loading-speed-with-animations/", label: "Improve perceived loading speed" },
      { href: "/guides/html/", label: "Plain HTML guide" },
    ],
    faqs: [
      {
        q: "Can I show the loader for several requests at once?",
        a: "Yes. show() and hide() are reference-counted: the overlay stays up until every show() has a matching hide(). track() handles this automatically.",
      },
      {
        q: "How do I avoid a flash for fast responses?",
        a: "Pass a delay, for example CuteLoader.show({ delay: 200 }). If hide() is called before the delay ends, the overlay never appears.",
      },
      {
        q: "Does it work with jQuery or axios?",
        a: "Yes. Call show() and hide() from jQuery's ajaxStart/ajaxStop, or from axios request and response interceptors.",
      },
    ],
  },
  {
    path: "/aspnet-loaders/",
    name: "ASP.NET loaders",
    h1: "Loading Animations for ASP.NET",
    seoTitle: "ASP.NET Loading Animations (Core, MVC, Web Forms)",
    seoDescription:
      "Add loading animations to ASP.NET Core, MVC 5 and Web Forms sites: Razor partials, AJAX and fetch patterns, UpdateProgress and PageRequestManager examples.",
    intro:
      "CuteLoader exports are plain HTML, CSS and SVG, which makes them a natural fit for server-rendered ASP.NET apps. Put the markup in a partial or master page, then show it around AJAX calls, form posts or UpdatePanel refreshes.",
    picksHeading: "Professional loaders for business apps",
    picks: ["minimal-ring", "smooth-progress-ring", "processing-gears", "line-loader", "rotating-diamond", "three-dot-pulse", "digital-scanner", "wave-bars"],
    sections: [
      {
        heading: "ASP.NET Core: a reusable Razor partial",
        paragraphs: [
          "Save the exported CSS to wwwroot/css and the markup to a partial view. Render the partial once in _Layout.cshtml, keep it hidden, and toggle it from your scripts. Because it's a regular partial, it works in MVC views and Razor Pages alike.",
        ],
        code: {
          lang: "cshtml",
          filename: "Views/Shared/_Loader.cshtml",
          code: `<div id="page-loader" class="cl-overlay" hidden>
    @* paste the HTML export here (div.cl-wrap with the SVG) *@
</div>

@* In _Layout.cshtml, before the closing body tag *@
@* <partial name="_Loader" /> *@`,
        },
      },
      {
        heading: "MVC 5 and Web Forms",
        paragraphs: [
          "In MVC 5, wire the loader to jQuery's global ajaxStart and ajaxStop events, or point Ajax.BeginForm's LoadingElementId at it. In Web Forms, drop the markup into an UpdateProgress template, or handle PageRequestManager's beginRequest and endRequest events for a custom overlay. Our guides cover each approach end to end, including full postbacks and error handling.",
        ],
        code: {
          lang: "js",
          filename: "site.js",
          code: `// ASP.NET MVC 5 with jQuery: show for every AJAX request on the page
$(document)
  .ajaxStart(function () { $("#page-loader").prop("hidden", false); })
  .ajaxStop(function () { $("#page-loader").prop("hidden", true); });`,
        },
      },
    ],
    guides: [
      { href: "/guides/aspnet-core-mvc/", label: "ASP.NET Core MVC guide" },
      { href: "/guides/aspnet-mvc/", label: "ASP.NET MVC 5 guide" },
      { href: "/guides/aspnet-webforms/", label: "ASP.NET Web Forms guide" },
      { href: "/blog/add-loading-animation-to-aspnet-website/", label: "ASP.NET loading animation overview" },
    ],
    faqs: [
      {
        q: "Do I need a NuGet package?",
        a: "No. Exports are static HTML, CSS and SVG. Add the CSS file to wwwroot (Core) or Content (MVC 5) and paste the markup into a view, partial or master page.",
      },
      {
        q: "How do I show the loader during an UpdatePanel refresh?",
        a: "Put the loader markup inside an UpdateProgress ProgressTemplate associated with the UpdatePanel, or use Sys.WebForms.PageRequestManager's beginRequest and endRequest events to toggle a custom overlay.",
      },
      {
        q: "Does it work with ASP.NET Core's antiforgery protection?",
        a: "The loader is independent of your requests. When you post with fetch, send the antiforgery token as usual (for example in the RequestVerificationToken header) and toggle the loader around the call.",
      },
    ],
  },
];

export function getTechPage(path: string): TechPage | undefined {
  return TECH_PAGES.find((p) => p.path === path);
}

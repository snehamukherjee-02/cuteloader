# CuteLoader

**Beautiful website loaders. Customize, copy, and use. Free forever.**

CuteLoader is a free library of 84 original website loading animations (12 in each of seven
categories) with a live customization studio and code export. Every loader is a few kilobytes of
inline SVG and CSS keyframes: no images, no animation library, no signup.

## Features

- **84 hand-built loaders** in seven categories: Cute & Playful, Abstract & Creative, Minimal & Professional,
  Technology & Coding, Nature & Aesthetic, Business & E-commerce, Food & Drinks. Each is genuinely animated, distinct, and respects `prefers-reduced-motion`.
- **Customization studio** on every loader page: color roles (labeled per loader), background or transparency,
  size, speed, stroke width, intensity and direction (shown only where supported), loop on/off, play/pause,
  restart, light/dark/transparent preview, zoom, undo/redo (Ctrl+Z / Ctrl+Shift+Z), reset, palette shuffle,
  copy/download/load configuration JSON, and share links.
- **Export** in six formats, all generated from the same engine as the preview:
  HTML + CSS (plus a downloadable standalone demo page), React + TypeScript component, animated SVG file,
  plain JavaScript (`CuteLoader.mount/show/hide/track`), one-piece embed snippet, and **animated GIF**
  (rendered in the browser). Optional attribution link, on by default, removable.
- **Search & filters**: instant search with suggestions, category, animation type, color family, favorites
  (stored locally), sorting (featured, newest, A–Z), URL-synced, no page reloads.
- **Generators**: loading animation generator, CSS spinner generator, SVG loader generator.
- **SEO**: static generation, unique metadata, canonical URLs, sitemap, robots, Open Graph images,
  JSON-LD structured data, breadcrumbs, technology landing pages, integration guides, and a blog.
- **Monetization-ready, user-first**: optional attribution, consent-gated GA4 and AdSense with reserved
  ad slots away from tools and code, a moderated project showcase, and premium-ready data fields (no payments).
- **Accessible**: keyboard navigation, visible focus, labeled controls, `role="status"` loaders with hidden
  labels, light/dark themes, responsive from phones to desktops.

## Quick start

Requirements: **Node.js 20.9+** (Node 24 recommended; the QA scripts use Node's built-in TypeScript support).

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start            # http://localhost:3000
```

Copy `.env.example` to `.env.local` to configure the site URL, analytics, AdSense, verification tokens
and GitHub links. All of them are optional for local development.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` | TypeScript, strict |
| `npm run lint` | ESLint |
| `npm run check:animations [category]` | Lints every loader definition, renders each in headless Chrome, freezes frames at 0/25/50/75%, checks motion, viewBox bounds, seamless loop timing, valid standalone SVG; writes a filmstrip to `.scratch/` |
| `npm run test:exports` | Generates every export for every loader (default + customized) and verifies them outside the app: standalone HTML and embed pages animate, SVG files are valid and load as `<img>`, the JS API behaves (reference counting, delay, track), React components pass `tsc --strict` and render with `react-dom/server` |
| `npm test` | Both of the above |
| `npm run og` | Regenerates Open Graph images, icons and favicon with headless Chrome |
| `node --import ./scripts/register.mjs scripts/test-gif.ts` | Renders GIFs in Chrome and validates them with an independent GIF decoder |
| `node --import ./scripts/register.mjs scripts/smoke.ts <url>` | Crawls every sitemap URL: status, console errors, H1, titles/descriptions, canonical, OG, JSON-LD, broken links |

QA scripts need Chrome or Edge (auto-detected; override with `CHROME_PATH`).

## Project structure

```
src/
  animations/   the loader library (one file per category) + registry
  lib/          engine, code generators, GIF encoder, SEO, search, analytics
  components/   layout, cards, studio, export panel, content renderer
  content/      blog articles and integration guides (typed data)
  data/         categories, technology pages, SEO overrides, showcase
  app/          routes, sitemap, robots, manifest, ads.txt
scripts/        QA + asset tooling
docs/           architecture, authoring, deployment, SEO/analytics/ads
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md): how the engine works, performance, security, future backend schema
- [Animation authoring](docs/ANIMATION_AUTHORING.md): the contract for adding loaders
- [Deployment](docs/DEPLOYMENT.md): Vercel, Cloudflare, Netlify, any Node host
- [SEO, analytics & ads](docs/SEO-ANALYTICS-ADS.md): Search Console, Bing, GA4, AdSense, events, content strategy

## Adding a loader

1. Add an `AnimationSource` object to the right file in `src/animations/` (see the authoring guide).
2. `npm run check:animations -- <category>` until it reports 0 errors, and look at the filmstrip.
3. `npm run test:exports`, then `npm run og` to create its social image.

The loader automatically gets a page, a sitemap entry, search indexing, related-loader links, and all exports.

## License

Loaders and generated code are free for personal and commercial use; attribution is appreciated but optional.
See `/license/` on the site for the full terms.

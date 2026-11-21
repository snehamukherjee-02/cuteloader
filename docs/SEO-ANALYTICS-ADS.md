# SEO, analytics and advertising

None of this can guarantee rankings, indexing or ad approval. It makes the site technically
sound and easy to measure; results depend on content quality, links and time.

## What's already built in

| Area | Implementation |
|---|---|
| Rendering | Every indexable page is statically generated; content is in the HTML, no client rendering needed to read it |
| URLs | Clean, trailing-slash paths: `/animations/<category>/<slug>/`, `/blog/<slug>/`, `/guides/<slug>/` |
| Metadata | Unique `<title>` + description per page (`src/lib/seo.ts → pageMetadata`), canonical URLs, Open Graph + X cards with per-page images |
| Sitemap | `/sitemap.xml` (`src/app/sitemap.ts`): canonical, indexable URLs only (noindex overrides are excluded) |
| robots.txt | `/robots.txt`: allows everything in production and points to the sitemap; **disallows all on Vercel preview deployments** |
| Structured data | WebSite + Organization (every page), BreadcrumbList, CreativeWork (loader pages), ItemList (category/index pages), Article (blog + guides), WebApplication (generators). No ratings, reviews, prices beyond the true "free" offer, or download counts are emitted |
| FAQ | Visible FAQs only. FAQPage markup is intentionally **not** emitted: Google limits FAQ rich results to authoritative government/health sites |
| 404 | `src/app/not-found.tsx` returns a real 404 with `noindex` |
| Redirects | `/animations/professional/` → `/animations/minimal/`, `/generator/` → `/loading-animation-generator/` (308) |
| Performance | Static HTML, self-hosted fonts via `next/font`, lightweight SVG/CSS previews, off-screen previews paused, no third-party scripts until consent |

## Editing SEO without touching code

`src/data/seo.ts` holds per-path overrides for title, description, canonical, noindex and OG image.
Category copy is in `src/data/categories.ts`, technology pages in `src/data/tech-pages.ts`,
blog articles in `src/content/blog/`, guides in `src/content/guides/`.

To regenerate social images after adding loaders or articles: `npm run og` (needs Chrome).

## Validating

- Run `npm run build && npm start`, then `node --import ./scripts/register.mjs scripts/smoke.ts http://localhost:3000`.
  This checks every sitemap URL for HTTP status, console errors, one H1, unique titles and descriptions,
  canonical correctness, OG images, JSON-LD validity and broken internal links.
- Paste a few URLs into Google's [Rich Results Test](https://search.google.com/test/rich-results)
  and the [Schema Markup Validator](https://validator.schema.org/).
- Run Lighthouse in Chrome DevTools on the homepage, a category page and a loader page.

## Google Search Console

1. Deploy with `NEXT_PUBLIC_SITE_URL` set to your final domain (https).
2. In [Search Console](https://search.google.com/search-console), add a **URL-prefix** property for
   that domain and choose the **HTML tag** method.
3. Copy only the `content` value of the tag into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify.
   (A Domain property verified via DNS also works and needs no code.)
4. Submit `https://your-domain/sitemap.xml` under **Sitemaps**.
5. Use **URL Inspection → Request indexing** for the homepage and a few key pages. After that,
   watch **Pages** and **Performance** over the following weeks.

## Bing Webmaster Tools

Either import the site from Search Console (fastest), or add it manually, choose the meta-tag
option and put the token in `NEXT_PUBLIC_BING_SITE_VERIFICATION`. Then submit the sitemap.

## Google Analytics 4

1. Create a GA4 property and a Web data stream; copy the Measurement ID (`G-…`).
2. Set `NEXT_PUBLIC_GA_ID` and redeploy.
3. A consent banner appears. GA loads only after the visitor clicks Accept. Visitors can
   change their choice anytime via "Cookie settings" in the footer.

Custom events (no personal data) sent via `track()` in `src/lib/analytics.ts`:

| Event | When |
|---|---|
| `animation_preview` | A loader page opens or the generator switches loader |
| `customize_click` | First change in the studio |
| `copy_code` | Code copied (param `format`: html, css, react, svg, js, embed) |
| `download` | File downloaded (`format`: html, css, react, svg, js, gif, config, html-document) |
| `search` | Search submitted or typed (query truncated to 60 chars) |
| `category_view` | A category page opens |
| `project_submit` | Showcase form submitted |
| `attribution_toggle` | Attribution switched on/off in the export panel |
| `favorite_toggle` | A loader is saved or removed from favorites |
| `gif_export` | A GIF finished rendering |

Mark `copy_code` and `download` as key events in GA4 to track real usage.

If you serve visitors in the EU/UK and enable AdSense, Google requires a Google-certified
consent management platform (CMP). The built-in banner is a simple opt-in gate. Swap it for a
certified CMP before showing personalized ads there.

## Google AdSense

1. Apply at [AdSense](https://adsense.google.com/) with your live domain. Approval is not guaranteed and
   usually requires substantial original content and a privacy policy (included at `/privacy/`).
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…`. This also enables `/ads.txt` automatically.
3. Create display ad units and set `NEXT_PUBLIC_ADSENSE_SLOT_HOME`, `NEXT_PUBLIC_ADSENSE_SLOT_BLOG`, `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER`.
4. Placements: between homepage sections, in the blog index and after article bodies, and above the footer.
   Ads never appear inside previews, over the studio controls, or in copied code. Each slot reserves its
   height to avoid layout shift, is labeled "Advertisement", and loads only after consent.
5. While designing, `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=1` outlines the placements.

## Attribution links

Exports include an optional, visible credit link (`Loading animation by CuteLoader`) that users can
switch off. It is never hidden, never redirected, and carries no tracking parameters.

## Content strategy

Keyword targeting by page type:

- Loader pages target "<name> loading animation" and long-tail variants ("cute bunny loader", "css progress ring").
- Category pages target style queries ("cute loading animations", "minimal loading spinner").
- Technology pages target stack queries ("css loading animations", "react loading spinner", "asp.net loading animation").
- Generators target tool queries ("loading animation generator", "css spinner generator", "svg loader generator").
- Blog posts and guides target how-to queries ("how to add a loader to an ajax request").

Validate these with real keyword research (Search Console queries after launch, Google Keyword Planner,
Bing Keyword Research) and adjust titles via `src/data/seo.ts`. Publish new articles only when they add
practical, tested value. Thin pages hurt more than they help.

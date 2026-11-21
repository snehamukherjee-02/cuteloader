/**
 * Editable SEO overrides, keyed by path (with trailing slash).
 *
 * Every page already generates unique metadata from its content. Use this file
 * to fine-tune a page without touching its code, for example after keyword research
 * in Google Search Console:
 *
 *   "/animations/cute/bouncing-bunny/": {
 *     title: "Bouncing Bunny Loader – Free Cute CSS Animation",
 *     description: "…",
 *   },
 *   "/some-old-page/": { noindex: true },
 *
 * Fields:
 *   title        <title> without the " | CuteLoader" suffix
 *   description  meta description (aim for 140–160 characters)
 *   canonical    absolute path or URL if this page duplicates another
 *   noindex      true = robots noindex,follow + excluded from sitemap.xml
 *   ogImage      path under /public, e.g. "/og/custom.jpg" (1200×630)
 */
export interface SeoOverride {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}

export const SEO_OVERRIDES: Record<string, SeoOverride> = {};

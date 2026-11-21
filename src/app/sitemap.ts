import type { MetadataRoute } from "next";
import { ANIMATIONS, pathFor } from "@/animations";
import { CATEGORIES } from "@/data/categories";
import { TECH_PAGES } from "@/data/tech-pages";
import { ARTICLES } from "@/content/blog";
import { GUIDES } from "@/content/guides";
import { absoluteUrl, SITE } from "@/lib/site";
import { isNoindex } from "@/lib/seo";

// Built once; required for the static export (GitHub Pages).
export const dynamic = "force-static";

// Only canonical, indexable URLs (with trailing slashes, matching the canonical tags).
export default function sitemap(): MetadataRoute.Sitemap {
  const at = SITE.launchDate;
  const entries: { path: string; lastModified: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", lastModified: at, priority: 1, changeFrequency: "weekly" },
    { path: "/animations/", lastModified: at, priority: 0.9, changeFrequency: "weekly" },
    ...CATEGORIES.map((c) => ({ path: `/animations/${c.id}/`, lastModified: at, priority: 0.8, changeFrequency: "weekly" as const })),
    ...ANIMATIONS.map((a) => ({ path: pathFor(a), lastModified: a.addedAt ?? at, priority: 0.7, changeFrequency: "monthly" as const })),
    ...TECH_PAGES.map((t) => ({ path: t.path, lastModified: at, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/loading-animation-generator/", lastModified: at, priority: 0.8, changeFrequency: "monthly" },
    { path: "/css-spinner-generator/", lastModified: at, priority: 0.7, changeFrequency: "monthly" },
    { path: "/svg-loader-generator/", lastModified: at, priority: 0.7, changeFrequency: "monthly" },
    { path: "/guides/", lastModified: at, priority: 0.6, changeFrequency: "monthly" },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}/`, lastModified: at, priority: 0.6, changeFrequency: "monthly" as const })),
    { path: "/blog/", lastModified: at, priority: 0.6, changeFrequency: "weekly" },
    ...ARTICLES.map((a) => ({
      path: `/blog/${a.slug}/`,
      lastModified: a.updatedAt ?? a.publishedAt,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    { path: "/showcase/", lastModified: at, priority: 0.4, changeFrequency: "monthly" },
    { path: "/about/", lastModified: at, priority: 0.3, changeFrequency: "yearly" },
    { path: "/license/", lastModified: at, priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy/", lastModified: at, priority: 0.2, changeFrequency: "yearly" },
  ];
  return entries
    .filter((e) => !isNoindex(e.path))
    .map((e) => ({
      url: absoluteUrl(e.path),
      lastModified: e.lastModified,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    }));
}

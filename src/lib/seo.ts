import type { Metadata } from "next";
import { SEO_OVERRIDES } from "@/data/seo";
import { SITE, absoluteUrl } from "./site";

export interface PageSeo {
  title: string;
  description: string;
  /** Canonical path with trailing slash, e.g. "/animations/cute/". */
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Use the title as-is (no " | CuteLoader" suffix). */
  absoluteTitle?: boolean;
}

export const DEFAULT_OG_IMAGE = "/og/default.jpg";

export function isNoindex(path: string): boolean {
  return !!SEO_OVERRIDES[path]?.noindex;
}

export function pageMetadata(p: PageSeo): Metadata {
  const o = SEO_OVERRIDES[p.path] ?? {};
  const title = o.title ?? p.title;
  const description = o.description ?? p.description;
  const canonical = o.canonical ?? p.path;
  const noindex = o.noindex ?? p.noindex ?? false;
  const image = o.ogImage ?? p.ogImage ?? DEFAULT_OG_IMAGE;
  const fullTitle = p.absoluteTitle ? title : `${title} | ${SITE.name}`;
  return {
    title: p.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: p.type ?? "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: canonical,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: p.ogImageAlt ?? fullTitle }],
      ...(p.type === "article"
        ? { publishedTime: p.publishedTime, modifiedTime: p.modifiedTime ?? p.publishedTime, authors: [SITE.author] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      ...(SITE.twitter ? { site: SITE.twitter } : {}),
    },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

/* ------------------------------ JSON-LD ------------------------------ */

type Json = Record<string, unknown>;

const ORG_ID = () => absoluteUrl("/#organization");
const SITE_ID = () => absoluteUrl("/#website");

export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: SITE.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon-512.png"),
    ...(SITE.github ? { sameAs: [SITE.github] } : {}),
  };
}

export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID(),
    name: SITE.name,
    url: absoluteUrl("/"),
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID() },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/animations/?q={search_term_string}") },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbLd(items: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function webApplicationLd(opts: { name: string; description: string; path: string }): Json {
  // Free is a fact here (no paid tier exists), so the zero-price offer is accurate.
  // No ratings or reviews are included because none have been collected.
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID() },
  };
}

export function creativeWorkLd(opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  keywords: string[];
  dateCreated: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: absoluteUrl(opts.image),
    keywords: opts.keywords.join(", "),
    dateCreated: opts.dateCreated,
    isAccessibleForFree: true,
    license: absoluteUrl("/license/"),
    creator: { "@id": ORG_ID() },
    encodingFormat: ["image/svg+xml", "text/html", "text/css"],
  };
}

export function itemListLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(it.path),
      name: it.name,
    })),
  };
}

export function articleLd(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.path),
    image: [absoluteUrl(opts.image)],
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt ?? opts.publishedAt,
    author: { "@type": "Organization", name: SITE.author, url: absoluteUrl("/about/") },
    publisher: { "@id": ORG_ID() },
  };
}

/** Serialize JSON-LD safely for a <script> tag (escapes "<" to prevent breaking out). */
export function serializeLd(data: Json | Json[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

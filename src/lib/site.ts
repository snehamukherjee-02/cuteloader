/**
 * Site-wide configuration. Everything deploy-specific comes from environment
 * variables so the same code runs locally, on Vercel, or on any Node host.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  // Vercel exposes the production domain at build time.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const SITE = {
  name: "CuteLoader",
  url: resolveSiteUrl(),
  tagline: "Beautiful website loaders. Customize, copy, and use. Free forever.",
  description:
    "Free, customizable website loading animations. Browse original CSS and SVG loaders, tweak colors, speed and size live, then copy HTML/CSS, React or SVG code.",
  locale: "en_US",
  author: "CuteLoader Team",
  /** Launch date of the library; used as the default "added" date. */
  launchDate: "2026-11-21",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "",
} as const;

export const NAV = [
  { href: "/animations/", label: "Explore" },
  { href: "/animations/#categories", label: "Categories" },
  { href: "/loading-animation-generator/", label: "Generator" },
  { href: "/guides/", label: "Guides" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
] as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

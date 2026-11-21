import type { MetadataRoute } from "next";
import { absoluteUrl, SITE } from "@/lib/site";

// Built once; required for the static export (GitHub Pages).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments (e.g. Vercel preview URLs) out of search results.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}

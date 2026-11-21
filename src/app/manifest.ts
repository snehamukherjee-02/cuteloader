import type { MetadataRoute } from "next";
import { SITE, withBasePath } from "@/lib/site";

// Built once; required for the static export (GitHub Pages).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} – Free Website Loading Animations`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: withBasePath("/"),
    scope: withBasePath("/"),
    display: "standalone",
    background_color: "#fbfaff",
    theme_color: "#7c5cff",
    icons: [
      { src: withBasePath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

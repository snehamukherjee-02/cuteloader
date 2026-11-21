import type { NextConfig } from "next";

// Static hosting (GitHub Pages or any file host): STATIC_EXPORT=true writes plain files to out/.
// NEXT_PUBLIC_BASE_PATH serves the site under a sub-path, e.g. "/cuteloader" on
// https://<user>.github.io/cuteloader/. Leave both unset for Vercel or a Node server.
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

const serverOnly: Pick<NextConfig, "redirects" | "headers"> = {
  async redirects() {
    return [
      // "Minimal & Professional" is one category; keep the professional URL useful.
      { source: "/animations/professional/", destination: "/animations/minimal/", permanent: true },
      { source: "/generator/", destination: "/loading-animation-generator/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const nextConfig: NextConfig = {
  // Clean, directory-style URLs: /animations/cute/bouncing-bunny/
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  ...(basePath ? { basePath } : {}),
  // Redirects and response headers need a server, so a static export skips them.
  ...(staticExport ? { output: "export" as const } : serverOnly),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

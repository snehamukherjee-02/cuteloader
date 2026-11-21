import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clean, directory-style URLs: /animations/cute/bouncing-bunny/
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
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

export default nextConfig;

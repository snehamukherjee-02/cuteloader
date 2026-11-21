// ads.txt (Authorized Digital Sellers) is required by Google AdSense.
// Generated from NEXT_PUBLIC_ADSENSE_CLIENT at build time; 404 when ads are not configured.
export const dynamic = "force-static";

export function GET() {
  const client = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").trim();
  const publisher = client.replace(/^ca-/, "");
  if (!/^pub-\d+$/.test(publisher)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(`google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

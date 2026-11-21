import { searchIndex } from "@/animations";

// Generated once at build time and served as a static file. Loaded lazily by the
// header search the first time it is focused, so it never weighs down page loads.
export const dynamic = "force-static";

export function GET() {
  const items = searchIndex().map((m) => ({
    slug: m.slug,
    name: m.name,
    category: m.category,
    kind: m.kind,
    tags: m.tags,
    color: m.color,
    popularity: m.popularity,
    order: m.order,
  }));
  return Response.json(items, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}

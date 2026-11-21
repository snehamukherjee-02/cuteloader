import { serializeLd } from "@/lib/seo";

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeLd(d) }} />
      ))}
    </>
  );
}

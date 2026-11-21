import Link from "next/link";
import { ARTICLES } from "@/content/blog";
import { Breadcrumbs, Container } from "@/components/common/ui";
import { readingMinutes } from "@/components/content/Blocks";
import { JsonLd } from "@/components/common/JsonLd";
import { AdSlot } from "@/components/common/AdSlot";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: Loading Animation Tutorials & UX Guides",
  description:
    "Practical tutorials on CSS and SVG loading animations, preloaders, AJAX loaders, React patterns and loading UX best practices, with tested code you can copy.",
  path: "/blog/",
});

export default function BlogIndex() {
  const [lead, ...rest] = ARTICLES;
  return (
    <Container className="pt-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">The CuteLoader blog</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Hands-on tutorials and honest advice about loading animations: how to build them, where to use them, and how to
          keep them fast and accessible. Every code sample is tested.
        </p>
      </header>

      {lead && (
        <Link
          href={`/blog/${lead.slug}/`}
          className="mt-10 block rounded-3xl border border-border bg-gradient-to-br from-brand-soft via-surface to-surface p-7 shadow-soft transition hover:shadow-lift sm:p-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-strong">Featured · {readingMinutes(lead.blocks)} min read</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-extrabold tracking-tight sm:text-3xl">{lead.title}</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted">{lead.excerpt}</p>
        </Link>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((a, i) => (
          <div key={a.slug} className={i === 5 ? "md:col-span-2 lg:col-span-3" : ""}>
            {i === 5 && <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG} className="mb-4" />}
            <Link
              href={`/blog/${a.slug}/`}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-xs font-semibold text-subtle">
                {a.tags.slice(0, 2).join(" · ")} · {readingMinutes(a.blocks)} min read
              </p>
              <h2 className="mt-2 text-lg font-extrabold leading-snug tracking-tight">{a.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{a.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>

      <JsonLd data={itemListLd(ARTICLES.map((a) => ({ name: a.title, path: `/blog/${a.slug}/` })))} />
    </Container>
  );
}

import Link from "next/link";
import type { Block, FAQ } from "@/types/content";
import type { Crumb } from "@/lib/seo";
import { getAnimation } from "@/animations";
import type { AnimationDef } from "@/types/animation";
import { AnimationCard } from "@/components/animations/AnimationCard";
import { Breadcrumbs, Container, FAQList } from "@/components/common/ui";
import { AdSlot } from "@/components/common/AdSlot";
import { Blocks, readingMinutes, tableOfContents } from "./Blocks";
import { Inline } from "./Inline";
import { SITE } from "@/lib/site";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ArticleLayout({
  crumbs,
  eyebrow,
  title,
  intro,
  publishedAt,
  updatedAt,
  blocks,
  faqs,
  relatedAnimations,
  more,
  adSlot,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  publishedAt?: string;
  updatedAt?: string;
  blocks: Block[];
  faqs?: FAQ[];
  relatedAnimations: string[];
  more?: { href: string; title: string; text: string }[];
  adSlot?: string;
}) {
  const toc = tableOfContents(blocks);
  const minutes = readingMinutes(blocks);
  const related = relatedAnimations.map((s) => getAnimation(s)).filter((a): a is AnimationDef => !!a).slice(0, 4);
  return (
    <Container className="pt-8">
      <Breadcrumbs items={crumbs} />
      <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_250px]">
        <article className="min-w-0 max-w-3xl">
          <header className="border-b border-border pb-8">
            {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-strong">{eyebrow}</p>}
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.6rem]">{title}</h1>
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-muted">
                <Inline text={intro} />
              </p>
            )}
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-subtle">
              <span>
                By{" "}
                <Link href="/about/" className="font-semibold text-muted hover:text-text">
                  {SITE.author}
                </Link>
              </span>
              {publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                  </span>
                </>
              )}
              {updatedAt && updatedAt !== publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{minutes} min read</span>
            </p>
          </header>

          <div className="mt-8">
            <Blocks blocks={blocks} />
          </div>

          <AdSlot slot={adSlot} className="mt-12" />

          {faqs && faqs.length > 0 && (
            <div className="mt-14">
              <FAQList faqs={faqs} />
            </div>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {toc.length > 1 && (
              <nav aria-label="On this page">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">On this page</p>
                <ul className="mt-3 space-y-2 border-l border-border text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-3 text-muted hover:border-brand hover:text-text">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {related.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Loaders in this article</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/animations/${a.category}/${a.slug}/`} className="font-medium text-brand-strong hover:underline">
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-loaders" className="mt-16">
          <h2 id="related-loaders" className="mb-5 text-2xl font-extrabold tracking-tight">
            Loaders mentioned in this article
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((a, i) => (
              <AnimationCard key={a.slug} def={a} variant={i} />
            ))}
          </div>
        </section>
      )}

      {more && more.length > 0 && (
        <section aria-labelledby="more-reading" className="mt-16">
          <h2 id="more-reading" className="mb-5 text-2xl font-extrabold tracking-tight">
            Keep reading
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.href} href={m.href} className="rounded-3xl border border-border bg-surface p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                <h3 className="font-bold leading-snug">{m.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{m.text}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

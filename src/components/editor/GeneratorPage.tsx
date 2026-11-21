import Link from "next/link";
import { ANIMATIONS, getAnimation } from "@/animations";
import type { AnimationDef } from "@/types/animation";
import { Studio } from "./Studio";
import type { ExportTab } from "@/components/export/ExportPanel";
import { Breadcrumbs, Container, FAQList } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { webApplicationLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { CATEGORY_MAP } from "@/data/categories";

export interface GeneratorContent {
  path: string;
  name: string;
  h1: string;
  intro: string;
  defaultSlug: string;
  initialTab: ExportTab;
  filter?: (a: AnimationDef) => boolean;
  steps: { title: string; text: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  links: { href: string; label: string }[];
}

export function GeneratorPage({ content }: { content: GeneratorContent }) {
  const pool = content.filter ? ANIMATIONS.filter(content.filter) : ANIMATIONS;
  const def = getAnimation(content.defaultSlug) ?? pool[0];
  const catalog = pool.map((a) => ({
    slug: a.slug,
    name: a.name,
    category: a.category,
    categoryName: CATEGORY_MAP[a.category]?.name,
  }));
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: content.name, path: content.path },
          ]}
        />
        <header className="mt-5 max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">{content.h1}</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">{content.intro}</p>
        </header>
        <div id="studio" className="mt-8 scroll-mt-20">
          <Studio def={def} siteUrl={SITE.url} catalog={catalog} initialTab={content.initialTab} sharePath={content.path} />
        </div>
      </Container>

      <Container className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="how-heading">
            <h2 id="how-heading" className="text-2xl font-extrabold tracking-tight">
              How to use the {content.name.toLowerCase()}
            </h2>
            <ol className="mt-5 space-y-4">
              {content.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand-strong">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-extrabold tracking-tight">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-lg font-extrabold tracking-tight">Related tools & guides</h2>
          <ul className="mt-4 space-y-2.5">
            {content.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[15px] font-semibold text-brand-strong hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <Container className="mt-16 max-w-3xl">
        <FAQList faqs={content.faqs} />
      </Container>

      <JsonLd data={webApplicationLd({ name: content.h1, description: content.intro, path: content.path })} />
    </>
  );
}

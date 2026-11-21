import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TechPage } from "@/data/tech-pages";
import { getAnimation } from "@/animations";
import type { AnimationDef } from "@/types/animation";
import { AnimationGrid } from "@/components/animations/AnimationCard";
import { Breadcrumbs, ButtonLink, Container, FAQList } from "@/components/common/ui";
import { CodeBlock } from "./Blocks";

export function TechPageView({ page }: { page: TechPage }) {
  const picks = page.picks.map((s) => getAnimation(s)).filter((a): a is AnimationDef => !!a);
  return (
    <Container className="pt-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.name, path: page.path },
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{page.intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/animations/">
            Browse all loaders <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={page.guides[0].href} variant="secondary">
            {page.guides[0].label}
          </ButtonLink>
        </div>
      </header>

      <section aria-labelledby="picks" className="mt-12">
        <h2 id="picks" className="mb-5 text-2xl font-extrabold tracking-tight">
          {page.picksHeading}
        </h2>
        <AnimationGrid items={picks} />
      </section>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-12">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-extrabold tracking-tight">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              {s.code && (
                <div className="mt-5">
                  <CodeBlock lang={s.code.lang} code={s.code.code} filename={s.code.filename} />
                </div>
              )}
            </section>
          ))}
        </div>
        <aside aria-labelledby="next-steps" className="h-fit rounded-3xl border border-border bg-surface p-6 shadow-soft lg:sticky lg:top-24">
          <h2 id="next-steps" className="text-lg font-extrabold tracking-tight">
            Keep going
          </h2>
          <ul className="mt-4 space-y-3">
            {page.guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="group flex items-center justify-between gap-3 text-[15px] font-semibold hover:text-brand-strong">
                  {g.label}
                  <ArrowRight className="h-4 w-4 shrink-0 text-subtle group-hover:text-brand-strong" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-16 max-w-3xl">
        <FAQList faqs={page.faqs} />
      </div>
    </Container>
  );
}

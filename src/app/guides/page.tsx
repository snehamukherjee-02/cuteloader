import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@/content/guides";
import { Breadcrumbs, Container } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Loading Animation Integration Guides (React, ASP.NET…)",
  description:
    "Step-by-step guides to add loading animations to HTML, CSS, JavaScript, React, Next.js, Vue, Angular, ASP.NET Core, ASP.NET MVC and Web Forms projects.",
  path: "/guides/",
});

const GROUPS = [
  { title: "Web fundamentals", slugs: ["html", "css", "javascript"] },
  { title: "Frontend frameworks", slugs: ["react", "nextjs", "vue", "angular"] },
  { title: "ASP.NET", slugs: ["aspnet-core-mvc", "aspnet-mvc", "aspnet-webforms"] },
];

export default function GuidesIndex() {
  return (
    <Container className="pt-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides/" },
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Integration guides</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Working, copy-paste examples for adding a CuteLoader animation to your stack: where the markup goes, how to show
          it during async work, how to hide it when data arrives, and how to keep it accessible.
        </p>
      </header>
      {GROUPS.map((g) => {
        const items = g.slugs.map((s) => GUIDES.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => !!x);
        if (!items.length) return null;
        return (
          <section key={g.title} className="mt-12" aria-labelledby={`g-${g.title}`}>
            <h2 id={`g-${g.title}`} className="mb-4 text-xl font-extrabold tracking-tight">
              {g.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}/`}
                  className="group flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-strong">{guide.framework}</span>
                  <span className="mt-2 text-lg font-extrabold leading-snug tracking-tight">{guide.title}</span>
                  <span className="mt-2 flex-1 text-sm text-muted">{guide.summary}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
                    Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
      <JsonLd data={itemListLd(GUIDES.map((g) => ({ name: g.title, path: `/guides/${g.slug}/` })))} />
    </Container>
  );
}

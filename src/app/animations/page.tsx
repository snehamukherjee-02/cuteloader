import { ANIMATIONS, searchIndex } from "@/animations";
import { CATEGORIES } from "@/data/categories";
import { AnimationCard } from "@/components/animations/AnimationCard";
import { CategoryCard } from "@/components/animations/CategoryCard";
import { ExploreView, type ExploreEntry } from "@/components/search/ExploreView";
import { Breadcrumbs, Container } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Explore ${ANIMATIONS.length} Free Loading Animations (CSS & SVG)`,
  description:
    `Browse ${ANIMATIONS.length} free loading animations: cute characters, minimal spinners, tech and nature loaders. Search, filter by style or color, customize and copy the code.`,
  path: "/animations/",
});

export default function AnimationsPage() {
  const meta = new Map(searchIndex().map((m) => [m.slug, m]));
  const entries: ExploreEntry[] = [...ANIMATIONS]
    .sort((a, b) => b.popularity - a.popularity)
    .map((a, i) => ({
      meta: meta.get(a.slug)!,
      card: <AnimationCard def={a} variant={i} headingLevel={3} />,
    }));

  return (
    <Container className="pt-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Animations", path: "/animations/" },
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Free loading animations</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {ANIMATIONS.length} original loaders, each a few kilobytes of SVG and CSS. Open any loader to change its colors, size
          and speed, then copy HTML/CSS, React, SVG, JavaScript or GIF. No account needed.
        </p>
      </header>

      <section id="categories" aria-labelledby="categories-heading" className="mt-10 scroll-mt-24">
        <h2 id="categories-heading" className="mb-4 text-xl font-extrabold tracking-tight">
          Browse by category
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      <section aria-labelledby="all-heading" className="mt-12">
        <h2 id="all-heading" className="mb-2 text-xl font-extrabold tracking-tight">
          All loaders
        </h2>
        <ExploreView entries={entries} categories={CATEGORIES.map((c) => ({ id: c.id, label: c.shortName }))} />
      </section>

      <JsonLd data={itemListLd(ANIMATIONS.map((a) => ({ name: a.name, path: `/animations/${a.category}/${a.slug}/` })))} />
    </Container>
  );
}

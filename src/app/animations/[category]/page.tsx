import Link from "next/link";
import { notFound } from "next/navigation";
import { animationsIn, pathFor } from "@/animations";
import { CATEGORIES, getCategory } from "@/data/categories";
import { AnimationGrid } from "@/components/animations/AnimationCard";
import { Breadcrumbs, Container, FAQList } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { TrackView } from "@/components/common/TrackView";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/animations/[category]">) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return pageMetadata({
    title: cat.seoTitle,
    description: cat.seoDescription,
    path: `/animations/${cat.id}/`,
    ogImage: `/og/category-${cat.id}.jpg`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/animations/[category]">) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const items = animationsIn(cat.id).sort((a, b) => b.popularity - a.popularity);
  const others = CATEGORIES.filter((c) => c.id !== cat.id);

  return (
    <Container className="pt-8">
      <TrackView event="category_view" params={{ category: cat.id }} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Animations", path: "/animations/" },
          { name: cat.name, path: `/animations/${cat.id}/` },
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: `color-mix(in srgb, ${cat.accent} 75%, var(--text))` }}>
          {items.length} free loaders
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{cat.name} Loading Animations</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{cat.intro}</p>
      </header>

      <section aria-label={`${cat.name} loaders`} className="mt-10">
        <AnimationGrid items={items} headingLevel={2} />
      </section>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="about-cat" className="max-w-2xl">
          <h2 id="about-cat" className="text-2xl font-extrabold tracking-tight">
            When to use {cat.shortName.toLowerCase()} loaders
          </h2>
          <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted">
            {cat.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <h3 className="mt-8 text-lg font-bold">Every loader in this collection</h3>
          <ul className="mt-3 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-2">
            {items.map((a) => (
              <li key={a.slug}>
                <Link href={pathFor(a)} className="font-medium text-brand-strong hover:underline">
                  {a.name} loading animation
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <aside aria-labelledby="more-cats" className="h-fit rounded-3xl border border-border bg-surface p-6">
          <h2 id="more-cats" className="text-lg font-extrabold tracking-tight">
            Explore other styles
          </h2>
          <ul className="mt-4 space-y-3">
            {others.map((c) => (
              <li key={c.id}>
                <Link href={`/animations/${c.id}/`} className="group block">
                  <span className="font-semibold group-hover:text-brand-strong">{c.name}</span>
                  <span className="block text-sm text-muted">{c.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-5 text-sm text-muted">
            Need a specific setup?{" "}
            <Link href="/loading-animation-generator/" className="font-semibold text-brand-strong hover:underline">
              Open the generator
            </Link>{" "}
            or read the{" "}
            <Link href="/guides/" className="font-semibold text-brand-strong hover:underline">
              integration guides
            </Link>
            .
          </div>
        </aside>
      </div>

      <div className="mt-16 max-w-3xl">
        <FAQList faqs={cat.faqs} title={`${cat.shortName} loaders: FAQ`} />
      </div>

      <JsonLd data={itemListLd(items.map((a) => ({ name: a.name, path: pathFor(a) })))} />
    </Container>
  );
}

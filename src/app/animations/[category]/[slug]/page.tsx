import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ANIMATIONS, getAnimation, getAnimationIn, pathFor } from "@/animations";
import { getCategory } from "@/data/categories";
import type { AnimationDef } from "@/types/animation";
import { AnimationCard } from "@/components/animations/AnimationCard";
import { Studio } from "@/components/editor/Studio";
import { Breadcrumbs, Container, FAQList, Pill } from "@/components/common/ui";
import { CodeBlock } from "@/components/content/Blocks";
import { JsonLd } from "@/components/common/JsonLd";
import { TrackView } from "@/components/common/TrackView";
import { creativeWorkLd, pageMetadata } from "@/lib/seo";
import { buildCss, buildSvg, defaultConfig } from "@/lib/engine";
import { componentName } from "@/lib/codegen";
import { KIND_LABELS } from "@/lib/search";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ANIMATIONS.map((a) => ({ category: a.category, slug: a.slug }));
}

function metaDescription(a: AnimationDef): string {
  const tail = " Customize colors, speed and size, then copy free HTML/CSS, React or SVG code.";
  if (a.description.length + tail.length <= 160) return a.description + tail;
  const short = " Customize it and copy free HTML/CSS or React code.";
  if (a.description.length + short.length <= 165) return a.description + short;
  return a.description;
}

export async function generateMetadata({ params }: PageProps<"/animations/[category]/[slug]">) {
  const { category, slug } = await params;
  const a = getAnimationIn(category, slug);
  if (!a) return {};
  const cat = getCategory(a.category)!;
  const adjective = { cute: "Cute", abstract: "Abstract", minimal: "Minimal", technology: "Tech", nature: "Nature", business: "Business", food: "Food" }[a.category];
  // Keep the full <title> (with " | CuteLoader") within ~70 characters so it isn't truncated in results.
  const long = `${a.name} Loading Animation – Free ${adjective} CSS & SVG Loader`;
  const title = long.length + 13 <= 70 ? long : `${a.name} Loading Animation – Free CSS & SVG`;
  return pageMetadata({
    title,
    description: metaDescription(a),
    path: pathFor(a),
    ogImage: `/og/${a.slug}.jpg`,
    ogImageAlt: `${a.name} loading animation from the ${cat.name} collection`,
  });
}

function faqsFor(a: AnimationDef) {
  const labels = a.colorLabels ?? {};
  const roles = [labels.primary ?? "primary", labels.secondary ?? "secondary", ...(a.colors.accent ? [labels.accent ?? "accent"] : [])]
    .map((r) => r.toLowerCase())
    .join(", ");
  const name = componentName(a);
  const faqs = [
    {
      q: `How do I change the colors of the ${a.name} loader?`,
      a: `Use the color pickers in the studio above; the ${a.name} loader has ${a.colors.accent ? "three" : "two"} color roles (${roles}). In exported CSS the same colors are the --c1, --c2${a.colors.accent ? " and --c3" : ""} custom properties on .cl-${a.slug}, so you can also theme it from your own stylesheet, for example in a dark-mode media query.`,
    },
    {
      q: `Can I use the ${a.name} animation in React or Next.js?`,
      a: `Yes. Choose the React tab to get a typed ${name} component with props for size, colors${a.stroke != null ? ", stroke" : ""} and speed. It has no dependencies or hooks, so it works in client components and in Next.js Server Components alike.`,
    },
    {
      q: "What happens for visitors who prefer reduced motion?",
      a: "The exported CSS includes a prefers-reduced-motion rule that slows the whole loader to a third of its speed, keeping the loading feedback visible while removing fast movement.",
    },
  ];
  if (a.stroke != null) {
    faqs.push({
      q: "Can I make the lines thinner or thicker?",
      a: `Yes. Adjust the stroke width slider (default ${a.stroke}), or change the --sw variable in the exported CSS. Because the loader is SVG, the stroke stays crisp at every size.`,
    });
  } else {
    faqs.push({
      q: `How large can I make the ${a.name} loader?`,
      a: "Any size from a small inline icon to a full-screen splash. It is vector SVG, so it stays sharp at every size. Set the size in the studio, or change the width and height attributes in the exported markup.",
    });
  }
  return faqs;
}

export default async function AnimationPage({ params }: PageProps<"/animations/[category]/[slug]">) {
  const { category, slug } = await params;
  const a = getAnimationIn(category, slug);
  if (!a) notFound();
  const cat = getCategory(a.category)!;
  const related = a.related.map((s) => getAnimation(s)).filter((x): x is AnimationDef => !!x);
  const cfg = defaultConfig(a);
  const bytes = new TextEncoder().encode(buildCss(a, cfg) + buildSvg(a, cfg)).length;
  const labels = a.colorLabels ?? {};
  const name = componentName(a);
  const customizable = [
    `${a.colors.accent ? "Three" : "Two"} colors (${[labels.primary, labels.secondary, labels.accent].filter(Boolean).join(", ") || "primary, secondary"})`,
    "Size and speed",
    "Background color or transparency",
    ...(a.stroke != null ? ["Stroke width"] : []),
    ...(a.intensity ? ["Motion intensity"] : []),
    ...(a.direction ? ["Direction (reverse)"] : []),
    "Loop on/off",
  ];
  const { siteUrl, path } = { siteUrl: SITE.url, path: pathFor(a) };

  return (
    <>
      <TrackView event="animation_preview" params={{ slug: a.slug, source: "detail" }} />
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Animations", path: "/animations/" },
            { name: cat.name, path: `/animations/${cat.id}/` },
            { name: a.name, path },
          ]}
        />
        <header className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">{a.name} Loading Animation</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted">{a.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Pill>
              <Link href={`/animations/${cat.id}/`} className="hover:text-text">
                {cat.name}
              </Link>
            </Pill>
            <Pill>{KIND_LABELS[a.kind] ?? a.kind}</Pill>
            <Pill>SVG + CSS</Pill>
            <Pill>Free for commercial use</Pill>
          </div>
        </header>
      </Container>

      <Container className="mt-8">
        <div id="studio" className="scroll-mt-20">
          <Studio def={a} siteUrl={siteUrl} />
        </div>
      </Container>

      <Container className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl font-extrabold tracking-tight">
              About the {a.name} loader
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{a.details}</p>
          </section>

          <section aria-labelledby="usage-heading">
            <h2 id="usage-heading" className="text-2xl font-extrabold tracking-tight">
              How to use it
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15.5px] leading-relaxed text-muted marker:font-bold marker:text-subtle">
              <li>Customize colors, size and speed in the studio above. The preview updates instantly.</li>
              <li>
                Pick an export: <strong className="text-text">HTML + CSS</strong> for any website, <strong className="text-text">React</strong> for
                component projects, <strong className="text-text">SVG</strong> for image tags, <strong className="text-text">JavaScript</strong> for a
                ready-made overlay, or <strong className="text-text">GIF</strong> for places that can&apos;t run code.
              </li>
              <li>Show the loader while work is in progress, and hide or remove it when your content is ready.</li>
            </ol>
            <h3 className="mt-8 text-lg font-bold">React example</h3>
            <p className="mt-2 text-[15px] text-muted">
              After exporting <code className="rounded bg-surface-2 px-1 font-mono text-[13px]">{name}.tsx</code> from the React tab:
            </p>
            <div className="mt-3">
              <CodeBlock
                lang="tsx"
                filename="Dashboard.tsx"
                code={`import { ${name} } from "./${name}";

export function Dashboard({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <${name} size={64}${a.stroke != null ? ` stroke={${a.stroke}}` : ""} label="Loading dashboard" />;
  }
  return <DashboardContent />;
}`}
              />
            </div>
            <p className="mt-4 text-[15px] text-muted">
              Step-by-step instructions for{" "}
              <Link href="/guides/html/" className="font-semibold text-brand-strong hover:underline">
                plain HTML
              </Link>
              ,{" "}
              <Link href="/guides/react/" className="font-semibold text-brand-strong hover:underline">
                React
              </Link>
              ,{" "}
              <Link href="/guides/nextjs/" className="font-semibold text-brand-strong hover:underline">
                Next.js
              </Link>
              ,{" "}
              <Link href="/guides/vue/" className="font-semibold text-brand-strong hover:underline">
                Vue
              </Link>
              ,{" "}
              <Link href="/guides/angular/" className="font-semibold text-brand-strong hover:underline">
                Angular
              </Link>{" "}
              and{" "}
              <Link href="/guides/aspnet-core-mvc/" className="font-semibold text-brand-strong hover:underline">
                ASP.NET
              </Link>{" "}
              are in our integration guides.
            </p>
          </section>
        </div>

        <aside aria-labelledby="specs-heading" className="h-fit rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <h2 id="specs-heading" className="text-lg font-extrabold tracking-tight">
            Specs
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Category", cat.name],
              ["Animation type", KIND_LABELS[a.kind] ?? a.kind],
              ["Default cycle", `${a.duration}s`],
              ["Size (HTML + CSS)", `≈ ${(bytes / 1024).toFixed(1)} KB before gzip`],
              ["Formats", "HTML/CSS, React (TSX), SVG, JavaScript, embed, GIF"],
              ["Dependencies", "None"],
              ["License", "Free for personal & commercial use"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <dt className="text-subtle">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 text-sm font-bold">You can customize</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted">
            {customizable.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-subtle">
            Tags: {a.tags.join(", ")}.{" "}
            <Link href="/license/" className="underline underline-offset-2 hover:text-text">
              License details
            </Link>
          </p>
        </aside>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <h2 className="mb-5 text-2xl font-extrabold tracking-tight">Similar loading animations</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((r, i) => (
              <AnimationCard key={r.slug} def={r} variant={i + 1} />
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-16 max-w-3xl">
        <FAQList faqs={faqsFor(a)} title={`${a.name}: frequently asked questions`} />
      </Container>

      <JsonLd
        data={creativeWorkLd({
          name: `${a.name} loading animation`,
          description: a.description,
          path,
          image: `/og/${a.slug}.jpg`,
          keywords: [...a.tags, "loading animation", "css loader", "svg loader"],
          dateCreated: a.addedAt ?? SITE.launchDate,
        })}
      />
    </>
  );
}

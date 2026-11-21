import Link from "next/link";
import { ArrowRight, Code2, MousePointerClick, SlidersHorizontal, Sparkles, Heart, Accessibility, Feather } from "lucide-react";
import { ANIMATIONS, featured, getAnimation, recent } from "@/animations";
import { CATEGORIES } from "@/data/categories";
import { AnimationGrid } from "@/components/animations/AnimationCard";
import { CategoryCard } from "@/components/animations/CategoryCard";
import { LoaderPreview } from "@/components/animations/LoaderPreview";
import { SearchBox, PopularSearches } from "@/components/search/SearchBox";
import { ButtonLink, Container, FAQList, SectionHeading } from "@/components/common/ui";
import { CodeBlock } from "@/components/content/Blocks";
import { AdSlot } from "@/components/common/AdSlot";
import { JsonLd } from "@/components/common/JsonLd";
import { pageMetadata, webApplicationLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "CuteLoader – Free Customizable Website Loading Animations",
  description:
    `Free website loading animations you can customize live. ${ANIMATIONS.length} original CSS & SVG loaders: change colors, speed and size, then copy HTML/CSS, React or SVG code.`,
  path: "/",
  absoluteTitle: true,
});

const HOME_FAQS = [
  {
    q: "Are the loading animations really free?",
    a: "Yes. Every loader can be used in personal and commercial projects at no cost, with no account and no watermark. A credit link is appreciated but optional; you can switch it off before copying the code.",
  },
  {
    q: "What do I get when I export a loader?",
    a: "Clean HTML and CSS, a typed React component, an animated SVG file, a plain JavaScript version with show/hide helpers, a one-piece embed snippet, or an animated GIF. Everything reflects the colors, size and speed you picked.",
  },
  {
    q: "Do I need a JavaScript library to use these loaders?",
    a: "No. The loaders are inline SVG animated with CSS keyframes. They work in any stack: plain HTML, React, Next.js, Vue, Angular, ASP.NET or a website builder. The optional JavaScript export only adds convenience helpers.",
  },
  {
    q: "Are the animations accessible?",
    a: "Exported loaders announce themselves with role=\"status\" and a visually hidden label, and they automatically slow to a calmer pace for visitors who enable reduced motion in their operating system.",
  },
  {
    q: "Will a loader hurt my page speed?",
    a: "The loaders animate only transform, opacity and stroke properties, which browsers can run on the compositor, and they ship no images or runtime libraries. A typical export is a few kilobytes of CSS and SVG.",
  },
];

const FRAMEWORKS = [
  { href: "/guides/html/", label: "HTML" },
  { href: "/guides/css/", label: "CSS" },
  { href: "/guides/javascript/", label: "JavaScript" },
  { href: "/guides/react/", label: "React" },
  { href: "/guides/nextjs/", label: "Next.js" },
  { href: "/guides/vue/", label: "Vue" },
  { href: "/guides/angular/", label: "Angular" },
  { href: "/guides/aspnet-core-mvc/", label: "ASP.NET Core" },
  { href: "/guides/aspnet-mvc/", label: "ASP.NET MVC" },
  { href: "/guides/aspnet-webforms/", label: "Web Forms" },
];

function HeroShowcase() {
  const hero = getAnimation("bouncing-bunny") ?? ANIMATIONS[0];
  const minis = ["minimal-ring", "blooming-flower", "terminal-typing", "orbiting-dots"]
    .map((s) => getAnimation(s))
    .filter((a): a is NonNullable<typeof a> => !!a);
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand/20 via-pink/15 to-sky/20 blur-2xl" />
      <div className="rounded-[2rem] border border-border bg-surface p-3 shadow-lift">
        <div className="flex items-center gap-1.5 px-2 pb-3 pt-1" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-pink/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-lemon/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
          <span className="ml-3 text-xs font-medium text-subtle">studio · {hero.name}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <Link
            href={`/animations/${hero.category}/${hero.slug}/`}
            className="checker grid aspect-square place-items-center rounded-3xl"
            aria-label={`Open the ${hero.name} loader`}
          >
            <LoaderPreview def={hero} size={200} label={`${hero.name} loading animation`} />
          </Link>
          <div className="flex w-28 flex-col gap-2 sm:w-32">
            {[
              { k: "Body", c: hero.colors.primary },
              { k: "Ears", c: hero.colors.secondary },
              { k: "Accent", c: hero.colors.accent ?? "#fde68a" },
            ].map((s) => (
              <div key={s.k} className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 p-2" aria-hidden="true">
                <span className="h-6 w-6 rounded-lg border border-black/5" style={{ background: s.c }} />
                <span className="text-xs font-semibold text-muted">{s.k}</span>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-surface-2 p-2" aria-hidden="true">
              <div className="flex justify-between text-[11px] font-semibold text-muted">
                <span>Speed</span>
                <span>1.0×</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-surface-3">
                <div className="h-full w-1/2 rounded-full bg-brand" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-2" aria-hidden="true">
              <div className="flex justify-between text-[11px] font-semibold text-muted">
                <span>Size</span>
                <span>120px</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-surface-3">
                <div className="h-full w-2/5 rounded-full bg-pink" />
              </div>
            </div>
            <div className="mt-auto grid h-10 place-items-center rounded-xl bg-text text-xs font-bold text-bg" aria-hidden="true">
              Copy code
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {minis.map((a) => (
          <Link
            key={a.slug}
            href={`/animations/${a.category}/${a.slug}/`}
            className="grid aspect-square place-items-center rounded-2xl border border-border bg-surface shadow-soft transition hover:-translate-y-0.5"
            aria-label={`${a.name} loader`}
          >
            <LoaderPreview def={a} size={a.viewBox && !a.viewBox.endsWith("100 100") ? 72 : 60} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const total = ANIMATIONS.length;
  return (
    <>
      <JsonLd
        data={webApplicationLd({
          name: "CuteLoader loading animation studio",
          description: SITE.description,
          path: "/loading-animation-generator/",
        })}
      />

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              {total} original loaders · free forever · no signup
            </p>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Loading, but make it{" "}
              <span className="bg-gradient-to-r from-brand via-pink to-peach bg-clip-text text-transparent">beautiful.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Discover, customize, and use beautiful loading animations in your next project. Free forever.
            </p>
            <div className="mt-7 max-w-xl">
              <SearchBox variant="hero" />
              <div className="mt-3">
                <PopularSearches />
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/animations/">
                Explore animations <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/animations/#categories" variant="secondary">
                Browse categories
              </ButtonLink>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-subtle">
              Every loader is lightweight SVG and CSS. Change colors, speed and size with a live preview, then copy HTML/CSS,
              React, SVG, JavaScript or GIF.
            </p>
          </div>
          <HeroShowcase />
        </Container>
      </section>

      {/* ---------------- Featured ---------------- */}
      <Container className="py-10">
        <SectionHeading
          eyebrow="Featured"
          title="Featured loading animations"
          description="Hand-picked favorites from across the library: versatile, polished, and ready for real projects."
          href="/animations/"
          linkLabel={`Browse all ${total}`}
        />
        <AnimationGrid items={featured(8)} />
      </Container>

      {/* ---------------- Categories ---------------- */}
      <Container className="py-10">
        <SectionHeading
          eyebrow="Categories"
          title="Find the right mood for your loader"
          description="Five collections, from friendly characters to clean professional spinners."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </Container>

      <Container className="py-4">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
      </Container>

      {/* ---------------- Category rows ---------------- */}
      {CATEGORIES.map((c) => (
        <Container key={c.id} className="py-10">
          <SectionHeading
            title={c.name}
            description={c.tagline}
            href={`/animations/${c.id}/`}
            linkLabel={`All ${c.shortName.toLowerCase()} loaders`}
          />
          <AnimationGrid items={featured(4, (a) => a.category === c.id)} />
        </Container>
      ))}

      {/* ---------------- Recently added ---------------- */}
      <Container className="py-10">
        <SectionHeading
          eyebrow="New"
          title="Recently added"
          description="The latest loaders to join the library."
          href="/animations/?sort=newest"
          linkLabel="See newest"
        />
        <AnimationGrid items={recent(4)} />
      </Container>

      {/* ---------------- How it works ---------------- */}
      <Container className="py-14">
        <SectionHeading eyebrow="How it works" title="From browsing to shipping in a minute" />
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: MousePointerClick,
              title: "Pick a loader",
              text: "Browse by category, search by style, or save favorites while you explore. Every preview is the real animation.",
            },
            {
              icon: SlidersHorizontal,
              title: "Make it yours",
              text: "Match your brand colors, size and speed with instant preview. Undo freely, reset anytime, share the exact setup.",
            },
            {
              icon: Code2,
              title: "Copy & ship",
              text: "Export HTML/CSS, React, SVG, JavaScript or GIF. The code is clean, accessible and has no dependencies.",
            },
          ].map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-subtle">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* ---------------- Developer integration ---------------- */}
      <section className="py-14">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Developer integration"
              title="Works with the stack you already use"
              description="Exports are plain HTML, CSS and SVG, so they drop into any framework. Our step-by-step guides show how to show the loader during async work and hide it when data arrives."
            />
            <ul className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((f) => (
                <li key={f.href}>
                  <Link
                    href={f.href}
                    className="inline-flex rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-muted shadow-soft transition hover:border-brand/40 hover:text-text"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Feather, t: "Tiny", d: "A few KB of CSS + SVG. No images, no runtime." },
                { icon: Accessibility, t: "Accessible", d: "role=status, hidden label, reduced-motion aware." },
                { icon: Heart, t: "Yours", d: "Free for commercial use. Credit is optional." },
              ].map((f) => (
                <li key={f.t}>
                  <f.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <p className="mt-2 font-bold">{f.t}</p>
                  <p className="text-sm text-muted">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            lang="tsx"
            filename="App.tsx"
            code={`import { MinimalRingLoader } from "./MinimalRingLoader";

export function Orders() {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    // Typed, dependency-free component exported from CuteLoader
    return <MinimalRingLoader size={48} primary="#6366f1" label="Loading orders" />;
  }

  return <OrderTable rows={data} />;
}`}
          />
        </Container>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <Container className="max-w-3xl py-10">
        <FAQList faqs={HOME_FAQS} />
        <p className="mt-6 text-sm text-muted">
          Looking for something specific? Try the{" "}
          <Link href="/loading-animation-generator/" className="font-semibold text-brand-strong hover:underline">
            loading animation generator
          </Link>{" "}
          or read our{" "}
          <Link href="/blog/" className="font-semibold text-brand-strong hover:underline">
            guides on loading UX
          </Link>
          .
        </p>
      </Container>
    </>
  );
}

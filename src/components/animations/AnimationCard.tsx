import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import type { AnimationDef } from "@/types/animation";
import { CATEGORY_MAP } from "@/data/categories";
import { pathFor } from "@/animations";
import { KIND_LABELS } from "@/lib/search";
import { SITE } from "@/lib/site";
import { LoaderPreview } from "./LoaderPreview";
import { FavoriteButton } from "./FavoriteButton";
import { CopyCodeButton } from "./CopyCodeButton";

/** Three tile treatments so a grid of cards doesn't look stamped out. */
function tileStyle(accent: string, variant: number): React.CSSProperties {
  switch (variant % 3) {
    case 0:
      return { background: `linear-gradient(150deg, color-mix(in srgb, ${accent} 13%, var(--surface)), var(--surface-2))` };
    case 1:
      return { background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${accent} 16%, var(--surface)), var(--surface-2) 70%)` };
    default:
      return { backgroundColor: `color-mix(in srgb, ${accent} 8%, var(--surface-2))` };
  }
}

export function AnimationCard({
  def,
  variant = 0,
  headingLevel = 3,
  priority = false,
}: {
  def: AnimationDef;
  variant?: number;
  headingLevel?: 2 | 3 | 4;
  priority?: boolean;
}) {
  const cat = CATEGORY_MAP[def.category];
  const href = pathFor(def);
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <article className="group relative flex flex-col rounded-3xl border border-border bg-surface p-2 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift">
      <Link
        href={href}
        className={`relative grid aspect-[5/4] place-items-center overflow-hidden rounded-[1.25rem] ${priority ? "" : "cl-tile"} ${
          variant % 3 === 2 ? "dot-grid" : ""
        }`}
        style={tileStyle(cat.accent, variant)}
        aria-label={`${def.name} loading animation: details and customization`}
        tabIndex={-1}
      >
        <LoaderPreview def={def} size={def.viewBox && !def.viewBox.endsWith("100 100") ? 150 : 112} />
      </Link>
      <div className="flex items-start justify-between gap-2 px-2 pt-3">
        <div className="min-w-0">
          <H className="truncate text-[15px] font-bold leading-snug">
            <Link href={href} className="hover:text-brand-strong">
              {def.name}
            </Link>
          </H>
          <p className="mt-0.5 text-xs text-subtle">
            <Link href={`/animations/${def.category}/`} className="hover:text-text">
              {cat.shortName}
            </Link>
            <span aria-hidden="true"> · </span>
            {KIND_LABELS[def.kind] ?? def.kind}
          </p>
        </div>
        <FavoriteButton slug={def.slug} name={def.name} />
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 px-2 pb-2">
        <Link
          href={`${href}#studio`}
          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-soft text-[13px] font-semibold text-brand-strong transition-colors hover:bg-brand hover:text-white"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Customize
        </Link>
        <CopyCodeButton slug={def.slug} category={def.category} name={def.name} siteUrl={SITE.url} />
        <Link
          href={href}
          className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted transition-colors hover:bg-surface-2 hover:text-text"
          aria-label={`View ${def.name} details`}
          title="View details"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function AnimationGrid({
  items,
  headingLevel = 3,
  className = "",
}: {
  items: AnimationDef[];
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {items.map((a, i) => (
        <AnimationCard key={a.slug} def={a} variant={i} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/animation";
import { animationsIn, featured } from "@/animations";
import { LoaderPreview } from "./LoaderPreview";

export function CategoryCard({ category }: { category: Category }) {
  const items = animationsIn(category.id);
  const picks = featured(3, (a) => a.category === category.id);
  return (
    <Link
      href={`/animations/${category.id}/`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift"
    >
      <div
        className="cl-tile flex h-36 items-center justify-center gap-2 px-4"
        style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${category.accent} 16%, var(--surface)), var(--surface-2))` }}
      >
        {picks.map((a, i) => (
          <LoaderPreview key={a.slug} def={a} size={i === 1 ? 76 : 54} />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center justify-between text-lg font-extrabold tracking-tight">
          {category.name}
          <ArrowRight className="h-4 w-4 text-subtle transition group-hover:translate-x-0.5 group-hover:text-brand-strong" aria-hidden="true" />
        </h3>
        <p className="mt-1 text-sm text-muted">{category.tagline}</p>
        <p className="mt-3 text-xs font-semibold text-subtle">{items.length} loaders</p>
      </div>
    </Link>
  );
}

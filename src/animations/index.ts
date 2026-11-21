/**
 * Central animation registry (server-side). Category files hold the raw
 * definitions; this module derives ids, related loaders and search metadata.
 * Client components never import this module (it would ship every loader);
 * they receive data as props or lazy-load one category via ./load.ts.
 */
import type { AnimationDef, AnimationSource, CategoryId } from "@/types/animation";
import { SITE } from "@/lib/site";
import { colorFamily } from "@/lib/color";
import cute from "./cute";
import abstract from "./abstract";
import minimal from "./minimal";
import technology from "./technology";
import nature from "./nature";
import business from "./business";
import food from "./food";

export const CATEGORY_ORDER: CategoryId[] = ["cute", "abstract", "minimal", "technology", "nature", "business", "food"];

const SOURCES: Record<CategoryId, AnimationSource[]> = { cute, abstract, minimal, technology, nature, business, food };

const flat: (AnimationSource & { order: number })[] = CATEGORY_ORDER.flatMap((c, ci) =>
  SOURCES[c].map((a, i) => ({ ...a, order: ci * 100 + i })),
);

function relatedFor(a: AnimationSource): string[] {
  return flat
    .filter((b) => b.slug !== a.slug)
    .map((b) => {
      let score = 0;
      if (b.category === a.category) score += 2;
      if (b.kind === a.kind) score += 3;
      score += b.tags.filter((t) => a.tags.includes(t)).length;
      return { slug: b.slug, score, pop: b.popularity };
    })
    .sort((x, y) => y.score - x.score || y.pop - x.pop)
    .slice(0, 4)
    .map((x) => x.slug);
}

export const ANIMATIONS: (AnimationDef & { order: number })[] = flat.map((a) => ({
  ...a,
  id: `${a.category}/${a.slug}`,
  addedAt: a.addedAt ?? SITE.launchDate,
  related: relatedFor(a),
}));

const BY_SLUG = new Map(ANIMATIONS.map((a) => [a.slug, a]));

export function getAnimation(slug: string): AnimationDef | undefined {
  return BY_SLUG.get(slug);
}

export function getAnimationIn(category: string, slug: string): AnimationDef | undefined {
  const a = BY_SLUG.get(slug);
  return a && a.category === category ? a : undefined;
}

export function animationsIn(category: CategoryId): AnimationDef[] {
  return ANIMATIONS.filter((a) => a.category === category);
}

export function featured(limit = 8, filter?: (a: AnimationDef) => boolean): AnimationDef[] {
  return [...ANIMATIONS]
    .filter((a) => (filter ? filter(a) : true))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

/** Newest additions first (registry order within the same date). */
export function recent(limit = 8): AnimationDef[] {
  return [...ANIMATIONS]
    .sort((a, b) => (b.addedAt ?? "").localeCompare(a.addedAt ?? "") || b.order - a.order)
    .slice(0, limit);
}

export function pathFor(a: Pick<AnimationDef, "category" | "slug">): string {
  return `/animations/${a.category}/${a.slug}/`;
}

/** Lightweight metadata for client-side search (no SVG/CSS payload). */
export interface SearchMeta {
  slug: string;
  name: string;
  category: CategoryId;
  kind: string;
  tags: string[];
  description: string;
  color: string;
  popularity: number;
  order: number;
  colors: string[];
}

export function searchIndex(): SearchMeta[] {
  return ANIMATIONS.map((a) => ({
    slug: a.slug,
    name: a.name,
    category: a.category,
    kind: a.kind,
    tags: a.tags,
    description: a.description,
    color: colorFamily(a.colors.primary),
    popularity: a.popularity,
    order: a.order,
    colors: [a.colors.primary, a.colors.secondary, ...(a.colors.accent ? [a.colors.accent] : [])],
  }));
}

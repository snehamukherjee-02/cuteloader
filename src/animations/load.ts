/**
 * Client-side lazy loading of animation definitions. Each category becomes its
 * own small chunk that is fetched only when a user copies code from a card or
 * picks a loader in the generator, so the main bundle never carries the whole library.
 */
import type { AnimationSource, CategoryId } from "@/types/animation";

const loaders: Record<CategoryId, () => Promise<{ default: AnimationSource[] }>> = {
  cute: () => import("./cute"),
  abstract: () => import("./abstract"),
  minimal: () => import("./minimal"),
  technology: () => import("./technology"),
  nature: () => import("./nature"),
  business: () => import("./business"),
  food: () => import("./food"),
};

export async function loadCategory(category: CategoryId): Promise<AnimationSource[]> {
  return (await loaders[category]()).default;
}

export async function loadAnimation(category: CategoryId, slug: string): Promise<AnimationSource | undefined> {
  return (await loadCategory(category)).find((a) => a.slug === slug);
}

/** Warm the chunk (e.g. on hover) so a following click can copy synchronously. */
export function preloadCategory(category: CategoryId): void {
  void loaders[category]().catch(() => {});
}

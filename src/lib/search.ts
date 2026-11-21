/**
 * Client-side search over loader metadata. Small enough to run on every
 * keystroke: AND semantics across query terms, weighted fields, light stemming.
 */
import type { CategoryId } from "@/types/animation";

export interface SearchItem {
  slug: string;
  name: string;
  category: CategoryId;
  kind: string;
  tags: string[];
  description?: string;
  color: string;
  popularity: number;
  order: number;
  colors?: string[];
}

const CATEGORY_WORDS: Record<CategoryId, string[]> = {
  cute: ["cute", "playful", "kawaii", "character", "fun", "kids"],
  abstract: ["abstract", "creative", "fluid", "gradient", "artistic"],
  minimal: ["minimal", "professional", "clean", "simple", "dashboard", "corporate"],
  technology: ["technology", "tech", "coding", "code", "developer", "dev", "ai"],
  nature: ["nature", "aesthetic", "organic", "calm", "botanical", "sky"],
  business: ["business", "ecommerce", "commerce", "shop", "shopping", "store", "finance", "payment", "checkout", "delivery"],
  food: ["food", "drink", "drinks", "restaurant", "cafe", "coffee", "kitchen", "cooking", "recipe", "menu"],
};

/** Every loader exports to these, so matching them shouldn't filter anything out. */
const UNIVERSAL = new Set([
  "css", "svg", "html", "react", "javascript", "js", "typescript", "ts", "nextjs", "next", "vue", "angular",
  "aspnet", "asp", "net", "jquery", "gif", "free", "animated", "custom", "customizable",
]);
const STOP = new Set(["loader", "loaders", "loading", "animation", "animations", "preloader", "the", "a", "for", "and", "with", "of"]);

function stem(w: string): string {
  if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

export function terms(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9.\s-]/g, " ")
    .split(/[\s-]+/)
    .map((w) => w.replace(/\./g, ""))
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

function termScore(item: SearchItem, t: string): number {
  const name = item.name.toLowerCase();
  let s = 0;
  if (name.split(/\s+/).some((w) => stem(w) === t)) s += 10;
  else if (name.split(/\s+/).some((w) => w.startsWith(t))) s += 7;
  else if (name.includes(t)) s += 4;
  if (item.tags.some((tag) => stem(tag) === t)) s += 5;
  else if (item.tags.some((tag) => tag.startsWith(t))) s += 3;
  if (stem(item.kind) === t || item.kind.startsWith(t)) s += 4;
  if (item.category === t || CATEGORY_WORDS[item.category].some((w) => stem(w) === t)) s += 3;
  if (item.color === t) s += 3;
  if (item.description && item.description.toLowerCase().includes(t)) s += 1;
  if (!s && UNIVERSAL.has(t)) s = 0.5;
  return s;
}

export function scoreItem(item: SearchItem, q: string): number {
  const ts = terms(q);
  if (!ts.length) return 1;
  let total = 0;
  for (const t of ts) {
    const s = termScore(item, t);
    if (!s) return 0;
    total += s;
  }
  return total + item.popularity / 1000;
}

export function searchItems<T extends SearchItem>(items: T[], q: string): T[] {
  if (!terms(q).length) return items;
  return items
    .map((it) => ({ it, s: scoreItem(it, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.it);
}

export const KIND_LABELS: Record<string, string> = {
  spinner: "Spinner",
  bounce: "Bounce",
  pulse: "Pulse",
  morph: "Morph",
  orbit: "Orbit",
  wave: "Wave",
  progress: "Progress",
  character: "Character",
  particles: "Particles",
  typing: "Typing",
};

export const POPULAR_SEARCHES = ["spinner", "dots", "cute", "progress", "terminal", "flower", "minimal", "bunny"];

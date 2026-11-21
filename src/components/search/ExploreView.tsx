"use client";

import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CategoryId } from "@/types/animation";
import { searchItems, KIND_LABELS, type SearchItem } from "@/lib/search";
import { COLOR_FAMILIES } from "@/lib/color";
import { useFavorites } from "@/lib/favorites";
import { track } from "@/lib/analytics";

export interface ExploreEntry {
  meta: SearchItem;
  card: React.ReactNode;
}

type Sort = "featured" | "newest" | "az";

interface Filters {
  q: string;
  category: CategoryId | "";
  kind: string;
  color: string;
  favorites: boolean;
  sort: Sort;
}

const EMPTY: Filters = { q: "", category: "", kind: "", color: "", favorites: false, sort: "featured" };

export interface CategoryChip {
  id: CategoryId;
  label: string;
}

/* The URL query string is the single source of truth for filters: shareable,
   back/forward friendly, and updated without page reloads. */
const URL_EVENT = "cl-explore-url";

function subscribeUrl(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(URL_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(URL_EVENT, cb);
  };
}

function parse(search: string, ids: CategoryId[]): Filters {
  const p = new URLSearchParams(search);
  const sort = p.get("sort");
  const category = p.get("category") as CategoryId | null;
  return {
    q: p.get("q") ?? "",
    category: category && ids.includes(category) ? category : "",
    kind: p.get("type") ?? "",
    color: p.get("color") ?? "",
    favorites: p.get("favorites") === "1",
    sort: sort === "newest" || sort === "az" ? sort : "featured",
  };
}

function write(f: Filters) {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.category) p.set("category", f.category);
  if (f.kind) p.set("type", f.kind);
  if (f.color) p.set("color", f.color);
  if (f.favorites) p.set("favorites", "1");
  if (f.sort !== "featured") p.set("sort", f.sort);
  const qs = p.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  window.dispatchEvent(new Event(URL_EVENT));
}

export function ExploreView({ entries, categories }: { entries: ExploreEntry[]; categories: CategoryChip[] }) {
  // Server render and hydration use the unfiltered list; the client then applies the URL.
  const search = useSyncExternalStore(subscribeUrl, () => window.location.search, () => "");
  const f = useMemo(() => parse(search, categories.map((c) => c.id)), [search, categories]);
  const [showFilters, setShowFilters] = useState(false);
  const favorites = useFavorites();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = (patch: Partial<Filters>) => write({ ...f, ...patch });
  const reset = (next: Filters) => write(next);

  const kinds = useMemo(() => [...new Set(entries.map((e) => e.meta.kind))].sort(), [entries]);
  const colorsPresent = useMemo(() => new Set(entries.map((e) => e.meta.color)), [entries]);

  const results = useMemo(() => {
    let list = entries.filter(
      (e) =>
        (!f.category || e.meta.category === f.category) &&
        (!f.kind || e.meta.kind === f.kind) &&
        (!f.color || e.meta.color === f.color) &&
        (!f.favorites || favorites.includes(e.meta.slug)),
    );
    if (f.q.trim()) {
      const ranked = searchItems(
        list.map((e) => e.meta),
        f.q,
      );
      const order = new Map(ranked.map((m, i) => [m.slug, i]));
      list = list.filter((e) => order.has(e.meta.slug)).sort((a, b) => order.get(a.meta.slug)! - order.get(b.meta.slug)!);
      if (f.sort === "featured") return list;
    }
    const sorted = [...list];
    if (f.sort === "featured") sorted.sort((a, b) => b.meta.popularity - a.meta.popularity);
    if (f.sort === "newest") sorted.sort((a, b) => b.meta.order - a.meta.order);
    if (f.sort === "az") sorted.sort((a, b) => a.meta.name.localeCompare(b.meta.name));
    return sorted;
  }, [entries, f, favorites]);

  const activeCount =
    (f.category ? 1 : 0) + (f.kind ? 1 : 0) + (f.color ? 1 : 0) + (f.favorites ? 1 : 0) + (f.q ? 1 : 0);

  const chip = (active: boolean) =>
    `inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition ${
      active ? "border-brand bg-brand-soft text-brand-strong" : "border-border bg-surface text-muted hover:text-text"
    }`;

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-border/70 bg-bg/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search loaders</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
              <input
                type="search"
                value={f.q}
                onChange={(e) => {
                  const q = e.target.value;
                  update({ q });
                  if (searchTimer.current) clearTimeout(searchTimer.current);
                  searchTimer.current = setTimeout(() => {
                    if (q.trim()) track("search", { query: q.trim().slice(0, 60), source: "explore" });
                  }, 800);
                }}
                placeholder="Search by name, style or color…"
                className="h-10 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
              aria-controls="explore-filters"
              className={`${chip(showFilters || activeCount > 0)} lg:hidden`}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters{activeCount ? ` (${activeCount})` : ""}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="explore-sort" className="text-sm text-subtle">
              Sort
            </label>
            <select
              id="explore-sort"
              value={f.sort}
              onChange={(e) => update({ sort: e.target.value as Sort })}
              className="h-10 rounded-xl border border-border bg-surface px-3 text-sm font-medium outline-none focus:border-brand"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>

        <div id="explore-filters" className={`${showFilters ? "flex" : "hidden"} mt-3 flex-col gap-3 lg:flex`}>
          <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Category">
            <button type="button" className={chip(!f.category)} aria-pressed={!f.category} onClick={() => update({ category: "" })}>
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${chip(f.category === c.id)} shrink-0`}
                aria-pressed={f.category === c.id}
                onClick={() => update({ category: f.category === c.id ? "" : c.id })}
              >
                {c.label}
              </button>
            ))}
            <button
              type="button"
              className={`${chip(f.favorites)} shrink-0`}
              aria-pressed={f.favorites}
              onClick={() => update({ favorites: !f.favorites })}
            >
              <Heart className="h-4 w-4" fill={f.favorites ? "currentColor" : "none"} aria-hidden="true" />
              Favorites{favorites.length ? ` (${favorites.length})` : ""}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-2">
              <label htmlFor="explore-kind" className="text-sm text-subtle">
                Animation type
              </label>
              <select
                id="explore-kind"
                value={f.kind}
                onChange={(e) => update({ kind: e.target.value })}
                className="h-9 rounded-xl border border-border bg-surface px-3 text-sm font-medium outline-none focus:border-brand"
              >
                <option value="">Any</option>
                {kinds.map((k) => (
                  <option key={k} value={k}>
                    {KIND_LABELS[k] ?? k}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2" role="group" aria-label="Main color">
              <span className="text-sm text-subtle">Color</span>
              <div className="flex flex-wrap gap-1.5">
                {COLOR_FAMILIES.filter((c) => colorsPresent.has(c.id)).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    title={c.label}
                    aria-label={`${c.label} loaders`}
                    aria-pressed={f.color === c.id}
                    onClick={() => update({ color: f.color === c.id ? "" : c.id })}
                    className={`h-7 w-7 rounded-full border-2 transition ${
                      f.color === c.id ? "scale-110 border-text" : "border-surface hover:scale-110"
                    }`}
                    style={{ background: c.swatch, boxShadow: "0 0 0 1px var(--border)" }}
                  />
                ))}
              </div>
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => reset({ ...EMPTY, sort: f.sort })}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong hover:underline"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {results.length === entries.length
          ? `${entries.length} loading animations`
          : `${results.length} of ${entries.length} loaders`}
        {f.q ? ` for “${f.q}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {results.map((e) => (
            <div key={e.meta.slug}>{e.card}</div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
          <p className="text-lg font-bold">No loaders match these filters</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {f.favorites && !favorites.length
              ? "You haven't saved any favorites yet. Tap the heart on any loader to keep it here."
              : "Try a broader word like “spinner”, “dots” or “cute”, or clear the filters to see everything."}
          </p>
          <button
            type="button"
            onClick={() => reset(EMPTY)}
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-strong"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

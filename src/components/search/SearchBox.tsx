"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { searchItems, POPULAR_SEARCHES, type SearchItem } from "@/lib/search";
import { track } from "@/lib/analytics";

let indexPromise: Promise<SearchItem[]> | null = null;
function loadIndex(): Promise<SearchItem[]> {
  indexPromise ??= fetch("/search-index.json")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      indexPromise = null;
      return [];
    });
  return indexPromise;
}

const CATEGORY_NAMES: Record<string, string> = {
  cute: "Cute",
  abstract: "Abstract",
  minimal: "Minimal",
  technology: "Technology",
  nature: "Nature",
};

export function SearchBox({ variant = "header", autoFocus = false }: { variant?: "header" | "hero"; autoFocus?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  const results = useMemo(() => (items && q.trim() ? searchItems(items, q).slice(0, 6) : []), [items, q]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const ensureIndex = () => {
    if (!items) void loadIndex().then(setItems);
  };

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const submit = (query = q) => {
    const value = query.trim();
    track("search", { query: value.slice(0, 60), source: variant });
    go(value ? `/animations/?q=${encodeURIComponent(value)}` : "/animations/");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) go(`/animations/${r.category}/${r.slug}/`);
      else submit();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hero = variant === "hero";
  const showList = open && q.trim().length > 0;

  return (
    <div ref={wrap} className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search loading animations
        </label>
        <div
          className={`flex items-center gap-2 border border-border bg-surface transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 ${
            hero ? "h-14 rounded-2xl pl-4 pr-1.5 shadow-soft" : "h-10 rounded-xl px-3"
          }`}
        >
          <Search className={`${hero ? "h-5 w-5" : "h-4 w-4"} shrink-0 text-subtle`} aria-hidden="true" />
          <input
            id={`${listId}-input`}
            type="search"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
            autoComplete="off"
            autoFocus={autoFocus}
            placeholder={hero ? "Search loaders: spinner, bunny, terminal…" : "Search loaders…"}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(-1);
              setOpen(true);
              ensureIndex();
            }}
            onFocus={() => {
              ensureIndex();
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden ${
              hero ? "text-base" : "text-sm"
            }`}
          />
          {hero && (
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-strong"
            >
              Search
            </button>
          )}
        </div>
      </form>

      {showList && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
          <ul id={listId} role="listbox" aria-label="Suggestions" className="max-h-80 overflow-y-auto p-1.5">
            {items === null && <li className="px-3 py-2 text-sm text-subtle">Loading suggestions…</li>}
            {items !== null && results.length === 0 && (
              <li className="px-3 py-2 text-sm text-subtle">
                No loaders match &ldquo;{q}&rdquo;. Press Enter to search anyway.
              </li>
            )}
            {results.map((r, i) => (
              <li
                key={r.slug}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(`/animations/${r.category}/${r.slug}/`)}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm ${
                  i === active ? "bg-surface-2" : ""
                }`}
              >
                <span className="font-medium">{r.name}</span>
                <span className="text-xs text-subtle">{CATEGORY_NAMES[r.category]}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2 text-xs text-subtle">
            <button type="button" className="font-medium text-brand-strong hover:underline" onClick={() => submit()}>
              See all results for &ldquo;{q}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PopularSearches() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-subtle">Popular:</span>
      {POPULAR_SEARCHES.slice(0, 6).map((s) => (
        <a
          key={s}
          href={`/animations/?q=${encodeURIComponent(s)}`}
          className="rounded-full border border-border bg-surface px-3 py-1 text-muted transition hover:border-brand/40 hover:text-text"
        >
          {s}
        </a>
      ))}
    </div>
  );
}

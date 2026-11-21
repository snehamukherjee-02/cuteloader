"use client";

/**
 * Favorites live in this browser only (localStorage): no account needed.
 * A tiny external store so every heart button and the Explore filter stay in sync.
 */
import { useSyncExternalStore } from "react";

const KEY = "cl-favorites";
const listeners = new Set<() => void>();
let cache: string[] | null = null;
const EMPTY: string[] = [];

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    cache = Array.isArray(raw) ? raw.filter((s): s is string => typeof s === "string").slice(0, 200) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: keep favorites for this visit only */
  }
  listeners.forEach((l) => l());
}

export function toggleFavorite(slug: string): boolean {
  const cur = read();
  const on = !cur.includes(slug);
  write(on ? [...cur, slug] : cur.filter((s) => s !== slug));
  return on;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useFavorites(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

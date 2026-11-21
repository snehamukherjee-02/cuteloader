"use client";

import { Heart } from "lucide-react";
import { toggleFavorite, useFavorites } from "@/lib/favorites";
import { track } from "@/lib/analytics";

export function FavoriteButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const favorites = useFavorites();
  const on = favorites.includes(slug);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
      title={on ? "Saved to favorites" : "Save to favorites"}
      onClick={() => {
        const now = toggleFavorite(slug);
        track("favorite_toggle", { slug, on: now });
      }}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors hover:bg-surface-2 ${
        on ? "text-pink" : "text-subtle hover:text-text"
      } ${className}`}
    >
      <Heart className="h-[18px] w-[18px]" fill={on ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}

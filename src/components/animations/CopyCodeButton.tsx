"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { CategoryId } from "@/types/animation";
import { loadAnimation, preloadCategory } from "@/animations/load";
import { defaultConfig } from "@/lib/engine";
import { copyText } from "@/lib/clipboard";

const loadCodegen = () => import("@/lib/codegen");
import { track } from "@/lib/analytics";

/** Copies a ready-to-paste embed snippet (HTML + CSS) with the default settings. */
export function CopyCodeButton({
  slug,
  category,
  name,
  siteUrl,
  compact = true,
}: {
  slug: string;
  category: CategoryId;
  name: string;
  siteUrl: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  const onClick = async () => {
    const code = Promise.all([loadAnimation(category, slug), loadCodegen()]).then(([def, { exportEmbed }]) => {
      if (!def) throw new Error("Loader not found");
      return exportEmbed(def, defaultConfig(def), { siteUrl, attribution: true });
    });
    const ok = await copyText(code).catch(() => false);
    setState(ok ? "copied" : "error");
    if (ok) track("copy_code", { slug, format: "embed", source: "card" });
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button
      type="button"
      onPointerEnter={() => {
        preloadCategory(category);
        void loadCodegen();
      }}
      onFocus={() => preloadCategory(category)}
      onClick={onClick}
      aria-label={`Copy embed code for ${name}`}
      title="Copy HTML + CSS"
      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border px-2.5 text-[13px] font-semibold transition-colors hover:bg-surface-2 ${
        state === "copied" ? "text-emerald-600 dark:text-emerald-400" : "text-muted hover:text-text"
      }`}
    >
      {state === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {!compact && <span>{state === "copied" ? "Copied" : "Copy code"}</span>}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Code copied to clipboard" : state === "error" ? "Copy failed" : ""}
      </span>
    </button>
  );
}

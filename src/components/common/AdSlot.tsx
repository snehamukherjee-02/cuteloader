"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, useConsent } from "@/lib/analytics";

/**
 * A reserved advertising placement. Renders nothing unless AdSense is configured
 * (NEXT_PUBLIC_ADSENSE_CLIENT + a slot id) and the visitor has consented.
 * Placements are kept away from previews, controls and copied code, are clearly
 * labeled, and reserve their height to avoid layout shift.
 *
 * Set NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=1 to see the placements while designing.
 */
export function AdSlot({
  slot,
  minHeight = 120,
  className = "",
}: {
  slot?: string;
  minHeight?: number;
  className?: string;
}) {
  const consent = useConsent();
  const ready = !!ADSENSE_CLIENT && !!slot && consent === "granted";
  const pushed = useRef(false);
  const placeholder = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "1";

  useEffect(() => {
    if (!ready || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers or script not yet loaded: leave the reserved space empty */
    }
  }, [ready]);

  if (!ready) {
    if (!placeholder) return null;
    return (
      <div
        className={`grid place-items-center rounded-2xl border border-dashed border-border-strong text-xs text-subtle ${className}`}
        style={{ minHeight }}
      >
        Ad placement{slot ? ` · ${slot}` : ""}
      </div>
    );
  }

  return (
    <aside aria-label="Advertisement" className={className}>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-subtle">Advertisement</p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

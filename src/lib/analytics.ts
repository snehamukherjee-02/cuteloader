/**
 * Privacy-conscious analytics. `track()` is a no-op unless Google Analytics 4 is
 * configured (NEXT_PUBLIC_GA_ID) AND the visitor accepted the consent banner.
 * Events carry no personal data, only which loader/format/category was used.
 */

export type AnalyticsEvent =
  | "animation_preview"
  | "customize_click"
  | "copy_code"
  | "download"
  | "search"
  | "category_view"
  | "project_submit"
  | "attribution_toggle"
  | "favorite_toggle"
  | "gif_export";

import { useSyncExternalStore } from "react";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    adsbygoogle?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", event, params);
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, params);
}

export const CONSENT_KEY = "cl-consent";
export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* storage unavailable: consent applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent<Consent>("cl-consent", { detail: v }));
}

/** "unknown" during server render/hydration, so nothing consent-dependent flashes. */
export type ConsentState = Consent | null | "unknown";

function subscribeConsent(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) cb();
  };
  window.addEventListener("cl-consent", cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("cl-consent", cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribeConsent, readConsent, () => "unknown");
}

export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "").trim();
export const ADSENSE_CLIENT = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").trim();
export const THIRD_PARTY_ENABLED = !!(GA_ID || ADSENSE_CLIENT);

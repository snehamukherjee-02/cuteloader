"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADSENSE_CLIENT, GA_ID, THIRD_PARTY_ENABLED, useConsent, writeConsent, type Consent } from "@/lib/analytics";

const SAFE_ID = /^[A-Za-z0-9-]+$/;

/**
 * Loads Google Analytics 4 / AdSense only when configured via env vars AND the
 * visitor accepts. With neither configured, this renders nothing and no
 * consent banner is shown.
 */
export function ThirdParty() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    if (!THIRD_PARTY_ENABLED) return;
    const onOpen = () => setReopened(true);
    window.addEventListener("cl-consent-open", onOpen);
    return () => window.removeEventListener("cl-consent-open", onOpen);
  }, []);

  if (!THIRD_PARTY_ENABLED) return null;

  const open = reopened || consent === null;
  const decide = (v: Consent) => {
    writeConsent(v);
    setReopened(false);
  };

  return (
    <>
      {consent === "granted" && GA_ID && SAFE_ID.test(GA_ID) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA_ID}");`}
          </Script>
        </>
      )}
      {consent === "granted" && ADSENSE_CLIENT && SAFE_ID.test(ADSENSE_CLIENT) && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-surface p-4 shadow-lift sm:inset-x-auto sm:right-4"
        >
          <p className="text-sm text-muted">
            We&apos;d like to use cookies for anonymous usage analytics
            {ADSENSE_CLIENT ? " and to show ads that keep CuteLoader free" : ""}. Nothing loads unless you agree.{" "}
            <Link href="/privacy/" className="font-medium text-brand-strong underline underline-offset-2">
              Privacy policy
            </Link>
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-surface-2"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function openConsentSettings() {
  window.dispatchEvent(new Event("cl-consent-open"));
}

"use client";

import { THIRD_PARTY_ENABLED } from "@/lib/analytics";
import { openConsentSettings } from "@/components/common/ThirdParty";

export function CookieSettingsButton() {
  if (!THIRD_PARTY_ENABLED) return null;
  return (
    <button type="button" onClick={openConsentSettings} className="hover:text-text">
      Cookie settings
    </button>
  );
}

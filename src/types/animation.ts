/**
 * Core animation types. Every loader in the library is an SVG + CSS definition
 * that is rendered by one engine (src/lib/engine.ts). The same definition powers
 * the live preview, the customization studio and every code export, so what the
 * user sees is exactly what they copy.
 *
 * Authoring rules: see docs/ANIMATION_AUTHORING.md
 */

export type CategoryId = "cute" | "abstract" | "minimal" | "technology" | "nature" | "business" | "food";

export type AnimationKind =
  | "spinner"
  | "bounce"
  | "pulse"
  | "morph"
  | "orbit"
  | "wave"
  | "progress"
  | "character"
  | "particles"
  | "typing";

export interface AnimationColors {
  primary: string;
  secondary: string;
  accent?: string;
}

export interface AnimationSource {
  /** URL slug, kebab-case, unique across the library. */
  slug: string;
  name: string;
  category: CategoryId;
  /** One or two sentences, original, used on cards and as the meta description seed. */
  description: string;
  /** Longer original paragraph shown on the detail page: personality, where it fits, tips. */
  details: string;
  /** Style keywords used for search ("bounce", "character", "spinner", "retro"…). */
  tags: string[];
  kind: AnimationKind;
  colors: AnimationColors;
  /** Human labels for the color pickers, e.g. { primary: "Body", secondary: "Ears" }. */
  colorLabels?: Partial<Record<keyof AnimationColors, string>>;
  /** Base duration (seconds) of the main cycle. Exposed in CSS as var(--d). */
  duration: number;
  /** SVG viewBox, defaults to "0 0 100 100". */
  viewBox?: string;
  /** Default stroke width (SVG user units). Set only if the loader uses var(--sw). */
  stroke?: number;
  /** True if the CSS uses var(--amp) to scale motion distance/size. */
  intensity?: boolean;
  /** True if reversing every animation still looks correct (spinners, orbits…). */
  direction?: boolean;
  /** Inner SVG markup (no outer <svg> element). */
  svg: string;
  /** Scoped CSS. Use ROOT for the root selector and K_ as the keyframe-name prefix. */
  css: string;
  /** Editorial "featured" score 1–100 used for default sorting. Never shown as a statistic. */
  popularity: number;
  /** ISO date the loader was added to the library (the registry fills in the launch date). */
  addedAt?: string;
  /**
   * Reserved for future premium packs (see docs/ARCHITECTURE.md). Every current loader is
   * "free"; nothing in the app gates on this yet and no payment processing exists.
   */
  tier?: "free" | "premium";
  /** Optional collection/pack id for future bundles, e.g. "halloween-2027". */
  pack?: string;
}

export interface AnimationDef extends AnimationSource {
  id: string;
  related: string[];
}

export interface LoaderConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  transparent: boolean;
  size: number;
  /** Speed multiplier: 1 = default, 2 = twice as fast. */
  speed: number;
  stroke: number;
  /** Motion intensity multiplier (0.4 – 1.6). */
  intensity: number;
  reverse: boolean;
  loop: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  body: string[];
  seoTitle: string;
  seoDescription: string;
  faqs: { q: string; a: string }[];
  accent: string;
}

# Authoring a CuteLoader animation

Every loader is a plain data object (`AnimationSource`, see `src/types/animation.ts`) made of
**inner SVG markup + scoped CSS**. One engine (`src/lib/engine.ts`) turns that definition into the
live preview, the customization studio, and every export (HTML/CSS, SVG, React, JavaScript, embed, GIF).
If it renders correctly here, it renders correctly in users' projects.

Category files live in `src/animations/<category>.ts` and `export default` an array of `AnimationSource`.

## The contract

### SVG (`svg`)
- Inner markup only, no outer `<svg>`. Default viewBox is `0 0 100 100` (keep it square unless you have a strong reason).
- Keep all content **inside the viewBox at every point of the animation**, because standalone `.svg` files clip at the viewBox. Leave ~4 units of padding.
- Use `class` attributes for anything you style or animate. No `style=""`, no `<script>`, no `<style>`, no event attributes, no `href`, no `<use>`, `<image>`, or `<foreignObject>`.
- **No SMIL** (`<animate>` and similar). CSS animations only, so play/pause, speed, reduced motion, and GIF export all work.
- `id`s (gradients) must be prefixed with the slug: `id="bouncing-bunny-glow"`, then `fill="url(#bouncing-bunny-glow)"`.
- Don't put an SVG `transform="…"` attribute on an element that CSS also animates with `transform` (CSS replaces it). Wrap it in a `<g transform="…">` instead.
- `<text>` is allowed (set `font-family` in CSS, e.g. `ui-monospace, Menlo, Consolas, monospace`). Keep text short.

### CSS (`css`)
- Start every selector with `ROOT` (it becomes `.cl-<slug>`): `ROOT .ear { … }`.
- Prefix every keyframe name with `K_` (it becomes `cl-<slug>-`): `@keyframes K_hop { … }`.
- Variables provided by the engine:

| Variable | Meaning | Rule |
|---|---|---|
| `var(--c1)` | primary color | must be used |
| `var(--c2)` | secondary color | must be used |
| `var(--c3)` | accent color | use only if `colors.accent` is set |
| `var(--d)` | duration of the main cycle (e.g. `1.2s`) | **all** timing comes from it |
| `var(--sw)` | stroke width (unitless SVG units) | use only if `stroke` is set |
| `var(--amp)` | motion intensity multiplier (0.4–1.6, default 1) | use only if `intensity: true` |

- **Timing:** never hard-code seconds. Durations are `var(--d)`, `calc(var(--d) * 2)`, or `calc(var(--d) / 3)`.
  Every duration must be `d × n` or `d / n` (n ≤ 4 for multiples) so the whole loader repeats seamlessly. This is what makes GIF export loop cleanly.
  Use **negative delays** for staggering (`animation-delay: calc(var(--d) * -0.25)`) so the loader looks mid-motion from the first frame.
- Make keyframes loop seamlessly (the 0% and 100% states match).
- Transforms on SVG elements use user units in px: `translate(0px, -12px)`.
  - Rotate or scale around the element's own center: `transform-box: fill-box; transform-origin: center;`
  - Rotate around the viewBox center: `transform-origin: 50px 50px;` (default `transform-box` is view-box)
- Intensity: `transform: translateY(calc(var(--amp) * -14px))`. Variables work inside keyframes.
- Don't write a `prefers-reduced-motion` query; the engine adds one that slows the loader down (×3).
- Compatibility: animate `transform`, `opacity`, `fill`, `stroke`, `stroke-dashoffset`, and `stroke-dasharray`.
  **Do not animate** `d: path()` (Safari can't), or geometry properties such as `r`, `cx`, `rx`, `x`, `width` (unreliable in Safari). Emulate morphs with scale/rotate of layered shapes.
- Performance: no `filter`/blur unless essential, at most about 60 elements, and no `content:`.
- Gradient stops are colored with CSS: `ROOT .stop-a { stop-color: var(--c1) }`.
- Hard-coded neutral colors (eyes, highlights, outlines) are fine, but the loader must read well on **both white and near-black** backgrounds.

### Data fields
- `slug`: kebab-case of the name (`"Bouncing Bunny"` → `bouncing-bunny`).
- `description`: 1–2 natural sentences (80–200 chars), specific to this loader. No keyword stuffing, and no "This animation…" boilerplate repeated across loaders.
- `details`: 3–5 original sentences: personality, where it fits (which kinds of sites or states), and a customization tip that names the real color roles.
- `tags`: 4–7 lowercase style keywords (motion + subject + mood), e.g. `["bounce", "bunny", "character", "playful", "pastel"]`.
- `kind`: one of `spinner | bounce | pulse | morph | orbit | wave | progress | character | particles | typing`.
- `colors` (`#rrggbb`) plus `colorLabels` naming each role as the user sees it (`{ primary: "Body", secondary: "Cheeks" }`).
- `duration`: seconds for the main cycle (typically 0.8–3).
- `stroke`, `intensity`, `direction`: set **only** when supported (the studio hides controls that don't apply). `direction: true` only if every animation runs with the default `normal` direction and still looks right reversed (spinners, orbits, flows).
- `popularity`: editorial featured score 1–100 (the visually strongest, most broadly useful loaders score highest).

## Example

```ts
{
  slug: "example-orbit",
  name: "Example Orbit",
  category: "minimal",
  description: "A single dot circling a soft track while it gently breathes — a calm, compact spinner for buttons and cards.",
  details: "…",
  tags: ["orbit", "dot", "spinner", "calm"],
  kind: "orbit",
  colors: { primary: "#8b5cf6", secondary: "#f472b6" },
  colorLabels: { primary: "Track", secondary: "Dot" },
  duration: 1.4,
  stroke: 6,
  direction: true,
  popularity: 50,
  svg: `
    <circle class="track" cx="50" cy="50" r="34"/>
    <g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g>`,
  css: `
    ROOT .track { fill: none; stroke: var(--c1); stroke-width: var(--sw); opacity: .25 }
    ROOT .spin { transform-origin: 50px 50px; animation: K_spin var(--d) linear infinite }
    ROOT .dot { fill: var(--c2); transform-box: fill-box; transform-origin: center;
                animation: K_pulse calc(var(--d) / 2) ease-in-out infinite }
    @keyframes K_spin { to { transform: rotate(360deg) } }
    @keyframes K_pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(.7) } }`,
}
```

## QA

```bash
npm run check:animations -- cute        # one category
npm run check:animations                # everything
```

This lints the definitions, renders every loader in headless Chrome, freezes frames at 0/25/50/75% of the
cycle with the Web Animations API, and checks for: invalid standalone SVG, keyframes that never run, no visible motion,
content leaving the viewBox, and durations that would break a seamless loop. It writes a filmstrip screenshot to
`.scratch/check-<category>.png`. Look at it: the frames should clearly differ, and the loader must read on the dark tile.

## Lessons from building the library

- **Reversing and staggers.** Reversing every animation does not change the *order* of motions staggered with
  negative delays (three dots still pulse 1-2-3). Only set `direction: true` when the reversed loader looks right,
  e.g. single rotations or staggers that are equal or half a cycle apart.
- **Clipped content and the viewBox check.** The QA bounds check measures unclipped bounding boxes, so content
  hidden behind a `clipPath` (or a rotated full circle near the edge) can be flagged. Keep geometry inside the
  viewBox anyway, which keeps standalone SVG files safe, or treat a clip-only warning as informational.
- **Thick strokes near the edge** are not included in bounding boxes. Leave extra padding when a loader exposes
  the stroke control.
- **Class names** are scoped by `ROOT`, so short names like `dot` or `track` are fine. Avoid names that common CSS
  frameworks style globally (`hidden`, `collapse`, `show`, `fade`, `invisible`), because exported code may be
  pasted into sites that use them.

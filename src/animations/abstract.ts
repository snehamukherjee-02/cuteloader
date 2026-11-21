import type { AnimationSource } from "@/types/animation";

const abstract: AnimationSource[] = [
  /* ------------------------------------------------------------------ */
  /* 11. Liquid Morph                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "liquid-morph",
    name: "Liquid Morph",
    category: "abstract",
    description:
      "A glossy violet blob that never holds the same outline twice, wobbling like a drop of paint suspended in water.",
    details:
      "Four soft lobes turn against each other beneath one gradient skin, so the silhouette bulges, flattens and recovers without ever settling into a clean geometric shape. Each bulge catches an iridescent edge as it swells, while a fixed sheen sells the wet, glassy surface. It suits creative portfolios, generative-art tools and product launches that want something more alive than a spinner. Body sets the main color, Core the warm center and Rim the shimmer on the bulging edges; keep Core lighter than Body so the depth survives.",
    tags: ["morph", "blob", "liquid", "gradient", "organic", "glossy"],
    kind: "morph",
    colors: { primary: "#8b5cf6", secondary: "#f472b6", accent: "#2dd4bf" },
    colorLabels: { primary: "Body", secondary: "Core", accent: "Rim" },
    duration: 2.4,
    popularity: 86,
    svg: `
    <defs>
      <radialGradient id="liquid-morph-body" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="36">
        <stop class="s-core" offset=".05"/><stop class="s-edge" offset=".68"/><stop class="s-rim" offset="1"/>
      </radialGradient>
      <linearGradient id="liquid-morph-sheen" x1="0" y1="0" x2="0" y2="1">
        <stop class="s-sheen" offset="0"/><stop class="s-sheen s-fade" offset="1"/>
      </linearGradient>
    </defs>
    <g class="body">
      <ellipse class="lobe" cx="50" cy="50" rx="34" ry="25" fill="url(#liquid-morph-body)"/>
      <ellipse class="lobe l2" cx="50" cy="50" rx="31" ry="24" fill="url(#liquid-morph-body)"/>
      <circle class="lobe l3" cx="60" cy="46" r="19" fill="url(#liquid-morph-body)"/>
      <circle class="lobe l4" cx="41" cy="58" r="18" fill="url(#liquid-morph-body)"/>
      <g transform="rotate(-38 40 36)"><ellipse class="sheen" cx="40" cy="36" rx="11" ry="5" fill="url(#liquid-morph-sheen)"/></g>
      <circle class="spark" cx="33.5" cy="44" r="1.7"/>
    </g>`,
    css: `
    ROOT .s-core { stop-color: var(--c2) }
    ROOT .s-edge { stop-color: var(--c1) }
    ROOT .s-rim { stop-color: var(--c3) }
    ROOT .s-sheen { stop-color: #fff; stop-opacity: .85 }
    ROOT .s-fade { stop-opacity: 0 }
    ROOT .body { transform-origin: 50px 50px; animation: K_wobble var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
    ROOT .lobe { transform-origin: 50px 50px; animation: K_cw calc(var(--d) * 4) linear infinite }
    ROOT .l2 { animation: K_ccw calc(var(--d) * 2) linear infinite }
    ROOT .l3 { animation: K_cw calc(var(--d) * 2) linear infinite; animation-delay: calc(var(--d) * -0.6) }
    ROOT .l4 { animation: K_ccw calc(var(--d) * 4) linear infinite; animation-delay: calc(var(--d) * -1.3) }
    ROOT .sheen { transform-box: fill-box; transform-origin: center; animation: K_sheen var(--d) ease-in-out infinite }
    ROOT .spark { fill: #fff; animation: K_spark calc(var(--d) / 2) ease-in-out infinite }
    @keyframes K_wobble {
      0%, 100% { transform: scale(1, 1) }
      25% { transform: scale(1.05, .95) }
      50% { transform: scale(.97, 1.04) }
      75% { transform: scale(1.03, .97) }
    }
    @keyframes K_cw { to { transform: rotate(360deg) } }
    @keyframes K_ccw { from { transform: rotate(90deg) } to { transform: rotate(-270deg) } }
    @keyframes K_sheen { 0%, 100% { opacity: .95; transform: scale(1) } 50% { opacity: .6; transform: scale(.88, 1) } }
    @keyframes K_spark { 0%, 100% { opacity: .9 } 50% { opacity: .35 } }`,
  },

  /* ------------------------------------------------------------------ */
  /* 12. Colorful Blob                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "colorful-blob",
    name: "Colorful Blob",
    category: "abstract",
    description:
      "Three translucent blobs of pink, orange and violet rise, sink and melt into each other like wax in a lava lamp.",
    details:
      "Two blobs climb and sink in opposite columns while the third loops a lazy figure-eight between them, stretching as it speeds up and squashing as it turns. Wherever they pass, their colors mix into new tints instead of hiding one another. The pace is deliberately unhurried, which makes it a natural fit for music apps, playlist builders, retro-flavored landing pages and anything with a relaxed after-hours mood. Because the blobs are see-through, choose colors that blend well: a pink Blob A and an orange Blob B melt into coral, while a cooler Blob C adds depth wherever it slides through.",
    tags: ["lava lamp", "blob", "drift", "translucent", "retro", "colorful"],
    kind: "morph",
    colors: { primary: "#f472b6", secondary: "#fb923c", accent: "#8b5cf6" },
    colorLabels: { primary: "Blob A", secondary: "Blob B", accent: "Blob C" },
    duration: 2.8,
    popularity: 78,
    svg: `
    <g class="dx x1"><g class="dy"><g class="blob b1">
      <circle cx="36" cy="50" r="16"/><circle cx="44" cy="43" r="10"/><circle cx="29" cy="57" r="9"/>
    </g></g></g>
    <g class="dx x2"><g class="dy y2"><g class="blob b2">
      <circle cx="64" cy="50" r="15.5"/><circle cx="56" cy="57" r="9.5"/><circle cx="71" cy="43" r="9"/>
    </g></g></g>
    <g class="dx x3"><g class="dy y3"><g class="blob b3">
      <circle cx="50" cy="50" r="15"/><circle cx="58" cy="44" r="9"/><circle cx="42" cy="56" r="9.5"/>
    </g></g></g>`,
    css: `
    ROOT .b1 circle { fill: var(--c1) }
    ROOT .b2 circle { fill: var(--c2) }
    ROOT .b3 circle { fill: var(--c3) }
    ROOT .blob { opacity: .82 }
    ROOT .dy { animation: K_dy calc(var(--d) * 2) cubic-bezier(.37, 0, .63, 1) infinite }
    ROOT .dx { animation: K_dx calc(var(--d) * 2) cubic-bezier(.37, 0, .63, 1) infinite }
    ROOT .x1 { animation-delay: calc(var(--d) * -0.5) }
    ROOT .y2 { animation-delay: calc(var(--d) * -1) }
    ROOT .x2 { animation-delay: calc(var(--d) * -1.5) }
    ROOT .y3 { animation: K_dy3 var(--d) cubic-bezier(.37, 0, .63, 1) infinite; animation-delay: calc(var(--d) * -0.25) }
    ROOT .x3 { animation: K_dx3 calc(var(--d) * 2) cubic-bezier(.37, 0, .63, 1) infinite }
    ROOT .b1 { transform-origin: 36px 50px; animation: K_goo calc(var(--d) * 2) linear infinite }
    ROOT .b2 { transform-origin: 64px 50px; animation: K_gooBack calc(var(--d) * 2) linear infinite; animation-delay: calc(var(--d) * -1) }
    ROOT .b3 { transform-origin: 50px 50px; animation: K_goo var(--d) linear infinite }
    @keyframes K_dy { 0%, 100% { transform: translateY(-14px) } 50% { transform: translateY(14px) } }
    @keyframes K_dx { 0%, 100% { transform: translateX(-5px) } 50% { transform: translateX(5px) } }
    @keyframes K_dy3 { 0%, 100% { transform: translateY(-8px) } 50% { transform: translateY(8px) } }
    @keyframes K_dx3 { 0%, 100% { transform: translateX(-13px) } 50% { transform: translateX(13px) } }
    @keyframes K_goo {
      0%, 100% { transform: scale(1.06, .94) rotate(0deg) }
      25% { transform: scale(.93, 1.08) rotate(90deg) }
      50% { transform: scale(1.06, .94) rotate(180deg) }
      75% { transform: scale(.93, 1.08) rotate(270deg) }
    }
    @keyframes K_gooBack {
      0%, 100% { transform: scale(1.06, .94) rotate(0deg) }
      25% { transform: scale(.93, 1.08) rotate(-90deg) }
      50% { transform: scale(1.06, .94) rotate(-180deg) }
      75% { transform: scale(.93, 1.08) rotate(-270deg) }
    }`,
  },

  /* ------------------------------------------------------------------ */
  /* 13. Gradient Waves                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "gradient-waves",
    name: "Gradient Waves",
    category: "abstract",
    description:
      "A round badge of layered water bands, each sliding sideways at its own pace while the waterline gently rises and falls.",
    details:
      "Three wave bands are stacked from light to deep and drift in alternating directions, so the badge has the slow parallax of looking into a tank rather than the rush of a spinner. Every band is built from repeating tiles that shift by whole wavelengths, which keeps the motion perfectly seamless however long the wait. It sits comfortably in wellness apps, travel and weather products, file uploads and any interface with a calm, airy palette. Crest colors the back band, Middle the next one and Deep the front water, so a light Crest over a dark Deep gives the strongest sense of depth.",
    tags: ["waves", "gradient", "badge", "parallax", "flow", "calm"],
    kind: "wave",
    colors: { primary: "#6366f1", secondary: "#38bdf8", accent: "#2dd4bf" },
    colorLabels: { primary: "Deep", secondary: "Middle", accent: "Crest" },
    duration: 3,
    popularity: 84,
    svg: `
    <defs>
      <clipPath id="gradient-waves-clip"><circle cx="50" cy="50" r="36"/></clipPath>
      <linearGradient id="gradient-waves-back" gradientUnits="userSpaceOnUse" x1="0" y1="32" x2="0" y2="62">
        <stop class="g3" offset="0"/><stop class="g2" offset="1"/>
      </linearGradient>
      <linearGradient id="gradient-waves-mid" gradientUnits="userSpaceOnUse" x1="0" y1="45" x2="0" y2="76">
        <stop class="g2" offset="0"/><stop class="g1" offset="1"/>
      </linearGradient>
      <linearGradient id="gradient-waves-front" gradientUnits="userSpaceOnUse" x1="0" y1="58" x2="0" y2="88">
        <stop class="g1" offset="0"/><stop class="g1" offset="1"/>
      </linearGradient>
    </defs>
    <circle class="sky" cx="50" cy="50" r="36"/>
    <g clip-path="url(#gradient-waves-clip)">
<g class="bob">
        <path class="w1" fill="url(#gradient-waves-back)" d="M86.2 38.39C88.04 37.52 89.89 36.51 91.73 35.64C93.58 34.78 95.42 34.06 97.27 33.69C99.11 33.32 100.96 33.31 102.8 33.65V89H86.2Z"/>
        <path class="w1 t1" fill="url(#gradient-waves-back)" d="M86.2 39.93C88.04 40.48 89.89 40.7 91.73 40.55C93.58 40.4 95.42 39.87 97.27 39.12C99.11 38.36 100.96 37.38 102.8 36.45V89H86.2Z"/>
        <path class="w1 t2" fill="url(#gradient-waves-back)" d="M86.2 34.31C88.04 34.93 89.89 35.84 91.73 36.77C93.58 37.71 95.42 38.66 97.27 39.37C99.11 40.08 100.96 40.52 102.8 40.59V89H86.2Z"/>
        <path class="w1 t3" fill="url(#gradient-waves-back)" d="M86.2 35.27C88.04 34.45 89.89 33.81 91.73 33.55C93.58 33.28 95.42 33.39 97.27 33.83C99.11 34.27 100.96 35.05 102.8 35.95V89H86.2Z"/>
        <path class="w1 t4" fill="url(#gradient-waves-back)" d="M86.2 40.46C88.04 40.2 89.89 39.58 91.73 38.76C93.58 37.95 95.42 36.94 97.27 36.04C99.11 35.14 100.96 34.34 102.8 33.88V89H86.2Z"/>
        <path class="w1 t5" fill="url(#gradient-waves-back)" d="M86.2 37.19C88.04 38.13 89.89 39.04 91.73 39.67C93.58 40.3 95.42 40.64 97.27 40.6C99.11 40.55 100.96 40.13 102.8 39.44V89H86.2Z"/>
        <path class="w1 t6" fill="url(#gradient-waves-back)" d="M86.2 33.45C88.04 33.29 89.89 33.51 91.73 34.05C93.58 34.59 95.42 35.44 97.27 36.36C99.11 37.28 100.96 38.27 102.8 39.04V89H86.2Z"/>
      </g>
      <g class="bob b2">
        <path class="w2" fill="url(#gradient-waves-mid)" d="M-2.8 51.79C-0.96 50.75 0.89 49.3 2.73 48.25C4.58 47.2 6.42 46.63 8.27 46.85C10.11 47.08 11.96 48.09 13.8 49.31V89H-2.8Z"/>
        <path class="w2 t1" fill="url(#gradient-waves-mid)" d="M-2.8 47.24C-0.96 47.87 0.89 49.18 2.73 50.42C4.58 51.65 6.42 52.75 8.27 53.09C10.11 53.42 11.96 52.96 13.8 51.98V89H-2.8Z"/>
        <path class="w2 t2" fill="url(#gradient-waves-mid)" d="M-2.8 53.19C-0.96 53.09 0.89 52.19 2.73 51C4.58 49.82 6.42 48.41 8.27 47.59C10.11 46.77 11.96 46.58 13.8 47.12V89H-2.8Z"/>
        <path class="w2 t3" fill="url(#gradient-waves-mid)" d="M-2.8 47.01C-0.96 46.56 0.89 46.88 2.73 47.78C4.58 48.68 6.42 50.11 8.27 51.26C10.11 52.41 11.96 53.21 13.8 53.2V89H-2.8Z"/>
        <path class="w2 t4" fill="url(#gradient-waves-mid)" d="M-2.8 52.19C-0.96 53.1 0.89 53.43 2.73 53C4.58 52.57 6.42 51.39 8.27 50.14C10.11 48.89 11.96 47.65 13.8 47.11V89H-2.8Z"/>
        <path class="w2 t5" fill="url(#gradient-waves-mid)" d="M-2.8 49.04C-0.96 47.85 0.89 46.93 2.73 46.81C4.58 46.7 6.42 47.38 8.27 48.49C10.11 49.59 11.96 51.04 13.8 52.01V89H-2.8Z"/>
        <path class="w2 t6" fill="url(#gradient-waves-mid)" d="M-2.8 49.54C-0.96 50.78 0.89 52.09 2.73 52.74C4.58 53.39 6.42 53.32 8.27 52.59C10.11 51.85 11.96 50.49 13.8 49.27V89H-2.8Z"/>
      </g>
      <g class="bob b3">
        <path class="w3" fill="url(#gradient-waves-front)" d="M86.2 63.81C88.04 62.99 89.89 62.04 91.73 61.22C93.58 60.4 95.42 59.72 97.27 59.37C99.11 59.03 100.96 59.01 102.8 59.34V89H86.2Z"/>
        <path class="w3 t1" fill="url(#gradient-waves-front)" d="M86.2 65.27C88.04 65.78 89.89 66 91.73 65.86C93.58 65.71 95.42 65.21 97.27 64.5C99.11 63.78 100.96 62.86 102.8 61.98V89H86.2Z"/>
        <path class="w3 t2" fill="url(#gradient-waves-front)" d="M86.2 59.96C88.04 60.55 89.89 61.4 91.73 62.29C93.58 63.17 95.42 64.07 97.27 64.74C99.11 65.4 100.96 65.83 102.8 65.89V89H86.2Z"/>
        <path class="w3 t3" fill="url(#gradient-waves-front)" d="M86.2 60.86C88.04 60.09 89.89 59.49 91.73 59.24C93.58 58.99 95.42 59.09 97.27 59.51C99.11 59.93 100.96 60.66 102.8 61.51V89H86.2Z"/>
        <path class="w3 t4" fill="url(#gradient-waves-front)" d="M86.2 65.77C88.04 65.53 89.89 64.94 91.73 64.16C93.58 63.39 95.42 62.45 97.27 61.59C99.11 60.74 100.96 59.99 102.8 59.55V89H86.2Z"/>
        <path class="w3 t5" fill="url(#gradient-waves-front)" d="M86.2 62.68C88.04 63.57 89.89 64.43 91.73 65.02C93.58 65.61 95.42 65.94 97.27 65.9C99.11 65.86 100.96 65.45 102.8 64.8V89H86.2Z"/>
        <path class="w3 t6" fill="url(#gradient-waves-front)" d="M86.2 59.15C88.04 59 89.89 59.21 91.73 59.71C93.58 60.22 95.42 61.02 97.27 61.89C99.11 62.77 100.96 63.7 102.8 64.43V89H86.2Z"/>
      </g>
    </g>
    <circle class="rim" cx="50" cy="50" r="36"/>
    <path class="gloss" d="M24.6 37.5A29 29 0 0 1 37.5 24.6"/>`,
    css: `
    ROOT .g1 { stop-color: var(--c1) }
    ROOT .g2 { stop-color: var(--c2) }
    ROOT .g3 { stop-color: var(--c3) }
    ROOT .sky { fill: var(--c2); opacity: .22 }
    ROOT .rim { fill: none; stroke: var(--c1); stroke-width: 1.4; opacity: .3 }
    ROOT .gloss { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .7 }
    ROOT .bob { animation: K_bob calc(var(--d) * 2) cubic-bezier(.45, 0, .55, 1) infinite }
    ROOT .b2 { animation-delay: calc(var(--d) * -0.6) }
    ROOT .b3 { animation-delay: calc(var(--d) * -1.2) }
    ROOT .t1 { --i: 1 }
    ROOT .t2 { --i: 2 }
    ROOT .t3 { --i: 3 }
    ROOT .t4 { --i: 4 }
    ROOT .t5 { --i: 5 }
    ROOT .t6 { --i: 6 }
    ROOT .w1 { animation: K_left calc(var(--d) * 4) linear infinite; animation-delay: calc(var(--d) * var(--i, 0) * -4 / 7) }
    ROOT .w2 { animation: K_right calc(var(--d) * 2) linear infinite; animation-delay: calc(var(--d) * var(--i, 0) * -2 / 7) }
    ROOT .w3 { animation: K_left var(--d) linear infinite; animation-delay: calc(var(--d) * var(--i, 0) * -1 / 7) }
    @keyframes K_bob { 0%, 100% { transform: translateY(0px) } 50% { transform: translateY(-2.5px) } }
    @keyframes K_left { to { transform: translateX(-89px) } }
    @keyframes K_right { to { transform: translateX(89px) } }`,
  },

  /* ------------------------------------------------------------------ */
  /* 14. Floating Orbs                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "floating-orbs",
    name: "Floating Orbs",
    category: "abstract",
    description:
      "Three glossy spheres hover at different heights, bobbing out of step above soft colored glows that swell as they sink.",
    details:
      "Each orb is built from a solid color, a shading layer and a bright specular spot, so it reads as a lacquered marble rather than a flat dot even at small sizes. The orbs drift on staggered timing and their glows breathe in reply, which gives the loader a quiet, weightless rhythm. Try it in meditation and sleep apps, premium onboarding screens, 3D product showcases and dreamy hero sections. Center sets the large front orb, Left and Right the smaller ones behind it; saturated hues keep the gloss convincing on both light and dark pages.",
    tags: ["float", "orbs", "glossy", "levitate", "spheres", "dreamy"],
    kind: "bounce",
    colors: { primary: "#f472b6", secondary: "#38bdf8", accent: "#fb923c" },
    colorLabels: { primary: "Center", secondary: "Left", accent: "Right" },
    duration: 2.4,
    popularity: 76,
    svg: `
    <defs>
      <radialGradient id="floating-orbs-shade" cx=".38" cy=".32" r=".78">
        <stop class="o-hi" offset="0"/><stop class="o-hi o-clear" offset=".45"/>
        <stop class="o-lo o-clear" offset=".7"/><stop class="o-lo" offset="1"/>
      </radialGradient>
      <radialGradient id="floating-orbs-g1"><stop class="w1" offset="0"/><stop class="w1 o-clear" offset="1"/></radialGradient>
      <radialGradient id="floating-orbs-g2"><stop class="w2" offset="0"/><stop class="w2 o-clear" offset="1"/></radialGradient>
      <radialGradient id="floating-orbs-g3"><stop class="w3" offset="0"/><stop class="w3 o-clear" offset="1"/></radialGradient>
    </defs>
    <ellipse class="glow k2" cx="21" cy="78" rx="13" ry="3.4" fill="url(#floating-orbs-g2)"/>
    <ellipse class="glow k3" cx="79" cy="75" rx="11.5" ry="3" fill="url(#floating-orbs-g3)"/>
    <ellipse class="glow" cx="50" cy="87" rx="18" ry="4.2" fill="url(#floating-orbs-g1)"/>
    <g class="orb m2">
      <circle class="c2" cx="21" cy="42" r="11.5"/>
      <circle cx="21" cy="42" r="11.5" fill="url(#floating-orbs-shade)"/>
      <g transform="rotate(-35 17.2 37.8)"><ellipse class="spec" cx="17.2" cy="37.8" rx="3.7" ry="2.2"/></g>
    </g>
    <g class="orb m3">
      <circle class="c3" cx="79" cy="38" r="10"/>
      <circle cx="79" cy="38" r="10" fill="url(#floating-orbs-shade)"/>
      <g transform="rotate(-35 75.7 34.4)"><ellipse class="spec" cx="75.7" cy="34.4" rx="3.2" ry="1.9"/></g>
    </g>
    <g class="orb m1">
      <circle class="c1" cx="50" cy="53" r="16.5"/>
      <circle cx="50" cy="53" r="16.5" fill="url(#floating-orbs-shade)"/>
      <g transform="rotate(-35 44.5 46.5)"><ellipse class="spec" cx="44.5" cy="46.5" rx="5.2" ry="3"/></g>
    </g>`,
    css: `
    ROOT .c1 { fill: var(--c1) }
    ROOT .c2 { fill: var(--c2) }
    ROOT .c3 { fill: var(--c3) }
    ROOT .w1 { stop-color: var(--c1); stop-opacity: .85 }
    ROOT .w2 { stop-color: var(--c2); stop-opacity: .85 }
    ROOT .w3 { stop-color: var(--c3); stop-opacity: .85 }
    ROOT .o-hi { stop-color: #fff; stop-opacity: .55 }
    ROOT .o-lo { stop-color: #000; stop-opacity: .28 }
    ROOT .o-clear { stop-opacity: 0 }
    ROOT .spec { fill: #fff; opacity: .9 }
    ROOT .orb { animation: K_float var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
    ROOT .glow { transform-box: fill-box; transform-origin: center; animation: K_glow var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
    ROOT .m1 { transform-origin: 50px 53px }
    ROOT .m2 { transform-origin: 21px 42px }
    ROOT .m3 { transform-origin: 79px 38px }
    ROOT .m2, ROOT .k2 { animation-delay: calc(var(--d) * -0.33) }
    ROOT .m3, ROOT .k3 { animation-delay: calc(var(--d) * -0.66) }
    @keyframes K_float { 0%, 100% { transform: translateY(4px) scale(.98) } 50% { transform: translateY(-5px) scale(1.02) } }
    @keyframes K_glow { 0%, 100% { transform: scale(1); opacity: 1 } 50% { transform: scale(.7); opacity: .5 } }`,
  },

  /* ------------------------------------------------------------------ */
  /* 15. Morphing Shapes                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "morphing-shapes",
    name: "Morphing Shapes",
    category: "abstract",
    description:
      "A circle twists into a rounded square, then a triangle, then back again, shifting its gradient with every change of form.",
    details:
      "The shape spins slowly while it holds each form, then whips round a third of a turn as the next one pops in, so every transition feels like a deliberate snap rather than a soft fade. Each form carries a gradient that flows into the color of the one after it, which keeps the cycle reading as a single object that keeps changing its mind. It is playful enough for design tools, kids' learning apps and onboarding flows, yet tidy enough for a SaaS dashboard. Circle, Square and Triangle each own one color, and neighboring hues give the smoothest blends between forms.",
    tags: ["morph", "geometry", "shapes", "shape-shift", "gradient", "playful"],
    kind: "morph",
    colors: { primary: "#f472b6", secondary: "#8b5cf6", accent: "#38bdf8" },
    colorLabels: { primary: "Circle", secondary: "Square", accent: "Triangle" },
    duration: 3,
    popularity: 80,
    svg: `
    <defs>
      <linearGradient id="morphing-shapes-a" x1="0" y1="0" x2="1" y2="1"><stop class="m1" offset="0"/><stop class="m2" offset="1"/></linearGradient>
      <linearGradient id="morphing-shapes-b" x1="0" y1="0" x2="1" y2="1"><stop class="m2" offset="0"/><stop class="m3" offset="1"/></linearGradient>
      <linearGradient id="morphing-shapes-c" x1="0" y1="0" x2="1" y2="1"><stop class="m3" offset="0"/><stop class="m1" offset="1"/></linearGradient>
    </defs>
    <g class="spin">
      <circle class="shape" cx="50" cy="50" r="26" fill="url(#morphing-shapes-a)"/>
      <rect class="shape square" x="27" y="27" width="46" height="46" rx="11" fill="url(#morphing-shapes-b)"/>
      <path class="shape tri" fill="url(#morphing-shapes-c)" d="M54.5 20.79L77.54 60.71Q82.04 68.5 73.04 68.5L26.96 68.5Q17.96 68.5 22.46 60.71L45.5 20.79Q50 13 54.5 20.79Z"/>
    </g>`,
    css: `
    ROOT .m1 { stop-color: var(--c1) }
    ROOT .m2 { stop-color: var(--c2) }
    ROOT .m3 { stop-color: var(--c3) }
    ROOT .spin { transform-origin: 50px 50px; animation: K_spin var(--d) ease-in-out infinite }
    ROOT .shape { transform-origin: 50px 50px; animation: K_circle var(--d) ease-in-out infinite }
    ROOT .square { animation-name: K_square }
    ROOT .tri { animation-name: K_tri }
    @keyframes K_spin {
      0% { transform: rotate(0deg) }
      20% { transform: rotate(15deg) }
      33.3% { transform: rotate(120deg) }
      53.3% { transform: rotate(135deg) }
      66.7% { transform: rotate(240deg) }
      86.7% { transform: rotate(255deg) }
      100% { transform: rotate(360deg) }
    }
    @keyframes K_circle {
      0%, 20% { opacity: 1; transform: scale(1) }
      33.3%, 86.7% { opacity: 0; transform: scale(.55) }
      95% { opacity: 1; transform: scale(1.06) }
      100% { opacity: 1; transform: scale(1) }
    }
    @keyframes K_square {
      0%, 20% { opacity: 0; transform: scale(.55) }
      28% { opacity: 1; transform: scale(1.06) }
      33.3%, 53.3% { opacity: 1; transform: scale(1) }
      66.7%, 100% { opacity: 0; transform: scale(.55) }
    }
    @keyframes K_tri {
      0%, 53.3% { opacity: 0; transform: scale(.55) }
      61.7% { opacity: 1; transform: scale(1.06) }
      66.7%, 86.7% { opacity: 1; transform: scale(1) }
      100% { opacity: 0; transform: scale(.55) }
    }`,
  },

  /* ------------------------------------------------------------------ */
  /* 16. Neon Rings                                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "neon-rings",
    name: "Neon Rings",
    category: "abstract",
    description:
      "Three dashed neon tubes spin against each other, each wrapped in a faint halo so it glows without a single filter.",
    details:
      "Every ring is drawn three times: a wide translucent halo, the colored tube and a thin white-hot core, which together fake the bloom of real neon while staying light enough for any device. The rings counter-rotate at different speeds and the halos hum softly, so the loader feels electric without becoming frantic. It looks at home on gaming sites, nightlife and music event pages, crypto dashboards and anything with a dark, cyberpunk theme, and still holds up on white. Outer, Middle and Inner color the three tubes; the stroke control thickens all of them while keeping the glow in proportion.",
    tags: ["neon", "rings", "spinner", "glow", "cyberpunk", "concentric"],
    kind: "spinner",
    colors: { primary: "#f472b6", secondary: "#22d3ee", accent: "#8b5cf6" },
    colorLabels: { primary: "Outer", secondary: "Middle", accent: "Inner" },
    duration: 2,
    stroke: 3.5,
    direction: true,
    popularity: 88,
    svg: `
    <g class="ring r1">
      <circle class="halo" cx="50" cy="50" r="37"/><circle class="tube" cx="50" cy="50" r="37"/><circle class="core" cx="50" cy="50" r="37"/>
    </g>
    <g class="ring r2">
      <circle class="halo" cx="50" cy="50" r="26.5"/><circle class="tube" cx="50" cy="50" r="26.5"/><circle class="core" cx="50" cy="50" r="26.5"/>
    </g>
    <g class="ring r3">
      <circle class="halo" cx="50" cy="50" r="16"/><circle class="tube" cx="50" cy="50" r="16"/><circle class="core" cx="50" cy="50" r="16"/>
    </g>`,
    css: `
    ROOT circle { fill: none; stroke-linecap: round }
    ROOT .r1 circle { stroke: var(--c1); stroke-dasharray: 70 46.24 }
    ROOT .r2 circle { stroke: var(--c2); stroke-dasharray: 32 23.5 }
    ROOT .r3 circle { stroke: var(--c3); stroke-dasharray: 62 38.53 }
    ROOT .ring .halo { stroke-width: calc(var(--sw) * 2.6); opacity: .22; animation: K_hum calc(var(--d) / 2) ease-in-out infinite }
    ROOT .ring .tube { stroke-width: var(--sw) }
    ROOT .ring .core { stroke: #fff; stroke-width: calc(var(--sw) * .3); opacity: .8 }
    ROOT .ring { transform-origin: 50px 50px; animation: K_cw calc(var(--d) * 2) linear infinite }
    ROOT .r2 { animation: K_ccw var(--d) linear infinite }
    ROOT .r3 { animation: K_cw calc(var(--d) / 2) linear infinite }
    ROOT .r2 .halo { animation-delay: calc(var(--d) * -0.17) }
    ROOT .r3 .halo { animation-delay: calc(var(--d) * -0.33) }
    @keyframes K_cw { to { transform: rotate(360deg) } }
    @keyframes K_ccw { to { transform: rotate(-360deg) } }
    @keyframes K_hum { 0%, 100% { opacity: .16 } 50% { opacity: .3 } }`,
  },

  /* ------------------------------------------------------------------ */
  /* 17. Cosmic Particles                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "cosmic-particles",
    name: "Cosmic Particles",
    category: "abstract",
    description:
      "Tiny motes stream along three spiral arms into a warm, pulsing core while distant stars blink around the edges.",
    details:
      "Particles fade in at the rim, pick up speed as they curl toward the center and vanish into the glow, while the whole galaxy turns slowly underneath them. Faint arm trails and a few twinkling sparkles fill in the depth, so it feels like a living star system rather than a ring of dots. It is a natural match for AI and data products, astronomy or science content, game launchers and late-night creative tools. Stardust colors the particles and arms, Core the glowing center and Stars the twinkles; a warm Core against cool Stardust gives the classic galaxy look.",
    tags: ["galaxy", "particles", "spiral", "space", "cosmic", "swirl"],
    kind: "particles",
    colors: { primary: "#8b5cf6", secondary: "#fb923c", accent: "#38bdf8" },
    colorLabels: { primary: "Stardust", secondary: "Core", accent: "Stars" },
    duration: 2,
    popularity: 82,
    svg: `
    <defs>
      <radialGradient id="cosmic-particles-glow"><stop class="cg" offset="0"/><stop class="cg cg-0" offset="1"/></radialGradient>
    </defs>
    <circle class="nebula" cx="50" cy="50" r="18" fill="url(#cosmic-particles-glow)"/>
    <g class="galaxy">
      <g>
        <path class="trail" d="M91 50C90.5 51 89.1 54.3 87.9 56.2C86.8 58.1 85.6 59.5 84 61.4C82.5 63.2 80.6 65.6 78.5 67.3C76.5 69.1 74.3 70.5 71.9 71.8C69.6 73 66.9 74 64.3 74.6C61.7 75.1 59 75.3 56.5 75.2C53.9 75 51.4 74.4 49.1 73.6C46.8 72.7 44.6 71.4 42.9 70C41.1 68.5 39.6 66.8 38.5 65C37.4 63.2 36.6 61.1 36.2 59.2C35.8 57.3 35.8 55.3 36.1 53.6C36.4 51.9 37.1 50.2 37.9 48.8C38.7 47.5 39.9 46.5 41 45.7C42.1 44.9 43.4 44.4 44.5 44.2C45.6 44 46.8 44.2 47.7 44.4C48.6 44.7 49.6 45.5 50 45.7"/>
        <circle class="p" cx="50" cy="50" r="2.7"/><circle class="p q1 alt" cx="50" cy="50" r="1.8"/>
        <circle class="p q2" cx="50" cy="50" r="2.3"/><circle class="p q3 alt" cx="50" cy="50" r="1.6"/>
        <circle class="p q4" cx="50" cy="50" r="2.6"/><circle class="p q5 alt" cx="50" cy="50" r="1.9"/>
        <circle class="p q6" cx="50" cy="50" r="2.2"/><circle class="p q7 alt" cx="50" cy="50" r="1.7"/>
      </g>
      <g transform="rotate(120 50 50)">
        <path class="trail" d="M91 50C90.5 51 89.1 54.3 87.9 56.2C86.8 58.1 85.6 59.5 84 61.4C82.5 63.2 80.6 65.6 78.5 67.3C76.5 69.1 74.3 70.5 71.9 71.8C69.6 73 66.9 74 64.3 74.6C61.7 75.1 59 75.3 56.5 75.2C53.9 75 51.4 74.4 49.1 73.6C46.8 72.7 44.6 71.4 42.9 70C41.1 68.5 39.6 66.8 38.5 65C37.4 63.2 36.6 61.1 36.2 59.2C35.8 57.3 35.8 55.3 36.1 53.6C36.4 51.9 37.1 50.2 37.9 48.8C38.7 47.5 39.9 46.5 41 45.7C42.1 44.9 43.4 44.4 44.5 44.2C45.6 44 46.8 44.2 47.7 44.4C48.6 44.7 49.6 45.5 50 45.7"/>
        <circle class="p alt" cx="50" cy="50" r="2.1"/><circle class="p q1" cx="50" cy="50" r="2.6"/>
        <circle class="p q2 alt" cx="50" cy="50" r="1.7"/><circle class="p q3" cx="50" cy="50" r="2.5"/>
        <circle class="p q4 alt" cx="50" cy="50" r="1.8"/><circle class="p q5" cx="50" cy="50" r="2.2"/>
        <circle class="p q6 alt" cx="50" cy="50" r="1.6"/><circle class="p q7" cx="50" cy="50" r="2.6"/>
      </g>
      <g transform="rotate(240 50 50)">
        <path class="trail" d="M91 50C90.5 51 89.1 54.3 87.9 56.2C86.8 58.1 85.6 59.5 84 61.4C82.5 63.2 80.6 65.6 78.5 67.3C76.5 69.1 74.3 70.5 71.9 71.8C69.6 73 66.9 74 64.3 74.6C61.7 75.1 59 75.3 56.5 75.2C53.9 75 51.4 74.4 49.1 73.6C46.8 72.7 44.6 71.4 42.9 70C41.1 68.5 39.6 66.8 38.5 65C37.4 63.2 36.6 61.1 36.2 59.2C35.8 57.3 35.8 55.3 36.1 53.6C36.4 51.9 37.1 50.2 37.9 48.8C38.7 47.5 39.9 46.5 41 45.7C42.1 44.9 43.4 44.4 44.5 44.2C45.6 44 46.8 44.2 47.7 44.4C48.6 44.7 49.6 45.5 50 45.7"/>
        <circle class="p" cx="50" cy="50" r="2.5"/><circle class="p q1 alt" cx="50" cy="50" r="1.7"/>
        <circle class="p q2" cx="50" cy="50" r="2.7"/><circle class="p q3 alt" cx="50" cy="50" r="1.9"/>
        <circle class="p q4" cx="50" cy="50" r="2.1"/><circle class="p q5 alt" cx="50" cy="50" r="1.6"/>
        <circle class="p q6" cx="50" cy="50" r="2.6"/><circle class="p q7 alt" cx="50" cy="50" r="1.8"/>
      </g>
    </g>
    <circle class="core" cx="50" cy="50" r="5.5"/>
    <circle class="hot" cx="50" cy="50" r="2"/>
    <g transform="translate(14 16)"><path class="star" d="M0 -4.5Q.7 -.7 4.5 0Q.7 .7 0 4.5Q-.7 .7 -4.5 0Q-.7 -.7 0 -4.5Z"/></g>
    <g transform="translate(86 15)"><path class="star t2" d="M0 -4Q.6 -.6 4 0Q.6 .6 0 4Q-.6 .6 -4 0Q-.6 -.6 0 -4Z"/></g>
    <g transform="translate(88 76)"><path class="star t3" d="M0 -4.5Q.7 -.7 4.5 0Q.7 .7 0 4.5Q-.7 .7 -4.5 0Q-.7 -.7 0 -4.5Z"/></g>
    <g transform="translate(15 84)"><path class="star t4" d="M0 -3.5Q.5 -.5 3.5 0Q.5 .5 0 3.5Q-.5 .5 -3.5 0Q-.5 -.5 0 -3.5Z"/></g>
    <g transform="translate(70 90)"><path class="star t5" d="M0 -3Q.5 -.5 3 0Q.5 .5 0 3Q-.5 .5 -3 0Q-.5 -.5 0 -3Z"/></g>`,
    css: `
    ROOT .cg { stop-color: var(--c2); stop-opacity: .6 }
    ROOT .cg-0 { stop-opacity: 0 }
    ROOT .nebula { transform-box: fill-box; transform-origin: center; animation: K_pulse calc(var(--d) / 2) ease-in-out infinite }
    ROOT .galaxy { transform-origin: 50px 50px; animation: K_turn calc(var(--d) * 4) linear infinite }
    ROOT .trail { fill: none; stroke: var(--c1); stroke-width: 1.4; stroke-linecap: round; opacity: .2 }
    ROOT .p { fill: var(--c1); transform-origin: 50px 50px; animation: K_swirl calc(var(--d) * 2) linear infinite }
    ROOT .p.alt { fill: var(--c3) }
    ROOT .q1 { animation-delay: calc(var(--d) * -0.25) }
    ROOT .q2 { animation-delay: calc(var(--d) * -0.5) }
    ROOT .q3 { animation-delay: calc(var(--d) * -0.75) }
    ROOT .q4 { animation-delay: calc(var(--d) * -1) }
    ROOT .q5 { animation-delay: calc(var(--d) * -1.25) }
    ROOT .q6 { animation-delay: calc(var(--d) * -1.5) }
    ROOT .q7 { animation-delay: calc(var(--d) * -1.75) }
    ROOT .core { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: K_pulse calc(var(--d) / 2) ease-in-out infinite }
    ROOT .hot { fill: #fff; opacity: .9 }
    ROOT .star { fill: var(--c3); transform-box: fill-box; transform-origin: center; animation: K_twinkle var(--d) ease-in-out infinite }
    ROOT .t2 { fill: var(--c1); animation-delay: calc(var(--d) * -0.4) }
    ROOT .t3 { animation-delay: calc(var(--d) * -0.75) }
    ROOT .t4 { fill: var(--c1); animation-delay: calc(var(--d) * -0.2) }
    ROOT .t5 { animation-delay: calc(var(--d) * -0.55) }
    @keyframes K_turn { to { transform: rotate(360deg) } }
    @keyframes K_pulse { 0%, 100% { transform: scale(.88) } 50% { transform: scale(1.12) } }
    @keyframes K_twinkle {
      0%, 100% { opacity: 0; transform: scale(.2) rotate(0deg) }
      50% { opacity: 1; transform: scale(1) rotate(45deg) }
    }
    @keyframes K_swirl {
      0% { transform: rotate(0deg) translateX(41px) scale(.4); opacity: 0 }
      12.5% { transform: rotate(20.1deg) translateX(35.4px) scale(.8); opacity: .9 }
      25% { transform: rotate(49.5deg) translateX(30px) scale(1); opacity: 1 }
      37.5% { transform: rotate(83.8deg) translateX(24.7px) scale(1) }
      50% { transform: rotate(121.8deg) translateX(19.6px) scale(1) }
      62.5% { transform: rotate(162.8deg) translateX(14.6px) scale(.9); opacity: 1 }
      75% { transform: rotate(206.4deg) translateX(9.9px) scale(.75) }
      87.5% { transform: rotate(252.2deg) translateX(5.6px) scale(.55); opacity: .7 }
      100% { transform: rotate(300deg) translateX(2px) scale(.3); opacity: 0 }
    }`,
  },

  /* ------------------------------------------------------------------ */
  /* 18. Orbiting Dots                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "orbiting-dots",
    name: "Orbiting Dots",
    category: "abstract",
    description:
      "Three electrons race around tilted elliptical orbits at different speeds, swelling as they swing past and dimming behind a glowing nucleus.",
    details:
      "Each orbit is a true ellipse traced in perspective, and the electrons grow on the near side and shrink on the far side, so the little atom has real depth even at icon size. One electron laps the others while a third takes the long way round, keeping the pattern from ever looking mechanical. It fits science and education sites, research tools, AI and developer products and anything that wants a smart, technical flavor without code imagery. Orbits colors the tracks, Electrons the moving dots and Nucleus the pulsing core; keep Electrons the brightest of the three so they stay easy to follow.",
    tags: ["atom", "orbit", "electrons", "science", "dots", "depth"],
    kind: "orbit",
    colors: { primary: "#6366f1", secondary: "#fb923c", accent: "#2dd4bf" },
    colorLabels: { primary: "Orbits", secondary: "Electrons", accent: "Nucleus" },
    duration: 2.4,
    direction: true,
    popularity: 85,
    svg: `
    <defs>
      <radialGradient id="orbiting-dots-nucleus" cx=".38" cy=".35" r=".7"><stop class="n-a" offset="0"/><stop class="n-b" offset="1"/></radialGradient>
      <radialGradient id="orbiting-dots-halo"><stop class="h-a" offset="0"/><stop class="h-a h-z" offset="1"/></radialGradient>
    </defs>
    <circle class="halo" cx="50" cy="50" r="18" fill="url(#orbiting-dots-halo)"/>
    <g transform="rotate(-30 50 50)"><ellipse class="orbit" cx="50" cy="50" rx="38" ry="13"/></g>
    <g transform="rotate(30 50 50)"><ellipse class="orbit" cx="50" cy="50" rx="38" ry="13"/></g>
    <g transform="rotate(90 50 50)"><ellipse class="orbit" cx="50" cy="50" rx="38" ry="13"/></g>
    <circle class="nucleus" cx="50" cy="50" r="8.5" fill="url(#orbiting-dots-nucleus)"/>
    <g transform="rotate(-30 50 50)"><g transform="matrix(1 0 0 .342 0 32.9)">
      <g class="spin s1"><g class="e e1"><circle class="eh" cx="88" cy="50" r="7"/><circle class="ed" cx="88" cy="50" r="4.2"/></g></g>
    </g></g>
    <g transform="rotate(30 50 50)"><g transform="matrix(1 0 0 .342 0 32.9)">
      <g class="spin s2"><g class="e e2"><circle class="eh" cx="88" cy="50" r="7"/><circle class="ed" cx="88" cy="50" r="4.2"/></g></g>
    </g></g>
    <g transform="rotate(90 50 50)"><g transform="matrix(1 0 0 .342 0 32.9)">
      <g class="spin s3"><g class="e e3"><circle class="eh" cx="88" cy="50" r="7"/><circle class="ed" cx="88" cy="50" r="4.2"/></g></g>
    </g></g>`,
    css: `
    ROOT .n-a { stop-color: var(--c3) }
    ROOT .n-b { stop-color: var(--c1) }
    ROOT .h-a { stop-color: var(--c3); stop-opacity: .45 }
    ROOT .h-z { stop-opacity: 0 }
    ROOT .orbit { fill: none; stroke: var(--c1); stroke-width: 1.3; opacity: .55 }
    ROOT .halo { transform-box: fill-box; transform-origin: center; animation: K_beat calc(var(--d) / 2) ease-in-out infinite }
    ROOT .nucleus { transform-box: fill-box; transform-origin: center; animation: K_beat calc(var(--d) / 2) ease-in-out infinite; animation-delay: calc(var(--d) * -0.06) }
    ROOT .spin { transform-origin: 50px 50px }
    ROOT .e { transform-origin: 88px 50px }
    ROOT .ed { fill: var(--c2) }
    ROOT .eh { fill: var(--c2); opacity: .25 }
    ROOT .s1 { animation: K_cw var(--d) linear infinite }
    ROOT .e1 { animation: K_ecw var(--d) linear infinite }
    ROOT .s2 { animation: K_ccw calc(var(--d) / 2) linear infinite; animation-delay: calc(var(--d) * -0.2) }
    ROOT .e2 { animation: K_eccw calc(var(--d) / 2) linear infinite; animation-delay: calc(var(--d) * -0.2) }
    ROOT .s3 { animation: K_cw calc(var(--d) * 2) linear infinite; animation-delay: calc(var(--d) * -1.1) }
    ROOT .e3 { animation: K_ecw calc(var(--d) * 2) linear infinite; animation-delay: calc(var(--d) * -1.1) }
    @keyframes K_beat { 0%, 100% { transform: scale(.92) } 50% { transform: scale(1.08) } }
    @keyframes K_cw { to { transform: rotate(360deg) } }
    @keyframes K_ccw { to { transform: rotate(-360deg) } }
    @keyframes K_ecw {
      0% { transform: rotate(0deg) scaleY(2.924) scale(1); opacity: 1 }
      25% { transform: rotate(-90deg) scaleY(2.924) scale(1.25); opacity: 1 }
      50% { transform: rotate(-180deg) scaleY(2.924) scale(1); opacity: 1 }
      75% { transform: rotate(-270deg) scaleY(2.924) scale(.7); opacity: .5 }
      100% { transform: rotate(-360deg) scaleY(2.924) scale(1); opacity: 1 }
    }
    @keyframes K_eccw {
      0% { transform: rotate(0deg) scaleY(2.924) scale(1); opacity: 1 }
      25% { transform: rotate(90deg) scaleY(2.924) scale(.7); opacity: .5 }
      50% { transform: rotate(180deg) scaleY(2.924) scale(1); opacity: 1 }
      75% { transform: rotate(270deg) scaleY(2.924) scale(1.25); opacity: 1 }
      100% { transform: rotate(360deg) scaleY(2.924) scale(1); opacity: 1 }
    }`,
  },

  /* ------------------------------------------------------------------ */
  /* 19. Infinity Loop                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "infinity-loop",
    name: "Infinity Loop",
    category: "abstract",
    description:
      "A bright gradient streak glides endlessly around a figure-eight track, and the crossing point flares each time it passes through.",
    details:
      "The streak travels at a steady pace over a faint copy of the path, picking up the left color on one loop and the right color on the other, while a soft halo underneath gives it a lit-from-within feel. A small node at the center flashes in time with every pass, which turns a simple path animation into something rhythmic and satisfying to watch. It suits sync and backup screens, subscription or membership flows, fintech dashboards and any message about continuous work. Left and Right set the two ends of the gradient and Spark the flash at the crossing; the stroke control thickens the track and streak together.",
    tags: ["infinity", "loop", "figure-eight", "gradient", "endless", "line"],
    kind: "spinner",
    colors: { primary: "#6366f1", secondary: "#f472b6", accent: "#38bdf8" },
    colorLabels: { primary: "Left", secondary: "Right", accent: "Spark" },
    duration: 2,
    stroke: 5,
    direction: true,
    popularity: 90,
    svg: `
    <defs>
      <linearGradient id="infinity-loop-grad" gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="88" y2="0">
        <stop class="i-a" offset="0"/><stop class="i-b" offset="1"/>
      </linearGradient>
    </defs>
    <path class="track" stroke="url(#infinity-loop-grad)" d="M50 50C58 39 66 31 75 31C83 31 88 40 88 50C88 60 83 69 75 69C66 69 58 61 50 50C42 39 34 31 25 31C17 31 12 40 12 50C12 60 17 69 25 69C34 69 42 61 50 50Z"/>
    <path class="glow" stroke="url(#infinity-loop-grad)" d="M50 50C58 39 66 31 75 31C83 31 88 40 88 50C88 60 83 69 75 69C66 69 58 61 50 50C42 39 34 31 25 31C17 31 12 40 12 50C12 60 17 69 25 69C34 69 42 61 50 50Z"/>
    <path class="run" stroke="url(#infinity-loop-grad)" d="M50 50C58 39 66 31 75 31C83 31 88 40 88 50C88 60 83 69 75 69C66 69 58 61 50 50C42 39 34 31 25 31C17 31 12 40 12 50C12 60 17 69 25 69C34 69 42 61 50 50Z"/>
    <circle class="flare" cx="50" cy="50" r="7"/>
    <circle class="node" cx="50" cy="50" r="2.8"/>`,
    css: `
    ROOT .i-a { stop-color: var(--c1) }
    ROOT .i-b { stop-color: var(--c2) }
    ROOT path { fill: none; stroke-linecap: round }
    ROOT .track { stroke-width: var(--sw); opacity: .22 }
    ROOT .glow { stroke-width: calc(var(--sw) * 2.6); opacity: .2; stroke-dasharray: 64 168.06; animation: K_run var(--d) linear infinite }
    ROOT .run { stroke-width: var(--sw); stroke-dasharray: 64 168.06; animation: K_run var(--d) linear infinite }
    ROOT .flare, ROOT .node { fill: var(--c3); transform-box: fill-box; transform-origin: center; animation: K_flash calc(var(--d) / 2) ease-in-out infinite; animation-delay: calc(var(--d) * -0.25) }
    ROOT .flare { animation-name: K_flare }
    @keyframes K_run { from { stroke-dashoffset: 32 } to { stroke-dashoffset: -200.06 } }
    @keyframes K_flash { 0%, 25%, 75%, 100% { opacity: .35; transform: scale(.6) } 50% { opacity: 1; transform: scale(1.15) } }
    @keyframes K_flare { 0%, 25%, 75%, 100% { opacity: 0; transform: scale(.4) } 50% { opacity: .35; transform: scale(1) } }`,
  },

  /* ------------------------------------------------------------------ */
  /* 20. Fluid Circles                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "fluid-circles",
    name: "Fluid Circles",
    category: "abstract",
    description:
      "Four translucent circles drift apart into a petal-like rosette and fold back together, turning slowly like a breathing exercise.",
    details:
      "The circles bloom outward and gather in again on a calm inhale-exhale rhythm, and because they overlap with transparency, every pass creates fresh blended tints at the center. A slow rotation keeps the rosette from ever feeling static, while a small heart at the middle pulses against the bloom. It is well suited to wellness and mindfulness apps, health portals, onboarding moments and soft, pastel brand sites. Petal A and Petal B alternate around the ring and Heart colors the center dot; two hues that sit close on the color wheel give the smoothest blends.",
    tags: ["circles", "bloom", "breathing", "translucent", "rosette", "calm"],
    kind: "pulse",
    colors: { primary: "#2dd4bf", secondary: "#8b5cf6", accent: "#38bdf8" },
    colorLabels: { primary: "Petal A", secondary: "Petal B", accent: "Heart" },
    duration: 2.8,
    popularity: 79,
    svg: `
    <g class="rosette">
      <g><circle class="petal" cx="50" cy="50" r="20"/></g>
      <g transform="rotate(90 50 50)"><circle class="petal p2" cx="50" cy="50" r="20"/></g>
      <g transform="rotate(180 50 50)"><circle class="petal p3" cx="50" cy="50" r="20"/></g>
      <g transform="rotate(270 50 50)"><circle class="petal p4" cx="50" cy="50" r="20"/></g>
    </g>
    <circle class="heart" cx="50" cy="50" r="4.5"/>`,
    css: `
    ROOT .rosette { transform-origin: 50px 50px; animation: K_turn calc(var(--d) * 2) linear infinite }
    ROOT .petal { fill: var(--c1); opacity: .75; transform-box: fill-box; transform-origin: center; animation: K_bloom var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
    ROOT .p2, ROOT .p4 { fill: var(--c2) }
    ROOT .p2 { animation-delay: calc(var(--d) * -0.06) }
    ROOT .p3 { animation-delay: calc(var(--d) * -0.12) }
    ROOT .p4 { animation-delay: calc(var(--d) * -0.18) }
    ROOT .heart { fill: var(--c3); transform-box: fill-box; transform-origin: center; animation: K_heart var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
    @keyframes K_turn { to { transform: rotate(360deg) } }
    @keyframes K_bloom { 0%, 100% { transform: translateX(6px) scale(.8) } 50% { transform: translateX(18px) scale(1.05) } }
    @keyframes K_heart { 0%, 100% { transform: scale(1.3) } 50% { transform: scale(.6) } }`,
  },
  /* ------------------------------------------------------------------ */
  /* 21. Ribbon Twist                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "ribbon-twist",
    name: "Ribbon Twist",
    category: "abstract",
    description:
      "A two-tone ribbon of slim slats rolls through a slow twist while the whole band ripples, flashing its back face at every turn.",
    details:
      "Each slat flips like a card as the twist passes, swapping from the front color to the back color at the exact moment it turns edge-on, so the band reads as a single ribbon rolling in space. A gentle traveling ripple keeps it flowing rather than spinning in place. It works well for fashion and lifestyle brands, event or gift pages, creative agencies and playful upload states. Front and Back are the two faces of the ribbon; strongly contrasting colors make the twist easiest to read, while close tones give a softer, satin feel.",
    tags: ["ribbon", "twist", "faux 3d", "flow", "two-tone", "wave"],
    kind: "wave",
    colors: { primary: "#fb923c", secondary: "#8b5cf6" },
    colorLabels: { primary: "Front", secondary: "Back" },
    duration: 2.4,
    popularity: 74,
    svg: `
    <g class="wv"><rect class="sg" x="11.75" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s1"><rect class="sg" x="15.55" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s2"><rect class="sg" x="19.35" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s3"><rect class="sg" x="23.15" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s4"><rect class="sg" x="26.95" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s5"><rect class="sg" x="30.75" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s6"><rect class="sg" x="34.55" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s7"><rect class="sg" x="38.35" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s8"><rect class="sg" x="42.15" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s9"><rect class="sg" x="45.95" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s10"><rect class="sg" x="49.75" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s11"><rect class="sg" x="53.55" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s12"><rect class="sg" x="57.35" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s13"><rect class="sg" x="61.15" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s14"><rect class="sg" x="64.95" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s15"><rect class="sg" x="68.75" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s16"><rect class="sg" x="72.55" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s17"><rect class="sg" x="76.35" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s18"><rect class="sg" x="80.15" y="36" width="4.3" height="28" rx=".9"/></g>
    <g class="wv s19"><rect class="sg" x="83.95" y="36" width="4.3" height="28" rx=".9"/></g>`,
    css: `
    ROOT .s1 { --i: 1 }
    ROOT .s2 { --i: 2 }
    ROOT .s3 { --i: 3 }
    ROOT .s4 { --i: 4 }
    ROOT .s5 { --i: 5 }
    ROOT .s6 { --i: 6 }
    ROOT .s7 { --i: 7 }
    ROOT .s8 { --i: 8 }
    ROOT .s9 { --i: 9 }
    ROOT .s10 { --i: 10 }
    ROOT .s11 { --i: 11 }
    ROOT .s12 { --i: 12 }
    ROOT .s13 { --i: 13 }
    ROOT .s14 { --i: 14 }
    ROOT .s15 { --i: 15 }
    ROOT .s16 { --i: 16 }
    ROOT .s17 { --i: 17 }
    ROOT .s18 { --i: 18 }
    ROOT .s19 { --i: 19 }
    ROOT .wv { animation: K_wave calc(var(--d) * 2) cubic-bezier(.37, 0, .63, 1) infinite; animation-delay: calc(var(--d) * (var(--i, 0) * .075 - 2)) }
    ROOT .sg { fill: var(--c1); transform-box: fill-box; transform-origin: center; animation: K_twist var(--d) linear infinite; animation-delay: calc(var(--d) * (var(--i, 0) * .05 - 1)) }
    @keyframes K_wave { 0%, 100% { transform: translateY(-7px) } 50% { transform: translateY(7px) } }
    @keyframes K_twist {
      0% { transform: scaleY(1); fill: var(--c1); animation-timing-function: cubic-bezier(.12, 0, .39, 0) }
      24.6% { fill: var(--c1) }
      25% { transform: scaleY(0); animation-timing-function: cubic-bezier(.61, 1, .88, 1) }
      25.4% { fill: var(--c2) }
      50% { transform: scaleY(-1); animation-timing-function: cubic-bezier(.12, 0, .39, 0) }
      74.6% { fill: var(--c2) }
      75% { transform: scaleY(0); animation-timing-function: cubic-bezier(.61, 1, .88, 1) }
      75.4% { fill: var(--c1) }
      100% { transform: scaleY(1); fill: var(--c1) }
    }`,
  },

  /* ------------------------------------------------------------------ */
  /* 22. Kaleidoscope                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "kaleidoscope",
    name: "Kaleidoscope",
    category: "abstract",
    description:
      "Mirrored shards bloom and tilt inside a six-fold mandala that slowly turns, cycling through jewel tones like a kaleidoscope in your hands.",
    details:
      "Every shard has a mirrored twin, so as the pieces push outward, tilt and breathe, the pattern stays perfectly symmetrical without ever settling on one picture. Colors travel through all three hues at staggered offsets, which keeps the mandala shimmering while it turns. It suits art and design communities, photo or filter apps, festival and event sites and any brand with a bold, decorative streak. Shard A, Shard B and Shard C each pass through every piece of the pattern, so choose three colors that blend gracefully into one another.",
    tags: ["kaleidoscope", "mandala", "symmetry", "shards", "jewel tones", "rotate"],
    kind: "morph",
    colors: { primary: "#fbbf24", secondary: "#f472b6", accent: "#8b5cf6" },
    colorLabels: { primary: "Shard A", secondary: "Shard B", accent: "Shard C" },
    duration: 2.4,
    popularity: 79,
    svg: `
    <g class="turn">
      <g><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="matrix(-1 0 0 1 100 0)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(60 50 50)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(60 50 50) matrix(-1 0 0 1 100 0)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(120 50 50)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(120 50 50) matrix(-1 0 0 1 100 0)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(180 50 50)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(180 50 50) matrix(-1 0 0 1 100 0)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(240 50 50)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(240 50 50) matrix(-1 0 0 1 100 0)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(300 50 50)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <g transform="rotate(300 50 50) matrix(-1 0 0 1 100 0)"><path class="k1" d="M50 36L50 10L58.14 26.36Z"/><path class="k2" d="M57.5 37.01L65.5 23.15L57.88 29.46Z"/><path class="k3" d="M66.5 21.42L72.5 11.03L64.46 15.94Z"/></g>
      <path class="hub" d="M50 38L53.25 44.37L60.39 44L56.5 50L60.39 56L53.25 55.63L50 62L46.75 55.63L39.61 56L43.5 50L39.61 44L46.75 44.37Z"/>
    </g>`,
    css: `
    ROOT .turn { transform-origin: 50px 50px; animation: K_turn calc(var(--d) * 4) linear infinite }
    ROOT .turn path { stroke-width: .8; stroke-linejoin: round }
    ROOT .hub { transform-origin: 50px 50px; animation: K_hue calc(var(--d) * 3) linear infinite, K_breathe var(--d) cubic-bezier(.45, 0, .55, 1) infinite; animation-delay: calc(var(--d) * -3), calc(var(--d) * -0.5) }
    ROOT .k1 { animation: K_hue calc(var(--d) * 3) linear infinite, K_push var(--d) cubic-bezier(.45, 0, .55, 1) infinite; animation-delay: calc(var(--d) * -1), calc(var(--d) * -1) }
    ROOT .k2 { transform-box: fill-box; transform-origin: center; animation: K_hue calc(var(--d) * 3) linear infinite, K_tilt var(--d) cubic-bezier(.45, 0, .55, 1) infinite; animation-delay: calc(var(--d) * -2), calc(var(--d) * -0.33) }
    ROOT .k3 { transform-box: fill-box; transform-origin: center; animation: K_hue calc(var(--d) * 3) linear infinite, K_flare var(--d) cubic-bezier(.45, 0, .55, 1) infinite; animation-delay: calc(var(--d) * -2.5), calc(var(--d) * -0.67) }
    @keyframes K_turn { to { transform: rotate(360deg) } }
    @keyframes K_hue {
      0%, 100% { fill: var(--c1); stroke: var(--c1) }
      33.3% { fill: var(--c2); stroke: var(--c2) }
      66.7% { fill: var(--c3); stroke: var(--c3) }
    }
    @keyframes K_breathe { 0%, 100% { transform: scale(.75) rotate(0deg) } 50% { transform: scale(1.1) rotate(30deg) } }
    @keyframes K_push { 0%, 100% { transform: translateY(1.5px) } 50% { transform: translateY(-3.5px) } }
    @keyframes K_tilt { 0%, 100% { transform: rotate(-18deg) scale(.85) } 50% { transform: rotate(14deg) scale(1.08) } }
    @keyframes K_flare { 0%, 100% { transform: scale(.55); opacity: .55 } 50% { transform: scale(1.08); opacity: 1 } }`,
  },
];

export default abstract;

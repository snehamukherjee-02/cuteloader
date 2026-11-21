import type { AnimationSource } from "@/types/animation";

/**
 * Minimal & Professional: crisp, restrained workhorse loaders.
 * Ring geometry uses r = 36 (circumference 226.195) unless noted, so dash
 * patterns that tile the full circle use a period of 226.2.
 */
const minimal: AnimationSource[] = [
  {
    slug: "elegant-spinner",
    name: "Elegant Spinner",
    category: "minimal",
    description:
      "A rounded arc stretches to three quarters of a circle and gathers back in while it turns, drifting between two tones.",
    details:
      "This is the refined indeterminate spinner people recognize from polished product interfaces: one arc lengthens, catches up with itself and rotates on, so the wait always feels in motion. It sits comfortably inside primary buttons, full-page loading states and data tables that are still fetching. The arc alternates between the Arc color and the Shift tone on every other turn; set both to the same value for a strictly single-color spinner. Raise the stroke for a bolder mark at small sizes, and keep the speed near 1× for the calmest rhythm.",
    tags: ["spinner", "arc", "indeterminate", "rotate", "clean", "material"],
    kind: "spinner",
    colors: { primary: "#6366f1", secondary: "#8b5cf6" },
    colorLabels: { primary: "Arc", secondary: "Shift tone" },
    duration: 1.4,
    stroke: 7,
    direction: true,
    popularity: 95,
    svg: `
      <g class="spin"><circle class="arc" cx="50" cy="50" r="36"/></g>`,
    css: `
      ROOT .spin { transform-origin: 50px 50px; animation: K_spin calc(var(--d) * 2) linear infinite }
      ROOT .arc { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round;
        stroke-dasharray: 1px 225.2px;
        animation: K_dash var(--d) cubic-bezier(.42, 0, .58, 1) infinite, K_tint calc(var(--d) * 2) linear infinite }
      ROOT .spin, ROOT .arc { animation-delay: calc(var(--d) * -0.3) }
      @keyframes K_spin { to { transform: rotate(360deg) } }
      @keyframes K_dash {
        0% { stroke-dasharray: 1px 225.2px; stroke-dashoffset: 0px }
        50% { stroke-dasharray: 169.65px 56.55px; stroke-dashoffset: -56.55px }
        100% { stroke-dasharray: 1px 225.2px; stroke-dashoffset: -226.2px }
      }
      @keyframes K_tint {
        0%, 40% { stroke: var(--c1) }
        50%, 90% { stroke: var(--c2) }
        100% { stroke: var(--c1) }
      }`,
  },
  {
    slug: "three-dot-pulse",
    name: "Three Dot Pulse",
    category: "minimal",
    description:
      "Three round dots swell and brighten one after another in a steady left-to-right beat, compact enough to sit inline with text.",
    details:
      "Few loaders are as universally understood as a row of pulsing dots. With no ring and very little height, it fits where a spinner feels heavy: chat typing indicators, inline save states, the inside of a submit button or the last row of an infinite list. Resting dots use the Resting color and bloom into the Active color at the top of each pulse, so a neutral gray paired with your brand color looks especially polished. Nudge the speed up for chat, or slow it down for long background jobs.",
    tags: ["dots", "pulse", "sequence", "typing", "inline", "minimal"],
    kind: "pulse",
    colors: { primary: "#8b5cf6", secondary: "#94a3b8" },
    colorLabels: { primary: "Active", secondary: "Resting" },
    duration: 1.2,
    popularity: 94,
    svg: `
      <circle class="dot d1" cx="22" cy="50" r="9"/>
      <circle class="dot d2" cx="50" cy="50" r="9"/>
      <circle class="dot" cx="78" cy="50" r="9"/>`,
    css: `
      ROOT .dot { fill: var(--c2); transform-box: fill-box; transform-origin: center;
        animation: K_pulse var(--d) ease-in-out infinite }
      ROOT .d1 { animation-delay: calc(var(--d) * -0.5) }
      ROOT .d2 { animation-delay: calc(var(--d) * -0.25) }
      @keyframes K_pulse {
        0%, 70%, 100% { transform: scale(.55); opacity: .45; fill: var(--c2) }
        35% { transform: scale(1); opacity: 1; fill: var(--c1) }
      }`,
  },
  {
    slug: "minimal-ring",
    name: "Minimal Ring",
    category: "minimal",
    description:
      "A quarter arc glides around a faint full ring at an even pace, the cleanest and most familiar way to say loading.",
    details:
      "When you want a loader nobody has to think about, this is it. The track shows the whole circle and the arc travels steadily around it, which keeps the motion legible even at icon sizes in toolbars and table cells. It is equally at home on login screens, modal bodies and route transitions in admin panels. Set the Arc to your brand color and keep the Track a lighter tint of it; the stroke control sets the weight, from a hairline 2 for large empty states to 10 for tiny button spinners.",
    tags: ["ring", "spinner", "classic", "track", "rotate", "clean"],
    kind: "spinner",
    colors: { primary: "#6366f1", secondary: "#a5b4fc" },
    colorLabels: { primary: "Arc", secondary: "Track" },
    duration: 0.9,
    stroke: 8,
    direction: true,
    popularity: 97,
    svg: `
      <circle class="track" cx="50" cy="50" r="36"/>
      <circle class="arc" cx="50" cy="50" r="36"/>`,
    css: `
      ROOT .track { fill: none; stroke: var(--c2); stroke-width: var(--sw); opacity: .35 }
      ROOT .arc { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round;
        stroke-dasharray: 56.55px 169.65px; transform-origin: 50px 50px;
        animation: K_spin var(--d) linear infinite }
      @keyframes K_spin { to { transform: rotate(360deg) } }`,
  },
  {
    slug: "line-loader",
    name: "Line Loader",
    category: "minimal",
    description:
      "Two rounded segments race along a slim track at different speeds and lengths, the indeterminate bar for page tops and panels.",
    details:
      "An indeterminate bar communicates activity without promising a percentage. The longer segment stretches as it accelerates while a shorter one follows on a quicker curve, so the track never looks frozen. Pin it to the top of the page during route changes, under a toolbar while a table refreshes, or across a card that is uploading a file. Segments take the Segments color and the track uses the Track color at reduced opacity; reverse the direction for right-to-left layouts.",
    tags: ["progress", "bar", "linear", "indeterminate", "track", "horizontal"],
    kind: "progress",
    colors: { primary: "#0ea5e9", secondary: "#94a3b8" },
    colorLabels: { primary: "Segments", secondary: "Track" },
    duration: 2,
    viewBox: "0 0 160 32",
    direction: true,
    popularity: 88,
    svg: `
      <clipPath id="line-loader-clip"><rect x="10" y="12" width="140" height="8" rx="4"/></clipPath>
      <rect class="track" x="10" y="12" width="140" height="8" rx="4"/>
      <g clip-path="url(#line-loader-clip)">
        <line class="seg seg-a" x1="4" y1="16" x2="156" y2="16"/>
        <line class="seg seg-b" x1="4" y1="16" x2="156" y2="16"/>
      </g>`,
    css: `
      ROOT .track { fill: var(--c2); opacity: .35 }
      ROOT .seg { fill: none; stroke: var(--c1); stroke-width: 8px; stroke-linecap: round; stroke-dasharray: 16px 400px }
      ROOT .seg-a { animation: K_moveA var(--d) linear infinite, K_lenA var(--d) ease-in-out infinite;
        animation-delay: calc(var(--d) * -0.2) }
      ROOT .seg-b { animation: K_moveB var(--d) linear infinite, K_lenB var(--d) ease-in-out infinite;
        animation-delay: calc(var(--d) * -0.7) }
      @keyframes K_moveA {
        0% { stroke-dashoffset: 14px; animation-timing-function: cubic-bezier(.35, .15, .65, .85) }
        70%, 100% { stroke-dashoffset: -152px }
      }
      @keyframes K_lenA {
        0%, 70%, 100% { stroke-dasharray: 16px 400px }
        35% { stroke-dasharray: 88px 400px }
      }
      @keyframes K_moveB {
        0%, 10% { stroke-dashoffset: 10px; animation-timing-function: cubic-bezier(.35, .15, .65, .85) }
        60%, 100% { stroke-dashoffset: -152px }
      }
      @keyframes K_lenB {
        0%, 10%, 60%, 100% { stroke-dasharray: 12px 400px }
        35% { stroke-dasharray: 44px 400px }
      }`,
  },
  {
    slug: "rotating-squares",
    name: "Rotating Squares",
    category: "minimal",
    description:
      "An outlined square and a solid inner square turn in opposite directions in crisp quarter steps, breathing slightly with each turn.",
    details:
      "The two squares move like precise counter-rotating gears, settling after every quarter turn, which gives the loader a deliberate, engineered feel. It suits developer tools, analytics dashboards and settings pages where a circular spinner feels too soft. The outline takes the Frame color and the center takes the Core color; a strong Frame around a brighter Core reads best at small sizes. Lower the stroke for a light wireframe look, or raise it for a bold, blocky mark.",
    tags: ["squares", "geometric", "rotate", "counter-rotation", "stepped", "precise"],
    kind: "spinner",
    colors: { primary: "#8b5cf6", secondary: "#0ea5e9" },
    colorLabels: { primary: "Frame", secondary: "Core" },
    duration: 1.2,
    stroke: 6,
    direction: true,
    popularity: 78,
    svg: `
      <g class="turn-out"><rect class="outer" x="25" y="25" width="50" height="50" rx="6"/></g>
      <g class="turn-in"><rect class="inner" x="39" y="39" width="22" height="22" rx="3"/></g>`,
    css: `
      ROOT .turn-out, ROOT .turn-in, ROOT .outer, ROOT .inner { transform-origin: 50px 50px }
      ROOT .turn-out { animation: K_cw var(--d) cubic-bezier(.65, 0, .35, 1) infinite }
      ROOT .turn-in { animation: K_ccw var(--d) cubic-bezier(.65, 0, .35, 1) infinite }
      ROOT .outer { fill: none; stroke: var(--c1); stroke-width: var(--sw); animation: K_breatheOut var(--d) ease-in-out infinite }
      ROOT .inner { fill: var(--c2); animation: K_breatheIn var(--d) ease-in-out infinite }
      @keyframes K_cw { to { transform: rotate(90deg) } }
      @keyframes K_ccw { to { transform: rotate(-90deg) } }
      @keyframes K_breatheOut { 0%, 100% { transform: scale(1) } 50% { transform: scale(.88) } }
      @keyframes K_breatheIn { 0%, 100% { transform: scale(1) } 50% { transform: scale(.72) } }`,
  },
  {
    slug: "expanding-circle",
    name: "Expanding Circle",
    category: "minimal",
    description:
      "Soft rings ripple out from a solid center dot and fade as they grow, two at a time, like a calm radar ping.",
    details:
      "Ripples suggest that something is listening or connecting rather than crunching, which makes this loader a natural fit for live status, device pairing, location lookups and waiting-for-reply screens. The center dot stays anchored while staggered rings expand and dissolve, so the composition always feels balanced. Dot and Ripple can share one color for a single-tone pulse, or use a lighter Ripple for a softer glow. Stroke sets the ring thickness, and a slower speed turns it into an ambient idle indicator.",
    tags: ["ripple", "pulse", "rings", "radar", "status", "calm"],
    kind: "pulse",
    colors: { primary: "#059669", secondary: "#10b981" },
    colorLabels: { primary: "Dot", secondary: "Ripple" },
    duration: 2,
    stroke: 3,
    popularity: 84,
    svg: `
      <circle class="ring" cx="50" cy="50" r="40"/>
      <circle class="ring ring-late" cx="50" cy="50" r="40"/>
      <circle class="dot" cx="50" cy="50" r="9"/>`,
    css: `
      ROOT .ring { fill: none; stroke: var(--c2); stroke-width: var(--sw); transform-origin: 50px 50px;
        animation: K_grow var(--d) cubic-bezier(.35, .45, .55, 1) infinite, K_fade var(--d) cubic-bezier(.4, 0, .85, .7) infinite }
      ROOT .ring-late { animation-delay: calc(var(--d) * -0.5) }
      ROOT .dot { fill: var(--c1); transform-origin: 50px 50px; animation: K_beat calc(var(--d) / 2) ease-in-out infinite }
      @keyframes K_grow { 0% { transform: scale(.2) } 100% { transform: scale(1) } }
      @keyframes K_fade {
        0% { opacity: 0; animation-timing-function: linear }
        8% { opacity: .95 }
        100% { opacity: 0 }
      }
      @keyframes K_beat { 0%, 100% { transform: scale(1) } 50% { transform: scale(.86) } }`,
  },
  {
    slug: "thin-gradient-ring",
    name: "Thin Gradient Ring",
    category: "minimal",
    description:
      "A hairline ring with a bright rounded head and a tail that fades to nothing, spinning with the smooth sweep of a comet.",
    details:
      "The fading tail gives the eye a clear sense of direction and speed, while the thin stroke keeps the loader feeling light. It looks especially refined on dark hero sections, media players and onboarding screens, and stays crisp on white cards. The Head color leads and blends into the Tail color as it fades out; two neighboring hues such as rose and violet give the softest sweep. Keep the stroke between 2 and 5 to preserve the delicate look.",
    tags: ["gradient", "comet", "ring", "spinner", "thin", "smooth"],
    kind: "spinner",
    colors: { primary: "#f43f5e", secondary: "#8b5cf6" },
    colorLabels: { primary: "Head", secondary: "Tail" },
    duration: 1.1,
    stroke: 4,
    popularity: 85,
    svg: `
      <defs>
        <linearGradient id="thin-gradient-ring-q1" gradientUnits="userSpaceOnUse" x1="50" y1="14" x2="14" y2="50"><stop class="head-stop" offset="0"/><stop class="tail-stop" offset="1" stop-opacity=".62"/></linearGradient>
        <linearGradient id="thin-gradient-ring-q2" gradientUnits="userSpaceOnUse" x1="14" y1="50" x2="50" y2="86"><stop class="tail-stop" offset="0" stop-opacity=".62"/><stop class="tail-stop" offset="1" stop-opacity=".3"/></linearGradient>
        <linearGradient id="thin-gradient-ring-q3" gradientUnits="userSpaceOnUse" x1="50" y1="86" x2="86" y2="50"><stop class="tail-stop" offset="0" stop-opacity=".3"/><stop class="tail-stop" offset="1" stop-opacity=".1"/></linearGradient>
        <linearGradient id="thin-gradient-ring-q4" gradientUnits="userSpaceOnUse" x1="86" y1="50" x2="50" y2="14"><stop class="tail-stop" offset="0" stop-opacity=".1"/><stop class="tail-stop" offset="1" stop-opacity="0"/></linearGradient>
      </defs>
      <g class="spin">
        <path class="quarter" stroke="url(#thin-gradient-ring-q1)" d="M50 14A36 36 0 0 0 14 50"/>
        <path class="quarter" stroke="url(#thin-gradient-ring-q2)" d="M14 50A36 36 0 0 0 50 86"/>
        <path class="quarter" stroke="url(#thin-gradient-ring-q3)" d="M50 86A36 36 0 0 0 86 50"/>
        <path class="quarter" stroke="url(#thin-gradient-ring-q4)" d="M86 50A36 36 0 0 0 50 14"/>
        <path class="head" d="M49.995 14h.01"/>
      </g>`,
    css: `
      ROOT .head-stop { stop-color: var(--c1) }
      ROOT .tail-stop { stop-color: var(--c2) }
      ROOT .quarter { fill: none; stroke-width: var(--sw) }
      ROOT .head { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round }
      ROOT .spin { transform-origin: 50px 50px; animation: K_spin var(--d) linear infinite }
      @keyframes K_spin { to { transform: rotate(360deg) } }`,
  },
  {
    slug: "wave-bars",
    name: "Wave Bars",
    category: "minimal",
    description:
      "Five rounded bars rise and fall in a rolling sine wave, an equalizer-style loader for audio, voice and live data.",
    details:
      "The wave travels steadily across the bars, so it reads as activity rather than idle waiting. It suits voice assistants, audio uploads, streaming dashboards and any interface that processes sound or real-time metrics. The bars blend from the Start color on the left to the End color on the right; use one color for both if you prefer a flat look. Intensity sets how far each bar travels, from a gentle shimmer to a full-height bounce, and stroke controls the bar thickness.",
    tags: ["bars", "wave", "equalizer", "audio", "rhythm", "sine"],
    kind: "wave",
    colors: { primary: "#0ea5e9", secondary: "#6366f1" },
    colorLabels: { primary: "Start", secondary: "End" },
    duration: 1.2,
    stroke: 8,
    intensity: true,
    popularity: 90,
    svg: `
      <linearGradient id="wave-bars-blend" gradientUnits="userSpaceOnUse" x1="16" y1="0" x2="84" y2="0"><stop class="blend-a" offset="0"/><stop class="blend-b" offset="1"/></linearGradient>
      <g class="bars" stroke="url(#wave-bars-blend)">
        <g class="b1"><line class="body" x1="20" y1="24" x2="20" y2="76"/><line class="cap up" x1="20" y1="24" x2="20" y2="24.01"/><line class="cap dn" x1="20" y1="75.99" x2="20" y2="76"/></g>
        <g class="b2"><line class="body" x1="35" y1="24" x2="35" y2="76"/><line class="cap up" x1="35" y1="24" x2="35" y2="24.01"/><line class="cap dn" x1="35" y1="75.99" x2="35" y2="76"/></g>
        <g class="b3"><line class="body" x1="50" y1="24" x2="50" y2="76"/><line class="cap up" x1="50" y1="24" x2="50" y2="24.01"/><line class="cap dn" x1="50" y1="75.99" x2="50" y2="76"/></g>
        <g class="b4"><line class="body" x1="65" y1="24" x2="65" y2="76"/><line class="cap up" x1="65" y1="24" x2="65" y2="24.01"/><line class="cap dn" x1="65" y1="75.99" x2="65" y2="76"/></g>
        <g><line class="body" x1="80" y1="24" x2="80" y2="76"/><line class="cap up" x1="80" y1="24" x2="80" y2="24.01"/><line class="cap dn" x1="80" y1="75.99" x2="80" y2="76"/></g>
      </g>`,
    css: `
      ROOT .blend-a { stop-color: var(--c1) }
      ROOT .blend-b { stop-color: var(--c2) }
      ROOT .bars { fill: none; stroke-width: var(--sw) }
      ROOT .body { transform-origin: 50px 50px; animation: K_body var(--d) ease-in-out infinite }
      ROOT .cap { stroke-linecap: round }
      ROOT .up { animation: K_up var(--d) ease-in-out infinite }
      ROOT .dn { animation: K_dn var(--d) ease-in-out infinite }
      ROOT .b1 > * { animation-delay: calc(var(--d) * -0.48) }
      ROOT .b2 > * { animation-delay: calc(var(--d) * -0.36) }
      ROOT .b3 > * { animation-delay: calc(var(--d) * -0.24) }
      ROOT .b4 > * { animation-delay: calc(var(--d) * -0.12) }
      @keyframes K_body { 0%, 100% { transform: scaleY(calc(1 - .6 * var(--amp))) } 50% { transform: scaleY(1) } }
      @keyframes K_up { 0%, 100% { transform: translateY(calc(var(--amp) * 15.6px)) } 50% { transform: translateY(0px) } }
      @keyframes K_dn { 0%, 100% { transform: translateY(calc(var(--amp) * -15.6px)) } 50% { transform: translateY(0px) } }`,
  },
  {
    slug: "rotating-diamond",
    name: "Rotating Diamond",
    category: "minimal",
    description:
      "A diamond frame flips over like a coin and turns a quarter step, while a smaller diamond inside rotates the other way.",
    details:
      "The faux-3D flip adds a touch of craft without breaking the minimal style: the frame squeezes to a sliver, turns over, then rotates on while the inner diamond counter-turns. It fits premium plan pages, fintech dashboards, checkout confirmations and anywhere a plain ring feels too generic. Frame draws the outer outline and Gem the inner one; contrasting hues make the counter-rotation easier to follow. The stroke control thickens both outlines together, and slowing the speed makes the flip feel weightier.",
    tags: ["diamond", "flip", "3d", "geometric", "counter-rotation", "premium"],
    kind: "morph",
    colors: { primary: "#8b5cf6", secondary: "#f43f5e" },
    colorLabels: { primary: "Frame", secondary: "Gem" },
    duration: 1.8,
    stroke: 6,
    direction: true,
    popularity: 74,
    svg: `
      <polygon class="frame" points="50,14 86,50 50,86 14,50"/>
      <polygon class="gem" points="50,37 63,50 50,63 37,50"/>`,
    css: `
      ROOT .frame, ROOT .gem { fill: none; stroke-linejoin: miter; transform-origin: 50px 50px }
      ROOT .frame { stroke: var(--c1); stroke-width: var(--sw); animation: K_tumble var(--d) linear infinite }
      ROOT .gem { stroke: var(--c2); stroke-width: calc(var(--sw) * .75px); animation: K_counter var(--d) linear infinite }
      ROOT .frame, ROOT .gem { animation-delay: calc(var(--d) * -0.125) }
      @keyframes K_tumble {
        0% { transform: rotate(0deg) scaleX(1); animation-timing-function: cubic-bezier(.45, 0, .9, .55) }
        50% { transform: rotate(45deg) scaleX(.06) }
        50.01% { transform: rotate(45deg) scaleX(-.06); animation-timing-function: cubic-bezier(.1, .45, .55, 1) }
        100% { transform: rotate(90deg) scaleX(-1) }
      }
      @keyframes K_counter {
        0% { transform: rotate(0deg) scaleX(1); animation-timing-function: cubic-bezier(.45, 0, .9, .55) }
        50% { transform: rotate(-45deg) scaleX(.06) }
        50.01% { transform: rotate(-45deg) scaleX(-.06); animation-timing-function: cubic-bezier(.1, .45, .55, 1) }
        100% { transform: rotate(-90deg) scaleX(-1) }
      }`,
  },
  {
    slug: "smooth-progress-ring",
    name: "Smooth Progress Ring",
    category: "minimal",
    description:
      "A ring fills clockwise behind a rounded knob, pauses at full, then unwinds the same way with an unhurried ease.",
    details:
      "The fill-and-unwind loop feels like real progress even when you cannot report a percentage, which makes it a good stand-in for uploads, report generation, checkout processing and onboarding steps. A soft knob rides the moving edge, so the eye always knows where the action is. The Progress color draws the arc and knob over a faint Track; the stroke control scales the ring and the knob together. Lower the speed for long-running jobs so the loop feels patient rather than busy.",
    tags: ["progress", "ring", "fill", "knob", "circular", "smooth"],
    kind: "progress",
    colors: { primary: "#10b981", secondary: "#94a3b8" },
    colorLabels: { primary: "Progress", secondary: "Track" },
    duration: 2.8,
    stroke: 6,
    direction: true,
    popularity: 86,
    svg: `
      <circle class="track" cx="50" cy="50" r="36"/>
      <path class="fill" d="M50 14A36 36 0 1 1 50 86A36 36 0 1 1 50 14"/>
      <g class="rider"><path class="knob" d="M49.995 14h.01"/></g>`,
    css: `
      ROOT .track { fill: none; stroke: var(--c2); stroke-width: var(--sw); opacity: .3 }
      ROOT .fill { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round;
        stroke-dasharray: 0px 226.2px; animation: K_fill var(--d) cubic-bezier(.65, 0, .35, 1) infinite }
      ROOT .rider { transform-origin: 50px 50px; animation: K_ride var(--d) cubic-bezier(.65, 0, .35, 1) infinite }
      ROOT .knob { fill: none; stroke: var(--c1); stroke-width: calc(var(--sw) * 1.5px + 3px); stroke-linecap: round }
      @keyframes K_fill {
        0% { stroke-dasharray: 0px 226.2px; stroke-dashoffset: 0px }
        45%, 50% { stroke-dasharray: 226.2px 0px; stroke-dashoffset: 0px }
        95%, 100% { stroke-dasharray: 0px 226.2px; stroke-dashoffset: -226.2px }
      }
      @keyframes K_ride {
        0% { transform: rotate(0deg) }
        45%, 50% { transform: rotate(360deg) }
        95%, 100% { transform: rotate(720deg) }
      }`,
  },
  {
    slug: "dual-ring",
    name: "Dual Ring",
    category: "minimal",
    description:
      "Two concentric arcs spin in opposite directions at different speeds, a balanced, technical twist on the classic ring spinner.",
    details:
      "The outer arc turns clockwise while a quicker inner arc runs the other way, so the pair keeps passing each other and the picture never feels static. That interplay gives the loader more presence than a single ring while staying compact enough for cards, sidebars and modal dialogs. The Outer arc and Inner arc take separate colors; a strong outer tone over a lighter or brighter inner one keeps the hierarchy clear. Stroke thickens both arcs together, and reversing the direction swaps which way each ring turns.",
    tags: ["ring", "spinner", "concentric", "counter-rotation", "arcs", "balanced"],
    kind: "spinner",
    colors: { primary: "#6366f1", secondary: "#0ea5e9" },
    colorLabels: { primary: "Outer arc", secondary: "Inner arc" },
    duration: 2.4,
    stroke: 6,
    direction: true,
    popularity: 82,
    svg: `
      <circle class="outer" cx="50" cy="50" r="36"/>
      <circle class="inner" cx="50" cy="50" r="22"/>`,
    css: `
      ROOT .outer, ROOT .inner { fill: none; stroke-width: var(--sw); stroke-linecap: round; transform-origin: 50px 50px }
      ROOT .outer { stroke: var(--c1); stroke-dasharray: 72.4px 153.8px;
        animation: K_cw calc(var(--d) / 2) linear infinite }
      ROOT .inner { stroke: var(--c2); stroke-dasharray: 44.2px 94px; stroke-dashoffset: -69.1px;
        animation: K_ccw calc(var(--d) / 3) linear infinite }
      @keyframes K_cw { to { transform: rotate(360deg) } }
      @keyframes K_ccw { to { transform: rotate(-360deg) } }`,
  },
  {
    slug: "bouncing-dots",
    name: "Bouncing Dots",
    category: "minimal",
    description:
      "Three dots hop one after another and squash softly as they land over small ground shadows, friendly but still tidy.",
    details:
      "Where a pulse stays in place, these dots actually jump, and the gentle squash on landing plus the shadow that shrinks beneath each hop give them weight without cartoon excess. The rolling wave reads instantly as working on it, which suits chat replies, AI responses, search suggestions and inline save states. Dots carry the Dots color and the ground marks use the Shadow color at low opacity, so they sit comfortably on light and dark surfaces. Raise the intensity for higher, livelier hops, or lower it for a subtle bob inside buttons.",
    tags: ["dots", "bounce", "hop", "squash", "sequence", "friendly"],
    kind: "bounce",
    colors: { primary: "#0ea5e9", secondary: "#64748b" },
    colorLabels: { primary: "Dots", secondary: "Shadow" },
    duration: 1.4,
    intensity: true,
    popularity: 90,
    svg: `
      <ellipse class="shadow d1" cx="22" cy="69" rx="7" ry="1.8"/>
      <ellipse class="shadow d2" cx="50" cy="69" rx="7" ry="1.8"/>
      <ellipse class="shadow" cx="78" cy="69" rx="7" ry="1.8"/>
      <circle class="dot d1" cx="22" cy="59" r="8"/>
      <circle class="dot d2" cx="50" cy="59" r="8"/>
      <circle class="dot" cx="78" cy="59" r="8"/>`,
    css: `
      ROOT .dot { fill: var(--c1); transform-box: fill-box; transform-origin: 50% 100%;
        animation: K_hop var(--d) ease-in-out infinite }
      ROOT .shadow { fill: var(--c2); transform-box: fill-box; transform-origin: center;
        animation: K_shadow var(--d) ease-in-out infinite }
      ROOT .d1 { animation-delay: calc(var(--d) * -0.3) }
      ROOT .d2 { animation-delay: calc(var(--d) * -0.15) }
      @keyframes K_hop {
        0% { transform: translateY(0px) scale(1.14, .86); animation-timing-function: cubic-bezier(.25, .6, .45, 1) }
        30% { transform: translateY(calc(var(--amp) * -22px)) scale(1, 1); animation-timing-function: cubic-bezier(.55, 0, .75, .4) }
        60% { transform: translateY(0px) scale(1.14, .86); animation-timing-function: cubic-bezier(.3, .6, .5, 1) }
        72%, 88% { transform: translateY(0px) scale(1, 1) }
        100% { transform: translateY(0px) scale(1.14, .86) }
      }
      @keyframes K_shadow {
        0% { transform: scale(1.1); opacity: .55; animation-timing-function: cubic-bezier(.25, .6, .45, 1) }
        30% { transform: scale(calc(1 - .28 * var(--amp))); opacity: .2; animation-timing-function: cubic-bezier(.55, 0, .75, .4) }
        60% { transform: scale(1.1); opacity: .55; animation-timing-function: cubic-bezier(.3, .6, .5, 1) }
        72%, 88% { transform: scale(1); opacity: .45 }
        100% { transform: scale(1.1); opacity: .55 }
      }`,
  },
];

export default minimal;

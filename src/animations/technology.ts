import type { AnimationSource } from "@/types/animation";

const technology: AnimationSource[] = [
  {
    slug: "code-brackets",
    name: "Code Brackets",
    category: "technology",
    description:
      "Angle brackets spring apart and snap back while the slash between them flips end over end, a lively take on the classic </> code icon.",
    details:
      "A compact, confident mark for anything developer-facing. The brackets breathe outward after a small anticipation dip, and the slash finishes a half turn just as they settle, so the icon always lands back in a clean </> pose. It suits code playgrounds, documentation search, API consoles, and the build step of a deploy dialog. Set Brackets to your brand color and keep Slash a brighter contrasting hue so the spin stays readable at small sizes; the stroke slider makes the whole mark heavier or finer.",
    tags: ["code", "brackets", "developer", "pulse", "stroke", "icon"],
    kind: "pulse",
    colors: { primary: "#6366f1", secondary: "#22d3ee" },
    colorLabels: { primary: "Brackets", secondary: "Slash" },
    duration: 1.6,
    stroke: 7,
    popularity: 84,
    svg: `
    <path class="lt" d="M35 28L16 50L35 72"/>
    <path class="rt" d="M65 28L84 50L65 72"/>
    <g class="sp"><path class="sl" d="M56.5 25L43.5 75"/></g>`,
    css: `
    ROOT .lt, ROOT .rt, ROOT .sl { fill: none; stroke-width: var(--sw); stroke-linecap: round; stroke-linejoin: round }
    ROOT .lt, ROOT .rt { stroke: var(--c1); transform-box: fill-box; transform-origin: center }
    ROOT .lt { animation: K_left var(--d) cubic-bezier(.5, 0, .3, 1) infinite }
    ROOT .rt { animation: K_right var(--d) cubic-bezier(.5, 0, .3, 1) infinite }
    ROOT .sp { transform-box: fill-box; transform-origin: center; animation: K_spin var(--d) cubic-bezier(.7, 0, .3, 1) infinite }
    ROOT .sl { stroke: var(--c2); transform-box: fill-box; transform-origin: center; animation: K_squash var(--d) ease-in-out infinite }
    @keyframes K_left {
      0%, 100% { transform: translateX(0) scale(1) }
      16% { transform: translateX(2.5px) scale(1) }
      44% { transform: translateX(-8px) scale(1.05) }
      68% { transform: translateX(1px) scale(1) }
      80% { transform: translateX(0) scale(1) }
    }
    @keyframes K_right {
      0%, 100% { transform: translateX(0) scale(1) }
      16% { transform: translateX(-2.5px) scale(1) }
      44% { transform: translateX(8px) scale(1.05) }
      68% { transform: translateX(-1px) scale(1) }
      80% { transform: translateX(0) scale(1) }
    }
    @keyframes K_spin { 0%, 28% { transform: rotate(0deg) } 58%, 100% { transform: rotate(180deg) } }
    @keyframes K_squash { 0%, 28%, 58%, 100% { transform: scale(1) } 43% { transform: scale(.55) } }`,
  },
  {
    slug: "terminal-typing",
    name: "Terminal Typing",
    category: "technology",
    description:
      "A tiny terminal types out npm run dev one keystroke at a time, the block cursor marching along before two lines of output report back.",
    details:
      "This one tells a small story: an empty prompt, a command typed character by character, a few blinks of the cursor, then two lines of output before the screen clears and starts again. Each glyph sits at a fixed position, so the cursor stays aligned no matter which monospace font the visitor's system picks. It feels at home on CLI tool landing pages, developer onboarding flows, deploy previews, and docs sites that walk through setup commands. Change Prompt & cursor to recolor the caret and the success line, and Command text to match your syntax-highlighting theme.",
    tags: ["terminal", "typing", "cli", "cursor", "monospace", "developer"],
    kind: "typing",
    colors: { primary: "#22c55e", secondary: "#22d3ee" },
    colorLabels: { primary: "Prompt & cursor", secondary: "Command text" },
    duration: 3.2,
    popularity: 88,
    svg: `
    <rect class="win" x="8" y="16" width="84" height="68" rx="7"/>
    <path class="bar" d="M8 23a7 7 0 0 1 7-7h70a7 7 0 0 1 7 7v4H8z"/>
    <circle class="dot red" cx="15.5" cy="21.5" r="1.9"/>
    <circle class="dot amber" cx="21.5" cy="21.5" r="1.9"/>
    <circle class="dot green" cx="27.5" cy="21.5" r="1.9"/>
    <rect class="ttl" x="40" y="20.2" width="20" height="2.6" rx="1.3"/>
    <path class="pr" d="M14 40.5l4 3.5-4 3.5"/>
    <g class="txt">
      <text x="24.6" y="47.2">n</text><text x="29.8" y="47.2">p</text><text x="35" y="47.2">m</text>
      <text x="45.4" y="47.2">r</text><text x="50.6" y="47.2">u</text><text x="55.8" y="47.2">n</text>
      <text x="66.2" y="47.2">d</text><text x="71.4" y="47.2">e</text><text x="76.6" y="47.2">v</text>
    </g>
    <rect class="cover" x="22" y="37" width="57.2" height="14"/>
    <rect class="cur" x="22.4" y="39.2" width="4.4" height="9.4" rx=".6"/>
    <rect class="log" x="14" y="57" width="48" height="4" rx="2"/>
    <g class="done"><path class="ok" d="M14.5 70.5l2.6 2.6 4.6-5.2"/><rect class="okb" x="25" y="68.6" width="24" height="4" rx="2"/></g>`,
    css: `
    ROOT .win { fill: #0f172a; stroke: #334155; stroke-width: 1.2 }
    ROOT .bar { fill: #1e293b }
    ROOT .red { fill: #f87171 }
    ROOT .amber { fill: #fbbf24 }
    ROOT .green { fill: #4ade80 }
    ROOT .dot { opacity: .9 }
    ROOT .ttl { fill: #334155 }
    ROOT .pr, ROOT .ok { fill: none; stroke: var(--c1); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round }
    ROOT .txt text { fill: var(--c2); font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 8.8px; font-weight: 600; text-anchor: middle }
    ROOT .cover { fill: #0f172a; transform-box: fill-box; transform-origin: 100% 50%; animation: K_reveal var(--d) steps(11, end) infinite }
    ROOT .cur { fill: var(--c1); animation: K_caret var(--d) steps(11, end) infinite, K_blink var(--d) step-end infinite }
    ROOT .log { fill: #475569; animation: K_log var(--d) step-end infinite }
    ROOT .okb { fill: var(--c1) }
    ROOT .done { animation: K_done var(--d) step-end infinite }
    @keyframes K_reveal { 0%, 6% { transform: scaleX(1) } 50%, 92% { transform: scaleX(0) } 93%, 100% { transform: scaleX(1) } }
    @keyframes K_caret { 0%, 6% { transform: translateX(0) } 50%, 92% { transform: translateX(57.2px) } 93%, 100% { transform: translateX(0) } }
    @keyframes K_blink { 0% { opacity: 1 } 53% { opacity: 0 } 57% { opacity: 1 } 61% { opacity: 0 } 65% { opacity: 1 } 69% { opacity: 0 } 93%, 100% { opacity: 1 } }
    @keyframes K_log { 0% { opacity: 0 } 71% { opacity: 1 } 93%, 100% { opacity: 0 } }
    @keyframes K_done { 0% { opacity: 0 } 79% { opacity: 1 } 93%, 100% { opacity: 0 } }`,
  },
  {
    slug: "binary-rain",
    name: "Binary Rain",
    category: "technology",
    description:
      "Columns of ones and zeros stream down a rounded screen at staggered speeds, each trail led by a brighter digit.",
    details:
      "Four columns fall at two different speeds, which gives the panel a sense of depth without turning noisy. Every trail fades from a crisp leading bit to faint digits behind it, and the dark screen keeps the effect legible on light and dark pages alike. Use it for data imports, encryption or hashing steps, sync screens, or a playful hacker-themed 404 page. Trail sets the color of the fading digits and Leading bit the bright head; two hues from the same family keep it calm, while a strong contrast makes it feel more energetic.",
    tags: ["binary", "digits", "data", "stream", "screen", "digital"],
    kind: "particles",
    colors: { primary: "#a78bfa", secondary: "#22d3ee" },
    colorLabels: { primary: "Trail", secondary: "Leading bit" },
    duration: 3.6,
    popularity: 74,
    svg: `
    <defs><clipPath id="binary-rain-clip"><rect x="15" y="12" width="70" height="76" rx="9"/></clipPath></defs>
    <rect class="panel" x="14" y="11" width="72" height="78" rx="10"/>
    <g clip-path="url(#binary-rain-clip)">
      <text class="bit v3 h b1" x="26" y="12">1</text><text class="bit v3 t1 b2" x="26" y="12">0</text><text class="bit v3 t2 b3" x="26" y="12">1</text><text class="bit v3 t3 b4" x="26" y="12">1</text><text class="bit v3 t4 b5" x="26" y="12">0</text>
      <text class="bit v2 h b6" x="38" y="12">0</text><text class="bit v2 t1 b7" x="38" y="12">1</text><text class="bit v2 t2 b8" x="38" y="12">0</text><text class="bit v2 t3 b9" x="38" y="12">1</text>
      <text class="bit v3 h b10" x="50" y="12">1</text><text class="bit v3 t1 b11" x="50" y="12">1</text><text class="bit v3 t2 b12" x="50" y="12">0</text><text class="bit v3 t3 b13" x="50" y="12">0</text><text class="bit v3 t4 b14" x="50" y="12">1</text>
      <text class="bit v2 h b15" x="62" y="12">0</text><text class="bit v2 t1 b16" x="62" y="12">1</text><text class="bit v2 t2 b17" x="62" y="12">1</text>
      <text class="bit v3 h b18" x="74" y="12">1</text><text class="bit v3 t1 b19" x="74" y="12">0</text><text class="bit v3 t2 b20" x="74" y="12">0</text><text class="bit v3 t3 b21" x="74" y="12">1</text>
    </g>`,
    css: `
    ROOT .panel { fill: #0f172a; stroke: #334155; stroke-width: 1.5 }
    ROOT .bit { fill: var(--c1); font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 10.5px; font-weight: 700; text-anchor: middle }
    ROOT .h { fill: var(--c2); font-weight: 800 }
    ROOT .t1 { opacity: .78 }
    ROOT .t2 { opacity: .54 }
    ROOT .t3 { opacity: .34 }
    ROOT .t4 { opacity: .18 }
    ROOT .v2 { animation: K_fall calc(var(--d) / 2) linear infinite }
    ROOT .v3 { animation: K_fall calc(var(--d) / 3) linear infinite }
    ROOT .b1 { animation-delay: calc(var(--d) * -0.05) }
    ROOT .b2 { animation-delay: calc(var(--d) * -0.008) }
    ROOT .b3 { animation-delay: calc(var(--d) * -0.3) }
    ROOT .b4 { animation-delay: calc(var(--d) * -0.258) }
    ROOT .b5 { animation-delay: calc(var(--d) * -0.217) }
    ROOT .b6 { animation-delay: calc(var(--d) * -0.31) }
    ROOT .b7 { animation-delay: calc(var(--d) * -0.248) }
    ROOT .b8 { animation-delay: calc(var(--d) * -0.185) }
    ROOT .b9 { animation-delay: calc(var(--d) * -0.123) }
    ROOT .b10 { animation-delay: calc(var(--d) * -0.133) }
    ROOT .b11 { animation-delay: calc(var(--d) * -0.092) }
    ROOT .b12 { animation-delay: calc(var(--d) * -0.05) }
    ROOT .b13 { animation-delay: calc(var(--d) * -0.008) }
    ROOT .b14 { animation-delay: calc(var(--d) * -0.3) }
    ROOT .b15 { animation-delay: calc(var(--d) * -0.45) }
    ROOT .b16 { animation-delay: calc(var(--d) * -0.387) }
    ROOT .b17 { animation-delay: calc(var(--d) * -0.325) }
    ROOT .b18 { animation-delay: calc(var(--d) * -0.233) }
    ROOT .b19 { animation-delay: calc(var(--d) * -0.192) }
    ROOT .b20 { animation-delay: calc(var(--d) * -0.15) }
    ROOT .b21 { animation-delay: calc(var(--d) * -0.108) }
    @keyframes K_fall { from { transform: translateY(0) } to { transform: translateY(84px) } }`,
  },
  {
    slug: "circuit-pulse",
    name: "Circuit Pulse",
    category: "technology",
    description:
      "Light pulses race along printed-circuit traces from every edge and converge on a central chip, which flashes each time they land.",
    details:
      "Two sets of traces take turns firing, so the chip lights up twice per cycle with a ripple that spreads across its face. The fan-out routing, solder pads, and pin stubs give it the look of a real board while staying crisp at small sizes. It fits hardware and IoT products, AI inference steps, system status pages, and anything that wants to say processing. Traces controls the board wiring and pads, Pulse colors both the traveling signal and the chip glow, and the stroke slider thickens every trace at once.",
    tags: ["circuit", "chip", "pulse", "hardware", "electronics", "stroke"],
    kind: "pulse",
    colors: { primary: "#6366f1", secondary: "#22d3ee" },
    colorLabels: { primary: "Traces", secondary: "Pulse" },
    duration: 2.4,
    stroke: 2.5,
    popularity: 79,
    svg: `
    <path class="tr" d="M10 34H18L26 42H35M10 66H18L26 58H35M66 10V18L58 26V35M34 10V18L42 26V35M90 66H82L74 58H65M90 34H82L74 42H65M34 90V82L42 74V65M66 90V82L58 74V65"/>
    <path class="pin" d="M30 50H35M65 50H70M50 30V35M50 65V70"/>
    <path class="pu" pathLength="100" d="M10 34H18L26 42H35"/>
    <path class="pu" pathLength="100" d="M10 66H18L26 58H35"/>
    <path class="pu" pathLength="100" d="M90 66H82L74 58H65"/>
    <path class="pu" pathLength="100" d="M90 34H82L74 42H65"/>
    <path class="pu pb" pathLength="100" d="M66 10V18L58 26V35"/>
    <path class="pu pb" pathLength="100" d="M34 10V18L42 26V35"/>
    <path class="pu pb" pathLength="100" d="M34 90V82L42 74V65"/>
    <path class="pu pb" pathLength="100" d="M66 90V82L58 74V65"/>
    <circle class="pad" cx="10" cy="34" r="3"/><circle class="pad" cx="10" cy="66" r="3"/>
    <circle class="pad" cx="90" cy="66" r="3"/><circle class="pad" cx="90" cy="34" r="3"/>
    <circle class="pad pb" cx="66" cy="10" r="3"/><circle class="pad pb" cx="34" cy="10" r="3"/>
    <circle class="pad pb" cx="34" cy="90" r="3"/><circle class="pad pb" cx="66" cy="90" r="3"/>
    <rect class="chip" x="35" y="35" width="30" height="30" rx="4.5"/>
    <circle class="mark" cx="40.5" cy="40.5" r="1.3"/>
    <rect class="ring" x="43" y="43" width="14" height="14" rx="3"/>
    <rect class="core" x="43" y="43" width="14" height="14" rx="3"/>`,
    css: `
    ROOT .tr { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round; stroke-linejoin: round; opacity: .55 }
    ROOT .pin { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round; opacity: .55 }
    ROOT .pu { fill: none; stroke: var(--c2); stroke-width: calc(var(--sw) * 1.3); stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 18 200; stroke-dashoffset: 19; animation: K_run var(--d) cubic-bezier(.4, 0, .85, .65) infinite }
    ROOT .pad { fill: var(--c1); transform-box: fill-box; transform-origin: center; animation: K_pad var(--d) ease-out infinite }
    ROOT .pb { animation-delay: calc(var(--d) / -2) }
    ROOT .chip { fill: #1e293b; stroke: #475569; stroke-width: 1.5 }
    ROOT .mark { fill: #64748b }
    ROOT .core { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: K_core calc(var(--d) / 2) ease-out infinite; animation-delay: calc(var(--d) * -0.1) }
    ROOT .ring { fill: none; stroke: var(--c2); stroke-width: 1.5; transform-box: fill-box; transform-origin: center; animation: K_ring calc(var(--d) / 2) ease-out infinite; animation-delay: calc(var(--d) * -0.1) }
    @keyframes K_run { 0% { stroke-dashoffset: 19 } 42%, 100% { stroke-dashoffset: -101 } }
    @keyframes K_pad { 0% { transform: scale(1.45) } 30%, 100% { transform: scale(1) } }
    @keyframes K_core { 0% { opacity: 1; transform: scale(1.12) } 50% { opacity: .3; transform: scale(1) } 86% { opacity: .3; transform: scale(1) } 100% { opacity: 1; transform: scale(1.12) } }
    @keyframes K_ring { 0% { opacity: .9; transform: scale(1) } 60%, 100% { opacity: 0; transform: scale(2) } }`,
  },
  {
    slug: "pixel-loading",
    name: "Pixel Loading",
    category: "technology",
    description:
      "A four-by-four pixel grid fills in a clockwise spiral, one hard step at a time, then empties in the same order like a retro progress meter.",
    details:
      "There is no easing here on purpose: every pixel switches on or off in a single frame, with a highlighted pixel leading the way, which gives it the feel of an 8-bit status screen. Short pauses on the full and the empty grid make the rhythm easy to follow, and the notched frame flashes when the grid completes. Try it on game sites, pixel-art tools, retro-styled portfolios, or any button that should feel playful rather than corporate. Pixels sets the lit cells, the idle grid, and the frame; Leading pixel colors the cell that travels along the spiral.",
    tags: ["pixel", "retro", "8-bit", "grid", "progress", "stepped"],
    kind: "progress",
    colors: { primary: "#22c55e", secondary: "#f59e0b" },
    colorLabels: { primary: "Pixels", secondary: "Leading pixel" },
    duration: 3.2,
    popularity: 76,
    svg: `
    <path class="frame" d="M13 7H87V9H90V11H92V13H93V87H92V89H90V91H87V93H13V91H10V89H8V87H7V13H8V11H10V9H13Z"/>
    <rect class="px q0" x="14" y="14" width="15" height="15" rx="2"/>
    <rect class="px q1" x="33" y="14" width="15" height="15" rx="2"/>
    <rect class="px q2" x="52" y="14" width="15" height="15" rx="2"/>
    <rect class="px q3" x="71" y="14" width="15" height="15" rx="2"/>
    <rect class="px q4" x="71" y="33" width="15" height="15" rx="2"/>
    <rect class="px q5" x="71" y="52" width="15" height="15" rx="2"/>
    <rect class="px q6" x="71" y="71" width="15" height="15" rx="2"/>
    <rect class="px q7" x="52" y="71" width="15" height="15" rx="2"/>
    <rect class="px q8" x="33" y="71" width="15" height="15" rx="2"/>
    <rect class="px q9" x="14" y="71" width="15" height="15" rx="2"/>
    <rect class="px q10" x="14" y="52" width="15" height="15" rx="2"/>
    <rect class="px q11" x="14" y="33" width="15" height="15" rx="2"/>
    <rect class="px q12" x="33" y="33" width="15" height="15" rx="2"/>
    <rect class="px q13" x="52" y="33" width="15" height="15" rx="2"/>
    <rect class="px q14" x="52" y="52" width="15" height="15" rx="2"/>
    <rect class="px q15" x="33" y="52" width="15" height="15" rx="2"/>`,
    css: `
    ROOT .frame { fill: none; stroke: var(--c1); stroke-width: 2; opacity: .4; animation: K_frame var(--d) step-end infinite }
    ROOT .px { fill: var(--c1); opacity: .2; animation: K_px var(--d) step-end infinite }
    ROOT .q0 { animation-delay: calc(var(--d) * -0.2) }
    ROOT .q1 { animation-delay: calc(var(--d) * -0.175) }
    ROOT .q2 { animation-delay: calc(var(--d) * -0.15) }
    ROOT .q3 { animation-delay: calc(var(--d) * -0.125) }
    ROOT .q4 { animation-delay: calc(var(--d) * -0.1) }
    ROOT .q5 { animation-delay: calc(var(--d) * -0.075) }
    ROOT .q6 { animation-delay: calc(var(--d) * -0.05) }
    ROOT .q7 { animation-delay: calc(var(--d) * -0.025) }
    ROOT .q8 { animation-delay: calc(var(--d) * -1) }
    ROOT .q9 { animation-delay: calc(var(--d) * -0.975) }
    ROOT .q10 { animation-delay: calc(var(--d) * -0.95) }
    ROOT .q11 { animation-delay: calc(var(--d) * -0.925) }
    ROOT .q12 { animation-delay: calc(var(--d) * -0.9) }
    ROOT .q13 { animation-delay: calc(var(--d) * -0.875) }
    ROOT .q14 { animation-delay: calc(var(--d) * -0.85) }
    ROOT .q15 { animation-delay: calc(var(--d) * -0.825) }
    @keyframes K_px {
      0% { opacity: 1; fill: var(--c2) }
      2.5% { opacity: 1; fill: var(--c1) }
      47.5% { opacity: 1; fill: var(--c2) }
      50%, 100% { opacity: .2; fill: var(--c1) }
    }
    @keyframes K_frame { 0% { opacity: .4; stroke: var(--c1) } 17.5% { opacity: 1; stroke: var(--c2) } 30%, 100% { opacity: .4; stroke: var(--c1) } }`,
  },
  {
    slug: "connected-nodes",
    name: "Connected Nodes",
    category: "technology",
    description:
      "A signal threads its way through a small network, drawing each link in turn while every node it reaches gives a quick pulse.",
    details:
      "Seven nodes, a central hub, and a few idle links make it read as a real graph rather than a simple ring. The lit path is drawn and erased in sequence, so the signal seems to hop from node to node with a short ripple at every stop. It suits collaboration and sharing features, social or peer-to-peer apps, network dashboards, and integration setup screens. Nodes sets the resting color of the circles, and Signal colors the moving link, the ripples, and the flash each node gets when it is visited.",
    tags: ["network", "nodes", "graph", "connection", "signal", "pulse"],
    kind: "pulse",
    colors: { primary: "#6366f1", secondary: "#22c55e" },
    colorLabels: { primary: "Nodes", secondary: "Signal" },
    duration: 2.8,
    popularity: 72,
    svg: `
    <path class="mesh" d="M18 42L40 18L73 21L52 50L82 56L63 82L24 76ZM40 18L52 50M24 76L52 50M73 21L82 56"/>
    <path class="ln s0" pathLength="1" d="M18 42L40 18"/>
    <path class="ln s1" pathLength="1" d="M40 18L73 21"/>
    <path class="ln s2" pathLength="1" d="M73 21L52 50"/>
    <path class="ln s3" pathLength="1" d="M52 50L82 56"/>
    <path class="ln s4" pathLength="1" d="M82 56L63 82"/>
    <path class="ln s5" pathLength="1" d="M63 82L24 76"/>
    <path class="ln s6" pathLength="1" d="M24 76L18 42"/>
    <circle class="rp s0" cx="18" cy="42" r="5"/><circle class="rp s1" cx="40" cy="18" r="5"/>
    <circle class="rp s2" cx="73" cy="21" r="5"/><circle class="rp s3" cx="52" cy="50" r="6.5"/>
    <circle class="rp s4" cx="82" cy="56" r="5"/><circle class="rp s5" cx="63" cy="82" r="5"/>
    <circle class="rp s6" cx="24" cy="76" r="5"/>
    <circle class="nd s0" cx="18" cy="42" r="5"/><circle class="nd s1" cx="40" cy="18" r="5"/>
    <circle class="nd s2" cx="73" cy="21" r="5"/><circle class="nd s3" cx="52" cy="50" r="6.5"/>
    <circle class="nd s4" cx="82" cy="56" r="5"/><circle class="nd s5" cx="63" cy="82" r="5"/>
    <circle class="nd s6" cx="24" cy="76" r="5"/>`,
    css: `
    ROOT .mesh { fill: none; stroke: #94a3b8; stroke-width: 1.6; stroke-linejoin: round; opacity: .45 }
    ROOT .ln { fill: none; stroke: var(--c2); stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 1 2; stroke-dashoffset: 1.02; animation: K_link var(--d) ease-in-out infinite }
    ROOT .nd { fill: var(--c1); transform-box: fill-box; transform-origin: center; animation: K_hit var(--d) ease-out infinite }
    ROOT .rp { fill: none; stroke: var(--c2); stroke-width: 1.5; opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_ripple var(--d) ease-out infinite }
    ROOT .s0 { animation-delay: calc(var(--d) * -0.05) }
    ROOT .s1 { animation-delay: calc(var(--d) * -0.907) }
    ROOT .s2 { animation-delay: calc(var(--d) * -0.764) }
    ROOT .s3 { animation-delay: calc(var(--d) * -0.621) }
    ROOT .s4 { animation-delay: calc(var(--d) * -0.479) }
    ROOT .s5 { animation-delay: calc(var(--d) * -0.336) }
    ROOT .s6 { animation-delay: calc(var(--d) * -0.193) }
    @keyframes K_link { 0% { stroke-dashoffset: 1.02 } 14.29%, 42.86% { stroke-dashoffset: 0 } 57.14%, 100% { stroke-dashoffset: -1.02 } }
    @keyframes K_hit { 0% { transform: scale(1.35); fill: var(--c2) } 20%, 100% { transform: scale(1); fill: var(--c1) } }
    @keyframes K_ripple { 0% { transform: scale(1); opacity: .9 } 30%, 100% { transform: scale(1.9); opacity: 0 } }`,
  },
  {
    slug: "digital-scanner",
    name: "Digital Scanner",
    category: "technology",
    description:
      "A glowing beam sweeps up and down over a fingerprint inside viewfinder brackets, lighting each ridge as it passes.",
    details:
      "The ridges light up band by band as the beam crosses them and fade behind it, so the scan reads clearly in both directions. The corner brackets tighten slightly at each turn of the beam, like a camera locking focus. It is a natural fit for biometric login, identity verification, document capture, and security checks in banking or HR apps. Fingerprint sets the resting ridges, Scan beam colors the beam and the highlighted lines, and Frame recolors the viewfinder corners.",
    tags: ["scanner", "fingerprint", "biometric", "security", "scan", "beam"],
    kind: "wave",
    colors: { primary: "#6366f1", secondary: "#22d3ee", accent: "#94a3b8" },
    colorLabels: { primary: "Fingerprint", secondary: "Scan beam", accent: "Frame" },
    duration: 2.4,
    popularity: 77,
    svg: `
    <defs><linearGradient id="digital-scanner-glow" x1="0" y1="0" x2="0" y2="1"><stop class="g0" offset="0"/><stop class="g1" offset=".5"/><stop class="g0" offset="1"/></linearGradient></defs>
    <path class="vf" d="M12 26V17a5 5 0 0 1 5-5h9M74 12h9a5 5 0 0 1 5 5v9M88 74v9a5 5 0 0 1-5 5h-9M26 88h-9a5 5 0 0 1-5-5v-9"/>
    <path class="rid" d="M46 65V55A4 4.6 0 0 1 54 55V58M41 59V55A9 10.35 0 0 1 59 55V69M36 73V55A14 16.1 0 0 1 44.08 40.41M47.09 39.25A14 16.1 0 0 1 64 55V64M31 68V55A19 21.85 0 0 1 59.5 36.08M62.96 39.02A19 21.85 0 0 1 69 55V76M31 72V78M26 77V55A24 27.6 0 0 1 74 55V61M74 65V75M22.75 43.59A29 33.35 0 0 1 42.49 22.79M47.98 21.73A29 33.35 0 0 1 75.11 38.32"/>
    <path class="lit a0" d="M34.25 27A29 33.35 0 0 1 42.49 22.79M47.98 21.73A29 33.35 0 0 1 50 21.65M50 21.65A29 33.35 0 0 1 65.75 27"/>
    <path class="lit b0" d="M34.25 27A29 33.35 0 0 1 42.49 22.79M47.98 21.73A29 33.35 0 0 1 50 21.65M50 21.65A29 33.35 0 0 1 65.75 27"/>
    <path class="lit a1" d="M44.75 34A19 21.85 0 0 1 50 33.15M50 33.15A19 21.85 0 0 1 55.25 34M34.43 34A24 27.6 0 0 1 50 27.4M50 27.4A24 27.6 0 0 1 65.57 34M27.47 34A29 33.35 0 0 1 34.25 27M65.75 27A29 33.35 0 0 1 72.53 34"/>
    <path class="lit b1" d="M44.75 34A19 21.85 0 0 1 50 33.15M50 33.15A19 21.85 0 0 1 55.25 34M34.43 34A24 27.6 0 0 1 50 27.4M50 27.4A24 27.6 0 0 1 65.57 34M27.47 34A29 33.35 0 0 1 34.25 27M65.75 27A29 33.35 0 0 1 72.53 34"/>
    <path class="lit a2" d="M43.09 41A14 16.1 0 0 1 44.08 40.41M47.09 39.25A14 16.1 0 0 1 50 38.9M50 38.9A14 16.1 0 0 1 56.91 41M35.41 41A19 21.85 0 0 1 44.75 34M55.25 34A19 21.85 0 0 1 59.5 36.08M62.96 39.02A19 21.85 0 0 1 64.59 41M29.32 41A24 27.6 0 0 1 34.43 34M65.57 34A24 27.6 0 0 1 70.68 41M23.68 41A29 33.35 0 0 1 27.47 34M72.53 34A29 33.35 0 0 1 75.11 38.32"/>
    <path class="lit b2" d="M43.09 41A14 16.1 0 0 1 44.08 40.41M47.09 39.25A14 16.1 0 0 1 50 38.9M50 38.9A14 16.1 0 0 1 56.91 41M35.41 41A19 21.85 0 0 1 44.75 34M55.25 34A19 21.85 0 0 1 59.5 36.08M62.96 39.02A19 21.85 0 0 1 64.59 41M29.32 41A24 27.6 0 0 1 34.43 34M65.57 34A24 27.6 0 0 1 70.68 41M23.68 41A29 33.35 0 0 1 27.47 34M72.53 34A29 33.35 0 0 1 75.11 38.32"/>
    <path class="lit a3" d="M43.37 48A9 10.35 0 0 1 50 44.65M50 44.65A9 10.35 0 0 1 56.63 48M37.39 48A14 16.1 0 0 1 43.09 41M56.91 41A14 16.1 0 0 1 62.61 48M32 48A19 21.85 0 0 1 35.41 41M64.59 41A19 21.85 0 0 1 68 48M26.78 48A24 27.6 0 0 1 29.32 41M70.68 41A24 27.6 0 0 1 73.22 48M22.75 43.59A29 33.35 0 0 1 23.68 41"/>
    <path class="lit b3" d="M43.37 48A9 10.35 0 0 1 50 44.65M50 44.65A9 10.35 0 0 1 56.63 48M37.39 48A14 16.1 0 0 1 43.09 41M56.91 41A14 16.1 0 0 1 62.61 48M32 48A19 21.85 0 0 1 35.41 41M64.59 41A19 21.85 0 0 1 68 48M26.78 48A24 27.6 0 0 1 29.32 41M70.68 41A24 27.6 0 0 1 73.22 48M22.75 43.59A29 33.35 0 0 1 23.68 41"/>
    <path class="lit a4" d="M46 55A4 4.6 0 0 1 50 50.4M50 50.4A4 4.6 0 0 1 54 55M41 55A9 10.35 0 0 1 43.37 48M56.63 48A9 10.35 0 0 1 59 55M36 55A14 16.1 0 0 1 37.39 48M62.61 48A14 16.1 0 0 1 64 55M31 55A19 21.85 0 0 1 32 48M68 48A19 21.85 0 0 1 69 55M26 55A24 27.6 0 0 1 26.78 48M73.22 48A24 27.6 0 0 1 74 55"/>
    <path class="lit b4" d="M46 55A4 4.6 0 0 1 50 50.4M50 50.4A4 4.6 0 0 1 54 55M41 55A9 10.35 0 0 1 43.37 48M56.63 48A9 10.35 0 0 1 59 55M36 55A14 16.1 0 0 1 37.39 48M62.61 48A14 16.1 0 0 1 64 55M31 55A19 21.85 0 0 1 32 48M68 48A19 21.85 0 0 1 69 55M26 55A24 27.6 0 0 1 26.78 48M73.22 48A24 27.6 0 0 1 74 55"/>
    <path class="lit a5" d="M46 55V62M54 55V58M41 55V59M59 55V62M36 55V62M64 55V62M31 55V62M69 55V62M26 55V62M74 55V61"/>
    <path class="lit b5" d="M46 55V62M54 55V58M41 55V59M59 55V62M36 55V62M64 55V62M31 55V62M69 55V62M26 55V62M74 55V61"/>
    <path class="lit a6" d="M46 62V65M59 62V69M36 62V69M64 62V64M31 62V68M69 62V69M26 62V69M74 65V69"/>
    <path class="lit b6" d="M46 62V65M59 62V69M36 62V69M64 62V64M31 62V68M69 62V69M26 62V69M74 65V69"/>
    <path class="lit a7" d="M36 69V73M69 69V76M31 72V78M26 69V77M74 69V75"/>
    <path class="lit b7" d="M36 69V73M69 69V76M31 72V78M26 69V77M74 69V75"/>
    <g class="beam"><rect x="16" y="9" width="68" height="14" fill="url(#digital-scanner-glow)"/><path class="ray" d="M17 16H83"/></g>`,
    css: `
    ROOT .g0 { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .g1 { stop-color: var(--c2); stop-opacity: .35 }
    ROOT .vf { fill: none; stroke: var(--c3); stroke-width: 3; stroke-linecap: round; transform-origin: 50px 50px; animation: K_focus calc(var(--d) / 2) ease-in-out infinite; animation-delay: calc(var(--d) * -0.37) }
    ROOT .rid { fill: none; stroke: var(--c1); stroke-width: 2.6; stroke-linecap: round; opacity: .55 }
    ROOT .lit { fill: none; stroke: var(--c2); stroke-width: 2.6; opacity: 0; animation: K_lit var(--d) linear infinite }
    ROOT .beam { animation: K_beam var(--d) linear infinite; animation-delay: calc(var(--d) * -0.12) }
    ROOT .ray { fill: none; stroke: var(--c2); stroke-width: 2; stroke-linecap: round }
    ROOT .a0 { animation-delay: calc(var(--d) * -0.105) }
    ROOT .b0 { animation-delay: calc(var(--d) * -0.215) }
    ROOT .a1 { animation-delay: calc(var(--d) * -0.053) }
    ROOT .b1 { animation-delay: calc(var(--d) * -0.267) }
    ROOT .a2 { animation-delay: calc(var(--d) * -0.002) }
    ROOT .b2 { animation-delay: calc(var(--d) * -0.318) }
    ROOT .a3 { animation-delay: calc(var(--d) * -0.95) }
    ROOT .b3 { animation-delay: calc(var(--d) * -0.37) }
    ROOT .a4 { animation-delay: calc(var(--d) * -0.899) }
    ROOT .b4 { animation-delay: calc(var(--d) * -0.421) }
    ROOT .a5 { animation-delay: calc(var(--d) * -0.848) }
    ROOT .b5 { animation-delay: calc(var(--d) * -0.473) }
    ROOT .a6 { animation-delay: calc(var(--d) * -0.796) }
    ROOT .b6 { animation-delay: calc(var(--d) * -0.524) }
    ROOT .a7 { animation-delay: calc(var(--d) * -0.719) }
    ROOT .b7 { animation-delay: calc(var(--d) * -0.601) }
    @keyframes K_beam { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(68px) } }
    @keyframes K_lit { 0% { opacity: 0 } 4% { opacity: 1 } 26%, 100% { opacity: 0 } }
    @keyframes K_focus { 0%, 100% { transform: scale(1) } 50% { transform: scale(.965) } }`,
  },
  {
    slug: "processing-gears",
    name: "Processing Gears",
    category: "technology",
    description:
      "Three meshing gears turn at true tooth ratios, the big wheel driving two smaller ones in the opposite direction.",
    details:
      "The gears have 16, 10, and 8 teeth and rotate at matching speeds, so the teeth genuinely interlock instead of sliding past each other. Cut-out holes and visible axles make the rotation easy to follow even at icon size. Use it for settings being applied, background jobs, data processing, build pipelines, or maintenance pages. Large gear, Medium gear, and Small gear each take their own color, and the direction toggle reverses the whole train while keeping the mesh correct.",
    tags: ["gears", "cog", "processing", "settings", "mechanical", "spinner"],
    kind: "spinner",
    colors: { primary: "#6366f1", secondary: "#22d3ee", accent: "#f59e0b" },
    colorLabels: { primary: "Large gear", secondary: "Medium gear", accent: "Small gear" },
    duration: 2,
    direction: true,
    popularity: 82,
    svg: `
    <path class="ga" d="M59.43 54.4L64.99 55.29A24.78 24.78 0 0 1 64.99 58.21L59.43 59.1A19.32 19.32 0 0 1 58.87 61.92L63.66 64.87A24.78 24.78 0 0 1 62.55 67.56L57.07 66.26A19.32 19.32 0 0 1 55.47 68.65L58.77 73.21A24.78 24.78 0 0 1 56.71 75.27L52.15 71.97A19.32 19.32 0 0 1 49.76 73.57L51.06 79.05A24.78 24.78 0 0 1 48.37 80.16L45.42 75.37A19.32 19.32 0 0 1 42.6 75.93L41.71 81.49A24.78 24.78 0 0 1 38.79 81.49L37.9 75.93A19.32 19.32 0 0 1 35.08 75.37L32.13 80.16A24.78 24.78 0 0 1 29.44 79.05L30.74 73.57A19.32 19.32 0 0 1 28.35 71.97L23.79 75.27A24.78 24.78 0 0 1 21.73 73.21L25.03 68.65A19.32 19.32 0 0 1 23.43 66.26L17.95 67.56A24.78 24.78 0 0 1 16.84 64.87L21.63 61.92A19.32 19.32 0 0 1 21.07 59.1L15.51 58.21A24.78 24.78 0 0 1 15.51 55.29L21.07 54.4A19.32 19.32 0 0 1 21.63 51.58L16.84 48.63A24.78 24.78 0 0 1 17.95 45.94L23.43 47.24A19.32 19.32 0 0 1 25.03 44.85L21.73 40.29A24.78 24.78 0 0 1 23.79 38.23L28.35 41.53A19.32 19.32 0 0 1 30.74 39.93L29.44 34.45A24.78 24.78 0 0 1 32.13 33.34L35.08 38.13A19.32 19.32 0 0 1 37.9 37.57L38.79 32.01A24.78 24.78 0 0 1 41.71 32.01L42.6 37.57A19.32 19.32 0 0 1 45.42 38.13L48.37 33.34A24.78 24.78 0 0 1 51.06 34.45L49.76 39.93A19.32 19.32 0 0 1 52.15 41.53L56.71 38.23A24.78 24.78 0 0 1 58.77 40.29L55.47 44.85A19.32 19.32 0 0 1 57.07 47.24L62.55 45.94A24.78 24.78 0 0 1 63.66 48.63L58.87 51.58A19.32 19.32 0 0 1 59.43 54.4ZM36.25 56.75a4 4 0 1 0 8 0a4 4 0 1 0 -8 0ZM44.85 64.95a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0ZM28.45 64.95a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0ZM28.45 48.55a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0ZM44.85 48.55a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0Z"/>
    <path class="gb" d="M75.46 39.64L78.39 44.44A16.38 16.38 0 0 1 75.93 46.31L72.1 42.2A10.92 10.92 0 0 1 69.64 43.06L69.19 48.66A16.38 16.38 0 0 1 66.1 48.73L65.41 43.15A10.92 10.92 0 0 1 62.92 42.39L59.26 46.66A16.38 16.38 0 0 1 56.73 44.9L59.45 39.98A10.92 10.92 0 0 1 57.88 37.91L52.41 39.21A16.38 16.38 0 0 1 51.39 36.3L56.49 33.92A10.92 10.92 0 0 1 56.43 31.32L51.24 29.16A16.38 16.38 0 0 1 52.13 26.2L57.65 27.27A10.92 10.92 0 0 1 59.14 25.14L56.21 20.34A16.38 16.38 0 0 1 58.67 18.47L62.5 22.58A10.92 10.92 0 0 1 64.96 21.72L65.41 16.12A16.38 16.38 0 0 1 68.5 16.05L69.19 21.63A10.92 10.92 0 0 1 71.68 22.39L75.34 18.12A16.38 16.38 0 0 1 77.87 19.88L75.15 24.8A10.92 10.92 0 0 1 76.72 26.87L82.19 25.57A16.38 16.38 0 0 1 83.21 28.48L78.11 30.86A10.92 10.92 0 0 1 78.17 33.46L83.36 35.62A16.38 16.38 0 0 1 82.47 38.58L76.95 37.51A10.92 10.92 0 0 1 75.46 39.64ZM64.3 32.39a3 3 0 1 0 6 0a3 3 0 1 0 -6 0ZM72.25 34.61a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0ZM65.4 39.59a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0ZM58.55 34.61a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0ZM61.17 26.57a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0ZM69.63 26.57a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0Z"/>
    <path class="gc" d="M64.34 65.7L60.98 61.2A13.58 13.58 0 0 1 63.41 59.13L67.32 63.16A8.12 8.12 0 0 1 69.62 62.41L70.42 56.85A13.58 13.58 0 0 1 73.6 57.1L73.52 62.72A8.12 8.12 0 0 1 75.67 63.81L80.17 60.45A13.58 13.58 0 0 1 82.24 62.88L78.21 66.79A8.12 8.12 0 0 1 78.96 69.09L84.52 69.89A13.58 13.58 0 0 1 84.27 73.07L78.65 72.99A8.12 8.12 0 0 1 77.56 75.14L80.92 79.64A13.58 13.58 0 0 1 78.49 81.71L74.58 77.68A8.12 8.12 0 0 1 72.28 78.43L71.48 83.99A13.58 13.58 0 0 1 68.3 83.74L68.38 78.12A8.12 8.12 0 0 1 66.23 77.03L61.73 80.39A13.58 13.58 0 0 1 59.66 77.96L63.69 74.05A8.12 8.12 0 0 1 62.94 71.75L57.38 70.95A13.58 13.58 0 0 1 57.63 67.77L63.25 67.85A8.12 8.12 0 0 1 64.34 65.7ZM68.15 70.42a2.8 2.8 0 1 0 5.6 0a2.8 2.8 0 1 0 -5.6 0ZM74.95 70.42a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0ZM64.35 70.42a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0Z"/>
    <circle class="ax" cx="40.25" cy="56.75" r="1.8"/>
    <circle class="ax" cx="67.3" cy="32.39" r="1.4"/>
    <circle class="ax" cx="70.95" cy="70.42" r="1.3"/>`,
    css: `
    ROOT .ga, ROOT .gb, ROOT .gc { fill-rule: evenodd }
    ROOT .ga { fill: var(--c1); transform-origin: 40.25px 56.75px; animation: K_turnA var(--d) linear infinite }
    ROOT .gb { fill: var(--c2); transform-origin: 67.3px 32.39px; animation: K_turnB var(--d) linear infinite }
    ROOT .gc { fill: var(--c3); transform-origin: 70.95px 70.42px; animation: K_turnC var(--d) linear infinite }
    ROOT .ax { fill: #94a3b8 }
    @keyframes K_turnA { from { transform: rotate(0deg) } to { transform: rotate(90deg) } }
    @keyframes K_turnB { from { transform: rotate(0deg) } to { transform: rotate(-144deg) } }
    @keyframes K_turnC { from { transform: rotate(0deg) } to { transform: rotate(-180deg) } }`,
  },
  {
    slug: "data-transfer",
    name: "Data Transfer",
    category: "technology",
    description:
      "Packets travel between a laptop and the cloud in both directions, uploads rising on one lane and downloads falling on the other.",
    details:
      "Two color-coded lanes keep upload and download traffic distinct, while the laptop's progress bar fills and the cloud brightens as each packet arrives. It explains itself at a glance, which makes it a good fit for file uploads, backups, sync status, import and export dialogs, and cloud storage apps. Devices sets the outline of the laptop and the cloud, Upload colors the rising packets, and Download colors the falling ones along with the progress bar on the screen.",
    tags: ["upload", "download", "cloud", "sync", "transfer", "data"],
    kind: "progress",
    colors: { primary: "#6366f1", secondary: "#22d3ee", accent: "#f59e0b" },
    colorLabels: { primary: "Devices", secondary: "Upload", accent: "Download" },
    duration: 2,
    popularity: 80,
    svg: `
    <path class="cloud" d="M33 33A8 8 0 1 1 38.5 19.19A11 11 0 0 1 60.32 17.02A9 9 0 1 1 66 33Z"/>
    <path class="lane" d="M41 38V61M59 38V61"/>
    <rect class="scr" x="25" y="65" width="50" height="22" rx="3"/>
    <rect class="base" x="17" y="87" width="66" height="5" rx="2.5"/>
    <rect class="track" x="32" y="74" width="36" height="4" rx="2"/>
    <rect class="bar" x="32" y="74" width="36" height="4" rx="2"/>
    <rect class="up u0" x="38" y="56" width="6" height="6" rx="1.5"/>
    <rect class="up u1" x="38" y="56" width="6" height="6" rx="1.5"/>
    <rect class="dn w0" x="56" y="35" width="6" height="6" rx="1.5"/>
    <rect class="dn w1" x="56" y="35" width="6" height="6" rx="1.5"/>`,
    css: `
    ROOT .cloud { fill: var(--c1); fill-opacity: .14; stroke: var(--c1); stroke-width: 2.5; stroke-linejoin: round; animation: K_rx calc(var(--d) / 2) ease-out infinite; animation-delay: calc(var(--d) * -0.18) }
    ROOT .scr { fill: var(--c1); fill-opacity: .14; stroke: var(--c1); stroke-width: 2.5 }
    ROOT .base { fill: var(--c1) }
    ROOT .lane { fill: none; stroke: #94a3b8; stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: .1 4; opacity: .75 }
    ROOT .track { fill: var(--c1); opacity: .25 }
    ROOT .bar { fill: var(--c3); transform-box: fill-box; transform-origin: 0 50%; animation: K_fill var(--d) ease-in-out infinite; animation-delay: calc(var(--d) * -0.2) }
    ROOT .up { fill: var(--c2); animation: K_up var(--d) linear infinite }
    ROOT .dn { fill: var(--c3); animation: K_down var(--d) linear infinite }
    ROOT .u0 { animation-delay: calc(var(--d) * -0.1) }
    ROOT .u1 { animation-delay: calc(var(--d) * -0.6) }
    ROOT .w0 { animation-delay: calc(var(--d) * -0.35) }
    ROOT .w1 { animation-delay: calc(var(--d) * -0.85) }
    @keyframes K_up { 0% { transform: translateY(0); opacity: 0 } 15%, 80% { opacity: 1 } 100% { transform: translateY(-21px); opacity: 0 } }
    @keyframes K_down { 0% { transform: translateY(0); opacity: 0 } 15%, 80% { opacity: 1 } 100% { transform: translateY(21px); opacity: 0 } }
    @keyframes K_rx { 0% { fill-opacity: .36 } 60%, 100% { fill-opacity: .14 } }
    @keyframes K_fill { 0% { transform: scaleX(.06); opacity: 1 } 85% { transform: scaleX(1); opacity: 1 } 100% { transform: scaleX(1); opacity: 0 } }`,
  },
  {
    slug: "ai-neural-pulse",
    name: "AI Neural Pulse",
    category: "technology",
    description:
      "Waves of activation sweep left to right through a three-layer neural network, lighting each node as they pass and ending in a sparkle.",
    details:
      "Signals leave the three input nodes, cross to four hidden neurons of varying strength, and resolve in two outputs, with a small sparkle marking each finished pass. The steady left-to-right rhythm reads as reasoning rather than random activity. It suits AI assistants, chat interfaces waiting on a reply, model training dashboards, and recommendation or search features. Network sets the resting nodes and links, Signal colors the traveling activations and the lit neurons, and Sparkle tints the twinkle at the output.",
    tags: ["ai", "neural network", "machine learning", "signal", "wave", "sparkle"],
    kind: "wave",
    colors: { primary: "#6366f1", secondary: "#22d3ee", accent: "#f59e0b" },
    colorLabels: { primary: "Network", secondary: "Signal", accent: "Sparkle" },
    duration: 2.4,
    popularity: 86,
    svg: `
    <path class="edge" d="M15 30L47 20M15 30L47 40M15 30L47 60M15 30L47 80M15 50L47 20M15 50L47 40M15 50L47 60M15 50L47 80M15 70L47 20M15 70L47 40M15 70L47 60M15 70L47 80M47 20L79 38M47 20L79 62M47 40L79 38M47 40L79 62M47 60L79 38M47 60L79 62M47 80L79 38M47 80L79 62"/>
    <path class="sig s1" pathLength="1" d="M15 30L47 20"/><path class="sig s1" pathLength="1" d="M15 30L47 40"/>
    <path class="sig s1" pathLength="1" d="M15 30L47 60"/><path class="sig s1" pathLength="1" d="M15 30L47 80"/>
    <path class="sig s1" pathLength="1" d="M15 50L47 20"/><path class="sig s1" pathLength="1" d="M15 50L47 40"/>
    <path class="sig s1" pathLength="1" d="M15 50L47 60"/><path class="sig s1" pathLength="1" d="M15 50L47 80"/>
    <path class="sig s1" pathLength="1" d="M15 70L47 20"/><path class="sig s1" pathLength="1" d="M15 70L47 40"/>
    <path class="sig s1" pathLength="1" d="M15 70L47 60"/><path class="sig s1" pathLength="1" d="M15 70L47 80"/>
    <path class="sig s2" pathLength="1" d="M47 20L79 38"/><path class="sig s2" pathLength="1" d="M47 20L79 62"/>
    <path class="sig s2" pathLength="1" d="M47 40L79 38"/><path class="sig s2" pathLength="1" d="M47 40L79 62"/>
    <path class="sig s2" pathLength="1" d="M47 60L79 38"/><path class="sig s2" pathLength="1" d="M47 60L79 62"/>
    <path class="sig s2" pathLength="1" d="M47 80L79 38"/><path class="sig s2" pathLength="1" d="M47 80L79 62"/>
    <circle class="nn" cx="15" cy="30" r="5.5"/><circle class="nn" cx="15" cy="50" r="5.5"/><circle class="nn" cx="15" cy="70" r="5.5"/>
    <circle class="nn" cx="47" cy="20" r="5"/><circle class="nn" cx="47" cy="40" r="5"/><circle class="nn" cx="47" cy="60" r="5"/><circle class="nn" cx="47" cy="80" r="5"/>
    <circle class="nn" cx="79" cy="38" r="6"/><circle class="nn" cx="79" cy="62" r="6"/>
    <circle class="on l1" cx="15" cy="30" r="5.5"/><circle class="on l1" cx="15" cy="50" r="5.5"/><circle class="on l1" cx="15" cy="70" r="5.5"/>
    <circle class="on l2" cx="47" cy="20" r="5"/><circle class="on l2 weak" cx="47" cy="40" r="5"/><circle class="on l2" cx="47" cy="60" r="5"/><circle class="on l2 weak" cx="47" cy="80" r="5"/>
    <circle class="on l3" cx="79" cy="38" r="6"/><circle class="on l3 weak" cx="79" cy="62" r="6"/>
    <path class="spark k1" d="M89 18Q90.2 22.8 95 24Q90.2 25.2 89 30Q87.8 25.2 83 24Q87.8 22.8 89 18Z"/>
    <path class="spark k2" d="M90 71Q90.8 74.2 94 75Q90.8 75.8 90 79Q89.2 75.8 86 75Q89.2 74.2 90 71Z"/>`,
    css: `
    ROOT .edge { fill: none; stroke: var(--c1); stroke-width: 1.4; opacity: .32 }
    ROOT .sig { fill: none; stroke: var(--c2); stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: .12 2; stroke-dashoffset: .14; animation: K_sig var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
    ROOT .s1 { animation-delay: calc(var(--d) * -0.16) }
    ROOT .s2 { animation-delay: calc(var(--d) * -0.76) }
    ROOT .nn { fill: var(--c1) }
    ROOT .on { fill: var(--c2); fill-opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_fire var(--d) ease-out infinite }
    ROOT .weak { opacity: .55 }
    ROOT .l1 { animation-delay: calc(var(--d) * -0.18) }
    ROOT .l2 { animation-delay: calc(var(--d) * -0.82) }
    ROOT .l3 { animation-delay: calc(var(--d) * -0.42) }
    ROOT .spark { fill: var(--c3); opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_twinkle var(--d) ease-out infinite }
    ROOT .k1 { animation-delay: calc(var(--d) * -0.4) }
    ROOT .k2 { animation-delay: calc(var(--d) * -0.35) }
    @keyframes K_sig { 0% { stroke-dashoffset: .14 } 32%, 100% { stroke-dashoffset: -1.02 } }
    @keyframes K_fire { 0% { fill-opacity: 1; transform: scale(1.22) } 26%, 100% { fill-opacity: 0; transform: scale(1) } }
    @keyframes K_twinkle { 0% { opacity: 0; transform: scale(0) rotate(0deg) } 7% { opacity: 1; transform: scale(1) rotate(30deg) } 24%, 100% { opacity: 0; transform: scale(0) rotate(90deg) } }`,
  },
  {
    slug: "wifi-signal",
    name: "Wifi Signal",
    category: "technology",
    description:
      "Three signal arcs light up one after another from the source dot outward, swell once at full strength, then fade back and search again.",
    details:
      "It mirrors the way a device hunts for a connection: the dot sends out a ping, each arc switches on in turn with a small outward pop, and the full set swells together before resetting. Built from one dot and three strokes, it stays crisp from favicon size up to a full-page splash. Use it while an app reconnects, on offline banners, IoT pairing screens, or a hotspot and router setup flow. Signal arcs sets the bars and Source dot colors the dot and its ping ring; the stroke slider makes the arcs bolder or lighter.",
    tags: ["wifi", "signal", "wireless", "connection", "stroke", "network"],
    kind: "wave",
    colors: { primary: "#6366f1", secondary: "#22d3ee" },
    colorLabels: { primary: "Signal arcs", secondary: "Source dot" },
    duration: 2,
    stroke: 7,
    popularity: 78,
    svg: `
    <path class="arc a1" d="M39.28 60A14 14 0 0 1 60.72 60"/>
    <path class="arc a2" d="M28.55 51A28 28 0 0 1 71.45 51"/>
    <path class="arc a3" d="M17.83 42A42 42 0 0 1 82.17 42"/>
    <circle class="ping" cx="50" cy="69" r="5.5"/>
    <circle class="src" cx="50" cy="69" r="5.5"/>`,
    css: `
    ROOT .arc { fill: none; stroke: var(--c1); stroke-width: var(--sw); stroke-linecap: round; opacity: .22; transform-origin: 50px 69px }
    ROOT .a1 { animation: K_a1 var(--d) ease-out infinite }
    ROOT .a2 { animation: K_a2 var(--d) ease-out infinite }
    ROOT .a3 { animation: K_a3 var(--d) ease-out infinite }
    ROOT .src { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: K_src var(--d) ease-out infinite }
    ROOT .ping { fill: none; stroke: var(--c2); stroke-width: 2; opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_ping var(--d) ease-out infinite }
    ROOT .arc, ROOT .src, ROOT .ping { animation-delay: calc(var(--d) * -0.25) }
    @keyframes K_a1 {
      0%, 10% { opacity: .22; transform: scale(.9) }
      18%, 50% { opacity: 1; transform: scale(1) }
      56% { opacity: 1; transform: scale(1.05) }
      62%, 78% { opacity: 1; transform: scale(1) }
      90%, 100% { opacity: .22; transform: scale(.9) }
    }
    @keyframes K_a2 {
      0%, 25% { opacity: .22; transform: scale(.9) }
      33%, 50% { opacity: 1; transform: scale(1) }
      56% { opacity: 1; transform: scale(1.05) }
      62%, 78% { opacity: 1; transform: scale(1) }
      90%, 100% { opacity: .22; transform: scale(.9) }
    }
    @keyframes K_a3 {
      0%, 40% { opacity: .22; transform: scale(.9) }
      48%, 50% { opacity: 1; transform: scale(1) }
      56% { opacity: 1; transform: scale(1.05) }
      62%, 78% { opacity: 1; transform: scale(1) }
      90%, 100% { opacity: .22; transform: scale(.9) }
    }
    @keyframes K_src { 0%, 100% { transform: scale(1) } 5% { transform: scale(1.3) } 14% { transform: scale(1) } }
    @keyframes K_ping { 0% { opacity: .8; transform: scale(1) } 28%, 100% { opacity: 0; transform: scale(3.2) } }`,
  },
  {
    slug: "battery-charge",
    name: "Battery Charge",
    category: "technology",
    description:
      "A battery fills one cell at a time while a lightning bolt zaps with every new bar, then blinks full and drains to start over.",
    details:
      "Each cell springs up from the bottom as the bolt pulses, so the rhythm reads as energy being added rather than a generic progress bar. When all four cells are lit the charge blinks once, like a phone confirming it is full, before the battery empties for the next round. It fits power and energy apps, device setup and firmware updates, EV and smart-home dashboards, or a playful recharging state in a game. Charge colors the cells, Bolt sets the lightning, and Battery recolors the casing and terminal.",
    tags: ["battery", "charging", "energy", "power", "progress", "bolt"],
    kind: "progress",
    colors: { primary: "#22c55e", secondary: "#f59e0b", accent: "#94a3b8" },
    colorLabels: { primary: "Charge", secondary: "Bolt", accent: "Battery" },
    duration: 2.4,
    popularity: 74,
    svg: `
    <rect class="shell" x="12" y="29" width="68" height="42" rx="9"/>
    <rect class="nub" x="82" y="42" width="6" height="16" rx="2.5"/>
    <rect class="seg g1" x="17.25" y="35" width="12.5" height="30" rx="2.5"/>
    <rect class="seg g2" x="32.25" y="35" width="12.5" height="30" rx="2.5"/>
    <rect class="seg g3" x="47.25" y="35" width="12.5" height="30" rx="2.5"/>
    <rect class="seg g4" x="62.25" y="35" width="12.5" height="30" rx="2.5"/>
    <path class="bolt" d="M49.5 34L37 52H45L42 66L55 47H47L49.5 34Z"/>`,
    css: `
    ROOT .shell { fill: none; stroke: var(--c3); stroke-width: 4 }
    ROOT .nub { fill: var(--c3) }
    ROOT .seg { fill: var(--c1); opacity: .15; transform-box: fill-box; transform-origin: 50% 100% }
    ROOT .g1 { animation: K_g1 var(--d) ease-out infinite }
    ROOT .g2 { animation: K_g2 var(--d) ease-out infinite }
    ROOT .g3 { animation: K_g3 var(--d) ease-out infinite }
    ROOT .g4 { animation: K_g4 var(--d) ease-out infinite }
    ROOT .g1, ROOT .g2, ROOT .g3, ROOT .g4 { animation-delay: calc(var(--d) * -0.35) }
    ROOT .bolt { fill: var(--c2); stroke: #1e293b; stroke-width: 1.6; stroke-linejoin: round; transform-box: fill-box; transform-origin: center; animation: K_zap calc(var(--d) / 5) ease-out infinite; animation-delay: calc(var(--d) * -0.05) }
    @keyframes K_g1 { 0%, 8% { opacity: .15; transform: scaleY(.5) } 12%, 72% { opacity: 1; transform: scaleY(1) } 75% { opacity: .5; transform: scaleY(1) } 78%, 86% { opacity: 1; transform: scaleY(1) } 94%, 100% { opacity: .15; transform: scaleY(.5) } }
    @keyframes K_g2 { 0%, 28% { opacity: .15; transform: scaleY(.5) } 32%, 72% { opacity: 1; transform: scaleY(1) } 75% { opacity: .5; transform: scaleY(1) } 78%, 86% { opacity: 1; transform: scaleY(1) } 94%, 100% { opacity: .15; transform: scaleY(.5) } }
    @keyframes K_g3 { 0%, 48% { opacity: .15; transform: scaleY(.5) } 52%, 72% { opacity: 1; transform: scaleY(1) } 75% { opacity: .5; transform: scaleY(1) } 78%, 86% { opacity: 1; transform: scaleY(1) } 94%, 100% { opacity: .15; transform: scaleY(.5) } }
    @keyframes K_g4 { 0%, 68% { opacity: .15; transform: scaleY(.5) } 72% { opacity: 1; transform: scaleY(1) } 75% { opacity: .5; transform: scaleY(1) } 78%, 86% { opacity: 1; transform: scaleY(1) } 94%, 100% { opacity: .15; transform: scaleY(.5) } }
    @keyframes K_zap { 0% { transform: scale(1.2) } 45%, 100% { transform: scale(1) } }`,
  },
];

export default technology;

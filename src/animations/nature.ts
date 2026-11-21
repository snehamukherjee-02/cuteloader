import type { AnimationSource } from "@/types/animation";

/**
 * Nature & Aesthetic loaders: botanical and celestial scenes with soft gradients.
 * Authoring contract: docs/ANIMATION_AUTHORING.md
 */
const nature: AnimationSource[] = [
  {
    slug: "blooming-flower",
    name: "Blooming Flower",
    category: "nature",
    description:
      "A coral blossom unfurls petal by petal from a tight bud, turns slowly at full bloom, then folds closed again around a softly pulsing golden heart.",
    details:
      "There is something quietly optimistic about a flower opening, and this loader leans into it: two rings of petals bloom in a clockwise ripple while the whole blossom drifts through a slow turn. It suits florists, wedding and gift shops, skincare brands, and spring campaigns that want waiting to feel like a small reward. Because every cycle begins and ends as a closed bud, it also makes a graceful splash screen with no visible jump. Set Petals and Petal tips to two shades of one hue for a natural gradient, and keep the Center warm and contrasting so its pulse still reads at small sizes.",
    tags: ["flower", "bloom", "petals", "spring", "botanical", "soft"],
    kind: "morph",
    colors: { primary: "#fb7185", secondary: "#fcd34d", accent: "#fecdd3" },
    colorLabels: { primary: "Petals", secondary: "Center", accent: "Petal tips" },
    duration: 3.2,
    popularity: 86,
    svg: `
    <defs>
      <radialGradient id="blooming-flower-glow"><stop offset="0" class="ga"/><stop offset="1" class="gb"/></radialGradient>
      <linearGradient id="blooming-flower-petal" x1="0" y1="1" x2="0" y2="0"><stop offset=".2" class="pa"/><stop offset="1" class="pb"/></linearGradient>
    </defs>
    <circle class="glow" cx="50" cy="50" r="40" fill="url(#blooming-flower-glow)"/>
    <g class="turn">
      <g><path class="petal o0" fill="url(#blooming-flower-petal)" d="M50 50C44 45 36 34 38 24C39.5 17 45 13.5 50 18C55 13.5 60.5 17 62 24C64 34 56 45 50 50Z"/></g>
      <g transform="rotate(60 50 50)"><path class="petal o1" fill="url(#blooming-flower-petal)" d="M50 50C44 45 36 34 38 24C39.5 17 45 13.5 50 18C55 13.5 60.5 17 62 24C64 34 56 45 50 50Z"/></g>
      <g transform="rotate(120 50 50)"><path class="petal o2" fill="url(#blooming-flower-petal)" d="M50 50C44 45 36 34 38 24C39.5 17 45 13.5 50 18C55 13.5 60.5 17 62 24C64 34 56 45 50 50Z"/></g>
      <g transform="rotate(180 50 50)"><path class="petal o3" fill="url(#blooming-flower-petal)" d="M50 50C44 45 36 34 38 24C39.5 17 45 13.5 50 18C55 13.5 60.5 17 62 24C64 34 56 45 50 50Z"/></g>
      <g transform="rotate(240 50 50)"><path class="petal o4" fill="url(#blooming-flower-petal)" d="M50 50C44 45 36 34 38 24C39.5 17 45 13.5 50 18C55 13.5 60.5 17 62 24C64 34 56 45 50 50Z"/></g>
      <g transform="rotate(300 50 50)"><path class="petal" fill="url(#blooming-flower-petal)" d="M50 50C44 45 36 34 38 24C39.5 17 45 13.5 50 18C55 13.5 60.5 17 62 24C64 34 56 45 50 50Z"/></g>
      <g transform="rotate(30 50 50)"><path class="inner i0" d="M50 50C46.5 46.5 42 39 43.5 33.5C45 29 55 29 56.5 33.5C58 39 53.5 46.5 50 50Z"/></g>
      <g transform="rotate(90 50 50)"><path class="inner i1" d="M50 50C46.5 46.5 42 39 43.5 33.5C45 29 55 29 56.5 33.5C58 39 53.5 46.5 50 50Z"/></g>
      <g transform="rotate(150 50 50)"><path class="inner i2" d="M50 50C46.5 46.5 42 39 43.5 33.5C45 29 55 29 56.5 33.5C58 39 53.5 46.5 50 50Z"/></g>
      <g transform="rotate(210 50 50)"><path class="inner" d="M50 50C46.5 46.5 42 39 43.5 33.5C45 29 55 29 56.5 33.5C58 39 53.5 46.5 50 50Z"/></g>
      <g transform="rotate(270 50 50)"><path class="inner i4" d="M50 50C46.5 46.5 42 39 43.5 33.5C45 29 55 29 56.5 33.5C58 39 53.5 46.5 50 50Z"/></g>
      <g transform="rotate(330 50 50)"><path class="inner i5" d="M50 50C46.5 46.5 42 39 43.5 33.5C45 29 55 29 56.5 33.5C58 39 53.5 46.5 50 50Z"/></g>
    </g>
    <g class="core"><g class="beat">
      <circle class="disc" cx="50" cy="50" r="8"/>
      <circle class="seed" cx="50" cy="45" r="1.1"/><circle class="seed" cx="54.33" cy="47.5" r="1.1"/>
      <circle class="seed" cx="54.33" cy="52.5" r="1.1"/><circle class="seed" cx="50" cy="55" r="1.1"/>
      <circle class="seed" cx="45.67" cy="52.5" r="1.1"/><circle class="seed" cx="45.67" cy="47.5" r="1.1"/>
      <circle class="seed" cx="50" cy="50" r="1.4"/>
    </g></g>`,
    css: `
    ROOT .ga { stop-color: var(--c1); stop-opacity: .3 }
    ROOT .gb { stop-color: var(--c1); stop-opacity: 0 }
    ROOT .pa { stop-color: var(--c1) }
    ROOT .pb { stop-color: var(--c3) }
    ROOT .glow { transform-origin: 50px 50px; animation: K_glow var(--d) cubic-bezier(.45,.05,.3,1) infinite; animation-delay: calc(var(--d) * -.06) }
    ROOT .turn { transform-origin: 50px 50px; animation: K_turn var(--d) cubic-bezier(.45,0,.55,1) infinite; animation-delay: calc(var(--d) * -.1125) }
    ROOT .petal, ROOT .inner { transform-origin: 50px 50px; animation: K_open var(--d) cubic-bezier(.45,.05,.3,1) infinite }
    ROOT .inner { fill: var(--c1); stroke: var(--c3); stroke-width: .8; stroke-opacity: .7 }
    ROOT .o0 { animation-delay: calc(var(--d) * -.125) }
    ROOT .o1 { animation-delay: calc(var(--d) * -.1) }
    ROOT .o2 { animation-delay: calc(var(--d) * -.075) }
    ROOT .o3 { animation-delay: calc(var(--d) * -.05) }
    ROOT .o4 { animation-delay: calc(var(--d) * -.025) }
    ROOT .i0 { animation-delay: calc(var(--d) * -.075) }
    ROOT .i1 { animation-delay: calc(var(--d) * -.05) }
    ROOT .i2 { animation-delay: calc(var(--d) * -.025) }
    ROOT .i4 { animation-delay: calc(var(--d) * -.975) }
    ROOT .i5 { animation-delay: calc(var(--d) * -.95) }
    ROOT .core { transform-origin: 50px 50px; animation: K_core var(--d) cubic-bezier(.45,.05,.3,1) infinite; animation-delay: calc(var(--d) * -.06) }
    ROOT .beat { transform-origin: 50px 50px; animation: K_beat calc(var(--d) / 2) ease-in-out infinite }
    ROOT .disc { fill: var(--c2) }
    ROOT .seed { fill: var(--c1); opacity: .7 }
    @keyframes K_open { 0%, 5% { transform: scale(.42) } 28% { transform: scale(1.06) } 36%, 56% { transform: scale(1) } 80%, 100% { transform: scale(.42) } }
    @keyframes K_turn { 0%, 8% { transform: rotate(0deg) } 92%, 100% { transform: rotate(60deg) } }
    @keyframes K_core { 0%, 5% { transform: scale(.4) } 30%, 58% { transform: scale(1) } 80%, 100% { transform: scale(.4) } }
    @keyframes K_beat { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.15) } }
    @keyframes K_glow { 0%, 5% { opacity: .2; transform: scale(.5) } 32%, 58% { opacity: 1; transform: scale(1) } 82%, 100% { opacity: .2; transform: scale(.5) } }`,
  },
  {
    slug: "growing-plant",
    name: "Growing Plant",
    category: "nature",
    description:
      "A seedling pushes up out of a little clay pot, its stem drawing itself upward as two leaves unfurl, then it sinks back into the soil to sprout again.",
    details:
      "This one tells a tiny story of progress, which makes it a natural fit for uploads, onboarding steps, savings goals, or anything that grows over time. The stem is drawn with a stroke reveal, each leaf opens from its own base, and a pair of sparkles marks the moment the plant is complete before it gently resets. Garden centers, sustainability brands, habit trackers, and learning platforms tend to get the most out of it. Keep Leaves a fresh green, tune Pot to your brand color, and make Sparkles lighter and warmer than both so they catch the eye.",
    tags: ["plant", "growth", "sprout", "pot", "leaves", "progress"],
    kind: "progress",
    colors: { primary: "#84cc16", secondary: "#fb7185", accent: "#fcd34d" },
    colorLabels: { primary: "Leaves", secondary: "Pot", accent: "Sparkles" },
    duration: 3.2,
    popularity: 82,
    svg: `
    <ellipse class="soil" cx="50" cy="63.6" rx="16" ry="2.6"/>
    <g class="plant"><g class="sway">
      <path class="stem" pathLength="100" d="M50 64C50 55 45.5 47 48 39C50.5 31 52 26 50 17"/>
      <g class="leaf-l">
        <path class="leaf" d="M47.8 50C40.18 52.8 28.98 50 24.5 39.36C34.58 35.44 44.1 40.48 47.8 50Z"/>
        <path class="rib" d="M46.34 48.88Q36.82 45.52 27.3 40.48"/>
      </g>
      <g class="leaf-r">
        <path class="leaf" d="M50.5 29.5C57.22 31.74 69.54 29.5 74.58 18.86C64.5 15.5 54.42 20.54 50.5 29.5Z"/>
        <path class="rib" d="M51.96 28.72Q62.26 25.02 71.78 20.32"/>
      </g>
    </g></g>
    <g class="pot">
      <path class="clay" d="M34 70H66L62.6 88.6Q62 92 58.6 92H41.4Q38 92 37.4 88.6Z"/>
      <path class="band" d="M34.27 71.5H65.73L65.18 74.5H34.82Z"/>
      <rect class="clay" x="31" y="63" width="38" height="8.5" rx="3.2"/>
      <rect class="shine" x="39" y="76" width="3" height="11" rx="1.5"/>
      <rect class="shine" x="34" y="64.6" width="15" height="1.4" rx=".7"/>
    </g>
    <path class="spark" d="M67 36.8Q67 41 71.2 41Q67 41 67 45.2Q67 41 62.8 41Q67 41 67 36.8Z"/>
    <path class="spark s2" d="M32 23.8Q32 27 35.2 27Q32 27 32 30.2Q32 27 28.8 27Q32 27 32 23.8Z"/>`,
    css: `
    ROOT .soil { fill: #7c4a32 }
    ROOT .plant { transform-origin: 50px 64px; animation: K_reset var(--d) ease-in-out infinite }
    ROOT .sway { transform-origin: 50px 64px; animation: K_sway var(--d) ease-in-out infinite }
    ROOT .stem { fill: none; stroke: var(--c1); stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 100 120; animation: K_grow var(--d) cubic-bezier(.45,0,.25,1) infinite }
    ROOT .leaf { fill: var(--c1) }
    ROOT .rib { fill: none; stroke: #fff; stroke-opacity: .5; stroke-width: .9; stroke-linecap: round }
    ROOT .leaf-l { transform-origin: 47.8px 50px; animation: K_leafL var(--d) cubic-bezier(.3,0,.25,1) infinite }
    ROOT .leaf-r { transform-origin: 50.5px 29.5px; animation: K_leafR var(--d) cubic-bezier(.3,0,.25,1) infinite }
    ROOT .pot { transform-origin: 50px 92px; animation: K_pot var(--d) ease-in-out infinite }
    ROOT .clay { fill: var(--c2) }
    ROOT .band { fill: #000; opacity: .14 }
    ROOT .shine { fill: #fff; opacity: .4 }
    ROOT .spark { fill: var(--c3); transform-box: fill-box; transform-origin: center; animation: K_spark var(--d) ease-in-out infinite }
    ROOT .s2 { animation-delay: calc(var(--d) * -.92) }
    @keyframes K_grow { 0%, 4% { stroke-dashoffset: 101 } 42%, 90% { stroke-dashoffset: 0 } 91%, 100% { stroke-dashoffset: 101 } }
    @keyframes K_leafL { 0%, 15% { transform: rotate(50deg) scale(0) } 32% { transform: rotate(-6deg) scale(1.08) } 42%, 90% { transform: rotate(0deg) scale(1) } 91%, 100% { transform: rotate(50deg) scale(0) } }
    @keyframes K_leafR { 0%, 28% { transform: rotate(-50deg) scale(0) } 45% { transform: rotate(6deg) scale(1.08) } 55%, 90% { transform: rotate(0deg) scale(1) } 91%, 100% { transform: rotate(-50deg) scale(0) } }
    @keyframes K_reset { 0%, 78% { opacity: 1; transform: scale(1) } 89%, 95% { opacity: 0; transform: scale(.75) } 100% { opacity: 1; transform: scale(1) } }
    @keyframes K_sway { 0%, 100% { transform: rotate(-2deg) } 50% { transform: rotate(2.5deg) } }
    @keyframes K_pot { 0%, 3%, 14%, 100% { transform: scale(1) } 7% { transform: scale(1.03, .96) } }
    @keyframes K_spark { 0%, 48% { opacity: 0; transform: scale(0) rotate(0deg) } 58% { opacity: 1; transform: scale(1) rotate(45deg) } 72% { opacity: 1; transform: scale(.85) rotate(90deg) } 82%, 100% { opacity: 0; transform: scale(0) rotate(135deg) } }`,
  },
  {
    slug: "floating-leaves",
    name: "Floating Leaves",
    category: "nature",
    description:
      "Three leaves in green, gold, and rose drift down on a light breeze, swinging like little pendulums as they tilt, fading in at the top and out at the bottom.",
    details:
      "Falling leaves have a slow, unhurried rhythm, so this loader works wherever you want waiting to feel calm rather than urgent. Each leaf follows its own swing and descent, which keeps the motion from ever lining up into an obvious repeat. Autumn campaigns, tea and coffee brands, journaling apps, and nature blogs are good homes for it, and it sits nicely on a cozy reading or podcast page too. Choose Fresh leaf, Golden leaf, and Rosy leaf from one seasonal palette, such as three greens for spring or rust and amber for fall, and the whole scene changes mood.",
    tags: ["leaves", "falling", "breeze", "autumn", "drift", "calm"],
    kind: "particles",
    colors: { primary: "#84cc16", secondary: "#fbbf24", accent: "#fb7185" },
    colorLabels: { primary: "Fresh leaf", secondary: "Golden leaf", accent: "Rosy leaf" },
    duration: 2.6,
    popularity: 70,
    svg: `
    <g class="fall fa"><g class="swing wa"><g class="flut">
      <path class="stalk sa" d="M16.5 17L11.25 19.7"/>
      <path class="la" d="M16.5 17C21 8 36 7.25 43.5 16.1C36 25.4 22.5 26 16.5 17Z"/>
      <path class="rib" d="M17.4 17Q30 15.5 41.4 16.1"/>
    </g></g></g>
    <g class="fall fb"><g class="swing wb"><g class="flut">
      <path class="stalk sb" d="M82.15 17L86.88 19.43"/>
      <path class="lb" d="M82.15 17C78.1 8.9 64.6 8.22 57.85 16.19C64.6 24.56 76.75 25.1 82.15 17Z"/>
      <path class="rib" d="M81.34 17Q70 15.65 59.74 16.19"/>
    </g></g></g>
    <g class="fall fc"><g class="swing wc"><g class="flut">
      <path class="stalk sc" d="M39.2 17L35 19.16"/>
      <path class="lc" d="M39.2 17C42.8 9.8 54.8 9.2 60.8 16.28C54.8 23.72 44 24.2 39.2 17Z"/>
      <path class="rib" d="M39.92 17Q50 15.8 59.12 16.28"/>
    </g></g></g>`,
    css: `
    ROOT .fall { animation: K_fall calc(var(--d) * 2) linear infinite }
    ROOT .fa { animation-delay: calc(var(--d) * -.2) }
    ROOT .fb { animation-delay: calc(var(--d) * -.87) }
    ROOT .fc { animation-delay: calc(var(--d) * -1.53) }
    ROOT .swing { animation: K_swing var(--d) cubic-bezier(.45,0,.55,1) infinite }
    ROOT .wa { transform-origin: 30px -1px }
    ROOT .wb { transform-origin: 70px -1px; animation-delay: calc(var(--d) * -.35) }
    ROOT .wc { transform-origin: 50px -1px; animation-delay: calc(var(--d) * -.7) }
    ROOT .flut { transform-box: fill-box; transform-origin: center; animation: K_flut calc(var(--d) / 2) ease-in-out infinite }
    ROOT .stalk { fill: none; stroke-width: 1.4; stroke-linecap: round }
    ROOT .la { fill: var(--c1) }
    ROOT .sa { stroke: var(--c1) }
    ROOT .lb { fill: var(--c2) }
    ROOT .sb { stroke: var(--c2) }
    ROOT .lc { fill: var(--c3) }
    ROOT .sc { stroke: var(--c3) }
    ROOT .rib { fill: none; stroke: #fff; stroke-opacity: .6; stroke-width: .9; stroke-linecap: round }
    @keyframes K_fall { 0% { transform: translateY(0); opacity: 0 } 14%, 84% { opacity: 1 } 100% { transform: translateY(64px); opacity: 0 } }
    @keyframes K_swing { 0%, 100% { transform: rotate(-22deg) } 50% { transform: rotate(22deg) } }
    @keyframes K_flut { 0%, 100% { transform: scaleY(.62) } 50% { transform: scaleY(1) } }`,
  },
  {
    slug: "ocean-waves",
    name: "Ocean Waves",
    category: "nature",
    description:
      "Seen through a round porthole, three layers of waves roll past at different speeds while a little sailboat bobs and rocks on the swell beneath a warm sun.",
    details:
      "This is a complete seaside scene squeezed into a loader: parallax wave bands, a boat that rises on each crest and tilts as it passes, a glowing sun, and a pair of gulls overhead. Travel and booking sites, cruise lines, surf schools, coastal hotels, and summer campaigns can use it for search results or checkout steps. The porthole frame keeps it tidy on any background, light or dark. Change Sea to recolor the waves and the frame together, Sun to shift the time of day, and Sailboat to match your brand accent.",
    tags: ["ocean", "waves", "sailboat", "porthole", "sea", "travel"],
    kind: "wave",
    colors: { primary: "#0ea5e9", secondary: "#fcd34d", accent: "#fb7185" },
    colorLabels: { primary: "Sea", secondary: "Sun", accent: "Sailboat" },
    duration: 2.4,
    popularity: 80,
    svg: `
    <defs>
      <clipPath id="ocean-waves-clip"><circle cx="50" cy="50" r="33"/></clipPath>
      <linearGradient id="ocean-waves-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sa"/><stop offset=".7" class="sb"/></linearGradient>
      <radialGradient id="ocean-waves-sun"><stop offset=".3" class="ua"/><stop offset="1" class="ub"/></radialGradient>
    </defs>
    <g clip-path="url(#ocean-waves-clip)">
      <rect class="base" x="16" y="16" width="68" height="68"/>
      <rect x="16" y="16" width="68" height="68" fill="url(#ocean-waves-sky)"/>
      <circle class="halo" cx="66" cy="31" r="11" fill="url(#ocean-waves-sun)"/>
      <circle class="sun" cx="66" cy="31" r="5.5"/>
      <g class="gull"><path class="wing" d="M27 33Q28.6 31 30.2 33Q31.8 31 33.4 33"/></g>
      <g class="gull g2"><path class="wing" d="M35.2 27.5Q36.4 26 37.6 27.5Q38.8 26 40 27.5"/></g>
      <path class="wave w1" d="M15 56 Q18 53.6 21 56 T27 56 T33 56 T39 56 T45 56 T51 56 T57 56 T63 56 T69 56 T75 56 T81 56 T87 56 T93 56 T99 56 V86 H15 Z"/>
      <path class="wave w2" d="M14 61 Q18 57 22 61 T30 61 T38 61 T46 61 T54 61 T62 61 T70 61 T78 61 T86 61 T94 61 T102 61 V86 H14 Z"/>
      <g class="boat"><g class="tilt">
        <path class="mast" d="M50 59V38"/>
        <path class="sail" d="M51.3 39.5Q59.5 47 61.5 56.5H51.3Z"/>
        <path class="sail jib" d="M48.7 42Q42.5 49 40 56.5H48.7Z"/>
        <path class="flag" d="M50 38L54.2 39.5L50 41Z"/>
        <path class="hull" d="M38 59H62L58.6 65Q57.6 66.6 55.6 66.6H44.4Q42.4 66.6 41.4 65Z"/>
        <path class="stripe" d="M40.3 61.6H59.7"/>
      </g></g>
      <path class="wave w3" d="M20 67 Q25 61.8 30 67 T40 67 T50 67 T60 67 T70 67 T80 67 T90 67 T100 67 V86 H20 Z"/>
    </g>
    <circle class="frame" cx="50" cy="50" r="36.5"/>
    <circle class="rim" cx="50" cy="50" r="34"/>
    <circle class="bolt" cx="50" cy="13.5" r="1.2"/><circle class="bolt" cx="75.81" cy="24.19" r="1.2"/><circle class="bolt" cx="86.5" cy="50" r="1.2"/><circle class="bolt" cx="75.81" cy="75.81" r="1.2"/><circle class="bolt" cx="50" cy="86.5" r="1.2"/><circle class="bolt" cx="24.19" cy="75.81" r="1.2"/><circle class="bolt" cx="13.5" cy="50" r="1.2"/><circle class="bolt" cx="24.19" cy="24.19" r="1.2"/>`,
    css: `
    ROOT .sa { stop-color: var(--c1); stop-opacity: .45 }
    ROOT .sb { stop-color: var(--c2); stop-opacity: .3 }
    ROOT .ua { stop-color: var(--c2); stop-opacity: .7 }
    ROOT .ub { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .base { fill: #fff }
    ROOT .halo { transform-box: fill-box; transform-origin: center; animation: K_sun var(--d) ease-in-out infinite }
    ROOT .sun { fill: var(--c2) }
    ROOT .gull { animation: K_glide var(--d) ease-in-out infinite }
    ROOT .g2 { animation-delay: calc(var(--d) * -.5) }
    ROOT .wing { fill: none; stroke: #475569; stroke-width: .9; stroke-linecap: round; stroke-linejoin: round; transform-box: fill-box; transform-origin: center; animation: K_flap calc(var(--d) / 2) ease-in-out infinite }
    ROOT .wave { fill: var(--c1) }
    ROOT .w1 { opacity: .4; animation: K_s12 calc(var(--d) * 2) linear infinite }
    ROOT .w2 { opacity: .7; animation: K_s16 var(--d) linear infinite }
    ROOT .w3 { stroke: #fff; stroke-opacity: .6; stroke-width: 1; animation: K_s20 var(--d) linear infinite; animation-delay: calc(var(--d) * -.3) }
    ROOT .boat { animation: K_bob var(--d) ease-in-out infinite }
    ROOT .tilt { transform-origin: 50px 63px; animation: K_tilt var(--d) ease-in-out infinite; animation-delay: calc(var(--d) * -.75) }
    ROOT .mast { fill: none; stroke: #475569; stroke-width: 1.3; stroke-linecap: round }
    ROOT .sail { fill: #fff }
    ROOT .jib { opacity: .9 }
    ROOT .flag { fill: var(--c3); transform-origin: 50px 39.5px; animation: K_flag calc(var(--d) / 2) ease-in-out infinite }
    ROOT .hull { fill: var(--c3) }
    ROOT .stripe { fill: none; stroke: #fff; stroke-opacity: .75; stroke-width: 1 }
    ROOT .frame { fill: none; stroke: var(--c1); stroke-width: 7 }
    ROOT .rim { fill: none; stroke: #fff; stroke-opacity: .4; stroke-width: .9 }
    ROOT .bolt { fill: #fff; opacity: .65 }
    @keyframes K_s12 { to { transform: translateX(-12px) } }
    @keyframes K_s16 { to { transform: translateX(-16px) } }
    @keyframes K_s20 { to { transform: translateX(-20px) } }
    @keyframes K_bob { 0%, 100% { transform: translateY(-1.6px) } 50% { transform: translateY(1.6px) } }
    @keyframes K_tilt { 0%, 100% { transform: rotate(6deg) } 50% { transform: rotate(-6deg) } }
    @keyframes K_sun { 0%, 100% { transform: scale(.85); opacity: .75 } 50% { transform: scale(1.1); opacity: 1 } }
    @keyframes K_glide { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(1.6px, -1.2px) } }
    @keyframes K_flap { 0%, 100% { transform: scaleY(1) } 50% { transform: scaleY(.35) } }
    @keyframes K_flag { 0%, 100% { transform: scaleX(1) } 50% { transform: scaleX(.7) } }`,
  },
  {
    slug: "firefly-glow",
    name: "Firefly Glow",
    category: "nature",
    description:
      "Fireflies trace lazy figure-eights over a swaying meadow at dusk, each one flaring and dimming on its own rhythm against a deep indigo sky.",
    details:
      "Soft, warm, and a little magical, this scene suits moments when you want the wait to feel like a pause rather than a delay. The fireflies wander on looping paths at different speeds, so their glow never pulses in lockstep, while two layers of grass sway gently below. It fits meditation and sleep apps, summer camps, children's storytelling sites, candle shops, and dark-mode dashboards. Night sky sets the backdrop, Glow tints the fireflies and the warm haze on the horizon, and Grass should stay a few shades darker than the sky so the silhouette holds.",
    tags: ["fireflies", "glow", "night", "meadow", "magical", "dusk"],
    kind: "pulse",
    colors: { primary: "#312e81", secondary: "#fde047", accent: "#14532d" },
    colorLabels: { primary: "Night sky", secondary: "Glow", accent: "Grass" },
    duration: 2.8,
    popularity: 75,
    svg: `
    <defs>
      <clipPath id="firefly-glow-clip"><circle cx="50" cy="50" r="40"/></clipPath>
      <radialGradient id="firefly-glow-dusk" cx=".5" cy="1" r=".8"><stop offset="0" class="da"/><stop offset="1" class="db"/></radialGradient>
      <radialGradient id="firefly-glow-halo"><stop offset=".08" class="ha"/><stop offset=".3" class="hb"/><stop offset="1" class="hc"/></radialGradient>
    </defs>
    <circle class="sky" cx="50" cy="50" r="40"/>
    <circle cx="50" cy="50" r="40" fill="url(#firefly-glow-dusk)"/>
    <g clip-path="url(#firefly-glow-clip)">
      <path class="grass back" d="M8 92 V80 Q10.1 75.5 12 70 Q11.7 76 14 80 Q15.8 73.3 18.5 65 Q17.1 74 19 80 Q21.4 76 21.5 71 Q23.3 76.4 26 80 Q28.1 72.3 31.5 63 Q29.7 73.2 32 80 Q33.8 75 35.5 69 Q35.1 75.6 37 80 Q39.5 71.5 43.5 61 Q41.3 72.4 44 80 Q46.1 74.6 46 68 Q47.7 75.2 50 80 Q51.8 72.8 54.5 64 Q53.1 73.6 55 80 Q57.5 75.5 59.5 70 Q59.3 76 62 80 Q64.1 71.9 63 62 Q65.7 72.8 68 80 Q69.8 74.6 71.5 68 Q71.1 75.2 73 80 Q75.5 73.7 78.5 66 Q77.3 74.4 80 80 Q82.1 76 82 71 Q83.7 76.4 86 80 Q88.1 74.2 90.5 67 Q89.7 74.8 92 80 V92 Z"/>
      <g class="fx x5"><g class="fy y5"><g class="lamp l5"><circle cx="37" cy="66" r="9" fill="url(#firefly-glow-halo)"/><circle class="bug" cx="37" cy="66" r="1.2"/></g></g></g>
      <path class="grass" d="M8 92 V84 Q9.8 80.8 11.5 77 Q11.1 81.2 13 84 Q14.4 79 16.5 73 Q15.5 79.6 17 84 Q18.8 81.3 18.5 78 Q20.1 81.6 22 84 Q23.4 80 25 75 Q24.5 80.4 26 84 Q27.8 78.2 30.5 71 Q29.1 78.8 31 84 Q32.4 80.8 32 77 Q33.5 81.2 35 84 Q36.8 79.5 39 74 Q38.1 80 40 84 Q41.4 81.3 43 78 Q42.5 81.6 44 84 Q45.8 78.6 45 72 Q47.1 79.2 49 84 Q50.4 80.4 52 76 Q51.5 80.8 53 84 Q54.8 79 57.5 73 Q56.1 79.6 58 84 Q59.4 80.8 59 77 Q60.5 81.2 62 84 Q63.8 80 65.5 75 Q65.1 80.4 67 84 Q68.4 78.6 70.5 72 Q69.5 79.2 71 84 Q72.8 80.8 72.5 77 Q74.1 81.2 76 84 Q77.4 79.5 79 74 Q78.5 80 80 84 Q81.8 81.3 83.5 78 Q83.1 81.6 85 84 Q86.4 80 86 75 Q87.5 80.4 89 84 V92 Z"/>
    </g>
    <g class="fx"><g class="fy y1"><g class="lamp"><circle cx="29" cy="40" r="10.5" fill="url(#firefly-glow-halo)"/><circle class="bug" cx="29" cy="40" r="1.3"/></g></g></g>
    <g class="fx x2"><g class="fy y2"><g class="lamp l2"><circle cx="61" cy="29" r="9" fill="url(#firefly-glow-halo)"/><circle class="bug" cx="61" cy="29" r="1.2"/></g></g></g>
    <g class="fx x3"><g class="fy y3"><g class="lamp l3"><circle cx="47" cy="53" r="11" fill="url(#firefly-glow-halo)"/><circle class="bug" cx="47" cy="53" r="1.4"/></g></g></g>
    <g class="fx x4"><g class="fy y4"><g class="lamp l4"><circle cx="71" cy="51" r="9.5" fill="url(#firefly-glow-halo)"/><circle class="bug" cx="71" cy="51" r="1.3"/></g></g></g>`,
    css: `
    ROOT .sky { fill: var(--c1); stroke: #fff; stroke-opacity: .12 }
    ROOT .da { stop-color: var(--c2); stop-opacity: .42 }
    ROOT .db { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .ha { stop-color: var(--c2); stop-opacity: 1 }
    ROOT .hb { stop-color: var(--c2); stop-opacity: .55 }
    ROOT .hc { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .grass { fill: var(--c3); transform-origin: 50px 92px; animation: K_sway calc(var(--d) * 2) ease-in-out infinite }
    ROOT .back { opacity: .6; animation-delay: calc(var(--d) * -1) }
    ROOT .bug { fill: #fff; stroke: var(--c2); stroke-width: .6 }
    ROOT .lamp { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) ease-in-out infinite }
    ROOT .l2 { animation-delay: calc(var(--d) * -.3) }
    ROOT .l3 { animation-delay: calc(var(--d) * -.55) }
    ROOT .l4 { animation-delay: calc(var(--d) * -.8) }
    ROOT .l5 { animation-delay: calc(var(--d) * -.15) }
    ROOT .fx { animation: K_wx calc(var(--d) * 2) ease-in-out infinite }
    ROOT .fy { animation: K_wy var(--d) ease-in-out infinite }
    ROOT .x2, ROOT .x4 { animation-duration: var(--d) }
    ROOT .y2, ROOT .y4 { animation-duration: calc(var(--d) * 2) }
    ROOT .x3 { animation-delay: calc(var(--d) * -.7) }
    ROOT .x4 { animation-delay: calc(var(--d) * -.4) }
    ROOT .x5 { animation-delay: calc(var(--d) * -1.3) }
    ROOT .y1 { animation-delay: calc(var(--d) * -.25) }
    ROOT .y3 { animation-delay: calc(var(--d) * -.6) }
    ROOT .y4 { animation-delay: calc(var(--d) * -1.1) }
    ROOT .y5 { animation-delay: calc(var(--d) * -.4) }
    @keyframes K_wx { 0%, 100% { transform: translateX(-4px) } 50% { transform: translateX(4px) } }
    @keyframes K_wy { 0%, 100% { transform: translateY(-3px) } 50% { transform: translateY(3px) } }
    @keyframes K_blink { 0%, 100% { opacity: .15; transform: scale(.5) } 40% { opacity: 1; transform: scale(1.08) } 72% { opacity: .15; transform: scale(.5) } }
    @keyframes K_sway { 0%, 100% { transform: skewX(-3deg) } 50% { transform: skewX(3deg) } }`,
  },
  {
    slug: "moon-phases",
    name: "Moon Phases",
    category: "nature",
    description:
      "The moon waxes from a sliver of crescent to full and wanes back to dark in one smooth cycle, its halo swelling at full moon while stars twinkle around it.",
    details:
      "Instead of a simple sliding shadow, the terminator here curves the way it does in the real sky, so crescents and gibbous phases both look right. That attention to detail makes it a good match for astronomy and astrology sites, sleep trackers, calendar and tide apps, and night-themed portfolios. The full cycle is long enough to feel meditative without dragging. Night sky colors both the tile and the shadowed side of the moon, Moon sets the lit surface and its halo, and Stars works best as a soft pastel.",
    tags: ["moon", "phases", "lunar", "night", "stars", "celestial"],
    kind: "morph",
    colors: { primary: "#312e81", secondary: "#fde68a", accent: "#c4b5fd" },
    colorLabels: { primary: "Night sky", secondary: "Moon", accent: "Stars" },
    duration: 4,
    popularity: 84,
    svg: `
    <defs>
      <radialGradient id="moon-phases-glow"><stop offset=".55" class="ga"/><stop offset="1" class="gb"/></radialGradient>
    </defs>
    <rect class="sky" x="10" y="10" width="80" height="80" rx="24"/>
    <circle class="glow" cx="50" cy="50" r="33" fill="url(#moon-phases-glow)"/>
    <path class="star" d="M22 22.4Q22 25 24.6 25Q22 25 22 27.6Q22 25 19.4 25Q22 25 22 22.4Z"/>
    <path class="star t2" d="M77 20Q77 22 79 22Q77 22 77 24Q77 22 75 22Q77 22 77 20Z"/>
    <path class="star t3" d="M82 48.4Q82 50 83.6 50Q82 50 82 51.6Q82 50 80.4 50Q82 50 82 48.4Z"/>
    <path class="star t4" d="M73 75.6Q73 78 75.4 78Q73 78 73 80.4Q73 78 70.6 78Q73 78 73 75.6Z"/>
    <path class="star t5" d="M27 74.2Q27 76 28.8 76Q27 76 27 77.8Q27 76 25.2 76Q27 76 27 74.2Z"/>
    <path class="star t6" d="M18 48.6Q18 50 19.4 50Q18 50 18 51.4Q18 50 16.6 50Q18 50 18 48.6Z"/>
    <path class="star t7" d="M60 14.1Q60 15.5 61.4 15.5Q60 15.5 60 16.9Q60 15.5 58.6 15.5Q60 15.5 60 14.1Z"/>
    <circle class="moon" cx="50" cy="50" r="21"/>
    <g class="shade">
      <path class="half" d="M50 29A21 21 0 0 0 50 71Z"/>
      <ellipse class="dark" cx="50" cy="50" rx="21" ry="21"/>
    </g>
    <ellipse class="lit" cx="50" cy="50" rx="21" ry="21"/>
    <circle class="crater" cx="43" cy="44" r="3.4"/>
    <circle class="crater" cx="57.5" cy="55" r="4.2"/>
    <circle class="crater" cx="46" cy="60.5" r="2.2"/>
    <circle class="crater" cx="58" cy="40.5" r="1.8"/>`,
    css: `
    ROOT .sky { fill: var(--c1); stroke: #fff; stroke-opacity: .12 }
    ROOT .ga { stop-color: var(--c2); stop-opacity: .35 }
    ROOT .gb { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .glow { transform-origin: 50px 50px; animation: K_glow var(--d) ease-in-out infinite }
    ROOT .star { fill: var(--c3); transform-box: fill-box; transform-origin: center; animation: K_tw calc(var(--d) / 2) ease-in-out infinite }
    ROOT .t2 { animation-delay: calc(var(--d) * -.15) }
    ROOT .t3 { animation-delay: calc(var(--d) * -.3) }
    ROOT .t4 { animation-delay: calc(var(--d) * -.05) }
    ROOT .t5 { animation-delay: calc(var(--d) * -.38) }
    ROOT .t6 { animation-delay: calc(var(--d) * -.22) }
    ROOT .t7 { animation-delay: calc(var(--d) * -.44) }
    ROOT .moon, ROOT .lit { fill: var(--c2) }
    ROOT .shade { fill: var(--c1); opacity: .84 }
    ROOT .half { transform-origin: 50px 50px; animation: K_half var(--d) steps(1, end) infinite }
    ROOT .dark { transform-origin: 50px 50px; animation: K_dark var(--d) linear infinite }
    ROOT .lit { transform-origin: 50px 50px; animation: K_lit var(--d) linear infinite }
    ROOT .crater { fill: #000; opacity: .08 }
    @keyframes K_half { 0% { transform: rotate(0deg) } 50%, 100% { transform: rotate(180deg) } }
    @keyframes K_dark { 0% { transform: scaleX(1); animation-timing-function: cubic-bezier(.12,0,.39,0) } 25%, 75% { transform: scaleX(0); animation-timing-function: cubic-bezier(.61,1,.88,1) } 100% { transform: scaleX(1) } }
    @keyframes K_lit { 0%, 25% { transform: scaleX(0); animation-timing-function: cubic-bezier(.61,1,.88,1) } 50% { transform: scaleX(1); animation-timing-function: cubic-bezier(.12,0,.39,0) } 75%, 100% { transform: scaleX(0) } }
    @keyframes K_glow { 0%, 100% { opacity: .15; transform: scale(.82) } 50% { opacity: 1; transform: scale(1) } }
    @keyframes K_tw { 0%, 100% { opacity: .35; transform: scale(.4) } 50% { opacity: 1; transform: scale(1) } }`,
  },
  {
    slug: "shooting-star",
    name: "Shooting Star",
    category: "nature",
    description:
      "Golden stars streak across a night sky, spinning as their glowing tails stretch out and burn away, while tiny stars twinkle quietly in the background.",
    details:
      "A shooting star is the classic symbol of a wish, so this loader feels hopeful and a little celebratory. Two meteors take turns crossing the sky, which means something is always in motion, and each tail grows and fades as it travels. It works nicely for wishlists, gift guides, rewards and loyalty programs, kids' apps, and astronomy content. Night sky sets the backdrop, Shooting star colors the stars and their tails, and Twinkles tints the background sparkles along with the hazy glow near the horizon.",
    tags: ["meteor", "star", "night", "wish", "sparkle", "streak"],
    kind: "particles",
    colors: { primary: "#1e1b4b", secondary: "#fcd34d", accent: "#c4b5fd" },
    colorLabels: { primary: "Night sky", secondary: "Shooting star", accent: "Twinkles" },
    duration: 2.4,
    popularity: 77,
    svg: `
    <defs>
      <clipPath id="shooting-star-clip"><circle cx="50" cy="50" r="40"/></clipPath>
      <radialGradient id="shooting-star-haze" cx=".3" cy=".95" r=".85"><stop offset="0" class="ha"/><stop offset="1" class="hb"/></radialGradient>
      <linearGradient id="shooting-star-tail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" class="ta"/><stop offset="1" class="tb"/></linearGradient>
      <radialGradient id="shooting-star-glow"><stop offset="0" class="la"/><stop offset="1" class="lb"/></radialGradient>
    </defs>
    <circle class="sky" cx="50" cy="50" r="40"/>
    <circle cx="50" cy="50" r="40" fill="url(#shooting-star-haze)"/>
    <circle class="tw" cx="62" cy="24" r="1"/>
    <circle class="tw w2" cx="22" cy="44" r=".8"/>
    <circle class="tw w3" cx="40" cy="74" r="1"/>
    <circle class="tw w4" cx="64" cy="76" r=".8"/>
    <circle class="tw w5" cx="84" cy="44" r=".9"/>
    <path class="tw w6" d="M36 16.8Q36 19 38.2 19Q36 19 36 21.2Q36 19 33.8 19Q36 19 36 16.8Z"/>
    <path class="tw w7" d="M80 59.4Q80 62 82.6 62Q80 62 80 64.6Q80 62 77.4 62Q80 62 80 59.4Z"/>
    <path class="tw w8" d="M26 56.2Q26 58 27.8 58Q26 58 26 59.8Q26 58 24.2 58Q26 58 26 56.2Z"/>
    <g clip-path="url(#shooting-star-clip)">
      <g transform="translate(22 27) rotate(32)"><g class="fly">
        <path class="tail" d="M-34 0L0 -2.8L0 2.8Z" fill="url(#shooting-star-tail)"/>
        <circle r="9" fill="url(#shooting-star-glow)"/>
        <path class="head" d="M0 -6L1.53 -2.1L5.71 -1.85L2.47 0.8L3.53 4.85L0 2.6L-3.53 4.85L-2.47 0.8L-5.71 -1.85L-1.53 -2.1Z"/>
      </g></g>
      <g transform="translate(52 21) rotate(32) scale(.64)"><g class="fly f2">
        <path class="tail" d="M-34 0L0 -2.8L0 2.8Z" fill="url(#shooting-star-tail)"/>
        <circle r="9" fill="url(#shooting-star-glow)"/>
        <path class="head" d="M0 -6L1.53 -2.1L5.71 -1.85L2.47 0.8L3.53 4.85L0 2.6L-3.53 4.85L-2.47 0.8L-5.71 -1.85L-1.53 -2.1Z"/>
      </g></g>
    </g>`,
    css: `
    ROOT .sky { fill: var(--c1); stroke: #fff; stroke-opacity: .12 }
    ROOT .ha { stop-color: var(--c3); stop-opacity: .38 }
    ROOT .hb { stop-color: var(--c3); stop-opacity: 0 }
    ROOT .ta { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .tb { stop-color: var(--c2); stop-opacity: .95 }
    ROOT .la { stop-color: var(--c2); stop-opacity: .6 }
    ROOT .lb { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .tw { fill: var(--c3); transform-box: fill-box; transform-origin: center; animation: K_tw calc(var(--d) / 2) ease-in-out infinite }
    ROOT .w2 { animation-delay: calc(var(--d) * -.1) }
    ROOT .w3 { animation-delay: calc(var(--d) * -.3) }
    ROOT .w4 { animation-delay: calc(var(--d) * -.18) }
    ROOT .w5 { animation-delay: calc(var(--d) * -.42) }
    ROOT .w6 { animation-delay: calc(var(--d) * -.24) }
    ROOT .w7 { animation-delay: calc(var(--d) * -.06) }
    ROOT .w8 { animation-delay: calc(var(--d) * -.36) }
    ROOT .fly { animation: K_fly var(--d) infinite }
    ROOT .tail { transform-origin: 0px 0px; animation: K_tail var(--d) cubic-bezier(.3,0,.4,1) infinite }
    ROOT .head { fill: var(--c2); stroke: var(--c2); stroke-width: 1.3; stroke-linejoin: round; transform-origin: 0px 0px; animation: K_spin var(--d) cubic-bezier(.3,0,.4,1) infinite }
    ROOT .f2, ROOT .f2 .tail, ROOT .f2 .head { animation-delay: calc(var(--d) * -.5) }
    @keyframes K_fly { 0% { transform: translateX(0); opacity: 0; animation-timing-function: cubic-bezier(.3,0,.4,1) } 6%, 46% { opacity: 1 } 58% { transform: translateX(48px); opacity: 0 } 100% { transform: translateX(48px); opacity: 0 } }
    @keyframes K_tail { 0% { transform: scaleX(.05) } 28% { transform: scaleX(1) } 44% { transform: scaleX(.85) } 58%, 100% { transform: scaleX(.15) } }
    @keyframes K_spin { 0% { transform: rotate(0deg) } 58%, 100% { transform: rotate(144deg) } }
    @keyframes K_tw { 0%, 100% { opacity: .3; transform: scale(.5) } 50% { opacity: 1; transform: scale(1) } }`,
  },
  {
    slug: "aurora-flow",
    name: "Aurora Flow",
    category: "nature",
    description:
      "Curtains of green and violet light roll across a starry sky above snowy peaks, glowing brightest at their rippling lower edge like the northern lights.",
    details:
      "Aurora Flow is the most atmospheric loader in the set: three translucent curtains of light drift across the sky at different speeds and in different directions, each one breathing taller and softer as it goes, while a mountain range sits in silhouette below. It brings a sense of wonder to travel and adventure brands, outdoor gear stores, winter campaigns, and immersive music or wellness apps. The arched window shape frames the scene neatly on light and dark pages alike. Night sky colors the backdrop, Aurora sets the bright rippling edge of each curtain, and Aurora edge tints the haze that fades above it, so contrasting hues like mint and violet look the most natural.",
    tags: ["aurora", "ribbons", "mountains", "night", "flow", "dreamy"],
    kind: "wave",
    colors: { primary: "#1e1b4b", secondary: "#6ee7b7", accent: "#c4b5fd" },
    colorLabels: { primary: "Night sky", secondary: "Aurora", accent: "Aurora edge" },
    duration: 3.2,
    popularity: 72,
    svg: `
    <defs>
      <clipPath id="aurora-flow-clip"><path d="M16 86V46A34 34 0 0 1 84 46V86Q84 90 80 90H20Q16 90 16 86Z"/></clipPath>
      <linearGradient id="aurora-flow-haze" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" class="za"/><stop offset=".85" class="zb"/></linearGradient>
      <linearGradient id="aurora-flow-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="aa"/><stop offset=".6" class="ab"/><stop offset="1" class="ac"/></linearGradient>
      <linearGradient id="aurora-flow-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="ba"/><stop offset=".6" class="bb"/><stop offset="1" class="bc"/></linearGradient>
      <linearGradient id="aurora-flow-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="ca"/><stop offset=".6" class="cb"/><stop offset="1" class="cc"/></linearGradient>
    </defs>
    <path class="sky" d="M16 86V46A34 34 0 0 1 84 46V86Q84 90 80 90H20Q16 90 16 86Z"/>
    <path d="M16 86V46A34 34 0 0 1 84 46V86Q84 90 80 90H20Q16 90 16 86Z" fill="url(#aurora-flow-haze)"/>
    <circle class="tw" cx="30" cy="22" r="1"/>
    <circle class="tw s2" cx="64" cy="17" r="1.1"/>
    <circle class="tw s3" cx="46" cy="15.5" r=".9"/>
    <circle class="tw s4" cx="76" cy="36" r=".9"/>
    <circle class="tw s5" cx="24" cy="38" r=".8"/>
    <g clip-path="url(#aurora-flow-clip)">
      <g class="lift l3"><g class="slide v3">
        <path fill="url(#aurora-flow-c)" d="M15 33Q18.25 29 21.5 33T28 33T34.5 33T41 33T47.5 33T54 33T60.5 33T67 33T73.5 33T80 33T86.5 33T93 33T99.5 33V20H15Z"/>
        <path class="edge e3" d="M15 33Q18.25 29 21.5 33T28 33T34.5 33T41 33T47.5 33T54 33T60.5 33T67 33T73.5 33T80 33T86.5 33T93 33T99.5 33"/>
      </g></g>
      <g class="lift"><g class="slide">
        <path fill="url(#aurora-flow-a)" d="M14 46Q18 39.6 22 46T30 46T38 46T46 46T54 46T62 46T70 46T78 46T86 46T94 46T102 46V22H14Z"/>
        <path class="edge" d="M14 46Q18 39.6 22 46T30 46T38 46T46 46T54 46T62 46T70 46T78 46T86 46T94 46T102 46"/>
      </g></g>
      <g class="lift l2"><g class="slide v2">
        <path fill="url(#aurora-flow-b)" d="M0 55Q3.5 49.8 7 55T14 55T21 55T28 55T35 55T42 55T49 55T56 55T63 55T70 55T77 55T84 55V38H0Z"/>
        <path class="edge e2" d="M0 55Q3.5 49.8 7 55T14 55T21 55T28 55T35 55T42 55T49 55T56 55T63 55T70 55T77 55T84 55"/>
      </g></g>
      <path class="ridge" d="M16 71L23 64L29 67.5L38 58L47 65L54 60.5L63 67L71 59L78 63.5L84 60V90H16Z"/>
      <path class="far" d="M16 71L23 64L29 67.5L38 58L47 65L54 60.5L63 67L71 59L78 63.5L84 60V90H16Z"/>
      <path class="ridge" d="M16 78L27 68L34 73L46 61.5L58 74L66 69L76 75L84 71V90H16Z"/>
      <path class="near" d="M16 78L27 68L34 73L46 61.5L58 74L66 69L76 75L84 71V90H16Z"/>
      <path class="snow" d="M46 61.5L42.5 64.85L44.3 64.3L45.6 65.6L47.2 64.4L49.6 65.4ZM27 68L24.4 70.4L25.6 70L26.6 70.9L27.8 70L29.4 70.4Z"/>
    </g>`,
    css: `
    ROOT .sky { fill: var(--c1); stroke: #fff; stroke-opacity: .12 }
    ROOT .za { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .zb { stop-color: var(--c2); stop-opacity: .24 }
    ROOT .aa { stop-color: var(--c3); stop-opacity: 0 }
    ROOT .ab { stop-color: var(--c3); stop-opacity: .38 }
    ROOT .ac { stop-color: var(--c2); stop-opacity: .9 }
    ROOT .ba { stop-color: var(--c2); stop-opacity: 0 }
    ROOT .bb { stop-color: var(--c2); stop-opacity: .3 }
    ROOT .bc { stop-color: var(--c2); stop-opacity: .8 }
    ROOT .ca { stop-color: var(--c3); stop-opacity: 0 }
    ROOT .cb { stop-color: var(--c3); stop-opacity: .35 }
    ROOT .cc { stop-color: var(--c3); stop-opacity: .85 }
    ROOT .tw { fill: #fff; transform-box: fill-box; transform-origin: center; animation: K_tw calc(var(--d) / 2) ease-in-out infinite }
    ROOT .s2 { animation-delay: calc(var(--d) * -.2) }
    ROOT .s3 { animation-delay: calc(var(--d) * -.35) }
    ROOT .s4 { animation-delay: calc(var(--d) * -.1) }
    ROOT .s5 { animation-delay: calc(var(--d) * -.42) }
    ROOT .edge { fill: none; stroke: var(--c2); stroke-width: 1.3; stroke-linecap: round; opacity: .9 }
    ROOT .e2 { stroke-width: 1; opacity: .7 }
    ROOT .e3 { stroke: var(--c3); stroke-width: .9; opacity: .8 }
    ROOT .slide { animation: K_left16 var(--d) linear infinite }
    ROOT .v2 { animation: K_right14 var(--d) linear infinite }
    ROOT .v3 { animation: K_left13 calc(var(--d) * 2) linear infinite }
    ROOT .lift { transform-origin: 50px 46px; animation: K_lift calc(var(--d) * 2) ease-in-out infinite }
    ROOT .l2 { transform-origin: 50px 55px; animation-duration: var(--d); animation-delay: calc(var(--d) * -.4) }
    ROOT .l3 { transform-origin: 50px 33px; animation-delay: calc(var(--d) * -1.1) }
    ROOT .ridge { fill: var(--c1) }
    ROOT .far { fill: #000; opacity: .22 }
    ROOT .near { fill: #000; opacity: .42 }
    ROOT .snow { fill: #fff; opacity: .85 }
    @keyframes K_left16 { to { transform: translateX(-16px) } }
    @keyframes K_right14 { to { transform: translateX(14px) } }
    @keyframes K_left13 { to { transform: translateX(-13px) } }
    @keyframes K_lift { 0%, 100% { transform: scaleY(1); opacity: .8 } 50% { transform: scaleY(1.24); opacity: 1 } }
    @keyframes K_tw { 0%, 100% { opacity: .25; transform: scale(.5) } 50% { opacity: 1; transform: scale(1) } }`,
  },
  {
    slug: "raindrops",
    name: "Raindrops",
    category: "nature",
    description:
      "Glassy raindrops fall one after another into a still puddle, each impact throwing up a tiny splash and a pair of ripples that spread out and fade.",
    details:
      "The rhythm of falling rain is naturally soothing, and this loader keeps that cadence steady: three drops land in turn at different spots, so the ripples overlap gently instead of stacking up. Weather apps, umbrella and outerwear shops, sleep-sound players, spa and wellness sites, and rainy-day content are all a good fit. It also holds up at very small sizes because every shape is simple. Drops colors the falling water, the splashes, and the ripples, while Puddle sets the pool below; keep Puddle lighter than Drops so every ring stays crisp.",
    tags: ["rain", "drops", "ripple", "puddle", "weather", "calm"],
    kind: "wave",
    colors: { primary: "#38bdf8", secondary: "#c4b5fd" },
    colorLabels: { primary: "Drops", secondary: "Puddle" },
    duration: 1.8,
    popularity: 68,
    svg: `
    <defs>
      <radialGradient id="raindrops-pool" cx=".5" cy=".35" r=".65"><stop offset="0" class="pa"/><stop offset="1" class="pb"/></radialGradient>
      <linearGradient id="raindrops-drop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="da"/><stop offset="1" class="db"/></linearGradient>
    </defs>
    <ellipse cx="50" cy="74" rx="37" ry="10" fill="url(#raindrops-pool)"/>
    <ellipse class="gleam" cx="43" cy="71" rx="16" ry="2.8"/>
    <ellipse class="ring" cx="32" cy="74.5" rx="11" ry="3.2"/>
    <ellipse class="ring rA2" cx="32" cy="74.5" rx="11" ry="3.2"/>
    <ellipse class="ring rB1" cx="53" cy="70.5" rx="11" ry="3.2"/>
    <ellipse class="ring rB2" cx="53" cy="70.5" rx="11" ry="3.2"/>
    <ellipse class="ring rC1" cx="69" cy="78" rx="11" ry="3.2"/>
    <ellipse class="ring rC2" cx="69" cy="78" rx="11" ry="3.2"/>
    <circle class="splash spL" cx="32" cy="73.5" r="1.2"/>
    <circle class="splash spR" cx="32" cy="73.5" r="1.2"/>
    <circle class="splash spL pB" cx="53" cy="69.5" r="1.2"/>
    <circle class="splash spR pB" cx="53" cy="69.5" r="1.2"/>
    <circle class="splash spL pC" cx="69" cy="77" r="1.2"/>
    <circle class="splash spR pC" cx="69" cy="77" r="1.2"/>
    <g class="drop dA">
      <path d="M32 5.5C34.8 9.5 37 12.7 37 15.5A5 5 0 0 1 27 15.5C27 12.7 29.2 9.5 32 5.5Z" fill="url(#raindrops-drop)"/>
      <ellipse class="shine" cx="29.8" cy="14.5" rx="1.1" ry="2.1"/>
    </g>
    <g class="drop dB">
      <path d="M53 1.5C55.8 5.5 58 8.7 58 11.5A5 5 0 0 1 48 11.5C48 8.7 50.2 5.5 53 1.5Z" fill="url(#raindrops-drop)"/>
      <ellipse class="shine" cx="50.8" cy="10.5" rx="1.1" ry="2.1"/>
    </g>
    <g class="drop dC">
      <path d="M69 9C71.8 13 74 16.2 74 19A5 5 0 0 1 64 19C64 16.2 66.2 13 69 9Z" fill="url(#raindrops-drop)"/>
      <ellipse class="shine" cx="66.8" cy="18" rx="1.1" ry="2.1"/>
    </g>`,
    css: `
    ROOT .pa { stop-color: var(--c2); stop-opacity: .6 }
    ROOT .pb { stop-color: var(--c2) }
    ROOT .da { stop-color: var(--c1); stop-opacity: .5 }
    ROOT .db { stop-color: var(--c1) }
    ROOT .gleam { fill: #fff; opacity: .3; animation: K_gleam calc(var(--d) * 2) ease-in-out infinite }
    ROOT .ring { fill: none; stroke: var(--c1); stroke-width: 1.4; transform-box: fill-box; transform-origin: center; animation: K_ring var(--d) cubic-bezier(.2,.6,.35,1) infinite }
    ROOT .rA2, ROOT .rB2, ROOT .rC2 { stroke-width: 1 }
    ROOT .rA2 { animation-delay: calc(var(--d) * -.88) }
    ROOT .rB1 { animation-delay: calc(var(--d) * -.333) }
    ROOT .rB2 { animation-delay: calc(var(--d) * -.213) }
    ROOT .rC1 { animation-delay: calc(var(--d) * -.667) }
    ROOT .rC2 { animation-delay: calc(var(--d) * -.547) }
    ROOT .splash { fill: var(--c1) }
    ROOT .spL { animation: K_splL var(--d) linear infinite }
    ROOT .spR { animation: K_splR var(--d) linear infinite }
    ROOT .pB { animation-delay: calc(var(--d) * -.333) }
    ROOT .pC { animation-delay: calc(var(--d) * -.667) }
    ROOT .drop { animation: K_fall var(--d) linear infinite }
    ROOT .dA { transform-origin: 32px 20.5px }
    ROOT .dB { transform-origin: 53px 16.5px; animation-delay: calc(var(--d) * -.333) }
    ROOT .dC { transform-origin: 69px 24px; animation-delay: calc(var(--d) * -.667) }
    ROOT .shine { fill: #fff; opacity: .75 }
    @keyframes K_fall { 0% { transform: translateY(0) scaleY(.9); opacity: 0; animation-timing-function: cubic-bezier(.5,0,.9,.6) } 10% { opacity: 1 } 45% { transform: translateY(54px) scaleY(1.12); opacity: 1 } 47%, 100% { transform: translateY(54px) scaleY(.3); opacity: 0 } }
    @keyframes K_ring { 0%, 45% { transform: scale(0); opacity: 0 } 46% { transform: scale(.12); opacity: 1 } 100% { transform: scale(1.15); opacity: 0 } }
    @keyframes K_splL { 0%, 45.5% { transform: translate(0, 0); opacity: 0 } 46% { transform: translate(0, 0); opacity: 1; animation-timing-function: cubic-bezier(.2,.7,.4,1) } 55% { transform: translate(-5px, -6px); opacity: 1; animation-timing-function: cubic-bezier(.6,0,.8,.4) } 64%, 100% { transform: translate(-8px, -1px); opacity: 0 } }
    @keyframes K_splR { 0%, 45.5% { transform: translate(0, 0); opacity: 0 } 46% { transform: translate(0, 0); opacity: 1; animation-timing-function: cubic-bezier(.2,.7,.4,1) } 55% { transform: translate(5px, -6.5px); opacity: 1; animation-timing-function: cubic-bezier(.6,0,.8,.4) } 64%, 100% { transform: translate(8px, -1.5px); opacity: 0 } }
    @keyframes K_gleam { 0%, 100% { transform: translateX(-3px); opacity: .2 } 50% { transform: translateX(3px); opacity: .42 } }`,
  },
  {
    slug: "solar-system",
    name: "Solar System",
    category: "nature",
    description:
      "Three planets circle a softly pulsing sun on faint orbit rings, each at its own pace, with a tiny moon looping the middle world and stars glinting beyond.",
    details:
      "A top-down orrery makes a satisfying loader because every orbit is a seamless loop, and the different speeds keep the eye moving without ever feeling busy. Each planet is shaded on the side facing away from the sun, the outer one wears a golden ring, and the whole system can spin in either direction. Science and education sites, space-themed products, developer tools, and anything about scale or time are natural homes for it. Sun tints the star and its corona, Planets colors all three worlds, and Space sets the backdrop; a deep, muted Space keeps the glow looking bright.",
    tags: ["planets", "orbit", "sun", "space", "astronomy", "cosmic"],
    kind: "orbit",
    colors: { primary: "#fcd34d", secondary: "#7dd3fc", accent: "#1e1b4b" },
    colorLabels: { primary: "Sun", secondary: "Planets", accent: "Space" },
    duration: 4.8,
    direction: true,
    popularity: 88,
    svg: `
    <defs>
      <radialGradient id="solar-system-corona"><stop offset="0" class="ca"/><stop offset=".45" class="cb"/><stop offset="1" class="cc"/></radialGradient>
      <linearGradient id="solar-system-shade" x1="0" y1="1" x2="0" y2="0"><stop offset=".45" class="sa"/><stop offset="1" class="sb"/></linearGradient>
    </defs>
    <circle class="space" cx="50" cy="50" r="44"/>
    <circle class="tw" cx="20" cy="30" r=".9"/>
    <circle class="tw t2" cx="78" cy="22" r=".8"/>
    <circle class="tw t3" cx="84" cy="64" r="1"/>
    <circle class="tw t4" cx="26" cy="78" r=".8"/>
    <circle class="tw t5" cx="60" cy="88" r=".7"/>
    <circle class="tw t6" cx="38" cy="10.5" r=".7"/>
    <circle class="orbit" cx="50" cy="50" r="15"/>
    <circle class="orbit" cx="50" cy="50" r="25"/>
    <circle class="orbit" cx="50" cy="50" r="36"/>
    <circle class="corona" cx="50" cy="50" r="16" fill="url(#solar-system-corona)"/>
    <g class="sun">
      <circle class="core" cx="50" cy="50" r="7"/>
      <circle class="flare" cx="48" cy="47.8" r="2.6"/>
    </g>
    <g class="orb o1">
      <circle class="planet" cx="50" cy="35" r="2.8"/>
      <circle cx="50" cy="35" r="2.8" fill="url(#solar-system-shade)"/>
    </g>
    <g class="orb o2">
      <circle class="planet" cx="50" cy="25" r="3.8"/>
      <circle cx="50" cy="25" r="3.8" fill="url(#solar-system-shade)"/>
      <g class="luna"><circle class="moon" cx="50" cy="18.8" r="1.1"/></g>
    </g>
    <g class="orb o3">
      <g transform="rotate(-18 50 14)"><path class="ring" d="M42 14A8 2.4 0 0 1 58 14"/></g>
      <circle class="planet" cx="50" cy="14" r="4.6"/>
      <circle cx="50" cy="14" r="4.6" fill="url(#solar-system-shade)"/>
      <g transform="rotate(-18 50 14)"><path class="ring" d="M58 14A8 2.4 0 0 1 42 14"/></g>
    </g>`,
    css: `
    ROOT .space { fill: var(--c3); stroke: #fff; stroke-opacity: .12 }
    ROOT .ca { stop-color: var(--c1); stop-opacity: .85 }
    ROOT .cb { stop-color: var(--c1); stop-opacity: .3 }
    ROOT .cc { stop-color: var(--c1); stop-opacity: 0 }
    ROOT .sa { stop-color: #000; stop-opacity: 0 }
    ROOT .sb { stop-color: #000; stop-opacity: .5 }
    ROOT .tw { fill: #fff; transform-box: fill-box; transform-origin: center; animation: K_tw calc(var(--d) / 2) ease-in-out infinite }
    ROOT .t2 { animation-delay: calc(var(--d) * -.1) }
    ROOT .t3 { animation-delay: calc(var(--d) * -.3) }
    ROOT .t4 { animation-delay: calc(var(--d) * -.4) }
    ROOT .t5 { animation-delay: calc(var(--d) * -.2) }
    ROOT .t6 { animation-delay: calc(var(--d) * -.45) }
    ROOT .orbit { fill: none; stroke: #fff; stroke-opacity: .16; stroke-width: .7 }
    ROOT .corona { transform-origin: 50px 50px; animation: K_pulse calc(var(--d) / 2) ease-in-out infinite }
    ROOT .sun { transform-origin: 50px 50px; animation: K_beat calc(var(--d) / 2) ease-in-out infinite }
    ROOT .core { fill: var(--c1) }
    ROOT .flare { fill: #fff; opacity: .45 }
    ROOT .planet { fill: var(--c2) }
    ROOT .moon { fill: #fff; opacity: .9 }
    ROOT .ring { fill: none; stroke: var(--c1); stroke-width: 1.2; stroke-linecap: round; opacity: .9 }
    ROOT .orb { transform-origin: 50px 50px; animation: K_orbit var(--d) linear infinite }
    ROOT .o1 { animation-duration: calc(var(--d) / 3); animation-delay: calc(var(--d) * -.1) }
    ROOT .o2 { animation-duration: calc(var(--d) / 2); animation-delay: calc(var(--d) * -.3) }
    ROOT .o3 { animation-delay: calc(var(--d) * -.62) }
    ROOT .luna { transform-origin: 50px 25px; animation: K_orbit calc(var(--d) / 4) linear infinite }
    @keyframes K_orbit { to { transform: rotate(-360deg) } }
    @keyframes K_pulse { 0%, 100% { transform: scale(.9); opacity: .8 } 50% { transform: scale(1.15); opacity: 1 } }
    @keyframes K_beat { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.06) } }
    @keyframes K_tw { 0%, 100% { opacity: .25; transform: scale(.5) } 50% { opacity: 1; transform: scale(1) } }`,
  },
  {
    slug: "spinning-sun",
    name: "Spinning Sun",
    category: "nature",
    description:
      "A golden sun turns slowly inside its own warm glow while alternating rays stretch and shrink, like a lazy summer afternoon in loader form.",
    details:
      "Bright and instantly cheerful, this sun works anywhere you want a wait to feel sunny instead of stalled. Twelve rays rotate at an unhurried pace while every other ray pulses in length, a dotted halo drifts the opposite way, and the core breathes inside a soft glow. It suits weather apps, summer sales, solar energy brands, travel bookings, and morning-routine or wellness tools, and it can spin in either direction. Sun sets the glowing core and halo, Rays colors the beams, and the stroke control makes them as delicate or as bold as your layout needs.",
    tags: ["sun", "rays", "spin", "summer", "warm", "glow"],
    kind: "spinner",
    colors: { primary: "#fcd34d", secondary: "#fb923c" },
    colorLabels: { primary: "Sun", secondary: "Rays" },
    duration: 3,
    stroke: 4.5,
    direction: true,
    popularity: 80,
    svg: `
    <defs>
      <radialGradient id="spinning-sun-glow"><stop offset=".3" class="ga"/><stop offset="1" class="gb"/></radialGradient>
      <radialGradient id="spinning-sun-disk" cx=".42" cy=".38" r=".7"><stop offset=".5" class="da"/><stop offset="1" class="db"/></radialGradient>
    </defs>
    <circle class="glow" cx="50" cy="50" r="38" fill="url(#spinning-sun-glow)"/>
    <g class="spin">
      <g><path class="ray" d="M50 28V16"/></g>
      <g transform="rotate(30 50 50)"><path class="ray alt" d="M50 28V16"/></g>
      <g transform="rotate(60 50 50)"><path class="ray" d="M50 28V16"/></g>
      <g transform="rotate(90 50 50)"><path class="ray alt" d="M50 28V16"/></g>
      <g transform="rotate(120 50 50)"><path class="ray" d="M50 28V16"/></g>
      <g transform="rotate(150 50 50)"><path class="ray alt" d="M50 28V16"/></g>
      <g transform="rotate(180 50 50)"><path class="ray" d="M50 28V16"/></g>
      <g transform="rotate(210 50 50)"><path class="ray alt" d="M50 28V16"/></g>
      <g transform="rotate(240 50 50)"><path class="ray" d="M50 28V16"/></g>
      <g transform="rotate(270 50 50)"><path class="ray alt" d="M50 28V16"/></g>
      <g transform="rotate(300 50 50)"><path class="ray" d="M50 28V16"/></g>
      <g transform="rotate(330 50 50)"><path class="ray alt" d="M50 28V16"/></g>
    </g>
    <circle class="halo" cx="50" cy="50" r="19.5"/>
    <g class="core">
      <circle cx="50" cy="50" r="15" fill="url(#spinning-sun-disk)"/>
      <circle class="shine" cx="45" cy="44.5" r="4"/>
    </g>`,
    css: `
    ROOT .ga { stop-color: var(--c1); stop-opacity: .55 }
    ROOT .gb { stop-color: var(--c1); stop-opacity: 0 }
    ROOT .da { stop-color: var(--c1) }
    ROOT .db { stop-color: var(--c2) }
    ROOT .glow { transform-origin: 50px 50px; animation: K_glow var(--d) ease-in-out infinite }
    ROOT .spin { transform-origin: 50px 50px; animation: K_spin var(--d) linear infinite }
    ROOT .ray { fill: none; stroke: var(--c2); stroke-width: var(--sw); stroke-linecap: round; transform-origin: 50px 28px; animation: K_ray var(--d) cubic-bezier(.45,0,.55,1) infinite }
    ROOT .alt { opacity: .8; animation-delay: calc(var(--d) * -.5) }
    ROOT .halo { fill: none; stroke: var(--c2); stroke-opacity: .55; stroke-width: 1.2; stroke-linecap: round; stroke-dasharray: 1.6 3.5; transform-origin: 50px 50px; animation: K_rev calc(var(--d) * 2) linear infinite }
    ROOT .core { transform-origin: 50px 50px; animation: K_beat calc(var(--d) / 2) ease-in-out infinite }
    ROOT .shine { fill: #fff; opacity: .4 }
    @keyframes K_spin { to { transform: rotate(60deg) } }
    @keyframes K_ray { 0%, 100% { transform: scaleY(1) } 50% { transform: scaleY(.45) } }
    @keyframes K_rev { to { transform: rotate(-360deg) } }
    @keyframes K_beat { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.05) } }
    @keyframes K_glow { 0%, 100% { transform: scale(.9); opacity: .75 } 50% { transform: scale(1.06); opacity: 1 } }`,
  },
  {
    slug: "falling-snow",
    name: "Falling Snow",
    category: "nature",
    description:
      "Snowflakes of every size drift down through a deep blue winter sky, swaying as they fall and settling softly into the frosty drifts below.",
    details:
      "Quiet and cozy, this scene turns a loading state into a little snow-globe moment. Larger crystals tumble down faster in the foreground while smaller flakes float slowly behind them, each with its own gentle sway, and a pair of frosted pines stands on the far snowbank. It is a natural fit for holiday campaigns, ski resorts and winter travel, hot drinks and knitwear shops, and seasonal newsletters. Winter sky sets the backdrop, Snow colors the flakes and the front drift, and Frost tints the distant trees, the far snowbank, and the glow along the horizon.",
    tags: ["snow", "winter", "snowflakes", "falling", "cozy", "holiday"],
    kind: "particles",
    colors: { primary: "#1e40af", secondary: "#ffffff", accent: "#7dd3fc" },
    colorLabels: { primary: "Winter sky", secondary: "Snow", accent: "Frost" },
    duration: 3,
    popularity: 79,
    svg: `
    <defs>
      <clipPath id="falling-snow-clip"><circle cx="50" cy="50" r="40"/></clipPath>
      <radialGradient id="falling-snow-frost" cx=".5" cy=".9" r=".7"><stop offset="0" class="fa"/><stop offset="1" class="fb"/></radialGradient>
    </defs>
    <circle class="sky" cx="50" cy="50" r="40"/>
    <circle cx="50" cy="50" r="40" fill="url(#falling-snow-frost)"/>
    <g clip-path="url(#falling-snow-clip)">
      <path class="pines" d="M29 50L35.5 59.5H32.5L37.5 67.5H20.5L25.5 59.5H22.5ZM72 52L76.8 59H74.6L78.4 65H65.6L69.4 59H67.2Z"/>
      <path class="bank" d="M8 92V69Q24 61 40 66Q58 70 72 62Q84 56 92 61V92Z"/>
      <g class="drift"><g class="sway"><path class="crystal" d="M30 12.4V19.6M26.88 14.2L33.12 17.8M26.88 17.8L33.12 14.2"/></g></g>
      <g class="drift d2"><g class="sway w2"><path class="crystal" d="M64 14.8V21.2M61.23 16.4L66.77 19.6M61.23 19.6L66.77 16.4"/></g></g>
      <g class="drift slow d3"><g class="sway w3"><path class="crystal" d="M47 11.2V16.8M44.58 12.6L49.42 15.4M44.58 15.4L49.42 12.6"/></g></g>
      <g class="drift slow d4"><g class="sway w4"><circle class="flake" cx="40" cy="14" r="1.6"/></g></g>
      <g class="drift slow d5"><g class="sway w5"><circle class="flake" cx="74" cy="24" r="1.3"/></g></g>
      <g class="drift slow d6"><g class="sway w6"><circle class="flake" cx="27" cy="22" r="1.1"/></g></g>
      <g class="drift slow d7"><g class="sway"><circle class="flake" cx="57" cy="14" r="1.8"/></g></g>
      <g class="drift slow d8"><g class="sway w2"><circle class="flake" cx="68" cy="16" r="1"/></g></g>
      <path class="front" d="M8 92V77Q22 69 38 74Q52 78 64 71Q78 64 92 71V92Z"/>
    </g>
    <circle class="rim" cx="50" cy="50" r="40"/>`,
    css: `
    ROOT .sky { fill: var(--c1) }
    ROOT .fa { stop-color: var(--c3); stop-opacity: .45 }
    ROOT .fb { stop-color: var(--c3); stop-opacity: 0 }
    ROOT .pines { fill: var(--c3); opacity: .7 }
    ROOT .bank { fill: var(--c3); opacity: .55 }
    ROOT .front { fill: var(--c2) }
    ROOT .rim { fill: none; stroke: var(--c3); stroke-opacity: .55; stroke-width: 1.2 }
    ROOT .crystal { fill: none; stroke: var(--c2); stroke-width: 1.2; stroke-linecap: round; transform-box: fill-box; transform-origin: center; animation: K_turn var(--d) linear infinite }
    ROOT .flake { fill: var(--c2) }
    ROOT .drift { animation: K_fall var(--d) linear infinite }
    ROOT .slow { animation-duration: calc(var(--d) * 2) }
    ROOT .d2 { animation-delay: calc(var(--d) * -.5) }
    ROOT .d3 { animation-delay: calc(var(--d) * -1.3) }
    ROOT .d4 { animation-delay: calc(var(--d) * -.3) }
    ROOT .d5 { animation-delay: calc(var(--d) * -1) }
    ROOT .d6 { animation-delay: calc(var(--d) * -1.6) }
    ROOT .d7 { animation-delay: calc(var(--d) * -.75) }
    ROOT .d8 { animation-delay: calc(var(--d) * -1.85) }
    ROOT .sway { animation: K_sway var(--d) cubic-bezier(.45,0,.55,1) infinite }
    ROOT .w2 { animation-delay: calc(var(--d) * -.4) }
    ROOT .w3 { animation-delay: calc(var(--d) * -.7) }
    ROOT .w4 { animation-delay: calc(var(--d) * -.2) }
    ROOT .w5 { animation-delay: calc(var(--d) * -.55) }
    ROOT .w6 { animation-delay: calc(var(--d) * -.85) }
    @keyframes K_fall { 0% { transform: translateY(0); opacity: 0 } 12%, 82% { opacity: 1 } 100% { transform: translateY(60px); opacity: 0 } }
    @keyframes K_sway { 0%, 100% { transform: translateX(-3px) } 50% { transform: translateX(3px) } }
    @keyframes K_turn { to { transform: rotate(60deg) } }`,
  },
];

export default nature;

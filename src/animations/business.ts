import type { AnimationSource } from "@/types/animation";

/**
 * Business & E-commerce: friendly flat illustrations for stores, checkout,
 * billing, dashboards and logistics. Rounded geometry, mostly solid fills,
 * and neutral details (#94a3b8 family) that read on light and dark pages.
 */
const business: AnimationSource[] = [
  {
    slug: "shopping-cart",
    name: "Shopping Cart",
    category: "business",
    description:
      "A little shopping cart rocks on spinning wheels while a box, an orange and a carton drop into the basket one after another.",
    details:
      "Groceries tumble into the basket in turn, each landing with a small bounce that nudges the whole cart, before the load lifts away and the shopping starts over. It is an easy fit for add-to-cart feedback, cart drawers that are still syncing, checkout pages, and grocery or marketplace apps waiting on inventory. Cart colors the frame, basket and wheels, Boxes paints the packaged goods and the handle grip, and Fruit tints the round item. Keep Cart the darkest of the three so the dropped items pop against the basket.",
    tags: ["cart", "shopping", "ecommerce", "checkout", "bounce", "groceries"],
    kind: "bounce",
    colors: { primary: "#4f46e5", secondary: "#10b981", accent: "#f59e0b" },
    colorLabels: { primary: "Cart", secondary: "Boxes", accent: "Fruit" },
    duration: 1.8,
    popularity: 87,
    svg: `
      <line class="road" x1="10" y1="89" x2="90" y2="89"/>
      <g class="cart">
        <g class="load">
          <g class="item it-a"><rect class="goods" x="29" y="22" width="18" height="24" rx="3"/><rect class="band" x="29" y="29" width="18" height="4"/></g>
          <g class="item it-b"><circle class="fruit" cx="57" cy="32" r="9"/><path class="leaf" d="M57 23.5c.6-3.6 3.4-5.2 6.6-4.4c-.8 3.2-3.4 5-6.6 4.4z"/></g>
          <g class="item it-c"><rect class="goods" x="67" y="27" width="14" height="19" rx="3"/><rect class="band" x="72.5" y="27" width="3" height="19"/></g>
          <path class="basket" d="M21.5 36H88L82.2 59.5Q81.5 62 79 62H27.4Z"/>
          <path class="slats" d="M37 40.5v17M49 40.5v17M61 40.5v17M73 40.5v17M26.5 49H83"/>
          <path class="frame" d="M8 25H16.5Q18.6 25 19.1 27L29.4 70.3Q29.9 72.5 32.2 72.5H80"/>
          <path class="grip" d="M7 25h5"/>
        </g>
        <g class="wheel"><circle class="tire" cx="36" cy="80" r="5.5"/><path class="spokes" d="M36 77v6M33 80h6"/></g>
        <g class="wheel"><circle class="tire" cx="73" cy="80" r="5.5"/><path class="spokes" d="M73 77v6M70 80h6"/></g>
      </g>`,
    css: `
      ROOT .road { fill: none; stroke: #94a3b8; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 7px 6px;
        animation: K_road calc(var(--d) / 2) linear infinite }
      ROOT .cart { transform-origin: 54px 88px; animation: K_rock calc(var(--d) / 2) ease-in-out infinite }
      ROOT .load { animation: K_bump var(--d) ease-in-out infinite }
      ROOT .goods { fill: var(--c2) }
      ROOT .band { fill: #fff; opacity: .45 }
      ROOT .fruit { fill: var(--c3) }
      ROOT .leaf { fill: var(--c2) }
      ROOT .item { opacity: 0 }
      ROOT .it-a { animation: K_dropA var(--d) linear infinite }
      ROOT .it-b { animation: K_dropB var(--d) linear infinite }
      ROOT .it-c { animation: K_dropC var(--d) linear infinite }
      ROOT .load, ROOT .item { animation-delay: calc(var(--d) * -0.25) }
      ROOT .basket { fill: var(--c1) }
      ROOT .slats { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .3 }
      ROOT .frame { fill: none; stroke: var(--c1); stroke-width: 4.5; stroke-linecap: round; stroke-linejoin: round }
      ROOT .grip { fill: none; stroke: var(--c2); stroke-width: 6; stroke-linecap: round }
      ROOT .tire { fill: #fff; stroke: var(--c1); stroke-width: 3.5 }
      ROOT .spokes { fill: none; stroke: var(--c1); stroke-width: 2; stroke-linecap: round }
      ROOT .wheel { transform-box: fill-box; transform-origin: center; animation: K_spin calc(var(--d) / 2) linear infinite }
      @keyframes K_road { to { stroke-dashoffset: 13px } }
      @keyframes K_rock { 0%, 100% { transform: rotate(-1.2deg) } 50% { transform: rotate(1.2deg) } }
      @keyframes K_bump {
        0%, 13%, 21%, 33%, 41%, 53%, 61%, 100% { transform: translateY(0px) }
        16%, 36%, 56% { transform: translateY(1.8px) }
      }
      @keyframes K_spin { to { transform: rotate(360deg) } }
      @keyframes K_dropA {
        0% { transform: translateY(-18px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .5) }
        4% { opacity: 1 }
        13% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        17% { transform: translateY(-3.5px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        21%, 84% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.4, 0, .6, 1) }
        92% { transform: translateY(-8px); opacity: 0 }
        100% { transform: translateY(-18px); opacity: 0 }
      }
      @keyframes K_dropB {
        0%, 20% { transform: translateY(-18px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .5) }
        24% { opacity: 1 }
        33% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        37% { transform: translateY(-3.5px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        41%, 84% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.4, 0, .6, 1) }
        92% { transform: translateY(-8px); opacity: 0 }
        100% { transform: translateY(-18px); opacity: 0 }
      }
      @keyframes K_dropC {
        0%, 40% { transform: translateY(-18px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .5) }
        44% { opacity: 1 }
        53% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        57% { transform: translateY(-3.5px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        61%, 84% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.4, 0, .6, 1) }
        92% { transform: translateY(-8px); opacity: 0 }
        100% { transform: translateY(-18px); opacity: 0 }
      }`,
  },
  {
    slug: "card-payment",
    name: "Card Payment",
    category: "business",
    description:
      "A card slides down into a payment terminal, contactless waves ripple while it processes, and a check mark draws itself on the screen.",
    details:
      "The loop walks through a complete transaction in a couple of seconds: insert, a short processing pulse, approval, then the card rises back out. Because it tells such a clear story, it works well on checkout submit buttons, subscription upgrade dialogs, invoice payment pages and point-of-sale dashboards. Terminal sets the reader body, Card & signal colors the card and the contactless waves, and Approved drives the check mark, the screen glow and the confirm key. A green Approved next to a neutral or brand-colored Terminal reads as success at a glance.",
    tags: ["payment", "card", "checkout", "terminal", "contactless", "fintech"],
    kind: "progress",
    colors: { primary: "#4f46e5", secondary: "#0ea5e9", accent: "#10b981" },
    colorLabels: { primary: "Terminal", secondary: "Card & signal", accent: "Approved" },
    duration: 2.4,
    popularity: 88,
    svg: `
      <g class="card">
        <rect class="plastic" x="26.5" y="6" width="29" height="19" rx="3"/>
        <rect class="chip" x="30" y="10" width="6.5" height="5" rx="1.2"/>
        <path class="digits" d="M31 20.5h12M46.5 20.5h5"/>
      </g>
      <g class="term">
        <rect class="body" x="19" y="36" width="44" height="54" rx="8"/>
        <rect class="body" x="23" y="32" width="36" height="8" rx="4"/>
        <rect class="slot" x="26" y="34.6" width="30" height="2.2" rx="1.1"/>
        <rect class="screen" x="25" y="43" width="32" height="20" rx="3.5"/>
        <rect class="glow" x="25" y="43" width="32" height="20" rx="3.5"/>
        <g class="dots"><circle class="dot" cx="34" cy="53" r="2.2"/><circle class="dot dt2" cx="41" cy="53" r="2.2"/><circle class="dot dt3" cx="48" cy="53" r="2.2"/></g>
        <path class="tick" d="M34.5 53.5l4.5 4.5l9-9.5"/>
        <path class="keys" d="M27.5 71h4M39 71h4M50.5 71h4M27.5 79h4M39 79h4"/>
        <path class="ok" d="M50.5 79h4"/>
      </g>
      <path class="wave" d="M68.69 43.98A9 9 0 0 1 68.69 56.02"/>
      <path class="wave w2" d="M72.4 40.63A14 14 0 0 1 72.4 59.37"/>
      <path class="wave w3" d="M76.12 37.29A19 19 0 0 1 76.12 62.71"/>`,
    css: `
      ROOT .plastic { fill: var(--c2) }
      ROOT .chip { fill: #fde68a }
      ROOT .digits { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .75 }
      ROOT .card { animation: K_card var(--d) linear infinite }
      ROOT .term { animation: K_thunk var(--d) ease-in-out infinite }
      ROOT .body { fill: var(--c1) }
      ROOT .slot { fill: #0f172a; opacity: .45 }
      ROOT .screen { fill: #eef2ff }
      ROOT .glow { fill: var(--c3); opacity: 0; animation: K_glow var(--d) ease-in-out infinite }
      ROOT .dots { opacity: 0; animation: K_dotsOn var(--d) linear infinite }
      ROOT .dot { fill: var(--c1); transform-box: fill-box; transform-origin: center;
        animation: K_blip calc(var(--d) / 4) ease-in-out infinite }
      ROOT .dt2 { animation-delay: calc(var(--d) * -0.1667) }
      ROOT .dt3 { animation-delay: calc(var(--d) * -0.0833) }
      ROOT .tick { fill: none; stroke: var(--c3); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round;
        stroke-dasharray: 20px; stroke-dashoffset: 20px; animation: K_tick var(--d) linear infinite }
      ROOT .keys { fill: none; stroke: #fff; stroke-width: 4.5; stroke-linecap: round; opacity: .35 }
      ROOT .ok { fill: none; stroke: var(--c3); stroke-width: 4.5; stroke-linecap: round }
      ROOT .wave { fill: none; stroke: var(--c2); stroke-width: 3.5; stroke-linecap: round; opacity: .18;
        animation: K_wave var(--d) ease-in-out infinite }
      ROOT .card, ROOT .term, ROOT .glow, ROOT .dots, ROOT .tick, ROOT .wave { animation-delay: calc(var(--d) * -0.2) }
      ROOT .wave.w2 { animation-delay: calc(var(--d) * -1.16) }
      ROOT .wave.w3 { animation-delay: calc(var(--d) * -1.12) }
      @keyframes K_card {
        0% { transform: translateY(-4px); opacity: 0; animation-timing-function: cubic-bezier(.2, .7, .4, 1) }
        7% { transform: translateY(0px); opacity: 1 }
        11% { transform: translateY(0px); animation-timing-function: cubic-bezier(.6, 0, .3, 1) }
        25% { transform: translateY(16px) }
        76% { transform: translateY(16px); animation-timing-function: cubic-bezier(.5, 0, .3, 1) }
        88% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .8, .5) }
        96%, 100% { transform: translateY(-4px); opacity: 0 }
      }
      @keyframes K_thunk { 0%, 23%, 31%, 100% { transform: translateY(0px) } 26% { transform: translateY(1.2px) } }
      @keyframes K_glow { 0%, 58% { opacity: 0 } 64%, 84% { opacity: .22 } 92%, 100% { opacity: 0 } }
      @keyframes K_dotsOn { 0%, 25% { opacity: 0 } 29%, 52% { opacity: 1 } 56%, 100% { opacity: 0 } }
      @keyframes K_blip { 0%, 100% { transform: scale(.6); opacity: .4 } 50% { transform: scale(1.1); opacity: 1 } }
      @keyframes K_tick {
        0%, 57% { stroke-dashoffset: 20px; opacity: 1; animation-timing-function: cubic-bezier(.4, 0, .2, 1) }
        67%, 86% { stroke-dashoffset: 0px; opacity: 1 }
        93% { stroke-dashoffset: 0px; opacity: 0 }
        94% { stroke-dashoffset: 20px; opacity: 0 }
        96%, 100% { stroke-dashoffset: 20px; opacity: 1 }
      }
      @keyframes K_wave {
        0%, 27% { opacity: .18 }
        32% { opacity: 1 }
        39% { opacity: .2 }
        44% { opacity: 1 }
        52%, 100% { opacity: .18 }
      }`,
  },
  {
    slug: "growth-chart",
    name: "Growth Chart",
    category: "business",
    description:
      "Four bars rise one after another, then a trend line traces across their tops and finishes with an upward arrow.",
    details:
      "Bars spring up with a slight overshoot, the line follows with its arrowhead riding the tip, and once the picture is complete everything settles back down for the next round. It is a natural loading state for analytics dashboards, revenue reports, investor updates and any SaaS screen crunching numbers before it shows a chart. Bars sets the columns, which step up in strength from left to right, and Trend line colors the line, its markers and the arrow. A calm blue or indigo for Bars with a vivid green Trend line keeps the upward message obvious.",
    tags: ["chart", "analytics", "growth", "bars", "dashboard", "data"],
    kind: "progress",
    colors: { primary: "#4f46e5", secondary: "#10b981" },
    colorLabels: { primary: "Bars", secondary: "Trend line" },
    duration: 2.6,
    popularity: 85,
    svg: `
      <path class="guides" d="M21 61H86M21 38H86"/>
      <path class="axis" d="M14 14V84H88"/>
      <rect class="bar b1" x="22" y="68" width="11" height="14" rx="2.5"/>
      <rect class="bar b2" x="38" y="60" width="11" height="22" rx="2.5"/>
      <rect class="bar b3" x="54" y="52" width="11" height="30" rx="2.5"/>
      <rect class="bar b4" x="70" y="38" width="11" height="44" rx="2.5"/>
      <g class="trend">
        <path class="line" d="M19 60L37 46L53 51L83 19"/>
        <circle class="mark" cx="19" cy="60" r="3"/>
        <circle class="mark m2" cx="37" cy="46" r="3"/>
        <circle class="mark m3" cx="53" cy="51" r="3"/>
        <g class="tipgo"><path class="tip" d="M-2.5 -6L6.5 0L-2.5 6Z"/></g>
      </g>`,
    css: `
      ROOT .guides { fill: none; stroke: #94a3b8; stroke-width: 1.5; stroke-dasharray: 2px 3px; opacity: .45 }
      ROOT .axis { fill: none; stroke: #94a3b8; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round }
      ROOT .bar { fill: var(--c1); transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(.06) }
      ROOT .b1 { opacity: .55; animation: K_g1 var(--d) linear infinite }
      ROOT .b2 { opacity: .7; animation: K_g2 var(--d) linear infinite }
      ROOT .b3 { opacity: .85; animation: K_g3 var(--d) linear infinite }
      ROOT .b4 { animation: K_g4 var(--d) linear infinite }
      ROOT .trend { animation: K_fade var(--d) linear infinite }
      ROOT .line { fill: none; stroke: var(--c2); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round;
        stroke-dasharray: 84px; stroke-dashoffset: 84px; animation: K_draw var(--d) linear infinite }
      ROOT .mark { fill: #fff; stroke: var(--c2); stroke-width: 2.2; transform-box: fill-box; transform-origin: center;
        transform: scale(0); animation: K_mark var(--d) linear infinite }
      ROOT .tipgo { animation: K_tipgo var(--d) linear infinite }
      ROOT .tip { fill: var(--c2); stroke: var(--c2); stroke-width: 1.6; stroke-linejoin: round;
        transform-box: fill-box; transform-origin: center; animation: K_pop var(--d) ease-in-out infinite }
      ROOT .bar, ROOT .trend, ROOT .line, ROOT .mark, ROOT .tipgo, ROOT .tip { animation-delay: calc(var(--d) * -0.2) }
      ROOT .mark.m2 { animation-delay: calc(var(--d) * -1.1235) }
      ROOT .mark.m3 { animation-delay: calc(var(--d) * -1.0672) }
      @keyframes K_g1 {
        0%, 4% { transform: scaleY(.06); animation-timing-function: cubic-bezier(.3, 0, .3, 1) }
        16% { transform: scaleY(1.08); animation-timing-function: ease-in-out }
        20% { transform: scaleY(.97) }
        23%, 86% { transform: scaleY(1); animation-timing-function: cubic-bezier(.6, 0, .4, 1) }
        95%, 100% { transform: scaleY(.06) }
      }
      @keyframes K_g2 {
        0%, 12% { transform: scaleY(.06); animation-timing-function: cubic-bezier(.3, 0, .3, 1) }
        24% { transform: scaleY(1.08); animation-timing-function: ease-in-out }
        28% { transform: scaleY(.97) }
        31%, 87% { transform: scaleY(1); animation-timing-function: cubic-bezier(.6, 0, .4, 1) }
        96%, 100% { transform: scaleY(.06) }
      }
      @keyframes K_g3 {
        0%, 20% { transform: scaleY(.06); animation-timing-function: cubic-bezier(.3, 0, .3, 1) }
        32% { transform: scaleY(1.08); animation-timing-function: ease-in-out }
        36% { transform: scaleY(.97) }
        39%, 88% { transform: scaleY(1); animation-timing-function: cubic-bezier(.6, 0, .4, 1) }
        97%, 100% { transform: scaleY(.06) }
      }
      @keyframes K_g4 {
        0%, 28% { transform: scaleY(.06); animation-timing-function: cubic-bezier(.3, 0, .3, 1) }
        40% { transform: scaleY(1.08); animation-timing-function: ease-in-out }
        44% { transform: scaleY(.97) }
        47%, 89% { transform: scaleY(1); animation-timing-function: cubic-bezier(.6, 0, .4, 1) }
        98%, 100% { transform: scaleY(.06) }
      }
      @keyframes K_fade { 0%, 84% { opacity: 1 } 92%, 100% { opacity: 0 } }
      @keyframes K_draw { 0%, 40% { stroke-dashoffset: 84px } 68%, 93% { stroke-dashoffset: 0px } 96%, 100% { stroke-dashoffset: 84px } }
      @keyframes K_mark {
        0%, 39% { transform: scale(0) }
        42% { transform: scale(1.35) }
        45%, 84% { transform: scale(1) }
        86.5%, 100% { transform: scale(0) }
      }
      @keyframes K_tipgo {
        0%, 38% { transform: translate(19px, 60px) rotate(-37.9deg); opacity: 0 }
        40% { transform: translate(19px, 60px) rotate(-37.9deg); opacity: 1 }
        47% { transform: translate(35.46px, 47.2px) rotate(-37.9deg) }
        48.3% { transform: translate(38.84px, 46.58px) rotate(17.3deg) }
        52.6% { transform: translate(51.07px, 50.4px) rotate(17.3deg) }
        54% { transform: translate(54.47px, 49.43px) rotate(-46.8deg) }
        68%, 92% { transform: translate(83px, 19px) rotate(-46.8deg); opacity: 1 }
        96%, 100% { transform: translate(19px, 60px) rotate(-37.9deg); opacity: 0 }
      }
      @keyframes K_pop { 0%, 67% { transform: scale(1) } 72% { transform: scale(1.45) } 78%, 100% { transform: scale(1) } }`,
  },
  {
    slug: "coin-stack",
    name: "Coin Stack",
    category: "business",
    description:
      "Gold coins fall one at a time onto a growing stack, bouncing as they land, until a sparkle glints on top and the pile sinks away.",
    details:
      "Each coin drops with a little weight and a rebound, and the shadow underneath widens as the stack grows, so the whole thing feels physical without getting busy. Use it for wallet balances, payout and cashback screens, savings goals, pricing calculators or a rewards page tallying up points. Coin face colors the top of each coin, Coin edge paints the ridged rims and inner rings, and Sparkle tints the glints that appear once the stack is complete. Swap the golds for silver tones to suggest credits or tokens instead of cash.",
    tags: ["coins", "money", "stack", "finance", "bounce", "savings"],
    kind: "bounce",
    colors: { primary: "#fbbf24", secondary: "#d97706", accent: "#10b981" },
    colorLabels: { primary: "Coin face", secondary: "Coin edge", accent: "Sparkle" },
    duration: 2.8,
    popularity: 72,
    svg: `
      <ellipse class="shadow" cx="50" cy="89" rx="30" ry="3.5"/>
      <g class="coin n0"><path class="edge" d="M27 73v8.5a23 6.5 0 0 0 46 0v-8.5z"/><path class="ridge" d="M34 79.9v4M42 81.3v4M50 81.75v4M58 81.3v4M66 79.9v4"/><ellipse class="face" cx="50" cy="73" rx="23" ry="6.5"/><ellipse class="rim" cx="50" cy="73" rx="15" ry="4"/></g>
      <g class="coin n1"><path class="edge" d="M27 64.5v8.5a23 6.5 0 0 0 46 0v-8.5z"/><path class="ridge" d="M34 71.4v4M42 72.8v4M50 73.25v4M58 72.8v4M66 71.4v4"/><ellipse class="face" cx="50" cy="64.5" rx="23" ry="6.5"/><ellipse class="rim" cx="50" cy="64.5" rx="15" ry="4"/></g>
      <g class="coin n2"><path class="edge" d="M27 56v8.5a23 6.5 0 0 0 46 0v-8.5z"/><path class="ridge" d="M34 62.9v4M42 64.3v4M50 64.75v4M58 64.3v4M66 62.9v4"/><ellipse class="face" cx="50" cy="56" rx="23" ry="6.5"/><ellipse class="rim" cx="50" cy="56" rx="15" ry="4"/></g>
      <g class="coin n3"><path class="edge" d="M27 47.5v8.5a23 6.5 0 0 0 46 0v-8.5z"/><path class="ridge" d="M34 54.4v4M42 55.8v4M50 56.25v4M58 55.8v4M66 54.4v4"/><ellipse class="face" cx="50" cy="47.5" rx="23" ry="6.5"/><ellipse class="rim" cx="50" cy="47.5" rx="15" ry="4"/></g>
      <g transform="translate(68 41)"><path class="spark" d="M0-7C.8-1.8 1.8-.8 7 0C1.8.8.8 1.8 0 7C-.8 1.8-1.8.8-7 0C-1.8-.8-.8-1.8 0-7Z"/></g>
      <g transform="translate(33 36) scale(.7)"><path class="spark sp2" d="M0-7C.8-1.8 1.8-.8 7 0C1.8.8.8 1.8 0 7C-.8 1.8-1.8.8-7 0C-1.8-.8-.8-1.8 0-7Z"/></g>`,
    css: `
      ROOT .shadow { fill: #94a3b8; opacity: .35; transform-box: fill-box; transform-origin: center;
        animation: K_shadow var(--d) ease-in-out infinite }
      ROOT .edge { fill: var(--c2) }
      ROOT .ridge { fill: none; stroke: var(--c1); stroke-width: 1.6; stroke-linecap: round; opacity: .55 }
      ROOT .face { fill: var(--c1) }
      ROOT .rim { fill: none; stroke: var(--c2); stroke-width: 1.6; opacity: .6 }
      ROOT .coin { opacity: 0 }
      ROOT .n0 { animation: K_n0 var(--d) linear infinite }
      ROOT .n1 { animation: K_n1 var(--d) linear infinite }
      ROOT .n2 { animation: K_n2 var(--d) linear infinite }
      ROOT .n3 { animation: K_n3 var(--d) linear infinite }
      ROOT .spark { fill: var(--c3); transform-box: fill-box; transform-origin: center; transform: scale(0);
        animation: K_spark var(--d) ease-out infinite }
      ROOT .shadow, ROOT .coin, ROOT .spark { animation-delay: calc(var(--d) * -0.3) }
      ROOT .spark.sp2 { animation-delay: calc(var(--d) * -1.25) }
      @keyframes K_n0 {
        0%, 2% { transform: translateY(-58.5px); opacity: 0; animation-timing-function: cubic-bezier(.55, 0, .9, .45) }
        4% { opacity: 1 }
        14% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        18% { transform: translateY(-4px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        22%, 88% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .7, .4) }
        96% { transform: translateY(5px); opacity: 0 }
        100% { transform: translateY(-58.5px); opacity: 0 }
      }
      @keyframes K_n1 {
        0%, 18% { transform: translateY(-50px); opacity: 0; animation-timing-function: cubic-bezier(.55, 0, .9, .45) }
        20% { opacity: 1 }
        30% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        34% { transform: translateY(-4px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        38%, 88% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .7, .4) }
        96% { transform: translateY(5px); opacity: 0 }
        100% { transform: translateY(-50px); opacity: 0 }
      }
      @keyframes K_n2 {
        0%, 34% { transform: translateY(-41.5px); opacity: 0; animation-timing-function: cubic-bezier(.55, 0, .9, .45) }
        36% { opacity: 1 }
        46% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        50% { transform: translateY(-4px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        54%, 88% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .7, .4) }
        96% { transform: translateY(5px); opacity: 0 }
        100% { transform: translateY(-41.5px); opacity: 0 }
      }
      @keyframes K_n3 {
        0%, 50% { transform: translateY(-33px); opacity: 0; animation-timing-function: cubic-bezier(.55, 0, .9, .45) }
        52% { opacity: 1 }
        62% { transform: translateY(0px); animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        66% { transform: translateY(-4px); animation-timing-function: cubic-bezier(.6, 0, .8, .4) }
        70%, 88% { transform: translateY(0px); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .7, .4) }
        96% { transform: translateY(5px); opacity: 0 }
        100% { transform: translateY(-33px); opacity: 0 }
      }
      @keyframes K_shadow {
        0%, 2% { transform: scale(.45, 1); opacity: .15 }
        14%, 18% { transform: scale(.7, 1); opacity: .25 }
        30%, 34% { transform: scale(.8, 1); opacity: .3 }
        46%, 50% { transform: scale(.9, 1); opacity: .33 }
        62%, 88% { transform: scale(1, 1); opacity: .38 }
        96%, 100% { transform: scale(.45, 1); opacity: .15 }
      }
      @keyframes K_spark {
        0%, 70% { transform: scale(0) rotate(0deg) }
        76% { transform: scale(1.15) rotate(45deg) }
        84%, 100% { transform: scale(0) rotate(90deg) }
      }`,
  },
  {
    slug: "delivery-truck",
    name: "Delivery Truck",
    category: "business",
    description:
      "A delivery van bounces along on spinning wheels as road dashes stream past underneath and speed lines trail off the back.",
    details:
      "The van never leaves the frame, yet the moving road, quick wheel spin and gentle suspension bounce make it feel like it is making good time. It belongs on order tracking pages, shipping estimate widgets, dispatch dashboards and the step after checkout where customers wait for a delivery confirmation. Cargo box colors the body, Cab sets the front of the van, and Logo paints the parcel badge on the side, so you can match it to your own fleet livery in a few clicks.",
    tags: ["delivery", "truck", "shipping", "logistics", "driving", "van"],
    kind: "bounce",
    colors: { primary: "#0ea5e9", secondary: "#4f46e5", accent: "#f59e0b" },
    colorLabels: { primary: "Cargo box", secondary: "Cab", accent: "Logo" },
    duration: 1.6,
    popularity: 82,
    svg: `
      <path class="speed" d="M8 34h8"/>
      <path class="speed sp2" d="M6 44h10"/>
      <path class="speed sp3" d="M9 54h7"/>
      <line class="road" x1="6" y1="80" x2="94" y2="80"/>
      <g class="van">
        <rect class="cargo" x="16" y="24" width="48" height="40" rx="5"/>
        <rect class="logo" x="31" y="35" width="18" height="16" rx="2.5"/>
        <rect class="seal" x="38.5" y="35" width="3" height="16"/>
        <path class="cab" d="M62 34H75.5Q79.5 34 81.6 37.4L88 48Q89 49.8 89 52V60Q89 64 85 64H62Z"/>
        <path class="glass" d="M67 38.5H75Q77 38.5 78.2 40.3L82.4 47.5H67Z"/>
        <rect class="handle" x="67" y="51" width="5" height="1.8" rx=".9"/>
        <rect class="lamp" x="86" y="53" width="3.5" height="3.6" rx="1.2"/>
        <rect class="chassis" x="14" y="61" width="77" height="6" rx="3"/>
      </g>
      <g class="wheel"><circle class="tire" cx="32" cy="70" r="8"/><circle class="hub" cx="32" cy="70" r="4"/><path class="bolt" d="M32 67.2v5.6M29.2 70h5.6"/></g>
      <g class="wheel"><circle class="tire" cx="73" cy="70" r="8"/><circle class="hub" cx="73" cy="70" r="4"/><path class="bolt" d="M73 67.2v5.6M70.2 70h5.6"/></g>`,
    css: `
      ROOT .speed { fill: none; stroke: #94a3b8; stroke-width: 3; stroke-linecap: round; opacity: 0;
        animation: K_speed calc(var(--d) / 2) linear infinite }
      ROOT .sp2 { animation-delay: calc(var(--d) * -0.17) }
      ROOT .sp3 { animation-delay: calc(var(--d) * -0.33) }
      ROOT .road { fill: none; stroke: #94a3b8; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 10px 7px;
        animation: K_road calc(var(--d) / 2) linear infinite }
      ROOT .van { transform-origin: 52px 66px; animation: K_bounce calc(var(--d) / 2) ease-in-out infinite }
      ROOT .cargo { fill: var(--c1) }
      ROOT .logo { fill: var(--c3) }
      ROOT .seal { fill: #fff; opacity: .55 }
      ROOT .cab { fill: var(--c2) }
      ROOT .glass { fill: #e0f2fe }
      ROOT .handle { fill: #fff; opacity: .6 }
      ROOT .lamp { fill: #fde68a }
      ROOT .chassis { fill: #64748b }
      ROOT .tire { fill: #475569 }
      ROOT .hub { fill: #e2e8f0 }
      ROOT .bolt { fill: none; stroke: #475569; stroke-width: 1.6; stroke-linecap: round }
      ROOT .wheel { transform-box: fill-box; transform-origin: center; animation: K_spin calc(var(--d) / 4) linear infinite }
      @keyframes K_speed { 0% { transform: translateX(4px); opacity: 0 } 30% { opacity: .9 } 100% { transform: translateX(-2px); opacity: 0 } }
      @keyframes K_road { to { stroke-dashoffset: 17px } }
      @keyframes K_bounce {
        0%, 100% { transform: translateY(0px) rotate(0deg) }
        40% { transform: translateY(-2px) rotate(-.5deg) }
        70% { transform: translateY(-.5px) rotate(.2deg) }
      }
      @keyframes K_spin { to { transform: rotate(360deg) } }`,
  },
  {
    slug: "package-box",
    name: "Package Box",
    category: "business",
    description:
      "A taped cardboard box pops its flaps open, a wrapped parcel bobs up to peek out, then it ducks back inside as the lid shuts.",
    details:
      "A tiny squash before the flaps fly open and a thump when they close give the box a cheerful bit of personality. It suits order confirmation screens, fulfillment and warehouse tools, subscription box sites, and gift or unboxing moments in a store. Box colors the cardboard, Tape paints the seal and the ribbon, and Parcel sets the gift that pops out. A warm kraft tone for Box keeps it reading as cardboard even when the other two match your brand.",
    tags: ["box", "package", "parcel", "unboxing", "shipping", "gift"],
    kind: "morph",
    colors: { primary: "#e9a15b", secondary: "#4f46e5", accent: "#fb7185" },
    colorLabels: { primary: "Box", secondary: "Tape", accent: "Parcel" },
    duration: 2.6,
    popularity: 78,
    svg: `
      <ellipse class="shadow" cx="50" cy="88" rx="29" ry="3"/>
      <g class="box">
        <path class="hole" d="M24 50H76L70 42H30Z"/>
        <path class="hole-shade" d="M24 50H76L70 42H30Z"/>
        <g class="flap-b">
          <path class="flap" d="M30 42H70L73 46H27Z"/>
          <path class="tone" d="M30 42H70L73 46H27Z"/>
          <path class="tape" d="M47.6 42H52.4L52.6 46H47.4Z"/>
        </g>
        <g class="gift">
          <rect class="giftbox" x="39" y="52" width="22" height="16" rx="2.5"/>
          <path class="ribbon" d="M50 52v16M39 59h22"/>
          <path class="bow" d="M50 52c-2.5-4.5-8-5.5-8-2.2s4.5 3 8 2.2zM50 52c2.5-4.5 8-5.5 8-2.2s-4.5 3-8 2.2z"/>
        </g>
        <rect class="face" x="24" y="50" width="52" height="36" rx="2.5"/>
        <rect class="lip" x="24" y="50" width="52" height="3.5"/>
        <rect class="tape" x="47" y="50" width="6" height="11"/>
        <rect class="label" x="30" y="68" width="17" height="12" rx="1.5"/>
        <path class="text" d="M33.5 72.5h10M33.5 76h6"/>
        <path class="arrows" d="M62 80v-8m-2.5 2.5l2.5-2.5l2.5 2.5M68.5 80v-8m-2.5 2.5l2.5-2.5l2.5 2.5"/>
        <g class="flap-f">
          <path class="flap" d="M27 46H73L76 50H24Z"/>
          <path class="tone" d="M27 46H73L76 50H24Z"/>
          <path class="tape" d="M47.4 46H52.6L53 50H47Z"/>
        </g>
      </g>`,
    css: `
      ROOT .shadow { fill: #94a3b8; opacity: .3; transform-box: fill-box; transform-origin: center;
        animation: K_shadow var(--d) ease-in-out infinite }
      ROOT .box { transform-origin: 50px 86px; animation: K_box var(--d) ease-in-out infinite }
      ROOT .hole { fill: var(--c1) }
      ROOT .hole-shade { fill: #000; opacity: .4 }
      ROOT .giftbox { fill: var(--c3) }
      ROOT .ribbon { fill: none; stroke: var(--c2); stroke-width: 3 }
      ROOT .bow { fill: var(--c2) }
      ROOT .gift { transform-box: fill-box; transform-origin: 50% 100%; animation: K_gift var(--d) linear infinite }
      ROOT .face, ROOT .flap { fill: var(--c1) }
      ROOT .lip { fill: #000; opacity: .14 }
      ROOT .tone { fill: #fff; opacity: .2; animation: K_tone var(--d) linear infinite }
      ROOT .tape { fill: var(--c2) }
      ROOT .label { fill: #fff }
      ROOT .text { fill: none; stroke: #94a3b8; stroke-width: 1.8; stroke-linecap: round }
      ROOT .arrows { fill: none; stroke: #000; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; opacity: .28 }
      ROOT .flap-b { transform-origin: 50px 42px; animation: K_flapB var(--d) linear infinite }
      ROOT .flap-f { transform-origin: 50px 50px; animation: K_flapF var(--d) linear infinite }
      @keyframes K_box {
        0%, 3% { transform: scale(1, 1) }
        7% { transform: scale(1.05, .93) }
        11% { transform: scale(.98, 1.04) }
        15%, 79% { transform: scale(1, 1) }
        82% { transform: scale(1.05, .93) }
        87% { transform: scale(.99, 1.02) }
        91%, 100% { transform: scale(1, 1) }
      }
      @keyframes K_shadow {
        0%, 3% { transform: scale(1, 1) }
        7% { transform: scale(1.07, 1) }
        11% { transform: scale(.97, 1) }
        15%, 79% { transform: scale(1, 1) }
        82% { transform: scale(1.07, 1) }
        87% { transform: scale(.99, 1) }
        91%, 100% { transform: scale(1, 1) }
      }
      @keyframes K_flapB {
        0%, 9% { transform: scaleY(1); animation-timing-function: cubic-bezier(.3, 0, .3, 1) }
        21% { transform: scaleY(-2.9); animation-timing-function: ease-in-out }
        26% { transform: scaleY(-2.45); animation-timing-function: ease-in-out }
        30%, 64% { transform: scaleY(-2.6); animation-timing-function: cubic-bezier(.55, 0, .85, .4) }
        79% { transform: scaleY(1.15); animation-timing-function: ease-out }
        82% { transform: scaleY(.92) }
        85%, 100% { transform: scaleY(1) }
      }
      @keyframes K_flapF {
        0%, 9% { transform: scaleY(1); animation-timing-function: cubic-bezier(.3, 0, .3, 1) }
        21% { transform: scaleY(-3.1); animation-timing-function: ease-in-out }
        26% { transform: scaleY(-2.6); animation-timing-function: ease-in-out }
        30%, 64% { transform: scaleY(-2.8); animation-timing-function: cubic-bezier(.55, 0, .85, .4) }
        79% { transform: scaleY(1.15); animation-timing-function: ease-out }
        82% { transform: scaleY(.92) }
        85%, 100% { transform: scaleY(1) }
      }
      @keyframes K_tone {
        0%, 11% { fill: #fff; opacity: .2 }
        14%, 75% { fill: #000; opacity: .18 }
        78%, 100% { fill: #fff; opacity: .2 }
      }
      @keyframes K_gift {
        0%, 16% { transform: translateY(0px) rotate(0deg); animation-timing-function: cubic-bezier(.3, 1.45, .5, 1) }
        30% { transform: translateY(-24px) rotate(-5deg); animation-timing-function: ease-in-out }
        40% { transform: translateY(-21px) rotate(4deg); animation-timing-function: ease-in-out }
        50% { transform: translateY(-24px) rotate(-3deg); animation-timing-function: ease-in-out }
        58% { transform: translateY(-22px) rotate(0deg); animation-timing-function: cubic-bezier(.5, 0, .75, .35) }
        70%, 100% { transform: translateY(0px) rotate(0deg) }
      }`,
  },
  {
    slug: "pie-chart",
    name: "Pie Chart",
    category: "business",
    description:
      "Three slices sweep around a slowly turning donut chart in sequence, and the smallest one nudges outward once the ring is full.",
    details:
      "The segments fill like a report being assembled piece by piece, while the steady rotation keeps the chart alive during longer waits. It fits budget breakdowns, portfolio and allocation views, survey results, marketing attribution reports and any dashboard widget that loads in sections. Largest slice, Middle slice and Highlight slice each take their own color, and the stroke control sets the ring thickness, from a slim donut to an almost solid pie. Give Highlight slice the boldest hue, since it is the one that pops out.",
    tags: ["chart", "donut", "pie", "analytics", "segments", "report"],
    kind: "progress",
    colors: { primary: "#4f46e5", secondary: "#10b981", accent: "#f59e0b" },
    colorLabels: { primary: "Largest slice", secondary: "Middle slice", accent: "Highlight slice" },
    duration: 3,
    stroke: 12,
    popularity: 76,
    svg: `
      <circle class="track" cx="50" cy="50" r="30"/>
      <g class="spin">
        <g class="segs">
          <g transform="rotate(-90 50 50)">
            <circle class="seg sa" cx="50" cy="50" r="30"/>
            <circle class="seg sb" cx="50" cy="50" r="30"/>
          </g>
          <g class="pop"><g transform="rotate(-90 50 50)"><circle class="seg sc" cx="50" cy="50" r="30"/></g></g>
        </g>
      </g>`,
    css: `
      ROOT .track { fill: none; stroke: #94a3b8; stroke-width: var(--sw); opacity: .22 }
      ROOT .spin { transform-origin: 50px 50px; animation: K_spin calc(var(--d) * 4) linear infinite }
      ROOT .segs { transform-origin: 50px 50px; animation: K_reset var(--d) ease-in-out infinite }
      ROOT .seg { fill: none; stroke-width: var(--sw); stroke-dasharray: 0px 188.5px }
      ROOT .sa { stroke: var(--c1); animation: K_a var(--d) linear infinite }
      ROOT .sb { stroke: var(--c2); stroke-dashoffset: -79.17px; animation: K_b var(--d) linear infinite }
      ROOT .sc { stroke: var(--c3); stroke-dashoffset: -141.37px; animation: K_c var(--d) linear infinite }
      ROOT .pop { animation: K_pop var(--d) ease-in-out infinite }
      ROOT .segs, ROOT .seg, ROOT .pop { animation-delay: calc(var(--d) * -0.15) }
      @keyframes K_spin { to { transform: rotate(360deg) } }
      @keyframes K_reset { 0%, 82% { opacity: 1; transform: scale(1) } 94%, 100% { opacity: 0; transform: scale(1.08) } }
      @keyframes K_a {
        0%, 4% { stroke-dasharray: 0px 188.5px; animation-timing-function: cubic-bezier(.55, 0, .35, 1) }
        22%, 100% { stroke-dasharray: 76.2px 188.5px }
      }
      @keyframes K_b {
        0%, 22% { stroke-dasharray: 0px 188.5px; animation-timing-function: cubic-bezier(.55, 0, .35, 1) }
        38%, 100% { stroke-dasharray: 59.2px 188.5px }
      }
      @keyframes K_c {
        0%, 38% { stroke-dasharray: 0px 188.5px; animation-timing-function: cubic-bezier(.55, 0, .35, 1) }
        52%, 100% { stroke-dasharray: 44.1px 188.5px }
      }
      @keyframes K_pop {
        0%, 52% { transform: translate(0px, 0px) }
        58%, 76% { transform: translate(-3.5px, -3.5px) }
        82%, 100% { transform: translate(0px, 0px) }
      }`,
  },
  {
    slug: "receipt-print",
    name: "Receipt Print",
    category: "business",
    description:
      "A receipt printer feeds out a slip line by line, finishes with a bold total and a green light, then the paper tears away.",
    details:
      "The paper advances in short steps like a real thermal printer, so the rows appear one at a time before the slip is torn off and the next one starts. It is a good match for order placement, invoice generation, point-of-sale apps, expense tools and anywhere a transaction summary is on its way. Printer colors the machine and the store mark on the slip, Total & ready light marks the total and the light once the job is done, and Busy light shows the light color while paper is feeding.",
    tags: ["receipt", "printer", "invoice", "pos", "typing", "order"],
    kind: "typing",
    colors: { primary: "#4f46e5", secondary: "#10b981", accent: "#f59e0b" },
    colorLabels: { primary: "Printer", secondary: "Total & ready light", accent: "Busy light" },
    duration: 3.2,
    popularity: 66,
    svg: `
      <defs><clipPath id="receipt-print-clip"><rect x="8" y="37" width="84" height="57"/></clipPath></defs>
      <g clip-path="url(#receipt-print-clip)">
        <g class="tear">
          <path class="paper" d="M27 37l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2l2.3-2l2.3 2V84H27Z"/>
          <path class="edge" d="M27 81V84l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5l2.3 2.5l2.3-2.5V81"/>
          <rect class="logo" x="44" y="40" width="12" height="4" rx="2"/>
          <path class="entry r1" d="M33 50h20M62 50h5"/>
          <path class="entry r2" d="M33 56h16M62 56h5"/>
          <path class="entry r3" d="M33 62h22M62 62h5"/>
          <path class="sep" d="M33 68h34"/>
          <path class="total" d="M33 75h12M58 75h9"/>
        </g>
      </g>
      <path class="printer" d="M16 31Q16 25 22 25H25C27 17.5 37 12 50 12C63 12 73 17.5 75 25H78Q84 25 84 31V35Q84 40 79 40H21Q16 40 16 35Z"/>
      <path class="seam" d="M29 25C31.5 20 39.5 16.5 50 16.5C60.5 16.5 68.5 20 71 25"/>
      <circle class="button" cx="24" cy="31" r="2.4"/>
      <g class="blink"><circle class="led" cx="76" cy="31" r="2.6"/></g>
      <rect class="slot" x="23" y="34.5" width="54" height="3.5" rx="1.75"/>
      <path class="cutter" d="M27 38.2l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6l2.3 1.6l2.3-1.6"/>`,
    css: `
      ROOT .paper { fill: #fff; stroke: #94a3b8; stroke-width: 1.5; stroke-linejoin: round; transform-origin: 50px 37px;
        transform: scaleY(0); animation: K_grow var(--d) cubic-bezier(.4, 0, .2, 1) infinite }
      ROOT .edge { fill: #fff; stroke: #94a3b8; stroke-width: 1.5; stroke-linejoin: round;
        transform: translateY(-49.5px); animation: K_edge var(--d) cubic-bezier(.4, 0, .2, 1) infinite }
      ROOT .logo { fill: var(--c1); transform-box: fill-box; transform-origin: center; animation: K_p0 var(--d) ease-out infinite }
      ROOT .entry { fill: none; stroke: #94a3b8; stroke-width: 2.6; stroke-linecap: round; transform-box: fill-box; transform-origin: 0% 50% }
      ROOT .r1 { animation: K_p1 var(--d) ease-out infinite }
      ROOT .r2 { animation: K_p2 var(--d) ease-out infinite }
      ROOT .r3 { animation: K_p3 var(--d) ease-out infinite }
      ROOT .sep { fill: none; stroke: #cbd5e1; stroke-width: 1.5; stroke-dasharray: 2px 2.5px;
        transform-box: fill-box; transform-origin: 0% 50%; animation: K_p4 var(--d) ease-out infinite }
      ROOT .total { fill: none; stroke: var(--c2); stroke-width: 3.6; stroke-linecap: round;
        transform-box: fill-box; transform-origin: 0% 50%; animation: K_p5 var(--d) ease-out infinite }
      ROOT .tear { transform-origin: 50px 37px; animation: K_tear var(--d) ease-in-out infinite }
      ROOT .printer { fill: var(--c1) }
      ROOT .seam { fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; opacity: .3 }
      ROOT .button { fill: #fff; opacity: .4 }
      ROOT .cutter { fill: none; stroke: #94a3b8; stroke-width: 1.4; stroke-linejoin: round }
      ROOT .led { fill: var(--c3); animation: K_led var(--d) linear infinite }
      ROOT .blink { animation: K_blink var(--d) ease-in-out infinite }
      ROOT .slot { fill: #0f172a; opacity: .5 }
      ROOT .paper, ROOT .edge, ROOT .logo, ROOT .entry, ROOT .sep, ROOT .total, ROOT .tear, ROOT .led, ROOT .blink {
        animation-delay: calc(var(--d) * -0.06) }
      @keyframes K_grow {
        0%, 2% { transform: scaleY(0) }
        6%, 11% { transform: scaleY(.177) }
        15%, 20% { transform: scaleY(.355) }
        24%, 29% { transform: scaleY(.532) }
        33%, 38% { transform: scaleY(.709) }
        42%, 47% { transform: scaleY(.887) }
        51%, 88% { transform: scaleY(1) }
        91%, 100% { transform: scaleY(0) }
      }
      @keyframes K_edge {
        0%, 2% { transform: translateY(-49.5px) }
        6%, 11% { transform: translateY(-38.7px) }
        15%, 20% { transform: translateY(-30.3px) }
        24%, 29% { transform: translateY(-22px) }
        33%, 38% { transform: translateY(-13.7px) }
        42%, 47% { transform: translateY(-5.3px) }
        51%, 88% { transform: translateY(0px) }
        91%, 100% { transform: translateY(-49.5px) }
      }
      @keyframes K_p0 { 0%, 4% { transform: scaleX(0) } 8%, 88% { transform: scaleX(1) } 90%, 100% { transform: scaleX(0) } }
      @keyframes K_p1 { 0%, 13.5% { transform: scaleX(0) } 17.5%, 88% { transform: scaleX(1) } 90%, 100% { transform: scaleX(0) } }
      @keyframes K_p2 { 0%, 22% { transform: scaleX(0) } 26%, 88% { transform: scaleX(1) } 90%, 100% { transform: scaleX(0) } }
      @keyframes K_p3 { 0%, 30.5% { transform: scaleX(0) } 34.5%, 88% { transform: scaleX(1) } 90%, 100% { transform: scaleX(0) } }
      @keyframes K_p4 { 0%, 33% { transform: scaleX(0) } 36%, 88% { transform: scaleX(1) } 90%, 100% { transform: scaleX(0) } }
      @keyframes K_p5 { 0%, 41% { transform: scaleX(0) } 45%, 88% { transform: scaleX(1) } 90%, 100% { transform: scaleX(0) } }
      @keyframes K_tear {
        0%, 64% { transform: translate(0px, 0px) rotate(0deg); opacity: 1 }
        68% { transform: translate(0px, 1.5px) rotate(-2deg); opacity: 1 }
        72% { transform: translate(0px, 0px) rotate(1.5deg); opacity: 1 }
        84% { transform: translate(3px, 12px) rotate(7deg); opacity: 0 }
        92% { transform: translate(0px, 0px) rotate(0deg); opacity: 0 }
        100% { transform: translate(0px, 0px) rotate(0deg); opacity: 1 }
      }
      @keyframes K_led { 0%, 50% { fill: var(--c3) } 53%, 84% { fill: var(--c2) } 88%, 100% { fill: var(--c3) } }
      @keyframes K_blink {
        0% { opacity: .45 }
        2%, 6% { opacity: 1 }
        9% { opacity: .45 }
        11%, 15% { opacity: 1 }
        18% { opacity: .45 }
        20%, 24% { opacity: 1 }
        27% { opacity: .45 }
        29%, 33% { opacity: 1 }
        36% { opacity: .45 }
        38%, 42% { opacity: 1 }
        45% { opacity: .45 }
        47%, 86% { opacity: 1 }
        92%, 100% { opacity: .45 }
      }`,
  },
  {
    slug: "shopping-bag",
    name: "Shopping Bag",
    category: "business",
    description:
      "A shopping bag swings from its hook while tissue paper puffs up at the top and a price tag flutters a beat behind.",
    details:
      "The pendulum swing is slow and easy, and the tag's delayed flutter plus the tissue puffing at each turn give it a lively boutique feel. It fits fashion and lifestyle stores, gift shops, wishlist and bag drawers, and sale or promo pages waiting for products to load. Bag colors the body and the handle, Tissue paper sets the paper peeking out of the top, and Price tag tints the hanging tag. A soft Bag color with a bright tag works best for a boutique look.",
    tags: ["bag", "shopping", "swing", "boutique", "fashion", "retail"],
    kind: "wave",
    colors: { primary: "#fb7185", secondary: "#38bdf8", accent: "#f59e0b" },
    colorLabels: { primary: "Bag", secondary: "Tissue paper", accent: "Price tag" },
    duration: 2.4,
    popularity: 68,
    svg: `
      <circle class="peg" cx="50" cy="9" r="3"/>
      <g class="swing">
        <path class="handle" d="M38 42C38 24 44 12.5 50 12.5C56 12.5 62 24 62 42"/>
        <g class="tissue"><path class="sheet" d="M31 44C31.5 37 34 31 37.5 26.5C41 31 44.5 36 47 42Z"/><path class="facet" d="M37.5 26.5C41 31 44.5 36 47 42L40 43Z"/><path class="sheet" d="M53 42C56 36 59.5 31.5 63.5 28C66.5 33 68.5 38 69 44Z"/><path class="facet" d="M63.5 28C66.5 33 68.5 38 69 44L62 43Z"/></g>
        <g class="tissue t2"><path class="sheet" d="M40 44C41 36 45 28 50.5 21.5C55.5 28 59 36 60 44Z"/><path class="facet" d="M50.5 21.5C55.5 28 59 36 60 44L51 44Z"/></g>
        <path class="bag" d="M28 40H72L75.5 82Q76 86 72 86H28Q24 86 24.5 82Z"/>
        <path class="fold" d="M28 40H72L72.5 46H27.5Z"/>
        <circle class="hole" cx="38" cy="43" r="1.5"/>
        <circle class="hole" cx="62" cy="43" r="1.5"/>
        <path class="star" d="M50 56L52 61.25L57.61 61.53L53.23 65.05L54.7 70.47L50 67.4L45.3 70.47L46.77 65.05L42.39 61.53L48 61.25Z"/>
        <g class="tag">
          <path class="string" d="M61 30L69 42.5"/>
          <path class="label" d="M69 38L74 42.5V55H64V42.5Z"/>
          <circle class="eyelet" cx="69" cy="42.5" r="1.4"/>
          <path class="price" d="M66.5 48.5h5M66.5 51.5h3"/>
        </g>
      </g>`,
    css: `
      ROOT .peg { fill: #94a3b8 }
      ROOT .swing { transform-origin: 50px 9px; animation: K_swing var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
      ROOT .handle { fill: none; stroke: var(--c1); stroke-width: 3.5; stroke-linecap: round }
      ROOT .sheet { fill: var(--c2); stroke: var(--c2); stroke-width: 1.5; stroke-linejoin: round }
      ROOT .facet { fill: #fff; opacity: .32 }
      ROOT .tissue { transform-box: fill-box; transform-origin: 50% 100%; animation: K_puff calc(var(--d) / 2) ease-in-out infinite }
      ROOT .t2 { animation-delay: calc(var(--d) * -0.08) }
      ROOT .bag { fill: var(--c1) }
      ROOT .fold { fill: #000; opacity: .12 }
      ROOT .hole { fill: #000; opacity: .3 }
      ROOT .star { fill: #fff; stroke: #fff; stroke-width: 1.5; stroke-linejoin: round; opacity: .92 }
      ROOT .tag { transform-origin: 61px 30px; animation: K_tag var(--d) ease-in-out infinite }
      ROOT .string { fill: none; stroke: #94a3b8; stroke-width: 1.4; stroke-linecap: round }
      ROOT .label { fill: var(--c3); stroke: #fff; stroke-width: 1.5; stroke-linejoin: round }
      ROOT .eyelet { fill: #fff }
      ROOT .price { fill: none; stroke: #fff; stroke-width: 1.6; stroke-linecap: round; opacity: .85 }
      @keyframes K_swing { 0%, 100% { transform: rotate(-9deg) } 50% { transform: rotate(9deg) } }
      @keyframes K_puff {
        0%, 100% { transform: scale(1, 1) }
        20% { transform: scale(1.06, 1.16) }
        45% { transform: scale(.98, .94) }
        70% { transform: scale(1, 1.02) }
      }
      @keyframes K_tag {
        0%, 100% { transform: rotate(-5deg) }
        14% { transform: rotate(-14deg) }
        38% { transform: rotate(3deg) }
        50% { transform: rotate(5deg) }
        64% { transform: rotate(14deg) }
        88% { transform: rotate(-3deg) }
      }`,
  },
  {
    slug: "calendar-flip",
    name: "Calendar Flip",
    category: "business",
    description:
      "A desk calendar flips its page up and over to the next date, then a green badge pops in to check off the booking.",
    details:
      "Each flip folds the page up under the header with a hint of depth, revealing a new day, and the date keeps counting forward through four days before starting again. Booking and reservation flows, appointment schedulers, event registration, delivery date pickers and subscription renewals are where it feels most at home. Header colors the binding strip and Booked badge sets the check that confirms the date, while the pages stay white so the numbers remain legible on light and dark backgrounds alike.",
    tags: ["calendar", "booking", "schedule", "date", "flip", "appointment"],
    kind: "morph",
    colors: { primary: "#0ea5e9", secondary: "#10b981" },
    colorLabels: { primary: "Header", secondary: "Booked badge" },
    duration: 2.4,
    popularity: 70,
    svg: `
      <rect class="stack" x="21" y="26" width="58" height="64" rx="6"/>
      <path class="page" d="M18 36H82V79Q82 86 75 86H25Q18 86 18 79Z"/>
      <text class="day" x="50" y="68">13</text>
      <text class="day v1" x="50" y="68">14</text>
      <text class="day v2" x="50" y="68">15</text>
      <text class="day v3" x="50" y="68">12</text>
      <g class="badge"><circle class="seal" cx="71" cy="77" r="7.5"/><path class="tick" d="M67.4 77.2l2.5 2.5l4.8-5"/></g>
      <g class="flip">
        <path class="page" d="M18 36H82V79Q82 86 75 86H25Q18 86 18 79Z"/>
        <text class="day" x="50" y="68">12</text>
        <text class="day v1" x="50" y="68">13</text>
        <text class="day v2" x="50" y="68">14</text>
        <text class="day v3" x="50" y="68">15</text>
        <path class="shade" d="M18 36H82V79Q82 86 75 86H25Q18 86 18 79Z"/>
      </g>
      <path class="header" d="M18 37V29Q18 22 25 22H75Q82 22 82 29V37Z"/>
      <rect class="month" x="40" y="27.5" width="20" height="4" rx="2"/>
      <rect class="ring" x="30" y="15" width="5" height="13" rx="2.5"/>
      <rect class="ring" x="65" y="15" width="5" height="13" rx="2.5"/>`,
    css: `
      ROOT .stack { fill: #cbd5e1; stroke: #94a3b8; stroke-width: 1.5 }
      ROOT .page { fill: #fff; stroke: #94a3b8; stroke-width: 1.5 }
      ROOT .day { fill: #334155; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        font-size: 27px; font-weight: 800; text-anchor: middle; opacity: 0;
        animation: K_seq calc(var(--d) * 4) step-end infinite }
      ROOT .v1 { animation-delay: calc(var(--d) * -3) }
      ROOT .v2 { animation-delay: calc(var(--d) * -2) }
      ROOT .v3 { animation-delay: calc(var(--d) * -1) }
      ROOT .badge { transform-box: fill-box; transform-origin: center; transform: scale(0);
        animation: K_badge var(--d) ease-out infinite }
      ROOT .seal { fill: var(--c2) }
      ROOT .tick { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round;
        stroke-dasharray: 11px; animation: K_tick var(--d) ease-out infinite }
      ROOT .flip { transform-origin: 50px 37px; animation: K_flip var(--d) linear infinite }
      ROOT .shade { fill: #0f172a; opacity: 0; animation: K_shade var(--d) linear infinite }
      ROOT .header { fill: var(--c1) }
      ROOT .month { fill: #fff; opacity: .75 }
      ROOT .ring { fill: #94a3b8; stroke: #64748b; stroke-width: 1 }
      @keyframes K_seq { 0% { opacity: 1 } 25%, 100% { opacity: 0 } }
      @keyframes K_flip {
        0%, 10% { transform: scale(1, 1); animation-timing-function: cubic-bezier(.5, 0, .8, .45) }
        34%, 100% { transform: scale(.92, 0) }
      }
      @keyframes K_shade { 0%, 10% { opacity: 0 } 34%, 100% { opacity: .32 } }
      @keyframes K_badge {
        0%, 38% { transform: scale(0); opacity: 0 }
        46% { transform: scale(1.18); opacity: 1 }
        51%, 82% { transform: scale(1); opacity: 1 }
        92%, 100% { transform: scale(.6); opacity: 0 }
      }
      @keyframes K_tick { 0%, 47% { stroke-dashoffset: 11px } 58%, 100% { stroke-dashoffset: 0px } }`,
  },
  {
    slug: "mail-send",
    name: "Mail Send",
    category: "business",
    description:
      "A letter slips into an envelope, the flap folds shut, and it turns into a paper plane that loops the loop and flies away.",
    details:
      "Every cycle tells a small story: sealing, folding, a full loop with a fading trail, and a quick exit before a fresh envelope pops back in. Reach for it on newsletter sign-ups, contact forms, email campaign sends, invite flows and support tickets that are on their way. Envelope & plane colors the outside of the envelope and the plane's top wing, while Lining & trail covers the inner flap, the plane's fold and the loop it draws. Contrasting tones make the moment the envelope becomes a plane easier to follow.",
    tags: ["email", "envelope", "plane", "newsletter", "send", "loop"],
    kind: "orbit",
    colors: { primary: "#4f46e5", secondary: "#0ea5e9" },
    colorLabels: { primary: "Envelope & plane", secondary: "Lining & trail" },
    duration: 3.2,
    popularity: 74,
    svg: `
      <path class="trail" d="M50 56A20 20 0 0 0 70 36A20 20 0 0 0 50 16A20 20 0 0 0 30 36A20 20 0 0 0 50 56"/>
      <g class="env">
        <path class="flap-back" d="M24.1 40L50 18L75.9 40Z"/>
        <rect class="lining" x="23.5" y="38.8" width="53" height="34.5" rx="4"/>
        <g class="letter"><rect class="sheet" x="30.5" y="26" width="39" height="29" rx="2.3"/><path class="lines" d="M36.2 33h27.6M36.2 38.8h19.6M36.2 44.5h23"/></g>
        <path class="pocket" d="M23.5 39.6L50 60.6L76.5 39.6V69.3Q76.5 73.3 72.5 73.3H27.5Q23.5 73.3 23.5 69.3Z"/>
        <path class="crease" d="M25.9 71L44.3 57.7M74.1 71L55.7 57.7"/>
        <g class="flap-front"><path class="flap" d="M24.1 39.4L50 60.6L75.9 39.4Z"/><path class="crease" d="M26.4 40.5L50 59.5L73.6 40.5"/></g>
      </g>
      <g class="fly"><g class="orbit"><g class="plane">
        <path class="wing" d="M33 47L68 56L45 58.5Z"/>
        <path class="keel" d="M45 58.5L68 56L49.5 67Z"/>
      </g></g></g>`,
    css: `
      ROOT .trail { fill: none; stroke: var(--c2); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 0px 130px; opacity: 0;
        animation: K_trail var(--d) linear infinite }
      ROOT .env { transform-origin: 50px 56px; animation: K_env var(--d) linear infinite }
      ROOT .flap-back { fill: var(--c2); transform-origin: 50px 40px; animation: K_fb var(--d) linear infinite }
      ROOT .lining { fill: var(--c2) }
      ROOT .sheet { fill: #fff; stroke: #cbd5e1; stroke-width: 1 }
      ROOT .lines { fill: none; stroke: #94a3b8; stroke-width: 2; stroke-linecap: round }
      ROOT .letter { animation: K_letter var(--d) cubic-bezier(.5, 0, .3, 1) infinite }
      ROOT .pocket, ROOT .flap { fill: var(--c1) }
      ROOT .crease { fill: none; stroke: #fff; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; opacity: .4 }
      ROOT .flap-front { transform-origin: 50px 40px; transform: scaleY(0); animation: K_ff var(--d) linear infinite }
      ROOT .fly { transform-origin: 50px 56px; animation: K_fly var(--d) linear infinite }
      ROOT .orbit { transform-origin: 50px 36px; animation: K_orbit var(--d) linear infinite }
      ROOT .plane { transform-box: fill-box; transform-origin: center; opacity: 0; animation: K_plane var(--d) linear infinite }
      ROOT .wing { fill: var(--c1) }
      ROOT .keel { fill: var(--c2) }
      @keyframes K_trail {
        0%, 37.9% { stroke-dasharray: 0px 130px; opacity: 0 }
        38% { stroke-dasharray: 0px 130px; opacity: .6; animation-timing-function: cubic-bezier(.45, .05, .55, .95) }
        74% { stroke-dasharray: 126px 130px; opacity: .6 }
        84%, 100% { stroke-dasharray: 126px 130px; opacity: 0 }
      }
      @keyframes K_orbit {
        0%, 38% { transform: rotate(0deg); animation-timing-function: cubic-bezier(.45, .05, .55, .95) }
        74%, 100% { transform: rotate(-360deg) }
      }
      @keyframes K_plane {
        0%, 29% { transform: scale(.3) rotate(35deg); opacity: 0; animation-timing-function: cubic-bezier(.3, 1.4, .5, 1) }
        38%, 100% { transform: scale(1) rotate(0deg); opacity: 1 }
      }
      @keyframes K_fly {
        0%, 74% { transform: translate(0px, 0px) scale(1); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        86% { transform: translate(26px, -14px) scale(.5); opacity: 0 }
        88%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0 }
      }
      @keyframes K_env {
        0%, 28% { transform: scale(1, 1) rotate(0deg); opacity: 1; animation-timing-function: cubic-bezier(.5, 0, .9, .5) }
        36% { transform: scale(.35, .2) rotate(-14deg); opacity: 0 }
        84% { transform: scale(.6, .6) rotate(0deg); opacity: 0; animation-timing-function: cubic-bezier(.3, 1.3, .6, 1) }
        94%, 100% { transform: scale(1, 1) rotate(0deg); opacity: 1 }
      }
      @keyframes K_letter {
        0%, 4% { transform: translateY(0px) }
        16%, 36% { transform: translateY(14px) }
        37%, 100% { transform: translateY(0px) }
      }
      @keyframes K_fb {
        0%, 15% { transform: scaleY(1); animation-timing-function: cubic-bezier(.55, 0, 1, .45) }
        21%, 36% { transform: scaleY(0) }
        37%, 100% { transform: scaleY(1) }
      }
      @keyframes K_ff {
        0%, 21% { transform: scaleY(0); animation-timing-function: cubic-bezier(0, .55, .45, 1) }
        27%, 36% { transform: scaleY(1) }
        37%, 100% { transform: scaleY(0) }
      }`,
  },
  {
    slug: "rocket-launch",
    name: "Rocket Launch",
    category: "business",
    description:
      "A small rocket rides a flickering flame upward while smoke puffs roll away from the nozzle and stars stream past it.",
    details:
      "The rocket bobs gently on its thrust as stars streak down past it and puffs billow out below, which reads as a launch in progress rather than a static icon, and the climb loops without a seam. It is a favorite for product launches, onboarding and setup steps, deploy or publish buttons, plan upgrades and startup landing pages. Rocket body colors the hull, Fins & nose sets the trim and the passing stars, and Flame tints the exhaust. Keep Flame warm so the thrust stands out on both light and dark pages.",
    tags: ["rocket", "launch", "startup", "space", "particles", "growth"],
    kind: "particles",
    colors: { primary: "#4f46e5", secondary: "#fb7185", accent: "#f59e0b" },
    colorLabels: { primary: "Rocket body", secondary: "Fins & nose", accent: "Flame" },
    duration: 2,
    popularity: 80,
    svg: `
      <defs><clipPath id="rocket-launch-hull"><path d="M50 14C58 20 61.5 32 61.5 44V62Q61.5 66 57.5 66H42.5Q38.5 66 38.5 62V44C38.5 32 42 20 50 14Z"/></clipPath></defs>
      <path class="streak" d="M20 8v8"/>
      <path class="streak s2" d="M81 12v8"/>
      <path class="streak s3" d="M28 18v6"/>
      <circle class="star" cx="74" cy="10" r="1.8"/>
      <circle class="star s5" cx="15" cy="22" r="1.6"/>
      <circle class="star s6" cx="87" cy="26" r="1.6"/>
      <circle class="puff pl" cx="50" cy="80" r="5"/>
      <circle class="puff pr" cx="50" cy="80" r="5"/>
      <circle class="puff pc" cx="50" cy="80" r="5"/>
      <g class="rocket"><g class="shake">
        <g class="flame"><path class="fire" d="M42.5 64C42.5 74 46.5 80 50 89C53.5 80 57.5 74 57.5 64Z"/><path class="core" d="M46 64C46 71 48 75 50 81C52 75 54 71 54 64Z"/></g>
        <path class="fin" d="M39 46C33 50 30 56 30 63Q30 66 33 65L39 62Z"/>
        <path class="fin" d="M61 46C67 50 70 56 70 63Q70 66 67 65L61 62Z"/>
        <path class="hull" d="M50 14C58 20 61.5 32 61.5 44V62Q61.5 66 57.5 66H42.5Q38.5 66 38.5 62V44C38.5 32 42 20 50 14Z"/>
        <g clip-path="url(#rocket-launch-hull)"><rect class="nose" x="36" y="10" width="28" height="19"/><rect class="band" x="36" y="54" width="28" height="3.5"/></g>
        <path class="shine" d="M44.5 27C43 33 42.5 38 42.5 44V58"/>
        <circle class="window" cx="50" cy="40" r="6"/>
        <path class="glint" d="M46.8 38.4a3.6 3.6 0 0 1 2.8-2.6"/>
        <rect class="nozzle" x="44" y="65" width="12" height="4" rx="1.5"/>
        <rect class="nose" x="48.5" y="55" width="3" height="13" rx="1.5"/>
      </g></g>`,
    css: `
      ROOT .streak { fill: none; stroke: #94a3b8; stroke-width: 2; stroke-linecap: round; opacity: 0;
        animation: K_fall calc(var(--d) / 2) linear infinite }
      ROOT .star { fill: var(--c2); opacity: 0; animation: K_fall var(--d) linear infinite }
      ROOT .s2 { animation-delay: calc(var(--d) * -0.3) }
      ROOT .s3 { animation-delay: calc(var(--d) * -0.15) }
      ROOT .s5 { animation-delay: calc(var(--d) * -0.35) }
      ROOT .s6 { animation-delay: calc(var(--d) * -0.7) }
      ROOT .puff { fill: #94a3b8; opacity: 0; transform-box: fill-box; transform-origin: center }
      ROOT .pl { animation: K_puffL calc(var(--d) / 2) cubic-bezier(.2, .6, .4, 1) infinite }
      ROOT .pr { animation: K_puffR calc(var(--d) / 2) cubic-bezier(.2, .6, .4, 1) infinite; animation-delay: calc(var(--d) * -0.17) }
      ROOT .pc { animation: K_puffC calc(var(--d) / 2) cubic-bezier(.2, .6, .4, 1) infinite; animation-delay: calc(var(--d) * -0.33) }
      ROOT .rocket { animation: K_lift var(--d) ease-in-out infinite }
      ROOT .shake { animation: K_shake calc(var(--d) / 8) linear infinite }
      ROOT .flame { transform-origin: 50px 65px; animation: K_flick calc(var(--d) / 8) ease-in-out infinite }
      ROOT .fire { fill: var(--c3) }
      ROOT .core { fill: #fde68a; transform-origin: 50px 65px; animation: K_core calc(var(--d) / 6) ease-in-out infinite }
      ROOT .fin, ROOT .nose { fill: var(--c2) }
      ROOT .hull { fill: var(--c1) }
      ROOT .band { fill: #fff; opacity: .35 }
      ROOT .shine { fill: none; stroke: #fff; stroke-width: 2.5; stroke-linecap: round; opacity: .3 }
      ROOT .window { fill: #e0f2fe; stroke: #fff; stroke-width: 2.5 }
      ROOT .glint { fill: none; stroke: #fff; stroke-width: 1.5; stroke-linecap: round }
      ROOT .nozzle { fill: #64748b }
      @keyframes K_fall { 0% { transform: translateY(0px); opacity: 0 } 15%, 75% { opacity: 1 } 100% { transform: translateY(66px); opacity: 0 } }
      @keyframes K_puffL { 0% { transform: translate(0px, -2px) scale(.4); opacity: .75 } 100% { transform: translate(-15px, 5px) scale(1.5); opacity: 0 } }
      @keyframes K_puffR { 0% { transform: translate(0px, -2px) scale(.4); opacity: .75 } 100% { transform: translate(15px, 5px) scale(1.5); opacity: 0 } }
      @keyframes K_puffC { 0% { transform: translate(0px, -2px) scale(.4); opacity: .6 } 100% { transform: translate(0px, 5px) scale(1.6); opacity: 0 } }
      @keyframes K_lift { 0%, 100% { transform: translateY(4px) } 50% { transform: translateY(-4px) } }
      @keyframes K_shake { 0%, 100% { transform: translateX(0px) } 25% { transform: translateX(.6px) } 75% { transform: translateX(-.6px) } }
      @keyframes K_flick { 0%, 100% { transform: scale(1, 1) } 50% { transform: scale(.88, .78) } }
      @keyframes K_core { 0%, 100% { transform: scale(.9, .8) } 50% { transform: scale(1.05, 1.1) } }`,
  },
];

export default business;

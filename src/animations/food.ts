import type { AnimationSource } from "@/types/animation";

/**
 * Food & Drinks category: appetizing, flat illustrations with a shared look.
 * - Ink: warm espresso #43291c for outlines (about 2.2 units), so cream shapes read on white.
 * - var(--c1) / var(--c2) / var(--c3) carry the food roles named in colorLabels.
 * - Motion: squash and stretch on landings, lagging toppings, steam and bubbles staggered with negative delays.
 * Authoring contract: docs/ANIMATION_AUTHORING.md
 */

const food: AnimationSource[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "coffee-steam",
    name: "Coffee Steam",
    category: "food",
    description:
      "Three ribbons of steam curl up from a fresh cup of coffee on its saucer, swaying as they rise and fading out one after another.",
    details:
      "Warm, slow and unhurried, this is the loader equivalent of waiting for your first sip. Each steam curl draws itself upward from the coffee, drifts sideways and dissolves, while a soft ring of crema ripples across the surface. It is at home on cafe ordering screens, coffee subscription checkouts, cozy blogs and any productivity tool that wants a wait to feel like a short break. Cup colors the mug and saucer, Coffee sets the drink and the band around the cup, and Steam & crema tints the curls; try a sage cup with matcha-green coffee for a tea house look.",
    tags: ["coffee", "steam", "cup", "cafe", "cozy", "warm"],
    kind: "particles",
    colors: { primary: "#fef3c7", secondary: "#92400e", accent: "#c98f5e" },
    colorLabels: { primary: "Cup", secondary: "Coffee", accent: "Steam & crema" },
    duration: 2.4,
    popularity: 88,
    svg: `
      <defs><clipPath id="coffee-steam-body"><path d="M24 51H72C72 68 64.5 81 53 81H43C31.5 81 24 68 24 51Z"/></clipPath></defs>
      <g class="curl"><path class="steam" pathLength="100" d="M37 46C32.5 40.5 41.5 36 37 30.5C32.5 25 41.5 20.5 37 15"/></g>
      <g class="curl c2"><path class="steam" pathLength="100" d="M48 46C53 40 43 35 48 29C53 23 43 18 48 11"/></g>
      <g class="curl c3"><path class="steam" pathLength="100" d="M59 46C63.5 40.5 54.5 36 59 30.5C63.5 25 54.5 20.5 59 15"/></g>
      <ellipse class="cup" cx="48" cy="83" rx="31" ry="6.2"/>
      <ellipse class="well" cx="48" cy="82" rx="17" ry="3"/>
      <path class="handle-o" d="M70 57C82 54 84.5 70 67 72"/>
      <path class="handle-f" d="M70 57C82 54 84.5 70 67 72"/>
      <path class="cup" d="M24 51H72C72 68 64.5 81 53 81H43C31.5 81 24 68 24 51Z"/>
      <g clip-path="url(#coffee-steam-body)">
        <rect class="band" x="20" y="59" width="56" height="4.5"/>
        <ellipse class="shade" cx="69" cy="64" rx="9" ry="22"/>
      </g>
      <path class="cup-line" d="M24 51H72C72 68 64.5 81 53 81H43C31.5 81 24 68 24 51Z"/>
      <path class="gloss" d="M29.5 57C30 64 32 70 35.5 74"/>
      <ellipse class="cup" cx="48" cy="51" rx="24" ry="5.4"/>
      <ellipse class="coffee" cx="48" cy="51.7" rx="20.2" ry="3.7"/>
      <ellipse class="crema" cx="48" cy="51.8" rx="11" ry="1.9"/>
      <path class="shine" d="M38 50.6Q42 49.4 46 49.6"/>`,
    css: `
      ROOT .cup { fill: var(--c1); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .cup-line { fill: none; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .well { fill: #43291c; opacity: .12 }
      ROOT .handle-o { fill: none; stroke: #43291c; stroke-width: 8.4; stroke-linecap: round }
      ROOT .handle-f { fill: none; stroke: var(--c1); stroke-width: 4; stroke-linecap: round }
      ROOT .band { fill: var(--c2) }
      ROOT .shade { fill: #43291c; opacity: .1 }
      ROOT .gloss { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .7 }
      ROOT .coffee { fill: var(--c2) }
      ROOT .shine { fill: none; stroke: #fff; stroke-width: 1.3; stroke-linecap: round; opacity: .35 }
      ROOT .crema { fill: none; stroke: var(--c3); stroke-width: 1.2; transform-box: fill-box; transform-origin: center;
                    animation: K_ripple calc(var(--d) / 2) ease-out infinite }
      ROOT .steam { fill: none; stroke: var(--c3); stroke-width: 3.8; stroke-linecap: round; stroke-dasharray: 46 100;
                    animation: K_rise var(--d) linear infinite }
      ROOT .curl { animation: K_sway var(--d) ease-in-out infinite }
      ROOT .c2, ROOT .c2 .steam { animation-delay: calc(var(--d) / -3) }
      ROOT .c3, ROOT .c3 .steam { animation-delay: calc(var(--d) * -2 / 3) }
      @keyframes K_rise {
        0% { stroke-dashoffset: 46; opacity: 0; transform: translateY(2px) }
        16% { opacity: 1 }
        64% { opacity: .9 }
        100% { stroke-dashoffset: -100; opacity: 0; transform: translateY(-3px) }
      }
      @keyframes K_sway {
        0%, 100% { transform: translateX(-1.6px) }
        50% { transform: translateX(1.6px) }
      }
      @keyframes K_ripple {
        0% { transform: scale(.35); opacity: 0 }
        25% { opacity: .9 }
        100% { transform: scale(1.5); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "pizza-slice",
    name: "Pizza Slice",
    category: "food",
    description:
      "A pepperoni pizza turns slowly on its pan while one slice lifts away, stretching strings of melted cheese before it settles back into place.",
    details:
      "Everyone knows the moment: you pull a slice and the cheese refuses to let go. Here the slice dips, lifts free with a little wobble, stretches three gooey strings across the gap and drops back with a soft bounce, while the whole pie keeps turning on its pan. It is an easy favorite for pizzerias, food delivery tracking, takeout menus and party or game-night apps. Pepperoni colors the toppings, Cheese sets the melt and the strings, and Crust tints the golden rim; swap Pepperoni to a leafy green for a veggie pie.",
    tags: ["pizza", "slice", "cheese", "rotate", "delivery", "appetizing"],
    kind: "spinner",
    colors: { primary: "#ef4444", secondary: "#fbbf24", accent: "#d4904c" },
    colorLabels: { primary: "Pepperoni", secondary: "Cheese", accent: "Crust" },
    duration: 2.8,
    popularity: 86,
    svg: `
      <circle class="pan" cx="50" cy="50" r="34"/>
      <g class="turn">
        <circle class="crust" cx="50" cy="50" r="30"/>
        <circle class="cheese" cx="50" cy="50" r="25"/>
        <g transform="rotate(60 50 50)"><circle class="pep" cx="50" cy="36" r="3.4"/><circle class="pep" cx="54" cy="28.5" r="3"/></g>
        <g transform="rotate(120 50 50)"><circle class="pep" cx="50" cy="36" r="3.4"/><circle class="pep" cx="46" cy="28.5" r="3"/></g>
        <g transform="rotate(180 50 50)"><circle class="pep" cx="50" cy="36" r="3.4"/><circle class="pep" cx="54" cy="28.5" r="3"/></g>
        <g transform="rotate(240 50 50)"><circle class="pep" cx="50" cy="36" r="3.4"/><circle class="pep" cx="46" cy="28.5" r="3"/></g>
        <g transform="rotate(300 50 50)"><circle class="pep" cx="50" cy="36" r="3.4"/><circle class="pep" cx="54" cy="28.5" r="3"/></g>
        <path class="cut" d="M50 50L80 50M50 50L65 75.98M50 50L35 75.98M50 50L20 50"/>
        <path class="gap" d="M50 50L35 24.02A30 30 0 0 1 65 24.02Z"/>
        <path class="drop" d="M50 50L35 24.02A30 30 0 0 1 65 24.02Z"/>
        <path class="string" d="M44 39.6V28.6"/>
        <path class="string s2" d="M50 50V39"/>
        <path class="string s3" d="M56 39.6V28.6"/>
        <g class="lift">
          <path class="crust" d="M50 50L35 24.02A30 30 0 0 1 65 24.02Z"/>
          <path class="cheese" d="M50 50L37.5 28.35A25 25 0 0 1 62.5 28.35Z"/>
          <circle class="pep" cx="50" cy="36" r="3.4"/>
          <circle class="pep" cx="54" cy="28.5" r="3"/>
          <path class="melt" d="M43 31.5Q45 33.5 44 36M56.5 37Q57.5 39.5 55.5 41"/>
        </g>
      </g>`,
    css: `
      ROOT .pan { fill: #a8a29e; stroke: #43291c; stroke-width: 2.2 }
      ROOT .crust { fill: var(--c3); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .cheese { fill: var(--c2) }
      ROOT .pep { fill: var(--c1); stroke: #43291c; stroke-width: 1.4 }
      ROOT .cut { fill: none; stroke: #43291c; stroke-width: 1.4; stroke-linecap: round; opacity: .55 }
      ROOT .melt { fill: none; stroke: #fff; stroke-width: 1.4; stroke-linecap: round; opacity: .45 }
      ROOT .gap { fill: #a8a29e; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .drop { fill: #43291c; opacity: 0; transform-origin: 50px 32px; animation: K_drop var(--d) ease-in-out infinite }
      ROOT .turn { transform-origin: 50px 50px; animation: K_turn calc(var(--d) * 4) linear infinite }
      ROOT .lift { transform-origin: 50px 32px; animation: K_lift var(--d) infinite }
      ROOT .string { fill: none; stroke: var(--c2); stroke-width: 2.4; stroke-linecap: round;
                     transform-origin: 44px 39.6px; animation: K_string var(--d) infinite }
      ROOT .s2 { transform-origin: 50px 50px; animation-delay: calc(var(--d) * -0.02) }
      ROOT .s3 { transform-origin: 56px 39.6px; animation-delay: calc(var(--d) * -0.01) }
      @keyframes K_turn { to { transform: rotate(360deg) } }
      @keyframes K_lift {
        0%, 6% { transform: translateY(0) scale(1) rotate(0deg); animation-timing-function: ease-in-out }
        14% { transform: translateY(1px) scale(.99) rotate(0deg); animation-timing-function: cubic-bezier(.2, .7, .3, 1) }
        32% { transform: translateY(-10px) scale(1.07) rotate(-3deg); animation-timing-function: ease-in-out }
        44% { transform: translateY(-8.5px) scale(1.06) rotate(2deg); animation-timing-function: ease-in-out }
        54% { transform: translateY(-10px) scale(1.07) rotate(-1deg); animation-timing-function: cubic-bezier(.5, 0, .75, 0) }
        66% { transform: translateY(.8px) scale(.98, .97) rotate(0deg); animation-timing-function: ease-out }
        72% { transform: translateY(-1.2px) scale(1.01) rotate(0deg); animation-timing-function: ease-in-out }
        78%, 100% { transform: translateY(0) scale(1) rotate(0deg) }
      }
      @keyframes K_string {
        0%, 14% { transform: scale(1.3, 0); animation-timing-function: cubic-bezier(.2, .7, .3, 1) }
        32% { transform: scale(.75, 1); animation-timing-function: ease-in-out }
        44% { transform: scale(.6, .86) }
        54% { transform: scale(.5, 1); animation-timing-function: cubic-bezier(.5, 0, .75, 0) }
        66%, 100% { transform: scale(1.3, 0) }
      }
      @keyframes K_drop {
        0%, 14% { opacity: 0; transform: scale(1) }
        32%, 54% { opacity: .28; transform: translateY(-2px) scale(.94) }
        66%, 100% { opacity: 0; transform: scale(1) }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "donut-spin",
    name: "Donut Spin",
    category: "food",
    description:
      "A glazed donut spins with a little push and glide, its rainbow sprinkles twinkling while a glossy shine stays put on the icing.",
    details:
      "Sweet and a little cheeky, this donut winds up, spins a full turn and glides to a slow stop before going again, so it feels like someone giving it a playful flick. The sprinkles pop in turn, and the glossy highlight stays fixed like a real light source while the icing rolls under it. Reach for it on bakery and dessert shop sites, sweet-treat delivery, birthday promotions or a cheerful loyalty app. Icing sets the glaze, Dough colors the ring, and Sprinkles tints a third of the toppings; chocolate icing with pastel sprinkles is a classic.",
    tags: ["donut", "spin", "sprinkles", "glaze", "sweet", "bakery"],
    kind: "spinner",
    colors: { primary: "#ec4899", secondary: "#e3a764", accent: "#fbbf24" },
    colorLabels: { primary: "Icing", secondary: "Dough", accent: "Sprinkles" },
    duration: 2.4,
    direction: true,
    popularity: 80,
    svg: `
      <circle class="shadow" cx="51.5" cy="53" r="33"/>
      <g class="spin">
        <path class="dough" d="M50 17A33 33 0 1 1 49.99 17ZM50 40.5A9.5 9.5 0 1 0 50.01 40.5Z"/>
        <path class="toast" d="M50 19.5A30.5 30.5 0 1 1 49.99 19.5"/>
        <path class="icing" d="M50 25.4C51.8 25.4 53.9 24.2 55.6 23.9C57.2 23.5 58.6 22.7 59.8 23.1C60.9 23.5 61.5 25.1 62.5 26.4C63.5 27.7 64.5 29.9 65.8 31.2C67.2 32.4 69.4 33 70.6 33.9C71.9 34.8 72.8 35.4 73.4 36.5C74 37.6 74.1 38.7 74.3 40.2C74.4 41.7 73.8 43.9 74.2 45.7C74.7 47.5 76.2 49.4 76.9 50.9C77.7 52.5 79 53.8 78.8 55.1C78.5 56.3 76.9 57.1 75.6 58.3C74.4 59.5 72.3 60.7 71.3 62.3C70.3 63.9 70.2 66.2 69.6 67.6C69 69.1 68.7 70.4 67.7 71.1C66.8 71.9 65.5 72 64 72.4C62.4 72.7 60.1 72.4 58.4 73.1C56.7 73.8 55.1 75.5 53.7 76.4C52.3 77.3 51.2 78.4 50 78.4C48.8 78.4 47.7 77.3 46.3 76.4C44.9 75.5 43.3 73.8 41.6 73.1C39.9 72.4 37.6 72.6 36.2 72.1C34.7 71.7 33.7 71.3 32.8 70.5C31.8 69.8 31.3 68.8 30.6 67.5C29.9 66.1 29.7 63.8 28.7 62.3C27.7 60.8 25.7 59.5 24.5 58.3C23.2 57.1 21.7 56.3 21.4 55C21.2 53.8 22.4 52.5 23.2 50.9C23.9 49.4 25.4 47.5 25.8 45.7C26.2 43.9 25.5 41.7 25.5 40.1C25.5 38.5 25.3 37.2 25.9 36.1C26.5 35 27.8 34.5 29.2 33.7C30.5 32.9 32.8 32.4 34.2 31.2C35.6 30 36.5 27.8 37.5 26.5C38.5 25.3 39.2 23.9 40.4 23.5C41.5 23.1 42.9 23.7 44.5 24C46.1 24.3 48.2 25.4 50 25.4ZM62.9 45.8C62.5 44.5 61.2 43.6 60.4 42.5C59.5 41.3 59.1 39.8 58 39C56.9 38.2 55.3 38.3 54 37.8C52.6 37.4 51.3 36.4 50 36.4C48.7 36.4 47.4 37.4 46 37.8C44.7 38.3 43.1 38.2 42 39C40.9 39.8 40.5 41.3 39.6 42.5C38.8 43.6 37.5 44.5 37.1 45.8C36.7 47.1 37.2 48.6 37.2 50C37.2 51.4 36.7 52.9 37.1 54.2C37.5 55.5 38.8 56.4 39.6 57.5C40.5 58.7 40.9 60.2 42 61C43.1 61.8 44.7 61.7 46 62.2C47.4 62.6 48.7 63.6 50 63.6C51.3 63.6 52.6 62.6 54 62.2C55.3 61.7 56.9 61.8 58 61C59.1 60.2 59.5 58.7 60.4 57.5C61.2 56.4 62.5 55.5 62.9 54.2C63.3 52.9 62.8 51.4 62.8 50C62.8 48.6 63.3 47.1 62.9 45.8Z"/>
        <path class="spr c0" d="M66.6 46.9L69.7 50.2"/>
        <path class="spr c1 t1" d="M66.4 62L71 61.9"/>
        <path class="spr c2 t2" d="M64.4 62.1L60.5 64.4"/>
        <path class="spr c0 t3" d="M52.5 69.8L52.1 74.4"/>
        <path class="spr c1" d="M45.4 66.9L49.4 69.1"/>
        <path class="spr c2 t1" d="M34.1 67.9L34.3 63.3"/>
        <path class="spr c0 t2" d="M36.6 59.1L32 59.2"/>
        <path class="spr c1 t3" d="M29.2 49.3L26.8 45.4"/>
        <path class="spr c2" d="M35.3 42.9L30.8 44"/>
        <path class="spr c0 t1" d="M36.2 31.8L40.5 30.4"/>
        <path class="spr c1 t2" d="M44.8 34.9L44.3 30.3"/>
        <path class="spr c2 t3" d="M59.2 30.6L55.8 27.6"/>
        <path class="spr c0" d="M59.8 32.6L60.5 37.2"/>
        <path class="spr c1 t1" d="M68.7 42.4L73.3 43.2"/>
      </g>
      <path class="gloss" d="M29.4 42.4A21.5 21.5 0 0 1 40.5 30.6"/>
      <path class="gloss g2" d="M64.5 66.5A21.5 21.5 0 0 1 60.6 69.2"/>
      <path class="glint" d="M33 26Q33.7 30.3 38 31Q33.7 31.7 33 36Q32.3 31.7 28 31Q32.3 30.3 33 26Z"/>`,
    css: `
      ROOT .shadow { fill: #43291c; opacity: .14 }
      ROOT .dough { fill: var(--c2); stroke: #43291c; stroke-width: 2.2; fill-rule: evenodd }
      ROOT .toast { fill: none; stroke: #fff; stroke-width: 2; opacity: .22 }
      ROOT .icing { fill: var(--c1); stroke: #43291c; stroke-width: 2; stroke-linejoin: round; fill-rule: evenodd }
      ROOT .spin { transform-origin: 50px 50px; animation: K_spin var(--d) cubic-bezier(.55, -0.12, .3, 1) infinite }
      ROOT .spr { fill: none; stroke-width: 2.6; stroke-linecap: round; transform-box: fill-box; transform-origin: center;
                  animation: K_twinkle calc(var(--d) / 2) ease-in-out infinite }
      ROOT .c0 { stroke: var(--c3) }
      ROOT .c1 { stroke: #fff }
      ROOT .c2 { stroke: #38bdf8 }
      ROOT .t1 { animation-delay: calc(var(--d) * -0.125) }
      ROOT .t2 { animation-delay: calc(var(--d) * -0.25) }
      ROOT .t3 { animation-delay: calc(var(--d) * -0.375) }
      ROOT .gloss { fill: none; stroke: #fff; stroke-width: 3.2; stroke-linecap: round; opacity: .7;
                    animation: K_gloss var(--d) ease-in-out infinite }
      ROOT .g2 { stroke-width: 2.4; opacity: .4; animation: none }
      ROOT .glint { fill: #fff; stroke: var(--c1); stroke-width: .8; stroke-linejoin: round; transform-box: fill-box; transform-origin: center;
                    animation: K_glint var(--d) ease-in-out infinite }
      @keyframes K_spin { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
      @keyframes K_twinkle {
        0%, 100% { transform: scale(1); opacity: 1 }
        50% { transform: scale(.55); opacity: .55 }
      }
      @keyframes K_gloss { 0%, 100% { opacity: .55 } 50% { opacity: .85 } }
      @keyframes K_glint {
        0%, 50%, 100% { transform: scale(0) rotate(0deg); opacity: 0 }
        62% { transform: scale(1) rotate(45deg); opacity: 1 }
        78% { transform: scale(.2) rotate(90deg); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "noodle-bowl",
    name: "Noodle Bowl",
    category: "food",
    description:
      "Chopsticks lift a tangle of noodles out of a steaming ramen bowl, stretching them long before lowering them back into the broth.",
    details:
      "This one has the rhythm of a slow, happy slurp: the chopsticks pinch, pull the noodles high so they stretch out of the broth, let a drop fall back with a tiny ripple, then dip down again. Steam drifts up behind the egg, naruto and nori so the bowl always looks freshly served. It suits ramen bars, Asian restaurants, meal-kit and recipe sites, and delivery apps waiting on a kitchen. Bowl colors the ceramic, Noodles tints the noodles and broth, and Chopsticks sets the wooden sticks; a deep red bowl with lacquer-black chopsticks gives it a classic noodle-shop feel.",
    tags: ["noodles", "ramen", "chopsticks", "bowl", "steam", "asian food"],
    kind: "wave",
    colors: { primary: "#3b82f6", secondary: "#fcd34d", accent: "#d6a77a" },
    colorLabels: { primary: "Bowl", secondary: "Noodles", accent: "Chopsticks" },
    duration: 2.4,
    popularity: 72,
    svg: `
      <defs><clipPath id="noodle-bowl-body"><path d="M16 58C16 75 31 86 50 86C69 86 84 75 84 58Z"/></clipPath></defs>
      <g class="vapor"><path class="steam" d="M26 50c-3-4 3-7 0-11s3-7 0-11"/></g>
      <g class="vapor v2"><path class="steam" d="M36 47c-3-4 3-7 0-11s3-7 0-11"/></g>
      <path class="foot" d="M37.5 84H62.5L60.8 89.5H39.2Z"/>
      <path class="bowl" d="M16 58C16 75 31 86 50 86C69 86 84 75 84 58Z"/>
      <g clip-path="url(#noodle-bowl-body)">
        <path class="pattern" d="M14 72q4-3.2 8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0"/>
        <ellipse class="shade" cx="74" cy="66" rx="12" ry="24"/>
      </g>
      <path class="gloss" d="M22 65Q24 72 29 76"/>
      <ellipse class="bowl" cx="50" cy="58" rx="34" ry="6.5"/>
      <ellipse class="inner" cx="50" cy="58" rx="34" ry="6.5"/>
      <path class="nori" d="M63 60L66.5 42.5L76 44.5L72.5 61Z"/>
      <ellipse class="broth" cx="50" cy="59.2" rx="30.5" ry="4.8"/>
      <ellipse class="broth-dk" cx="50" cy="59.2" rx="30.5" ry="4.8"/>
      <ellipse class="ripple" cx="49.5" cy="59.4" rx="4" ry="1.2"/>
      <ellipse class="white" cx="32.5" cy="58.4" rx="6.2" ry="3.4"/>
      <ellipse class="yolk" cx="32" cy="58.2" rx="3.1" ry="1.8"/>
      <ellipse class="white" cx="65" cy="59.8" rx="5.2" ry="2.8"/>
      <path class="swirl" d="M65 59.8q1.6-1 2 .4t-2.2.8q-2.8-.4-2.4-1.8"/>
      <circle class="onion" cx="42" cy="61.2" r="1.3"/>
      <circle class="onion" cx="57.5" cy="56.6" r="1.3"/>
      <circle class="onion" cx="23.5" cy="60" r="1.1"/>
      <g class="pull"><g class="dangle">
        <path class="noodle-o" d="M49 37C46 42 47 46 44 50C41.5 53.5 44 56 42 59M50.5 37C49 42 51.5 47 48.5 51.5C46.5 54.5 49.5 56.5 48 59M51.5 37C53 42 50.5 47 53 51.5C55 54.5 52 56.5 54 59M52.5 37C55.5 42 54 46 57 50C59.5 53.5 56.5 56 58 59"/>
        <path class="noodle" d="M49 37C46 42 47 46 44 50C41.5 53.5 44 56 42 59M50.5 37C49 42 51.5 47 48.5 51.5C46.5 54.5 49.5 56.5 48 59M51.5 37C53 42 50.5 47 53 51.5C55 54.5 52 56.5 54 59M52.5 37C55.5 42 54 46 57 50C59.5 53.5 56.5 56 58 59"/>
      </g></g>
      <circle class="drop" cx="49.5" cy="47" r="1.5"/>
      <g class="sticks"><g class="pinch">
        <path class="stick-o" d="M87 22L49.5 36.2M88.5 29L51.5 38.6"/>
        <path class="stick" d="M87 22L49.5 36.2M88.5 29L51.5 38.6"/>
      </g></g>`,
    css: `
      ROOT .bowl { fill: var(--c1); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .foot { fill: var(--c1); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .pattern { fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; opacity: .7 }
      ROOT .shade { fill: #43291c; opacity: .14 }
      ROOT .gloss { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .55 }
      ROOT .inner { fill: #43291c; opacity: .3 }
      ROOT .nori { fill: #1f5132; stroke: #43291c; stroke-width: 1.6; stroke-linejoin: round }
      ROOT .broth { fill: var(--c2) }
      ROOT .broth-dk { fill: #b45309; opacity: .4 }
      ROOT .white { fill: #fffaf0; stroke: #43291c; stroke-width: 1.4 }
      ROOT .yolk { fill: #f59e0b }
      ROOT .swirl { fill: none; stroke: #ec4899; stroke-width: 1.2; stroke-linecap: round }
      ROOT .onion { fill: #a3e635; stroke: #3f6212; stroke-width: .8 }
      ROOT .noodle-o { fill: none; stroke: #43291c; stroke-width: 4.4; stroke-linecap: round }
      ROOT .noodle { fill: none; stroke: var(--c2); stroke-width: 2.4; stroke-linecap: round }
      ROOT .stick-o { fill: none; stroke: #43291c; stroke-width: 5; stroke-linecap: round }
      ROOT .stick { fill: none; stroke: var(--c3); stroke-width: 2.6; stroke-linecap: round }
      ROOT .steam { fill: none; stroke: #c4b2a1; stroke-width: 2.6; stroke-linecap: round }
      ROOT .vapor { opacity: 0; animation: K_vapor var(--d) ease-out infinite }
      ROOT .v2 { animation-delay: calc(var(--d) * -0.5) }
      ROOT .pull { transform-origin: 50.5px 59px; animation: K_pull var(--d) infinite }
      ROOT .dangle { transform-origin: 51px 37px; animation: K_dangle var(--d) ease-in-out infinite }
      ROOT .sticks { animation: K_lift var(--d) infinite }
      ROOT .pinch { transform-origin: 50.5px 37px; animation: K_pinch var(--d) ease-in-out infinite }
      ROOT .drop { fill: var(--c2); stroke: #43291c; stroke-width: .8; opacity: 0; animation: K_drop var(--d) infinite }
      ROOT .ripple { fill: none; stroke: #fff; stroke-width: 1; opacity: 0; transform-box: fill-box; transform-origin: center;
                     animation: K_ripple var(--d) ease-out infinite }
      @keyframes K_lift {
        0%, 8% { transform: translateY(0); animation-timing-function: cubic-bezier(.3, 0, .2, 1) }
        36% { transform: translateY(-12px); animation-timing-function: ease-in-out }
        46% { transform: translateY(-10px); animation-timing-function: ease-in-out }
        56% { transform: translateY(-11px); animation-timing-function: cubic-bezier(.45, 0, .55, 1) }
        80% { transform: translateY(.8px); animation-timing-function: ease-out }
        88%, 100% { transform: translateY(0) }
      }
      @keyframes K_pull {
        0%, 8% { transform: scaleY(1); animation-timing-function: cubic-bezier(.3, 0, .2, 1) }
        36% { transform: scaleY(1.558); animation-timing-function: ease-in-out }
        46% { transform: scaleY(1.465); animation-timing-function: ease-in-out }
        56% { transform: scaleY(1.512); animation-timing-function: cubic-bezier(.45, 0, .55, 1) }
        80% { transform: scaleY(.963); animation-timing-function: ease-out }
        88%, 100% { transform: scaleY(1) }
      }
      @keyframes K_dangle {
        0%, 30%, 100% { transform: rotate(0deg) }
        42% { transform: rotate(4deg) }
        54% { transform: rotate(-3deg) }
        66% { transform: rotate(1.5deg) }
        80% { transform: rotate(0deg) }
      }
      @keyframes K_pinch {
        0%, 8%, 88%, 100% { transform: rotate(0deg) }
        36% { transform: rotate(-4deg) }
        56% { transform: rotate(-2deg) }
      }
      @keyframes K_drop {
        0%, 40% { transform: translateY(-4px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .5) }
        43% { opacity: 1 }
        56% { transform: translateY(11.5px); opacity: 1 }
        57%, 100% { transform: translateY(11.5px); opacity: 0 }
      }
      @keyframes K_ripple {
        0%, 56% { transform: scale(.3); opacity: 0 }
        58% { opacity: .9 }
        80%, 100% { transform: scale(2.2); opacity: 0 }
      }
      @keyframes K_vapor {
        0% { transform: translateY(4px) scaleX(.8); opacity: 0 }
        30% { opacity: .9 }
        100% { transform: translateY(-12px) scaleX(1.1); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "popcorn-pop",
    name: "Popcorn Pop",
    category: "food",
    description:
      "Fluffy kernels burst out of a striped popcorn bucket one at a time, tumbling through the air and dropping back onto the buttery pile.",
    details:
      "Pop, pop, pop: every quarter beat a kernel puffs open, shoots up with a little burst, spins and drops back into the heap, which jiggles each time it is hit. Because the pops overlap, there is always something in the air. It is a natural pick for streaming and movie sites, cinema ticketing, game nights, snack brands and trivia apps between rounds. Stripes colors the bucket stripes and the pop bursts, Popcorn sets the fluffy kernels, and Butter adds the golden spots; switch Stripes to blue for a carnival-style bucket.",
    tags: ["popcorn", "pop", "movie", "snack", "bounce", "fun"],
    kind: "particles",
    colors: { primary: "#ef4444", secondary: "#fef3c7", accent: "#fbbf24" },
    colorLabels: { primary: "Stripes", secondary: "Popcorn", accent: "Butter" },
    duration: 1.6,
    popularity: 70,
    svg: `
      <path class="burst" d="M42 30.5v-4M37.5 32l-2.8-2.8M46.5 32l2.8-2.8"/>
      <path class="burst b2" d="M52 28.5v-4M47.5 30l-2.8-2.8M56.5 30l2.8-2.8"/>
      <path class="burst b3" d="M61 31.5v-4M56.5 33l-2.8-2.8M65.5 33l2.8-2.8"/>
      <path class="burst b4" d="M47 29.5v-4M42.5 31l-2.8-2.8M51.5 31l2.8-2.8"/>
      <g class="kx"><g class="ky"><g class="kr">
        <path class="corn" d="M37 45.2A3.2 3.2 0 0 1 38.4 39.6A3.5 3.5 0 0 1 44.2 38.6A3.3 3.3 0 0 1 47.2 43.8A3 3 0 0 1 44.8 48.6A2.8 2.8 0 0 1 40.4 48.8A2.9 2.9 0 0 1 37 45.2Z"/>
        <path class="crease" d="M39.6 44.6q2-1.8 4 0"/><circle class="spot" cx="44.6" cy="41.2" r="1.1"/>
      </g></g></g>
      <g class="kx k2"><g class="ky"><g class="kr">
        <path class="corn" d="M47 45.2A3.2 3.2 0 0 1 48.4 39.6A3.5 3.5 0 0 1 54.2 38.6A3.3 3.3 0 0 1 57.2 43.8A3 3 0 0 1 54.8 48.6A2.8 2.8 0 0 1 50.4 48.8A2.9 2.9 0 0 1 47 45.2Z"/>
        <path class="crease" d="M49.6 44.6q2-1.8 4 0"/><circle class="spot" cx="49.4" cy="41.4" r="1.1"/>
      </g></g></g>
      <g class="kx k3"><g class="ky"><g class="kr">
        <path class="corn" d="M56 45.2A3.2 3.2 0 0 1 57.4 39.6A3.5 3.5 0 0 1 63.2 38.6A3.3 3.3 0 0 1 66.2 43.8A3 3 0 0 1 63.8 48.6A2.8 2.8 0 0 1 59.4 48.8A2.9 2.9 0 0 1 56 45.2Z"/>
        <path class="crease" d="M58.6 44.6q2-1.8 4 0"/><circle class="spot" cx="63.6" cy="41.2" r="1.1"/>
      </g></g></g>
      <g class="kx k4"><g class="ky"><g class="kr">
        <path class="corn" d="M42 45.2A3.2 3.2 0 0 1 43.4 39.6A3.5 3.5 0 0 1 49.2 38.6A3.3 3.3 0 0 1 52.2 43.8A3 3 0 0 1 49.8 48.6A2.8 2.8 0 0 1 45.4 48.8A2.9 2.9 0 0 1 42 45.2Z"/>
        <path class="crease" d="M44.6 44.6q2-1.8 4 0"/><circle class="spot" cx="44.4" cy="41.4" r="1.1"/>
      </g></g></g>
      <g class="heap">
        <path class="corn" d="M28 52A6.5 6.5 0 0 1 31 41A7 7 0 0 1 42 35.5A7.5 7.5 0 0 1 54 33.5A7 7 0 0 1 64.5 37.5A6.5 6.5 0 0 1 71.5 44A5 5 0 0 1 72 52Z"/>
        <path class="crease" d="M36.5 46q3-3 6 0M47 41q3-3 6 0M58.5 45.5q2.5-2.5 5 0M45 50q3-2.4 6 0"/>
        <ellipse class="spot" cx="35" cy="44" rx="2.4" ry="1.6"/>
        <ellipse class="spot" cx="56" cy="39" rx="2.2" ry="1.5"/>
        <ellipse class="spot" cx="66" cy="47" rx="1.9" ry="1.3"/>
      </g>
      <path class="tub" d="M27 52H73L66 89H34Z"/>
      <path class="stripe" d="M27 52H33.6L38.6 89H34ZM40.1 52H46.7L47.7 89H43.1ZM53.3 52H59.9L56.9 89H52.3ZM66.4 52H73L66 89H61.4Z"/>
      <path class="tub-shade" d="M61 52H73L66 89H57.5Z"/>
      <path class="tub-line" d="M27 52H73L66 89H34Z"/>
      <rect class="rim" x="24.5" y="48.5" width="51" height="6.5" rx="3.2"/>`,
    css: `
      ROOT .corn { fill: var(--c2); stroke: #43291c; stroke-width: 2; stroke-linejoin: round }
      ROOT .spot { fill: var(--c3) }
      ROOT .crease { fill: none; stroke: #43291c; stroke-width: 1.3; stroke-linecap: round; opacity: .35 }
      ROOT .tub { fill: #fffaf0 }
      ROOT .stripe { fill: var(--c1) }
      ROOT .tub-shade { fill: #43291c; opacity: .12 }
      ROOT .tub-line { fill: none; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .rim { fill: #fffaf0; stroke: #43291c; stroke-width: 2.2 }
      ROOT .heap { transform-origin: 50px 52px; animation: K_jiggle calc(var(--d) / 4) ease-out infinite }
      ROOT .kx { animation: K_x1 var(--d) linear infinite }
      ROOT .ky { animation: K_y var(--d) infinite }
      ROOT .kr { transform-box: fill-box; transform-origin: center; animation: K_r1 var(--d) linear infinite }
      ROOT .k2 { animation-name: K_x2 }
      ROOT .k3 { animation-name: K_x3 }
      ROOT .k4 { animation-name: K_x4 }
      ROOT .k2 .kr, ROOT .k4 .kr { animation-name: K_r2 }
      ROOT .k2, ROOT .k2 .ky, ROOT .k2 .kr, ROOT .b2 { animation-delay: calc(var(--d) * -0.75) }
      ROOT .k3, ROOT .k3 .ky, ROOT .k3 .kr, ROOT .b3 { animation-delay: calc(var(--d) * -0.5) }
      ROOT .k4, ROOT .k4 .ky, ROOT .k4 .kr, ROOT .b4 { animation-delay: calc(var(--d) * -0.25) }
      ROOT .burst { fill: none; stroke: var(--c1); stroke-width: 1.8; stroke-linecap: round; opacity: 0;
                    transform-box: fill-box; transform-origin: 50% 100%; animation: K_burst var(--d) ease-out infinite }
      @keyframes K_y {
        0% { transform: translateY(9px); animation-timing-function: cubic-bezier(.15, .7, .35, 1) }
        38% { transform: translateY(-28px); animation-timing-function: cubic-bezier(.6, 0, .85, .45) }
        74%, 100% { transform: translateY(9px) }
      }
      @keyframes K_x1 { 0% { transform: translateX(0) } 74%, 100% { transform: translateX(-10px) } }
      @keyframes K_x2 { 0% { transform: translateX(0) } 74%, 100% { transform: translateX(7px) } }
      @keyframes K_x3 { 0% { transform: translateX(0) } 74%, 100% { transform: translateX(6px) } }
      @keyframes K_x4 { 0% { transform: translateX(0) } 74%, 100% { transform: translateX(-5px) } }
      @keyframes K_r1 {
        0% { transform: rotate(0deg) scale(.45) }
        12% { transform: rotate(40deg) scale(1.2, .9) }
        20% { transform: rotate(70deg) scale(.95, 1.08) }
        28% { transform: rotate(100deg) scale(1) }
        74%, 100% { transform: rotate(260deg) scale(1) }
      }
      @keyframes K_r2 {
        0% { transform: rotate(0deg) scale(.45) }
        12% { transform: rotate(-40deg) scale(1.2, .9) }
        20% { transform: rotate(-70deg) scale(.95, 1.08) }
        28% { transform: rotate(-100deg) scale(1) }
        74%, 100% { transform: rotate(-240deg) scale(1) }
      }
      @keyframes K_burst {
        0%, 4% { transform: scale(.4); opacity: 0 }
        9% { transform: scale(1); opacity: 1 }
        22%, 100% { transform: scale(1.5); opacity: 0 }
      }
      @keyframes K_jiggle {
        0% { transform: scale(1, 1) }
        14% { transform: scale(1.035, .95) }
        36% { transform: scale(.985, 1.03) }
        60%, 100% { transform: scale(1, 1) }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "bubble-tea",
    name: "Bubble Tea",
    category: "food",
    description:
      "Milk tea sloshes gently in a boba cup as tapioca pearls bob up and down, the striped straw wiggles and a pearl gets slurped up to the top.",
    details:
      "Playful and a little bit trendy, this cup never sits still: the tea surface rolls in two layered waves, pearls drift at their own pace, and the straw wobbles before another pearl travels up it. The motion is soft enough for long waits but lively enough to feel like a treat. Use it for boba shops, cafe and drink menus, food court ordering, campus apps or any brand with a youthful, sweet tone. Tea colors the drink, Pearls sets the tapioca, and Straw tints the straw; try a taro purple tea with a mint straw for a pastel twist.",
    tags: ["bubble tea", "boba", "drink", "straw", "wobble", "trendy"],
    kind: "wave",
    colors: { primary: "#d6a77a", secondary: "#3b2418", accent: "#ec4899" },
    colorLabels: { primary: "Tea", secondary: "Pearls", accent: "Straw" },
    duration: 2.4,
    popularity: 74,
    svg: `
      <defs><clipPath id="bubble-tea-cup"><path d="M30 31L35.2 85Q35.6 88.5 39 88.5H61Q64.4 88.5 64.8 85L70 31Z"/></clipPath></defs>
      <path class="glass" d="M30 31L35.2 85Q35.6 88.5 39 88.5H61Q64.4 88.5 64.8 85L70 31Z"/>
      <g clip-path="url(#bubble-tea-cup)">
        <g class="bob">
          <path class="tea back" d="M26 43q5-2.6 10 0t10 0t10 0t10 0t10 0t10 0t10 0V92H26Z"/>
          <path class="foam back" d="M26 43q5-2.6 10 0t10 0t10 0t10 0t10 0t10 0t10 0V92H26Z"/>
          <path class="tea main" d="M26 45.5q5-2.2 10 0t10 0t10 0t10 0t10 0t10 0t10 0V92H26Z"/>
        </g>
      </g>
      <rect class="lid" x="27.5" y="26.5" width="45" height="6" rx="2.6"/>
      <g class="straw">
        <path class="straw-o" d="M61 5L48.5 80"/>
        <path class="straw-f" d="M61 5L48.5 80"/>
        <circle class="sip" cx="49.6" cy="73.5" r="2.2"/>
      </g>
      <g clip-path="url(#bubble-tea-cup)">
        <g class="bob"><path class="tea tint main" d="M26 45.5q5-2.2 10 0t10 0t10 0t10 0t10 0t10 0t10 0V92H26Z"/></g>
        <g class="pearl"><circle class="ball" cx="41" cy="82" r="3.3"/><circle class="glint" cx="40" cy="80.8" r=".9"/></g>
        <g class="pearl p2"><circle class="ball" cx="49" cy="84.5" r="3.3"/><circle class="glint" cx="48" cy="83.3" r=".9"/></g>
        <g class="pearl p3"><circle class="ball" cx="57.5" cy="82.5" r="3.3"/><circle class="glint" cx="56.5" cy="81.3" r=".9"/></g>
        <g class="pearl p4"><circle class="ball" cx="44" cy="75.5" r="3.3"/><circle class="glint" cx="43" cy="74.3" r=".9"/></g>
        <g class="pearl p5"><circle class="ball" cx="55" cy="76" r="3.3"/><circle class="glint" cx="54" cy="74.8" r=".9"/></g>
        <g class="pearl p6"><circle class="ball" cx="50.5" cy="67" r="3"/><circle class="glint" cx="49.6" cy="65.9" r=".8"/></g>
      </g>
      <path class="cup-line" d="M30 31L35.2 85Q35.6 88.5 39 88.5H61Q64.4 88.5 64.8 85L70 31"/>
      <path class="hl" d="M34.5 38L38 78"/>`,
    css: `
      ROOT .glass { fill: #fff; opacity: .16 }
      ROOT .tea { fill: var(--c1) }
      ROOT .foam { fill: #fff; opacity: .4 }
      ROOT .back { animation: K_waveB var(--d) linear infinite }
      ROOT .main { animation: K_wave calc(var(--d) / 2) linear infinite }
      ROOT .tint { opacity: .42 }
      ROOT .bob { animation: K_bob var(--d) ease-in-out infinite }
      ROOT .lid { fill: #fffaf0; stroke: #43291c; stroke-width: 2.2 }
      ROOT .straw { transform-origin: 56.7px 29.5px; animation: K_wiggle var(--d) ease-in-out infinite }
      ROOT .straw-o { fill: none; stroke: #43291c; stroke-width: 7.6; stroke-linecap: round }
      ROOT .straw-f { fill: none; stroke: var(--c3); stroke-width: 4.4; stroke-linecap: round }
      ROOT .sip { fill: var(--c2); opacity: 0; animation: K_sip var(--d) ease-in-out infinite }
      ROOT .ball { fill: var(--c2); stroke: #43291c; stroke-width: 1 }
      ROOT .glint { fill: #fff; opacity: .7 }
      ROOT .pearl { animation: K_drift var(--d) ease-in-out infinite }
      ROOT .p2 { animation-duration: calc(var(--d) / 2); animation-delay: calc(var(--d) * -0.2) }
      ROOT .p3 { animation-delay: calc(var(--d) * -0.6) }
      ROOT .p4 { animation-name: K_float; animation-delay: calc(var(--d) * -0.3) }
      ROOT .p5 { animation-duration: calc(var(--d) / 2); animation-delay: calc(var(--d) * -0.4) }
      ROOT .p6 { animation-name: K_float; animation-delay: calc(var(--d) * -0.8) }
      ROOT .cup-line { fill: none; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .hl { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .6 }
      @keyframes K_wave { 0% { transform: translateX(0) } 100% { transform: translateX(-20px) } }
      @keyframes K_waveB { 0% { transform: translateX(-20px) } 100% { transform: translateX(0) } }
      @keyframes K_bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(1.4px) } }
      @keyframes K_wiggle {
        0%, 100% { transform: rotate(0deg) }
        14% { transform: rotate(5deg) }
        32% { transform: rotate(-4deg) }
        50% { transform: rotate(2.5deg) }
        68% { transform: rotate(-1.2deg) }
        84% { transform: rotate(.4deg) }
      }
      @keyframes K_sip {
        0%, 18% { transform: translate(0, 0); opacity: 0 }
        24% { opacity: 1 }
        68% { transform: translate(10.2px, -59px); opacity: 1 }
        74%, 100% { transform: translate(10.2px, -59px); opacity: 0 }
      }
      @keyframes K_drift { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3.5px) } }
      @keyframes K_float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-11px) } }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ice-cream-cone",
    name: "Ice Cream Cone",
    category: "food",
    description:
      "A strawberry scoop wobbles like jelly on its waffle cone as it rocks side to side, while a sweet drip slowly forms and slurps back up.",
    details:
      "Soft-serve energy in loader form: the cone rocks gently and the scoop lags behind it, squashing and leaning like it might slide off, with the cherry swinging a beat later still. Meanwhile a drip creeps down over the cone and pulls back up just in time. It brings a summery, carefree mood to ice cream parlors, dessert menus, kids' sites, seasonal sales and anything with a candy-colored brand. Scoop sets the ice cream and the drip, Cone colors the waffle, and Cherry tints the topping; a mint scoop with chocolate chips looks great with the default cone.",
    tags: ["ice cream", "cone", "jelly", "wobble", "dessert", "summer"],
    kind: "morph",
    colors: { primary: "#f472b6", secondary: "#dda15e", accent: "#ef4444" },
    colorLabels: { primary: "Scoop", secondary: "Cone", accent: "Cherry" },
    duration: 1.6,
    popularity: 76,
    svg: `
      <defs><clipPath id="ice-cream-cone-wafer"><path d="M35.5 58L50 90.5L64.5 58Z"/></clipPath></defs>
      <g class="rock">
        <path class="cone" d="M35.5 58L48.2 89.2Q50 91.8 51.8 89.2L64.5 58Z"/>
        <g clip-path="url(#ice-cream-cone-wafer)">
          <path class="waffle" d="M30 62L56 92M37 56L63 86M45 54L67 79M53 54L69 72M70 62L44 92M63 56L37 86M55 54L33 79M47 54L31 72"/>
          <path class="cone-shade" d="M51 56H66L51 92Z"/>
        </g>
        <path class="cone-line" d="M35.5 58L48.2 89.2Q50 91.8 51.8 89.2L64.5 58"/>
        <rect class="rim" x="33.5" y="54" width="33" height="6" rx="3"/>
        <path class="drip" d="M49.6 55L49.9 64A1.9 1.9 0 1 0 53.5 64L53.2 55Z"/>
        <g class="jelly">
          <path class="scoop" d="M32.5 44C32.5 30.5 40 22.5 50 22.5C60 22.5 67.5 30.5 67.5 44C67.5 48 66.6 51 64.6 53C64.8 56.4 60.6 57.4 59.8 54.8C58 56 55.8 56.2 54.4 55.4C54 59.6 48.8 59.8 48.6 55.8C46.4 56.6 43.6 56.4 41.8 55.4C41.2 58.4 36.6 58.2 36.8 55C34 53 32.5 49 32.5 44Z"/>
          <ellipse class="chip" cx="43" cy="35" rx="1.7" ry="1.2"/>
          <ellipse class="chip" cx="58.5" cy="32" rx="1.6" ry="1.1"/>
          <ellipse class="chip" cx="56" cy="45.5" rx="1.7" ry="1.2"/>
          <ellipse class="chip" cx="41.5" cy="48" rx="1.5" ry="1.1"/>
          <path class="shine" d="M37.5 39Q38.5 30 46.5 26.8"/>
          <circle class="dot" cx="37.4" cy="43.4" r="1.2"/>
          <g class="cherry">
            <path class="stem" d="M52 17.2C53 14 54.6 12 57 10.6"/>
            <circle class="berry" cx="51" cy="21.4" r="4.7"/>
            <circle class="dot" cx="49.4" cy="19.8" r="1.2"/>
          </g>
        </g>
      </g>`,
    css: `
      ROOT .cone, ROOT .rim { fill: var(--c2) }
      ROOT .rim { stroke: #43291c; stroke-width: 2.2 }
      ROOT .waffle { fill: none; stroke: #43291c; stroke-width: 1.4; opacity: .3 }
      ROOT .cone-shade { fill: #43291c; opacity: .12 }
      ROOT .cone-line { fill: none; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .scoop, ROOT .drip { fill: var(--c1); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .chip { fill: #6b3f2a }
      ROOT .shine { fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; opacity: .75 }
      ROOT .dot { fill: #fff; opacity: .8 }
      ROOT .berry { fill: var(--c3); stroke: #43291c; stroke-width: 2 }
      ROOT .stem { fill: none; stroke: #43291c; stroke-width: 1.8; stroke-linecap: round }
      ROOT .rock { transform-origin: 50px 90px; animation: K_rock var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
      ROOT .jelly { transform-origin: 50px 57px; animation: K_jelly var(--d) ease-in-out infinite }
      ROOT .cherry { transform-origin: 51px 25px; animation: K_cherry var(--d) ease-in-out infinite }
      ROOT .drip { transform-origin: 51.4px 55px; animation: K_drip calc(var(--d) * 2) infinite }
      @keyframes K_rock { 0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) } }
      @keyframes K_jelly {
        0% { transform: skewX(-4deg) scale(1.07, .93) }
        12% { transform: skewX(3deg) scale(.94, 1.07) }
        30% { transform: skewX(8deg) scale(1.02, .98) }
        50% { transform: skewX(4deg) scale(1.07, .93) }
        62% { transform: skewX(-3deg) scale(.94, 1.07) }
        80% { transform: skewX(-8deg) scale(1.02, .98) }
        100% { transform: skewX(-4deg) scale(1.07, .93) }
      }
      @keyframes K_cherry {
        0%, 100% { transform: rotate(2deg) }
        35% { transform: rotate(14deg) }
        50% { transform: rotate(-2deg) }
        85% { transform: rotate(-14deg) }
      }
      @keyframes K_drip {
        0% { transform: scaleY(.2); animation-timing-function: cubic-bezier(.4, 0, .9, .6) }
        58% { transform: scaleY(1.1); animation-timing-function: ease-out }
        64% { transform: scaleY(1); animation-timing-function: cubic-bezier(.6, 0, .3, 1) }
        76% { transform: scaleY(.1); animation-timing-function: ease-out }
        86% { transform: scaleY(.28); animation-timing-function: ease-in-out }
        100% { transform: scaleY(.2) }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "pancake-flip",
    name: "Pancake Flip",
    category: "food",
    description:
      "A quick flick of the frying pan sends a golden pancake spinning through the air, flipping over once before it lands back with a soft squash.",
    details:
      "Brunch-time showmanship: the pan dips, flicks up, and the pancake sails high, turning over in a smooth faux-3D flip before dropping back with a squash and a wisp of sizzle. The pan even gives a little catch-dip on landing, so the moment feels weighty and real. It is a good match for breakfast cafes, diner menus, recipe and cooking blogs, kitchen gadgets and weekend meal planners. Pancake colors the golden top, Pan sets the skillet, and Handle tints the wooden grip; a deep blue pan with a honey pancake keeps it cheerful on dark themes.",
    tags: ["pancake", "flip", "frying pan", "breakfast", "squash", "cooking"],
    kind: "bounce",
    colors: { primary: "#f2a541", secondary: "#475569", accent: "#b45309" },
    colorLabels: { primary: "Pancake", secondary: "Pan", accent: "Handle" },
    duration: 1.8,
    popularity: 68,
    svg: `
      <g transform="translate(3 0)">
      <path class="sizzle" d="M40.5 61c-2-2.5 2-4.5 0-7"/>
      <path class="sizzle z2" d="M79.5 61c2-2.5-2-4.5 0-7"/>
      <g class="pan">
        <path class="grip-o" d="M26 69.4L10 66"/>
        <path class="grip-f" d="M26 69.4L10 66"/>
        <path class="arm-o" d="M38 71.6L24.5 69"/>
        <path class="arm-f" d="M38 71.6L24.5 69"/>
        <ellipse class="pan-in" cx="60" cy="68" rx="25" ry="7.5"/>
        <ellipse class="pan-dk" cx="60" cy="68" rx="25" ry="7.5"/>
      </g>
      <g class="air"><g class="flip"><g class="squash">
        <path class="edge" d="M42 65.5V68.5A18 5.4 0 0 0 78 68.5V65.5A18 5.4 0 0 0 42 65.5Z"/>
        <ellipse class="top" cx="60" cy="65.5" rx="18" ry="5.4"/>
        <path class="bake" d="M51 64.6h3M62 66.9h2.8M67 63.6h2M55.5 67.6h1.8"/>
        <path class="glaze" d="M47 64Q51.5 61.4 58 61"/>
      </g></g></g>
      <g class="pan">
        <path class="body" d="M35 68A25 7.5 0 0 0 85 68L81.2 79Q80.2 82 76.6 82H43.4Q39.8 82 38.8 79Z"/>
        <path class="rimlight" d="M41 73.4Q60 78.8 79 73.4"/>
      </g>
      </g>`,
    css: `
      ROOT .grip-o, ROOT .arm-o { fill: none; stroke: #43291c; stroke-linecap: round }
      ROOT .grip-o { stroke-width: 8 }
      ROOT .grip-f { fill: none; stroke: var(--c3); stroke-width: 4; stroke-linecap: round }
      ROOT .arm-o { stroke-width: 5.6 }
      ROOT .arm-f { fill: none; stroke: var(--c2); stroke-width: 2; stroke-linecap: round }
      ROOT .pan-in { fill: var(--c2); stroke: #43291c; stroke-width: 2.2 }
      ROOT .pan-dk { fill: #000; opacity: .25 }
      ROOT .body { fill: var(--c2); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .rimlight { fill: none; stroke: #fff; stroke-width: 1.6; stroke-linecap: round; opacity: .35 }
      ROOT .edge { fill: #fde7b0; stroke: #43291c; stroke-width: 2 }
      ROOT .top { fill: var(--c1); stroke: #43291c; stroke-width: 1.6 }
      ROOT .bake { fill: none; stroke: #43291c; stroke-width: 1.2; stroke-linecap: round; opacity: .3 }
      ROOT .glaze { fill: none; stroke: #fff; stroke-width: 1.4; stroke-linecap: round; opacity: .5 }
      ROOT .pan { transform-origin: 10px 66px; animation: K_toss var(--d) ease-in-out infinite }
      ROOT .air { animation: K_air var(--d) infinite }
      ROOT .flip { transform-origin: 60px 67px; animation: K_flip var(--d) linear infinite }
      ROOT .squash { transform-origin: 60px 74px; animation: K_squash var(--d) ease-in-out infinite }
      ROOT .sizzle { fill: none; stroke: #c4b2a1; stroke-width: 2.2; stroke-linecap: round; opacity: 0;
                     animation: K_sizzle var(--d) ease-out infinite }
      ROOT .z2 { animation-delay: calc(var(--d) * -0.05) }
      @keyframes K_toss {
        0%, 2% { transform: rotate(0deg) translateY(0) }
        9% { transform: rotate(3deg) translateY(1px) }
        16% { transform: rotate(-9deg) translateY(-2px) }
        28%, 52% { transform: rotate(0deg) translateY(0) }
        57% { transform: rotate(2.5deg) translateY(1.5px) }
        65% { transform: rotate(-1deg) translateY(-.4px) }
        72%, 100% { transform: rotate(0deg) translateY(0) }
      }
      @keyframes K_air {
        0%, 2% { transform: translateY(0); animation-timing-function: ease-in-out }
        9% { transform: translateY(2.4px); animation-timing-function: cubic-bezier(.5, 0, .7, .4) }
        16% { transform: translateY(-11px); animation-timing-function: cubic-bezier(.15, .6, .4, 1) }
        34% { transform: translateY(-40px); animation-timing-function: cubic-bezier(.6, 0, .85, .4) }
        55% { transform: translateY(2.6px); animation-timing-function: ease-out }
        64% { transform: translateY(-.6px); animation-timing-function: ease-in-out }
        71%, 100% { transform: translateY(0) }
      }
      @keyframes K_flip {
        0%, 16% { transform: rotate(0deg) scaleY(1) }
        20.75% { transform: rotate(-2deg) scaleY(.707) }
        25.5% { transform: rotate(-4deg) scaleY(0) }
        30.25% { transform: rotate(-6deg) scaleY(-.707) }
        35% { transform: rotate(-8deg) scaleY(-1) }
        39.75% { transform: rotate(-6deg) scaleY(-.707) }
        44.5% { transform: rotate(-4deg) scaleY(0) }
        49.25% { transform: rotate(-2deg) scaleY(.707) }
        54%, 100% { transform: rotate(0deg) scaleY(1) }
      }
      @keyframes K_squash {
        0%, 4%, 54%, 100% { transform: scale(1, 1) }
        10% { transform: scale(1.06, .88) }
        16% { transform: scale(.96, 1.08) }
        22% { transform: scale(1, 1) }
        57% { transform: scale(1.14, .66) }
        63% { transform: scale(.95, 1.1) }
        69% { transform: scale(1.03, .96) }
        75% { transform: scale(1, 1) }
      }
      @keyframes K_sizzle {
        0%, 56% { transform: translateY(2px); opacity: 0 }
        62% { opacity: .9 }
        90%, 100% { transform: translateY(-9px); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "juice-pour",
    name: "Juice Pour",
    category: "food",
    description:
      "A pitcher tips forward and pours a ribbon of fresh orange juice into a glass, which fills to the brim with bubbles before draining for the next pour.",
    details:
      "Bright and refreshing, this loader tells a tiny story every cycle: the pitcher tilts, a stream of juice falls, the glass fills with rising bubbles, and the pitcher straightens up as the glass quietly empties again. Because the fill level climbs steadily, it reads naturally as progress without showing a number. Try it for juice bars and smoothie shops, grocery and fresh-produce delivery, healthy-eating apps or a breakfast menu. Juice colors the stream and the drink, Pitcher sets the jug, and Citrus slice tints the garnish; switch Juice to a deep berry pink for a smoothie version.",
    tags: ["juice", "pour", "glass", "fill", "fresh", "drink"],
    kind: "progress",
    colors: { primary: "#fb923c", secondary: "#60a5fa", accent: "#a3e635" },
    colorLabels: { primary: "Juice", secondary: "Pitcher", accent: "Citrus slice" },
    duration: 3.2,
    popularity: 66,
    svg: `
      <defs><clipPath id="juice-pour-glass"><path d="M54.6 45L57.4 85Q57.7 88 60.6 88H75.4Q78.3 88 78.6 85L81.4 45Z"/></clipPath></defs>
      <path class="glass" d="M54 44L57 85.5Q57.4 89 61 89H75Q78.6 89 79 85.5L82 44Z"/>
      <path class="stream" pathLength="100" d="M67.6 30C68.4 34 68.5 38 68.5 44V87"/>
      <g clip-path="url(#juice-pour-glass)">
        <rect class="juice" x="54" y="46" width="28" height="43"/>
        <g class="level"><ellipse class="surface" cx="68" cy="46.2" rx="12.6" ry="1.5"/></g>
        <circle class="bub" cx="62.5" cy="84" r="1.3"/>
        <circle class="bub u2" cx="73" cy="85" r="1"/>
        <path class="glass-dk" d="M72 44H84V90H70Z"/>
      </g>
      <path class="glass-line" d="M54 44L57 85.5Q57.4 89 61 89H75Q78.6 89 79 85.5L82 44"/>
      <path class="hl" d="M58.4 50L60.4 81"/>
      <circle class="peel" cx="80.5" cy="45" r="6.4"/>
      <circle class="pith" cx="80.5" cy="45" r="4.4"/>
      <path class="pith seg" d="M80.5 40.6V49.4M76.7 42.8L84.3 47.2M76.7 47.2L84.3 42.8"/>
      <g class="jug">
        <path class="handle-o" d="M16.5 27C7 27 7 45 16.5 45"/>
        <path class="handle-f" d="M16.5 27C7 27 7 45 16.5 45"/>
        <path class="jug-body" d="M15.5 21H39L44 18.5Q43.5 21 41.5 23C40.5 33 41 44 41 52.5Q41 55 38.5 55H18Q15.5 55 15.5 52.5Z"/>
        <path class="jug-band" d="M16.5 40q2.9-2.4 5.9 0t5.9 0t5.9 0t5.9 0"/>
        <path class="jug-hl" d="M20.5 26V49"/>
      </g>`,
    css: `
      ROOT .glass { fill: #fff; opacity: .18 }
      ROOT .glass-line { fill: none; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .glass-dk { fill: #43291c; opacity: .08 }
      ROOT .hl { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .6 }
      ROOT .juice { fill: var(--c1); transform-origin: 68px 89px; animation: K_fill var(--d) infinite }
      ROOT .level { animation: K_level var(--d) infinite }
      ROOT .surface { fill: #fff; opacity: 0; animation: K_surface var(--d) infinite }
      ROOT .stream { fill: none; stroke: var(--c1); stroke-width: 3.4; stroke-linecap: round; stroke-dasharray: 100 100;
                     animation: K_stream var(--d) infinite }
      ROOT .bub { fill: #fff; opacity: 0; animation: K_bub var(--d) ease-out infinite }
      ROOT .u2 { animation-delay: calc(var(--d) * -0.92) }
      ROOT .peel { fill: var(--c3); stroke: #43291c; stroke-width: 2 }
      ROOT .pith { fill: none; stroke: #fff; stroke-width: 1.1; opacity: .85 }
      ROOT .seg { stroke-linecap: round }
      ROOT .jug { transform-origin: 41px 55px; animation: K_tilt var(--d) infinite }
      ROOT .jug-body { fill: var(--c2); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .handle-o { fill: none; stroke: #43291c; stroke-width: 7.6; stroke-linecap: round }
      ROOT .handle-f { fill: none; stroke: var(--c2); stroke-width: 3.4; stroke-linecap: round }
      ROOT .jug-band { fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; opacity: .75 }
      ROOT .jug-hl { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .4 }
      @keyframes K_tilt {
        0%, 8% { transform: rotate(0deg); animation-timing-function: cubic-bezier(.5, 0, .3, 1) }
        20% { transform: rotate(45deg); animation-timing-function: ease-in-out }
        26%, 58% { transform: rotate(42deg); animation-timing-function: cubic-bezier(.5, 0, .3, 1) }
        70% { transform: rotate(-4deg); animation-timing-function: ease-in-out }
        78%, 100% { transform: rotate(0deg) }
      }
      @keyframes K_stream {
        0%, 18% { stroke-dashoffset: 100; opacity: 0 }
        19% { stroke-dashoffset: 100; opacity: 1; animation-timing-function: cubic-bezier(.5, 0, 1, 1) }
        25%, 58% { stroke-dashoffset: 0; opacity: 1; animation-timing-function: cubic-bezier(.5, 0, 1, 1) }
        64% { stroke-dashoffset: -100; opacity: 1 }
        65%, 100% { stroke-dashoffset: -100; opacity: 0 }
      }
      @keyframes K_fill {
        0%, 22% { transform: scaleY(0) }
        24% { transform: scaleY(.04); animation-timing-function: cubic-bezier(.3, .2, .6, 1) }
        60%, 70% { transform: scaleY(1); animation-timing-function: cubic-bezier(.55, 0, .45, 1) }
        92%, 100% { transform: scaleY(0) }
      }
      @keyframes K_level {
        0%, 22% { transform: translateY(43px) }
        24% { transform: translateY(41.3px); animation-timing-function: cubic-bezier(.3, .2, .6, 1) }
        60%, 70% { transform: translateY(0); animation-timing-function: cubic-bezier(.55, 0, .45, 1) }
        92%, 100% { transform: translateY(43px) }
      }
      @keyframes K_surface { 0%, 23% { opacity: 0 } 27%, 86% { opacity: .5 } 91%, 100% { opacity: 0 } }
      @keyframes K_bub {
        0%, 32% { transform: translateY(0); opacity: 0 }
        35% { opacity: .85 }
        58% { transform: translateY(-15px); opacity: .85 }
        61%, 100% { transform: translateY(-15px); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "burger-stack",
    name: "Burger Stack",
    category: "food",
    description:
      "Bun, patty, cheese, lettuce, tomato and a sesame top drop onto the plate one by one, each landing with a bounce before the finished burger lifts away.",
    details:
      "Building a burger is oddly satisfying, and this loader plays it out layer by layer: every ingredient falls in, squashes on contact and bounces once, the finished stack gives a proud little wiggle, then the whole thing hops off the plate so the next one can begin. The steady build-up makes it a good fit for order preparation, kitchen display screens, burger joints, fast-food delivery and multi-step forms. Bun colors both halves of the bun, Patty sets the grilled meat, and Cheese tints the melting slice; a darker bun and a green patty turn it into a veggie burger.",
    tags: ["burger", "stack", "drop", "bounce", "fast food", "layers"],
    kind: "bounce",
    colors: { primary: "#e9a23b", secondary: "#8b3a1a", accent: "#fbbf24" },
    colorLabels: { primary: "Bun", secondary: "Patty", accent: "Cheese" },
    duration: 3.2,
    popularity: 78,
    svg: `
      <ellipse class="plate" cx="50" cy="84.5" rx="34" ry="5.2"/>
      <ellipse class="plate-in" cx="50" cy="84" rx="23" ry="2.8"/>
      <ellipse class="shadow" cx="50" cy="83" rx="24" ry="2.4"/>
      <g class="stack">
        <g class="layer l0"><path class="bun" d="M27.5 72.5H72.5C72.5 78.5 69 81.5 63 81.5H37C31 81.5 27.5 78.5 27.5 72.5Z"/></g>
        <g class="layer l1">
          <path class="patty" d="M26 68.8C26 66 28 64.5 31 64.5H69C72 64.5 74 66 74 68.8C74 71.6 72 73 69 73H31C28 73 26 71.6 26 68.8Z"/>
          <path class="grill" d="M33 67.4h6M44.5 69.2h7M57 67.2h6.5M64.5 70.2h4"/>
        </g>
        <g class="layer l2"><path class="cheese" d="M25.5 62H74.5V64.6H70.2L66.8 70.2L63.2 64.6H40.2L36.4 70.6L32.8 64.6H25.5Z"/></g>
        <g class="layer l3"><path class="lettuce" d="M23 60.5Q26 56.5 29.5 59.2Q33 56.2 36.5 59Q40 56.2 43.5 59Q47 56.2 50.5 59Q54 56.2 57.5 59Q61 56.2 64.5 59Q68 56.2 71.5 59.2Q75 56.5 77 60.5Q75 63.5 71 62.8Q67.5 64.6 64 62.8Q60.5 64.6 57 62.8Q53.5 64.6 50 62.8Q46.5 64.6 43 62.8Q39.5 64.6 36 62.8Q32.5 64.6 29 62.8Q25 63.5 23 60.5Z"/></g>
        <g class="layer l4">
          <path class="tomato" d="M28.5 57.2C28.5 55 30 54 32.5 54H45.5C48 54 49.5 55 49.5 57.2C49.5 59.2 48 60 45.5 60H32.5C30 60 28.5 59.2 28.5 57.2ZM50.5 57.2C50.5 55 52 54 54.5 54H67.5C70 54 71.5 55 71.5 57.2C71.5 59.2 70 60 67.5 60H54.5C52 60 50.5 59.2 50.5 57.2Z"/>
          <path class="juicy" d="M32 56h5M54 56h5"/>
        </g>
        <g class="layer l5">
          <path class="bun" d="M27 55.5C27 39 37 30 50 30C63 30 73 39 73 55.5C73 57 72 57.8 70.5 57.8H29.5C28 57.8 27 57 27 55.5Z"/>
          <path class="crown" d="M34 45Q35.5 36.5 44 33.2"/>
          <ellipse class="seed" cx="43" cy="39" rx="1.5" ry=".9"/>
          <ellipse class="seed" cx="52" cy="35.6" rx="1.5" ry=".9"/>
          <ellipse class="seed" cx="60.5" cy="40" rx="1.5" ry=".9"/>
          <ellipse class="seed" cx="48" cy="45.5" rx="1.5" ry=".9"/>
          <ellipse class="seed" cx="38" cy="49" rx="1.5" ry=".9"/>
          <ellipse class="seed" cx="64" cy="48.6" rx="1.5" ry=".9"/>
          <ellipse class="seed" cx="56" cy="51" rx="1.5" ry=".9"/>
        </g>
      </g>`,
    css: `
      ROOT .plate { fill: #e7e5e4; stroke: #43291c; stroke-width: 2.2 }
      ROOT .plate-in { fill: #43291c; opacity: .08 }
      ROOT .shadow { fill: #43291c; opacity: .2; transform-box: fill-box; transform-origin: center; animation: K_shadow var(--d) ease-in-out infinite }
      ROOT .bun { fill: var(--c1); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .patty { fill: var(--c2); stroke: #43291c; stroke-width: 2.2 }
      ROOT .grill { fill: none; stroke: #fff; stroke-width: 1.4; stroke-linecap: round; opacity: .3 }
      ROOT .cheese { fill: var(--c3); stroke: #43291c; stroke-width: 2; stroke-linejoin: round }
      ROOT .lettuce { fill: #84cc16; stroke: #43291c; stroke-width: 2; stroke-linejoin: round }
      ROOT .tomato { fill: #ef4444; stroke: #43291c; stroke-width: 2 }
      ROOT .juicy, ROOT .crown { fill: none; stroke: #fff; stroke-linecap: round }
      ROOT .juicy { stroke-width: 1.3; opacity: .5 }
      ROOT .crown { stroke-width: 2.6; opacity: .55 }
      ROOT .seed { fill: #fffaf0 }
      ROOT .stack { transform-origin: 50px 82px; animation: K_stack var(--d) infinite }
      ROOT .layer { opacity: 0 }
      ROOT .l0 { transform-origin: 50px 81.5px; animation: K_l0 var(--d) infinite }
      ROOT .l1 { transform-origin: 50px 73px; animation: K_l1 var(--d) infinite }
      ROOT .l2 { transform-origin: 50px 66px; animation: K_l2 var(--d) infinite }
      ROOT .l3 { transform-origin: 50px 63px; animation: K_l3 var(--d) infinite }
      ROOT .l4 { transform-origin: 50px 60px; animation: K_l4 var(--d) infinite }
      ROOT .l5 { transform-origin: 50px 58px; animation: K_l5 var(--d) infinite }
      ROOT .stack, ROOT .layer, ROOT .shadow { animation-delay: calc(var(--d) * -0.62) }
      @keyframes K_l0 {
        0%, 3% { transform: translateY(-34px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        5% { opacity: 1 }
        9% { transform: translateY(0) scale(1.1, .78); animation-timing-function: ease-out }
        12% { transform: translateY(-3px) scale(.97, 1.04); animation-timing-function: ease-in }
        15%, 100% { transform: translateY(0) scale(1); opacity: 1 }
      }
      @keyframes K_l1 {
        0%, 11% { transform: translateY(-34px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        13% { opacity: 1 }
        17% { transform: translateY(0) scale(1.1, .78); animation-timing-function: ease-out }
        20% { transform: translateY(-3px) scale(.97, 1.04); animation-timing-function: ease-in }
        23%, 100% { transform: translateY(0) scale(1); opacity: 1 }
      }
      @keyframes K_l2 {
        0%, 19% { transform: translateY(-32px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        21% { opacity: 1 }
        25% { transform: translateY(0) scale(1.08, .7); animation-timing-function: ease-out }
        28% { transform: translateY(-2.5px) scale(.97, 1.06); animation-timing-function: ease-in }
        31%, 100% { transform: translateY(0) scale(1); opacity: 1 }
      }
      @keyframes K_l3 {
        0%, 27% { transform: translateY(-30px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        29% { opacity: 1 }
        33% { transform: translateY(0) scale(1.08, .72); animation-timing-function: ease-out }
        36% { transform: translateY(-2.5px) scale(.97, 1.05); animation-timing-function: ease-in }
        39%, 100% { transform: translateY(0) scale(1); opacity: 1 }
      }
      @keyframes K_l4 {
        0%, 35% { transform: translateY(-30px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        37% { opacity: 1 }
        41% { transform: translateY(0) scale(1.1, .75); animation-timing-function: ease-out }
        44% { transform: translateY(-2.5px) scale(.97, 1.04); animation-timing-function: ease-in }
        47%, 100% { transform: translateY(0) scale(1); opacity: 1 }
      }
      @keyframes K_l5 {
        0%, 44% { transform: translateY(-26px); opacity: 0; animation-timing-function: cubic-bezier(.5, 0, .9, .6) }
        46% { opacity: 1 }
        51% { transform: translateY(0) scale(1.08, .84); animation-timing-function: ease-out }
        55% { transform: translateY(-4px) scale(.97, 1.04); animation-timing-function: ease-in }
        59%, 100% { transform: translateY(0) scale(1); opacity: 1 }
      }
      @keyframes K_stack {
        0%, 59% { transform: translateY(0) scale(1); opacity: 1; animation-timing-function: ease-in-out }
        63% { transform: translateY(0) scale(1.04, .95); animation-timing-function: ease-in-out }
        68% { transform: translateY(0) scale(.98, 1.02); animation-timing-function: ease-in-out }
        72%, 79% { transform: translateY(0) scale(1); animation-timing-function: ease-in-out }
        84% { transform: translateY(1px) scale(1.06, .92); opacity: 1; animation-timing-function: cubic-bezier(.2, .6, .4, 1) }
        88% { transform: translateY(-14px) scale(.94, 1.08); opacity: 1; animation-timing-function: ease-in }
        92%, 100% { transform: translateY(-22px) scale(.6, .7); opacity: 0 }
      }
      @keyframes K_shadow {
        0%, 3% { transform: scale(0, 1); opacity: 0 }
        9% { transform: scale(.85, 1); opacity: .2 }
        59%, 84% { transform: scale(1, 1); opacity: .2 }
        91%, 100% { transform: scale(.4, 1); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "boiling-pot",
    name: "Boiling Pot",
    category: "food",
    description:
      "A cooking pot bubbles over a lively flame: the lid rattles, then pops up to let out big puffs of steam while foam bubbles at the rim.",
    details:
      "You can almost hear this one: the lid chatters in a nervous little rattle, builds pressure, then jumps up to release a pair of fluffy steam clouds before settling back down. Bubbles foam along the rim and three flames flicker underneath, so the pot always looks busy. It is perfect for recipe sites, cooking classes, meal-prep and kitchen apps, or a playful \"something's cooking\" message while content is prepared. Pot colors the pot and lid, Steam fills the puffs and foam, and Flame tints the burner; a classic red enamel pot with a blue flame is a fun alternative.",
    tags: ["pot", "boiling", "steam", "lid", "cooking", "kitchen"],
    kind: "pulse",
    colors: { primary: "#14b8a6", secondary: "#f1f5f9", accent: "#f59e0b" },
    colorLabels: { primary: "Pot", secondary: "Steam", accent: "Flame" },
    duration: 2,
    popularity: 64,
    svg: `
      <path class="flame" d="M37 80.5C40.5 84.5 41.8 87 41.4 89.3Q37 93.6 32.6 89.3C32.2 87 33.5 84.5 37 80.5Z"/>
      <path class="flame f2" d="M50 79C54 83.6 55.4 86.6 55 89.3Q50 94 45 89.3C44.6 86.6 46 83.6 50 79Z"/>
      <path class="flame f3" d="M63 80.5C66.5 84.5 67.8 87 67.4 89.3Q63 93.6 58.6 89.3C58.2 87 59.5 84.5 63 80.5Z"/>
      <path class="core" d="M50 84.5C52 86.8 52.6 88.4 52.3 89.8Q50 92 47.7 89.8C47.4 88.4 48 86.8 50 84.5Z"/>
      <g transform="translate(0 -4)">
      <path class="pot" d="M15.5 53.5H24V60.5H15.5Q12.5 60.5 12.5 57Q12.5 53.5 15.5 53.5ZM84.5 53.5H76V60.5H84.5Q87.5 60.5 87.5 57Q87.5 53.5 84.5 53.5Z"/>
      <path class="pot" d="M24 48V73C24 79 27.5 82.5 33 82.5H67C72.5 82.5 76 79 76 73V48Z"/>
      <path class="pot-shade" d="M63 49H75V73C75 78.5 72 81.5 67 81.5H61Z"/>
      <path class="hl" d="M29.5 54V71"/>
      <rect class="pot" x="21.5" y="44.5" width="57" height="5.6" rx="2.8"/>
      <path class="puff pL" d="M21 42.5A3 3 0 0 1 23 37.5A3.6 3.6 0 0 1 29.5 37.5A3 3 0 0 1 31 42.9Z"/>
      <path class="puff pR" d="M69 42.5A3 3 0 0 1 71 37.5A3.6 3.6 0 0 1 77.5 37.5A3 3 0 0 1 79 42.9Z"/>
      <path class="puff pL big" d="M21 42.5A3 3 0 0 1 23 37.5A3.6 3.6 0 0 1 29.5 37.5A3 3 0 0 1 31 42.9Z"/>
      <path class="puff pR big" d="M69 42.5A3 3 0 0 1 71 37.5A3.6 3.6 0 0 1 77.5 37.5A3 3 0 0 1 79 42.9Z"/>
      <g class="lid">
        <path class="pot" d="M25 45C25 35 36.5 28.5 50 28.5C63.5 28.5 75 35 75 45Z"/>
        <path class="lid-hl" d="M31.5 40Q36 33.2 45.5 31.4"/>
        <path class="pot" d="M45.5 29V26Q45.5 23.5 48 23.5H52Q54.5 23.5 54.5 26V29Z"/>
        <rect class="pot" x="23" y="43" width="54" height="3.6" rx="1.8"/>
      </g>
      <circle class="foam" cx="31" cy="44" r="2.4"/>
      <circle class="foam b2" cx="42" cy="44.6" r="2"/>
      <circle class="foam b3" cx="58" cy="44.4" r="2.2"/>
      <circle class="foam b4" cx="69" cy="44" r="2"/>
      </g>`,
    css: `
      ROOT .pot { fill: var(--c1); stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .pot-shade { fill: #43291c; opacity: .14 }
      ROOT .hl, ROOT .lid-hl { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .5 }
      ROOT .flame { fill: var(--c3); stroke: #43291c; stroke-width: 1.6; stroke-linejoin: round;
                    transform-box: fill-box; transform-origin: 50% 100%; animation: K_flicker calc(var(--d) / 4) ease-in-out infinite }
      ROOT .f2 { animation-delay: calc(var(--d) * -0.17) }
      ROOT .f3 { animation-delay: calc(var(--d) * -0.08) }
      ROOT .core { fill: #fde68a; transform-box: fill-box; transform-origin: 50% 100%; animation: K_flicker calc(var(--d) / 4) ease-in-out infinite; animation-delay: calc(var(--d) * -0.12) }
      ROOT .lid { transform-origin: 50px 45px; animation: K_lid var(--d) infinite }
      ROOT .puff { fill: var(--c2); stroke: #43291c; stroke-width: 1.8; stroke-linejoin: round; opacity: 0;
                   transform-box: fill-box; transform-origin: center; animation: K_puffL var(--d) ease-out infinite; animation-delay: calc(var(--d) * -0.92) }
      ROOT .pR { animation-name: K_puffR; animation-delay: calc(var(--d) * -0.82) }
      ROOT .pL.big { animation-name: K_bigL; animation-delay: calc(var(--d) * -0.54) }
      ROOT .pR.big { animation-name: K_bigR; animation-delay: calc(var(--d) * -0.52) }
      ROOT .foam { fill: var(--c2); stroke: #43291c; stroke-width: 1.4; opacity: 0; transform-box: fill-box; transform-origin: 50% 100%;
                   animation: K_foam calc(var(--d) / 2) ease-out infinite }
      ROOT .b2 { animation-delay: calc(var(--d) * -0.3) }
      ROOT .b3 { animation-delay: calc(var(--d) * -0.12) }
      ROOT .b4 { animation-delay: calc(var(--d) * -0.4) }
      @keyframes K_lid {
        0% { transform: translateY(0) rotate(0deg); animation-timing-function: ease-in-out }
        6% { transform: translateY(-2px) rotate(-3deg) }
        12% { transform: translateY(-.5px) rotate(2.5deg) }
        18% { transform: translateY(-2.5px) rotate(-2.5deg) }
        24% { transform: translateY(-.5px) rotate(2deg) }
        30% { transform: translateY(-1.5px) rotate(-1.5deg) }
        36% { transform: translateY(.6px) rotate(0deg); animation-timing-function: cubic-bezier(.2, .8, .4, 1) }
        46% { transform: translateY(-10px) rotate(5deg); animation-timing-function: cubic-bezier(.6, 0, .9, .5) }
        56% { transform: translateY(0) rotate(-2deg); animation-timing-function: ease-out }
        61% { transform: translateY(-2px) rotate(1.5deg); animation-timing-function: ease-in }
        66%, 100% { transform: translateY(0) rotate(0deg) }
      }
      @keyframes K_flicker {
        0%, 100% { transform: scale(1, 1) }
        35% { transform: scale(.9, 1.14) }
        70% { transform: scale(1.06, .9) }
      }
      @keyframes K_puffL {
        0% { transform: translate(0, 0) scale(.3); opacity: 0 }
        8% { opacity: .95 }
        34% { transform: translate(-5px, -11px) scale(.9); opacity: .8 }
        46%, 100% { transform: translate(-6px, -14px) scale(1); opacity: 0 }
      }
      @keyframes K_puffR {
        0% { transform: translate(0, 0) scale(.3); opacity: 0 }
        8% { opacity: .95 }
        34% { transform: translate(5px, -11px) scale(.9); opacity: .8 }
        46%, 100% { transform: translate(6px, -14px) scale(1); opacity: 0 }
      }
      @keyframes K_bigL {
        0% { transform: translate(4px, 2px) scale(.4); opacity: 0 }
        6% { opacity: 1 }
        36% { transform: translate(-3px, -17px) scale(1.35); opacity: .9 }
        52%, 100% { transform: translate(-5px, -23px) scale(1.5); opacity: 0 }
      }
      @keyframes K_bigR {
        0% { transform: translate(-4px, 2px) scale(.4); opacity: 0 }
        6% { opacity: 1 }
        36% { transform: translate(3px, -17px) scale(1.35); opacity: .9 }
        52%, 100% { transform: translate(5px, -23px) scale(1.5); opacity: 0 }
      }
      @keyframes K_foam {
        0% { transform: scale(0); opacity: 0 }
        15% { opacity: 1 }
        55% { transform: translateY(-1.5px) scale(1); opacity: 1 }
        70%, 100% { transform: translateY(-2px) scale(1.35); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "tea-bag-dip",
    name: "Tea Bag Dip",
    category: "food",
    description:
      "A tea bag dips into a clear glass mug and sways on its string as soft clouds of amber tea bloom outward and settle through the water.",
    details:
      "Calm and patient, this loader captures the quiet minute while tea steeps: the bag lowers into the water with a gentle ripple, swings a little on its string, and wisps of color drift down and spread until the whole glass is tinted. Nothing snaps or bounces, which makes it a soothing choice for wellness and meditation apps, tea shops, slow-living blogs, booking flows and longer background syncs. Tea colors the brew and the drifting plumes, and Tag tints the paper tag on the string; set Tea to a bright green for matcha or a ruby red for hibiscus.",
    tags: ["tea", "tea bag", "steeping", "calm", "drink", "glass"],
    kind: "wave",
    colors: { primary: "#d97706", secondary: "#84cc16" },
    colorLabels: { primary: "Tea", secondary: "Tag" },
    duration: 2.4,
    popularity: 62,
    svg: `
      <defs><clipPath id="tea-bag-dip-water"><path d="M27.2 52V78C27.2 82.2 30.2 84.8 34.5 84.8H55.5C59.8 84.8 62.8 82.2 62.8 78V52Z"/></clipPath></defs>
      <path class="handle-o" d="M64 50C75.5 50 75.5 72 64 72"/>
      <path class="handle-f" d="M64 50C75.5 50 75.5 72 64 72"/>
      <path class="glass" d="M26 40V78C26 83 29.5 86 34.5 86H55.5C60.5 86 64 83 64 78V40Z"/>
      <g clip-path="url(#tea-bag-dip-water)">
        <rect class="water" x="26" y="52" width="38" height="34"/>
        <rect class="tint" x="26" y="52" width="38" height="34"/>
        <ellipse class="pool" cx="45" cy="86" rx="24" ry="15"/>
        <ellipse class="plume" cx="45" cy="70" rx="4" ry="3"/>
        <ellipse class="plume m2" cx="45" cy="70" rx="4" ry="3"/>
        <ellipse class="plume m3" cx="45" cy="70" rx="4" ry="3"/>
      </g>
      <g class="dip">
        <g class="swing">
          <path class="string" d="M45 35.5V17.5"/>
          <path class="bag" d="M38.5 39L45 35.5L51.5 39V49Q51.5 51 49.5 51H40.5Q38.5 51 38.5 49Z"/>
          <path class="fold" d="M38.5 41H51.5"/>
          <path class="leaf" d="M42 45.5h1.6M46.4 47.2h1.6M44.4 43.6h1.4M47.6 44.4h1.2"/>
        </g>
        <g class="tag"><rect class="tag-card" x="39.5" y="9.5" width="11" height="8.5" rx="1.2"/><path class="tag-mark" d="M43 15.6Q43.4 11.6 47.6 11.8Q47.4 15.8 43 15.6Z"/></g>
      </g>
      <g clip-path="url(#tea-bag-dip-water)">
        <rect class="veil" x="26" y="52" width="38" height="34"/>
      </g>
      <ellipse class="surface" cx="45" cy="52" rx="17.8" ry="2.2"/>
      <ellipse class="ripple" cx="45" cy="52.2" rx="6" ry="1.3"/>
      <path class="glass-line" d="M26 40V78C26 83 29.5 86 34.5 86H55.5C60.5 86 64 83 64 78V40"/>
      <path class="hl" d="M30.5 46V76"/>`,
    css: `
      ROOT .glass { fill: #fff; opacity: .18 }
      ROOT .glass-line { fill: none; stroke: #43291c; stroke-width: 2.2; stroke-linejoin: round }
      ROOT .handle-o { fill: none; stroke: #43291c; stroke-width: 7; stroke-linecap: round }
      ROOT .handle-f { fill: none; stroke: #eaf6fb; stroke-width: 3; stroke-linecap: round }
      ROOT .hl { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .7 }
      ROOT .water { fill: #eaf6fb }
      ROOT .tint { fill: var(--c1); opacity: .16 }
      ROOT .pool { fill: var(--c1); opacity: .5; transform-box: fill-box; transform-origin: 50% 100%; animation: K_pool calc(var(--d) * 2) ease-in-out infinite }
      ROOT .plume { fill: var(--c1); opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_plume1 var(--d) ease-out infinite }
      ROOT .m2 { animation-name: K_plume2; animation-delay: calc(var(--d) / -3) }
      ROOT .m3 { animation-name: K_plume3; animation-delay: calc(var(--d) * -2 / 3) }
      ROOT .veil { fill: #eaf6fb; opacity: .25 }
      ROOT .surface { fill: #fff; opacity: .6 }
      ROOT .ripple { fill: none; stroke: var(--c1); stroke-width: 1; opacity: 0; transform-box: fill-box; transform-origin: center;
                     animation: K_ripple var(--d) ease-out infinite }
      ROOT .string { fill: none; stroke: #a8a29e; stroke-width: 1.2 }
      ROOT .bag { fill: #fef3c7; stroke: #43291c; stroke-width: 1.8; stroke-linejoin: round }
      ROOT .fold { fill: none; stroke: #43291c; stroke-width: 1.2; opacity: .4 }
      ROOT .leaf { fill: none; stroke: var(--c1); stroke-width: 1.3; stroke-linecap: round; opacity: .8 }
      ROOT .tag-card { fill: var(--c2); stroke: #43291c; stroke-width: 1.8 }
      ROOT .tag-mark { fill: #fff; opacity: .85 }
      ROOT .dip { animation: K_dip var(--d) infinite }
      ROOT .swing { transform-origin: 45px 17.5px; animation: K_swing var(--d) ease-in-out infinite }
      ROOT .tag { transform-origin: 45px 9.5px; animation: K_tag var(--d) ease-in-out infinite }
      @keyframes K_dip {
        0% { transform: translateY(0); animation-timing-function: cubic-bezier(.45, 0, .4, 1) }
        36% { transform: translateY(19px); animation-timing-function: ease-in-out }
        46% { transform: translateY(17px); animation-timing-function: ease-in-out }
        56% { transform: translateY(18px); animation-timing-function: cubic-bezier(.45, 0, .55, 1) }
        90% { transform: translateY(-1px); animation-timing-function: ease-in-out }
        100% { transform: translateY(0) }
      }
      @keyframes K_swing {
        0%, 100% { transform: rotate(-3deg) }
        30% { transform: rotate(5deg) }
        55% { transform: rotate(-2deg) }
        78% { transform: rotate(4deg) }
      }
      @keyframes K_tag {
        0%, 100% { transform: rotate(2deg) }
        40% { transform: rotate(-4deg) }
        75% { transform: rotate(3deg) }
      }
      @keyframes K_ripple {
        0%, 6% { transform: scale(.4); opacity: 0 }
        10% { opacity: .9 }
        38%, 100% { transform: scale(2.4); opacity: 0 }
      }
      @keyframes K_plume1 {
        0% { transform: translate(0, 0) scale(.6); opacity: 0 }
        16% { opacity: .9 }
        55% { opacity: .55 }
        100% { transform: translate(-9px, 9px) scale(2.8, 2.3); opacity: 0 }
      }
      @keyframes K_plume2 {
        0% { transform: translate(0, 0) scale(.6); opacity: 0 }
        16% { opacity: .85 }
        55% { opacity: .5 }
        100% { transform: translate(9px, 10px) scale(2.6, 2.3); opacity: 0 }
      }
      @keyframes K_plume3 {
        0% { transform: translate(0, -2px) scale(.6); opacity: 0 }
        16% { opacity: .85 }
        55% { opacity: .5 }
        100% { transform: translate(0, 12px) scale(3.2, 2.1); opacity: 0 }
      }
      @keyframes K_pool { 0%, 100% { opacity: .45; transform: scaleY(.85) } 50% { opacity: .8; transform: scaleY(1.1) } }`,
  },
];

export default food;

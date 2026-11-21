import type { AnimationSource } from "@/types/animation";

/**
 * Cute category: kawaii characters drawn with a shared visual language so the set feels like one family.
 * - Ink: dark plum #3b2f4a for outlines (2.4 units), dot eyes and mouths. White glints in the eyes.
 * - Bodies use var(--c1); var(--c2) / var(--c3) carry the accent roles named in colorLabels.
 * - Motion: squash and stretch, anticipation, lagging secondary parts, quick blinks, small particles.
 */

const cute: AnimationSource[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "bouncing-bunny",
    name: "Bouncing Bunny",
    category: "cute",
    description:
      "A chubby bunny hops in place, squashing flat on each landing while its long ears flop a beat behind and its shadow shrinks below.",
    details:
      "This bunny takes every hop seriously: it crouches before take-off, stretches tall in the air and lands with a soft squash that sends its ears flopping sideways. Little dust puffs and a shrinking shadow sell the weight of each jump. It suits kids' apps, pet shops, Easter promotions and friendly checkout or sign-up waits. Fur colors the body, feet and ears, while Inner ears & cheeks tints the ear lining, blush, shadow and landing puffs; a warm cream fur with coral cheeks gives it a toy-shop feel.",
    tags: ["bounce", "bunny", "squash and stretch", "character", "playful", "pastel"],
    kind: "bounce",
    colors: { primary: "#fde4f0", secondary: "#f472b6" },
    colorLabels: { primary: "Fur", secondary: "Inner ears & cheeks" },
    duration: 1.2,
    popularity: 92,
    svg: `
      <g transform="translate(-3 -5.16) scale(1.06)">
      <ellipse class="shadow" cx="50" cy="88.4" rx="17" ry="2.8"/>
      <circle class="puff puff-l" cx="33" cy="84" r="2.6"/>
      <circle class="puff puff-r" cx="67" cy="84" r="2.6"/>
      <g class="hop">
        <g class="squash">
          <g class="ear-l">
            <ellipse class="fur" cx="41" cy="40.5" rx="6.4" ry="13.5"/>
            <ellipse class="inner" cx="41" cy="42" rx="3" ry="9"/>
          </g>
          <g class="ear-r">
            <ellipse class="fur" cx="59" cy="40.5" rx="6.4" ry="13.5"/>
            <ellipse class="inner" cx="59" cy="42" rx="3" ry="9"/>
          </g>
          <ellipse class="fur" cx="41" cy="82.6" rx="6.2" ry="3.8"/>
          <ellipse class="fur" cx="59" cy="82.6" rx="6.2" ry="3.8"/>
          <path class="fur" d="M50 48.5C64.5 48.5 72 58 72 68.5C72 78 63.5 83 50 83C36.5 83 28 78 28 68.5C28 58 35.5 48.5 50 48.5Z"/>
          <ellipse class="blush" cx="37" cy="70" rx="3.4" ry="2"/>
          <ellipse class="blush" cx="63" cy="70" rx="3.4" ry="2"/>
          <g class="eyes">
            <circle class="ink" cx="43" cy="65.2" r="2.6"/>
            <circle class="ink" cx="57" cy="65.2" r="2.6"/>
            <circle class="glint" cx="43.9" cy="64.3" r=".9"/>
            <circle class="glint" cx="57.9" cy="64.3" r=".9"/>
          </g>
          <path class="mouth" d="M47.6 68.8q1.2 1.5 2.4 0q1.2 1.5 2.4 0"/>
        </g>
      </g>
      </g>`,
    css: `
      ROOT .fur { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .inner { fill: var(--c2); opacity: .8 }
      ROOT .blush { fill: var(--c2); opacity: .4 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round }
      ROOT .shadow { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: K_shadow var(--d) infinite }
      ROOT .hop { animation: K_hop var(--d) infinite }
      ROOT .squash { transform-origin: 50px 86px; animation: K_squash var(--d) ease-in-out infinite }
      ROOT .ear-l { transform-origin: 41px 52px; animation: K_earL var(--d) ease-in-out infinite }
      ROOT .ear-r { transform-origin: 59px 52px; animation: K_earR var(--d) ease-in-out infinite; animation-delay: calc(var(--d) * -0.96) }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      ROOT .puff { fill: var(--c2); opacity: 0; transform-box: fill-box; transform-origin: center }
      ROOT .puff-l { animation: K_puffL var(--d) ease-out infinite }
      ROOT .puff-r { animation: K_puffR var(--d) ease-out infinite }
      @keyframes K_hop {
        0%, 12% { transform: translateY(0); animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        45% { transform: translateY(-14px); animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        78%, 100% { transform: translateY(0) }
      }
      @keyframes K_squash {
        0% { transform: scale(1.14, .86) }
        12% { transform: scale(.9, 1.12) }
        30% { transform: scale(.97, 1.04) }
        45% { transform: scale(1.02, .98) }
        68% { transform: scale(.94, 1.07) }
        78% { transform: scale(1.2, .8) }
        86% { transform: scale(.95, 1.06) }
        93% { transform: scale(1.04, .96) }
        100% { transform: scale(1.14, .86) }
      }
      @keyframes K_earL {
        0% { transform: rotate(-14deg) }
        10% { transform: rotate(-24deg) }
        28% { transform: rotate(-6deg) }
        45% { transform: rotate(-1deg) }
        66% { transform: rotate(5deg) }
        78% { transform: rotate(3deg) }
        85% { transform: rotate(-30deg) }
        93% { transform: rotate(-7deg) }
        100% { transform: rotate(-14deg) }
      }
      @keyframes K_earR {
        0% { transform: rotate(14deg) }
        10% { transform: rotate(24deg) }
        28% { transform: rotate(6deg) }
        45% { transform: rotate(1deg) }
        66% { transform: rotate(-5deg) }
        78% { transform: rotate(-3deg) }
        85% { transform: rotate(30deg) }
        93% { transform: rotate(7deg) }
        100% { transform: rotate(14deg) }
      }
      @keyframes K_blink {
        0%, 78%, 90%, 100% { transform: scaleY(1) }
        81%, 86% { transform: scaleY(.12) }
      }
      @keyframes K_shadow {
        0%, 12% { transform: scale(1.08); opacity: .38; animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        45% { transform: scale(.55); opacity: .16; animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        78% { transform: scale(1.14); opacity: .42 }
        100% { transform: scale(1.08); opacity: .38 }
      }
      @keyframes K_puffL {
        0%, 77% { transform: translate(0, 0) scale(.3); opacity: 0 }
        81% { opacity: .7 }
        100% { transform: translate(-7px, -4px) scale(1.2); opacity: 0 }
      }
      @keyframes K_puffR {
        0%, 77% { transform: translate(0, 0) scale(.3); opacity: 0 }
        81% { opacity: .7 }
        100% { transform: translate(7px, -4px) scale(1.2); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sleeping-cat",
    name: "Sleeping Cat",
    category: "cute",
    description:
      "Curled into a cozy loaf, this ginger cat breathes slowly in its sleep, flicks the tip of its tail and lets little z's drift up and fade.",
    details:
      "Nothing hurries this cat: its body rises and falls with each breath, an ear twitches now and then, and the tail tip gives a lazy flick. Three dream z's float up one after another, so the loader always looks mid-nap. It is a natural fit for longer waits, overnight sync screens, bedtime and meditation apps, or a cozy \"we're on it\" empty state. Fur sets the coat, Dream z's colors the floating letters, and Ears & cheeks tints the inner ears, nose and blush; a gray coat with lavender z's turns it into a sleepy tabby.",
    tags: ["cat", "sleeping", "breathing", "character", "calm", "cozy"],
    kind: "character",
    colors: { primary: "#fdba74", secondary: "#8b5cf6", accent: "#f9a8d4" },
    colorLabels: { primary: "Fur", secondary: "Dream z's", accent: "Ears & cheeks" },
    duration: 2.4,
    popularity: 88,
    svg: `
      <ellipse class="shadow" cx="51" cy="85" rx="33" ry="3"/>
      <g class="breath">
        <path class="fur" d="M27 83C24 66 37 50 56 50C72 50 84 61 84 72C84 79 79 83 73 83Z"/>
        <path class="stripe" d="M55 51.5q2.2 4.5 .6 9M63.5 52.5q1.8 4.2 0 8.4M71.5 56q1.2 3.6-.8 7.4"/>
      </g>
      <path class="tail-o" d="M81 76C81 86 67 86 59 85"/>
      <path class="tail-o tip" d="M59 85C52 84.5 48 82 48.5 77"/>
      <path class="tail-f" d="M81 76C81 86 67 86 59 85"/>
      <path class="tail-f tip" d="M59 85C52 84.5 48 82 48.5 77"/>
      <g class="head">
        <g class="ear-r">
          <path class="fur" d="M37 55L43.5 45.5Q45.5 43.5 46.5 46L47.5 61.5Z"/>
          <path class="inner" d="M41 53.5L44.2 48.5L45.4 56Z"/>
        </g>
        <path class="fur" d="M20.5 60L21 47Q21.5 44.5 24 46L32 53.5Z"/>
        <path class="inner" d="M23.5 56L23.8 49.5L28.5 53.8Z"/>
        <ellipse class="fur" cx="34" cy="66" rx="15.5" ry="13"/>
        <path class="lid" d="M25.5 65.5q2.8 2.8 5.6 0M37.2 65.5q2.8 2.8 5.6 0"/>
        <ellipse class="blush" cx="24.5" cy="70.5" rx="3" ry="1.8"/>
        <ellipse class="blush" cx="43.8" cy="70.5" rx="3" ry="1.8"/>
        <ellipse class="nose" cx="34.2" cy="69" rx="1.4" ry="1"/>
        <path class="lid" d="M32 70.6q1.1 1.3 2.2 0q1.1 1.3 2.2 0"/>
      </g>
      <ellipse class="fur" cx="29" cy="80" rx="5.2" ry="3.2"/>
      <ellipse class="fur" cx="39.5" cy="80.5" rx="5.2" ry="3.2"/>
      <path class="z" d="M49.5 40.5h7l-7 7h7"/>
      <path class="z z2" d="M49.5 40.5h7l-7 7h7"/>
      <path class="z z3" d="M49.5 40.5h7l-7 7h7"/>`,
    css: `
      ROOT .fur { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .inner, ROOT .nose { fill: var(--c3) }
      ROOT .stripe { fill: none; stroke: #3b2f4a; stroke-width: 2.2; stroke-linecap: round; opacity: .2 }
      ROOT .lid { fill: none; stroke: #3b2f4a; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round }
      ROOT .blush { fill: var(--c3); opacity: .6 }
      ROOT .shadow { fill: var(--c1); opacity: .3 }
      ROOT .tail-o { fill: none; stroke: #3b2f4a; stroke-width: 9; stroke-linecap: round }
      ROOT .tail-f { fill: none; stroke: var(--c1); stroke-width: 4.2; stroke-linecap: round }
      ROOT .tip { transform-origin: 59px 85px; animation: K_flick var(--d) ease-in-out infinite }
      ROOT .breath { transform-origin: 55px 83px; animation: K_breath var(--d) ease-in-out infinite }
      ROOT .head { transform-origin: 34px 79px; animation: K_head var(--d) ease-in-out infinite }
      ROOT .ear-r { transform-origin: 42px 58px; animation: K_twitch calc(var(--d) * 2) ease-in-out infinite }
      ROOT .z { fill: none; stroke: var(--c2); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; opacity: 0;
                transform-box: fill-box; transform-origin: center; animation: K_z var(--d) linear infinite }
      ROOT .z2 { animation-delay: calc(var(--d) / -3) }
      ROOT .z3 { animation-delay: calc(var(--d) * -2 / 3) }
      @keyframes K_breath { 0%, 100% { transform: scale(1, 1) } 45% { transform: scale(1.03, 1.08) } }
      @keyframes K_head { 0%, 100% { transform: translateY(0) rotate(0deg) } 45% { transform: translateY(-1.5px) rotate(-2deg) } }
      @keyframes K_flick {
        0%, 52%, 100% { transform: rotate(0deg) }
        60% { transform: rotate(32deg) }
        67% { transform: rotate(-6deg) }
        74% { transform: rotate(16deg) }
        84% { transform: rotate(0deg) }
      }
      @keyframes K_twitch { 0%, 68%, 80%, 100% { transform: rotate(0deg) } 71% { transform: rotate(16deg) } 75% { transform: rotate(-5deg) } }
      @keyframes K_z {
        0% { transform: translate(0, 0) scale(.3) rotate(-12deg); opacity: 0 }
        15% { opacity: 1 }
        40% { transform: translate(8px, -11px) scale(.68) rotate(8deg) }
        70% { transform: translate(12px, -20px) scale(.92) rotate(-6deg); opacity: .95 }
        100% { transform: translate(19px, -29px) scale(1.15) rotate(6deg); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "floating-cloud",
    name: "Floating Cloud",
    category: "cute",
    description:
      "Soft and smiling, this little cloud drifts up and down with a gentle squish, blinking now and then as tiny sparkles twinkle around it.",
    details:
      "Soft, slow and a little dreamy, this cloud feels like a deep breath for your interface. Its gentle bob ends in a squash at the low point, a quick blink keeps it alive, and four sparkles take turns twinkling around it. Use it for weather widgets, cloud storage uploads, sync indicators or a calm onboarding step. Cloud colors the body, and Sparkles & cheeks sets both the twinkles and the blush; a pale peach cloud with golden sparkles reads like a sunrise.",
    tags: ["float", "cloud", "sparkles", "blink", "dreamy", "pastel"],
    kind: "character",
    colors: { primary: "#bae6fd", secondary: "#f472b6" },
    colorLabels: { primary: "Cloud", secondary: "Sparkles & cheeks" },
    duration: 2,
    popularity: 84,
    svg: `
      <path class="spark" d="M16 22.5Q17.3 27.7 22.5 29Q17.3 30.3 16 35.5Q14.7 30.3 9.5 29Q14.7 27.7 16 22.5Z"/>
      <path class="spark s2" d="M64 16.6Q64.68 19.32 67.4 20Q64.68 20.68 64 23.4Q63.32 20.68 60.6 20Q63.32 19.32 64 16.6Z"/>
      <path class="spark s3" d="M82 25Q83 29 87 30Q83 31 82 35Q81 31 77 30Q81 29 82 25Z"/>
      <path class="spark s4" d="M79 79.6Q80.08 83.92 84.4 85Q80.08 86.08 79 90.4Q77.92 86.08 73.6 85Q77.92 83.92 79 79.6Z"/>
      <path class="spark s5" d="M23 79.8Q23.84 83.16 27.2 84Q23.84 84.84 23 88.2Q22.16 84.84 18.8 84Q22.16 83.16 23 79.8Z"/>
      <g class="float">
        <g class="squish">
          <path class="puff" d="M26.5 72A10.5 10.5 0 1 1 29.71 51.5A18 18 0 1 1 64.65 42.99A15 15 0 1 1 70 72Z"/>
          <path class="shine" d="M34.2 46.3A13.5 13.5 0 0 1 42.2 38.2"/>
          <ellipse class="blush" cx="37" cy="62.8" rx="3.5" ry="2.1"/>
          <ellipse class="blush" cx="62" cy="62.8" rx="3.5" ry="2.1"/>
          <g class="eyes">
            <circle class="ink" cx="42.8" cy="57.6" r="2.7"/>
            <circle class="ink" cx="56.2" cy="57.6" r="2.7"/>
            <circle class="glint" cx="43.7" cy="56.7" r=".95"/>
            <circle class="glint" cx="57.1" cy="56.7" r=".95"/>
          </g>
          <path class="mouth" d="M46.4 62.2q3.1 3.3 6.2 0"/>
        </g>
      </g>`,
    css: `
      ROOT .puff { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .shine { fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; opacity: .9 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.9; stroke-linecap: round }
      ROOT .blush { fill: var(--c2); opacity: .45 }
      ROOT .float { animation: K_float var(--d) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .squish { transform-origin: 50px 72px; animation: K_squish var(--d) ease-in-out infinite }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      ROOT .spark { fill: var(--c2); stroke: var(--c2); stroke-width: .8; stroke-linejoin: round;
                    transform-box: fill-box; transform-origin: center; animation: K_twinkle var(--d) ease-in-out infinite }
      ROOT .s2 { animation-delay: calc(var(--d) * -0.6) }
      ROOT .s3 { animation-delay: calc(var(--d) * -0.2) }
      ROOT .s4 { animation-delay: calc(var(--d) * -0.8) }
      ROOT .s5 { animation-delay: calc(var(--d) * -0.4) }
      @keyframes K_float { 0%, 100% { transform: translateY(3px) } 50% { transform: translateY(-3px) } }
      @keyframes K_squish {
        0%, 100% { transform: scale(1.05, .94) }
        22% { transform: scale(.97, 1.04) }
        50% { transform: scale(1, 1) }
        78% { transform: scale(1.01, .99) }
      }
      @keyframes K_blink { 0%, 69%, 79%, 100% { transform: scaleY(1) } 72%, 76% { transform: scaleY(.1) } }
      @keyframes K_twinkle {
        0% { transform: scale(.25) rotate(0deg); opacity: .25 }
        50% { transform: scale(1) rotate(45deg); opacity: 1 }
        100% { transform: scale(.25) rotate(90deg); opacity: .25 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "dancing-strawberry",
    name: "Dancing Strawberry",
    category: "cute",
    description:
      "Swaying on its tip to a beat only it can hear, this cheerful strawberry dances while its leafy cap bounces a moment late and music notes pop up.",
    details:
      "Rocking from its tip like a tiny dancer, this berry squashes at each end of the swing while its leafy cap wobbles a moment behind, the way soft things really move. Music notes take turns popping up on either side. It brings instant charm to food delivery, recipe and grocery apps, smoothie bars or a summer sale banner. Berry colors the body and the notes, Leaves sets the cap and stem, and Seeds tints the freckles; switch Berry to a soft pink for a strawberry-milk version.",
    tags: ["dance", "strawberry", "fruit", "sway", "character", "cheerful"],
    kind: "character",
    colors: { primary: "#fb7185", secondary: "#4ade80", accent: "#fef08a" },
    colorLabels: { primary: "Berry", secondary: "Leaves", accent: "Seeds" },
    duration: 1.2,
    popularity: 79,
    svg: `
      <ellipse class="shadow" cx="50" cy="89" rx="14" ry="2.6"/>
      <g class="note">
        <ellipse class="note-head" cx="16" cy="37" rx="3.2" ry="2.5" transform="rotate(-20 16 37)"/>
        <path class="note-stem" d="M18.9 36V25q1.2 4 5 5"/>
      </g>
      <g class="note note-r">
        <ellipse class="note-head" cx="81" cy="33" rx="3.2" ry="2.5" transform="rotate(-20 81 33)"/>
        <path class="note-stem" d="M83.9 32V21q1.2 4 5 5"/>
      </g>
      <g class="sway">
        <g class="bob">
          <path class="berry" d="M50 87.5C43 87.5 22 71 22 54.5C22 43.5 33 38.5 50 38.5C67 38.5 78 43.5 78 54.5C78 71 57 87.5 50 87.5Z"/>
          <g class="seeds">
            <ellipse cx="29.5" cy="57" rx="1.2" ry="1.9" transform="rotate(20 29.5 57)"/>
            <ellipse cx="70.5" cy="57" rx="1.2" ry="1.9" transform="rotate(-20 70.5 57)"/>
            <ellipse cx="31" cy="70" rx="1.2" ry="1.9" transform="rotate(25 31 70)"/>
            <ellipse cx="69" cy="70" rx="1.2" ry="1.9" transform="rotate(-25 69 70)"/>
            <ellipse cx="39.5" cy="78" rx="1.2" ry="1.9" transform="rotate(25 39.5 78)"/>
            <ellipse cx="60.5" cy="78" rx="1.2" ry="1.9" transform="rotate(-25 60.5 78)"/>
            <ellipse cx="50" cy="81.5" rx="1.2" ry="1.9"/>
          </g>
          <ellipse class="blush" cx="36.5" cy="66" rx="3.4" ry="2"/>
          <ellipse class="blush" cx="63.5" cy="66" rx="3.4" ry="2"/>
          <g class="eyes">
            <circle class="ink" cx="42.5" cy="61.5" r="2.6"/>
            <circle class="ink" cx="57.5" cy="61.5" r="2.6"/>
            <circle class="glint" cx="43.4" cy="60.6" r=".9"/>
            <circle class="glint" cx="58.4" cy="60.6" r=".9"/>
          </g>
          <path class="ink" d="M45.5 65.8Q50 72 54.5 65.8Z"/>
          <g class="cap">
            <g class="cap-bob">
              <path class="stem-o" d="M50 41C50 36 51 32 54.5 29"/>
              <path class="stem-f" d="M50 41C50 36 51 32 54.5 29"/>
              <ellipse class="leaf" cx="39.4" cy="43.8" rx="4.2" ry="11" transform="rotate(75 39.4 43.8)"/>
              <ellipse class="leaf" cx="60.6" cy="43.8" rx="4.2" ry="11" transform="rotate(-75 60.6 43.8)"/>
              <ellipse class="leaf" cx="45.1" cy="47.3" rx="3.8" ry="8" transform="rotate(38 45.1 47.3)"/>
              <ellipse class="leaf" cx="54.9" cy="47.3" rx="3.8" ry="8" transform="rotate(-38 54.9 47.3)"/>
              <ellipse class="leaf" cx="50" cy="48" rx="3.6" ry="7"/>
            </g>
          </g>
        </g>
      </g>`,
    css: `
      ROOT .berry { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .leaf { fill: var(--c2); stroke: #3b2f4a; stroke-width: 2.2 }
      ROOT .stem-o { fill: none; stroke: #3b2f4a; stroke-width: 7; stroke-linecap: round }
      ROOT .stem-f { fill: none; stroke: var(--c2); stroke-width: 2.6; stroke-linecap: round }
      ROOT .seeds { fill: var(--c3) }
      ROOT .blush { fill: #fff; opacity: .4 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .note-head { fill: var(--c1) }
      ROOT .note-stem { fill: none; stroke: var(--c1); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round }
      ROOT .note { opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_noteL var(--d) ease-out infinite }
      ROOT .note-r { animation-name: K_noteR; animation-delay: calc(var(--d) * -0.5) }
      ROOT .shadow { fill: var(--c1); opacity: .28; transform-box: fill-box; transform-origin: center; animation: K_shadow calc(var(--d) / 2) ease-in-out infinite }
      ROOT .sway { transform-origin: 50px 87px; animation: K_sway var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
      ROOT .bob { transform-origin: 50px 87px; animation: K_bob calc(var(--d) / 2) ease-in-out infinite }
      ROOT .cap { transform-origin: 50px 42px; animation: K_cap var(--d) cubic-bezier(.45, 0, .55, 1) infinite; animation-delay: calc(var(--d) * -0.6875) }
      ROOT .cap-bob { transform-origin: 50px 42px; animation: K_capbob calc(var(--d) / 2) ease-in-out infinite; animation-delay: calc(var(--d) * -0.4375) }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink calc(var(--d) * 2) infinite }
      @keyframes K_sway { 0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) } }
      @keyframes K_bob { 0%, 100% { transform: scale(1.045, .95) } 50% { transform: scale(.975, 1.04) } }
      @keyframes K_cap { 0%, 100% { transform: rotate(-9deg) } 50% { transform: rotate(9deg) } }
      @keyframes K_capbob { 0%, 100% { transform: translateY(1.5px) scale(1.06, .9) } 50% { transform: translateY(-1.5px) scale(.96, 1.08) } }
      @keyframes K_shadow { 0%, 100% { transform: scale(1.1, 1) } 50% { transform: scale(.9, 1) } }
      @keyframes K_blink { 0%, 56%, 64%, 100% { transform: scaleY(1) } 59%, 61% { transform: scaleY(.12) } }
      @keyframes K_noteL {
        0% { transform: translate(4px, 6px) scale(.5) rotate(10deg); opacity: 0 }
        10%, 36% { opacity: 1 }
        50%, 100% { transform: translate(-3px, -9px) scale(1) rotate(-12deg); opacity: 0 }
      }
      @keyframes K_noteR {
        0% { transform: translate(-4px, 6px) scale(.5) rotate(-10deg); opacity: 0 }
        10%, 36% { opacity: 1 }
        50%, 100% { transform: translate(3px, -9px) scale(1) rotate(12deg); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "waving-ghost",
    name: "Waving Ghost",
    category: "cute",
    description:
      "Hello from a friendly lavender ghost: it floats up and down, waves one little arm, blinks, and ripples its scalloped hem as it drifts.",
    details:
      "More cuddly than spooky, this ghost greets visitors with an eager wave while its scalloped hem ripples like fabric in a draft. It drifts a little as it floats and blinks once per cycle, so it never looks frozen. Halloween campaigns are the obvious home, but it works year-round on playful 404 pages, chat widgets waiting for a reply and lighthearted SaaS empty states. Body colors the ghost and its arms, and Cheeks sets the blush; a mint body with peach cheeks makes it feel fresh outside of October.",
    tags: ["ghost", "wave", "float", "halloween", "character", "friendly"],
    kind: "character",
    colors: { primary: "#c4b5fd", secondary: "#f9a8d4" },
    colorLabels: { primary: "Body", secondary: "Cheeks" },
    duration: 1.6,
    popularity: 77,
    svg: `
      <ellipse class="shadow" cx="50" cy="88.5" rx="15" ry="2.8"/>
      <g class="float">
        <g class="drift">
          <g class="wave"><ellipse class="arm" cx="78" cy="47" rx="8" ry="4.8" transform="rotate(-28 78 47)"/></g>
          <g class="nub"><ellipse class="arm" cx="24" cy="53" rx="6.5" ry="4.4" transform="rotate(30 24 53)"/></g>
          <path class="o" d="M27 69V44C27 29.6 37.3 18 50 18C62.7 18 73 29.6 73 44V69Z"/>
          <circle class="o lobe" cx="32.75" cy="69" r="6.6"/>
          <circle class="o lobe l2" cx="44.25" cy="69" r="6.6"/>
          <circle class="o lobe l3" cx="55.75" cy="69" r="6.6"/>
          <circle class="o lobe l4" cx="67.25" cy="69" r="6.6"/>
          <path class="f" d="M27 69V44C27 29.6 37.3 18 50 18C62.7 18 73 29.6 73 44V69Z"/>
          <circle class="f lobe" cx="32.75" cy="69" r="6.6"/>
          <circle class="f lobe l2" cx="44.25" cy="69" r="6.6"/>
          <circle class="f lobe l3" cx="55.75" cy="69" r="6.6"/>
          <circle class="f lobe l4" cx="67.25" cy="69" r="6.6"/>
          <ellipse class="blush" cx="36" cy="48" rx="3.6" ry="2.1"/>
          <ellipse class="blush" cx="64" cy="48" rx="3.6" ry="2.1"/>
          <g class="eyes">
            <ellipse class="ink" cx="42.5" cy="41" rx="2.6" ry="3.4"/>
            <ellipse class="ink" cx="57.5" cy="41" rx="2.6" ry="3.4"/>
            <circle class="glint" cx="43.4" cy="39.6" r="1"/>
            <circle class="glint" cx="58.4" cy="39.6" r="1"/>
          </g>
          <path class="ink" d="M46.5 47Q50 52.5 53.5 47Z"/>
        </g>
      </g>`,
    css: `
      ROOT .o { fill: #3b2f4a; stroke: #3b2f4a; stroke-width: 4.8; stroke-linejoin: round }
      ROOT .f, ROOT .arm { fill: var(--c1) }
      ROOT .arm { stroke: #3b2f4a; stroke-width: 2.4 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .blush { fill: var(--c2); opacity: .7 }
      ROOT .shadow { fill: var(--c1); transform-box: fill-box; transform-origin: center; animation: K_shadow var(--d) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .float { animation: K_float var(--d) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .drift { transform-origin: 50px 55px; animation: K_drift calc(var(--d) * 2) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .wave { transform-origin: 71px 50px; animation: K_wave calc(var(--d) / 2) ease-in-out infinite }
      ROOT .nub { transform-origin: 29px 54px; animation: K_nub var(--d) ease-in-out infinite }
      ROOT .lobe { transform-box: fill-box; transform-origin: center; animation: K_lobe calc(var(--d) / 2) ease-in-out infinite }
      ROOT .l2 { animation-delay: calc(var(--d) * -0.125) }
      ROOT .l3 { animation-delay: calc(var(--d) * -0.25) }
      ROOT .l4 { animation-delay: calc(var(--d) * -0.375) }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      @keyframes K_float { 0%, 100% { transform: translateY(3px) } 50% { transform: translateY(-4px) } }
      @keyframes K_drift { 0%, 100% { transform: rotate(-3deg) } 50% { transform: rotate(3deg) } }
      @keyframes K_wave { 0%, 100% { transform: rotate(10deg) } 50% { transform: rotate(-30deg) } }
      @keyframes K_nub { 0%, 100% { transform: rotate(-6deg) } 50% { transform: rotate(8deg) } }
      @keyframes K_lobe { 0%, 100% { transform: translateY(-1.6px) scale(1, .82) } 50% { transform: translateY(1.6px) scale(1, 1.12) } }
      @keyframes K_blink { 0%, 44%, 56%, 100% { transform: scaleY(1) } 48%, 52% { transform: scaleY(.1) } }
      @keyframes K_shadow { 0%, 100% { transform: scale(1); opacity: .45 } 50% { transform: scale(.72); opacity: .25 } }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "happy-mushroom",
    name: "Happy Mushroom",
    category: "cute",
    description:
      "A spotted mushroom crouches, springs into the air and lands with a squishy bounce, its cap lagging behind as little spore puffs pop out.",
    details:
      "Every jump gets a proper wind-up: the stem squats, launches, and the soft cap trails behind before squishing down on landing. Each touchdown shakes loose a few spore puffs, and the mushroom squeezes its eyes shut for a moment as it lands. It is lovely in forest or cottagecore themes, gardening and foraging apps, fantasy games and indie shop fronts. Cap sets the dome, Stem & spots colors the stem and the dots, and Spores tints the puffs and blush; a classic red cap with white spots gives you the storybook toadstool.",
    tags: ["jump", "mushroom", "squash and stretch", "character", "whimsical", "forest"],
    kind: "bounce",
    colors: { primary: "#a78bfa", secondary: "#fde8cf", accent: "#f472b6" },
    colorLabels: { primary: "Cap", secondary: "Stem & spots", accent: "Spores" },
    duration: 1.4,
    popularity: 74,
    svg: `
      <ellipse class="shadow" cx="50" cy="88" rx="17" ry="2.8"/>
      <circle class="spore" cx="30" cy="42" r="3"/>
      <circle class="spore sp2" cx="50" cy="28" r="2.6"/>
      <circle class="spore sp3" cx="70" cy="42" r="3"/>
      <g class="jump">
        <g class="squash">
          <path class="stem" d="M38.5 61C37 69.5 36.5 78 38 83.5Q50 88 62 83.5C63.5 78 63 69.5 61.5 61Z"/>
          <ellipse class="blush" cx="41.2" cy="75.5" rx="2.5" ry="1.5"/>
          <ellipse class="blush" cx="58.8" cy="75.5" rx="2.5" ry="1.5"/>
          <g class="eyes">
            <circle class="ink" cx="45" cy="71.5" r="2.3"/>
            <circle class="ink" cx="55" cy="71.5" r="2.3"/>
            <circle class="glint" cx="45.8" cy="70.7" r=".8"/>
            <circle class="glint" cx="55.8" cy="70.7" r=".8"/>
          </g>
          <path class="mouth" d="M47.6 75.2q2.4 2.4 4.8 0"/>
          <g class="cap">
            <path class="dome" d="M21 59C21 41.5 33.5 30 50 30C66.5 30 79 41.5 79 59C79 63.5 75.5 65.2 71 64.3C64 62.8 57.5 62.2 50 62.2C42.5 62.2 36 62.8 29 64.3C24.5 65.2 21 63.5 21 59Z"/>
            <circle class="spot" cx="34.5" cy="46" r="4.6"/>
            <circle class="spot" cx="50.5" cy="38" r="5"/>
            <circle class="spot" cx="66" cy="46.5" r="4.2"/>
            <circle class="spot" cx="45" cy="54.5" r="2.6"/>
            <circle class="spot" cx="59.5" cy="56" r="2.2"/>
          </g>
        </g>
      </g>`,
    css: `
      ROOT .dome { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .stem { fill: var(--c2); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .spot { fill: var(--c2) }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.8; stroke-linecap: round }
      ROOT .blush { fill: var(--c3); opacity: .5 }
      ROOT .shadow { fill: var(--c1); transform-box: fill-box; transform-origin: center; animation: K_shadow var(--d) infinite }
      ROOT .jump { animation: K_jump var(--d) infinite }
      ROOT .squash { transform-origin: 50px 86px; animation: K_squash var(--d) ease-in-out infinite }
      ROOT .cap { transform-origin: 50px 62px; animation: K_cap var(--d) ease-in-out infinite }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      ROOT .spore { fill: var(--c3); opacity: 0; transform-box: fill-box; transform-origin: center; animation: K_sp1 var(--d) ease-out infinite; animation-delay: calc(var(--d) * -0.22) }
      ROOT .sp2 { animation-name: K_sp2; animation-delay: calc(var(--d) * -0.2) }
      ROOT .sp3 { animation-name: K_sp3; animation-delay: calc(var(--d) * -0.21) }
      @keyframes K_jump {
        0%, 20% { transform: translateY(0); animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        48% { transform: translateY(-17px); animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        76%, 100% { transform: translateY(0) }
      }
      @keyframes K_squash {
        0% { transform: scale(1, 1) }
        14% { transform: scale(1.14, .82) }
        20% { transform: scale(.88, 1.14) }
        34% { transform: scale(.98, 1.03) }
        48% { transform: scale(1.02, .98) }
        68% { transform: scale(.95, 1.06) }
        76% { transform: scale(1.18, .8) }
        84% { transform: scale(.95, 1.06) }
        91% { transform: scale(1.03, .98) }
        100% { transform: scale(1, 1) }
      }
      @keyframes K_cap {
        0% { transform: translateY(0) scale(1, 1) }
        14% { transform: translateY(1px) scale(1.05, .94) }
        22% { transform: translateY(3px) scale(1.1, .88) }
        36% { transform: translateY(-3px) scale(.95, 1.07) }
        50% { transform: translateY(-1px) scale(1, 1) }
        70% { transform: translateY(-2.5px) scale(.97, 1.04) }
        80% { transform: translateY(3.5px) scale(1.12, .86) }
        88% { transform: translateY(-1.5px) scale(.97, 1.04) }
        95% { transform: translateY(.5px) scale(1.01, .99) }
        100% { transform: translateY(0) scale(1, 1) }
      }
      @keyframes K_blink { 0%, 76%, 88%, 100% { transform: scaleY(1) } 79%, 84% { transform: scaleY(.15) } }
      @keyframes K_shadow {
        0%, 20% { transform: scale(1.05); opacity: .4; animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        48% { transform: scale(.6); opacity: .18; animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        76% { transform: scale(1.12); opacity: .45 }
        100% { transform: scale(1.05); opacity: .4 }
      }
      @keyframes K_sp1 {
        0% { transform: translate(0, 0) scale(.3); opacity: 0 }
        8%, 30% { opacity: 1 }
        50%, 100% { transform: translate(-8px, -10px) scale(1.15); opacity: 0 }
      }
      @keyframes K_sp2 {
        0% { transform: translate(0, 0) scale(.3); opacity: 0 }
        8%, 30% { opacity: 1 }
        50%, 100% { transform: translate(1px, -13px) scale(1.15); opacity: 0 }
      }
      @keyframes K_sp3 {
        0% { transform: translate(0, 0) scale(.3); opacity: 0 }
        8%, 30% { opacity: 1 }
        50%, 100% { transform: translate(8px, -10px) scale(1.15); opacity: 0 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "tiny-heartbeat",
    name: "Tiny Heartbeat",
    category: "cute",
    description:
      "Lub-dub, lub-dub: a rosy little heart beats in a double pulse while a heartbeat line traces itself across the screen beneath it.",
    details:
      "Two quick beats and a pause give this heart a real pulse, and a soft glow blooms outward on the stronger second beat. Below it, a heartbeat line draws itself across and clears away in time with the rhythm. It fits health and fitness apps, dating sites, wellness bookings, donation flows and anywhere a wait should feel caring. Heart colors the character and its glow, Pulse line sets the trace, and the stroke control changes the line weight; a mint pulse line under a coral heart looks great on dark dashboards.",
    tags: ["heart", "heartbeat", "pulse", "love", "character", "health"],
    kind: "pulse",
    colors: { primary: "#fb6f92", secondary: "#8b5cf6" },
    colorLabels: { primary: "Heart", secondary: "Pulse line" },
    duration: 1.2,
    stroke: 3,
    popularity: 86,
    svg: `
      <path class="aura" d="M50 62C38 54 24 45.5 24 33C24 24.5 30.5 18 38.5 18C43.5 18 47.5 20.5 50 24.5C52.5 20.5 56.5 18 61.5 18C69.5 18 76 24.5 76 33C76 45.5 62 54 50 62Z"/>
      <path class="track" pathLength="100" d="M8 80H30Q33 76 36 80H39L42.5 85L46.5 72L51 90L54.5 80H60Q63.5 75.5 67 80H92"/>
      <path class="trace" pathLength="100" d="M8 80H30Q33 76 36 80H39L42.5 85L46.5 72L51 90L54.5 80H60Q63.5 75.5 67 80H92"/>
      <g class="beat">
        <path class="heart" d="M50 62C38 54 24 45.5 24 33C24 24.5 30.5 18 38.5 18C43.5 18 47.5 20.5 50 24.5C52.5 20.5 56.5 18 61.5 18C69.5 18 76 24.5 76 33C76 45.5 62 54 50 62Z"/>
        <path class="shine" d="M30.5 31.5Q31.5 25.5 37.5 24.5"/>
        <ellipse class="blush" cx="36.5" cy="42.5" rx="3.4" ry="2"/>
        <ellipse class="blush" cx="63.5" cy="42.5" rx="3.4" ry="2"/>
        <g class="eyes">
          <circle class="ink" cx="42.5" cy="36.5" r="2.6"/>
          <circle class="ink" cx="57.5" cy="36.5" r="2.6"/>
          <circle class="glint" cx="43.4" cy="35.6" r=".9"/>
          <circle class="glint" cx="58.4" cy="35.6" r=".9"/>
        </g>
        <path class="mouth" d="M46.5 42q3.5 3.4 7 0"/>
      </g>`,
    css: `
      ROOT .heart { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .shine { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .75 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.9; stroke-linecap: round }
      ROOT .blush { fill: #e8336f; opacity: .3 }
      ROOT .track, ROOT .trace { fill: none; stroke: var(--c2); stroke-width: var(--sw); stroke-linecap: round; stroke-linejoin: round }
      ROOT .track { opacity: .18 }
      ROOT .trace { stroke-dasharray: 100 120; animation: K_trace var(--d) linear infinite }
      ROOT .aura { fill: var(--c1); opacity: 0; transform-origin: 50px 40px; animation: K_aura var(--d) ease-out infinite }
      ROOT .beat { transform-origin: 50px 40px; animation: K_beat var(--d) infinite }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink calc(var(--d) * 2) infinite }
      @keyframes K_beat {
        0% { transform: scale(1); animation-timing-function: cubic-bezier(.2, 0, .4, 1) }
        9% { transform: scale(1.1); animation-timing-function: cubic-bezier(.5, 0, .7, 1) }
        17% { transform: scale(.98); animation-timing-function: cubic-bezier(.2, 0, .4, 1) }
        27% { transform: scale(1.17); animation-timing-function: cubic-bezier(.4, 0, .6, 1) }
        44% { transform: scale(.97); animation-timing-function: ease-in-out }
        56%, 100% { transform: scale(1) }
      }
      @keyframes K_aura {
        0%, 25% { transform: scale(1.1); opacity: 0 }
        27% { transform: scale(1.16); opacity: .55 }
        44% { opacity: .3 }
        64%, 100% { transform: scale(1.5); opacity: 0 }
      }
      @keyframes K_trace { 0% { stroke-dashoffset: 105 } 55% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -110 } }
      @keyframes K_blink { 0%, 80%, 88%, 100% { transform: scaleY(1) } 83%, 85% { transform: scaleY(.12) } }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "bubble-friends",
    name: "Bubble Friends",
    category: "cute",
    description:
      "Three round bubble buddies take turns hopping in a rolling wave, each with its own little face and a soft squish whenever it lands.",
    details:
      "One smiles, one shouts \"whee!\" and one grins with happy closed eyes, and together they bounce in a rolling wave like friends taking turns. Each bubble stretches on the way up and squashes into its shadow on the way down. Use them as a playful three-dot loader for chat apps, kids' learning games, team and community products, or anywhere a plain dot loader feels too serious. Left friend, Middle friend and Right friend each color one bubble, so you can match a brand palette or show three different moods.",
    tags: ["bubbles", "three dots", "bounce", "wave", "character", "playful"],
    kind: "bounce",
    colors: { primary: "#7dd3fc", secondary: "#f9a8d4", accent: "#86efac" },
    colorLabels: { primary: "Left friend", secondary: "Middle friend", accent: "Right friend" },
    duration: 1.2,
    popularity: 85,
    svg: `
      <ellipse class="shadow sh1" cx="22.5" cy="79.6" rx="9.8" ry="2.3"/>
      <ellipse class="shadow sh2" cx="50" cy="79.6" rx="9.8" ry="2.3"/>
      <ellipse class="shadow sh3" cx="77.5" cy="79.6" rx="9.8" ry="2.3"/>
      <g class="hop">
        <g class="sq sq1">
          <circle class="bub bub1" cx="22.5" cy="63.8" r="12.2"/>
          <path class="gloss" d="M14.9 60A8.4 8.4 0 0 1 19 55.9"/>
          <ellipse class="blush" cx="16" cy="67.4" rx="2.4" ry="1.4"/>
          <ellipse class="blush" cx="29" cy="67.4" rx="2.4" ry="1.4"/>
          <circle class="ink" cx="18.1" cy="63.3" r="2"/>
          <circle class="ink" cx="26.9" cy="63.3" r="2"/>
          <path class="line" d="M20.2 66.8q2.3 2.3 4.6 0"/>
        </g>
      </g>
      <g class="hop b2">
        <g class="sq sq2">
          <circle class="bub bub2" cx="50" cy="63.8" r="12.2"/>
          <path class="gloss" d="M42.4 60A8.4 8.4 0 0 1 46.5 55.9"/>
          <ellipse class="blush" cx="43.5" cy="67.4" rx="2.4" ry="1.4"/>
          <ellipse class="blush" cx="56.5" cy="67.4" rx="2.4" ry="1.4"/>
          <circle class="ink" cx="45.6" cy="62.9" r="2"/>
          <circle class="ink" cx="54.4" cy="62.9" r="2"/>
          <ellipse class="ink" cx="50" cy="67.8" rx="1.8" ry="2.2"/>
        </g>
      </g>
      <g class="hop b3">
        <g class="sq sq3">
          <circle class="bub bub3" cx="77.5" cy="63.8" r="12.2"/>
          <path class="gloss" d="M69.9 60A8.4 8.4 0 0 1 74 55.9"/>
          <ellipse class="blush" cx="71" cy="67.4" rx="2.4" ry="1.4"/>
          <ellipse class="blush" cx="84" cy="67.4" rx="2.4" ry="1.4"/>
          <path class="line" d="M71.1 64.2q2-2.7 4 0M79.9 64.2q2-2.7 4 0M75.2 67q2.3 2.3 4.6 0"/>
        </g>
      </g>`,
    css: `
      ROOT .bub { stroke: #3b2f4a; stroke-width: 2.4 }
      ROOT .bub1, ROOT .sh1 { fill: var(--c1) }
      ROOT .bub2, ROOT .sh2 { fill: var(--c2) }
      ROOT .bub3, ROOT .sh3 { fill: var(--c3) }
      ROOT .gloss { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; opacity: .85 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .line { fill: none; stroke: #3b2f4a; stroke-width: 1.7; stroke-linecap: round }
      ROOT .blush { fill: #f0508f; opacity: .35 }
      ROOT .hop { animation: K_hop var(--d) infinite }
      ROOT .sq { animation: K_sq var(--d) ease-in-out infinite }
      ROOT .sq1 { transform-origin: 22.5px 76px }
      ROOT .sq2 { transform-origin: 50px 76px }
      ROOT .sq3 { transform-origin: 77.5px 76px }
      ROOT .shadow { transform-box: fill-box; transform-origin: center; animation: K_shadow var(--d) infinite }
      ROOT .b2, ROOT .sq2, ROOT .sh2 { animation-delay: calc(var(--d) * -0.85) }
      ROOT .b3, ROOT .sq3, ROOT .sh3 { animation-delay: calc(var(--d) * -0.7) }
      @keyframes K_hop {
        0% { transform: translateY(0); animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        45% { transform: translateY(-24px); animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        85%, 100% { transform: translateY(0) }
      }
      @keyframes K_sq {
        0% { transform: scale(.9, 1.12) }
        20% { transform: scale(.98, 1.03) }
        45% { transform: scale(1.03, .97) }
        75% { transform: scale(.93, 1.08) }
        85% { transform: scale(1.2, .8) }
        92% { transform: scale(.96, 1.05) }
        97% { transform: scale(1.1, .9) }
        100% { transform: scale(.9, 1.12) }
      }
      @keyframes K_shadow {
        0% { transform: scale(1); opacity: .5; animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        45% { transform: scale(.5); opacity: .18; animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        85% { transform: scale(1.15); opacity: .58 }
        100% { transform: scale(1); opacity: .5 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "blinking-star",
    name: "Blinking Star",
    category: "cute",
    description:
      "A chubby star rocks back and forth with a sleepy blink, twinkling softly while little diamond sparkles pulse around it.",
    details:
      "Restless in the best way, this star rocks from side to side, rises and dips as it goes, and pops with a small twinkle at every turn. It blinks once per loop, and four diamond sparkles pulse in turn around it as if it were glowing with pride. Try it on reward and achievement screens, rating prompts, kids' reading apps or a \"making it magical\" step. Star colors the character, and Sparkles sets the diamonds; a lavender star with gold sparkles suits a night theme.",
    tags: ["star", "twinkle", "sparkles", "blink", "character", "magical"],
    kind: "character",
    colors: { primary: "#fcd34d", secondary: "#a78bfa" },
    colorLabels: { primary: "Star", secondary: "Sparkles" },
    duration: 1.6,
    popularity: 83,
    svg: `
      <path class="dia" d="M15 12L18.6 18L15 24L11.4 18Z"/>
      <path class="dia d2" d="M86 12L89 17L86 22L83 17Z"/>
      <path class="dia d3" d="M88 68.6L91.2 74L88 79.4L84.8 74Z"/>
      <path class="dia d4" d="M12 71.4L14.8 76L12 80.6L9.2 76Z"/>
      <g class="float">
        <g class="rock">
          <g class="pop">
            <path class="star" d="M46.78 24.64Q50 19 53.22 24.64L59.49 35.6Q60.87 38.03 63.62 38.6L75.97 41.17Q82.34 42.49 77.96 47.3L69.48 56.64Q67.59 58.72 67.9 61.5L69.28 74.05Q69.98 80.51 64.06 77.84L52.55 72.65Q50 71.5 47.45 72.65L35.94 77.84Q30.02 80.51 30.72 74.05L32.1 61.5Q32.41 58.72 30.52 56.64L22.04 47.3Q17.66 42.49 24.03 41.17L36.38 38.6Q39.13 38.03 40.51 35.6Z"/>
            <path class="shine" d="M45.6 31.8L47.6 28"/>
            <ellipse class="blush" cx="38.5" cy="58.5" rx="3.2" ry="1.9"/>
            <ellipse class="blush" cx="61.5" cy="58.5" rx="3.2" ry="1.9"/>
            <g class="eyes">
              <circle class="ink" cx="43" cy="52.5" r="2.7"/>
              <circle class="ink" cx="57" cy="52.5" r="2.7"/>
              <circle class="glint" cx="43.9" cy="51.6" r=".95"/>
              <circle class="glint" cx="57.9" cy="51.6" r=".95"/>
            </g>
            <path class="mouth" d="M46.8 58q3.2 3.2 6.4 0"/>
          </g>
        </g>
      </g>`,
    css: `
      ROOT .star { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .shine { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .9 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.9; stroke-linecap: round }
      ROOT .blush { fill: #ff7a9a; opacity: .5 }
      ROOT .dia { fill: var(--c2); stroke: var(--c2); stroke-width: 1.2; stroke-linejoin: round; transform-box: fill-box; transform-origin: center; animation: K_dia var(--d) ease-in-out infinite }
      ROOT .d2 { animation-delay: calc(var(--d) * -0.25) }
      ROOT .d3 { animation-delay: calc(var(--d) * -0.5) }
      ROOT .d4 { animation-delay: calc(var(--d) * -0.75) }
      ROOT .float { animation: K_float var(--d) cubic-bezier(.37, 0, .63, 1) infinite; animation-delay: calc(var(--d) * -0.25) }
      ROOT .rock { transform-origin: 50px 53px; animation: K_rock var(--d) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .pop { transform-origin: 50px 53px; animation: K_pop calc(var(--d) / 2) ease-out infinite }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      @keyframes K_float { 0%, 100% { transform: translateY(2.5px) } 50% { transform: translateY(-2.5px) } }
      @keyframes K_rock { 0%, 100% { transform: rotate(-8deg) } 50% { transform: rotate(8deg) } }
      @keyframes K_pop { 0%, 100% { transform: scale(1) } 12% { transform: scale(1.07, 1.05) } 32% { transform: scale(.98) } 50% { transform: scale(1) } }
      @keyframes K_blink { 0%, 70%, 80%, 100% { transform: scaleY(1) } 73%, 77% { transform: scaleY(.1) } }
      @keyframes K_dia { 0%, 100% { transform: scale(.35); opacity: .35 } 50% { transform: scale(1.1); opacity: 1 } }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "cute-planet",
    name: "Cute Planet",
    category: "cute",
    description:
      "With a tilted ring and a contented smile, this little planet floats in space while a tiny moon orbits, slipping behind it and back in front.",
    details:
      "Layered like a real orbit, the moon slips behind the planet, swings around in front of its ring and grows a touch larger as it comes closer. The planet itself bobs and tilts gently, perfectly happy to wait with you. Space-themed sites, astronomy and education apps, kids' science content and \"launching soon\" or deploy screens are all natural homes for it. Planet colors the globe, Ring sets the tilted band and the blush, and Moon tints the orbiting moon; it also runs in reverse, so the moon can circle the other way.",
    tags: ["planet", "orbit", "moon", "space", "character", "float"],
    kind: "orbit",
    colors: { primary: "#6ee7b7", secondary: "#f9a8d4", accent: "#fde68a" },
    colorLabels: { primary: "Planet", secondary: "Ring", accent: "Moon" },
    duration: 2.4,
    direction: true,
    popularity: 78,
    svg: `
      <g class="float">
        <g transform="rotate(22 50 50)">
          <g class="mx"><g class="my"><g class="moon">
            <circle class="moon-body" cx="50" cy="50" r="5.2"/>
            <circle class="crater" cx="48.4" cy="48.8" r="1.4"/>
          </g></g></g>
        </g>
        <g transform="rotate(-16 50 50)">
          <path class="ring-o" d="M16 57A34 8.5 0 0 1 84 57"/>
          <path class="ring-f" d="M16 57A34 8.5 0 0 1 84 57"/>
        </g>
        <circle class="planet" cx="50" cy="50" r="20"/>
        <circle class="spot" cx="40.5" cy="39.5" r="3.2"/>
        <circle class="spot" cx="58.5" cy="35.5" r="1.8"/>
        <ellipse class="blush" cx="39.5" cy="52.5" rx="3" ry="1.8"/>
        <ellipse class="blush" cx="60.5" cy="52.5" rx="3" ry="1.8"/>
        <g class="eyes">
          <circle class="ink" cx="44" cy="47.5" r="2.4"/>
          <circle class="ink" cx="56" cy="47.5" r="2.4"/>
          <circle class="glint" cx="44.8" cy="46.7" r=".85"/>
          <circle class="glint" cx="56.8" cy="46.7" r=".85"/>
        </g>
        <path class="mouth" d="M47.2 51.8q2.8 2.8 5.6 0"/>
        <g transform="rotate(-16 50 50)">
          <path class="ring-o" d="M84 57A34 8.5 0 0 1 16 57"/>
          <path class="ring-f" d="M84 57A34 8.5 0 0 1 16 57"/>
        </g>
        <g transform="rotate(22 50 50)">
          <g class="mx"><g class="my"><g class="moon front">
            <circle class="moon-body" cx="50" cy="50" r="5.2"/>
            <circle class="crater" cx="48.4" cy="48.8" r="1.4"/>
          </g></g></g>
        </g>
      </g>`,
    css: `
      ROOT .planet { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4 }
      ROOT .spot { fill: #fff; opacity: .4 }
      ROOT .ring-o { fill: none; stroke: #3b2f4a; stroke-width: 7.6 }
      ROOT .ring-f { fill: none; stroke: var(--c2); stroke-width: 3 }
      ROOT .moon-body { fill: var(--c3); stroke: #3b2f4a; stroke-width: 2.2 }
      ROOT .crater { fill: #3b2f4a; opacity: .18 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.8; stroke-linecap: round }
      ROOT .blush { fill: var(--c2); opacity: .7 }
      ROOT .float { transform-origin: 50px 50px; animation: K_float var(--d) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .mx { animation: K_mx var(--d) cubic-bezier(.37, 0, .63, 1) infinite }
      ROOT .my { animation: K_my var(--d) cubic-bezier(.37, 0, .63, 1) infinite; animation-delay: calc(var(--d) * -0.25) }
      ROOT .moon { transform-box: fill-box; transform-origin: center; animation: K_depth var(--d) cubic-bezier(.37, 0, .63, 1) infinite, K_back var(--d) linear infinite; animation-delay: calc(var(--d) * -0.25) }
      ROOT .front { animation-name: K_depth, K_front }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      @keyframes K_float { 0%, 100% { transform: translateY(2.5px) rotate(-2deg) } 50% { transform: translateY(-2.5px) rotate(2deg) } }
      @keyframes K_mx { 0%, 100% { transform: translateX(38px) } 50% { transform: translateX(-38px) } }
      @keyframes K_my { 0%, 100% { transform: translateY(13px) } 50% { transform: translateY(-13px) } }
      @keyframes K_depth { 0%, 100% { transform: scale(1.12) } 50% { transform: scale(.82) } }
      @keyframes K_back { 0%, 24.9% { opacity: 0 } 25%, 74.9% { opacity: 1 } 75%, 100% { opacity: 0 } }
      @keyframes K_front { 0%, 24.9% { opacity: 1 } 25%, 74.9% { opacity: 0 } 75%, 100% { opacity: 1 } }
      @keyframes K_blink { 0%, 40%, 50%, 100% { transform: scaleY(1) } 43%, 47% { transform: scaleY(.1) } }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "rolling-panda",
    name: "Rolling Panda",
    category: "cute",
    description:
      "A round little panda crouches, tumbles head over heels in one happy somersault and lands with a squash, a bamboo sprig wobbling on its head.",
    details:
      "Part acrobat, part dumpling, this panda tucks in, flips a full somersault and plops back down with a satisfying squash before doing it all again. The bamboo sprig on its head trails behind every turn, and a quick blink between rolls keeps it lively. It suits kids' games, zoo and travel sites, Asian-inspired food brands and any playful \"hang tight\" screen. Fur sets the white coat, Patches colors the ears, eye patches, paws and nose, and Bamboo tints the sprig; a cream coat with cocoa patches gives you a sleepy brown panda.",
    tags: ["panda", "roll", "somersault", "character", "playful", "squash and stretch"],
    kind: "character",
    colors: { primary: "#fbfaff", secondary: "#5b4f73", accent: "#4ade80" },
    colorLabels: { primary: "Fur", secondary: "Patches", accent: "Bamboo" },
    duration: 1.6,
    popularity: 84,
    svg: `
      <ellipse class="shadow" cx="50" cy="78" rx="18" ry="2.8"/>
      <g class="hop">
        <g class="squash">
          <g class="roll">
            <g class="sprig">
              <path class="stalk" d="M50 33V24"/>
              <path class="leaf" d="M50.5 25.5C53 19 59 16.5 65 17.5C62.5 23.5 56 26.5 50.5 25.5Z"/>
            </g>
            <circle class="patch" cx="35" cy="36" r="6.5"/>
            <circle class="patch" cx="65" cy="36" r="6.5"/>
            <ellipse class="patch" cx="41" cy="73" rx="5.5" ry="3.8"/>
            <ellipse class="patch" cx="59" cy="73" rx="5.5" ry="3.8"/>
            <circle class="fur" cx="50" cy="53" r="21"/>
            <ellipse class="mask" cx="41.5" cy="51.5" rx="5" ry="6.2" transform="rotate(28 41.5 51.5)"/>
            <ellipse class="mask" cx="58.5" cy="51.5" rx="5" ry="6.2" transform="rotate(-28 58.5 51.5)"/>
            <g class="eyes">
              <circle class="white" cx="42.3" cy="50.6" r="2.3"/>
              <circle class="white" cx="57.7" cy="50.6" r="2.3"/>
              <circle class="ink" cx="42.6" cy="50.9" r="1.3"/>
              <circle class="ink" cx="57.4" cy="50.9" r="1.3"/>
            </g>
            <ellipse class="blush" cx="36.5" cy="60" rx="2.8" ry="1.6"/>
            <ellipse class="blush" cx="63.5" cy="60" rx="2.8" ry="1.6"/>
            <ellipse class="nose" cx="50" cy="57.8" rx="2" ry="1.4"/>
            <path class="mouth" d="M47.8 59.8q1.1 1.3 2.2 0q1.1 1.3 2.2 0"/>
            <ellipse class="patch" cx="30.5" cy="63" rx="5.2" ry="4" transform="rotate(35 30.5 63)"/>
            <ellipse class="patch" cx="69.5" cy="63" rx="5.2" ry="4" transform="rotate(-35 69.5 63)"/>
          </g>
        </g>
      </g>`,
    css: `
      ROOT .fur { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4 }
      ROOT .patch { fill: var(--c2); stroke: #3b2f4a; stroke-width: 2.2 }
      ROOT .mask, ROOT .nose { fill: var(--c2) }
      ROOT .white { fill: #fff }
      ROOT .ink { fill: #3b2f4a }
      ROOT .blush { fill: #ff8fb1; opacity: .6 }
      ROOT .mouth { fill: none; stroke: #3b2f4a; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round }
      ROOT .stalk { fill: none; stroke: #3b2f4a; stroke-width: 2.2; stroke-linecap: round }
      ROOT .leaf { fill: var(--c3); stroke: #3b2f4a; stroke-width: 2; stroke-linejoin: round }
      ROOT .shadow { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: K_shadow var(--d) infinite }
      ROOT .hop { animation: K_hop var(--d) infinite }
      ROOT .squash { transform-origin: 50px 74px; animation: K_squash var(--d) ease-in-out infinite }
      ROOT .roll { transform-origin: 50px 53px; animation: K_roll var(--d) infinite }
      ROOT .sprig { transform-origin: 50px 33px; animation: K_sprig var(--d) ease-in-out infinite }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink var(--d) infinite }
      @keyframes K_hop {
        0%, 31% { transform: translateY(0); animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        56% { transform: translateY(-15px); animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        81%, 100% { transform: translateY(0) }
      }
      @keyframes K_squash {
        0% { transform: scale(1.05, .95) }
        8% { transform: scale(.98, 1.02) }
        16% { transform: scale(1, 1) }
        27% { transform: scale(1.1, .9) }
        33% { transform: scale(.93, 1.07) }
        50% { transform: scale(1, 1) }
        75% { transform: scale(.97, 1.03) }
        81% { transform: scale(1.16, .84) }
        90% { transform: scale(.97, 1.03) }
        100% { transform: scale(1.05, .95) }
      }
      @keyframes K_roll {
        0%, 31% { transform: rotate(0deg); animation-timing-function: cubic-bezier(.5, 0, .35, 1) }
        81%, 100% { transform: rotate(360deg) }
      }
      @keyframes K_sprig {
        0%, 100% { transform: rotate(8deg) }
        12% { transform: rotate(-6deg) }
        24% { transform: rotate(4deg) }
        40% { transform: rotate(-24deg) }
        62% { transform: rotate(-10deg) }
        84% { transform: rotate(26deg) }
        92% { transform: rotate(-8deg) }
      }
      @keyframes K_blink { 0%, 12%, 22%, 100% { transform: scaleY(1) } 15%, 19% { transform: scaleY(.12) } }
      @keyframes K_shadow {
        0%, 31% { transform: scale(1.05); opacity: .32; animation-timing-function: cubic-bezier(.33, 1, .68, 1) }
        56% { transform: scale(.6); opacity: .14; animation-timing-function: cubic-bezier(.32, 0, .67, 0) }
        81% { transform: scale(1.14); opacity: .36 }
        100% { transform: scale(1.05); opacity: .32 }
      }`,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "waddling-penguin",
    name: "Waddling Penguin",
    category: "cute",
    description:
      "A plump penguin waddles in place, rocking from foot to foot with a tiny hop on every step while its flippers flap for balance.",
    details:
      "Every step is a small adventure for this penguin: it tips onto one foot, hops over to the other and flaps a flipper to stay upright. Its white belly catches the light, and it blinks every other waddle so it always feels awake. Drop it into winter campaigns, travel and weather apps, kids' learning games or any cool, friendly waiting state. Body colors the back and flippers, Belly sets the face and tummy, and Beak & feet tints the beak and toes; a charcoal body with a sunny beak gives it a classic emperor look on light pages.",
    tags: ["penguin", "waddle", "rock", "character", "winter", "playful"],
    kind: "character",
    colors: { primary: "#7b8cf2", secondary: "#fdfcff", accent: "#fb923c" },
    colorLabels: { primary: "Body", secondary: "Belly", accent: "Beak & feet" },
    duration: 1.2,
    popularity: 82,
    svg: `
      <ellipse class="shadow" cx="50" cy="87" rx="18" ry="2.8"/>
      <g class="step">
        <g class="waddle">
          <ellipse class="foot foot-l" cx="41" cy="83" rx="6.4" ry="3.2"/>
          <ellipse class="foot foot-r" cx="59" cy="83" rx="6.4" ry="3.2"/>
          <g class="flip-l"><ellipse class="body" cx="27" cy="57" rx="5" ry="11" transform="rotate(16 27 57)"/></g>
          <g class="flip-r"><ellipse class="body" cx="73" cy="57" rx="5" ry="11" transform="rotate(-16 73 57)"/></g>
          <path class="body" d="M50 20C64 20 72 34 72 54C72 72 63 82 50 82C37 82 28 72 28 54C28 34 36 20 50 20Z"/>
          <path class="belly" d="M50 37.5C53 32.5 59.5 31.5 63 35.5C66.2 39 66 46 65.6 53C65.6 67 59 77.5 50 77.5C41 77.5 34.4 67 34.4 53C34 46 33.8 39 37 35.5C40.5 31.5 47 32.5 50 37.5Z"/>
          <path class="gloss" d="M33.5 39Q35 30 41.5 25.5"/>
          <ellipse class="blush" cx="39.5" cy="53" rx="3" ry="1.8"/>
          <ellipse class="blush" cx="60.5" cy="53" rx="3" ry="1.8"/>
          <g class="eyes">
            <circle class="ink" cx="43.5" cy="46" r="2.5"/>
            <circle class="ink" cx="56.5" cy="46" r="2.5"/>
            <circle class="glint" cx="44.4" cy="45.1" r=".9"/>
            <circle class="glint" cx="57.4" cy="45.1" r=".9"/>
          </g>
          <path class="beak" d="M45.8 51Q50 48.6 54.2 51Q50 56.2 45.8 51Z"/>
        </g>
      </g>`,
    css: `
      ROOT .body { fill: var(--c1); stroke: #3b2f4a; stroke-width: 2.4; stroke-linejoin: round }
      ROOT .belly { fill: var(--c2) }
      ROOT .foot, ROOT .beak { fill: var(--c3); stroke: #3b2f4a; stroke-width: 2; stroke-linejoin: round }
      ROOT .gloss { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; opacity: .55 }
      ROOT .ink { fill: #3b2f4a }
      ROOT .glint { fill: #fff }
      ROOT .blush { fill: #ff8fb1; opacity: .55 }
      ROOT .shadow { fill: var(--c1); opacity: .3; transform-box: fill-box; transform-origin: center; animation: K_shadow calc(var(--d) / 2) ease-in-out infinite }
      ROOT .step { animation: K_step calc(var(--d) / 2) ease-in-out infinite }
      ROOT .waddle { transform-origin: 50px 84px; animation: K_waddle var(--d) cubic-bezier(.45, 0, .55, 1) infinite }
      ROOT .foot-l { transform-origin: 41px 84px; animation: K_footL var(--d) ease-in-out infinite }
      ROOT .foot-r { transform-origin: 59px 84px; animation: K_footR var(--d) ease-in-out infinite }
      ROOT .flip-l { transform-origin: 30px 47px; animation: K_flipL var(--d) ease-in-out infinite }
      ROOT .flip-r { transform-origin: 70px 47px; animation: K_flipR var(--d) ease-in-out infinite }
      ROOT .eyes { transform-box: fill-box; transform-origin: center; animation: K_blink calc(var(--d) * 2) infinite }
      @keyframes K_waddle { 0%, 100% { transform: rotate(-8deg) } 50% { transform: rotate(8deg) } }
      @keyframes K_step { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3.5px) } }
      @keyframes K_footL { 0%, 25%, 75%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-3px) rotate(-12deg) } }
      @keyframes K_footR { 0%, 100% { transform: translateY(-3px) rotate(12deg) } 25%, 75% { transform: translateY(0) rotate(0deg) } }
      @keyframes K_flipL { 0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(32deg) } }
      @keyframes K_flipR { 0%, 100% { transform: rotate(-32deg) } 50% { transform: rotate(0deg) } }
      @keyframes K_blink { 0%, 40%, 48%, 100% { transform: scaleY(1) } 43%, 45% { transform: scaleY(.12) } }
      @keyframes K_shadow { 0%, 100% { transform: scale(1) } 50% { transform: scale(.88) } }`,
  },
];

export default cute;

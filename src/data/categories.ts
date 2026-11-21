import type { Category, CategoryId } from "@/types/animation";

export const CATEGORIES: Category[] = [
  {
    id: "cute",
    name: "Cute & Playful",
    shortName: "Cute",
    tagline: "Characters with personality for friendly products.",
    intro:
      "Hand-drawn little characters that hop, nap, wave and wobble while your content loads. They work well when you want waiting to feel friendly instead of frustrating.",
    body: [
      "Cute loaders do more than fill time. A bunny that squashes when it lands or a cat that breathes in its sleep tells visitors your product has a personality. That fits kids' learning apps, pet shops, bakeries, games, creator tools, and playful SaaS onboarding.",
      "Every character here is built from inline SVG and plain CSS keyframes, with no images or JavaScript runtime. That keeps them sharp at any size and light enough for a first paint. Each uses real animation principles like squash and stretch, follow-through on ears and tails, and quick blinks, so the motion reads as alive rather than mechanical.",
      "Use them where a moment of delight helps: splash screens, empty states, uploads, or a checkout confirmation. For dense dashboards or very frequent micro-waits, a quieter loader from the Minimal & Professional collection is usually the better choice.",
    ],
    seoTitle: "Free Cute Loading Animations for Websites",
    seoDescription:
      "Free cute loading animations: a bouncing bunny, sleeping cat, waving ghost and more. Customize colors, speed and size, then copy HTML/CSS, React or SVG code.",
    faqs: [
      {
        q: "Are cute loading animations professional enough for a business website?",
        a: "Yes, when they match your brand. A friendly character suits consumer products, education, food, pets and creative tools. Adjust the colors to your palette and use the character on longer waits such as splash screens or uploads, where personality is welcome.",
      },
      {
        q: "Will a character animation slow my page down?",
        a: "These loaders are small inline SVGs animated with CSS transforms and opacity, which browsers handle on the compositor. There are no image downloads or animation libraries, and offscreen previews pause automatically.",
      },
      {
        q: "Can I change the character colors?",
        a: "Every loader exposes its color roles, such as body, cheeks or ears, as CSS custom properties. Change them in the studio with live preview, or edit the --c1, --c2 and --c3 variables in the exported CSS.",
      },
    ],
    accent: "#f472b6",
  },
  {
    id: "abstract",
    name: "Abstract & Creative",
    shortName: "Abstract",
    tagline: "Fluid shapes, gradients and hypnotic motion.",
    intro:
      "Morphing blobs, neon rings, orbiting particles and flowing gradients for brands that want their loading state to feel like part of the design.",
    body: [
      "Abstract loaders suit creative portfolios, music and video apps, AI products, and landing pages where every detail is on brand. With no literal subject, they adapt to almost any visual identity: pick two or three brand colors and the loader looks bespoke.",
      "Liquid and morphing effects here avoid the expensive tricks (animated blur filters, path morphing that Safari can't play). Instead they layer translucent shapes that rotate, scale and drift in coordinated loops. That gives an organic feel while staying smooth on mid-range phones.",
      "Because these loaders draw the eye, they work best on longer waits such as generating an image, processing a file, or loading a full experience. For short in-place waits, consider a calmer spinner.",
    ],
    seoTitle: "Abstract & Creative Loading Animations (Free)",
    seoDescription:
      "Free abstract loading animations: liquid morphs, gradient waves, neon rings and orbiting particles. Customize three colors live and copy CSS, SVG or React code.",
    faqs: [
      {
        q: "How do I make an abstract loader match my brand?",
        a: "Most abstract loaders use three color roles. Set them to your primary, secondary and accent brand colors in the studio, then adjust speed. Slower cycles feel premium and calm; faster cycles feel energetic.",
      },
      {
        q: "Do these effects work in Safari?",
        a: "Yes. The loaders use CSS transforms, opacity and stroke animations that work in current versions of Chrome, Edge, Firefox and Safari. They deliberately avoid CSS path morphing, which Safari doesn't support.",
      },
      {
        q: "Can I use an abstract loader as a full-page preloader?",
        a: "Yes. Export the HTML/CSS or JavaScript version and place it in a fixed overlay. The JavaScript export includes show(), hide() and track() helpers with an optional delay, so fast loads never flash the overlay.",
      },
    ],
    accent: "#8b5cf6",
  },
  {
    id: "minimal",
    name: "Minimal & Professional",
    shortName: "Minimal",
    tagline: "Clean spinners for dashboards, forms and buttons.",
    intro:
      "Precise rings, dots, bars and progress indicators that stay out of the way. These are the workhorse loaders for SaaS dashboards, admin panels, checkouts and form submits.",
    body: [
      "A professional loader should be easy to spot and easy to ignore. The loaders in this collection use one or two colors, round stroke caps and carefully tuned easing, so they look at home next to tables, cards and buttons in any design system.",
      "They scale cleanly from a 16px button spinner to a large page indicator. Stroke-based loaders let you set the line weight to match your icon set. Spinners, orbits and rings can also be reversed if your interface reads right-to-left or you simply prefer the other direction.",
      "Use indeterminate loaders (rings, dots, bars) when you can't know how long an action will take, and the Smooth Progress Ring when you want a calm sense of progress. If a wait regularly exceeds a few seconds, pair the loader with a short status message.",
    ],
    seoTitle: "Minimal Loading Spinners & Professional Loaders",
    seoDescription:
      "Free minimal loading spinners for dashboards, buttons and forms: rings, dots, wave bars and progress rings. Adjust stroke, color and speed, then copy clean code.",
    faqs: [
      {
        q: "Which loader should I use inside a button?",
        a: "Minimal Ring, Elegant Spinner and Three Dot Pulse read well at 16–20px. Set the size to match your button's font size, set the primary color to the button text color, and keep the button disabled while the request runs.",
      },
      {
        q: "Should I use a spinner or a progress indicator?",
        a: "Use a spinner when the duration is unknown, such as a network request. Use a determinate progress bar when you can measure progress, such as an upload with progress events. The Smooth Progress Ring gives a progress feel for waits you can't measure.",
      },
      {
        q: "Can I match the stroke width to my icon set?",
        a: "Yes. Stroke-based loaders expose a stroke width control in the studio and a --sw CSS variable in the export. Common icon sets use the equivalent of 1.5–2px at 24px.",
      },
    ],
    accent: "#6366f1",
  },
  {
    id: "technology",
    name: "Technology & Coding",
    shortName: "Technology",
    tagline: "Terminals, circuits, pixels and neural nets.",
    intro:
      "Loaders that speak developer: typing terminals, meshing gears, circuit pulses, pixel grids and neural networks. A natural fit for dev tools, docs, CI dashboards and AI products.",
    body: [
      "When your audience writes code, a loader can wink at them. A terminal that types a command or gears that actually mesh feel native in developer tools, API dashboards, documentation sites, hosting consoles and coding courses.",
      "Mechanical details are accurate: gear speeds follow their tooth ratios, data packets travel in both directions, and neural signals move through the layers in order. The pixel and binary loaders use stepped timing for a deliberately retro rhythm.",
      "These loaders are especially useful for operations users expect to take a while, such as builds, deployments, file processing or model inference. The motion signals that real work is happening in the background.",
    ],
    seoTitle: "Technology & Coding Loading Animations",
    seoDescription:
      "Free tech loading animations for developer tools and AI apps: terminal typing, binary rain, circuit pulse, processing gears and more. Copy HTML/CSS or React.",
    faqs: [
      {
        q: "Will the terminal typing loader look the same on every operating system?",
        a: "It uses your platform's monospace font (for example Menlo, Consolas or the system UI monospace). Each glyph is positioned individually, so the typing rhythm and cursor stay aligned even though letterforms vary slightly between systems.",
      },
      {
        q: "Are these loaders suitable for an AI product?",
        a: "Yes. AI Neural Pulse and Connected Nodes were designed for model inference and generation waits. Pair them with a short status line such as \"Generating…\" for waits longer than a couple of seconds.",
      },
      {
        q: "Can I use them in a dark-themed dashboard?",
        a: "All loaders are checked on white and near-black backgrounds. Set the colors to your dashboard's accent palette in the studio, or switch the preview background to dark while you tune them.",
      },
    ],
    accent: "#22d3ee",
  },
  {
    id: "nature",
    name: "Nature & Aesthetic",
    shortName: "Nature",
    tagline: "Blooms, waves, fireflies and starry skies.",
    intro:
      "Calm, organic loaders inspired by gardens, oceans and night skies. Ideal for wellness, travel, weather, florists, meditation and any brand that wants waiting to feel peaceful.",
    body: [
      "Nature loaders slow things down in a good way. A flower blooming, waves rolling under a little boat, or fireflies drifting over grass turn a pause into a small calm moment. That fits wellness and meditation apps, travel booking, weather services, florists and lifestyle brands.",
      "The scenes are illustrated with soft gradients and gentle easing. Night-sky loaders draw their own backdrop so glows stay visible on light pages. Every scene loops seamlessly, so it can run for a while without visible restarts.",
      "Tune the palette to your season or brand: warm corals and yellows for spring and summer campaigns, deep indigos for night-themed experiences, or muted sage for a calm, editorial look.",
    ],
    seoTitle: "Nature & Aesthetic Loading Animations (Free)",
    seoDescription:
      "Free nature loading animations: blooming flower, ocean waves, firefly glow, moon phases and aurora. Customize the palette and copy HTML/CSS, SVG or React code.",
    faqs: [
      {
        q: "Which nature loader works best for a wellness or meditation app?",
        a: "Blooming Flower, Aurora Flow and Ocean Waves have slow, breathing rhythms that suit calm products. Lower the speed in the studio for an even gentler cycle.",
      },
      {
        q: "Do the night-sky loaders work on a white page?",
        a: "Yes. Firefly Glow, Moon Phases, Shooting Star and Aurora Flow include their own night backdrop, so the glowing elements stay visible on light and dark pages alike.",
      },
      {
        q: "Can I download a nature loader as an animated SVG?",
        a: "Yes. The SVG export embeds the CSS animation inside the file, so it animates when opened in a browser or used in an <img> tag.",
      },
    ],
    accent: "#84cc16",
  },
  {
    id: "business",
    name: "Business & E-commerce",
    shortName: "Business",
    tagline: "Carts, payments, charts and deliveries.",
    intro:
      "Loaders that show exactly what is happening: a card being charged, a cart filling up, a parcel on its way. Built for online stores, SaaS billing, dashboards and logistics.",
    body: [
      "Waiting is most stressful when money or orders are involved. A loader that depicts the actual step, such as a payment going through or an order being packed, reassures customers that the action registered and the system is working. That fits checkout flows, payment confirmations, order tracking, invoicing tools and analytics dashboards.",
      "The illustrations use a clean, flat style with a professional palette that sits comfortably inside commerce themes and admin panels. Like every loader in the library, they're inline SVG and CSS, so they stay crisp on retina screens and add almost nothing to your page weight.",
      "Use them for the waits customers care about most: submitting a payment, generating a report, syncing inventory or sending a campaign. Pair longer waits with a short status message such as \"Processing payment…\" so people know not to refresh.",
    ],
    seoTitle: "Business & E-commerce Loading Animations",
    seoDescription:
      "Free e-commerce and business loading animations: shopping cart, card payment, growth chart, delivery truck and more. Customize colors and copy HTML/CSS or React.",
    faqs: [
      {
        q: "Which loader should I show while a payment is processing?",
        a: "Card Payment was designed for that moment: the card slides into a terminal and a check mark draws on success. Keep the pay button disabled while it runs and add a short message such as \"Processing payment…\" so customers don't submit twice.",
      },
      {
        q: "Can I match the loaders to my store's brand colors?",
        a: "Yes. Each loader exposes its color roles (for example body, accent and highlight) in the studio and as --c1, --c2 and --c3 custom properties in the exported CSS, so it can follow your theme, including dark mode.",
      },
      {
        q: "Do these loaders work in Shopify, WooCommerce or other store builders?",
        a: "Use the Embed export: it combines the styles and markup into one snippet that you can paste into a custom HTML or Liquid block. The JavaScript export adds show/hide helpers for AJAX cart updates.",
      },
    ],
    accent: "#4f46e5",
  },
  {
    id: "food",
    name: "Food & Drinks",
    shortName: "Food",
    tagline: "Steaming coffee, flipping pancakes, popping corn.",
    intro:
      "Appetizing little scenes for cafes, restaurants, food delivery and recipe sites: coffee that steams, noodles that stretch and pancakes that flip while your menu or order loads.",
    body: [
      "Food brands live on warmth and appetite, and a generic spinner throws both away. A cup of coffee gently steaming or a pancake flipping in a pan keeps the mood of a menu or ordering flow intact while data loads. That fits cafes, restaurants, food delivery apps, meal-kit services, grocery stores and recipe blogs.",
      "Each scene is illustrated with warm, cozy palettes and real animation principles like squash and stretch on landings and follow-through on steam and liquid. They're still just a few kilobytes of SVG and CSS with no images, so they load instantly even on mobile data.",
      "Use them while a menu loads, an order is being placed, or a delivery estimate is calculated. For seasonal campaigns, shift the palette in the studio, for example cinnamon tones in autumn or fresh greens in spring.",
    ],
    seoTitle: "Food & Drinks Loading Animations (Free)",
    seoDescription:
      "Free food and drink loading animations: coffee steam, pizza slice, bubble tea, pancake flip and more. Perfect for cafes, restaurants and delivery apps. Copy the code.",
    faqs: [
      {
        q: "Which food loader works best for a coffee shop or cafe website?",
        a: "Coffee Steam and Tea Bag Dip have calm, cozy rhythms that suit cafes. Bubble Tea fits boba shops and dessert bars. Slow the speed slightly in the studio for an even more relaxed feel.",
      },
      {
        q: "Can I use a food loader in a delivery app while an order is placed?",
        a: "Yes. Export the React component for your app, or use the JavaScript export's track() helper to show the loader until the order request finishes. Add a short status line for waits longer than a couple of seconds.",
      },
      {
        q: "Will these illustrations look good on a dark menu?",
        a: "Every loader is checked on white and near-black backgrounds. Preview on the dark background in the studio and adjust the colors if your theme uses a tinted surface.",
      },
    ],
    accent: "#f59e0b",
  },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>;

export function getCategory(id: string): Category | undefined {
  return CATEGORY_MAP[id as CategoryId];
}

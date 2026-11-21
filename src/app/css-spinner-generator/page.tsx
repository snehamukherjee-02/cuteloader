import { GeneratorPage, type GeneratorContent } from "@/components/editor/GeneratorPage";
import { pageMetadata } from "@/lib/seo";

const SPINNER_KINDS = new Set(["spinner", "progress", "pulse", "orbit", "wave"]);

const content: GeneratorContent = {
  path: "/css-spinner-generator/",
  name: "CSS spinner generator",
  h1: "CSS Spinner Generator",
  intro:
    "Generate a custom CSS loading spinner in seconds. Choose a ring, dots, bars or orbit style, set its color, thickness and speed, and copy clean CSS with custom properties you can theme later.",
  defaultSlug: "elegant-spinner",
  initialTab: "html",
  filter: (a) => SPINNER_KINDS.has(a.kind) && (a.category === "minimal" || a.category === "abstract"),
  steps: [
    {
      title: "Pick a spinner style",
      text: "The picker lists the spinner-style loaders: rings, arcs, dots, bars and orbits from the Minimal and Abstract collections.",
    },
    {
      title: "Match your interface",
      text: "Set the arc and track colors, then adjust stroke width to match your icon set. Most interfaces look right somewhere between 1.5 and 2.5 at 24px.",
    },
    {
      title: "Copy the CSS",
      text: "Paste the CSS once, place the HTML where you need a spinner, and change --c1, --c2 or --d in your stylesheet whenever your theme changes.",
    },
  ],
  sections: [
    {
      heading: "Sizing spinners for buttons, cards and pages",
      paragraphs: [
        "A spinner should feel proportional to the area it's waiting for. In a button, match the font size (16–20px) and replace the label or sit next to it. Keep the button width stable so the layout doesn't jump. In a card or table, 32–48px reads clearly without dominating. For a full-page wait, go larger, and add a short message if it may last more than a few seconds.",
      ],
    },
    {
      heading: "Why these spinners stay smooth",
      paragraphs: [
        "Each spinner animates transforms and SVG stroke offsets, which browsers can run on the compositor thread. Even when JavaScript is busy parsing a large response, which is often exactly when a spinner is visible, the animation keeps moving.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I make a spinner thicker or thinner?",
      a: "Use the stroke width slider. In the exported CSS it's the --sw variable, so you can also set different thicknesses for different contexts, such as thinner spinners inside buttons.",
    },
    {
      q: "Can I reverse the spin direction?",
      a: "Yes. Rotating spinners have a “Reverse direction” toggle, and the exported CSS includes the matching rule.",
    },
    {
      q: "Do I need any JavaScript for a CSS spinner?",
      a: "No. Only showing and hiding it requires a line of code, for example toggling the hidden attribute when your data arrives.",
    },
  ],
  links: [
    { href: "/css-loaders/", label: "CSS loading animations" },
    { href: "/animations/minimal/", label: "Minimal & professional loaders" },
    { href: "/blog/how-to-create-css-loading-animation/", label: "Build a CSS spinner from scratch" },
    { href: "/blog/how-to-build-a-reusable-css-loader/", label: "Build a reusable CSS loader" },
    { href: "/loading-animation-generator/", label: "Full loading animation generator" },
  ],
};

export const metadata = pageMetadata({
  title: "CSS Spinner Generator – Custom Loading Spinners",
  description:
    "Free CSS spinner generator: pick a ring, dots, bars or orbit spinner, adjust color, stroke and speed live, and copy clean, themeable CSS and HTML.",
  path: content.path,
});

export default function Page() {
  return <GeneratorPage content={content} />;
}

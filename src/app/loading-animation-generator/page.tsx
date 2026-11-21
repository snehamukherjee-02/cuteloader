import { ANIMATIONS } from "@/animations";
import { GeneratorPage, type GeneratorContent } from "@/components/editor/GeneratorPage";
import { pageMetadata } from "@/lib/seo";

const content: GeneratorContent = {
  path: "/loading-animation-generator/",
  name: "Loading animation generator",
  h1: "Loading Animation Generator",
  intro:
    `Pick any of the ${ANIMATIONS.length} loaders, tune colors, size, speed and motion with a live preview, then export production-ready HTML/CSS, React, SVG, JavaScript or an animated GIF. Free, with no signup.`,
  defaultSlug: "bouncing-bunny",
  initialTab: "html",
  steps: [
    {
      title: "Choose a starting point",
      text: "Use the loader picker, the arrows, or shuffle for inspiration. Switching loaders keeps the studio open, so you can compare styles quickly.",
    },
    {
      title: "Customize with instant feedback",
      text: "Every control changes the real animation. Undo and redo with Ctrl+Z / Ctrl+Shift+Z, reset to the defaults, or shuffle a harmonious palette.",
    },
    {
      title: "Export or share",
      text: "Copy or download code in six formats, save your configuration as JSON, or copy a share link that reopens the generator with your exact settings.",
    },
  ],
  sections: [
    {
      heading: "Built for real projects, not just demos",
      paragraphs: [
        "The generator uses the same engine as the exported code, so what you see in the preview is exactly what ships. Exports are scoped to a single class to avoid style collisions. They're accessible out of the box with a status role, a hidden label and reduced-motion handling, and they don't depend on any library.",
        "Controls appear only when they apply. Stroke width shows up for line-based loaders, intensity for loaders with adjustable motion distance, and direction for spinners and orbits that look right in reverse. You won't see settings that do nothing.",
      ],
    },
    {
      heading: "Tips for choosing loader colors",
      paragraphs: [
        "Start from your brand's primary color for the most visible part of the loader, and use a lighter tint of it, or a neutral, for tracks and secondary shapes. Check the preview on both light and dark backgrounds with the toolbar toggle, since a loader often appears on top of different surfaces in the same product.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the loading animation generator free?",
      a: "Yes, completely. There are no accounts, limits or watermarks, and exported loaders can be used in commercial projects. Attribution is optional.",
    },
    {
      q: "Can I save my settings and come back later?",
      a: "Download your configuration as JSON and load it again with “Load config”, or copy a share link. All settings are encoded in the link itself, so nothing is stored on a server.",
    },
    {
      q: "Which export format should I pick?",
      a: "HTML + CSS for most websites, React for component-based apps, SVG when you need an image file, JavaScript for a ready-made overlay with show/hide helpers, Embed for website builders, and GIF for emails or slides.",
    },
  ],
  links: [
    { href: "/css-spinner-generator/", label: "CSS spinner generator" },
    { href: "/svg-loader-generator/", label: "SVG loader generator" },
    { href: "/animations/", label: "Browse all loaders" },
    { href: "/blog/how-to-customize-website-loading-animations/", label: "How to customize loading animations" },
    { href: "/guides/", label: "Integration guides" },
  ],
};

export const metadata = pageMetadata({
  title: "Loading Animation Generator – Free & Customizable",
  description:
    `Free loading animation generator: customize ${ANIMATIONS.length} CSS/SVG loaders live (colors, size, speed, stroke) and export HTML/CSS, React, SVG, JavaScript or GIF.`,
  path: content.path,
});

export default function Page() {
  return <GeneratorPage content={content} />;
}

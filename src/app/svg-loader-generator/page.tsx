import { GeneratorPage, type GeneratorContent } from "@/components/editor/GeneratorPage";
import { pageMetadata } from "@/lib/seo";

const content: GeneratorContent = {
  path: "/svg-loader-generator/",
  name: "SVG loader generator",
  h1: "SVG Loader Generator",
  intro:
    "Create an animated SVG loader file you can drop into an <img> tag, a CSS background or your markup. Customize it here first: the colors, speed and background are baked into the downloaded file.",
  defaultSlug: "blooming-flower",
  initialTab: "svg",
  steps: [
    {
      title: "Choose an illustration or shape",
      text: "Every loader in the library exports as SVG, from simple rings to illustrated scenes like the blooming flower or the ocean porthole.",
    },
    {
      title: "Bake in your settings",
      text: "Colors, speed, size and an optional solid background are written into the file's embedded stylesheet, so the file looks right anywhere.",
    },
    {
      title: "Download the .svg",
      text: "Use the SVG tab to copy or download the file. It's well-formed XML with no scripts and keeps every shape inside its viewBox.",
    },
  ],
  sections: [
    {
      heading: "SVG file vs inline SVG",
      paragraphs: [
        "A downloaded SVG file is self-contained: the animation lives in a <style> block inside it, so it plays in an <img> tag and in CSS backgrounds. Your page's CSS can't restyle it there, which is why the generator bakes your colors in. Inline SVG (the HTML export) can be themed from your stylesheet at runtime instead. Pick the file when you want an asset; pick inline when you want theming.",
      ],
    },
    {
      heading: "Where animated SVGs don't play",
      paragraphs: [
        "Browsers play the embedded CSS animation everywhere they render SVG. Some design tools, document editors and many email clients render only a static frame. If you need motion in those places, switch to the GIF tab and export an animated GIF instead.",
      ],
    },
  ],
  faqs: [
    {
      q: "Will the SVG animation work in an <img> tag?",
      a: "Yes. CSS animations inside SVG files play when the file is used as an image in modern browsers. Only scripts are blocked, and these files contain none.",
    },
    {
      q: "Can I make the SVG background transparent?",
      a: "Yes. Transparent is the default. Turn off “Transparent” in the Background controls to bake a solid background into the file.",
    },
    {
      q: "How big are the SVG files?",
      a: "Usually a few kilobytes, since they contain only vector shapes and a short stylesheet. They compress well with gzip or Brotli on your server.",
    },
  ],
  links: [
    { href: "/svg-loaders/", label: "Animated SVG loaders" },
    { href: "/blog/how-to-use-svg-loading-animations/", label: "How to use SVG loading animations" },
    { href: "/blog/css-spinner-vs-svg-loader/", label: "CSS spinner vs SVG loader" },
    { href: "/animations/nature/", label: "Nature & aesthetic loaders" },
    { href: "/loading-animation-generator/", label: "Full loading animation generator" },
  ],
};

export const metadata = pageMetadata({
  title: "SVG Loader Generator – Download Animated SVG Loaders",
  description:
    "Free SVG loader generator: customize colors, speed and background, then download an animated SVG file that works in <img> tags, CSS backgrounds or inline.",
  path: content.path,
});

export default function Page() {
  return <GeneratorPage content={content} />;
}

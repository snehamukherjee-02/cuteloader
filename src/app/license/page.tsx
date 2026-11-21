import Link from "next/link";
import { ProsePage } from "@/components/content/ProsePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "License: Free for Personal & Commercial Use",
  description:
    "CuteLoader animations are free to use, modify and ship in personal and commercial projects. Attribution is appreciated but optional. Read the full terms.",
  path: "/license/",
});

export default function LicensePage() {
  return (
    <ProsePage
      title="License"
      path="/license/"
      lead="Use the loaders anywhere: personal sites, client work, commercial products. Credit is appreciated, never required."
    >
      <h2>You may</h2>
      <ul>
        <li>Use any CuteLoader animation, customized or not, in personal and commercial projects.</li>
        <li>Modify the exported code: colors, timing, shapes, anything.</li>
        <li>Ship it in websites, web apps, mobile apps, games, templates you build for clients, and internal tools.</li>
        <li>Use the GIF and SVG exports in presentations, documents and emails.</li>
      </ul>
      <h2>Please don&apos;t</h2>
      <ul>
        <li>
          Resell or redistribute the loaders on their own, as a collection, or as part of another loader/icon library or
          template marketplace pack whose main value is the loaders themselves.
        </li>
        <li>Claim that you created the original animations, or imply that CuteLoader endorses your product.</li>
      </ul>
      <h2>Attribution (optional)</h2>
      <p>
        Exports include an optional credit comment and link, switched on by default. You can switch it off in the export panel.
        If you keep it, thank you! It helps other developers find free loaders. The credit link is a normal, visible link;
        we never add hidden links, tracking or redirects to exported code.
      </p>
      <h2>No warranty</h2>
      <p>
        The animations and generated code are provided “as is”, without warranty of any kind. You&apos;re responsible for
        testing them in your own project and for how you use them.
      </p>
      <h2>Website content</h2>
      <p>
        Articles, guides and the site design are © CuteLoader. Code samples in our <Link href="/blog/">articles</Link> and{" "}
        <Link href="/guides/">guides</Link> may be used freely in your projects under the same terms as the loaders.
      </p>
    </ProsePage>
  );
}

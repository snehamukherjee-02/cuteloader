import Link from "next/link";
import { ANIMATIONS } from "@/animations";
import { ProsePage } from "@/components/content/ProsePage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About CuteLoader",
  description:
    "CuteLoader is a free library of original, customizable website loading animations made with SVG and CSS. Learn how it works, our principles, and how to help.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <ProsePage
      title="About CuteLoader"
      path="/about/"
      lead="Beautiful website loaders. Customize, copy, and use. Free forever."
    >
      <p>
        CuteLoader is a free library of {ANIMATIONS.length} original loading animations, plus a studio for making them your own.
        Every loader is hand-built from inline SVG and CSS keyframes, so it&apos;s tiny, sharp at any size and easy to read and
        edit. You can change colors, size, speed and motion with a live preview, then export HTML/CSS, a React component, an
        SVG file, a plain JavaScript helper or an animated GIF.
      </p>
      <h2>Why we built it</h2>
      <p>
        Loading states are among the most-seen moments in any product, yet most of us grab the same default spinner
        because making a good one takes time. We wanted a place where a developer, designer or student can find a loader
        that fits their product in a minute, and leave with code they understand.
      </p>
      <h2>Our principles</h2>
      <ul>
        <li>
          <strong>Free and account-free.</strong> Browsing, customizing, copying and downloading will always be free, with no
          signup.
        </li>
        <li>
          <strong>Real code, not screenshots.</strong> The preview is the export. We test the generated code outside the
          site in a real browser before shipping changes.
        </li>
        <li>
          <strong>Light and accessible.</strong> Loaders animate compositor-friendly properties, announce themselves to
          screen readers and calm down for visitors who prefer reduced motion.
        </li>
        <li>
          <strong>Honest.</strong> No fake download counters, ratings or testimonials. Sorting labeled “Featured” is our
          editorial pick, not a popularity statistic.
        </li>
        <li>
          <strong>Privacy-first.</strong> Analytics and ads, where enabled, load only after you agree. Favorites are stored in
          your own browser. See the <Link href="/privacy/">privacy policy</Link>.
        </li>
      </ul>
      <h2>Who it&apos;s for</h2>
      <p>
        Frontend and backend developers, designers, freelancers, agencies, students and small businesses. Our{" "}
        <Link href="/guides/">integration guides</Link> cover plain HTML, React, Next.js, Vue, Angular and ASP.NET
        (Core, MVC and Web Forms) with working examples.
      </p>
      <h2>Help CuteLoader grow</h2>
      <p>
        The best way to support the project is to use a loader, keep the optional credit link, and tell a friend. Built
        something with a CuteLoader animation? Add it to the <Link href="/showcase/">showcase</Link>.
        {SITE.github ? (
          <>
            {" "}
            You can also report issues or suggest loaders on{" "}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </>
        ) : null}
      </p>
    </ProsePage>
  );
}

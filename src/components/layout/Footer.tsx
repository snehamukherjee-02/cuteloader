import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { CATEGORIES } from "@/data/categories";
import { SITE } from "@/lib/site";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { AdSlot } from "@/components/common/AdSlot";

const COLUMNS = [
  {
    title: "Library",
    links: [
      { href: "/animations/", label: "All animations" },
      ...CATEGORIES.map((c) => ({ href: `/animations/${c.id}/`, label: c.name })),
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/loading-animation-generator/", label: "Loading animation generator" },
      { href: "/css-spinner-generator/", label: "CSS spinner generator" },
      { href: "/svg-loader-generator/", label: "SVG loader generator" },
      { href: "/css-loaders/", label: "CSS loaders" },
      { href: "/svg-loaders/", label: "SVG loaders" },
      { href: "/react-loaders/", label: "React loaders" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides/", label: "Integration guides" },
      { href: "/guides/react/", label: "React guide" },
      { href: "/guides/aspnet-core-mvc/", label: "ASP.NET Core guide" },
      { href: "/html-css-loaders/", label: "HTML & CSS loaders" },
      { href: "/javascript-loaders/", label: "JavaScript loaders" },
      { href: "/aspnet-loaders/", label: "ASP.NET loaders" },
      { href: "/blog/", label: "Blog" },
    ],
  },
  {
    title: "CuteLoader",
    links: [
      { href: "/about/", label: "About" },
      { href: "/showcase/", label: "Showcase" },
      { href: "/license/", label: "License" },
      { href: "/privacy/", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} minHeight={90} className="mb-12" />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
              <LogoMark size={28} />
              CuteLoader
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Beautiful website loaders. Customize, copy, and use. Free forever, with no signup.
            </p>
            {SITE.github && (
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-brand-strong hover:underline"
              >
                Star us on GitHub
              </a>
            )}
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-bold">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-text">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.launchDate.slice(0, 4)} CuteLoader. Loaders are free for personal and commercial use.</p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-text">
              Sitemap
            </Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}

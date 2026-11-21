import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { SearchBox } from "@/components/search/SearchBox";
import { SITE } from "@/lib/site";
import { Sparkles } from "lucide-react";
import { GithubIcon as Github } from "@/components/brand/GithubIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Logo />
        <NavLinks className="ml-6 hidden lg:flex" />
        <div className="ml-auto flex items-center gap-1.5">
          <div className="hidden w-64 md:block xl:w-72">
            <SearchBox variant="header" />
          </div>
          {SITE.github && (
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 place-items-center rounded-xl text-muted hover:bg-surface-2 hover:text-text sm:grid"
              aria-label="CuteLoader on GitHub"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
          )}
          <ThemeToggle />
          <Link
            href="/loading-animation-generator/"
            className="ml-1 hidden items-center gap-1.5 rounded-xl bg-text px-3.5 py-2 text-sm font-semibold text-bg shadow-soft transition hover:opacity-90 sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Generator
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

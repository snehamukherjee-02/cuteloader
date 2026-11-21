"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

export function NavLinks({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-0.5">
        {NAV.map((item) => {
          const base = item.href.split("#")[0];
          const active =
            !item.href.includes("#") && (pathname === base || (base !== "/" && pathname.startsWith(base)));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`block rounded-xl px-3 py-2 text-[14.5px] font-medium transition-colors ${
                  active ? "bg-brand-soft text-brand-strong" : "text-muted hover:bg-surface-2 hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

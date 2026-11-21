import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import type { Crumb } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-subtle">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="font-medium text-muted">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-text">
                      {c.name}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-strong">{eyebrow}</p>}
        <h2 id={id} className="text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">
          {title}
        </h2>
        {description && <p className="mt-2 text-[15px] leading-relaxed text-muted">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong hover:gap-2 hover:underline"
        >
          {linkLabel ?? "View all"}
          <ArrowRight className="h-4 w-4 transition-all" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export function FAQList({ faqs, title = "Frequently asked questions", id = "faq" }: { faqs: { q: string; a: string }[]; title?: string; id?: string }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-extrabold tracking-tight">
        {title}
      </h2>
      <div className="mt-5 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold">
              {f.q}
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-2 text-muted transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted ${className}`}>
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles = {
    primary: "bg-brand text-white shadow-soft hover:bg-brand-strong",
    secondary: "border border-border bg-surface text-text hover:border-border-strong hover:bg-surface-2",
    ghost: "text-brand-strong hover:bg-brand-soft",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

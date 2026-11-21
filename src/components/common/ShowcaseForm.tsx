"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { cleanText, cleanUrl } from "@/lib/validate";
import { track } from "@/lib/analytics";

const REPO = (process.env.NEXT_PUBLIC_GITHUB_REPO || "").trim();
const REPO_OK = /^[\w.-]+\/[\w.-]+$/.test(REPO);

type Errors = Partial<Record<"name" | "description" | "url" | "github" | "loader" | "consent" | "form", string>>;

/**
 * Collects a project submission, validates and sanitizes it in the browser, then
 * opens a pre-filled GitHub issue in the project's repository. A maintainer reviews
 * each issue before anything is published, so GitHub accounts plus manual
 * moderation act as spam protection. A honeypot field and a minimum fill time
 * catch simple bots before that.
 */
export function ShowcaseForm({ loaders }: { loaders: { slug: string; name: string }[] }) {
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Errors = {};
    if (fd.get("company")) return; // honeypot: humans never see this field
    if (Date.now() - started.current < 3000) {
      setErrors({ form: "That was quick! Please review your details and submit again." });
      started.current = Date.now() - 2000;
      return;
    }
    const name = cleanText(fd.get("name"), 80);
    const description = cleanText(fd.get("description"), 280);
    const url = cleanUrl(fd.get("url"));
    const githubRaw = String(fd.get("github") || "").trim();
    const github = githubRaw ? cleanUrl(githubRaw, { requireHost: "github.com" }) : "";
    const loader = String(fd.get("loader") || "");
    if (name.length < 2) errs.name = "Please enter your project name.";
    if (description.length < 20) errs.description = "Tell us a little more (at least 20 characters).";
    if (!url) errs.url = "Enter a valid website address, e.g. https://example.com";
    if (github === null) errs.github = "Use a github.com URL, or leave this empty.";
    if (!loaders.some((l) => l.slug === loader)) errs.loader = "Choose the loader you used.";
    if (fd.get("consent") !== "on") errs.consent = "Please confirm you agree to display this project.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const body = [
      "### Project",
      name,
      "",
      "### Description",
      description,
      "",
      "### Website",
      url,
      "",
      "### Source code",
      github || "_not provided_",
      "",
      "### Loader used",
      loader,
      "",
      "- [x] I own this project (or have permission) and agree to have it displayed on the CuteLoader showcase.",
    ]
      .join("\n")
      .replace(/@/g, "@​");

    track("project_submit", { loader });
    if (!REPO_OK) {
      setDone(body);
      return;
    }
    const issue = new URL(`https://github.com/${REPO}/issues/new`);
    issue.searchParams.set("title", `Showcase: ${name}`);
    issue.searchParams.set("labels", "showcase");
    issue.searchParams.set("body", body);
    window.open(issue.toString(), "_blank", "noopener,noreferrer");
    setDone("");
  };

  const field = "mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15";
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {errors[k]}
      </p>
    ) : null;

  if (done !== null) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6" role="status">
        <p className="text-lg font-bold">Thanks for sharing your project!</p>
        {done ? (
          <>
            <p className="mt-2 text-sm text-muted">
              Online submissions aren&apos;t connected yet on this deployment. Copy the details below and send them to the site
              owner.
            </p>
            <pre className="code-block mt-4 overflow-auto rounded-2xl bg-surface-2 p-4">{done}</pre>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted">
            We opened a pre-filled GitHub issue in a new tab. Submit it there, and we&apos;ll review it before it appears here.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-soft">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="sc-name" className="text-sm font-semibold">
          Project name
        </label>
        <input id="sc-name" name="name" maxLength={80} required className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="sc-desc" className="text-sm font-semibold">
          Short description
        </label>
        <textarea id="sc-desc" name="description" rows={3} maxLength={280} required className={field} aria-invalid={!!errors.description} aria-describedby={errors.description ? "err-description" : undefined} />
        {err("description")}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sc-url" className="text-sm font-semibold">
            Website URL
          </label>
          <input id="sc-url" name="url" type="url" inputMode="url" placeholder="https://" required className={field} aria-invalid={!!errors.url} aria-describedby={errors.url ? "err-url" : undefined} />
          {err("url")}
        </div>
        <div>
          <label htmlFor="sc-gh" className="text-sm font-semibold">
            GitHub URL <span className="font-normal text-subtle">(optional)</span>
          </label>
          <input id="sc-gh" name="github" type="url" inputMode="url" placeholder="https://github.com/…" className={field} aria-invalid={!!errors.github} aria-describedby={errors.github ? "err-github" : undefined} />
          {err("github")}
        </div>
      </div>
      <div>
        <label htmlFor="sc-loader" className="text-sm font-semibold">
          Loader used
        </label>
        <select id="sc-loader" name="loader" defaultValue="" required className={field} aria-invalid={!!errors.loader} aria-describedby={errors.loader ? "err-loader" : undefined}>
          <option value="" disabled>
            Choose a loader…
          </option>
          {loaders.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
        {err("loader")}
      </div>
      <div>
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[var(--brand)]" aria-invalid={!!errors.consent} />
          <span className="text-muted">
            I own this project (or have permission) and agree to have its name, description and links displayed publicly on the
            CuteLoader showcase.
          </span>
        </label>
        {err("consent")}
      </div>
      {errors.form && <p className="text-sm font-medium text-red-600 dark:text-red-400">{errors.form}</p>}
      <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong">
        <Send className="h-4 w-4" aria-hidden="true" />
        Submit for review
      </button>
      <p className="text-xs text-subtle">
        Submissions are reviewed by a person before they&apos;re published. We only display what you enter here.
      </p>
    </form>
  );
}

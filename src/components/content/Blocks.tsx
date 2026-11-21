import Link from "next/link";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { Block, CodeLang } from "@/types/content";
import { tokenize, LANG_LABEL } from "@/lib/highlight";
import { getAnimation, pathFor } from "@/animations";
import { LoaderPreview } from "@/components/animations/LoaderPreview";
import { Inline } from "./Inline";
import { CopyButton } from "./CopyButton";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\*\*|`|\[|\]\([^)]*\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

export function CodeBlock({ code, lang, filename }: { code: string; lang: CodeLang; filename?: string }) {
  const text = code.replace(/^\n+|\s+$/g, "");
  const tokens = tokenize(text, lang);
  return (
    <figure className="not-prose overflow-hidden rounded-2xl border border-border bg-surface-2/70">
      <figcaption className="flex items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5">
        <span className="flex min-w-0 items-center gap-2">
          <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-strong">
            {LANG_LABEL[lang]}
          </span>
          {filename && <span className="truncate font-mono text-xs text-muted">{filename}</span>}
        </span>
        <CopyButton text={text} label={filename ? `Copy ${filename}` : "Copy code"} />
      </figcaption>
      <pre className="code-block overflow-x-auto p-4" tabIndex={0}>
        <code>
          {tokens.map((t, i) =>
            t.t === "plain" ? <span key={i}>{t.v}</span> : <span key={i} className={`tok-${t.t}`}>{t.v}</span>,
          )}
        </code>
      </pre>
    </figure>
  );
}

function Demo({ html, css, js, height = 220, caption }: { html: string; css?: string; js?: string; height?: number; caption?: string }) {
  // Our own article code, isolated in a sandboxed iframe (scripts allowed, no same-origin access).
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:system-ui,sans-serif;min-height:100vh;display:grid;place-items:center;background:#fff;color:#1d1a2c}${css ?? ""}</style></head><body>${html}${js ? `<script>${js.replace(/<\/script/gi, "<\\/script")}</script>` : ""}</body></html>`;
  return (
    <figure className="not-prose">
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <iframe
          title={caption ?? "Live demo"}
          srcDoc={doc}
          sandbox="allow-scripts"
          loading="lazy"
          className="block w-full"
          style={{ height }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-subtle">{caption ?? "Live demo"}</figcaption>
    </figure>
  );
}

function LoaderBlock({ slug, caption }: { slug: string; caption?: string }) {
  const def = getAnimation(slug);
  if (!def) return null;
  return (
    <figure className="not-prose flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface-2/60 p-6 sm:flex-row sm:gap-6">
      <LoaderPreview def={def} size={96} label={`${def.name} loading animation`} />
      <figcaption className="text-center sm:text-left">
        <Link href={pathFor(def)} className="font-bold text-text hover:text-brand-strong">
          {def.name}
        </Link>
        <p className="mt-1 text-sm text-muted">{caption ?? def.description}</p>
        <Link href={`${pathFor(def)}#studio`} className="mt-2 inline-block text-sm font-semibold text-brand-strong hover:underline">
          Customize and copy the code →
        </Link>
      </figcaption>
    </figure>
  );
}

const CALLOUT = {
  tip: { icon: Lightbulb, cls: "border-emerald-500/30 bg-emerald-500/5", label: "Tip" },
  note: { icon: Info, cls: "border-sky-500/30 bg-sky-500/5", label: "Note" },
  warning: { icon: AlertTriangle, cls: "border-amber-500/40 bg-amber-500/5", label: "Warning" },
};

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-cl">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugifyHeading(b.text)}>
                <Inline text={b.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugifyHeading(b.text)}>
                <Inline text={b.text} />
              </h3>
            );
          case "ul":
          case "ol": {
            const L = b.type;
            return (
              <L key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </L>
            );
          }
          case "code":
            return <CodeBlock key={i} code={b.code} lang={b.lang} filename={b.filename} />;
          case "callout": {
            const c = CALLOUT[b.tone];
            const Icon = c.icon;
            return (
              <aside key={i} className={`not-prose flex gap-3 rounded-2xl border p-4 text-[15px] leading-relaxed ${c.cls}`}>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                <div>
                  <span className="sr-only">{c.label}: </span>
                  <Inline text={b.text} />
                </div>
              </aside>
            );
          }
          case "loader":
            return <LoaderBlock key={i} slug={b.slug} caption={b.caption} />;
          case "demo":
            return <Demo key={i} html={b.html} css={b.css} js={b.js} height={b.height} caption={b.caption} />;
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Inline text={b.text} />
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function tableOfContents(blocks: Block[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text.replace(/\*\*|`/g, "") }));
}

export function readingMinutes(blocks: Block[]): number {
  let words = 0;
  for (const b of blocks) {
    if ("text" in b && typeof b.text === "string") words += b.text.split(/\s+/).length;
    if (b.type === "ul" || b.type === "ol") words += b.items.join(" ").split(/\s+/).length;
    if (b.type === "code") words += Math.round(b.code.split(/\s+/).length * 0.3);
  }
  return Math.max(2, Math.round(words / 220));
}

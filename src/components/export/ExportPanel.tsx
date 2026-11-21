"use client";

import { useMemo, useState } from "react";
import { Braces, Code2, FileCode2, Film, ImageIcon, Download } from "lucide-react";
import type { AnimationSource, LoaderConfig } from "@/types/animation";
import {
  exportCss,
  exportEmbed,
  exportHtml,
  exportHtmlDocument,
  exportJs,
  exportReact,
  exportSvg,
  componentName,
  FILE_NAMES,
  variableSummary,
} from "@/lib/codegen";
import { downloadFile } from "@/lib/clipboard";
import { track } from "@/lib/analytics";
import { CodeViewer } from "./CodeViewer";
import { GifExporter } from "./GifExporter";
import { ToggleField } from "@/components/editor/controls";

export type ExportTab = "html" | "react" | "svg" | "js" | "embed" | "gif";

const TABS: { id: ExportTab; label: string; icon: React.ReactNode }[] = [
  { id: "html", label: "HTML + CSS", icon: <Code2 className="h-4 w-4" aria-hidden="true" /> },
  { id: "react", label: "React", icon: <FileCode2 className="h-4 w-4" aria-hidden="true" /> },
  { id: "svg", label: "SVG", icon: <ImageIcon className="h-4 w-4" aria-hidden="true" /> },
  { id: "js", label: "JavaScript", icon: <Braces className="h-4 w-4" aria-hidden="true" /> },
  { id: "embed", label: "Embed", icon: <Code2 className="h-4 w-4" aria-hidden="true" /> },
  { id: "gif", label: "GIF", icon: <Film className="h-4 w-4" aria-hidden="true" /> },
];

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-1.5 text-sm text-muted">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand-strong">
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-[12px] text-text">{children}</code>
);

export function ExportPanel({
  def,
  cfg,
  siteUrl,
  initialTab = "html",
}: {
  def: AnimationSource;
  cfg: LoaderConfig;
  siteUrl: string;
  initialTab?: ExportTab;
}) {
  const [tab, setTab] = useState<ExportTab>(initialTab);
  const [attribution, setAttribution] = useState(true);
  const o = { siteUrl, attribution };
  const files = FILE_NAMES(def);
  const name = componentName(def);

  const code = useMemo(() => {
    switch (tab) {
      case "html":
        return { html: exportHtml(def, cfg, o), css: exportCss(def, cfg, o) };
      case "react":
        return { react: exportReact(def, cfg, o) };
      case "svg":
        return { svg: exportSvg(def, cfg, o) };
      case "js":
        return { js: exportJs(def, cfg, o) };
      case "embed":
        return { embed: exportEmbed(def, cfg, o) };
      default:
        return {};
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, def, cfg, attribution, siteUrl]);

  const copied = (format: string) => track("copy_code", { slug: def.slug, format });
  const downloaded = (format: string) => track("download", { slug: def.slug, format });

  return (
    <section aria-labelledby="export-heading" className="rounded-3xl border border-border bg-surface shadow-soft">
      <div className="flex flex-col gap-3 border-b border-border px-4 pt-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="export-heading" className="text-lg font-extrabold tracking-tight">
            Export code
          </h2>
          <div className="w-full max-w-xs sm:w-auto">
            <ToggleField
              label="Include attribution"
              description="Optional credit link. Thank you!"
              checked={attribution}
              onChange={(v) => {
                setAttribution(v);
                track("attribution_toggle", { slug: def.slug, enabled: v });
              }}
            />
          </div>
        </div>
        <div role="tablist" aria-label="Export format" className="no-scrollbar -mb-px flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => {
                const idx = TABS.findIndex((x) => x.id === tab);
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next = TABS[(idx + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
                  setTab(next.id);
                  document.getElementById(`tab-${next.id}`)?.focus();
                }
              }}
              className={`inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 pb-3 pt-1 text-sm font-semibold transition-colors ${
                tab === t.id ? "border-brand text-text" : "border-transparent text-muted hover:text-text"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="space-y-4 p-4 sm:p-5">
        {tab === "html" && code.html && code.css && (
          <>
            <Steps
              items={[
                <>Paste the CSS into your stylesheet (or a <C>&lt;style&gt;</C> tag).</>,
                <>Paste the HTML where the loader should appear. It announces &ldquo;Loading…&rdquo; to screen readers.</>,
                <>Hide it when your content is ready, e.g. <C>loader.hidden = true</C> or remove the element.</>,
              ]}
            />
            <CodeViewer code={code.html} lang="html" filename={files.html} onCopy={() => copied("html")} onDownload={() => downloaded("html")} />
            <CodeViewer code={code.css} lang="css" filename={files.css} mime="text/css" onCopy={() => copied("css")} onDownload={() => downloaded("css")} />
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-2 p-3">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                {variableSummary(def, cfg).map((v) => (
                  <span key={v.name}>
                    <code className="font-mono text-text">{v.name}</code> {v.role}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  downloadFile(files.doc, exportHtmlDocument(def, cfg, o), "text/html;charset=utf-8");
                  downloaded("html-document");
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-xs font-semibold hover:bg-surface-3"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download demo page
              </button>
            </div>
          </>
        )}

        {tab === "react" && code.react && (
          <>
            <Steps
              items={[
                <>Save the component as <C>{files.react}</C>. It is typed, dependency-free and uses no hooks, so it also works in Server Components.</>,
                <>
                  Render it: <C>{`<${name} size={48} />`}</C>. Override colors and speed with props.
                </>,
                <>Show it conditionally: <C>{`{isLoading && <${name} />}`}</C>, or as a Suspense fallback.</>,
              ]}
            />
            <CodeViewer code={code.react} lang="tsx" filename={files.react} onCopy={() => copied("react")} onDownload={() => downloaded("react")} maxHeight={460} />
          </>
        )}

        {tab === "svg" && code.svg && (
          <>
            <Steps
              items={[
                <>Download the file. The animation lives inside it, so it plays in <C>&lt;img src=&quot;{files.svg}&quot;&gt;</C>, as a CSS background, or pasted inline.</>,
                <>Animated SVGs play in all modern browsers. Design tools and some email clients show only a still frame. Use GIF there.</>,
                <>The file honors <C>prefers-reduced-motion</C> and needs no JavaScript.</>,
              ]}
            />
            <CodeViewer code={code.svg} lang="xml" filename={files.svg} mime="image/svg+xml" onCopy={() => copied("svg")} onDownload={() => downloaded("svg")} />
          </>
        )}

        {tab === "js" && code.js && (
          <>
            <Steps
              items={[
                <>Add the script once: <C>&lt;script src=&quot;{files.js}&quot;&gt;&lt;/script&gt;</C>. It injects its own CSS.</>,
                <>Wrap any request: <C>CuteLoader.track(fetch(&quot;/api/data&quot;))</C> shows a full-screen loader until it settles.</>,
                <>
                  Or control it yourself: <C>CuteLoader.show({`{ delay: 200 }`})</C>, <C>CuteLoader.hide()</C>, <C>CuteLoader.mount(&quot;#box&quot;)</C>.
                </>,
              ]}
            />
            <CodeViewer code={code.js} lang="js" filename={files.js} mime="text/javascript" onCopy={() => copied("js")} onDownload={() => downloaded("js")} />
          </>
        )}

        {tab === "embed" && code.embed && (
          <>
            <Steps
              items={[
                <>One self-contained snippet: styles and markup together.</>,
                <>Paste it into any HTML block: WordPress, Webflow, Squarespace, Shopify, Notion-style site builders, or a plain page.</>,
              ]}
            />
            <CodeViewer code={code.embed} lang="html" filename={files.embed} onCopy={() => copied("embed")} onDownload={() => downloaded("embed")} />
          </>
        )}

        {tab === "gif" && <GifExporter def={def} cfg={cfg} />}
      </div>
    </section>
  );
}

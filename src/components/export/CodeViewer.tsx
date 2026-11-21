"use client";

import { Check, Copy, Download } from "lucide-react";
import { useMemo, useState } from "react";
import type { CodeLang } from "@/types/content";
import { tokenize, LANG_LABEL } from "@/lib/highlight";
import { copyText, downloadFile } from "@/lib/clipboard";

export function HighlightedCode({ code, lang }: { code: string; lang: CodeLang | "text" }) {
  const tokens = useMemo(() => tokenize(code, lang), [code, lang]);
  return (
    <code>
      {tokens.map((t, i) =>
        t.t === "plain" ? (
          <span key={i}>{t.v}</span>
        ) : (
          <span key={i} className={`tok-${t.t}`}>
            {t.v}
          </span>
        ),
      )}
    </code>
  );
}

export function CodeViewer({
  code,
  lang,
  filename,
  maxHeight = 380,
  onCopy,
  onDownload,
  mime,
}: {
  code: string;
  lang: CodeLang;
  filename?: string;
  maxHeight?: number;
  onCopy?: () => void;
  onDownload?: () => void;
  mime?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-2/70">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-surface px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-strong">
            {LANG_LABEL[lang]}
          </span>
          {filename && <span className="truncate font-mono text-xs text-muted">{filename}</span>}
        </div>
        <div className="flex items-center gap-1">
          {filename && (
            <button
              type="button"
              onClick={() => {
                downloadFile(filename, code, mime);
                onDownload?.();
              }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted hover:bg-surface-2 hover:text-text"
              aria-label={`Download ${filename}`}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Download</span>
            </button>
          )}
          <button
            type="button"
            onClick={async () => {
              const ok = await copyText(code);
              if (ok) {
                setCopied(true);
                onCopy?.();
                setTimeout(() => setCopied(false), 1800);
              }
            }}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition ${
              copied ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-text text-bg hover:opacity-90"
            }`}
            aria-label={filename ? `Copy ${filename}` : "Copy code"}
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </span>
        </div>
      </div>
      <pre className="code-block overflow-auto p-4" style={{ maxHeight }} tabIndex={0} aria-label={filename ? `${filename} source` : "Code"}>
        <HighlightedCode code={code} lang={lang} />
      </pre>
    </div>
  );
}

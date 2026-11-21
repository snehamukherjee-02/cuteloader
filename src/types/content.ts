/**
 * Content model for blog articles and integration guides.
 *
 * Text fields support a tiny, safe inline syntax (rendered to React elements, never raw HTML):
 *   **bold**   `inline code`   [link text](/internal/path/)   [link text](https://external.example)
 * Internal links must use trailing-slash paths that exist on the site, e.g.
 *   /animations/   /animations/cute/   /animations/cute/bouncing-bunny/   /guides/react/   /blog/<slug>/
 *   /css-loaders/  /svg-loaders/  /html-css-loaders/  /react-loaders/  /javascript-loaders/  /aspnet-loaders/
 *   /loading-animation-generator/  /css-spinner-generator/  /svg-loader-generator/
 */

export type CodeLang =
  | "html"
  | "css"
  | "js"
  | "ts"
  | "tsx"
  | "jsx"
  | "csharp"
  | "aspx"
  | "cshtml"
  | "vue"
  | "bash"
  | "json"
  | "xml";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: CodeLang; code: string; filename?: string }
  | { type: "callout"; tone: "tip" | "note" | "warning"; text: string }
  /** Live preview of a library loader by slug. */
  | { type: "loader"; slug: string; caption?: string }
  /** Live, sandboxed demo of the article's own code (rendered in an <iframe srcdoc sandbox>). */
  | { type: "demo"; html: string; css?: string; js?: string; height?: number; caption?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "quote"; text: string };

export interface FAQ {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  /** The H1. */
  title: string;
  /** <title> text before the " | CuteLoader" suffix. Aim for 60 characters or fewer. */
  seoTitle: string;
  /** Meta description, 140–160 characters, written for humans. */
  description: string;
  /** 1–2 sentence teaser for the blog index. */
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** Only set when the article is genuinely revised. */
  updatedAt?: string;
  tags: string[];
  /** Library loader slugs that this article links to or features. */
  relatedAnimations: string[];
  blocks: Block[];
  faqs?: FAQ[];
}

export interface Guide {
  slug: string;
  /** Display name, e.g. "ASP.NET Core MVC". */
  framework: string;
  title: string;
  seoTitle: string;
  description: string;
  /** One short paragraph shown under the H1. */
  intro: string;
  /** Short label for the guide index card, e.g. "Razor views + fetch". */
  summary: string;
  blocks: Block[];
  relatedAnimations: string[];
  faqs?: FAQ[];
}

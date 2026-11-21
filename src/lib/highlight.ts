/**
 * Minimal syntax highlighter (no dependencies). Produces tokens that are rendered
 * as React <span>s — never via innerHTML — so highlighting can't inject markup.
 */
import type { CodeLang } from "@/types/content";

export type TokenType =
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "tag"
  | "attr"
  | "prop"
  | "fn"
  | "punct"
  | "var"
  | "plain";

export interface Token {
  t: TokenType;
  v: string;
}

type Rule = [TokenType, RegExp];

const sticky = (re: RegExp) => new RegExp(re.source, "y" + re.flags.replace(/[gy]/g, ""));

const STR = /`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/;
const NUM = /-?\b\d+(?:\.\d+)?(?:%|[a-z]+)?\b|-?\.\d+(?:%|[a-z]+)?/;

const JS_KEYWORDS =
  /\b(?:import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|implements|interface|type|enum|async|await|try|catch|finally|throw|typeof|instanceof|as|of|in|null|undefined|true|false|this|void|public|private|protected|readonly|static|get|set|satisfies|keyof)\b/;

const RULES: Record<string, Rule[]> = {
  js: [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ["string", STR],
    ["tag", /<\/?[A-Za-z][\w.]*(?=[\s>/])|\/?>/],
    ["keyword", JS_KEYWORDS],
    ["number", NUM],
    ["fn", /\b[A-Za-z_$][\w$]*(?=\s*\()/],
    ["prop", /(?<=\.)[A-Za-z_$][\w$]*/],
    ["punct", /[{}()[\];,.:=+\-*/<>!?&|]/],
  ],
  css: [
    ["comment", /\/\*[\s\S]*?\*\//],
    ["string", STR],
    ["keyword", /@[\w-]+/],
    ["var", /--[\w-]+/],
    ["number", /#[0-9a-fA-F]{3,8}\b/],
    ["prop", /[a-z-]+(?=\s*:(?!hover|focus|not|is|where|root|nth|first|last|before|after|active))/],
    ["fn", /[\w-]+(?=\()/],
    ["number", NUM],
    ["punct", /[{}();:,>]/],
  ],
  html: [
    ["comment", /<!--[\s\S]*?-->/],
    ["keyword", /<%[\s\S]*?%>|@\{|@[A-Za-z_][\w.]*/],
    ["tag", /<\/?[A-Za-z][\w:.-]*|\/?>/],
    ["attr", /[A-Za-z_:@][\w:.-]*(?==)/],
    ["string", /"[^"]*"|'[^']*'/],
    ["punct", /=/],
  ],
  csharp: [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ["string", /@?\$?"(?:\\.|[^"\\\n])*"/],
    ["prop", /\[[A-Z][\w]*(?:\([^)]*\))?\]/],
    [
      "keyword",
      /\b(?:using|namespace|public|private|protected|internal|class|record|struct|interface|void|string|int|bool|var|return|new|async|await|Task|if|else|static|partial|override|virtual|get|set|true|false|null|this|foreach|in|try|catch|finally|throw|object|dynamic|readonly|const)\b/,
    ],
    ["number", NUM],
    ["fn", /\b[A-Za-z_][\w]*(?=\s*[(<])/],
    ["punct", /[{}()[\];,.:=+\-*/<>!?&|]/],
  ],
  json: [
    ["prop", /"(?:\\.|[^"\\])*"(?=\s*:)/],
    ["string", /"(?:\\.|[^"\\])*"/],
    ["keyword", /\b(?:true|false|null)\b/],
    ["number", NUM],
    ["punct", /[{}[\],:]/],
  ],
  bash: [
    ["comment", /#[^\n]*/],
    ["string", STR],
    ["keyword", /(?<=^|\n|&&\s?|\|\s?)\s*[a-z][\w-]*/],
    ["attr", /\s--?[\w-]+/],
  ],
};

const ALIASES: Record<CodeLang | "text", keyof typeof RULES | "text"> = {
  js: "js",
  ts: "js",
  tsx: "js",
  jsx: "js",
  css: "css",
  html: "html",
  xml: "html",
  vue: "html",
  aspx: "html",
  cshtml: "html",
  csharp: "csharp",
  json: "json",
  bash: "bash",
  text: "text",
};

const compiled = new Map<string, [TokenType, RegExp][]>();

export function tokenize(code: string, lang: CodeLang | "text"): Token[] {
  const key = ALIASES[lang] ?? "text";
  if (key === "text") return [{ t: "plain", v: code }];
  let rules = compiled.get(key);
  if (!rules) {
    rules = RULES[key].map(([t, re]) => [t, sticky(re)]);
    compiled.set(key, rules);
  }
  const out: Token[] = [];
  let plain = "";
  let i = 0;
  outer: while (i < code.length) {
    for (const [t, re] of rules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length) {
        if (plain) {
          out.push({ t: "plain", v: plain });
          plain = "";
        }
        out.push({ t, v: m[0] });
        i += m[0].length;
        continue outer;
      }
    }
    plain += code[i++];
  }
  if (plain) out.push({ t: "plain", v: plain });
  return out;
}

export const LANG_LABEL: Record<CodeLang | "text", string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  ts: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  csharp: "C#",
  aspx: "ASPX",
  cshtml: "Razor",
  vue: "Vue",
  bash: "Shell",
  json: "JSON",
  xml: "XML",
  text: "Text",
};

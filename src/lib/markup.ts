/**
 * Tiny, dependency-free SVG markup utilities used by the code generators:
 * a tolerant tag parser, an indenting pretty-printer, and an SVG → JSX converter.
 * Input is always our own registry markup (trusted, well-formed), never user HTML.
 */

interface ElementNode {
  kind: "el";
  tag: string;
  attrs: [string, string][];
  children: MarkupNode[];
}
interface TextNode {
  kind: "text";
  text: string;
}
type MarkupNode = ElementNode | TextNode;

const TOKEN = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g;
const ATTR = /([^\s=/]+)(?:\s*=\s*"([^"]*)")?/g;

export function parseMarkup(src: string): MarkupNode[] {
  const root: ElementNode = { kind: "el", tag: "#root", attrs: [], children: [] };
  const stack: ElementNode[] = [root];
  for (const m of src.matchAll(TOKEN)) {
    const tok = m[0];
    const parent = stack[stack.length - 1];
    if (tok.startsWith("<!--")) continue;
    if (tok.startsWith("</")) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    if (tok.startsWith("<")) {
      const selfClosing = tok.endsWith("/>");
      const inner = tok.slice(1, selfClosing ? -2 : -1).trim();
      const space = inner.search(/\s/);
      const tag = space === -1 ? inner : inner.slice(0, space);
      const attrSrc = space === -1 ? "" : inner.slice(space);
      const attrs: [string, string][] = [];
      for (const a of attrSrc.matchAll(ATTR)) attrs.push([a[1], a[2] ?? ""]);
      const node: ElementNode = { kind: "el", tag, attrs, children: [] };
      parent.children.push(node);
      if (!selfClosing) stack.push(node);
      continue;
    }
    if (tok.trim()) parent.children.push({ kind: "text", text: tok.trim() });
  }
  return root.children;
}

interface PrintOptions {
  indent?: string;
  attrName?: (name: string) => string;
  text?: (text: string) => string;
}

function printNodes(nodes: MarkupNode[], depth: number, o: Required<PrintOptions>): string[] {
  const lines: string[] = [];
  const pad = o.indent.repeat(depth);
  for (const n of nodes) {
    if (n.kind === "text") {
      lines.push(pad + o.text(n.text));
      continue;
    }
    const attrs = n.attrs.map(([k, v]) => ` ${o.attrName(k)}="${v}"`).join("");
    if (!n.children.length) {
      lines.push(`${pad}<${n.tag}${attrs} />`);
    } else if (n.children.every((c) => c.kind === "text")) {
      const text = n.children.map((c) => o.text((c as TextNode).text)).join(" ");
      lines.push(`${pad}<${n.tag}${attrs}>${text}</${n.tag}>`);
    } else {
      lines.push(`${pad}<${n.tag}${attrs}>`);
      lines.push(...printNodes(n.children, depth + 1, o));
      lines.push(`${pad}</${n.tag}>`);
    }
  }
  return lines;
}

/** Pretty-print SVG/HTML markup with one element per line. */
export function prettyMarkup(src: string, depth = 0, indent = "  "): string {
  return printNodes(parseMarkup(src), depth, {
    indent,
    attrName: (n) => n,
    text: (t) => t,
  }).join("\n");
}

const KEEP = /^(data-|aria-)/;
const SPECIAL: Record<string, string> = {
  class: "className",
  "xlink:href": "xlinkHref",
  "xml:space": "xmlSpace",
  "xmlns:xlink": "xmlnsXlink",
  tabindex: "tabIndex",
};

export function jsxAttrName(name: string): string {
  if (SPECIAL[name]) return SPECIAL[name];
  if (KEEP.test(name)) return name;
  return name.replace(/[-:]([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** Convert SVG markup into JSX children (attribute names camelCased, braces escaped). */
export function svgToJsx(src: string, depth = 0, indent = "  "): string {
  return printNodes(parseMarkup(src), depth, {
    indent,
    attrName: jsxAttrName,
    text: (t) => t.replace(/[{}]/g, (c) => `{"${c}"}`),
  }).join("\n");
}

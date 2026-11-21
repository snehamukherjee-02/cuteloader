/**
 * Site smoke + SEO test. Visits every URL in sitemap.xml in headless Chrome and checks:
 *   - HTTP 200, no console errors / uncaught exceptions / hydration warnings
 *   - exactly one <h1>, unique <title> and meta description (sane lengths)
 *   - canonical URL matches the page, og:image present and reachable
 *   - every JSON-LD block parses; no FAQPage markup (not eligible for this site)
 *   - every internal link found on any page resolves (no 404s)
 *
 *   node --import ./scripts/register.mjs scripts/smoke.ts [baseUrl]
 *
 * baseUrl may include a sub-path (http://localhost:4173/cuteloader for a GitHub Pages build).
 */
import { Browser } from "./cdp.ts";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
// Sitemap locations and link hrefs are root-relative paths that already include any sub-path.
const origin = new URL(base).origin;
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const u = new URL(m[1]);
  return `${origin}${u.pathname}`;
});
console.log(`Checking ${urls.length} URLs from sitemap.xml on ${base}`);

interface PageInfo {
  title: string;
  h1: number;
  canonical: string | null;
  description: string | null;
  robots: string | null;
  ogImage: string | null;
  ld: string[];
  links: string[];
  imgsWithoutAlt: number;
}

const browser = await Browser.launch();
const problems: string[] = [];
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const links = new Set<string>();
const ogImages = new Set<string>();

try {
  for (const url of urls) {
    const before = browser.logs.length;
    const status = await browser.goto(url, 600);
    const path = new URL(url).pathname;
    if (status !== 200) problems.push(`${path}: HTTP ${status}`);
    const info = await browser.evaluate<PageInfo>(`(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
      return {
        title: document.title,
        h1: document.querySelectorAll("h1").length,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
        description: meta('meta[name="description"]'),
        robots: meta('meta[name="robots"]'),
        ogImage: meta('meta[property="og:image"]'),
        ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h && h.startsWith("/") && !h.startsWith("//")),
        imgsWithoutAlt: [...document.querySelectorAll("img:not([alt])")].length,
      };
    })()`);
    const logs = browser.logs.slice(before).filter((l) => {
      if (l.type === "exception") return true;
      if (l.type === "error" || l.type === "log-error") return !/favicon|Download the React DevTools/i.test(l.text);
      if (l.type === "warning" || l.type === "warn") return /hydrat/i.test(l.text);
      return false;
    });
    for (const l of logs) problems.push(`${path}: console ${l.type}: ${l.text.slice(0, 200)}`);
    if (info.h1 !== 1) problems.push(`${path}: ${info.h1} <h1> elements`);
    if (!info.title) problems.push(`${path}: missing <title>`);
    else if (titles.has(info.title)) problems.push(`${path}: duplicate title (also ${titles.get(info.title)})`);
    else titles.set(info.title, path);
    if (info.title.length > 75) problems.push(`${path}: title is ${info.title.length} chars`);
    if (!info.description) problems.push(`${path}: missing meta description`);
    else {
      if (descriptions.has(info.description)) problems.push(`${path}: duplicate description (also ${descriptions.get(info.description)})`);
      descriptions.set(info.description, path);
      if (info.description.length < 70 || info.description.length > 170) problems.push(`${path}: description is ${info.description.length} chars`);
    }
    if (!info.canonical) problems.push(`${path}: missing canonical`);
    else if (new URL(info.canonical).pathname !== path) problems.push(`${path}: canonical points to ${info.canonical}`);
    if (info.robots && /noindex/.test(info.robots)) problems.push(`${path}: in sitemap but noindex`);
    if (!info.ogImage) problems.push(`${path}: missing og:image`);
    else ogImages.add(new URL(info.ogImage).pathname);
    for (const raw of info.ld) {
      try {
        const data = JSON.parse(raw);
        if (data["@type"] === "FAQPage") problems.push(`${path}: FAQPage JSON-LD (not eligible)`);
      } catch {
        problems.push(`${path}: invalid JSON-LD`);
      }
    }
    if (info.imgsWithoutAlt) problems.push(`${path}: ${info.imgsWithoutAlt} <img> without alt`);
    for (const l of info.links) links.add(l.split("#")[0].split("?")[0] || "/");
    process.stdout.write(".");
  }
} finally {
  await browser.close();
}
console.log("");

// Internal link + OG image check.
const toCheck = [...new Set([...links, ...ogImages])];
let checked = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (toCheck.length) {
      const p = toCheck.shift()!;
      const res = await fetch(`${origin}${p}`, { redirect: "manual" });
      checked++;
      if (res.status >= 400) problems.push(`broken link or asset: ${p} (HTTP ${res.status})`);
    }
  }),
);
console.log(`Checked ${urls.length} pages, ${checked} internal links/assets.`);

if (problems.length) {
  console.log(`\n✗ ${problems.length} problem(s):`);
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
console.log("✓ No problems found.");

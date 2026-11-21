/**
 * Serves the static export in out/ the way GitHub Pages does, to test a STATIC_EXPORT build:
 * folders serve index.html, a folder URL without its trailing slash redirects, "/page" also
 * finds "page.html", and anything missing gets out/404.html with status 404.
 *
 *   node scripts/serve-out.ts [port] [basePath]
 *   node scripts/serve-out.ts 4173 /cuteloader   →  http://localhost:4173/cuteloader/
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const port = Number(process.argv[2] || 4173);
const basePath = (process.argv[3] || "").replace(/\/+$/, "");
const root = resolve("out");

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function statOrNull(path: string) {
  try {
    return await stat(path);
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let path = decodeURIComponent(url.pathname);

  const notFound = async () => {
    const body = await readFile(join(root, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    res.end(body);
  };
  const redirect = (location: string) => {
    res.writeHead(301, { Location: location });
    res.end();
  };

  if (basePath) {
    if (path === basePath) return redirect(`${basePath}/${url.search}`);
    if (!path.startsWith(`${basePath}/`)) return notFound();
    path = path.slice(basePath.length);
  }

  const target = normalize(join(root, path));
  if (target !== root && !target.startsWith(root + sep)) return notFound();

  let file = target;
  let info = await statOrNull(file);
  if (info?.isDirectory()) {
    if (!url.pathname.endsWith("/")) return redirect(`${url.pathname}/${url.search}`);
    file = join(target, "index.html");
    info = await statOrNull(file);
  } else if (!info) {
    file = `${target}.html`;
    info = await statOrNull(file);
  }
  if (!info?.isFile()) return notFound();

  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}${basePath}/`));

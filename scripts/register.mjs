// Lets Node run the app's TypeScript modules directly (Node 22.6+/24 type stripping):
// resolves "@/..." to src/ and extensionless relative imports to .ts files,
// mirroring the bundler resolution Next.js uses.
import { registerHooks } from "node:module";
import { existsSync, statSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), "..");

function isFile(p) {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
}

const ownDirs = [resolvePath(root, "src"), resolvePath(root, "scripts")].map((d) => d.toLowerCase());

function isOwnModule(parentURL) {
  if (!parentURL?.startsWith("file:")) return false;
  const p = fileURLToPath(parentURL).toLowerCase();
  return !p.includes("node_modules") && ownDirs.some((d) => p.startsWith(d));
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    // Only rewrite imports made by our own TypeScript sources, never by packages.
    if (!isOwnModule(context.parentURL)) return nextResolve(specifier, context);
    let base;
    if (specifier.startsWith("@/")) base = resolvePath(root, "src", specifier.slice(2));
    else if (specifier.startsWith("./") || specifier.startsWith("../")) base = fileURLToPath(new URL(specifier, context.parentURL));
    else return nextResolve(specifier, context);
    for (const candidate of [base, `${base}.ts`, `${base}/index.ts`]) {
      if (isFile(candidate)) return nextResolve(pathToFileURL(candidate).href, context);
    }
    if (existsSync(base)) return nextResolve(pathToFileURL(base).href, context);
    return nextResolve(specifier, context);
  },
});

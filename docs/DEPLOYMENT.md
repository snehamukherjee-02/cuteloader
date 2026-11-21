# Deployment

The site is fully static at runtime (every page is pre-rendered), so it is cheap to host and
needs no database, paid API or server-side secrets.

## Before every deploy

```bash
npm ci
npm run typecheck
npm run lint
npm test            # animation QA + export QA (needs Chrome/Edge locally)
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the final https domain (no trailing slash). It's used for canonical
URLs, the sitemap, Open Graph tags and the attribution link inside exported code. See `.env.example`
for every optional variable.

## Vercel (recommended, free Hobby tier)

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository. The framework preset is detected as Next.js;
   keep the default build command (`next build`) and output.
3. Add environment variables (Project → Settings → Environment Variables). At minimum set
   `NEXT_PUBLIC_SITE_URL` once you know the domain. Without it, Vercel's production domain is used automatically.
4. Deploy. Every push to the default branch redeploys; pull requests get preview URLs, and
   `robots.txt` blocks indexing of previews automatically.
5. Add your custom domain under Project → Settings → Domains (HTTPS is automatic), then update
   `NEXT_PUBLIC_SITE_URL` and redeploy.

Note: Vercel's Hobby plan is for personal, non-commercial use. If the site earns money (ads,
sponsorships), use the Pro plan or another host.

## Cloudflare (Workers via OpenNext)

Next.js 16 runs on Cloudflare Workers through the OpenNext adapter:

```bash
npm install --save-dev @opennextjs/cloudflare wrangler
npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy
```

Follow the current OpenNext Cloudflare documentation for `wrangler` configuration. Test the build
with `npx opennextjs-cloudflare preview` before deploying.

## Netlify

Import the repository in Netlify. Its Next.js runtime is applied automatically. Set the same
environment variables.

## Any Node.js host (VPS, Render, Railway, Docker)

```bash
npm ci
npm run build
NODE_ENV=production npx next start -p 3000
```

Put it behind a reverse proxy (Nginx, Caddy) that terminates HTTPS and enables gzip/brotli.
Static assets under `/_next/static/` are fingerprinted and can be cached for a year.

## After the first production deploy

1. Open `/sitemap.xml` and `/robots.txt` and check they use your real domain.
2. Run the smoke test against production:
   `node --import ./scripts/register.mjs scripts/smoke.ts https://your-domain`
3. Set up Search Console, Bing Webmaster Tools, GA4 and (optionally) AdSense: see
   [SEO-ANALYTICS-ADS.md](./SEO-ANALYTICS-ADS.md).

## GitHub Pages (static export)

`.github/workflows/deploy-pages.yml` builds the site as plain files and publishes it on every push to `main`.
One-time setup: the repository must be public (or on a paid plan), and **Settings → Pages → Source** must be
**GitHub Actions**. The site is served at `https://<user>.github.io/<repo>/`.

- The workflow sets `STATIC_EXPORT=true` (writes `out/`), `NEXT_PUBLIC_BASE_PATH` (the `/<repo>` sub-path) and
  `NEXT_PUBLIC_SITE_URL` from the Pages settings, so a custom domain added later just works.
- Optional IDs (GA4, AdSense, verification) come from **Settings → Secrets and variables → Actions → Variables**,
  using the names in `.env.example`.
- Without a server there are no redirects or security headers, and `robots.txt`/`ads.txt` only count at a
  domain root, so use a custom domain (or Vercel) before turning on AdSense.
- Code that builds URLs by hand (fetch, plain `<a>`, manifest icons) must use `withBasePath()` from
  `src/lib/site.ts`; `next/link` and metadata add the sub-path automatically.
- Test a static build locally: `STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/cuteloader NEXT_PUBLIC_SITE_URL=http://localhost:4173/cuteloader npm run build`,
  then `node scripts/serve-out.ts 4173 /cuteloader` and `node --import ./scripts/register.mjs scripts/smoke.ts http://localhost:4173/cuteloader`.
  Build on Linux or macOS: on Windows, Next 16.4 writes the prefetch files (`__next.*.txt`) into folders, so
  client-side prefetches 404 (pages still load).

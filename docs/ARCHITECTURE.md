# Architecture

## Overview

CuteLoader is a statically generated Next.js (App Router) site. There is no database
and no backend service in the MVP: every page is pre-rendered at build time, and all
interactive work (customization, code generation, GIF rendering) runs in the visitor's browser.

```
src/
  animations/            The library. One file per category, each exporting AnimationSource[]
    index.ts             Server-side registry: ids, related loaders, search metadata
    load.ts              Client-side lazy loading (one chunk per category)
  lib/
    engine.ts            Turns a definition + config into scoped CSS and SVG (the single source of truth)
    codegen.ts           HTML/CSS, full HTML page, React (TSX), SVG file, JavaScript, embed, config JSON
    markup.ts            SVG parser / pretty-printer / SVG→JSX converter used by codegen
    gif.ts, gif-capture.ts   In-browser GIF export (WAAPI frame seeking + GIF89a/LZW encoder)
    seo.ts               Metadata builder + JSON-LD builders
    search.ts            Client-side search scoring
    analytics.ts         Consent-gated event tracking
  data/                  Categories, technology pages, SEO overrides, showcase entries
  content/               Blog articles and integration guides (typed data, rendered by components/content)
  components/            UI: layout, cards, studio (editor/), export panel (export/), content renderer
  app/                   Routes (all static), sitemap.ts, robots.ts, manifest.ts, ads.txt, search-index.json
scripts/                 QA and asset tooling (run with Node 24, no extra dependencies)
docs/                    This documentation
```

## How a loader works

Each loader is an `AnimationSource` (see `src/types/animation.ts`): inner SVG markup plus CSS
written with two placeholders, `ROOT` (the scoped class) and `K_` (the keyframe prefix), and
CSS custom properties `--c1/--c2/--c3` (colors), `--d` (cycle duration), `--sw` (stroke) and
`--amp` (intensity). `engine.ts` replaces the placeholders, injects the variables for a given
configuration, wires every timing to `--d` (so speed and reduced motion scale the whole loader),
and adds the reduced-motion rule.

Because the preview, the studio and every export go through the same engine, the code a user
copies is byte-for-byte the animation they saw.

Authoring rules live in [ANIMATION_AUTHORING.md](./ANIMATION_AUTHORING.md).

## Rendering and performance

- All library, category, loader, blog and guide pages are generated at build time (`generateStaticParams`,
  `dynamicParams = false` → unknown slugs return a real 404).
- Loader previews are server-rendered SVG; their CSS is hoisted and de-duplicated by React.
  Off-screen previews skip rendering (`content-visibility: auto`) and are paused by a single
  IntersectionObserver (`PreviewVisibility`), so long grids only animate what's visible.
- Client JavaScript is limited to interactive islands: the studio, search/filters, favorites,
  copy buttons, theme toggle. Card "copy code" lazy-loads one category chunk and the code
  generator only when used. The header search lazy-loads a static `search-index.json` on focus.
- GIF export code is loaded only when the GIF tab renders.

## Future backend (not built)

When accounts, synced favorites, moderated submissions or premium packs become necessary, the
registry maps cleanly to PostgreSQL:

```sql
create table loaders (
  slug         text primary key,
  name         text not null,
  category     text not null check (category in ('cute','abstract','minimal','technology','nature','business','food')),
  kind         text not null,
  description  text not null,
  details      text not null,
  tags         text[] not null default '{}',
  colors       jsonb not null,          -- { primary, secondary, accent? }
  color_labels jsonb,
  duration     numeric not null,
  view_box     text not null default '0 0 100 100',
  stroke       numeric,
  intensity    boolean not null default false,
  direction    boolean not null default false,
  svg          text not null,
  css          text not null,
  popularity   int not null,
  tier         text not null default 'free' check (tier in ('free','premium')),
  pack         text,
  added_at     date not null
);

create table showcase_submissions (
  id          bigserial primary key,
  name        text not null,
  description text not null,
  url         text not null,
  github      text,
  loader_slug text references loaders(slug),
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at  timestamptz not null default now()
);

create table favorites (
  user_id     uuid not null,
  loader_slug text not null references loaders(slug),
  created_at  timestamptz not null default now(),
  primary key (user_id, loader_slug)
);
```

Migration path: keep `src/animations/*.ts` as the seed source, load them into `loaders` with a
script, and swap `src/animations/index.ts` to read from the database inside cached server
functions. The `AnimationSource` shape and every component stay unchanged.

### Premium-ready fields

`AnimationSource.tier` (`"free" | "premium"`) and `pack` are reserved. Today every loader is
free and nothing gates on them. A future premium pack would set `tier: "premium"`, show a badge on
cards, and gate *exports* (never previews) behind an entitlement check. Payment processing is
intentionally not implemented.

## Security notes

- Only registry markup (trusted, reviewed) is rendered with `dangerouslySetInnerHTML`.
- Every user-controlled value that reaches generated CSS/SVG passes `sanitizeConfig()` (strict hex
  colors, clamped numbers), including values from share links and imported JSON.
- Content files use a tiny inline syntax rendered to React elements, never HTML strings.
- JSON-LD is serialized with `<` escaped. Showcase input is sanitized and URL-validated, and the form
  has a honeypot and minimum fill time. External links use `rel="noopener noreferrer"` (plus `nofollow ugc` for user projects).
- No secrets exist in the frontend; all configuration is public `NEXT_PUBLIC_*` IDs.

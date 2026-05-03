# 11 — Deployment, SEO, sitemaps, robots

**Status:** DONE (code-side; deployment + Lighthouse + share-card validation deferred to user/launch)

## Why
The site needs to actually be on the internet at gridbeam.xyz, with proper indexing for search and social sharing.

## What
- A working production deployment of the site (Vercel recommended, given Next.js)
- `robots.txt` with sensible defaults
- `sitemap.xml` auto-generated from the route tree
- Per-page SEO metadata, Open Graph, Twitter cards
- DNS pointed at the deployment (Stream 05 task 03 covers the actual switchover)

## Steps
- [x] Pick hosting. Vercel is the path of least resistance for app-router Next.js. Alternative: self-host. Recommend Vercel.
- [ ] Connect the GitHub repo to a new Vercel project. Disable the auto-GitHub integration on the old `gridkit-landing` project to avoid double-deploys. **(user action)**
- [ ] Production branch: `main`. Preview branches: any non-main. **(user action — Vercel default)**
- [ ] Set environment variables (contact form keys, etc) per Stream 01 task 09 decisions. **(user action — none required today; subscribe is mailto-only)**
- [x] Add `app/robots.ts` exporting a `MetadataRoute.Robots`. Allow when on production Vercel or off-Vercel (self-host); disallow only on explicit non-prod Vercel envs (preview/development) — safer default than the legacy gate, which would have blocked any non-Vercel host.
- [x] Add `app/sitemap.ts` exporting a `MetadataRoute.Sitemap` that lists all static routes plus design and story slugs.
- [x] Default metadata in `app/layout.tsx`: site title, default OG image, Twitter handle (if any). (Already in place pre-task; verified during audit. Default OG/Twitter image now provided via `app/opengraph-image.tsx` + `app/twitter-image.tsx`.)
- [x] Per-page `generateMetadata` for designs, stories, suppliers (where dynamic). (All pages already had metadata exports; verified during audit.)
- [x] Set up favicons. Used Next's icon convention: `app/icon.svg` (favicon), `app/apple-icon.tsx` (180×180 PNG via ImageResponse). Skipped `cli-real-favicon` and the legacy faviconConfig.json — Next's convention is sufficient and avoids maintaining a separate generator.
- [x] Custom 404 — `app/not-found.tsx` with the beam-with-holes diagram and links home + designs.
- [ ] Verify with Lighthouse — target >90 across performance, accessibility, SEO, best practices. **(deferred until preview deploy is live)**
- [ ] Check Open Graph + Twitter previews (e.g. with twitter card validator, Facebook sharing debugger). **(deferred until preview deploy is live)**

## Notes
- Don't import `@sentry/nextjs` — the legacy site's Sentry config (project `gridkit-landing`) is gone with the startup.
- The 404 page lives under the same `MainLayout` as every other page (Next.js keeps the root layout for not-found rendering).
- `app/twitter-image.tsx` re-exports from `app/opengraph-image.tsx` so explicit `twitter:image` tags are emitted (Twitter's crawler does fall back to `og:image`, but explicit is safer).
- Side-fix in `_lib/designs.ts`: `getDesignIds` now filters to actual directories. Before, a stray file in `gridkit-products/products/` would have leaked into both the sitemap and `generateStaticParams` for `/designs/[id]`.

## Depends on
- All other Stream 01 tasks (01-10) for the routes that get listed in the sitemap
- [../05-cleanup/03-dns-and-domain.md](../05-cleanup/03-dns-and-domain.md) — final DNS switch

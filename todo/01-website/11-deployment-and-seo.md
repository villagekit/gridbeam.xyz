# 11 — Deployment, SEO, sitemaps, robots

**Status:** DONE (code-side; deployment + Lighthouse + share-card validation deferred to user/launch)

## Why
The site needs to actually be on the internet at gridbeam.xyz, with proper indexing for search and social sharing.

## What
- A working production deployment of the site on Cloudflare Workers (via `@opennextjs/cloudflare`)
- `robots.txt` with sensible defaults
- `sitemap.xml` auto-generated from the route tree
- Per-page SEO metadata, Open Graph, Twitter cards
- DNS pointed at the deployment (Stream 05 task 03 covers the actual switchover)

## Steps
- [x] Pick hosting: **Cloudflare Workers via `@opennextjs/cloudflare`**, matching `villagekit.com`. `gridbeam.xyz`'s DNS is on Cloudflare already, and the Workers Paid plan ($5/mo) is cheaper than equivalent Vercel for this traffic. Static export is not an option — server components, dynamic routes, and the future `/api/subscribe` POST all need a real runtime.
- [x] `wrangler.jsonc` declares the Worker (`gridbeam-xyz`), the OpenNext output (`.open-next/worker.js`), `nodejs_compat` flag, asset binding, and observability.
- [x] `open-next.config.ts` exports `defineCloudflareConfig({})` — no incrementalCache (no ISR/fetch-cache today). Add `r2IncrementalCache` here later if ISR is introduced.
- [x] `next.config.ts` calls `initOpenNextCloudflareForDev()` so `getCloudflareContext()` resolves under `next dev` by reading `.env.local`.
- [x] `env.d.ts` augments `CloudflareEnv` with runtime-only secrets (e.g. future `BUTTONDOWN_API_KEY`) that aren't declared in `wrangler.jsonc`.
- [x] `pnpm preview` / `pnpm deploy` scripts wired (`opennextjs-cloudflare build && opennextjs-cloudflare preview|deploy`).
- [x] `pnpm cf-typegen` generates `cloudflare-env.d.ts` (gitignored) from `wrangler.jsonc` bindings.
- [ ] Connect the GitHub repo to a new Cloudflare Worker project via Workers Builds. Production branch: `main`. Preview branches: any non-main. **(user action)**
- [ ] Set environment variables (`BUTTONDOWN_API_KEY` when subscribe lands, etc.) via Workers dashboard or `wrangler secret put`. Also set `NEXT_PUBLIC_DEPLOY_ENV=production` on the production env so `robots.ts` allows indexing. **(user action — none required today; subscribe is mailto-only)**
- [x] `app/robots.ts` — default-deny posture: disallow indexing unless `NEXT_PUBLIC_DEPLOY_ENV === 'production'`. Matches villagekit.com. Safer than the previous Vercel-shaped logic, which would have allowed indexing on any non-Vercel host (including a Cloudflare preview).
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
- Side-fix in `_lib/designs.ts`: `getDesignIds` now filters to actual directories. Before, a stray file in the products dir would have leaked into both the sitemap and `generateStaticParams` for `/designs/[id]`.

## Depends on
- All other Stream 01 tasks (01-10) for the routes that get listed in the sitemap
- [../05-cleanup/03-dns-and-domain.md](../05-cleanup/03-dns-and-domain.md) — final DNS switch

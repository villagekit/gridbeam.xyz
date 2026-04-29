# 11 — Deployment, SEO, sitemaps, robots

**Status:** TODO

## Why
The site needs to actually be on the internet at gridbeam.xyz, with proper indexing for search and social sharing.

## What
- A working production deployment of the site (Vercel recommended, given Next.js)
- `robots.txt` with sensible defaults
- `sitemap.xml` auto-generated from the route tree
- Per-page SEO metadata, Open Graph, Twitter cards
- DNS pointed at the deployment (Stream 05 task 03 covers the actual switchover)

## Steps
- [ ] Pick hosting. Vercel is the path of least resistance for app-router Next.js. Alternative: self-host. Recommend Vercel.
- [ ] Connect the GitHub repo to a new Vercel project. Disable the auto-GitHub integration on the old `gridkit-landing` project to avoid double-deploys.
- [ ] Production branch: `main`. Preview branches: any non-main.
- [ ] Set environment variables (contact form keys, etc) per Stream 01 task 09 decisions.
- [ ] Add `app/robots.ts` exporting a `MetadataRoute.Robots`. In production: allow all. In preview/dev: disallow all (the legacy site does this too — see `build:robots-txt` script).
- [ ] Add `app/sitemap.ts` exporting a `MetadataRoute.Sitemap` that lists all static routes plus design and story slugs.
- [ ] Default metadata in `app/layout.tsx`: site title, default OG image, Twitter handle (if any).
- [ ] Per-page `generateMetadata` for designs, stories, suppliers (where dynamic).
- [ ] Set up favicons. The legacy site uses `cli-real-favicon` — see `node-modules/apps/gridbeam/faviconConfig.json` for a config that may be reusable. Or use Next's icon convention.
- [ ] Verify with Lighthouse — target >90 across performance, accessibility, SEO, best practices.
- [ ] Check Open Graph + Twitter previews (e.g. with twitter card validator, Facebook sharing debugger).

## Notes
- Don't import `@sentry/nextjs` — the legacy site's Sentry config (project `gridkit-landing`) is gone with the startup.
- A custom 404 page is a nice touch — a tiny grid-beam diagram and a link home.

## Depends on
- All other Stream 01 tasks (01-10) for the routes that get listed in the sitemap
- [../05-cleanup/03-dns-and-domain.md](../05-cleanup/03-dns-and-domain.md) — final DNS switch

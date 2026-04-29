# 02 — Archive old gridkit.nz deploy + redirect

**Status:** TODO

## Why
gridkit.nz is currently a live Vercel deploy of the legacy startup site. Once gridbeam.xyz is live, gridkit.nz should either redirect, show an archive notice, or be taken down.

## What
A clean handover: visitors landing on gridkit.nz find their way to the relevant gridbeam.xyz page (or are told the site has moved).

## Steps
- [ ] Decide the gridkit.nz fate:
  - **Redirect** — every URL on gridkit.nz redirects to the equivalent gridbeam.xyz URL. Maximum SEO continuity. Requires a redirect map.
  - **Archive page** — gridkit.nz serves a single static page saying "Grid Kit was a startup that closed. The grid-beam system lives on at gridbeam.xyz." Simpler, less SEO juice transfer.
  - **Shutdown** — let the domain expire / unbind from Vercel. Aggressive; loses SEO.
  - Recommend redirect for the high-traffic pages, archive page as the catch-all.
- [ ] If redirect: build the redirect map. Most pages have an obvious counterpart:
  - `/` → `gridbeam.xyz/`
  - `/about` → `gridbeam.xyz/about`
  - `/faq` → `gridbeam.xyz/faq`
  - `/stories` → `gridbeam.xyz/stories`
  - `/stories/[slug]` → `gridbeam.xyz/stories/[slug]` (matching slugs; `building-with-grid-kit` → `building-with-grid-beam` is a special-case rename)
  - `/store/*` → `gridbeam.xyz/suppliers` (catch-all; specific products are gone)
  - `/cart`, `/order-complete` → `gridbeam.xyz/suppliers` or 410 Gone
  - `/tools/cutting-planner` → `gridbeam.xyz/tools/cutting-planner`
  - everything else → `gridbeam.xyz/`
- [ ] Implement: simplest is a Vercel `vercel.json` `redirects` array on the existing gridkit.nz project. Replace the deployed code with a minimal Next.js app (or even a static HTML stub) that just has the redirect config.
- [ ] Decide the gridkit.nz domain's long-term fate:
  - Keep paying for it indefinitely (cheap, preserves backlinks)
  - Let it expire after a year of redirects
  - Recommend keeping it for at least 2 years to let backlinks die naturally.
- [ ] On the archive page (or redirect notice), include a "What happened?" link explaining the dead-startup-revived-as-community-site narrative.

## Notes
- Disable any old Vercel auto-deploy on the legacy gridkit.nz project so the redirect config doesn't get clobbered.
- If the legacy site is the source of any inbound links from press / forums, keeping the redirects pays SEO dividends.

## Depends on
- The new site being live at gridbeam.xyz (Stream 01 task 11)
- DNS / domain decisions (this stream's task 03)

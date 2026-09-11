---
title: Cookie policy route removed
status: sanctioned
route: /legal/cookie-policy
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/legal/cookie-policy.tsx:1-8` `createCookiePolicyPage({ Layout: MainLayout, websiteName: 'Grid Kit' })` from `packages/applet-legal/src/pages/cookie-policy.tsx`, rendering `packages/applet-legal/src/mdx/cookie-policy.mdx` (38 lines) in `LegalLayout`. Live: `https://gridkit-landing-villagekit.vercel.app/legal/cookie-policy`; its visible text is `audit/legal__cookie-policy/dom/legacy.txt` (the route is `legacy-only` in `scripts/audit-routes.txt`).

## Current

No `app/legal/cookie-policy/` route: `http://localhost:3000/legal/cookie-policy` is the 404 page (`audit/legal__cookie-policy/dom/manifest.json` records the current side as skipped). The `/legal` card that linked to it is its own item on `/legal`; the cookie consent banner is filed on `shell`.

## Verdict

rule: no startup plumbing (cookie consent and the cookie policy are gone)

## Log

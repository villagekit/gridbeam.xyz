---
title: Cookie banner and analytics settings modal removed
status: sanctioned
route: shell
axis: visual
kind: removed
---
## Legacy

`packages/ui-cookies/src/components/CookieBanner.tsx:34-47`: fixed-bottom `primary.100` banner, `Our website uses cookies so we can analyse our site usage and give you the best experience. Click "Accept" if you're happy with this, or click "More" for information about cookies on our site and how to opt out.`, buttons `More` (to `/legal/cookie-policy`) and `Accept`. `packages/ui-cookies/src/components/AnalyticsModal.tsx:34,41,57`: `Change Settings`, `Matomo Settings`, `Close`. Rendered on every route by `apps/gridkit/components/layouts/main.tsx:73` (`<CookieBanner />`); `group: link "More" / button "Accept"` in `audit/_root/dom/legacy.aria.yaml`.

## Current

No cookie banner or consent modal in `app/` or `@villagekit/ui@1.2.0` (`grep -rn CookieBanner app` matches prose in `app/legal/privacy-policy/page.tsx` only).

## Verdict

rule: no startup plumbing (cookie consent is gone)

## Log

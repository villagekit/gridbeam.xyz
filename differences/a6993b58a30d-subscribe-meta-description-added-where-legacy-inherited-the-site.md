---
title: Subscribe meta description added where legacy inherited the site default
status: regression
route: /subscribe
axis: copy
kind: added
---
## Legacy

No `description` on the `NextSeo` (`packages/applet-subscribe/src/page.tsx:30`); the site default from `apps/gridkit/pages/_app.tsx:49` renders.

## Current

`app/subscribe/page.tsx:17-18,22,28` `description = 'A low-volume newsletter about new designs, suppliers, and stories. Not active yet — here is the plan.'`.

## Verdict

## Log

- 2026-09-25: Regression (subscribe grilling S1). No per-page description; the route inherits the site default ([[1906af99b588]]).

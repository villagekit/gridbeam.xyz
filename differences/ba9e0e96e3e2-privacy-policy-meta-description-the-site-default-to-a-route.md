---
title: "Privacy policy meta description: the site default to a route description"
status: regression
route: /legal/privacy-policy
axis: copy
kind: changed
---
## Legacy

The site default from `apps/gridkit/pages/_app.tsx:49` ("Anyone can be a maker with Grid Kit: ...") renders on the live page.

## Current

`app/legal/privacy-policy/page.tsx:19-20,25` `description = 'gridbeam.xyz collects almost nothing. No cookies, no analytics, no third-party trackers. Here is the full picture.'`.

## Verdict

## Log

- 2026-09-25: Regression (privacy grilling P1). No per-page description; the route inherits the site default ([[1906af99b588]]) as legacy did.

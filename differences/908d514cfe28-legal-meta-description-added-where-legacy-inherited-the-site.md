---
title: Legal meta description added where legacy inherited the site default
status: regression
route: /legal
axis: copy
kind: added
---
## Legacy

No `description` anywhere in the chain (`packages/applet-legal/src/pages/legal.tsx`, `CardsLayout.tsx:9-12`); the live page carries the site default from `apps/gridkit/pages/_app.tsx:49`.

## Current

`app/legal/page.tsx:21,25` `description = 'Privacy policy and licensing information for gridbeam.xyz.'`, also as `openGraph.description` and `twitter.description`.

## Verdict

## Log

- 2026-09-25: Regression (legal grilling L1). No per-page description; the route inherits the site default ([[1906af99b588]]).

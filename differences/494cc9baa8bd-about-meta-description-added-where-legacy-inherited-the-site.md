---
title: About meta description added where legacy inherited the site default
status: regression
route: /about
axis: copy
kind: added
---
## Legacy

No `description` on `apps/gridkit/pages/about.tsx:12`; the `_app.tsx:49` default renders.

## Current

`app/about/page.tsx:24-25,29,32,35` "Grid beam is a modular construction system: regularly-drilled beams that bolt together with a hex key. This site catalogues the 40 mm flavour." as `description`, `openGraph.description` and `twitter.description`.

## Verdict

## Log

- 2026-09-25: Regression (about grilling A1). No per-page description; the route inherits the site default ([[1906af99b588]]) as legacy did.

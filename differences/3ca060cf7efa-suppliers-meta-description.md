---
title: Suppliers meta description
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers` (`audit/suppliers/1280/legacy.png` is the legacy 404 page).

## Current

`app/suppliers/page.tsx:25-26` "People who make grid-beam-compatible hardware. We don't sell parts; we link to those who do.", reused for `openGraph.description` and `twitter.description` (`:29-36`). The `<title>` renders as "Suppliers — gridbeam.xyz" through the template in `app/layout.tsx:32`.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q1). No per-page description; the route inherits the site default ([[1906af99b588]]) as legacy pages without their own did.

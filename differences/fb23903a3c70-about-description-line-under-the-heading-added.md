---
title: About description line under the heading added
status: fixed
route: /about
axis: copy
kind: added
---
## Legacy

`apps/gridkit/pages/about.tsx:14` no `description` on the `Title`.

## Current

`app/about/page.tsx:44` `description="A modular construction system anyone can build, modify, or fork."`.

## Verdict

plan 5ac30176

## Log

- 2026-09-25: Regression (about grilling A1). No description line under the heading, as legacy.

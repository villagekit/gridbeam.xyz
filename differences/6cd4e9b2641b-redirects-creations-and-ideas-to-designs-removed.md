---
title: Redirects /creations and /ideas to /designs removed
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:26-35`: `/creations`, `/ideas` to `/designs` and `/creations/:slug`, `/ideas/:slug` to `/designs/:slug` (`permanent: false`).

## Current

`next.config.ts` has no `redirects()`.

## Verdict

## Log

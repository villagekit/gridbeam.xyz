---
title: Redirects /creations and /ideas to /designs removed
status: fixed
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:26-35`: `/creations`, `/ideas` to `/designs` and `/creations/:slug`, `/ideas/:slug` to `/designs/:slug` (`permanent: false`).

## Current

`next.config.ts` has no `redirects()`.

## Verdict

plan 4f6f086c

## Log

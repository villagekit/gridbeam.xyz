---
title: Store redirects removed
status: sanctioned
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:36-47`: `/products`, `/supplys` to `/store`; `/products/:id` to `/store/:id`; `/order` to `/store/starter_kit`.

## Current

`next.config.ts` has no `redirects()`.

## Verdict

rule: no e-commerce (the store routes they pointed at are gone)

## Log

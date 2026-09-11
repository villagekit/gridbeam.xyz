---
title: "Top nav: Store replaced by Suppliers"
status: sanctioned
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/nav.ts:9-13`: `{ href: '/store', label: 'Store', location: 'top' }`.

## Current

`app/_lib/nav.ts:7`: `{ href: '/suppliers', label: 'Suppliers', location: 'top' }`.

## Verdict

rule: no e-commerce (the store is replaced by the Suppliers page)

## Log

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

- 2026-09-26: The nav entry went with decision c21b7e35f0c7 (plan 63e9c753): the top nav ships exactly Designs, Tools, About, Stories, so Suppliers left the top nav in app/_lib/nav.ts. This item's Verdict (rule: no e-commerce) still stands for the Suppliers page itself; the header action e48df8d1ce98 and the footer carry the Suppliers link now. This item's Current section describes the pre-slice code and is historical.

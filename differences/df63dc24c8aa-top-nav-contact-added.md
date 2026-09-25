---
title: "Top nav: Contact added"
status: fixed
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/nav.ts:3-19` has three top items: `Designs`, `Store`, `Stories`. `/contact` is reached from the footer only (`apps/gridkit/components/footer.tsx:54`), labelled `Contact us`.

## Current

`app/_lib/nav.ts:9`: `{ href: '/contact', label: 'Contact', location: 'top' }`.

## Verdict

plan 63e9c753

## Log

- 2026-09-13: 2026-09-13: Regression per [[c21b7e35f0c7]]: the operator wants Contact footer-only, as in legacy. A closing plan drops the top-level entry from `app/_lib/nav.ts`, keeping the existing footer entry (`cfc422822736`).

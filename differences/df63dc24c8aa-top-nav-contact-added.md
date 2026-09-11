---
title: "Top nav: Contact added"
status: open
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/nav.ts:3-19` has three top items: `Designs`, `Store`, `Stories`. `/contact` is reached from the footer only (`apps/gridkit/components/footer.tsx:54`), labelled `Contact us`.

## Current

`app/_lib/nav.ts:9`: `{ href: '/contact', label: 'Contact', location: 'top' }`.

## Verdict

## Log

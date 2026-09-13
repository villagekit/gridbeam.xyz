---
title: Footer link Suppliers added
status: sanctioned
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/components/footer.tsx:21-58` has no such link; the legacy site had no `/suppliers` route.

## Current

`app/_lib/nav.ts:26`: `{ href: '/suppliers', label: 'Suppliers' }` under Browse.

## Verdict

rule: operator (5), [[9f344fbfde9a]].

## Log

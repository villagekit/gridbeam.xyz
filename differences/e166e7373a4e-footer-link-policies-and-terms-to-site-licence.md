---
title: "Footer link: Policies and terms to Site licence"
status: sanctioned
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/footer.tsx:33`: `{ href: '/legal', label: 'Policies and terms' }`.

## Current

`app/_lib/nav.ts:45`: `{ href: '/legal', label: 'Site licence' }`.

## Verdict

rule: no e-commerce (2) + operator (5). `/legal` holds a privacy policy and a licence, no terms-of-service (there's no store to need one); "Site licence" names what's actually there. Confirmed 2026-09-13.

## Log

---
title: Footer heading Browse added
status: sanctioned
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/components/footer.tsx:21-58` has no such heading.

## Current

`app/_lib/nav.ts:22`: `heading: 'Browse'` over Designs, Stories, Suppliers.

## Verdict

rule: operator (5), [[9f344fbfde9a]].

## Log

- 2026-09-26: Superseded heading text: decision [[9f344fbfde9a]] names the four headings Explore, About, Connect and Legal, so the Browse this item's title quotes never ships; the site footer slice (plan [[5e4529a6aeac]]) ships Explore over Designs, Stories, Tools and resources and Suppliers.

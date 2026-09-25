---
title: Empty state heading and description
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:86-91` `<Title as="h2" description="No suppliers are listed yet — but there are still ways to get parts.">None listed yet</Title>`. Unrendered today: both suppliers in `content/suppliers.ts` are `active`, so the `hasSuppliers` branch (`app/suppliers/page.tsx:73`) never takes this path.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q6). The unreachable empty-state branch is removed with its text.

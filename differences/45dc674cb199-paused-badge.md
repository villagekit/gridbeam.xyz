---
title: Paused badge
status: open
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:178` `{supplier.status === 'paused' && <Badge colorPalette="orange">Paused</Badge>}`. Unrendered today: no supplier in `content/suppliers.ts` is `paused`.

## Verdict

## Log

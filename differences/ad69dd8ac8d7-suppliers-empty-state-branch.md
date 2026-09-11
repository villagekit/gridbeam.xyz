---
title: Suppliers empty-state branch
status: open
route: /suppliers
axis: code
kind: added
---
## Legacy

Absent: no legacy `/suppliers`; the decision names no empty state.

## Current

`app/suppliers/page.tsx:50` `const hasSuppliers = visibleSuppliers.length > 0`; `:73-119` a ternary between the Listings section and a "None listed yet" section (both `index={1}`). Unreachable with today's data (two `active` suppliers). Its text is filed as copy: [[0cab43b5efcc]], [[e455a8b914a6]], [[c3e295589f75]], [[945a86f469fa]].

## Verdict

## Log

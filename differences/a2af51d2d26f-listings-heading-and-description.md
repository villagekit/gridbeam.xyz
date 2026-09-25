---
title: Listings heading and description
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:75-77` `<Title as="h2" description="Each card links out to the supplier's site.">Listings</Title>`. Rendered while `hasSuppliers` is true (`:52-53`).

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q3). The Listings title goes; the ported producer list's own "Locations" heading (`components/map/producer-list.tsx:68`) is the list's name, per [[8b5e51fcaf61]] and [[36541273e623]].

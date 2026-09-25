---
title: "Supplier cards: bare boxes, not a list; the name is not a link"
status: regression
route: /suppliers
axis: accessibility
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:79-83` `SimpleGrid` of `SupplierCard` `Box`es (`:169`): no `ul`/`li` or `role="list"` in the chain (live: `main ul, main li, [role=list], [role=listitem]` count 0), so no list announcement; `:175-177` the `Heading as="h3"` name is plain text, the card's only link is the "Visit website" button (`:200-202`).

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q7). The name becomes the link in the re-port; list semantics follow legacy's producer list markup for now and wait for the accessibility pass after M2 ([[eeba2a65cee4]]).

---
title: "Grid gap: 8 at every width to 6 below md"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/list.tsx:80` `<SimpleGrid columns={columns} spacing="8">`.

## Current

`app/_components/catalogue/Catalogue.tsx:242` `gap={{ base: 6, md: 8 }}`; `CatalogueStatic.tsx:23` the same.

## Verdict

## Log

- 2026-09-12: Found by the Parity review (plan cf52c388, round one).

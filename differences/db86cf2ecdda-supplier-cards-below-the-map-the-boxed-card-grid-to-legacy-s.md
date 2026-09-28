---
title: "Supplier cards below the map: the boxed card grid to legacy's producer-item row"
status: open
route: /suppliers
axis: visual
kind: added
---
## Legacy

No legacy `/suppliers`; decision [[8b5e51fcaf61]] says `supplier cards below` the map and nothing of their look. The nearest legacy shape is the map panel's row, `../node-modules/apps/gridkit/components/map/producer-item.tsx:28-52` at `fce357d`: a `Box` at `paddingX: 4`, `paddingY: 2`, full width, holding a `Text` title over a `Text fontSize="sm" variant="secondary"` location, no box, no radius, no shadow, no heading element; the rows stacked in a `Box` (`producer-list.tsx:74-78`).

## Current

`app/suppliers/page.tsx:161-194`: each card a `Box p="6" bg="white" borderRadius="xl" boxShadow="sm"` in a `SimpleGrid columns={{ base: 1, md: 2 }} gap="6"` (`:68`), its name a `Heading as="h3" size="md"` (`:165`); the verdict on [[c9d48318bd4b]] names what the card carries (name, location, the name as the link out, a `Metric` or `Imperial` label) and not its box. The page slice of the suppliers record [[872ab70e2ff9]] builds legacy's row by default, the cards stacked at the 2023 order page's text-block width (`container.md`), the h3 gone with the box, so the outline is the h1 and the map's `Locations` heading. Filed at the record's split for the operator, on the suppliers verdicts plan, since an agent sanctions nothing ([[2032533fbe92]]); a verdict given before the page slice runs shapes it.

## Verdict

## Log

---
title: "Grid columns: 2 at base and 3 from lg to 1 at base, 2 from sm and 3 from xl"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/list.tsx:45` `useBreakpointValue({ base: 2, lg: 3 })` (`audit/designs/375/legacy.png`: two cards per row, page 5442 px tall).

## Current

`app/_components/catalogue/Catalogue.tsx:242` `columns={{ base: 1, sm: 2, xl: 3 }}` (`audit/designs/375/current.png`: one card per row, page 12867 px tall; two columns through `lg`).

## Verdict

## Log

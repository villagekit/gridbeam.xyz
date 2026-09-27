---
title: "Parts tab: Settings block below the summary to a right-aligned toggle row above it"
status: fixed
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/design/parts-breakdown.tsx:10-37` `ProductSummary` first, then the `Settings` `VStack` with the unit toggle and the group switch stacked.

## Current

`app/_components/design/PartsBreakdown.tsx:20-25` an `HStack justifyContent="flex-end"` of the two toggles first, `ProductSummary` after (Parts tab captures, plan cf52c388 probe).

## Verdict

plan 3c448a379ad7

## Log

- 2026-09-12: Template.

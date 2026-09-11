---
title: "Beam table headings: h2 to h3, skipping a level"
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:47` `<Heading size="md">` (Chakra v2 default `h2`): `audit/tools__cutting-planner/dom/legacy.aria.yaml` `heading "Beams you want" [level=2]`; the outline is h1, h2, h2, then h2 "Cutting plan".

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:283` `<Heading as="h3" size="md">`: `current.aria.yaml` `heading "Beams you want" [level=3]` with no h2 before it, so the outline skips from h1 to h3 until "Cutting plan" (h2, `:197`).

## Verdict

## Log

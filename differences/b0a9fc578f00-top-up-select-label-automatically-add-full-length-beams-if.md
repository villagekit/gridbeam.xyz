---
title: "Top-up select label: Automatically add full length beams if needed to Top up with full-length beams"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:133-137` `<FormLabel htmlFor="unlimited-beams"><Text fontSize="sm" variant="tertiary">Automatically add full length beams if needed</Text></FormLabel>`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:153-157` `<chakra.label htmlFor="unlimited-stock"><Text as="span" fontSize="sm" variant="tertiary">Top up with full-length beams</Text></chakra.label>`.

## Verdict

## Log

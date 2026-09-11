---
title: "Controls layout: top-up select under the stock table and a centered Plan it row to one shared bottom row"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:105` `Stack ... spacing="8"` of the two tables, the right one a `VStack spacing="4"` holding the stock table and the `FormControl` select (`:116-149`); `:152-156` `Flex justifyContent="space-evenly"` with the `Plan it!` button on its own row (`audit/tools__cutting-planner/1280/legacy.png`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:125` `Stack ... gap="6"` of the two tables alone; `:142-183` one wrapping `Stack` row with the select, the unit toggle and the Plan button (`audit/tools__cutting-planner/1280/current.png`).

## Verdict

## Log

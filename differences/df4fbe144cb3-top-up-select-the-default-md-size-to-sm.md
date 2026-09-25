---
title: "Top-up select: the default md size to sm"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:139-147` `<Select id="unlimited-beams" ...>` with no size: Chakra v2's default `md`. Measured on the live legacy site at 1280: 40px tall, font size 16px, border radius 6px.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:158` `<Select.Root size="sm" maxW="36">`. Measured on `pnpm dev` at 1280 with the recipes slice's input sizes: 32px tall, font size 14px, border radius 2px (on `@villagekit/ui@1.2.0`'s Chakra v3 sizes, 36px, 14px and 4px).

## Verdict

## Log

- 2026-09-26: Found by the recipes slice [[45d6f5634a11]] measuring the planner's controls on both sides; the route's own `size="sm"`, not the theme's, so the cutting planner record [[396c9af0cbd1]] owns it. No rule covers a smaller control, so regression.

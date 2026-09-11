---
title: "Number inputs: flushed variant to a boxed default"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:73,92` `<NumberInput variant="flushed" ... size="sm">`: underline only, no box (`audit/tools__cutting-planner/1280/legacy.png`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:366-368,400-402` `<NumberInput.Root size="sm" ...>` with no `variant`, the wrapper's white background (`@villagekit/ui@1.2.0 src/components/NumberInput.tsx:13`): a bordered box around every value (`audit/tools__cutting-planner/1280/current.png`). Chakra v3's `NumberInput` still has a `flushed` variant, so the change is not upgrade-forced.

## Verdict

## Log

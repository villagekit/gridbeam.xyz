---
title: "Planner page shape: Title above the controls to a Section with intro paragraphs"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/tools/cutting-planner.tsx:9-13` the `Title` with its description, then `CuttingPlanner` whose controls are `Section index={0} colorScheme="gray"` (`packages/applet-cutting-planner/src/components/cutting-planner.tsx:104`), the result `Section index={1}` and the uncut tables `index={2}` or `{1}` (`:175,181`).

## Current

`app/tools/cutting-planner/page.tsx:26-47` `Section index={0} maxW="6xl"` holding the `Title` and a `Container maxW="3xl"` of two paragraphs; the controls become `Section index={1}` (`CuttingPlanner.tsx:109-115`), the result `index={2}`, the uncut tables `index={3}`. The paragraphs are [[0a6f631128f2]] and [[ac2bfeb8edcc]]; the about precedent is [[bfe876779ed0]].

## Verdict

## Log

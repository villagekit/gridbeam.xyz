---
title: "Table captions: base size to sm"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:51-53` `<Text variant="tertiary" sx={{ textAlign: 'center' }}>{caption}</Text>`, the base size (`audit/tools__cutting-planner/1280/legacy.png`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:286-288` `<Text variant="tertiary" fontSize="sm" textAlign="center">{caption}</Text>` (`audit/tools__cutting-planner/1280/current.png`). The wording is [[7edc3d5964c1]] and [[9e11cd13f102]].

## Verdict

## Log

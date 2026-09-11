---
title: "Controls and uncut sections: container.md to 6xl"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Section.tsx:36` `maxW = 'container.md'` (768px) is the default; the controls (`packages/applet-cutting-planner/src/components/cutting-planner.tsx:104`) and the uncut tables (`:181`) take it, only the result section passes `maxW="6xl"` (`:175`). `audit/tools__cutting-planner/1280/legacy.png`: the controls block is about 720px wide.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:112,191,220` `maxW="6xl"` (1152px) on all three sections. `audit/tools__cutting-planner/1280/current.png`: the two cards span about 1088px. The home precedent is [[bade326f7b5e]].

## Verdict

## Log

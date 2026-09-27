---
title: "Controls and uncut sections: container.md to 6xl"
status: upstream
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

- 2026-09-28: The site half is done by plan 9c6e9dd981bd: the controls Section (app/tools/cutting-planner/components/CuttingPlanner.tsx) carries no maxW and takes the ui default, and the uncut section already took it in the re-ported CuttingPlannerResult; the monolith's 6xl is gone. On the published 1.2.0 the default is 672px (the slice's probe: the controls container 672px at 1280 against legacy's 768px, the Uncut beams container the same); the ui half, the Section's breakpoint-md default, is committed at ../ui ae6e4ae (60bfe970302b on shell), so the item parks upstream (decision 28c1a536). The bump plan 99f2fe62c62f reads the controls and uncut containers at 768px on the published package, then fixes this item; no site edit at the bump.

---
title: "'use client' directive on CuttingPlanner"
status: sanctioned
route: /tools/cutting-planner
axis: code
kind: added
---
## Legacy

Pages router: no client/server split marker on `packages/applet-cutting-planner/src/components/cutting-planner.tsx`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:1` `'use client'`; the page (`page.tsx`) stays a server component.

## Verdict

rule: upgrade (the app router requires the directive on a stateful component)

## Log

- 2026-09-28: From the page re-port (plan 9c6e9dd981bd): the Current's line is gone with the monolith. The directive now sits at app/tools/cutting-planner/components/CuttingPlanner.tsx:2, legacy's cutting-planner.tsx holding CuttingPlanner, CuttingPlannerControls and CuttingPlannerResult; page.tsx stays a server component importing the client CuttingPlanner from the module barrel (page.tsx:5), legacy's own division between the page file and the applet. No state change.

---
title: "Cutting planner: private workspace package to an in-app module"
status: sanctioned
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/package.json:2` `"name": "@villagekit-private/applet-cutting-planner"`, a workspace package; `apps/gridkit/pages/tools/cutting-planner.tsx:1` `import { CuttingPlanner } from '@villagekit-private/applet-cutting-planner'`.

## Current

`app/tools/cutting-planner/{CuttingPlanner.tsx,algorithm.ts,url-codec.ts}` beside the route; `app/tools/cutting-planner/page.tsx:5` `import { CuttingPlanner } from './CuttingPlanner'`. This repo has no workspace (CLAUDE.md, "Key decisions": the top-level repo is the site, `@villagekit/*` from npm).

## Verdict

rule: operator (CLAUDE.md key decision: the top-level repo is the site, no workspace; the applet was private and never published)

## Log

- 2026-09-28: From the page re-port (plan 9c6e9dd981bd): the Current's files are gone or renamed. The in-app module is app/tools/cutting-planner/ in legacy's file shape: index.ts (the barrel), algorithms/, shared.ts and components/ (BeamsTable, BeamRow, CuttingPlan, DisplayUnitToggle, CuttingPlanner with its own index.ts); page.tsx:5 imports CuttingPlanner from './', the barrel, as legacy's page imported it from the applet package. No state change.

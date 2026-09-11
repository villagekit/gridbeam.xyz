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

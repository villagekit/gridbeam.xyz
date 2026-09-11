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

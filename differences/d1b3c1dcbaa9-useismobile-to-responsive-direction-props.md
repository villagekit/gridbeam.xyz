---
title: useIsMobile to responsive direction props
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:11,44,105` and `:168,182` `useIsMobile()` from `@villagekit/ui` driving `direction={isMobile ? 'column' : 'row'}` on the controls and the uncut-beams stacks.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:125,142-143,221` `direction={{ base: 'column', md: 'row' }}`; no `useIsMobile` import, though `@villagekit/ui@1.2.0` still exports it (the shell found the hook identical on both sides).

## Verdict

## Log

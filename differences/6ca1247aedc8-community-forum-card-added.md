---
title: Community forum card added
status: fixed
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No such card: the legacy route has one card, Cutting planner (`apps/gridkit/pages/tools-and-resources.tsx:11-18`).

## Current

`app/tools-and-resources/page.tsx:101-108` `title: 'Community forum'`, `description: 'Questions, build logs, and design discussion at discuss.villagekit.com.'`, `href: 'https://discuss.villagekit.com'`, `isExternal: true` (a new tab).

## Verdict

plan 42e7c1e5fd38

## Log

- 2026-09-25: Regression (tools grilling R4). The added card is removed; legacy's route has one card, Cutting planner.

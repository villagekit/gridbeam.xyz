---
title: Source on GitHub card added
status: regression
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No such card: the legacy route has one card, Cutting planner (`apps/gridkit/pages/tools-and-resources.tsx:11-18`).

## Current

`app/tools-and-resources/page.tsx:93-100` `title: 'Source on GitHub'`, `description: 'The site, the @villagekit/ui component library, the engine that draws the designs, and the catalogue itself — all open-source under EUPL-1.2.'`, `href: 'https://github.com/villagekit'`, `isExternal: true` (a new tab).

## Verdict

## Log

- 2026-09-25: Regression (tools grilling R4). The added card is removed; legacy's route has one card, Cutting planner.

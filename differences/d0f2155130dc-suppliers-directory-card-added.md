---
title: Suppliers directory card added
status: fixed
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No such card: the legacy route has one card, Cutting planner (`apps/gridkit/pages/tools-and-resources.tsx:11-18`).

## Current

`app/tools-and-resources/page.tsx:62-68` `title: 'Suppliers directory'`, `description: 'Manufacturers and resellers around the world that make 40 mm grid beam and compatible parts. We don't sell parts; we link to people who do.'`, `href: '/suppliers'`.

## Verdict

plan 42e7c1e5fd38

## Log

- 2026-09-25: Regression (tools grilling R4). The added card is removed; legacy's route has one card, Cutting planner.

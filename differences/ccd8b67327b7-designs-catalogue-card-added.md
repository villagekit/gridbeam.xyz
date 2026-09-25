---
title: Designs catalogue card added
status: regression
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No such card: the legacy route has one card, Cutting planner (`apps/gridkit/pages/tools-and-resources.tsx:11-18`).

## Current

`app/tools-and-resources/page.tsx:55-61` `title: 'Designs catalogue'`, `description: 'Beds, desks, shelves, market stalls — every design with parts list and a 3D preview you can rotate.'`, `href: '/designs'`.

## Verdict

## Log

- 2026-09-25: Regression (tools grilling R4). The added card is removed; legacy's route has one card, Cutting planner.

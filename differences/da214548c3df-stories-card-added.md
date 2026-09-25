---
title: Stories card added
status: regression
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No such card: the legacy route has one card, Cutting planner (`apps/gridkit/pages/tools-and-resources.tsx:11-18`).

## Current

`app/tools-and-resources/page.tsx:86-92` `title: 'Stories'`, `description: 'Build logs and field reports from people doing it — what worked, what they would do differently next time.'`, `href: '/stories'`.

## Verdict

## Log

- 2026-09-25: Regression (tools grilling R4). The added card is removed; legacy's route has one card, Cutting planner.

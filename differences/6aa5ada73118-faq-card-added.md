---
title: FAQ card added on tools and resources
status: fixed
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No such card: the legacy route has one card, Cutting planner (`apps/gridkit/pages/tools-and-resources.tsx:11-18`).

## Current

`app/tools-and-resources/page.tsx:79-85` `title: 'FAQ'`, `description: 'Common questions about durability, materials, sourcing, sustainability, and how to get parts.'`, `href: '/faq'`.

## Verdict

plan 42e7c1e5fd38

## Log

- 2026-09-25: Regression (tools grilling R4). The added card is removed; legacy's route has one card, Cutting planner.

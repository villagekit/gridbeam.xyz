---
title: In-tab heading Cutting plan removed
status: regression
route: /designs/bed-frame
axis: copy
kind: removed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:19-21` `<Heading size="md">Cutting plan</Heading>` inside the Plan tab, the only h2 in the panel.

## Current

`app/_components/design/DesignCuttingPlan.tsx:70-119` no heading; the panel starts with the summary text.

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-25: Regression (design page grilling T2). The "Cutting plan" heading returns inside the Plan tab. Template.

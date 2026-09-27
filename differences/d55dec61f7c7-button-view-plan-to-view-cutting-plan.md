---
title: "Button: View plan to View cutting plan"
status: fixed
route: /designs/bed-frame
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:110` `children: 'View plan'`.

## Current

`app/_components/design/DesignViewer.tsx:67` `label: 'View cutting plan'`.

## Verdict

plan f64fd2900fb3

## Log

- 2026-09-12: Template.

- 2026-09-25: Regression (design page grilling T2). Ships as "View plan". Template.

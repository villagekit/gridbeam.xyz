---
title: "Unit toggle side labels: aria-hidden to exposed text"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/display-unit-toggle.tsx:24,32` both `FormLabel`s are `aria-hidden`; only the switch name reaches the tree (snapshot: `checkbox "Display units as millimeters or grid units"`).

## Current

`app/_components/design/PartsBreakdown.tsx:38-56` `gu` and `mm` are plain `Text` beside the named switch (snapshot: `paragraph: gu`, `checkbox "Show measurements in millimetres"`, `paragraph: mm`).

## Verdict

## Log

- 2026-09-12: Template. The planner's instance is [[ba3c21bb954e]].

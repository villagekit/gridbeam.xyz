---
title: "DisplayUnitToggle: the applet component instantiated per tab to a private Chakra v3 toggle with one lifted state"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/design/parts-breakdown.tsx:1,6-8,19-22` imports `DisplayUnitToggle` from `@villagekit-private/applet-cutting-planner` (`display-unit-toggle.tsx:17-42`, `FormControl`/`FormLabel`/`Switch`) with `useBoolean` state; the Plan tab has its own instance.

## Current

`app/_components/design/PartsBreakdown.tsx:16,35-56` a file-local `DisplayUnitToggle` (`Switch.Root`/`HiddenInput`/`Control`/`Thumb`, `aria-label`, `useState`); `displayUnit` lives in `DesignViewer.tsx:51`; a third implementation is in `app/tools/cutting-planner/CuttingPlanner.tsx:428`.

## Verdict

## Log

- 2026-09-12: Template.

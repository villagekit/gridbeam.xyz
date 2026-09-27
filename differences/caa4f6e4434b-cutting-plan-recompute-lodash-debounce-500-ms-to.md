---
title: "Cutting plan recompute: lodash debounce 500 ms to useDeferredValue"
status: fixed
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:27,151-163` `useState` + `debounce(..., 500, { leading: false })` in a `useEffect`.

## Current

`app/_components/design/DesignCuttingPlan.tsx:6,34-38` `useDeferredValue(context.parts)` + `useMemo`.

## Verdict

plan 3c448a379ad7

## Log

- 2026-09-12: Template.

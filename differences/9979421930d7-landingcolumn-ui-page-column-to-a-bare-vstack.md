---
title: "LandingColumn: ui-page Column to a bare VStack"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:515-526` wraps `Column` (`packages/ui-page/src/components/Column.tsx`, `index` required).

## Current

`app/_components/landing/LandingSection.tsx:53-68` a `VStack` with `flex` and `gap` props, no `index`, not the ui `Column`.

## Verdict

## Log

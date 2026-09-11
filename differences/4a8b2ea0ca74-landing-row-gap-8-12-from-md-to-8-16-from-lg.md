---
title: "Landing row gap: 8/12 from md to 8/16 from lg"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:503` `Row` `spacing={[8, null, 12]}` (12 from `md`).

## Current

`app/_components/landing/LandingSection.tsx:47` `gap={gap ?? { base: 8, lg: 16 }}` (16 from `lg`). From code.

## Verdict

## Log

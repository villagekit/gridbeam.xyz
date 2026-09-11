---
title: "Landing column gap: responsive 4/8 to flat 5"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:517-526` `Column` `spacing={[4, null, 8]}`.

## Current

`app/_components/landing/LandingSection.tsx:61-67` `VStack gap={5}` default. From code.

## Verdict

## Log

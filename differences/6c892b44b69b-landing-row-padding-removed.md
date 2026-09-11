---
title: Landing row padding removed
status: regression
route: /
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/pages/index.tsx:504-510` `LandingRow` `sx={{ paddingX: isMobile ? 2 : 16, paddingY: isMobile ? 8 : 16 }}`.

## Current

`app/_components/landing/LandingSection.tsx:34-51` no padding on `LandingRow`; only `gap`. From code.

## Verdict

## Log

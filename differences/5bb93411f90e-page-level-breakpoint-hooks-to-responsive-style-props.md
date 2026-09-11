---
title: Page-level breakpoint hooks to responsive style props
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:59-70` `useIsMobile()` and `useBreakpointValue({ base: false, lg: true })` drive `buttonSize`, `textSize`, `direction` and `spacing` throughout, and inside `LandingRow`, `LandingImage` and `LandingVideo`.

## Current

`app/page.tsx` and `app/_components/landing/*`: no `useIsMobile` or `useBreakpointValue`; responsive objects on each prop (`app/page.tsx:110,116`).

## Verdict

## Log

- 2026-09-12: Both hooks exist in Chakra v3 and `@villagekit/ui@1.2.0` (`src/hooks/useIsMobile.ts`), so rule 4 does not cover the swap.

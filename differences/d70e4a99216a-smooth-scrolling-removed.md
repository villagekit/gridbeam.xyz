---
title: Smooth scrolling removed
status: regression
route: shell
axis: interaction
kind: removed
---
## Legacy

`apps/gridkit/theme.ts:17-23`: `styles.global` sets `html: { scrollBehavior: 'smooth' }`, applied through `ChakraProvider` in `apps/gridkit/pages/_app.tsx:45`.

## Current

No `scrollBehavior` or `scroll-behavior` in `app/` or `@villagekit/ui@1.2.0 src/theme/index.ts`. In-page anchor jumps snap.

## Verdict

## Log

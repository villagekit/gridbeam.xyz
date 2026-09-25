---
title: "Footer column gap: 0 to 16 from md"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Footer.tsx:46`: `spacing={{ base: 8, md: 0 }}`.

## Current

`@villagekit/ui@1.2.0 src/components/layouts/Footer.tsx:46`: `gap={{ base: '8', md: '16' }}`.

## Verdict

## Log

- 2026-09-26: Fixed in ../ui by the ui brand footer slice [[1977c9af920c]], commit ae593d0: src/components/layouts/Footer.tsx, the row's gap is { base: 8, md: 0 } again; measured 0px on both sides at 768 and 1280. Waits on the operator's publish.

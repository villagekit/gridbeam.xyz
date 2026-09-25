---
title: "Footer columns: centered to left-aligned"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Footer.tsx:42-46,72`: the sections row is `<Stack direction={{ base: 'column', md: 'row' }} alignItems="top">` and each section `<VStack as="section" sx={{ flex: 0, minWidth: '3xs' }}>` (`:72`) with no `alignItems`, so headings and links center under each other. `audit/_root/1280/legacy.png` and `audit/_root/375/legacy.png` footers.

## Current

`@villagekit/ui@1.2.0 src/components/layouts/Footer.tsx:44,72`: `alignItems="flex-start"` on the row and on each `<VStack as="section" flex="0" minW="3xs" alignItems="flex-start">`. `audit/_root/1280/current.png` and `audit/_root/375/current.png` footers.

## Verdict

## Log

- 2026-09-26: Fixed in ../ui by the ui brand footer slice [[1977c9af920c]], commit ae593d0: src/components/layouts/Footer.tsx drops alignItems from the row and the columns, so each column's VStack centers its heading and links as legacy's did (legacy's alignItems top was an invalid value the browser ignored). Measured align-items center on every section on both sides. Waits on the operator's publish.

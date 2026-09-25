---
title: "Heading size md: Chakra v2's 20px on a 24px line to the ui recipe's 18px on 21.6px"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Heading.tsx:19-23`: `headingTheme` sets `baseStyle.fontWeight: normal` and no sizes, so `size="md"` is Chakra v2's default, `fontSize: xl` on `lineHeight: 1.2`. Measured on the live legacy site at 1280: the footer column heading `Our product` at 20px on a 24px line (`audit/_root/1280/legacy.png`, footer).

## Current

`../ui/src/components/Heading.tsx:33`: `headingRecipe` size `md: { textStyle: 'none', fontSize: 'lg', lineHeight: '1.2' }`. Measured on `pnpm dev` at 1280: the footer column heading `Explore` at 18px on a 21.6px line (`audit/_root/1280/current.png`, footer). The same at 375. Every `Heading size="md"` on the site is affected; `7124898563eb` records the weight only.

## Verdict

## Log

- 2026-09-26: Found by the Parity review of the ui brand footer slice [[1977c9af920c]] and pre-existing: no rule covers a smaller heading, so regression. The fix is the ui Heading recipe's, the recipes slice [[45d6f5634a11]] (its Heading line covers the weight, `7124898563eb`; this is the size beside it).

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Heading.tsx: headingRecipe size md is fontSize xl on lineHeight 1.2; measured 20px on a 24px line on the footer column heading at 1280 on both sides. Waits in upstream for the bump plan [[99f2fe62c62f]].

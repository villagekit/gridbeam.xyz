---
title: "Wordmark wraps at 768: Grid Beam on two lines, the header 108px to legacy's 63px"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`audit/_root/768/legacy.png`: the header is one row, 63px tall (the dashed bottom border at y 61-62, the same as at 375 and 1280), with `Grid Kit` on one line beside the logo. `apps/gridkit/components/layouts/main.tsx:85`: the wordmark is a `NavLink size="xl"` with no `whiteSpace` rule, and `@villagekit/ui@0.9.0` sets none; the brand column is one third of the row (`flex: 1`) and the three top items and the cart icon leave it room at 768.

## Current

`audit/_root/768/current.png`: the header is 108px tall (the dashed border at y 106-107), with `Grid Beam` wrapped onto two lines. The brand is legacy's shape (`app/_components/SiteBrand.tsx:13-19`, no `whiteSpace`), but the four top items of decision `c21b7e35f0c7` at `gap: 12` and the `Find a supplier` action (`e48df8d1ce98`) take their min-content width from the three `flex: 1` columns of `@villagekit/ui@1.2.0 src/components/nav/NavHeader.tsx:53-79`, and the brand column that remains is narrower than the wordmark, which wraps at its space. At 375 (the mobile row) and 1280 the header is 63px on both sides. Before plan f8c93eaf the hand-authored brand held the wordmark on one line with `whiteSpace="nowrap"`, a helper legacy did not have.

## Verdict

## Log

- 2026-09-26: Filed by plan f8c93eaf at its Parity review. The cause is the sum of three sanctioned changes (the four-item nav, the header action, the longer wordmark) on legacy's own brand shape, so the fix is the operator's call: `whiteSpace: nowrap` on the wordmark, a tighter nav gap, or a narrower action at md. Not fixed by an agent's taste.

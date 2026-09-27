---
title: "Cutting plan ruler labels: the engine's 1.875rem fontSize attribute to 16px under Chakra v3's font: inherit preflight"
status: upstream
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

The engine's ruler labels at the version legacy pinned (`packages/applet-cutting-planner/package.json` `@villagekit/part-gridbeam ^0.9.0`; `../gridkit` at tag `v0.9.0`, `core/part/src/base/grid/svg/label.tsx:57,64`, `const { fontSizes } = useTheme()` and `fontSize={fontSizes['3xl']}`) write `1.875rem` as an SVG presentation attribute on each `text`, as the current source does through `system.token('fontSizes.3xl')` (`../gridkit core/part/src/base/grid/svg/label.tsx:60-63`); under Chakra v2's reset, which writes no `font` on `*`, the live Plan tab of `/designs/bed-frame` renders the cut markers and totals at 30px (the Parity review of plan 55d567074c71, `scratchpad/review/55d5/legacy-cut-1280.png`, glyphs 15px tall).

## Current

The same drawing through the re-ported `app/tools/cutting-planner/components/CuttingPlan.tsx:49-54` (the published `@villagekit/part-gridbeam@0.10.0`, `node_modules/@villagekit/part/dist/base/grid/svg/label.js:25-26,31-38`) renders the labels at 16px: Chakra v3's preflight writes `font: inherit` on `*` (`node_modules/@chakra-ui/react/dist/esm/styled-system/preflight.js:15-18`), a stylesheet rule that beats a presentation attribute, so the `fontSize` attribute loses to the body's 16px (`scratchpad/review/55d5/current-cut-1280.png`, glyphs 9px tall). Read on the slice's throwaway route; it reaches the route when the page re-port `3c448a379ad7` renders `CuttingPlannerResult`. The fix is the engine's, in `../gridkit`: the size written as a style or a `css` prop the preflight does not beat, for a `../gridkit` slice the design pages record's finish hands it to (the split's call 10).

## Verdict

## Log

- 2026-09-28: From the page re-port (plan 3c448a379ad7): the Parts tab's part labels read 16px under the same preflight, filed as [[1a08e6077525]]; one ../gridkit fix in the engine's TextLabel covers both.

- 2026-09-28: Handed to the ../gridkit slice [[98a6d91413ef]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a, the split's call 10): @villagekit/part's TextLabelX and TextLabelY write the 3xl size as a declaration the preflight does not beat, one fix for the Parts tab's summaries and the Plan tab's rulers, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit; no verdict is written.

- 2026-09-28: Fixed in ../gridkit at commit 188536d (plan [[98a6d91413ef]]): @villagekit/part's TextLabelX and TextLabelY write the 3xl size as an inline style, which the preflight's `* { font: inherit }` does not beat. On pnpm dev under the tarball override, every text on the Plan tab of /designs/bed-frame (54) and /designs/shelf-tower (20) computes 30px at 1280 and 375, the live legacy site's reading, the text, anchors and positions unchanged; the ruler glyphs 14px against legacy's 15, the drawing's scale (992 against 1056px wide) from the Container padding [[5c1af396cc2e]] (upstream) applied by both the page's and the Section's Container, and the fills Chakra v3's palette [[72b776cb0d3f]] (upstream). Waits on the publish; the bump plan [[99f2fe62c62f]] moves it to fixed.

---
title: "Parts tab part labels: the engine's 1.875rem fontSize attribute to 16px under Chakra v3's font: inherit preflight"
status: upstream
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

On the live `/designs/bed-frame` at 1280 with the Parts tab open, the engine's `ProductSummary` draws each part's size label (`47`, `23`, `8`, the panel's `47` by `23`) inside its SVG with a `font-size="1.875rem"` attribute that computes to 30px, a 14px glyph box (the re-port's `verify-parity.mjs`, `svgTexts`, both sides); the Parity review's `audit/_review/parts-legacy.png`. The label component is the engine's `TextLabel` at the 0.9.0 tag the live site was built from, the same one `2deff48d6dc6` cites for the Plan tab's rulers.

## Current

On `pnpm dev` at 1280 with the Parts tab open, the same `text` elements carry the same `font-size="1.875rem"` attribute and compute to 16px, an 8px glyph box (`verify-parity.mjs`), since Chakra v3's preflight sets `font: inherit` on every element and a CSS declaration beats a presentation attribute; the Parity review's `audit/_review/parts-current.png`. The mechanism and the fix are `2deff48d6dc6`'s, whose item names the Plan tab's rulers alone; the engine's, for the design pages record's finish to hand to a `../gridkit` slice with it, never fixed here. Read by the Parity review of the page re-port (plan 3c448a379ad7), which introduced neither the summary nor the preflight.

## Verdict

## Log

- 2026-09-28: Handed to the ../gridkit slice [[98a6d91413ef]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a, the split's call 10): @villagekit/part's TextLabelX and TextLabelY write the 3xl size as a declaration the preflight does not beat, one fix for the Parts tab's summaries and the Plan tab's rulers, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit; no verdict is written.

- 2026-09-28: The Parity review of the ui field root and label box slice (plan 42f6738b9658) read the fastener's caption on the Parts tab (`115mm bolt + 12mm nut`, `audit/_parity42f6/legacy-parts-1280.png` against `current-parts-1280.png`) as much smaller than legacy's: the same `TextLabel` under the same preflight, the fastener's SVG label named in the ../gridkit slice [[98a6d91413ef]]'s Work, so this item covers it and that slice's probe reads it.

- 2026-09-28: Fixed in ../gridkit at commit 188536d (plan [[98a6d91413ef]]): @villagekit/part's TextLabelX and TextLabelY write the 3xl size as an inline style, which the preflight's `* { font: inherit }` does not beat. On pnpm dev under the tarball override, every text on the Parts tab of /designs/bed-frame (7, the fastener captions included) and /designs/shelf-tower (6) computes 30px at 1280 and 375, the live legacy site's reading, the text and aria-labels unchanged; the glyph boxes 14px against legacy's 14 or 15, the panel's narrower scale from the Container padding [[5c1af396cc2e]] (upstream) and the fills Chakra v3's palette [[72b776cb0d3f]] (upstream). Waits on the publish; the bump plan [[99f2fe62c62f]] moves it to fixed.

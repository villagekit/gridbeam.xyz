---
title: "Parts tab part labels: the engine's 1.875rem fontSize attribute to 16px under Chakra v3's font: inherit preflight"
status: open
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

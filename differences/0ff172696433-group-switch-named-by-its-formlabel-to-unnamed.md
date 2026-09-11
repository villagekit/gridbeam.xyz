---
title: "Group switch: named by its FormLabel to unnamed"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/design/parts-breakdown.tsx:24-36` `FormLabel htmlFor="design-parts-breakdown-group-parts"` + `Switch id=...` (snapshot: `checkbox "Group same size parts" [checked]`).

## Current

`app/_components/design/PartsBreakdown.tsx:68-88` a plain `<label htmlFor="design-parts-group">` beside `<Switch.Root id="design-parts-group">`; the v3 switch gives its input its own id, so the pairing fails (snapshot: `text: Group same size` then an unnamed `checkbox [checked]`).

## Verdict

## Log

- 2026-09-12: Template.

---
title: "Engine SVG labels: the 3xl size as a font-size presentation attribute to an inline style"
status: open
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

The engine's `TextLabelX` and `TextLabelY` at the version the live site was built from (`../gridkit` at tag `v0.9.0`, `core/part/src/base/grid/svg/label.tsx:57,64`) write the label size as an SVG presentation attribute, `fontSize={fontSizes['3xl']}`, so each part size label on the Parts tab and each ruler mark, cut marker and total on the Plan tab renders as `<text font-size="1.875rem">` (the live `/designs/bed-frame`, `audit/_probe98a6/legacy-bed-1280.json`, `attr`).

## Current

The same components in `../gridkit` at `188536d` (plan 98a6d91413ef) write the size as an inline style, `style={{ fontSize }}`, so the same elements render as `<text style="font-size: 1.875rem;">` with no `font-size` attribute (`audit/_probe98a6/after-bed-1280.json`, `style`), seen here through the tarball override until the operator's publish. The reason is Chakra v3's preflight, `* { font: inherit }` (`node_modules/@chakra-ui/react/dist/esm/styled-system/preflight.js:15-18`), a stylesheet rule that beats a presentation attribute and drew the labels at 16px ([[1a08e6077525]], [[2deff48d6dc6]]); the inline style draws them at legacy's 30px. No visual or accessibility effect: the text, the aria-labels, the anchors and the positions are the same on both sides. Filed by the Parity review of the slice that made the change, so `open`, the operator's to judge.

## Verdict

## Log

---
title: "Cut-beam accessible label: 47 and 8 unit grid beams made from a 60 unit grid beam cut at 47 and 55 grid unit markers. to 60 gu stock beam, cuts: 47 gu, 8 gu, remainder 5 gu"
status: open
route: /designs/bed-frame
axis: copy
kind: changed
---
## Legacy

`gridkit@v0.9.0 parts/gridbeam/src/svg/cut-grid-beam-svg.tsx:35-48,57,62` `aria-label` and `<title>`: `{joinAnd(cuts)} unit grid beams made from a {size} unit grid beam cut at {joinAnd(absoluteCuts)} grid unit markers.`; a single full-length cut yields `30 unit grid beams made from a 30 unit grid beam cut at  grid unit markers.` (double space, empty list).

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:33,57` figure `aria-label` `60 gu stock beam, cuts: 47 gu, 8 gu, remainder 5 gu`; the svg `<title>` is the fixed `Cutting plan visualisation` on every row.

## Verdict

## Log

- 2026-09-12: Template.

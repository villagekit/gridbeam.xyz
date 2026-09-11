---
title: "Cut beam: svg role img to a figure wrapping a presentational svg whose text leaks"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

`gridkit@v0.9.0 parts/gridbeam/src/svg/cut-grid-beam-svg.tsx:56-63` `<svg role="img" aria-label={label}>`, one atomic node per beam (snapshot: `img "47 and 8 unit grid beams made from ..."`).

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:31-58` `<Box as="figure" aria-label=...>` with two `Text` captions and `<svg role="presentation">`; the svg `<text>` nodes still surface (snapshot: `figure "60 gu stock beam, cuts: 47 gu, 8 gu, remainder 5 gu"` > two paragraphs > `text: 47 gu 8 gu 5 gu`).

## Verdict

## Log

- 2026-09-12: Template.

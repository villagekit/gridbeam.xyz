---
title: "Cut beam drawing text: header lines, segment labels and aria-label"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

The engine's `CutGridBeamSvg` (`@villagekit/part-gridbeam`, sibling `../gridkit` `parts/gridbeam/src/svg/cut-grid-beam-svg.tsx:52-65,80` at `e58d700`; the pinned 0.9.0 is not installed to check): no HTML text beside the drawing; the in-beam numbers are the cumulative cut positions plus the total, without a unit (`core/part/src/base/grid/svg/label.tsx:18-25`, `parts/gridbeam/src/svg/cut-marker.tsx:10-23`); the `svg role="img"` title reads "{cuts joined 'and'} unit grid beams made from a {size} unit grid beam cut at {positions} grid unit markers.", live: "15 and 15 unit grid beams made from a 30 unit grid beam cut at 15 grid unit markers."

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:41-47` a header "{size} stock beam" and "cuts: {cuts joined ' + '}{ + remainder waste}" (live: "60 gu stock beam", "cuts: 15 gu + 15 gu + 15 gu + 15 gu"); `:91-100` each segment labelled with its own length and unit ("15 gu", "40 gu"); `:33` `aria-label` "{size} {unit} stock beam, cuts: {cuts joined ', '}, remainder {remainder}" (live: "60 gu stock beam, cuts: 15 gu, 15 gu, 15 gu, 15 gu, remainder 0 gu"); `:57` a static `<title>Cutting plan visualisation</title>` on a `role="presentation"` svg. All of it goes with the drawing swap [[7f2556a9ec9d]].

## Verdict

## Log

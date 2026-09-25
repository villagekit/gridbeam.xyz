---
title: "Cut-beam captions added: 60 gu stock beam and cuts: 47 gu + 8 gu + 5 gu waste"
status: regression
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

`gridkit@v0.9.0 parts/gridbeam/src/svg/cut-grid-beam-svg.tsx` draws numbers only (`47`, `8`, `55`, `60` on the rulers), no caption text.

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:41-46` `{size} stock beam` and `cuts: {a} + {b}` + ` + {r} waste` above every bar.

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-25: Regression (design page grilling T3). Goes with the drawing swap ([[8ea5d69ee6ed]]): the engine's CutGridBeamSvg carries its own numbers and title. Template.

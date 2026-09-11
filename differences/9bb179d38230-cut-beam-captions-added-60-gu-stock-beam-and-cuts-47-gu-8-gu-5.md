---
title: "Cut-beam captions added: 60 gu stock beam and cuts: 47 gu + 8 gu + 5 gu waste"
status: open
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

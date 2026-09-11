---
title: "Custom sliders: pink track with a value bubble to a zero-width root with a bare thumb"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/parameters/src/values/number.tsx:46-58` `Slider`/`SliderTrack`/`SliderFilledTrack`/`SliderThumb`; with the Custom preset on `/designs/5-12-13-triangle-desk` the `Size` and `Width` sliders draw a 400 px pink track and a value bubble (probe capture, plan cf52c388).

## Current

`@villagekit/parameters@0.10.0 src/values/number.tsx:43-70` `Slider.Root`/`Track`/`Range`/`Thumb`; the `.chakra-slider__root` measures 0 px wide where the legacy `.chakra-slider` measures 400 px, so only a sliver of the thumb shows at the left edge (probe capture).

## Verdict

## Log

- 2026-09-12: Template: every design with number parameters. Evidence taken on `/designs/5-12-13-triangle-desk`.

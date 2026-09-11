---
title: "Icon SVG in CubeLogo: presentation attributes dropped, lens subpaths closed with z"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/public/icon.svg` (this repo's `app/icon.svg` is a byte-identical copy, md5 `2e236d2c…`): the `<g>` (`:3`) carries `stroke-dasharray="none" stroke-opacity="1"`, the cube paths (`:4-8`) `fill-opacity="1" stroke-linecap="butt"` and one of them `paint-order="normal"` (`:6`), and the two lens paths (`M225…` and `M95…`, lines 9-10) end in six zero coordinates (`…-12.25652-1.2132 0 0 0 0 0 0`), a zero-length curve, not a closepath.

## Current

`app/_components/CubeLogo.tsx:26-59`: the same `d` data without those attributes, except that the two lens paths (`:51,56`) end in `z` (`…-12.25652-1.2132z`), closing the subpath with a join where the legacy path ends with the default butt caps at `stroke-width` 5.333 and 5.333333.

## Verdict

diff artifact: every dropped attribute is the SVG default; the path data is byte-identical and nothing renders differently

## Log

- 2026-09-12: Review found the dismissal's claim false: the lens paths end in six zero coordinates in icon.svg and in z in CubeLogo.tsx. Superseded: regression, no rule covers it. The attributes dropped are still SVG defaults; the z is the real difference.

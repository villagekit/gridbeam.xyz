---
title: "Hover styles guarded by media hover: hover, so a pointer that cannot hover never shows a button's hover fill or scale"
status: open
route: shell
axis: interaction
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Button.tsx:41-126` writes every button hover style under `_hover`, which Chakra v2's `@chakra-ui/styled-system@2.9.2` resolves to `&:hover, &[data-hover]` (`dist/index.mjs:1170`) with no media query. On a pointer that cannot hover, a touch screen, the browser's sticky `:hover` applies on a tap and stays until the next tap elsewhere, so a tapped legacy button shows its hover styles: the base `scale(1.08)` after the press, the `toolbar` and `tertiary` variants' `primary.400` 10% fill, the `secondary` variant's `primary.50` fill and solid `primary.500` border, the `primary` variant's `primary.500` background. Every 0.9.0 component with a `_hover` state behaves the same way on such a pointer. Read in the sources; not measured on a touch device.

## Current

`@chakra-ui/react@3.35.0` `preset-base.js:67-70` defines the `hover` condition as `["@media (hover: hover)", "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])"]`, so every `_hover` style in `../ui` and in the site's own components sits inside `@media (hover: hover)` and never applies on a pointer that cannot hover, `[data-hover]` included. On a touch screen a tapped ui button shows only its plain active rule: scale `1` and the variant's active color, with no fill, no solid border and no scale after the tap. Found by the Parity review of `8a869061bce7`, which fixes the press transform on a hovering pointer and neither widens nor narrows this. The legacy behavior is the browser's sticky hover, which Chakra v3's guard removes on purpose; whether the guard is an upgrade-forced deviation under `2032533f` or a regression to re-port by writing the hover states without it is the operator's call.

## Verdict

## Log

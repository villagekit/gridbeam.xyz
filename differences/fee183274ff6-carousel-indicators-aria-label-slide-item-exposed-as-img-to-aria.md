---
title: "Carousel indicators: aria-label slide item exposed as img to aria-hidden by Chakra v3's Icon"
status: open
route: /stories/2022-newsletter
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:96-108` at `fce357d` renders each indicator as Chakra v2's `<Icon aria-label={label} as={FaCircle} ...>`, served as `<svg ... focusable="false" class="chakra-icon ..." aria-label="slide item" ...>`, so each indicator is in the accessibility tree: thirty-seven `img "slide item"` across the ten galleries in `audit/stories__2022-newsletter/dom/legacy.aria.yaml`, each gallery's run in a `list` before its `previous slide / item` button.

## Current

`app/_components/ImageCarousel.tsx:102-113` is the same line, but Chakra v3's `Icon` writes `aria-hidden="true"` on every icon (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:22`), so the indicators leave the tree: no `slide item` in `audit/stories__2022-newsletter/dom/current.aria.yaml`, each gallery's `list` empty before its button. The buttons, the cloned slides and the click still work as legacy's (the probe of 2026-09-26). The same item on `/stories/2021-winter-newsletter` ([[94b21887102b]]) cites the served markup on both sides and the mechanism's precedents, the shell's [[89301ca8a1fc]] and the home's [[1ea1f9eda079]]. Found by the components slice [[373320c95e55]].

## Verdict

## Log

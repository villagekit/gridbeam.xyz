---
title: "Carousel indicators: aria-label slide item exposed as img to aria-hidden by Chakra v3's Icon"
status: open
route: /stories/2021-winter-newsletter
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:96-108` at `fce357d` renders each indicator as Chakra v2's `<Icon aria-label={label} as={FaCircle} ...>`, and the live site serves `<svg ... focusable="false" class="chakra-icon css-154vvx3" aria-label="slide item" ...>` (a curl of `/stories/2021-winter-newsletter`, 2026-09-26), so each indicator is in the accessibility tree: `audit/stories__2021-winter-newsletter/dom/legacy.aria.yaml:65-69`, a `list` of four `img "slide item"` before the `previous slide / item` button, seven on the route and thirty-seven on `/stories/2022-newsletter` (`audit/stories__2022-newsletter/dom/legacy.aria.yaml`).

## Current

`app/_components/ImageCarousel.tsx:102-113` is the same line, but Chakra v3's `Icon` writes `aria-hidden="true"` on every icon (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:22`), so the served markup is `<svg ... focusable="false" aria-hidden="true" aria-label="slide item" class="chakra-icon css-oi1fvf" ...>` and the indicators leave the tree: `audit/stories__2021-winter-newsletter/dom/current.aria.yaml:98`, an empty `list` before the button, and no `slide item` on either newsletter's current tree. The buttons, the cloned slides and the click still work as legacy's (the probe of 2026-09-26). The same mechanism as the shell's [[89301ca8a1fc]] and the home's [[1ea1f9eda079]]; the home's hero shows no indicators (`autoPlayEnabled`), so the carousel re-port [[c92c235205f5]] could not see it. Found by the components slice [[373320c95e55]] on the twelve galleries this route and `/stories/2022-newsletter` share.

## Verdict

## Log

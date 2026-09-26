---
title: "Carousel arrows: the chevron icon 16px at a 16px button font to 20px at 14px, Chakra v3's button recipe icon size"
status: regression
route: /stories/2021-winter-newsletter
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:138-143` at `fce357d` renders each arrow as `<IconButton title={label} icon={<Icon as={icon} sx={{ transform: 'scale(1.5)' }} />} onClick={onClick} variant="tertiary" />`: Chakra v2's `md` button is 40px at `fontSize: md`, and the `Icon` is `1em`, so the live site reads the button at `font-size: 16px` and the chevron `svg` at 16 by 16px, 24 by 24px after the scale (the probe of 2026-09-26 at 1280 and 375 on both galleries; `audit/stories__2021-winter-newsletter/1280/legacy.png`).

## Current

`app/_components/ImageCarousel.tsx:144-145` is the same line (the icon as children, [[d1a6b0906a41]]), but Chakra v3's button recipe sizes the icon by its own rule: `md` writes `textStyle: sm` and `_icon: { width: '5', height: '5' }` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/button.js:69-78`), so the button reads `font-size: 14px` and the `svg` 20 by 20px, 30 by 30px after the scale, a quarter larger than legacy's (`audit/stories__2021-winter-newsletter/1280/current.png`). The ui recipes slice [[2bd0169a6dda]] (ui commit 6603102, `upstream`) restores v2's font size per size through `buttonSize` (`../ui/src/components/Button.tsx:126-128`, `textStyle: 'none'` and `fontSize`) but keeps v3's per-size `_icon` widths, so the icon stays 20px after the bump; the fix is the recipe's `_icon` at `1em`, a `../ui` change. The home's hero autoplays and shows no arrows, so the carousel re-port [[c92c235205f5]] could not see it; found by the Parity review of the components slice [[373320c95e55]], which restored the two galleries. The same on `/stories/2022-newsletter` ([[f2e4bf3755c7]]).

## Verdict

## Log

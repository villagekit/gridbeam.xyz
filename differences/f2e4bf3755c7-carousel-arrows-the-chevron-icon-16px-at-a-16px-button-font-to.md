---
title: "Carousel arrows: the chevron icon 16px at a 16px button font to 20px at 14px, Chakra v3's button recipe icon size"
status: upstream
route: /stories/2022-newsletter
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:138-143` at `fce357d` renders each arrow as `<IconButton title={label} icon={<Icon as={icon} sx={{ transform: 'scale(1.5)' }} />} onClick={onClick} variant="tertiary" />`: Chakra v2's `md` button is 40px at `fontSize: md`, and the `Icon` is `1em`, so the live site reads the button at `font-size: 16px` and the chevron `svg` at 16 by 16px, 24 by 24px after the scale, on each of the ten galleries (`audit/stories__2022-newsletter/1280/legacy.png`; the probe of 2026-09-26 read the same button on the 2021 newsletter).

## Current

`app/_components/ImageCarousel.tsx:144-145` is the same line (the icon as children, [[d1a6b0906a41]]), but Chakra v3's button recipe sizes the icon by its own rule: `md` writes `textStyle: sm` and `_icon: { width: '5', height: '5' }` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/button.js:69-78`), so the button reads `font-size: 14px` and the `svg` 20 by 20px, 30 by 30px after the scale, a quarter larger than legacy's (`audit/stories__2022-newsletter/1280/current.png`). The ui recipes slice [[2bd0169a6dda]] (ui commit 6603102, `upstream`) restores v2's font size per size but keeps v3's per-size `_icon` widths, so the icon stays 20px after the bump; the fix is the recipe's `_icon` at `1em`, a `../ui` change. Found by the Parity review of the components slice [[373320c95e55]], which restored the ten galleries; the same on `/stories/2021-winter-newsletter` ([[e5f7c103b8bf]]), where the readings and the mechanism are cited in full.

## Verdict

## Log

- 2026-09-27: Handed to the ui slice [[179862cdff12]], minted beside the shell record at the story pages record's finish (plan [[56e6eb197e6c]], decision 40abdb2f222a), with its 2021 twin [[e5f7c103b8bf]]: one slice for both, the button recipe's _icon at 1em per size and the IconButton wrapper's fontSize, blocking the bump plan [[99f2fe62c62f]]. The state stays regression until the slice moves it to upstream with the sibling commit.

- 2026-09-27: Fixed in ../ui at commit 7922dd3 by the ui slice [[179862cdff12]]: buttonSize writes _icon width and height 1em in each of the four sizes over Chakra v3's per-size widths, and the ui IconButton passes _icon fontSize 1em over v3's 1.2em. Under the file:../ui override every carousel arrow on this route reads 40px tall at font-size 16px with its svg 16 by 16 before the scale(1.5) and 24 by 24 after, at 1280, 768 and 375, the live legacy site's readings. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] repeats the probe on the published package and moves it to fixed.

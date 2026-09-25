---
title: "Story card badge: gray.800 text on the 100 shade to the 700 shade on the 50 shade"
status: fixed
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:78-83` at `fce357d` renders the category badge with the category palette's `100` shade as its background and no text color, so the text inherits the body's `gray.800`; live legacy site, `/stories` at 1280, a Guide badge computes to `rgb(26, 32, 44)` on `rgb(196, 241, 249)` (`cyan.100`) and an Inspiration badge to the same text on `rgb(233, 216, 253)` (`purple.100`).

## Current

`app/_components/StoryCard.tsx:98` renders `Badge variant="subtle"` with the same `colorPalette`, and Chakra v3's `subtle` badge recipe writes `color: colorPalette.fg` (the `700` shade) on `colorPalette.subtle` (the `50` shade): `pnpm dev`, `/stories` at 1280, a Guide badge computes to `rgb(9, 135, 160)` on `rgb(237, 253, 253)` and an Inspiration badge to `rgb(85, 60, 154)` on `rgb(250, 245, 255)`. The same card renders on `/`. Item `7d1f5d0a8c9b` records the palette name only.

## Verdict

plan e332105c3b52: the badge writes backgroundColor primary.100 (or purple.100, accentA.100) with no text color, so the text inherits gray.800 again: measured on pnpm dev at 1280, a Guide badge rgb(39, 39, 42) on rgb(252, 231, 243) and an Inspiration badge the same text on rgb(243, 232, 255), the 100 shade and the body color. The literals differ from legacy's rgb(26, 32, 44) on rgb(254, 215, 226), which is the palette's upstream items (72b776cb0d3f, 1f11773f8e2b), not the card's.

## Log

- 2026-09-26: Found at the Parity review of the palette slice c14505b76b6a, twice; pre-existing, not introduced there, on the shared StoryCard, so it shows on / as well. The stories index record ca353de8b645 owns it.

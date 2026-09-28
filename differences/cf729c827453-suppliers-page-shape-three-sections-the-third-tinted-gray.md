---
title: "Suppliers page shape: three Sections, the third tinted gray"
status: fixed
route: /suppliers
axis: visual
kind: added
---
## Legacy

Absent: no legacy `/suppliers`. Decision [[8b5e51fcaf61]] names a map at the top and cards below, nothing else.

## Current

`app/suppliers/page.tsx:56` `Section index={0}` (title, a centered `Container maxW="3xl"` paragraph), `:74-119` `Section index={1}` (the Listings grid, or the empty state), `:121-125` `Section index={2} colorPalette="gray" id="how-to-be-listed"` (a gray band, `audit/suppliers/1280/current.png`). Its text is filed as copy.

## Verdict

plan f1e016a563d6

## Log

- 2026-09-25: Regression (suppliers grilling Q3). Ships as the decision's shape: the title, the map with its Locations list, the cards below. No third section.

- 2026-09-28: Stale after plan `3ba33b316c3c`: the third Section (the gray How to be listed band) is gone, and the interim page holds two Sections, not three, matching the decision's shape more closely (title, cards) with the map still absent. A note for the page and map slices to measure against; not a new difference, and not this slice's to fix.

- 2026-09-28: The map slice [[3b06e662692a]] mounted the map inside the cards' Section (maxW 6xl) as an interim, so at 1280 the map box is 1088 wide at x 96 and at 375 it has the Section's 16px gutters, about 32px above the cards; legacy's 2023 order page (pages/order.tsx at 8311c3fa) drew the map full-bleed, 1280 wide at x 0 and the full width at 375, in a VStack spacing [8, null, 12], 48px at md. The page slice's shape decides the width and the gap; the Parity review of the map slice measured them.

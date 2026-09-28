---
title: "Map tile style: legacy's Mapbox Studio style in grays to an OpenFreeMap style"
status: open
route: /suppliers
axis: visual
kind: changed
---
## Legacy

`../node-modules/apps/gridkit/components/map/map.tsx:85,96` at `fce357d`: `mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}` and `mapStyle="mapbox://styles/villagekit/cleov72ny000c01qu2juxfaq8"`, a Mapbox Studio style of the site's own in grays: light gray land on a darker gray sea and globe, sparse gray labels (`Tasman Sea`, `AUSTRALIA`, `Sydney`, `New Zealand`), the pink dots with a white border over it. Drawn on 2026-09-28 by the 2023 deploy `https://gridkit-landing-8wj2weam2-villagekit.vercel.app/order` at 1280 and 375, whose bundle still carries a working token (decision [[bfa9a416b415]]).

## Current

No map yet: the suppliers record [[872ab70e2ff9]] ports it by its map slice. Decision [[8b5e51fcaf61]] swaps Mapbox for MapLibre GL with OpenFreeMap tiles, no key, and names no style. OpenFreeMap serves `positron` (light grays), `liberty` and `bright` (full color), `fiord` and `dark` (dark) at `https://tiles.openfreemap.org/styles/<name>`; the map slice ships `positron` by default, the closest served style to legacy's grays and not its match (Carto's Positron: paler land, blue-tinted water, its own label set). Filed at the record's split for the operator, on the suppliers verdicts plan, since an agent sanctions nothing ([[2032533fbe92]]); a verdict given before the map slice runs shapes it.

## Verdict

## Log

- 2026-09-28: The map slice [[3b06e662692a]] shipped OpenFreeMap's positron, the default: mapStyle="https://tiles.openfreemap.org/styles/positron" at app/_components/map/Map.tsx, the ReactMapGL element's mapStyle prop. Beside the 2023 deploy at 1280: positron draws pale land with labels in gray and water in a gray-blue, where legacy's Studio style drew white land on a mid gray sea and globe with sparser labels; the pink dots and the white border read the same on both. The item stays open for the verdict; another served style changes that one URL, and a style JSON of the site's own points the same prop at a file under public/.

---
title: Suppliers map absent
status: regression
route: /suppliers
axis: interaction
kind: removed
---
## Legacy

Decision [[8b5e51fcaf61]]: a map at the top of the page with the supplier cards below, MapLibre GL with OpenFreeMap tiles, the globe projection the legacy map used. The legacy reference: `apps/gridkit/components/map/map.tsx:19-108` (`Map`: a `50vh` box, `projection="globe"`, initial view `latitude: -40.6, longitude: 174.7, zoom: 2`, a `NavigationControl` top-left, `flyTo` on select, double-click guarded on markers), `producer-list.tsx:15-81` (a collapsible "Locations" panel top-right, closes on select on mobile), `producer-item.tsx:12-53` (a row per producer, highlighted when selected), `producer-marker.tsx:16-86` (a 4px dot per producer, a popup with the title, the location and "Coming soon..." when selected).

## Current

No map on the page: `app/suppliers/page.tsx` renders the title section, the card grid (`:75-84`) and the "How to be listed" section (`:121-165`); `audit/suppliers/1280/current.png`. No coordinates on the `Supplier` data (`content/suppliers.ts:7-17`), no map dependency in `package.json`.

## Verdict

## Log

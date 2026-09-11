---
title: Map component tree, context, coordinates and map dependency not ported
status: regression
route: /suppliers
axis: code
kind: removed
---
## Legacy

Decision [[8b5e51fcaf61]] names the port: the legacy `apps/gridkit/components/map/{map,producer-list,producer-item,producer-marker}.tsx` renamed to suppliers, `apps/gridkit/context/map.ts` (`export const [MapContextProvider, useMapContext] = constate(useMap)`, `:23`, holding `selectedProducer`), `apps/gridkit/producers.ts:1-6` (`Producer = { id, title, location, latitude, longitude }`), and the dependencies `react-map-gl`, `mapbox-gl`, `constate` (`apps/gridkit/package.json`), MapLibre standing in for Mapbox.

## Current

`app/suppliers/` holds one file, `page.tsx`, with `SupplierCard` inline (`:167-205`); no map, list, item or marker component, no context, no `latitude`/`longitude` on `Supplier` (`content/suppliers.ts:7-17`), and no `maplibre-gl`, `react-map-gl` or `constate` in `package.json`. No `// ported from` citation of `components/map/`. The visitor-facing absence is [[f7ea0bf1394d]].

## Verdict

## Log

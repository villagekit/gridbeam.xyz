---
title: "Suppliers: the operator's verdicts"
status: todo
tags:
  - attended
parent: 337e35d86920
derived_from: 872ab70e2ff9
---
The three calls on `/suppliers` that the suppliers record `872ab70e2ff9` cannot make by rule, each on a surface decision `8b5e51fc` names without settling and the suppliers grilling of 2026-09-25 did not reach, the map not being built then: the third line of legacy's marker popup, `Coming soon...`; the tile style that stands in for legacy's custom Mapbox style, which the decision leaves unnamed; and the look of the `supplier cards below`, which the decision names and does not draw. Decision `40abdb2f222a`: the record's split minted this plan beside it and filed the three items, so that a verdict given before the map slice or the page slice runs shapes it (the map slice, `Suppliers map: legacy's map, producer list, item and marker ported as Map, SupplierList, SupplierItem and SupplierMarker on MapLibre GL with OpenFreeMap tiles, mounted under the title`, and the page slice, `Suppliers page: the decision's shape, the title, the map and the supplier cards below from legacy's producer item with the name as the link out and the system label`, are not ordered after this plan and build their defaults without it); an item a slice's review files later for the operator is added to the list below by the finish, which mints no second plan; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdicts on the three items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or `kipu move <id> regression --from open` and mint a slice for the fix beside the suppliers record (`--parent 337e35d86920`, `derived_from 872ab70e2ff9`, with its `worker` field), unless the slice of the record that builds that surface is still open (the map slice for the first two items, the page slice for the third), in which case the fix is that slice's (its Work says so) and no slice is minted. No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[8c93c791de3f]] (`open`, copy, removed; filed at the split): legacy's popup under a selected marker reads the producer's title, its location and `Coming soon...` (`components/map/producer-marker.tsx:70-82` at `fce357d`; the 2023 deploy `https://gridkit-landing-8wj2weam2-villagekit.vercel.app/order` shows it on a dot's click), the third line the order page's promise that ordering from that producer was to come. The map slice omits it by default: decision `5dfd8249` removes under rule 2 `a legacy line that only makes sense with a store (a shipping promise, a price)`, and under Gridbeam Supply, trading for decades, the line would be false. Rule 2 as the default reads it (`kipu sanction`, the popup the title over the location); the line verbatim under both suppliers as legacy's copy (`regression`, the map slice rendering it where still open, else a slice beside the record); or another third line, which is the operator's to write?
- [[c9336190c7b6]] (`open`, visual, changed; filed at the split): legacy's `mapStyle="mapbox://styles/villagekit/cleov72ny000c01qu2juxfaq8"` (`map.tsx:96`), a Mapbox Studio style of the site's own in grays, light gray land on a darker gray sea and globe with sparse gray labels, drawn today by the 2023 deploy at the URL above. The decision names OpenFreeMap and no style. OpenFreeMap serves `positron` (light grays, Carto's Positron: paler land, blue-tinted water, its own labels), `liberty` and `bright` (full color), `fiord` and `dark` (dark) at `https://tiles.openfreemap.org/styles/<name>`; the map slice ships `positron` by default. Positron (`kipu sanction`, rule 5); another served style (`kipu sanction` naming it, the map slice writing it where still open, else a slice beside the record); or a style JSON of the site's own under `public/`, tuned to legacy's grays over OpenFreeMap's tiles (`regression`, a slice beside the record, `worker fable`)?
- [[db86cf2ecdda]] (`open`, visual, added; filed at the split): the decision says `supplier cards below` the map and nothing of their look, and the verdict on [[c9d48318bd4b]] names what a card carries (the name as the link out, the location, a `Metric` or `Imperial` label) and not its box. The first port drew a white box with a radius and a shadow, two to a row from `md`, the name an h3 (`app/suppliers/page.tsx:68,161-194`); the nearest legacy shape is the map panel's row, `components/map/producer-item.tsx:28-52` at `fce357d`, a padded row with the title over the location, no box and no heading element, the rows stacked (`producer-list.tsx:74-78`). The page slice builds legacy's row by default, stacked at the 2023 order page's text-block width, `container.md`, the outline then the h1 and the map's `Locations` heading. Legacy's row (`kipu sanction`, rule 5); the boxed card kept as the first port drew it, with or without its h3 (`regression`, the page slice building it where still open, else a slice beside the record); or another treatment, which is the operator's to name?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with the map slice's Work covering its fix or a slice minted for it; `kipu list --collection difference --filter route=/suppliers --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log

- 2026-09-28: From the finish of the suppliers record 872ab70e2ff9: both slices that build the surfaces above are done (the map slice 3b06e662692a for the popup and the tile style, the page slice f1e016a563d6 for the rows), so a regression verdict on any item now mints a slice beside the record (--parent 337e35d86920, derived_from 872ab70e2ff9), never the slice's Work. No slice's review filed a further item for the operator, so the list above stands. The third question has two more calls the page slice made and wrote on db86cf2ecdda's note of 2026-09-28, not in the body above: the row's hover, cursor and click from producer-item.tsx:31-35 are not carried (the map panel's fly-to affordance, the link carrying it here), and the rows are left-aligned inside the centered 768px box as the map panel aligned them where the order page's text blocks were centered; the verdict on db86cf2ecdda can settle both with the box.

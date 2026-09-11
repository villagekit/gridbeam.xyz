---
title: "Search debounce: 1000 ms lodash debounce to 250 ms setTimeout"
status: regression
route: /designs
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/context/catalogue.ts:138-144` `debounce((value) => setQuery({ search: value }), 1000, { leading: false })` from `lodash-es`.

## Current

`app/_components/catalogue/Catalogue.tsx:40,102-124` `SEARCH_DEBOUNCE_MS = 250` with a `useRef` timer and `setTimeout`/`clearTimeout`.

## Verdict

## Log

- 2026-09-12: Visible effect (probe, plan cf52c388): typing `table` at 60 ms per key leaves the current field at `tble` and the URL at `?q=tble`, because the shorter timer fires mid-word and the `useEffect(() => setSearch(urlSearch))` resync (present on both sides: legacy `context/catalogue.ts:105-107`) overwrites the later keys; at 1000 ms the same probe on the legacy site keeps `table`.

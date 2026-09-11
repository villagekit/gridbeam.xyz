---
title: Suppliers map
status: accepted
date: 2026-09-11
---
## Context

The Suppliers page replaces the legacy store. The operator wants a map of suppliers on it, as the 2023 `/order` page had a map of producers (see the legacy ground truth decision). The legacy map used Mapbox GL with an API key.

## Decision

The Suppliers page gets a map at the top with the supplier cards below, each supplier carrying coordinates. The map is MapLibre GL with OpenFreeMap tiles: no API key, open data, the same globe projection the legacy map used. The component structure is ported from the legacy `components/map/` (map, producer list, producer item, producer marker), renamed to suppliers. No region filter until the supplier count needs one.

## Consequences

This is an addition with no legacy route to diff against; its ledger entries are additions sanctioned under rule 5 by this decision. Mapbox's license and key requirement are the reason for the swap, not convenience.

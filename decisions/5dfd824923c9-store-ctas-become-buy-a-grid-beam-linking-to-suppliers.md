---
title: Store CTAs become Buy a Grid Beam, linking to Suppliers
status: accepted
date: 2026-09-25
---
## Context

The legacy site's "Buy a Grid Kit" buttons led to the store (`/store/starter_kit`). Rule 2 of [[2032533fbe92]] removes the store and names the Suppliers page as its replacement, but the first pass at the port replaced the buttons with new copy ("Browse designs"). The home-route grilling (`e2805adefd47`, Q2) settled how a store CTA is carried: change as little as makes sense.

## Decision

A legacy "Buy a Grid Kit" call to action ships as "Buy a Grid Beam" and links to `/suppliers`. Same place, same size, same variant as legacy. The same pattern applies to any other legacy store link whose wording still reads sensibly with the noun swapped; a legacy line that only makes sense with a store (a shipping promise, a price) is removed under rule 2.

## Consequences

A store CTA judged on any route cites this decision. The header CTA "Find a supplier" settled in the shell round ([[ac6579ec16d2]] and its neighbours) is unaffected: it had no legacy counterpart to carry.

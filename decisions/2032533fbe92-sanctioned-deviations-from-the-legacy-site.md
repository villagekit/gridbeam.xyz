---
title: Sanctioned deviations from the legacy site
status: accepted
date: 2026-09-11
---
## Context

A port that changes nothing is impossible: the brand changed, the store closed, the dependencies moved. The ledger needs a closed list of reasons a difference is acceptable, so that every other difference is a regression by default and a wrong sanction can be found by the rule it cites.

## Decision

A difference is sanctioned when one of these rules covers it, and the verdict names the rule:

1. **rebrand**: gridkit.nz to gridbeam.xyz; "Grid Kit" to "grid beam" in body copy; the "Grid Beam" wordmark in Title Case; the legacy cube glyph carried forward; Village Kit as the maker.
2. **no e-commerce**: the store, cart, checkout, order-complete and Stripe surfaces, the return policy, the producers map as an order page, the database and the ts-rest API are gone. The store is replaced by the Suppliers page.
3. **no startup plumbing**: Sentry, Matomo, cookie consent and the cookie policy are gone.
4. **upgrade**: a change the dependency migration forces (Next 15 app router, React 19, Chakra v3, `motion`), and only the change it forces.
5. **operator**: an improvement the operator approved, recorded as a decision or as the verdict of the difference itself. The editorial locks of May 2026 and every copy verdict from a grilling fall here.

A difference no rule covers is a regression, or `open` until the operator judges it when it is copy or an addition.

## Consequences

The Parity reviewer checks each sanction against its rule. Rule 4 is the one most easily stretched: "the new way is easier to write" is not an upgrade-forced change.

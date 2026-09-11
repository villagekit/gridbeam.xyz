---
title: "Cutting plan 60gu branch removed: Requires Nx 60gu beams not provided by any of our kits for sale, and the apology"
status: sanctioned
route: /designs/bed-frame
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:223-242` `Requires {N}x 60gu (<Link href="/stories/whats-a-grid-unit">grid unit</Link>) beams, which are not provided by any of our <Link href="/store/starter_kit">kits for sale</Link>.` and `We apologize for the inconvenience. Please <Link href="/contact">contact us</Link> for any help, or to be notified when these parts become available.` (rendered on this route: `Requires 9x 60gu (grid unit) beams, which are not provided by any of our kits for sale.`).

## Current

`app/_components/design/DesignCuttingPlan.tsx:70-119` no such branch.

## Verdict

rule: no e-commerce (the kits-for-sale paragraph and its apology)

## Log

- 2026-09-12: Template. The `grid unit` story link goes with it; the operator may want it back in the replacement copy.

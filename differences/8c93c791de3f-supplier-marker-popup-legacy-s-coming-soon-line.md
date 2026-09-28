---
title: "Supplier marker popup: legacy's Coming soon... line"
status: open
route: /suppliers
axis: copy
kind: removed
---
## Legacy

`../node-modules/apps/gridkit/components/map/producer-marker.tsx:70-82` at `fce357d`: the popup a selected marker opens has a `primary.400` header holding the producer's title and a white body holding `<Text fontSize="sm" variant="secondary">{location}</Text>` and then `<Text fontSize="sm" variant="tertiary">Coming soon...</Text>`. Drawn today by the 2023 deploy `https://gridkit-landing-8wj2weam2-villagekit.vercel.app/order` when a dot is clicked (decision [[bfa9a416b415]], the prior art for the suppliers map).

## Current

No map yet: the suppliers record [[872ab70e2ff9]] ports it by its map slice. That slice omits the third line by default: decision [[5dfd824923c9]] removes under rule 2 `a legacy line that only makes sense with a store (a shipping promise, a price)`, and this one promised that ordering from the producer was to come; under Gridbeam Supply, trading for decades, it would also be false. Filed at the record's split for the operator, on the suppliers verdicts plan, since an agent sanctions nothing ([[2032533fbe92]], [[ca677697d703]]); a verdict given before the map slice runs shapes it.

## Verdict

## Log

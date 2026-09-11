---
title: Offering badge labels
status: open
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:39-46` `offeringLabels`: `beams` "Beams", `panels` "Panels", `fasteners` "Fasteners", `kits` "Kits", `custom` "Custom", `design-build` "Design + build"; each rendered as a `Badge colorPalette="accentA"` per supplier offering (`:186-190`). "Panels", "Custom" and "Design + build" are unused by the two suppliers in `content/suppliers.ts` today.

## Verdict

## Log

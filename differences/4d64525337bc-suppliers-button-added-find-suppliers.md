---
title: "Suppliers button added: Find suppliers"
status: regression
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

The legacy page ends after the `CatalogueItem` (`apps/gridkit/pages/designs/[id].tsx:92-121`); no link follows the tabs.

## Current

`app/designs/[id]/page.tsx:64-66` `Find suppliers`, linking to `/suppliers`.

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-25: Regression (design page grilling T4). The suppliers section is removed; the page ends after the tabs as legacy. Template.

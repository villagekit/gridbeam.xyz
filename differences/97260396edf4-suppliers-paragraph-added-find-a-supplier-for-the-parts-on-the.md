---
title: "Suppliers paragraph added: Find a supplier for the parts on the suppliers page."
status: regression
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

No section follows the tabs: the legacy page ends after the `CatalogueItem` (`apps/gridkit/pages/designs/[id].tsx:92-121`).

## Current

`app/designs/[id]/page.tsx:63` `Find a supplier for the parts on the suppliers page.`

## Verdict

## Log

- 2026-09-12: Template. The section itself is a visual item.

- 2026-09-25: Regression (design page grilling T4). The suppliers section is removed; the page ends after the tabs as legacy. Template.

---
title: "Description: inside the Overview tab to under the heading on every tab"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:116,128-138` `<Overview description>` renders `<Text>{description}</Text>` as the first paragraph of the Overview panel (`audit/designs__bed-frame/dom/legacy.aria.yaml`: `tabpanel "Overview"` > the description).

## Current

`app/_components/design/DesignViewer.tsx:57-58,90-97` and `app/_components/catalogue/CatalogueItem.tsx:78-82` the description sits under the heading outside the tabs; the Overview panel starts at `Product care` (`current.aria.yaml`).

## Verdict

## Log

- 2026-09-12: Template. The text is identical on both sides.

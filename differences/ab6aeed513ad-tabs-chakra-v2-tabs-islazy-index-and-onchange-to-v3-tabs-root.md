---
title: "Tabs: Chakra v2 Tabs isLazy, index and onChange to v3 Tabs.Root lazyMount, value and onValueChange"
status: sanctioned
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:1-13,135-158` `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel`.

## Current

`app/_components/catalogue/CatalogueItem.tsx:135-156` `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`.

## Verdict

rule: upgrade (Chakra v3 ships Tabs as compound components)

## Log

- 2026-09-12: Template. The indicator and label styling is a visual item.

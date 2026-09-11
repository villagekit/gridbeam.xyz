---
title: "Tabs: dashed pink active indicator and uniform bold labels to a solid dark indicator with dimmed inactive labels"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:135-147` Chakra v2 `<Tabs size="lg">` with the ui 0.9.0 Tabs theme: a dashed pink underline under the active tab over a lighter dashed rule, all labels the same bold black (`audit/designs__bed-frame/1280/legacy.png`).

## Current

`app/_components/catalogue/CatalogueItem.tsx:135-147` Chakra v3 `<Tabs.Root size="lg">` with a solid dark underline and gray inactive labels (`audit/designs__bed-frame/1280/current.png`).

## Verdict

## Log

- 2026-09-12: Template. The Tabs recipe lives in `@villagekit/ui`; this route is its only consumer.

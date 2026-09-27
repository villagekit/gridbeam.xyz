---
title: "Tabs: dashed pink active indicator and uniform bold labels to a solid dark indicator with dimmed inactive labels"
status: upstream
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

- 2026-09-27: Fixed in ../ui 986ae02 (plan eba62a497d77): tabsRecipe gains an empty unstyled variant as its default, the 0.9.0 wrapper's variant, so Chakra v3's line variant no longer writes the solid rule, fg.muted labels and dark indicator; the list is display flex (v2's TabList), the trigger weighs normal (v2 wrote none) and the focus color sits on :focus alone (zag marks the selected trigger data-focus at rest). Under the override every trigger reads rgb(26, 32, 44) at 400 with the dashed rule and the dashed primary.300 border under the selected one, legacy's readings. The lg size stays v3's, 574e14ae3f81. Waits on the publish; the bump plan 99f2fe62c62f moves it to fixed.

---
title: "CatalogueItem props: buttonComponent, buttonProps and a tabs record with capitalize to a typed action and a tabs array with labels"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:33-36,128,144-157` `buttonComponent?: React.FC`, `buttonProps: any`, `tabs: Record<string, ReactNode> & { overview }` labelled by lodash `capitalize(key)`; `item: { id, name, description }` with `textTransform: capitalize` on the heading.

## Current

`app/_components/catalogue/CatalogueItem.tsx:14-43,118-130,141-155` `CatalogueItemAction { label, navigateToTab, variant?, icon? }`, `tabs: ReadonlyArray<{ key, label, content }>`, `title` and `description` props, no `capitalize`.

## Verdict

## Log

- 2026-09-12: Template.

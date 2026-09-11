---
title: Complementary landmark added around the categories only
status: open
route: /designs
axis: accessibility
kind: added
---
## Legacy

No landmark wraps the categories; they are a child of the virtual menubar (`apps/gridkit/components/catalogue/catalogue.tsx:55-60`).

## Current

`app/_components/catalogue/Catalogue.tsx:177-179` `<VStack as="aside">` around the categories `OptionGroup` (`audit/designs/dom/current.aria.yaml`: `complementary` > `heading "Categories"`); at `xl` and above the sort `OptionGroup` at `Catalogue.tsx:276-283` is a plain `Box` outside it, so the two groups are asymmetric; at `lg` the aside holds the sort group too (`Catalogue.tsx:196-204`).

## Verdict

## Log

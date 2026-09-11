---
title: "Filter options: a static 14-entry table on the page to buildDesignFilterOptions from the tags with furniture excluded"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:10-43` `FilterOptionType` union and `filterOptions` literal, passed with `defaultFilterOption="all"` (`:71-74`).

## Current

`app/_components/design/designs-to-catalogue.ts:5,10-25,42-70` `TAG_LABELS` order, unknown tags appended alphabetically with `capitalize`, `EXCLUDED_TAGS = ['furniture']`; tested at `designs-to-catalogue.test.ts:31-64`.

## Verdict

## Log

- 2026-09-12: The five labels this adds are the copy item on this route.

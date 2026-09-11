---
title: "Mobile selects: role menuitem override dropped"
status: regression
route: /designs
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue/selector.tsx:42` `<Select role="menuitem" aria-labelledby={`${id}-label`} ...>` below `md`, a menuitem role on a native select (not in the 1280 capture; read from source).

## Current

`app/_components/catalogue/Catalogue.tsx:440-500` `CategorySelect` and `SortSelect` set no `role`; the native select keeps its combobox semantics (read from source; hidden at 1280).

## Verdict

## Log

- 2026-09-12: The legacy role is invalid on a native select; a regression by the rule's absence, the operator may sanction under rule 5.

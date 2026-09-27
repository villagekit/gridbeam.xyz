---
title: "Mobile selects: role menuitem override dropped"
status: fixed
route: /designs
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue/selector.tsx:42` `<Select role="menuitem" aria-labelledby={`${id}-label`} ...>` below `md`, a menuitem role on a native select (not in the 1280 capture; read from source).

## Current

`app/_components/catalogue/Catalogue.tsx:440-500` `CategorySelect` and `SortSelect` set no `role`; the native select keeps its combobox semantics (read from source; hidden at 1280).

## Verdict

plan 8417428fd88a

## Log

- 2026-09-12: The legacy role is invalid on a native select; a regression by the rule's absence, the operator may sanction under rule 5.

- 2026-09-27: At the designs index record's split (plan f901cf9f724d): no verdict having landed, the catalog re-port [[8417428fd88a]] ships legacy's role on the mobile selects and closes this item by default with a note; the operator may overturn it by a note and a new state (the stories index split's call 4). Not on the verdicts plan.

- 2026-09-27: Fixed by default by the catalog re-port (plan 8417428fd88a): app/_components/catalogue/Selector.tsx:49-51 puts legacy's role=menuitem and aria-labelledby on the ui Select's Field, the native select Chakra v3's NativeSelect renders (the probe at 375: both selects carry role menuitem and the label id). No verdict had landed; the operator may overturn this by a note and a new state.

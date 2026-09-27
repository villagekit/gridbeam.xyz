---
title: "Filter and sort options: role option in a group to role radio in a radiogroup with aria-checked"
status: regression
route: /designs
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/selector.tsx:32` `<Box role="group" id={id}>` wrapping `apps/gridkit/components/option.tsx:32-35` `<Badge role="option" tabIndex={0} ...>` with no `aria-selected`; the selected option is shown by colour only (`audit/designs/dom/legacy.aria.yaml`: `group` > `heading "Categories"` > `option "All designs"`, no state).

## Current

`app/_components/catalogue/Catalogue.tsx:307` `<VStack role="radiogroup" aria-labelledby={titleId}>` wrapping `Catalogue.tsx:343-344` `<Badge role="radio" aria-checked={selected} tabIndex={0} ...>` (`audit/designs/dom/current.aria.yaml`: `radiogroup "Categories"` > `radio "All designs" [checked]`).

## Verdict

## Log

- 2026-09-12: An `option` with no listbox ancestor is invalid ARIA and the legacy exposes no selected state; the current pairing is valid. No rule covers the change, so it is a regression by the rule's absence; the operator may sanction it under rule 5.

- 2026-09-27: At the designs index record's split (plan f901cf9f724d): no verdict having landed, the catalog re-port [[8417428fd88a]] ships legacy's markup and closes this item by default with a note; the operator may overturn it by a note and a new state (the stories index split's call 4). Not on the verdicts plan.

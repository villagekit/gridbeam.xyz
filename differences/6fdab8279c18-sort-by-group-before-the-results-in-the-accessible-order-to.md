---
title: "Sort by group: before the results in the accessible order to after every card at xl"
status: regression
route: /designs
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/catalogue.tsx:47-52,73` the `aria-owns` order puts `Sort by` right after `Categories` and before the count and the cards (`audit/designs/dom/legacy.aria.yaml`).

## Current

`app/_components/catalogue/Catalogue.tsx:276-283` the `Sort by` heading and radiogroup are the last children of `main`, after all 37 card regions (`audit/designs/dom/current.aria.yaml`).

## Verdict

## Log

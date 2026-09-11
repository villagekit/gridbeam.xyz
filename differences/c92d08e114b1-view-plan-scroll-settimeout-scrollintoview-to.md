---
title: "View plan scroll: setTimeout scrollIntoView to requestAnimationFrame smooth scroll"
status: regression
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:64-79` `setTimeout(() => tabsEl.scrollIntoView())`, an instant jump.

## Current

`app/_components/catalogue/CatalogueItem.tsx:55-67` `requestAnimationFrame(() => tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))`.

## Verdict

## Log

- 2026-09-12: Template. Focus stays on the button on both sides.

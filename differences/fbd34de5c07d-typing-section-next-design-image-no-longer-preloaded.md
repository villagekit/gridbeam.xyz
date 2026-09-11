---
title: "Typing section: next design image no longer preloaded"
status: regression
route: /
axis: interaction
kind: removed
---
## Legacy

`apps/gridkit/pages/index.tsx:449-457` `<Image priority {...nextDesign.image} sx={{ display: 'none' }} />` loads the upcoming design before the swap.

## Current

`app/_components/landing/TypingDesignSection.tsx:30` destructures `[currentDesign, typedLabel]` only; no preload element. From code.

## Verdict

## Log

- 2026-09-12: Note `526d5330`: checked and holds.

---
title: Inter-section spacing wrapper removed
status: regression
route: /
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/pages/index.tsx:76` `<VStack spacing={isMobile ? 8 : 12}>` around every `LandingSection`, on top of each section's own `Container` padding.

## Current

`app/page.tsx:100` `<Main>` holds the sections directly; only the `Section`'s `Container py` separates them (`node_modules/@villagekit/ui/src/components/layouts/Section.tsx`).

## Verdict

## Log

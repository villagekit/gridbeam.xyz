---
title: "CatalogueLayout removed: MainLayout with responsive margins to Main, SkipNavContent and Section"
status: regression
route: /designs
axis: code
kind: removed
---
## Legacy

`apps/gridkit/components/layouts/catalogue.tsx:1-19` `CatalogueLayout` (`MainLayout` + `Box` with `useBreakpointValue` margins), attached by `pages/designs/index.tsx:90-92` and `pages/designs/[id].tsx:297-299`.

## Current

`app/designs/page.tsx:30-38` and `app/designs/[id]/page.tsx:54-69` compose `<Main><SkipNavContent /><Section ...>` directly.

## Verdict

## Log

- 2026-09-12: Applies to `/designs/bed-frame` and every design page too; filed once here. The `Main`/`SkipNavContent` wrapping is the shell item [[a73e9678cd57]].

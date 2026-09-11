---
title: "Page spacing: CatalogueLayout marginTop 8/16 and marginX 0/8 to Section padding 8/12 top and bottom"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/catalogue.tsx:11-16` `<Box sx={{ marginTop: {base: 8, md: 16}, marginX: {base: 0, md: 8} }}>` around `Container maxW="8xl"` (`catalogue.tsx:41`); no bottom margin (`audit/designs/1280/legacy.png`).

## Current

`app/designs/page.tsx:33` `<Section index={0} maxW="8xl">`, whose `Container` at `node_modules/@villagekit/ui/src/components/layouts/Section.tsx:99` has `py={[8, null, 12]}` and no extra horizontal margin (`audit/designs/1280/current.png`).

## Verdict

## Log

- 2026-09-12: Cause: the `CatalogueLayout` removal, its own code item on this route.

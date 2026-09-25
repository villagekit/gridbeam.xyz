---
title: "LandingRow: useSectionIndex to an explicit sectionIndex prop"
status: fixed
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:481-513` `const sectionIndex = useSectionIndex()` from `packages/ui-page/src/components/Section.tsx:20`.

## Current

`app/_components/landing/LandingSection.tsx:28-51` `sectionIndex: number` passed by the caller (`app/page.tsx:182`); `useSectionIndex` is still exported by `node_modules/@villagekit/ui/src/components/layouts/Section.tsx:19`.

## Verdict

plan 159c621d8a1a

## Log

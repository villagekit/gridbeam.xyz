---
title: Landing helpers moved from the page to an app/_components/landing module
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:464-551` `LandingSection`, `LandingRow`, `LandingColumn`, `LandingImage`, `LandingVideo`, `landingMediaSx` and `TypingDesignSection` are private functions at the bottom of the page.

## Current

`app/_components/landing/index.ts:1-6` re-exports eight components from eight files; `app/page.tsx` is their only importer.

## Verdict

## Log

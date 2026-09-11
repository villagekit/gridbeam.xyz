---
title: "Part registration: side-effect imports at the page top to registerParts.ts in the client-only chunk"
status: sanctioned
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:1-8` seven side-effect imports (`@villagekit/part-gridbeam`, `/creator`, `part-gridpanel`, `/creator`, `part-fastener`, `/creator`, `plugin-smart-fasteners`) at module scope.

## Current

`app/_components/design/registerParts.ts:1-8` the same seven, imported by `DesignViewer.tsx:3`, which loads only through `DesignViewerDynamic.tsx:14-19` (`ssr: false`).

## Verdict

rule: upgrade (the page is a server component; the registry must load in the client tree with the provider)

## Log

- 2026-09-12: Template.

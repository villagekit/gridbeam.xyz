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

- 2026-09-28: From the page re-port (plan 3c448a379ad7): the seven side-effect imports are now the top of the client page file, app/designs/[id]/DesignPage.tsx:4-11, legacy's lines, and registerParts.ts is deleted. The sanction stands: page.tsx is a server component, and the registry loads in the client tree with the provider.

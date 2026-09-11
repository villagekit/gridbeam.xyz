---
title: "Back and forward: Router.beforePopState with useReloadQueryParams to nothing"
status: regression
route: /designs/bed-frame
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:74-88` `useReloadQueryParams()` re-synced the parameter machine on `Router.beforePopState`.

## Current

`app/_components/design/DesignViewer.tsx:27-28` only `replaceUrl` on `onLocationUpdate`; no `popstate` listener anywhere in `app/`; `useReloadQueryParams` is still exported by `@villagekit/parameters@0.10.0 src/context.tsx:83-86`.

## Verdict

## Log

- 2026-09-12: Template. Back/forward was probed on both sides and restores the preset and the select the same way (the viewer remounts and reads the URL), so this is a code difference with no interaction difference found.

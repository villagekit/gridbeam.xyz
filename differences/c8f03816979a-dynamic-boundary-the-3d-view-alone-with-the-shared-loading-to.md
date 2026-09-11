---
title: "Dynamic boundary: the 3D view alone with the shared Loading to the whole DesignViewer with an inline spinner"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/design/view-dynamic.tsx:6-9` `dynamic(() => import('./view'), { loading: () => <Loading />, ssr: false })` around `view.tsx:4-7` (`DesignView`, `ProductView showParamControls`); the provider, controls and tabs render on the server.

## Current

`app/_components/design/DesignViewerDynamic.tsx:8-19` `dynamic(() => import('./DesignViewer'), { ssr: false, loading })` around the provider, `CatalogueItem`, the tabs and their content, with a local `DesignViewerLoading`; the `DesignView` wrapper is inlined at `DesignViewer.tsx:48-59`.

## Verdict

## Log

- 2026-09-12: Template.

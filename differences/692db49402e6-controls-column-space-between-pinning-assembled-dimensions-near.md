---
title: "Controls column: space-between pinning Assembled Dimensions near the button to stacked under the preset row"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:97-106` `<VStack spacing="8" justifyContent={hasParams ? 'space-between' : 'center'} sx={{ height: '100%', width: '100%' }}>` around `ParamControls` and `ProductInfo` (`audit/designs__bed-frame/1280/legacy.png`: the dimensions sit above the button).

## Current

`app/_components/design/DesignViewer.tsx:60-65` a fragment inside `CatalogueItem.tsx:113-116` `VStack alignItems="stretch" gap="6"`; the dimensions follow the preset row and the gap moves below them (`audit/designs__bed-frame/1280/current.png`).

## Verdict

## Log

- 2026-09-12: Template.

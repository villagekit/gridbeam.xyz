---
title: "Design viewer wrapped in Section index 0: legacy's bare CatalogueItem under the layout margins to a Section whose padding stacks on them"
status: fixed
route: /designs/bed-frame
axis: visual
kind: added
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:92-121,297-299` at `fce357d` renders the `CatalogueItem` bare inside `CatalogueLayout`'s margin box (`components/layouts/catalogue.tsx:16`): the box is `main`'s first child at `margin-top` 64px and `margin-left` 32px at 1280 and 32px and 0 at 375, and the viewer's heading sits at 127px from the top at 1280 and 95px at 375 (`audit/designs__bed-frame/1280/legacy.png`, the probe of plan 8417428fd88a, `audit/designs/probe2.txt`).

## Current

`app/designs/[id]/page.tsx:49-51` wraps the viewer in `<Section index={0} maxW="6xl">`, and `:53` the suppliers band in a second `Section`, both under the same margin box now that `app/designs/layout.tsx` mounts the ported `CatalogueLayout`: the box reads legacy's margins (64px and 32px at 1280, 32px and 0 at 375), and the `Section`'s own padding stacks on them, the heading at 175px at 1280 (48px below legacy's) and 127px at 375 (32px below); from `md` the gray band (`7e28a0685fba`) is inset 32px each side, at `left` 32px and `width` 1216px at 1280 (`audit/designs__bed-frame/1280/current.png`).

## Verdict

plan 3c448a379ad7

## Log

- 2026-09-27: Filed by the catalog re-port (plan 8417428fd88a) from its pairs and probe of /designs/bed-frame at three widths, for the design pages record 0bc88eaf5493 to close with its re-port of the page; 7e28a0685fba keeps the band itself.

---
title: "Design page at 375: fits the viewport to 417px wide, scrolling sideways"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx` at `fce357d` fits the viewport at 375: `document.documentElement.scrollWidth` reads 375 on the live site and no element's box crosses the right edge (`audit/designs__bed-frame/375/legacy.png`; the probe of plan 8417428fd88a, `audit/designs/probe3.txt`).

## Current

`/designs/bed-frame` at 375 scrolls sideways: `scrollWidth` reads 417, and `main.vk-main`, the layout box, the first `Section`, its container and the viewer's stack all sit at `left` -42px and `right` 417px, the page's content (the preview, the preset stack and the tabs, `app/designs/[id]/page.tsx:49-60` and `app/_components/catalogue/CatalogueItem.tsx`) wider than the viewport and the shell's `main` growing to its min-content width (`audit/designs__bed-frame/375/current.png`). `/designs` itself reads 375 on both sides, and the Parity review of plan 8417428fd88a read 417 with the `CatalogueLayout` box removed in the browser, so the segment layout does not cause it.

## Verdict

## Log

- 2026-09-27: Filed from the Parity review of the catalog re-port (plan 8417428fd88a), which found it on the pairs at 375 and read it with the layout box removed; for the design pages record 0bc88eaf5493 to close with its re-port of the page.

---
title: "Featured stories: two fixed cards to the three latest guides"
status: open
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:48-49,302-303`: "What's a Grid Unit" (`/stories/whats-a-grid-unit`, "Unlock the power of modular units with our 40mm Grid Unit (GU)", badge Guide) and "Building with Grid Kit" (`/stories/building-with-grid-kit`, "A handy guide to get started building with Grid Kit", badge Guide), no dates.

## Current

`app/page.tsx:95-97` the three newest `guide` stories: "How to Mark and Cut Grid Beams" (29 Nov 2024), "How to Install Furniture Bolts (Joint Connector Bolts)" (30 Oct 2024), "What's a Grid Unit" (10 Oct 2024); "Building with Grid Kit" is not shown. `audit/_root/1280/current.png`. Both added stories exist in the legacy corpus (`apps/gridkit/pages/stories/how-to-cut-grid-beams.mdx`, `how-to-furniture-bolts.mdx`) with the same title and description.

## Verdict

## Log

- 2026-09-12: The selection mechanism is a code item; the card component's own differences are filed on this route and the stories ledger cites them.

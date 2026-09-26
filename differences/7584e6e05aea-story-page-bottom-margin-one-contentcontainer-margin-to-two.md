---
title: "Story page bottom margin: one ContentContainer margin to two stacked"
status: fixed
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:22` one `ContentMainLayout` around the story, so one `ContentContainer` bottom margin (`packages/ui-page/src/components/layouts/ContentLayout.tsx:60-76`, `marginBottom` 8 at base, 16 from md) sits between the article and the footer.

## Current

`app/layout.tsx` renders `ContentMainLayout` around every route (plan [[a7bf623f885c]]), and `app/stories/[slug]/page.tsx:61` still wraps the story in `ContentMainTocLayout`, whose `ContentContainer` (`node_modules/@villagekit/ui/src/components/layouts/ContentLayout.tsx:60-76`) adds a second `mb` 8/16 inside the first, so twice the margin sits between the article and the footer. Filed on the template route; the same on the six story routes. The nesting itself is [[756288b40fd0]]; both close when the story pages record drops `ContentMainTocLayout`.

## Verdict

plan 4331147cc118

## Log

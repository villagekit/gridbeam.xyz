---
title: "Story page: an On this page table of contents added"
status: open
route: /stories/whats-a-grid-unit
axis: visual
kind: added
---
## Legacy

`apps/gridkit/components/layouts/stories.tsx:34` `<MainLayout>` (`apps/gridkit/components/layouts/main.tsx:22` `ContentMainLayout`), no table of contents; `audit/stories__whats-a-grid-unit/1280/legacy.png`.

## Current

`app/stories/[slug]/page.tsx:78` `<ContentMainTocLayout>`; `node_modules/@villagekit/ui/src/components/layouts/TableOfContents.tsx:39-57` a nav headed "On this page" listing every h2-h6, with a scroll-spy that bolds and colours the active heading (`:36,48-54`); on the right at 1280 in `audit/stories__whats-a-grid-unit/1280/current.png`, collapsed at 375 and 768.

## Verdict

## Log

- 2026-09-12: Story page template: shared by the six story routes; filed on /stories/whats-a-grid-unit where first met. The legacy ui-page package shipped a TableOfContents too (packages/ui-page/src/components/TableOfContents.tsx) but the story pages did not use it. On /stories/2021-winter-newsletter the list is empty; see that route.

---
title: "Story page: one main landmark to two nested"
status: regression
route: /stories/whats-a-grid-unit
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:17-25` one `ContentMainLayout` main; `audit/stories__whats-a-grid-unit/dom/legacy.aria.yaml:21` a single `main`.

## Current

`app/stories/[slug]/page.tsx:78-79` `<Main>` rendered inside `ContentMainTocLayout`, whose `ContentMain` already renders `Main` (`node_modules/@villagekit/ui/src/components/layouts/ContentLayout.tsx:49-58,114-119`; `Main.tsx:16` `as="main"`); `audit/stories__whats-a-grid-unit/dom/current.aria.yaml:63-64` `main > main`.

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met.

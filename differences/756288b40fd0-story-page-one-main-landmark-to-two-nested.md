---
title: "Story page: one main landmark to two nested"
status: fixed
route: /stories/whats-a-grid-unit
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:17-25` one `ContentMainLayout` main; `audit/stories__whats-a-grid-unit/dom/legacy.aria.yaml:21` a single `main`.

## Current

`app/stories/[slug]/page.tsx:78-79` `<Main>` rendered inside `ContentMainTocLayout`, whose `ContentMain` already renders `Main` (`node_modules/@villagekit/ui/src/components/layouts/ContentLayout.tsx:49-58,114-119`; `Main.tsx:16` `as="main"`); `audit/stories__whats-a-grid-unit/dom/current.aria.yaml:63-64` `main > main`.

## Verdict

plan 4331147cc118

## Log

- 2026-09-12: Story page template, six routes; filed where first met.

- 2026-09-26: Cause moved by plan [[a7bf623f885c]]: the route no longer renders its own Main; the outer main is now the root layout ContentMainLayout (app/layout.tsx), and the inner one is still ContentMainTocLayout ContentMain (app/stories/[slug]/page.tsx:61), so the nesting is main (layout) > main (route). The fix stays with the story pages record: drop ContentMainTocLayout from the route, as legacy had no TOC layout. The same nesting now stacks two ContentContainer bottom margins, filed as its own visual item.

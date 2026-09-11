---
title: ContentMainLayout no longer wraps every route
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:22`: `MainLayout` wraps `children` in `<ContentMainLayout>` (`packages/ui-page/src/components/layouts/ContentLayout.tsx:14-22`, the `ContentContainer` and `ContentMain` centering and bottom margin) for every route that uses it.

## Current

`app/layout.tsx:73-80` renders `MainLayout` without a content layout; `@villagekit/ui@1.2.0 src/components/layouts/ContentLayout.tsx:16-56` still exports `ContentMainLayout` and its siblings but nothing in `app/` imports them (`grep -rl ContentMainLayout app`); routes compose `Main` and `Section` themselves (e.g. `app/about/page.tsx:8-9,37-38`).

## Verdict

## Log

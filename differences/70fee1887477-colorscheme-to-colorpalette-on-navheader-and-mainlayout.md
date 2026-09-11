---
title: colorScheme to colorPalette on NavHeader and MainLayout
status: sanctioned
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavHeader.tsx:18,22`: `colorScheme?: 'primary' | 'accentB'` defaulting to `accentB`; `packages/ui-page/src/components/layouts/MainLayout.tsx:17`: `headerColorScheme`.

## Current

`@villagekit/ui@1.2.0 src/components/nav/NavHeader.tsx:18,22`: `colorPalette?: 'primary' | 'accentA' | 'accentB'`; `src/components/layouts/MainLayout.tsx:14`: `headerColorPalette`; `app/layout.tsx:77` passes `headerColorPalette="accentB"`.

## Verdict

rule: upgrade (Chakra v3 renamed colorScheme to colorPalette)

## Log

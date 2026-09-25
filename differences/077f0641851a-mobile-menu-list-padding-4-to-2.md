---
title: Mobile menu list padding 4 to 2
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavMobileMenu.tsx:51-56`: `containerProps={{ alignItems: 'flex-start', sx: { paddingY: 4 } }}` on the list.

## Current

`@villagekit/ui@1.2.0 src/components/nav/NavMobileMenu.tsx:66`: `containerProps={{ alignItems: 'flex-start', py: 2 }}`.

## Verdict

## Log

- 2026-09-26: Re-ported in ../ui at commit 1cf88ed (src/components/nav/NavHeader.tsx and NavMobileMenu.tsx; react-focus-on added to package.json): a fixed full-width panel under the sticky header with no portal, no backdrop and no second close button, the toggle named Toggle menu with aria-expanded and aria-controls naming the toolbar panel, the list padded 4, focus held and Escape handled by react-focus-on. Plan b0f69896e764; waits on the operator's publish for the bump plan 99f2fe62c62f.

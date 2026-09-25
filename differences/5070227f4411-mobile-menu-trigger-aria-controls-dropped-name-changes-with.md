---
title: "Mobile menu trigger: aria-controls dropped, name changes with state, panel becomes a modal dialog"
status: upstream
route: shell
axis: accessibility
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavHeader.tsx:28-29,41-42,83-84`: `getButtonProps()` and `getDisclosureProps()` from Chakra v2's `useDisclosure` wire `aria-expanded` and `aria-controls` between the toggle and the panel; the toggle's name is the constant `title="Toggle menu"`. The panel is a plain `role="toolbar"` region, not a dialog (`NavMobileMenu.tsx:29-35`).

## Current

`@villagekit/ui@1.2.0 src/components/nav/NavHeader.tsx:49-56`: `aria-expanded={open}` only, no `aria-controls`; `title={open ? 'Close menu' : 'Open menu'}`. `NavMobileMenu.tsx:30-56`: an Ark UI dialog (`aria-modal`, focus trap) with an extra `IconButton title="Close menu"` in a `Drawer.CloseTrigger`.

## Verdict

## Log

- 2026-09-26: Re-ported in ../ui at commit 1cf88ed (src/components/nav/NavHeader.tsx and NavMobileMenu.tsx; react-focus-on added to package.json): a fixed full-width panel under the sticky header with no portal, no backdrop and no second close button, the toggle named Toggle menu with aria-expanded and aria-controls naming the toolbar panel, the list padded 4, focus held and Escape handled by react-focus-on. Plan b0f69896e764; waits on the operator's publish for the bump plan 99f2fe62c62f.

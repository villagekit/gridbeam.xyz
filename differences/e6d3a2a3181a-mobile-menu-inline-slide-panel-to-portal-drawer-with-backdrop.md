---
title: "Mobile menu: inline slide panel to portal Drawer with backdrop and second close button"
status: regression
route: shell
axis: interaction
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavHeader.tsx:63-70`: the header is wrapped in `react-focus-on`'s `<FocusOn enabled={isMobile && isMobileMenuOpen} autoFocus onEscapeKey={onHideMobileMenu}>`; `packages/ui-nav/src/components/NavMobileMenu.tsx:20-49`: a Chakra v2 `<Slide direction="left" style={{ top: topNavHeight }}>` panel below the sticky header, no backdrop, one header toggle (`FaBars` / `FaTimes`).

## Current

`@villagekit/ui@1.2.0 src/components/nav/NavMobileMenu.tsx:26-79`: `<Drawer.Root placement="start" size="xs">` in a `<Portal>` with `<Drawer.Backdrop>` and a `<Drawer.CloseTrigger>` button inside the panel, full viewport height (no `topNavHeight` offset); the header toggle stays. Not visible in the captures (menu closed); read from the code.

## Verdict

## Log

- 2026-09-12: Rule 4 covers the loss of Chakra v2's `Slide` and nothing more: the backdrop, the full-height panel and the second close control are not forced by the migration.

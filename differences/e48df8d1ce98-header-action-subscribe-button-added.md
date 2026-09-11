---
title: "Header action: Subscribe button added"
status: open
route: shell
axis: visual
kind: added
---
## Legacy

The `HeaderAction` slot (`packages/ui-page/src/components/layouts/MainLayout.tsx:12-19`) held the cart icon button only (`apps/gridkit/components/layouts/main.tsx:92-127`). No subscribe control in the header; `/subscribe` is a footer link.

## Current

`app/_components/SiteHeaderAction.tsx:10-12`: `<LinkButton as={NextLink} href="/subscribe" onClick={onHideMobileMenu} size="sm">Subscribe</LinkButton>`, the default `primary` pink pill. `audit/_root/1280/current.png` top right; `link "Subscribe"` in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log

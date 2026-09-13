---
title: "Header action: Subscribe button added"
status: sanctioned
route: shell
axis: visual
kind: added
---
## Legacy

The `HeaderAction` slot (`packages/ui-page/src/components/layouts/MainLayout.tsx:12-19`) held the cart icon button only (`apps/gridkit/components/layouts/main.tsx:92-127`). No subscribe control in the header; `/subscribe` is a footer link.

## Current

`app/_components/SiteHeaderAction.tsx:10-12`: `<LinkButton as={NextLink} href="/subscribe" onClick={onHideMobileMenu} size="sm">Subscribe</LinkButton>`, the default `primary` pink pill. `audit/_root/1280/current.png` top right; `link "Subscribe"` in `audit/_root/dom/current.aria.yaml`.

## Verdict

rule: no e-commerce (2). Legacy's header held the cart/buy action; the closer non-commercial equivalent is finding where to actually get grid beam, not the newsletter. Ships as a button labelled "Find a supplier" (echoing the locked home-page phrase, [[ad5363e4e1d5]]), linking to /suppliers, replacing the current "Subscribe" button. Confirmed 2026-09-13.

## Log

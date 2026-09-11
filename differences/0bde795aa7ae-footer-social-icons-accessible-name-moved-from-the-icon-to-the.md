---
title: "Footer social icons: accessible name moved from the icon to the link"
status: regression
route: shell
axis: accessibility
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Social.tsx:52-57`: `<Icon as={SocialIcon} aria-label={label} ... />` inside an unlabelled `Link`; ten `img "Mastodon"`-style nodes in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/SiteFooter.tsx:120-129`: `<Link ... aria-label={label}>` around `<Icon boxSize="7">`, the icon `aria-hidden`; the links carry the names and no `img` nodes appear in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: Regression by rule absence; the heart icon's own item is `c49a53197086`.

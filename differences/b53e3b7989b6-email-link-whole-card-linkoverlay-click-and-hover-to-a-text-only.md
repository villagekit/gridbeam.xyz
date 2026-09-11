---
title: "Email link: whole-card LinkOverlay click and hover to a text-only link"
status: regression
route: /contact
axis: interaction
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:37-58` `LinkBox` and `LinkOverlay` make the whole card the `mailto:` target, with `HoverCard`'s scale and border hover on the card (`src/components/HoverCard.tsx:6-18`).

## Current

`app/contact/page.tsx:53-82` a plain `VStack` with no `LinkBox`, `LinkOverlay` or `HoverCard`: only the underlined address (`ObfuscatedEmail`'s `<a>`) is clickable, and only it has a hover rule (`:77-79` `'& a:hover': { color: 'primary.700' }`). The icon, heading and paragraph do nothing on click.

## Verdict

## Log

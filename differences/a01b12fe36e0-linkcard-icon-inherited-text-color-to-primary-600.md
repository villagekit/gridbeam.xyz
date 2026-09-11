---
title: "LinkCard icon: inherited text color to primary.600"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:50` `<Icon as={IconComponent} w="8" h="8" />`, no `color`: the glyph reads near-black in `audit/legal/1280/legacy.png` and `audit/tools-and-resources/1280/legacy.png`.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:35` `<Icon w="8" h="8" color="primary.600">`: every card icon is pink in `audit/legal/1280/current.png` and `audit/tools-and-resources/1280/current.png`. The hand-built cards on `/contact` copy the same `color="primary.600"` (`app/contact/page.tsx:54,85`).

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f.

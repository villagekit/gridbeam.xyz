---
title: "LinkCard: paddingX 4 to 6"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:41` `paddingX: 4` (16 px); `paddingY: 8`.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:32` `paddingX="6"` (24 px); `paddingY="8"` unchanged.

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f; see the LinkCard box item for the routes it reaches.

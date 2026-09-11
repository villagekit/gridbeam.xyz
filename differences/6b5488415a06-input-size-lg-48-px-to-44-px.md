---
title: "Input size lg: 48 px to 44 px"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:29` `InputGroup size="lg"`: Chakra v2's `lg` input is 48 px tall (`audit/designs/1280/legacy.png`, borders at y 127 and 174; the same at 375).

## Current

`app/_components/catalogue/Catalogue.tsx:395` `Input size="lg"`: Chakra v3's `lg` input recipe is 44 px (`audit/designs/1280/current.png`, borders at y 109 and 152); `@villagekit/ui@1.2.0` sets no input size of its own, so every `lg` input on the site shrinks.

## Verdict

## Log

- 2026-09-12: Found by the Parity review of the designs ledger (plan cf52c388); a v3 recipe default like the palette literals [[72b776cb0d3f]].

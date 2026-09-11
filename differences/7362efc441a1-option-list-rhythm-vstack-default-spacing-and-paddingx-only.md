---
title: "Option list rhythm: VStack default spacing and paddingX-only badges to gap 1 and py 0.5"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/selector.tsx:54` `<VStack alignItems="flex-start">` with Chakra v2's default spacing, and `apps/gridkit/components/option.tsx:59` `paddingX: 2` with no vertical padding: a 39 px row pitch in `audit/designs/1280/legacy.png`.

## Current

`app/_components/catalogue/Catalogue.tsx:307` `gap="1"` and `:357-358` `px="2"`, `py="0.5"`: a 28 px row pitch in `audit/designs/1280/current.png`.

## Verdict

## Log

- 2026-09-12: Found by the Parity review (plan cf52c388, round one).

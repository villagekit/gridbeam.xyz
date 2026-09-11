---
title: "Empty state layout: paddingTop 0/16 and a full-width button to py 16 and a maxW sm button"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/list.tsx:56,65-72` `<VStack spacing="4" sx={{ paddingTop: [0, null, 16], textAlign: 'center' }}>` and the button `sx={{ maxWidth: 'sm', width: '100%' }}` with `leftIcon`.

## Current

`app/_components/catalogue/Catalogue.tsx:518,525-528` `<VStack gap="4" py="16" textAlign="center">` and `<Button variant="secondary" maxW="sm">` with the icon as a child and no `width`.

## Verdict

## Log

- 2026-09-12: Found by the Parity review (plan cf52c388, round one). The three strings are copy items.

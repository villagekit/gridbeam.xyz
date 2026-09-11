---
title: Supplier card grid, card treatment and badges
status: open
route: /suppliers
axis: visual
kind: added
---
## Legacy

Absent: no legacy `/suppliers`. The decision says "supplier cards below" and nothing about their look.

## Current

`app/suppliers/page.tsx:78` `SimpleGrid columns={{ base: 1, md: 2 }} gap="6"` (two columns from `md`, still two at 1280); `:169` `Box p="6" bg="white" borderRadius="xl" boxShadow="sm"` (computed at 1280: padding 24px, radius 12px, shadow `0 2px 4px rgba(24,24,27,.1), 0 0 1px rgba(24,24,27,.3)`), no hover treatment; inside, `Heading as="h3" size="md"`, `Text fontSize="sm" variant="secondary"` country, the blurb, `Badge colorPalette="accentA"` offerings (computed: `rgb(236,254,255)` on `rgb(12,92,114)`, radius 8px; `@villagekit/ui@1.2.0 src/components/Badge.recipe.ts:3-6` sets only `borderRadius: 'lg', textTransform: 'none'`), a `Badge colorPalette="orange"` for `paused` (unrendered today), `Text fontSize="sm" variant="secondary"` compatibility with a bold `Span`, `Text variant="tertiary"` notes (unrendered today). `audit/suppliers/{375,1280}/current.png`.

## Verdict

## Log

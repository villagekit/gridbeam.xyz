---
title: "FAQ category section: Box with a Heading marginBottom to a VStack gap"
status: regression
route: /faq
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:342-346` `<Box as="section" aria-labelledby={...}>` holding `<Heading id={...} size="md" sx={{ marginBottom: 4 }}>` then the Accordion.

## Current

`app/faq/page.tsx:294-304` `<VStack as="section" aria-labelledby={...} alignItems="stretch" gap="4">` holding `<Heading as="h2" ...>` then `Accordion.Root`: the 16 px is a gap, not a margin. Same rendered spacing.

## Verdict

## Log

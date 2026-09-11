---
title: "FAQ category heading: size md to xl"
status: regression
route: /faq
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:343` `<Heading id={...} size="md" sx={{ marginBottom: 4 }}>`: Chakra v2's `md` (20 px). "Product" reads small in `audit/faq/1280/legacy.png`.

## Current

`app/faq/page.tsx:302` `<Heading as="h2" id={...} size="xl">`: `@villagekit/ui@1.2.0 src/components/Heading.tsx:39-43` `xl` is `3xl`/`4xl` (30/36 px). "The system" reads near title scale in `audit/faq/1280/current.png`.

## Verdict

## Log

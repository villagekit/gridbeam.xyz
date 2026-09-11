---
title: "Steps list: font scale, gap and width"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:217-224` `<List spacing={8} sx={{ fontSize: textSize, width: { base: 'full', lg: '2xl' } }}>`: the page's `lg`/`xl` text, gap 8, `2xl` wide from `lg`.

## Current

`app/page.tsx:212-218` `<Container maxW="3xl"><List.Root variant="plain" gap="6" fontSize={{ base: 'md', md: 'lg' }}>`: one step smaller than the page's paragraphs, gap 6, `3xl` wide.

## Verdict

## Log

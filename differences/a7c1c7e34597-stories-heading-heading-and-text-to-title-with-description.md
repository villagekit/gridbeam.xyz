---
title: "Stories heading: Heading and Text to Title with description"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:289-294` `<Heading sx={{ alignSelf: 'center' }}>` then a `<Text fontSize={textSize} sx={{ alignSelf: 'center' }}>` in the same column.

## Current

`app/page.tsx:268-273` `<Title as="h2" description="...">`, which wraps the heading in `Container maxW="2xl"` with `my="8"` and the description in its own `Container maxW="lg"` (`node_modules/@villagekit/ui/src/components/layouts/Title.tsx:17-25`).

## Verdict

## Log

---
title: "FAQ content width: Container container.md to a 6xl Section with a 3xl Container"
status: regression
route: /faq
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:339` one `<Container maxW="container.md">` around the categories and the closing line: content about 735 px wide at 1280 (`audit/faq/1280/legacy.png`, x 272 to 1007).

## Current

`app/faq/page.tsx:288,292` `<Section index={0} maxW="6xl">` around `<Container maxW="3xl">`: the Section's padding stacks with the Container's, content about 703 px wide (`audit/faq/1280/current.png`, x 288 to 991).

## Verdict

## Log

---
title: FAQ heading description added
status: open
route: /faq
axis: copy
kind: added
---
## Legacy

`apps/gridkit/pages/faq.tsx:337` `<Title>Frequently asked questions</Title>` with no `description`; the h1 text is identical on both sides.

## Current

`app/faq/page.tsx:289-291` `description="Common questions about grid beam, the 40 mm grid, and where to find parts."` (`audit/faq/dom/current.aria.yaml`: a paragraph between the h1 and the first region).

## Verdict

## Log

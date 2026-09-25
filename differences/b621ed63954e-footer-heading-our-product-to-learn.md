---
title: "Footer heading: Our product to Learn"
status: sanctioned
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/footer.tsx:23`: `heading: 'Our product'` over About, FAQ, Tools and resources.

## Current

`app/_lib/nav.ts:14`: `heading: 'Learn'` over the same three links.

## Verdict

rule: operator (5), [[9f344fbfde9a]].

## Log

- 2026-09-26: Superseded heading text: decision [[9f344fbfde9a]] names the four headings Explore, About, Connect and Legal, so the Learn this item's title quotes never ships; the site footer slice (plan [[5e4529a6aeac]]) ships About over About and FAQ, with Tools and resources under Explore.

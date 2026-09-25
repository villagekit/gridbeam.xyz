---
title: FAQ Is the wood treated? answer rewritten
status: regression
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:100,103-104` "Is the wood treated?" (identical question): "No, we use untreated wood to keep our kits non-toxic, environmentally friendly, and safe for indoor use."

## Current

`app/faq/page.tsx:98,100` "Most suppliers ship untreated wood for indoor use. If you want to use grid beam outdoors, treat it yourself with an appropriate finish."

## Verdict

## Log

- 2026-09-25: Regression (faq grilling F4, operator's words). Ships as: "Is the wood treated?" / "Depends on the supplier. Untreated wood keeps grid beam non-toxic and safe for indoor use."

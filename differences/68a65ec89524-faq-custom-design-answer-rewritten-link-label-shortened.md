---
title: FAQ custom design answer rewritten, link label shortened
status: regression
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:318,321-325` "I have an idea for a custom design — can you help?" (identical question): "We’d love to hear your ideas! Get in touch with us to discuss custom designs and how we can make your vision a reality." (link "Get in touch with us" to `/contact`).

## Current

`app/faq/page.tsx:222,225-230` "Get in touch. We're happy to discuss new designs, especially if you're willing to publish them back to the catalogue under EUPL-1.2." (link "Get in touch" to `/contact`).

## Verdict

## Log

- 2026-09-25: Regression (faq grilling F3). Ships as legacy verbatim: "We'd love to hear your ideas! Get in touch with us to discuss custom designs and how we can make your vision a reality." with the link on "Get in touch with us".

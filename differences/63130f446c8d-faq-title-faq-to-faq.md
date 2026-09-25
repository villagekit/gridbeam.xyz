---
title: "FAQ title: Faq to FAQ"
status: sanctioned
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:335` `<NextSeo title="Faq" />`; rendered `<title>Grid Kit: Faq</title>`.

## Current

`app/faq/page.tsx:17,21-30` `const title = 'FAQ'`; rendered `<title>FAQ — gridbeam.xyz</title>`.

## Verdict

rule: operator (5). Legacy's "Faq" reads as a typo; ships as "FAQ", templated by the shell to "Grid Beam: FAQ" ([[1c8b7461acb1]]). FAQ grilling F1.

## Log

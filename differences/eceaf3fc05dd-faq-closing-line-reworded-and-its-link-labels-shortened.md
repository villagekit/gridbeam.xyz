---
title: FAQ closing line reworded and its link labels shortened
status: fixed
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:375-382` "If your question isn’t answered here, please send us an email or ask on the community forum" (links "send us an email" to `/contact`, "ask on the community forum" to `https://discuss.villagekit.com`; no full stop).

## Current

`app/faq/page.tsx:332-345` "Question not answered here? Send us an email or ask on the community forum." (links "Send us an email", "community forum"; "or ask on the" is plain text).

## Verdict

plan 241b65da8226

## Log

- 2026-09-12: The link extents (`link "ask on the community forum"` to `link "community forum"`, `audit/faq/dom/*.aria.yaml`) follow the copy verdict.

- 2026-09-25: Regression (faq grilling F3). Ships as legacy verbatim: "If your question isn't answered here, please send us an email or ask on the community forum" with legacy's link extents, no full stop.

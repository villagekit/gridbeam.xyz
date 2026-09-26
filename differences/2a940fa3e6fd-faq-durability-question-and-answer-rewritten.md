---
title: FAQ durability question and answer rewritten
status: fixed
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:91,94-95` "Are the materials durable?": "Yes, we’ve selected materials that are both strong and long-lasting to ensure your builds stand the test of time."

## Current

`app/faq/page.tsx:93,95` "How durable are grid beams?": "Grid beam is built to be repaired rather than to never fail. Three beams joined with three bolts make a rigid corner in all three axes, and a damaged beam gets replaced on its own — the rest of the build stays in service."

## Verdict

plan 241b65da8226

## Log

- 2026-09-25: Regression (faq grilling F4, operator's words). Ships as: "Are the materials durable?" / "Yes, the materials are both strong and long-lasting, so your builds stand the test of time."

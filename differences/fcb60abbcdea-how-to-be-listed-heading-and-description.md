---
title: How to be listed heading and description
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:128-134` `<Title as="h2" id="how-to-be-listed-heading" description="If you produce or resell grid-beam-compatible hardware, you can be listed for free.">How to be listed</Title>`.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q5). The "How to be listed" section is removed; the decision names no such section, and Contact is in the footer.

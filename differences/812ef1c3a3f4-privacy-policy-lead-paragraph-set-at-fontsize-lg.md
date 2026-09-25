---
title: Privacy policy lead paragraph set at fontSize lg
status: regression
route: /legal/privacy-policy
axis: visual
kind: added
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:3-7` the opening paragraphs render at the default paragraph size (`packages/ui-mdx/src/paragraph.tsx`).

## Current

`app/legal/privacy-policy/page.tsx:43` `<Text fontSize="lg">` on the first paragraph only.

## Verdict

## Log

- 2026-09-25: Regression (privacy grilling P2). The lead paragraph renders at the default paragraph size, as legacy.

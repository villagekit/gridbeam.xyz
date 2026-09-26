---
title: "FAQ closing line: marginTop 8 below the stack to a child of the gap 12 stack"
status: regression
route: /faq
kind: changed
axis: visual
---
## Legacy

`../node-modules/apps/gridkit/pages/faq.tsx:374` at `fce357d`: the closing line is `<Text sx={{ marginTop: 8 }}>` written after the `VStack` of sections closes (`:373`), so 32px separate the last section's bottom rule from the line (`audit/faq/1280/legacy.png`, the rule at about y 2118 and the line's text at about 2160).

## Current

`app/faq/page.tsx:312-327`: the closing `Text` is the last child of `<VStack alignItems="stretch" gap="12">` (`:274`), so the stack's gap, 48px, separates it from the last rule (`audit/faq/1280/current.png`), 16px more than legacy. The line's copy is `eceaf3fc05dd`; this item is its spacing only.

## Verdict

## Log

- 2026-09-26: Filed at the faq split (plan [[7f0b60d948c5]]): no M1 item names the closing line's spacing ([[eceaf3fc05dd]] is its copy). No rule covers a wider gap, so regression; the page re-port closes it by writing legacy's tree, the Text after the stack with marginTop 8.

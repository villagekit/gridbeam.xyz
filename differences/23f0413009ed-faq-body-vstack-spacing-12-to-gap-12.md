---
title: "FAQ body VStack: spacing 12 to gap 12"
status: sanctioned
route: /faq
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:340` `<VStack alignItems="left" spacing="12">`.

## Current

`app/faq/page.tsx:293` `<VStack alignItems="stretch" gap="12">`: `spacing` is not a Chakra v3 Stack prop.

## Verdict

rule: upgrade (Chakra v3 Stack takes gap, not spacing)

## Log

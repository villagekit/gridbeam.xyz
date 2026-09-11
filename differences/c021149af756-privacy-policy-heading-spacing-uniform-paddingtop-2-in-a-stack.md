---
title: "Privacy policy heading spacing: uniform paddingTop 2 in a Stack spacing 4 to pt 4 on h2 only in a VStack gap 6"
status: regression
route: /legal/privacy-policy
axis: visual
kind: changed
---
## Legacy

`packages/applet-legal/src/components/LegalLayout.tsx:15` `<Stack spacing="4">` (16 px between blocks) and `packages/ui-mdx/src/heading.tsx:7` `paddingTop: 2` on every heading: about 24 px above any heading.

## Current

`app/legal/privacy-policy/page.tsx:42` `<VStack alignItems="flex-start" gap="6">` (24 px) plus `pt="4"` on the six h2s only (`:49,73,148,186,208,218`): about 40 px above an h2 and 24 px above an h3, the same as above a paragraph.

## Verdict

## Log

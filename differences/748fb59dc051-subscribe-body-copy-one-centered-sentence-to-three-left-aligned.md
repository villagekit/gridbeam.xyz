---
title: "Subscribe body copy: one centered sentence to three left-aligned paragraphs in three type tiers"
status: regression
route: /subscribe
axis: visual
kind: changed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:48-53` one `<Text sx={{ textAlign: 'center' }}>` at the default size, inside `VStack spacing={[8, null, 12]}` (`:35`).

## Current

`app/subscribe/page.tsx:41-54` `<VStack alignItems="flex-start" gap="5">` of a `fontSize="lg"` lead, a paragraph with an italic `<em>Buttondown</em>`, and a `variant="secondary"` closer, left-ragged (`audit/subscribe/1280/current.png`).

## Verdict

## Log

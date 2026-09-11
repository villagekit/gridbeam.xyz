---
title: "Bold spans: Box as span with sx to Span"
status: sanctioned
route: /about
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:20-22` `<Box as="span" sx={{ fontWeight: 'bold' }}>` in every caption.

## Current

`app/about/page.tsx:70` `<Span fontWeight="bold">` from `@villagekit/ui` in every caption.

## Verdict

rule: upgrade (Chakra v3 drops the sx prop; Span is its inline text primitive)

## Log

- 2026-09-12: Review asked whether Span is forced. Chakra v3 exports Span as its inline typography primitive (node_modules/@chakra-ui/react/dist/esm/components/typography, re-exported by @villagekit/ui); it renders the same span with the same style as Box as=span, so this is the v3 idiom for the v2 one, within rule 4.

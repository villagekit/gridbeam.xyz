---
title: "Inline spans: Box and Text as span with sx to Span"
status: sanctioned
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:92` `<Box as="span" sx={{ color: 'primary.400', fontWeight: 'bold' }}>`; `:162` `<Text as="span" sx={{ color: 'gray.600', fontStyle: 'normal' }}>`; `:419` `<Text as="span" sx={{ color: 'accentA.500', ... }}>`.

## Current

`app/page.tsx:121` `<Span color="primary.500" fontWeight="bold">`; `:162` `<Span color="gray.600" fontStyle="normal">`; `:421` `<Span>` in `Step`; `app/_components/landing/TypingDesignSection.tsx:58` `<Span color="accentA.500">`.

## Verdict

rule: upgrade (Chakra v3 drops the sx prop; Span is its inline typography primitive)

## Log

- 2026-09-12: Chakra v3 exports Span (node_modules/@chakra-ui/react/dist/esm/components/typography, re-exported by @villagekit/ui); it renders the same span with the same style as Box as=span, the v3 idiom for the v2 one. The color step on `:121` is [[f0e807981b22]].

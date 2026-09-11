---
title: "FAQ links: the default primary variant to variant paragraph, underlined"
status: regression
route: /faq
axis: visual
kind: changed
---
## Legacy

No `variant` on any FAQ `Link` (`apps/gridkit/pages/faq.tsx:36,41,141,157,186-190,216-219,376,380`): `@villagekit/ui@0.9.0 src/components/Link.tsx:37-39,56-58` default `primary`, `accentA.600`, no underline, hover to `primary.700`. "send us an email" is light cyan and not underlined in `audit/faq/1280/legacy.png`.

## Current

`variant="paragraph"` on every FAQ `Link` (`app/faq/page.tsx:56,70,85,124-131,161-166,225,238-243,247-252,263-268,272,333,337-341`): `@villagekit/ui@1.2.0 src/components/Link.tsx:33-38` `accentA.800`, underlined at rest. "Send us an email" is darker and underlined in `audit/faq/1280/current.png`; the in-answer links sit in collapsed panels and are read from the code.

## Verdict

## Log

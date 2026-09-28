---
title: Section Questions added
status: fixed
route: /legal
axis: copy
kind: added
---
## Legacy

The page ends after the cards (`packages/applet-legal/src/pages/legal.tsx:54`).

## Current

`app/legal/page.tsx:70-90` a gray `Section` with `<Heading as="h2" size="lg">Questions</Heading>` and "Anything unclear? Email hello+gridbeam@mikey.nz or open an issue at github.com/villagekit/gridbeam.xyz/issues." (the address through `ObfuscatedEmailLink`, the issues link with `target="_blank" rel="noopener noreferrer"`).

## Verdict

plan 28f8cfbe92ea

## Log

- 2026-09-25: Regression (legal grilling L3). The Questions section is removed; legacy ends after the cards.

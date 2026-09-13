---
title: Section Policies heading and description added
status: sanctioned
route: /legal
axis: copy
kind: added
---
## Legacy

No heading between the h1 and the cards (`packages/applet-legal/src/pages/legal.tsx:22-56`).

## Current

`app/legal/page.tsx:49-51` `<Title as="h2" description="Two policies and a licence — that's the whole legal stack.">Policies</Title>`.

## Verdict

rule: operator (5). Keep the heading `Policies` as a short section label; drop the description entirely. With two self-explanatory cards right below it, restating "two policies and a licence, that's the whole legal stack" adds nothing a visitor doesn't already see, and it used an em dash besides ([[64ee4dfa393d]]). Ships as `<Title as="h2">Policies</Title>`, no `description` prop.

## Log

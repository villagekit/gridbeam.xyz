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

- 2026-09-28: From the legal record split (plan e710087c8961): the removals slice 28f8cfbe92ea ships the Ships as line inside the current Section shape (the Title as h2 keeps its text and loses its description prop). Under the page re-port that follows (70e5734d5b7a), legacy's CardsLayout has no place for a heading between its title and its cards, so the re-port keeps this heading by default and composes legacy's layout body in the route around it, the code shape that forces being 7a2ff790e460's, left regression for the operator on the legal verdicts plan d2beea2f9659 beside this item. This item keeps its state; no agent supersedes the verdict.

- 2026-09-28: The verdict shipped with plan 28f8cfbe92ea: app/legal/page.tsx ships `<Title as="h2">Policies</Title>`, no description prop, exactly as Ships as says. The shell's 1906af99b588 is the precedent for a verdict shipped this way.

- 2026-09-28: From the legal re-port (plan 70e5734d5b7a): the heading is kept as Ships as says, <Title as="h2">Policies</Title> at app/legal/page.tsx:17, between the h1 at :15 and the wrap's Container at :19-29, legacy's CardsLayout body composed in the route around it because the ui CardsLayout has no place for a heading between its title and its wrap. The code shape that forces is 7a2ff790e460's CardsLayout half, regression for the operator on the verdicts plan d2beea2f9659; this item keeps its state.

---
title: "Legal page: createLegalPage factory with policy flags and CardsLayout to a hand-written page"
status: regression
route: /legal
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/legal.tsx:5` `createLegalPage({ Layout: MainLayout, hasReturnPolicy: true })` from `packages/applet-legal/src/pages/legal.tsx:14-66`: a factory with `hasReturnPolicy`, `hasCookiePolicy`, `hasPrivacyPolicy` flags gating three inline `LinkCard`s, and a `getLayout` wrapping `CardsLayout`.

## Current

`app/legal/page.tsx:34-93` `export default function LegalPage()` with two inline `LinkCard`s in a `SimpleGrid`, a hand-composed `Main`, three `Section`s, `Title`, `Container`, `VStack`, `Heading`, `Text`, `Link`, and `ObfuscatedEmailLink` (shell item 68b53054e1f4); no factory, flags or `CardsLayout`.

## Verdict

## Log

- 2026-09-28: From the legal record split (plan e710087c8961): the factory half of this item, createLegalPage with its policy flags in the private applet package folded into the page, is its own item now, f77473dea927, open for the operator on the legal verdicts plan d2beea2f9659. This item keeps the CardsLayout and LinkCard half, and that half is the operator's too: the kept Policies heading (f18294790df5, sanctioned, Ships as a Title as h2) has no place in the ui CardsLayout, which renders its title and then the wrap of cards, so the re-port slice 70e5734d5b7a composes legacy's CardsLayout body in the route around the heading by default and leaves this item regression, the verdicts plan offering the operator three calls (the composition sanctioned, a slot in the ui CardsLayout, or the heading superseded and the page on CardsLayout as the two sibling routes are). The Current section above describes the page before the removals slice 28f8cfbe92ea; the re-port's note will name the composed layout's lines.

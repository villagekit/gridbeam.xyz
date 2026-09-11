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

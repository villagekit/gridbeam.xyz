---
title: "Contact page: createContactPage factory and CardsLayout to a hand-written page"
status: regression
route: /contact
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/contact.ts:1-5` default-exports `createContactPage({ Layout: MainLayout, contactEmail })` from `packages/applet-contact/src/pages/contact.tsx:12-33`: a factory whose page is one `LinkCard` and whose `getLayout` wraps `CardsLayout` (`packages/ui-page/src/components/layouts/CardsLayout.tsx:14-30`: `NextSeo`, `Title`, `Container`, `Wrap`).

## Current

`app/contact/page.tsx:33-107` `export default function ContactPage()` composing `Main`, `SkipNavContent`, two `Section`s, `Title`, `Container`, `VStack`, `Icon`, `Heading`, `Text`, `Link` from `@villagekit/ui@1.2.0` directly; no factory, no `CardsLayout`, no `LinkCard`. `getLayout` to the root layout is the shell item 1c05b1d0d3db; `NextSeo` to `metadata` is 65c21e08b3f1.

## Verdict

## Log

- 2026-09-28: From the contact record split (plan 1a3ab91a9640): the factory half of this item, createContactPage in the private applet package folded into the page, is its own item now, 0c7f344ccb34, open for the operator on the contact verdicts plan minted at the split, since no rule covers it and the planner sanction fede2033572a is that route alone. This item keeps the CardsLayout and LinkCard half: the re-port slice consumes the ui CardsLayout and one LinkCard with legacy props, and its one residual, the icon prop element form the published 1.2.0 forces (fixed at ui a4ef8ed), parks it upstream for the bump plan 99f2fe62c62f, the tools and resources f502886a0c08 the precedent.

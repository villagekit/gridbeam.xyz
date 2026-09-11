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

---
title: "Legal page: the createLegalPage factory with its policy flags in the private applet package to the page's own body"
status: open
route: /legal
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/legal.tsx:1-5` at `fce357d`: the page is `createLegalPage({ Layout: MainLayout, hasReturnPolicy: true })`, a factory from `packages/applet-legal/src/pages/legal.tsx:14-66` (`@villagekit-private/applet-legal`, a workspace package never published, written to be shared by legacy's sites): `CreateLegalPageOptions` with `Layout`, `hasReturnPolicy` (default `false`), `hasCookiePolicy` and `hasPrivacyPolicy` (default `true`), the returned `LegalPage: Page` rendering each of three `LinkCard`s behind its flag, and its `getLayout` wrapping `<CardsLayout title="Our legal information">`.

## Current

`app/legal/page.tsx:26` `export default function LegalPage()`: the page's own body, no factory, no options and no flags. The route's re-port keeps that shape, legacy's card as the page's default export, the `Layout` option being the shell's root layout ([[1c05b1d0d3db]], rule 4) and the three flags gone with the two cards they gated (the Return policy and Cookie policy cards, the sanctioned [[ef59524d260f]] and [[dd02da382017]]), since this repo has no packages and one site (CLAUDE.md, Principles: no abstraction for single-use code). The `CardsLayout` and `LinkCard` half of the file shape is [[7a2ff790e460]].

## Verdict

## Log

- 2026-09-28: Filed at the legal record split (plan e710087c8961) as the factory half of 7a2ff790e460, which keeps the CardsLayout and LinkCard half. Open for the operator: no rule of 2032533f covers a factory folded into its one caller (the Layout option alone is rule 4). The same question is open on /contact (0c7f344ccb34, on the contact verdicts plan 0c6face80696) and stands on /subscribe (f60ba42d1e34), so one call settles all three; the planner's fede2033572a is that route's sanction alone. The re-port slice 70e5734d5b7a builds the inline shape as the default; a verdict before it runs shapes it. On the legal verdicts plan d2beea2f9659.

- 2026-09-28: From the legal re-port (plan 70e5734d5b7a): the page is legacy's applet-legal page now, and the inline body this item's Current describes is at app/legal/page.tsx:12, export default function LegalPage(), the factory's Privacy policy card at :21-27 with its three flags gone. This item stays open for the operator on the verdicts plan d2beea2f9659; a regression verdict now is applied by a slice beside the record, as the split said.

---
title: "Contact page: the createContactPage factory in the private applet package to the page's own body"
status: open
route: /contact
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/contact.ts:1-5` at `fce357d`: the page is `createContactPage({ Layout: MainLayout, contactEmail: 'hello@madewithgridkit.com' })`, a factory from `packages/applet-contact/src/pages/contact.tsx:12-33` (`@villagekit-private/applet-contact`, a workspace package never published, written to be shared by legacy's sites): `CreateContactPageOptions` with `Layout` and `contactEmail`, the returned `ContactPage: Page` rendering one `LinkCard` with `href={`mailto:${contactEmail}`}`, and its `getLayout` wrapping `<CardsLayout title="Contact us">`.

## Current

`app/contact/page.tsx:16` `export default function ContactPage()`: the page's own body, no factory and no options. The route's re-port keeps that shape, legacy's card body as the page's default export, the `Layout` option being the shell's root layout ([[1c05b1d0d3db]], rule 4) and the `contactEmail` option a module constant, `const contactEmail = 'hello+gridbeam@mikey.nz'`, since this repo has no packages and one site (CLAUDE.md, Principles: no abstraction for single-use code). The `CardsLayout` and `LinkCard` half of the file shape is [[e3ef11de73a8]].

## Verdict

## Log

- 2026-09-28: Filed at the contact record split (plan 1a3ab91a9640) as the factory half of e3ef11de73a8, which keeps the CardsLayout and LinkCard half. Open for the operator: no rule of 2032533f covers a factory folded into its one caller (the Layout option alone is rule 4). The parallel call already made is fede2033572a on /tools/cutting-planner, the operator sanctioning the private applet as an in-app module because the repo has no workspace and the applet was never published; that verdict is that route item alone, so this item asks its own question, and the same one stands for /legal (7a2ff790e460, createLegalPage with its policy flags) and /subscribe (f60ba42d1e34, createSubscribePage), which one call could settle for all three. The re-port slice builds the inline shape as the default; a verdict given before it runs shapes it (a kept createContactPage in the route directory, or the inline body), and a verdict after it is applied by a slice beside the record. On the contact verdicts plan minted at the split.

- 2026-09-28: The contact verdicts plan is 0c6face80696.

---
title: "Subscribe page: one pages-router file to a server page.tsx and a client SubscribePage.tsx"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:17-74` at `fce357d` is one module holding the whole page (`apps/gridkit/pages/subscribe.tsx` calls its factory): `SubscribePage` with `NextSeo` for the title (`:30`), the `useState` success state (`:21`), the `handleFormSuccess` callback (`:23-26`), the `Title`, the `Container` with the sentence or the confirmation and the form, and `getLayout` (`:69-71`).

## Current

`app/subscribe/page.tsx` is one server file today, a static page with no form and no state. The route's re-port splits it: `app/subscribe/page.tsx` exports `metadata` (`title: 'Subscribe'`) and renders `<SubscribePage />`; `app/subscribe/SubscribePage.tsx` is a client component (`'use client'`) holding the state, the callback and the page body, legacy's page line for line. The app router exports `metadata` from a server component only, and `useState` needs a client one.

## Verdict

## Log

- 2026-09-28: Filed open at the subscribe record split (plan fbb7c2c27eb5) for rule 4 of 2032533f, put to the operator on the verdicts plan 91b42a34a79f in the words of the home's 091a47cb93e7 (on 8bb4a4380264), the designs index's 30847e0e3701 (on 549ec777422c), the design pages' 8aacd71da174 and the stories index's e3a2d4d66691; the re-port 244b962caae9 meets it and ships the two-file shape unless a verdict names another. Unlike the contact and legal pages, the subscribe page cannot avoid the split: its success state is React state.

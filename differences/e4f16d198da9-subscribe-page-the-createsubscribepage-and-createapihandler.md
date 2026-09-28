---
title: "Subscribe page: the createSubscribePage and createApiHandler factories in the private applet package to the page's and the route handler's own bodies"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/subscribe.tsx:1-10` at `fce357d`: the page is `createSubscribePage({ Layout: MainLayout, subscribeApiPath: '/api/subscribe', subscriptionTag: SubscriptionTag.gridkit, websiteName: 'Grid Kit' })`, a factory from `packages/applet-subscribe/src/page.tsx:17-74` (`@villagekit-private/applet-subscribe`, a workspace package never published, written to be shared by legacy's sites): `CreateSubscribePageOptions` with `Layout`, `websiteName`, `subscribeApiPath` and `subscriptionTag`, the returned `SubscribePage: Page` holding the success state and rendering the `Title`, the sentence and `SubscribeForm`, and its `getLayout` wrapping the page in `Layout`. `apps/gridkit/pages/api/subscribe.ts:1-11`: the API route is `createApiHandler({ buttondownApiKey })`, a factory from `packages/applet-subscribe/src/api.ts:11-67` returning the handler that validates the body and posts to Buttondown.

## Current

`app/subscribe/page.tsx:15` `export default function SubscribePage()`: the page's own body, no factory and no options, and no API route at all (`ls app/api` fails). The route's re-port keeps that shape: `app/subscribe/SubscribePage.tsx` holds the client body as the default export with the factory's options as module constants (`websiteName`, `subscribeApiPath`, `subscriptionTag`), the `Layout` option being the shell's root layout ([[1c05b1d0d3db]], rule 4); `app/api/subscribe/route.ts` exports `POST` with the handler's body (the key read per request, its own item). Both because this repo has no packages and one site (CLAUDE.md, Principles: no abstraction for single-use code). The applet's modules being in the route directory at all is [[f60ba42d1e34]], which the re-port fixes; this item is the factory half.

## Verdict

## Log

- 2026-09-28: Filed at the subscribe record split (plan fbb7c2c27eb5) as the factory half of f60ba42d1e34, which the re-port slice 244b962caae9 fixes for the modules' return. Open for the operator: no rule of 2032533f covers a factory folded into its one caller (the Layout option alone is rule 4). The same question is open on /contact (0c7f344ccb34, on the contact verdicts plan 0c6face80696) and /legal (f77473dea927, on the legal verdicts plan d2beea2f9659), so one call settles all three; the planner's fede2033572a is that route's sanction alone. The re-port builds the inline shape as the default; a verdict before it runs shapes it. On the subscribe verdicts plan 91b42a34a79f.

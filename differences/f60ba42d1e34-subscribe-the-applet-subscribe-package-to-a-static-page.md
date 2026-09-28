---
title: "Subscribe: the applet-subscribe package to a static page"
status: fixed
route: /subscribe
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/subscribe.tsx:1-10` `createSubscribePage({ Layout, subscribeApiPath: '/api/subscribe', subscriptionTag: SubscriptionTag.gridkit, websiteName: 'Grid Kit' })` from `packages/applet-subscribe/src/`: `page.tsx:17-74` (factory, `useState` success state, `getLayout`), `component.tsx:1-179` (`SubscribeForm`: react-hook-form, `zodResolver`, `useToast`, `ky`), `schema.ts:1-20` (`subscriptionFormSchema`, `subscriptionRequestSchema`, `SubscriptionTag`), `types.ts:1-45`, `api.ts:1-67` (`createApiHandler`, `got` to Buttondown, 405/400/204/500), `stories.tsx:1-14`; `apps/gridkit/pages/api/subscribe.ts:1-11` throws without `BUTTONDOWN_API_KEY`.

## Current

`app/subscribe/page.tsx:1-82`: one server component with a `metadata` export, `Main`, two `Section`s, `Title`, `Container`, `VStack`, `Text`, `SimpleGrid`, `LinkCard`; no form, schema, types, API route or story. `package.json` has no `react-hook-form`, `@hookform/resolvers`, `zod`, `ky` or `got`.

## Verdict

plan 244b962caae9: the applet's five modules are in the route directory again, `app/subscribe/SubscribePage.tsx`, `SubscribeForm.tsx`, `schema.ts`, `types.ts`, and the handler at `app/api/subscribe/route.ts`, each ported from its source at `fce357d`. Not ported: `index.ts`, a barrel for a package this repo does not have (the module layout [[fede2033572a]] covers), and `stories.tsx`, a Storybook story for a Storybook this repo does not run (its own item, [[cf055fb61c41]]). The factory half is [[e4f16d198da9]], the operator's.

## Log

- 2026-09-12: The form's return (the interaction item) will need the applet's modules ported; this item tracks the code shape.

---
title: "Subscribe: the applet-subscribe package to a static page"
status: regression
route: /subscribe
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/subscribe.tsx:1-10` `createSubscribePage({ Layout, subscribeApiPath: '/api/subscribe', subscriptionTag: SubscriptionTag.gridkit, websiteName: 'Grid Kit' })` from `packages/applet-subscribe/src/`: `page.tsx:17-74` (factory, `useState` success state, `getLayout`), `component.tsx:1-179` (`SubscribeForm`: react-hook-form, `zodResolver`, `useToast`, `ky`), `schema.ts:1-20` (`subscriptionFormSchema`, `subscriptionRequestSchema`, `SubscriptionTag`), `types.ts:1-45`, `api.ts:1-67` (`createApiHandler`, `got` to Buttondown, 405/400/204/500), `stories.tsx:1-14`; `apps/gridkit/pages/api/subscribe.ts:1-11` throws without `BUTTONDOWN_API_KEY`.

## Current

`app/subscribe/page.tsx:1-82`: one server component with a `metadata` export, `Main`, two `Section`s, `Title`, `Container`, `VStack`, `Text`, `SimpleGrid`, `LinkCard`; no form, schema, types, API route or story. `package.json` has no `react-hook-form`, `@hookform/resolvers`, `zod`, `ky` or `got`.

## Verdict

## Log

- 2026-09-12: The form's return (the interaction item) will need the applet's modules ported; this item tracks the code shape.

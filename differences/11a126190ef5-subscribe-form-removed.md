---
title: Subscribe form removed
status: regression
route: /subscribe
axis: interaction
kind: removed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:34-64` renders `SubscribeForm` (`component.tsx:34-179`) in a `container.md` Container: six fields with react-hook-form and a zod resolver (`schema.ts:9-16`, `email` `.trim().email()`), `isRequired` on name and email, inline `FormErrorMessage`s, a `Subscribe!` button with `isLoading={isSubmitting}`, `ky.post('/api/subscribe')` with `tags: ['Grid Kit']` (`SubscriptionTag.gridkit`), an error toast with `setError` per bad field on 400, and on success a toast, `setSubscribed(true)` and `window.scrollTo({ top: 0 })` which swaps the title, the paragraph and unmounts the form. Server side `apps/gridkit/pages/api/subscribe.ts` and `packages/applet-subscribe/src/api.ts:22-66` post to `https://api.buttondown.email/v1/subscribers`. `audit/subscribe/1280/legacy.png`.

## Current

`app/subscribe/page.tsx:1-82`: no `<form>`, input, button, state or API route (no `app/api/`); `.env.example:3` still names `BUTTONDOWN_API_KEY`. CLAUDE.md, "Key decisions": the `/subscribe` page is a real Buttondown form, the API key the operator's.

## Verdict

## Log

- 2026-09-12: The plan names this item and its verdict. The success state's copy and the form's copy are separate open copy items so the operator can judge the strings.

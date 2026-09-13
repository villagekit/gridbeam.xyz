---
title: EmotionRegistry added
status: sanctioned
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/_app.tsx:45`: `<ChakraProvider theme={theme}>` and nothing else for style injection.

## Current

`app/_components/EmotionRegistry.tsx:1-57`: a patched `@emotion/cache` flushed through `useServerInsertedHTML`, wrapping `Provider` in `app/layout.tsx:69-70`, with the claim that without it Chakra v3's `<Global>` and `<Insertion>` break React 19 hydration under the app router.

## Verdict

rule: operator (5). Matches Next's own official app-router example for Emotion/CSS-in-JS. Empirical check (removed, tested a prod build and dev across 5 routes incl. two with real Suspense boundaries): no observable breakage, but Emotion's own source flags a residual per-render server-cache risk under out-of-order streaming that wasn't specifically provoked. Cheap insurance matching the framework's recommended shape, not an invention. Confirmed 2026-09-13.

## Log

- 2026-09-12: An invention with an unverified upstream claim; the operator decides whether it stays, and the closing plan verifies the claim against Chakra v3's app-router guidance.

---
title: "Design swap animation: fade-out then fade-in and zoom to a single fade and zoom"
status: regression
route: /
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/carousel.tsx:25-66` Web Animations API: the old image fades out over 100ms (`ease-in`), then on `onLoad` the new one fades in over 1500ms (`ease-out`) while scaling 0.8 to 1 over 2000ms (`cubic-bezier(0.33, 1, 0.68, 1)`).

## Current

`app/_components/landing/TypingDesignSection.tsx:110-117` one `motion.div` keyed by `src`: opacity 0 to 1 over 0.6s, scale 0.85 to 1 over 1.2s; no fade-out, no `onLoad` gating. From code.

## Verdict

## Log

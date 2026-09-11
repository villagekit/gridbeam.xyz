---
title: "Testimonial: use client boundary, useBreakpointValue to a responsive prop"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/testimonial.tsx:14-20,27,35` `isXlScreen = useBreakpointValue({ base: false, xl: true }, { fallback: 'xl' })` picks `fontSize`.

## Current

`app/_components/landing/Testimonial.tsx:9,36,44` `'use client'` (comment: `BlockSection`'s `Icon` prop cannot cross the RSC boundary); `fontSize={{ base: 'sm', xl: 'md' }}`; `alignSelf="center"` on the name.

## Verdict

## Log

- 2026-09-12: `useBreakpointValue` exists in Chakra v3 (`node_modules/@chakra-ui/react/dist/esm/hooks/use-breakpoint.js`), so rule 4 does not cover the swap; the client boundary is forced by the app router only if `Testimonial` stays a separate module.

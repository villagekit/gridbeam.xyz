---
title: "Testimonial: use client boundary, useBreakpointValue to a responsive prop"
status: fixed
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/testimonial.tsx:14-20,27,35` `isXlScreen = useBreakpointValue({ base: false, xl: true }, { fallback: 'xl' })` picks `fontSize`.

## Current

`app/_components/landing/Testimonial.tsx:9,36,44` `'use client'` (comment: `BlockSection`'s `Icon` prop cannot cross the RSC boundary); `fontSize={{ base: 'sm', xl: 'md' }}`; `alignSelf="center"` on the name.

## Verdict

plan 0bb6cc8ab1ad

## Log

- 2026-09-12: `useBreakpointValue` exists in Chakra v3 (`node_modules/@chakra-ui/react/dist/esm/hooks/use-breakpoint.js`), so rule 4 does not cover the swap; the client boundary is forced by the app router only if `Testimonial` stays a separate module.

- 2026-09-26: The hook and the fixed font sizes are restored as legacy wrote them (plan 0bb6cc8ab1ad). The use client directive stays, now forced by the hook itself, which calls Chakra context and a media query and cannot run in a server component; legacy is a separate module too, and the app router makes a hook module a client one, so the boundary is upgrade-forced (rule 4 of decision 2032533f).

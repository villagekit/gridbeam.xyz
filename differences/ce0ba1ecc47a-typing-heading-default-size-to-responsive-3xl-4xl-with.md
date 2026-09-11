---
title: "Typing heading: default size to responsive 3xl/4xl with lineHeight 1.1"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:412` `<Heading>` with no `size` (Chakra v2 default `xl`); "Build a C" in `audit/_root/1280/legacy.png`.

## Current

`app/_components/landing/TypingDesignSection.tsx:56` `<Heading as="h2" size={{ base: '3xl', md: '4xl' }} lineHeight="1.1" aria-hidden="true">`; "Build a Maker Desk" in `audit/_root/1280/current.png`.

## Verdict

## Log

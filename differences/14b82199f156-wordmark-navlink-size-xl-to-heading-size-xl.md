---
title: "Wordmark: NavLink size xl to Heading size xl"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:85`: `<NavLink ... size="xl">`; `@villagekit/ui@0.9.0 src/components/NavLink.tsx:56-57`: `xl: { fontSize: '3xl' }`, fixed at every width (30px).

## Current

`app/_components/SiteBrand.tsx:23`: `<Heading as="span" size="xl">` inside a `Link`; `@villagekit/ui@1.2.0 src/components/Heading.tsx:39-43`: `xl: { textStyle: 'none', fontSize: { base: '3xl', md: '4xl' }, lineHeight: { base: '1.33', md: '1.2' } }`, 36px from `md` up, and the line height changes the header row's height with it. Compare the wordmarks in `audit/_root/1280/legacy.png` and `audit/_root/1280/current.png`.

## Verdict

## Log

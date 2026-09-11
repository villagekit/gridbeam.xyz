---
title: "Footer social icons: spread across the row to centered fixed-size"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Social.tsx:25-29`: `<HStack as="section" spacing="4" sx={{ width, justifyContent: 'flex-end', alignItems: 'baseline' }}>`; `:48-57`: each icon has `iconBoxSize = 'auto'`, so `flexGrow: 1` and `maxWidth: iconMaxWidth` (8), and with `width="full"` the ten icons spread across the row (`audit/_root/1280/legacy.png`, footer).

## Current

`app/_components/SiteFooter.tsx:79-89`: `<HStack as="nav" gap={{ base: 4, md: 5 }} justifyContent="center" flexWrap="wrap">` with `<Icon boxSize="7">`.

## Verdict

## Log

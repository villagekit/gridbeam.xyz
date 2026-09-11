---
title: "Brand: logo to wordmark gap 2 to 2.5 with right padding"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:83`: `<LogoSvg size="10" sx={{ marginRight: 2 }} />` beside the `NavLink`.

## Current

`app/_components/SiteBrand.tsx:19`: `<HStack gap="2.5" alignItems="center" pr={{ base: 0, md: 4 }}>` around the logo and wordmark.

## Verdict

## Log

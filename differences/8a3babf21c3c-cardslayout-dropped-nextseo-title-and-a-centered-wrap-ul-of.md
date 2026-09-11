---
title: "CardsLayout: container.md to 2xl, and no route consumes it"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:14-30` (`'use client'`): `<NextSeo title={title} />`, `<Title>{title}</Title>`, `<Container maxW="container.md"><Wrap spacing={8} justify="center" sx={{ overflow: 'visible' }}>{children}</Wrap></Container>`; the `Wrap` renders `<ul class="chakra-wrap__list">`. The page layout every card route shared: `/contact` (`packages/applet-contact/src/pages/contact.tsx:28`), `/legal` (`packages/applet-legal/src/pages/legal.tsx:61`), `/tools-and-resources` (`apps/gridkit/pages/tools-and-resources.tsx:25`).

## Current

`@villagekit/ui@1.2.0 src/components/layouts/CardsLayout.tsx:17-31` ports it: the same `Title` and `<Wrap gap="8" justify="center" overflow="visible">` (a `ul`), `NextSeo` dropped (`:13-15`: consumers use Next metadata), and `<Container maxW="2xl">` where legacy had `container.md`. Exported from `layouts/index.ts:3`, but no route imports it (`grep -rn CardsLayout app/` is empty): `/contact`, `/legal` and `/tools-and-resources` compose `Section`, `Title`, `Container` and a `SimpleGrid` (or hand-built `VStack`s) by hand. The per-route outcomes (the list role gone, the width, the grid) are on each route.

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f: decision bfa9a416 names `packages/ui-page` as shell, and the shell pass covered ContentMainLayout (a73e9678cd57) but not CardsLayout. The NextSeo drop is rule 4 (65c21e08b3f1); the width change and the routes not consuming the port are the regression. The three routes' list-role items cite this as their cause.

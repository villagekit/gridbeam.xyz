---
title: "CardsLayout: container.md to 2xl, and no route consumes it"
status: upstream
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

- 2026-09-26: The width half is fixed in ../ui as commit a4ef8ed on its main (not pushed; the push goes with the operator's publish, decision 28c1a536): src/components/layouts/CardsLayout.tsx's Container is maxW breakpoint-md, the v3 size token generated from the md breakpoint (768px), the legacy container.md, by plan [[1cc03cfabcf2]]. Waits in upstream for the bump plan [[99f2fe62c62f]]. The other half, the routes consuming CardsLayout, is the records of /contact, /legal and /tools-and-resources, and their list-role items cite this item as the cause.

- 2026-09-28: From the tools and resources split (plan a0b4d829f7a9): this item's Current says the 1.2.0 Wrap is a ul. It is not: Chakra v3's Wrap is one chakra.div (node_modules/@chakra-ui/react/dist/esm/components/wrap/wrap.js:9-27), so the list role is lost by the port on every card route. That difference is its own item, 2417fc2e82e5 on shell, fixed by the ui slice minted at the split; this item keeps the width half and the routes' consumption, the tools and resources re-port being the first route to consume CardsLayout.

- 2026-09-28: From the tools and resources re-port (plan 63d3330f8e00): /tools-and-resources consumes CardsLayout now, the first of its three routes (grep -rn CardsLayout app prints app/tools-and-resources/page.tsx:2, :13 and :22, the import, the element and its closing tag); /contact and /legal still compose their pages by hand, their records' to re-port. The width half, the Container at 2xl (672px) where legacy's container.md was 768px, is read on the route's pairs at 1280 as the card's wrap sitting in a narrower container than legacy's, and waits on the publish with the bump plan 99f2fe62c62f.

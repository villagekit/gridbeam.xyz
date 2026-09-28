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

- 2026-09-28: From the ui CardsLayout wrap slice (plan 4a780ccf1f6a): this item's Current said the 1.2.0 Wrap renders a ul. That claim was wrong (Chakra v3's Wrap is one chakra.div); the list is the shell item 2417fc2e82e5's, fixed in ../ui at ca72207 (Wrap as="ul"), which is upstream now. This item stays its width half, fixed at ui a4ef8ed, and the routes' consumption (/tools-and-resources consumes CardsLayout since the re-port; /contact and /legal are their records'); nothing on it changes here.

- 2026-09-28: From the contact re-port (plan 73062532dff7): /contact consumes CardsLayout now, the second of its three routes (grep -rn CardsLayout app prints app/contact/page.tsx:2, :14 and :21 beside app/tools-and-resources/page.tsx:2, :13 and :22); /legal still composes its page by hand, its record's to re-port. The width half, the Container at 2xl (672px) where legacy's container.md was 768px, is read on this route's pairs at 1280 as the one card's wrap sitting in a narrower container than legacy's, and waits on the publish with the bump plan 99f2fe62c62f.

- 2026-09-28: From the legal re-port (plan 70e5734d5b7a): /legal does not consume CardsLayout (grep -rln "<CardsLayout" app prints app/contact/page.tsx and app/tools-and-resources/page.tsx alone; a bare CardsLayout grep also matches the page's second ported-from comment, which names the legacy layout by URL). The re-port composes legacy's layout body in the route around the kept Policies heading (app/legal/page.tsx:19-29: Container maxW="breakpoint-md", Wrap as="ul" gap="8" justify="center" overflow="visible"), the width and the ul written from legacy's values, read at 768px max-width on the nearest .chakra-container above the ul at 1280, 768 and 375 on both sides. So the width half of this item, fixed at ui a4ef8ed, and the routes' consumption half reach two of the three routes at the bump, and the third waits on the operator's call on the legal verdicts plan d2beea2f9659: under call (a) the consumption half is given up for /legal by this note, under (b) or (c) a later slice sends the route onto CardsLayout.

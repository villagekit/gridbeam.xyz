---
title: "Tools and resources page: a Page with getLayout, CardsLayout and one inline LinkCard to CardEntry arrays mapped into two grids"
status: upstream
route: /tools-and-resources
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/tools-and-resources.tsx:9-30` `ToolsAndResourcesPage: Page` returning one `<LinkCard as="li" title icon={FaCut} description href linkComponent={NextLink} />`, with `getLayout` wrapping `MainLayout` and `<CardsLayout title="Tools and resources">`.

## Current

`app/tools-and-resources/page.tsx:40-108` `interface CardEntry { title, description, href, icon: ReactNode, isExternal? }`, `const tools: Array<CardEntry>` (3) and `const resources: Array<CardEntry>` (5), each `.map`ped into a `SimpleGrid` of `LinkCard`s (`:132-142,151-161`) inside a hand-composed `Main`, three `Section`s and `Title`s; `as="li"` is not passed; `linkComponent` is conditional on `isExternal`. `getLayout` and `NextSeo` are the shell items 1c05b1d0d3db and 65c21e08b3f1.

## Verdict

## Log

- 2026-09-28: The site half is done by plan 63d3330f8e00: app/tools-and-resources/page.tsx is one default-exported function returning CardsLayout title=Tools and resources around one LinkCard as=li with legacy's props in legacy's order (title, icon, description, href, linkComponent=NextLink), the CardEntry interface, the arrays, the .map and the conditional linkComponent gone; getLayout and NextSeo are the sanctioned 1c05b1d0d3db and 65c21e08b3f1, and the Page type and the named export are dropped because an app-router page.tsx carries no other named export. The one residual is the icon prop's element form, icon={<FaCut />} on page.tsx:17 where legacy wrote icon={FaCut}, forced by the published 1.2.0 LinkCard (icon?: ReactNode, dist/components/LinkCard.d.ts:9); the ui half, icon as a component type again, is committed at ../ui a4ef8ed (plan 1cc03cfabcf2), so the item parks upstream (decision 28c1a536, the planner's 075400f53a97 the precedent). The bump plan 99f2fe62c62f makes the one site edit on this route, icon={<FaCut />} to icon={FaCut} with FaCut imported from the client module its note names, then fixes this item.

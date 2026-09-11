---
title: "Tools and resources page: a Page with getLayout, CardsLayout and one inline LinkCard to CardEntry arrays mapped into two grids"
status: regression
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

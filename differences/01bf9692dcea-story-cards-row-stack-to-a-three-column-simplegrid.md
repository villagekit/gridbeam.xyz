---
title: "Story cards: row Stack to a three-column SimpleGrid"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:296-304` `<Stack justifyContent="center" direction={isWideScreen ? 'row' : 'column'} spacing={[4, null, 8]}>` of two cards; `audit/_root/1280/legacy.png`.

## Current

`app/page.tsx:274-278` `<SimpleGrid columns={{ base: 1, md: featuredStories.length === 2 ? 2 : 3 }} gap="10">` of three (two columns when only two stories are featured, a case legacy's fixed pair never had); `audit/_root/1280/current.png`.

## Verdict

## Log

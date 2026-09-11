---
title: "Search bar: InputGroup and InputRightElement to a hand-positioned Flex"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:23-46` `<InputGroup role="search" size="lg">` with `<InputRightElement>` for the clear button and icon.

## Current

`app/_components/catalogue/Catalogue.tsx:384-417` a `Box position="relative"` with an absolutely positioned `Flex`; `@villagekit/ui@1.2.0` exports neither `InputGroup` nor `InputRightElement` (`node_modules/@villagekit/ui/src/index.ts`).

## Verdict

## Log

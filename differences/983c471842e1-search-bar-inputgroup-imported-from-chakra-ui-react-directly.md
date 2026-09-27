---
title: "Search bar InputGroup: imported from @chakra-ui/react directly until the ui publish re-exports it"
status: upstream
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:1` at `fce357d` imports `InputGroup` and `InputRightElement` from `@villagekit/ui`, which 0.9.0 re-exported from Chakra v2 (`ea243f9d2f9e`).

## Current

`app/_components/catalogue/SearchBar.tsx:4` imports `InputGroup` from `@chakra-ui/react` directly, the site's first direct Chakra import, since `@villagekit/ui` 1.2.0 re-exports no `InputGroup`. The symbol is the same module the re-export will be: one `@chakra-ui/react` 3.35.0 in `node_modules`, a direct dependency, and `../ui/src/index.ts:62` at `7ee04a9` re-exports it from there. The designs index record's split recorded the stand-in as its call 4 (`f901cf9f724d`).

## Verdict

## Log

- 2026-09-27: Parked upstream at the mint (plan 8417428fd88a): the re-export is in ../ui at 7ee04a9 (`InputGroup` and `InputGroupProps` in src/index.ts, the ui slice d0d7111d6b45), waiting on the operator's publish; the bump plan 99f2fe62c62f carries the note naming the line to swap.

---
title: "InputGroup: re-exported by ui 0.9.0 from Chakra v2, absent from 1.2.0's re-exports"
status: upstream
route: shell
axis: code
kind: removed
---
## Legacy

`@villagekit/ui` 0.9.0 (`../ui` at `a5cbe36`, `src/index.ts:161-175`) re-exported Chakra v2's `InputGroup`, `InputLeftElement` and `InputRightElement` with their props types; `apps/gridkit/components/catalogue/search-bar.tsx:1,23-46` at `fce357d` composed `InputGroup` (with `id`, `role="search"`, `aria-label` and `size="lg"`) and `InputRightElement` (the clear button, or the search icon with `pointerEvents="none"`) from `@villagekit/ui` for the catalog's search bar.

## Current

`node_modules/@villagekit/ui/dist/index.d.ts:3` (1.2.0) re-exports Chakra v3's pieces without `InputGroup`, and the sibling's `src/index.ts` at `7922dd3` has none either. Chakra v3 folds the three into one `InputGroup` with `startElement` and `endElement` props and their `*ElementProps` (`node_modules/@chakra-ui/react/dist/esm/components/input-group/input-group.js`, exported at `dist/esm/components/index.js:124` of 3.35.0), the rule 4 form of legacy's markup. The site's search bar is a hand-positioned `Box` and `Flex` instead (`9d3e773a678c` on `/designs`); no file under `app/` imports from `@chakra-ui/react`.

## Verdict

## Log

- 2026-09-27: Filed regression at the designs index record's split (plan f901cf9f724d); the ui slice [[d0d7111d6b45]] beside the shell record adds the re-export in ../ui (decision 28c1a536, upstream at its commit, blocking the bump plan [[99f2fe62c62f]]); the catalog re-port [[8417428fd88a]] stands the import in from @chakra-ui/react until the bump and files that line as its own upstream item on /designs.

- 2026-09-27: Fixed in ../ui at commit 7ee04a9 by the ui slice [[d0d7111d6b45]]: InputGroup in the @chakra-ui/react value re-export block and InputGroupProps in the type block of src/index.ts, Chakra v3's one component with startElement and endElement over the 0.9.0 InputGroup, InputLeftElement and InputRightElement (the 0.9.0 block is a5cbe36 src/index.ts:160-176, the type block 160-167 and the value block 169-176; the Current section's 161-175 is a sub-range of it). Under the file:../ui override a module importing InputGroup and InputGroupProps from @villagekit/ui typechecks clean. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] swaps the catalog search bar's import from @chakra-ui/react to @villagekit/ui and moves it to fixed.

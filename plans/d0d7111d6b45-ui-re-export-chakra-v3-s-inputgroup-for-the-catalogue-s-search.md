---
title: "ui: re-export Chakra v3's InputGroup for the catalogue's search bar"
status: todo
tags:
  - "worker:fable"
parent: 337e35d86920
derived_from: a78b167170b8
---
The ui package re-exports Chakra's `InputGroup` again: the 0.9.0 ui re-exported Chakra v2's `InputGroup`, `InputLeftElement` and `InputRightElement` (`../ui` at `a5cbe36`, the sibling's first commit and the 0.9.0 source, `src/index.ts:161-176`), which legacy's catalog search bar composed (`apps/gridkit/components/catalogue/search-bar.tsx:23-46` at `fce357d`), and 1.2.0 re-exports neither (`node_modules/@villagekit/ui/dist/index.d.ts:3`), so the site's search bar was hand-positioned instead ([[9d3e773a678c]] on `/designs`). Chakra v3 folds the three into one `InputGroup` with `startElement` and `endElement` props (`node_modules/@chakra-ui/react/dist/esm/components/input-group/input-group.js`), the rule 4 form of legacy's markup; this slice adds it to the package's Chakra re-export block and closes the shell item filed at the designs index split, `InputGroup: re-exported by ui 0.9.0 from Chakra v2, absent from 1.2.0's re-exports`. A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint). The site's search bar re-port stands the import in from `@chakra-ui/react` until the publish and files its own item. Beside the shell record `a78b167170b8` (decision `40abdb2f222a`); minted at the designs index record's split (`f901cf9f724d`). A change in `../ui`, so Fable.

## Work

- `../ui/src/index.ts`: `InputGroup` and `type InputGroupProps` added to the `@chakra-ui/react` re-export block that carries `Group`, `Field` and the other Chakra pieces (the block ending at `:80`, read first; if `InputGroupProps` is not a named export of `@chakra-ui/react` 3.35.0, `dist/types/components/input-group/input-group.d.ts` says what its props type is called). Nothing else: no wrapper, no recipe, since Chakra v3's `InputGroup` is a `Group` with two `InputElement` slots and takes the ui `Input` as its child unchanged.
- `../ui/CHANGELOG.md`: one line under the unreleased version's Added, `InputGroup` re-exported from Chakra, the successor of the 0.9.0 `InputGroup` and `InputRightElement` (`endElement`), for a search bar with a trailing button or icon.
- Verify first: `grep -c 'InputGroup' ../ui/src/index.ts` prints 0; `grep -n 'InputGroup' node_modules/@chakra-ui/react/dist/esm/components/index.js` prints its export line (`:124` at 3.35.0); `git -C ../ui status --short` prints nothing and `git -C ../ui log --oneline -1` reads `7922dd3`.
- Docs: the CHANGELOG line above.
- Not this slice: the site's search bar (the catalog re-port, `Designs catalog re-ported from the legacy catalogue components and context, with the page and its layout`, which imports `InputGroup` from `@chakra-ui/react` until the publish and files that line as its own `upstream` item with a bump note); a Storybook story for a bare re-export.

## Seams under test

None pure; the proof is the package's build and a type-check of the re-export.

## Done when

- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` (`dist/index.d.ts` names `InputGroup` in its Chakra re-export line) and `pnpm build:storybook` green; the change committed by pathspec on its `main` (`src/index.ts`, `CHANGELOG.md`), not pushed
- On this site under the uncommitted `file:../ui` override with `transpilePackages` (CLAUDE.md's ui row), a throwaway module importing `InputGroup` from `@villagekit/ui` passes `pnpm typecheck`; the override and the entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`)
- The shell item is `upstream` with a note citing the sibling commit, and `99f2fe62c62f` is `blocked_by` this slice (the edge from the mint), both checked at the finish; the bump plan's note naming the site line to swap is the catalog re-port's to write, not this slice's
- `timeout 900 just check` is green against the published 1.2.0 (no site code changes in this commit)

## Outcome

## Log

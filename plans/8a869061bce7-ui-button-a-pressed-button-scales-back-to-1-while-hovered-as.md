---
title: "ui Button: a pressed button scales back to 1 while hovered, as under Chakra v2"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
Every ui button drops back to its size while pressed, as on the legacy site: the recipe base's `_active` transform `scale(1)` wins over the `_hover` transform `scale(1.08)` while the pointer is down and over the button. Closes [[d2f1007d7d37]] on `shell` for the shell record `a78b167170b8`, finished before the item was found (decision `40abdb2f222a`, a slice beside the record). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit), reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui/src/components/Button.tsx:29-35` the recipe base writes `'&:not(:disabled)': { _hover: { transform: 'scale(1.08)' }, _active: { transform: 'scale(1)' }, _focus: { boxShadow: 'outline' } }`, legacy's `@villagekit/ui@0.9.0 src/components/Button.tsx:41-48`. Chakra v3 emits the active rule before the hover rule at equal specificity (`(0,4,0)`, the hover rule under `@media (hover: hover)`), so the hover transform wins on press; Chakra v2 emitted the active rule after the hover rule. Make the active transform win while hovered with the smallest change that keeps every other button state as it renders today: the candidates the worker weighs against the sources (`node_modules/@chakra-ui/react/dist/esm/styled-system/`, the emitted CSS on `pnpm dev`) are the active state written with a selector the hover rule cannot beat (`_active` nested under `_hover` as well as beside it, or a compound `&:hover:active` selector), or the order of the two keys in the recipe if Chakra v3 emits conditions in object order (verify first). Read the legacy cascade before choosing; the color states of the variants stay as they are.
Verify first: on the live legacy site at 375 the mobile menu toggle's computed transform is `matrix(1.08, 0, 0, 1.08, 0, 0)` on hover and `matrix(1, 0, 0, 1, 0, 0)` on press; on `pnpm dev` under the override it is `matrix(1.08, 0, 0, 1.08, 0, 0)` on both (the scratchpad's `toggle-probe.mjs` from plan `61a42a0adbc8` reads both).
Docs: `../ui/CHANGELOG.md`, an entry under Fixed.
Not this slice: the toggle's colors ([[c440126f7064]], shipped by `61a42a0adbc8`).

## Seams under test

None pure; the proof is a Playwright probe of the computed transform on `pnpm dev` under the override, against the live legacy site.

## Done when

- A Playwright probe at 375 on `/faq` reads the toggle's computed `transform` as `matrix(1.08, 0, 0, 1.08, 0, 0)` on hover and `matrix(1, 0, 0, 1, 0, 0)` on press, on `pnpm dev` under the override and on the live legacy site alike, and the primary header action at 1280 the same
- The hover, press and focus colors of the four variants are unchanged by the change (read before and after)
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[d2f1007d7d37]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish)
- The override reverted by path (`git restore -- package.json pnpm-lock.yaml`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log

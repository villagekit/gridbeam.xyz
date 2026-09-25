---
title: "ui IconButton: the toolbar variant's hover and press colors win over the toggle's rest color"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
The mobile menu toggle hovers and presses pink again, as on the legacy site: the `toolbar` variant's `_hover` and `_active` color `primary.500` wins over the toggle's rest color `gray.900`, which Chakra v3 emits unlayered as a style prop above the recipe's cascade layer. Closes [[c440126f7064]] on `shell` for the shell record `a78b167170b8`, finished with this slice minted beside it (decision `40abdb2f222a`). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit), reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui`: `src/components/nav/NavHeader.tsx` renders the toggle as `<IconButton variant="toolbar" color="gray.900">`; `src/components/Button.tsx`'s `toolbar` variant colors the icon `gray.700` at rest, `primary.500` under `_hover` and `_active` (`&:not(:disabled)`) and `gray.700` on `_focus`. Legacy (`packages/ui-nav/src/components/NavHeader.tsx:82-88` at `fce357d`, `@villagekit/ui@0.9.0 src/components/Button.tsx:122-138`) wrote the same two lines under Chakra v2, where the variant's nested selectors beat the `sx` color: `gray.900` at rest, `primary.500` on hover and press. Put the rest color where the recipe's states beat it: the smallest change that keeps every other `toolbar` button as it renders today (the header action and any consumer's), with its reason in a comment naming the layering constraint. Candidates the worker weighs against the sources (`node_modules/@chakra-ui/react`, the emitted CSS on `pnpm dev`): the toggle's color written with its states (`css={{ color: 'gray.900', _hover: ..., _active: ..., _focus: ... }}` mirrors the recipe, a duplication), a `toolbar` compound or a second variant carrying `gray.900` at rest, or the recipe's states raised above the style prop. Read the legacy cascade before choosing; do not change the header action's colors.
Verify first: on the live legacy site at 375 the toggle's computed color is `rgb(23, 25, 35)` at rest and `rgb(213, 63, 140)` on hover over the `primary.400` 10% fill; on `pnpm dev` with the published 1.2.0 it is `rgb(24, 24, 27)` on both (the palette slice's v2 literals make the rest `rgb(23, 25, 35)` under the override).
Docs: `../ui/CHANGELOG.md`, an entry under Fixed.
Not this slice: the wordmark wrap at 768 ([[1d2562d6b3bc]], the operator's on plan `77cf83a1285a`).

## Seams under test

None pure; the proof is a Playwright probe of the computed color on `pnpm dev` under the override, against the live legacy site.

## Done when

- A Playwright probe at 375 on `/faq` reads the toggle's computed `color` as `rgb(23, 25, 35)` at rest, `rgb(213, 63, 140)` on hover and on press, over the `primary.400` 10% fill, on `pnpm dev` under the override and on the live legacy site alike
- The header action's computed colors at rest, hover and focus are unchanged by the change (read before and after)
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[c440126f7064]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish)
- The override reverted by path (`git restore -- package.json pnpm-lock.yaml`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log

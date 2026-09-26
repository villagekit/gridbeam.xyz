---
title: "ui HoverCardContainer: the nested hover-card selectors in Chakra v3's form, the console clean"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
`HoverCardContainer` styles a nested `HoverCard` on hover and focus-within again, and the browser console is clean on every route that renders one, as under `@villagekit/ui@0.9.0`: the two bare class keys under `_focusWithin` and `_hover` are written in the form Chakra v3's `css` reads as a nested selector. Closes [[7877c267268c]] on `shell` for the shell record `a78b167170b8`, finished before the item was found (decision `40abdb2f222a`, a slice beside the record). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit) beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` that the `src/` copy needs (CLAUDE.md's ui row), both reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui/src/components/HoverCard.tsx:74-79` `HoverCardContainer` writes `_focusWithin: { '.ui-hover-card': focusStyle }` and `_hover: { '.ui-hover-card': hoverStyle, ...containerHoverStyle }`, legacy's `@villagekit/ui@0.9.0 src/components/HoverCard.tsx:68-90` under Chakra v2's `sx`, which read a bare class key as a nested selector. Chakra v3's `css` treats only a key holding `&` or `@`, or starting with `_`, as a condition (`node_modules/@chakra-ui/react/dist/esm/styled-system/conditions.js:5,14`), so `.ui-hover-card` is flattened into a property and Emotion logs `Using kebab-case for css properties in objects is not supported. Did you mean .uiHoverCard?` once per page as a console error, which Next's dev overlay shows as `1 Issue`. Write the two keys as `'& .ui-hover-card'`, the form the site's re-ports use for a nested selector (`app/_components/stories/Item.tsx`'s `'& .stories-item-image'`), with the constraint in a comment; `HoverCard` itself and the container's own hover and focus-within styles stay as they are. One consumer on this site nests a `HoverCard` in a container, the catalog's `ItemCard` (`app/_components/catalogue/ItemCard.tsx:26,29`, legacy's `components/catalogue/item.tsx:33,48` at `fce357d`), so on `/designs` a hovered card's inner `.ui-hover-card` takes the `accentB.100` fill and `accentB.300` border again (`HoverCard.tsx:10-13`), lost today, and a focused one the `outlineColor` border; the story cards nest none, so on `/` and `/stories` the change is the console alone.
Verify first: on `pnpm dev` with the published 1.2.0 the browser console on `/`, `/stories` and `/designs` prints the kebab-case error once each; the emitted stylesheet holds no rule for `.ui-hover-card` under the container's hover.
Docs: `../ui/CHANGELOG.md`, an entry under Fixed.
Not this slice: any other console line on those routes (the design pages' `941bd045b043` and `505a856301b8` are their ledger's, the `next/image` LCP warning on `/stories` is nobody's item).

## Seams under test

None pure; the proof is the browser console and the emitted stylesheet on `pnpm dev` under the override.

## Done when

- On `pnpm dev` under the override, a Playwright console capture on `/`, `/stories` and `/designs` holds no `kebab-case` line, and Next's dev overlay shows no issue badge from it
- The emitted stylesheet holds a rule for `.ui-hover-card` nested under the container's hover selector and one under its focus-within selector, carrying `hoverStyle` and `focusStyle` (a stylesheet dump, saved beside the capture); the story cards on `/` and `/stories` and the design cards on `/designs` still scale on hover with the pointer cursor
- A Playwright probe at 1280 on `/designs` under the override reads, with the pointer on a card, the inner `.ui-hover-card`'s `background-color` and `border-color` as the `accentB.100` and `accentB.300` values, and with focus inside the card the `outlineColor` border, the readings of the live legacy site's same card
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[7877c267268c]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note that the bump makes no site edit for it
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log

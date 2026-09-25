---
title: ui LinkCard and CardsLayout re-ported from 0.9.0
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by: 1c74a465996d
tags:
  - "worker:fable"
priority: medium
---
`LinkCard` is 0.9.0's again: a `3xs` by `64` box padded 4 by 8 with its content spread by `space-around`, an inherited-colour icon passed as a component type and exposed as legacy's tree exposes it, an `h2` heading, and the wrapper's `aria-label`; `CardsLayout`'s container is legacy's `container.md` width. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `28c1a536`, `bfa9a416`.

## Work

- Legacy source: `@villagekit/ui@0.9.0 src/components/LinkCard.tsx` (`npm pack` into the scratchpad) and `../node-modules/packages/ui-page/src/components/layouts/CardsLayout.tsx` at `fce357d`. Current: `../ui/src/components/{LinkCard,HoverCard}.tsx`, `layouts/CardsLayout.tsx`, `stories/LinkCard.stories.tsx` if present.
- `852324855146`, `7a92b233069a`: the `HoverCard` at `height: 64`, `paddingX: 4`, `paddingY: 8`, `width: '3xs'`, the `Stack` `justifyContent="space-around"` at full height; no `h="full"` stretch on the `LinkBox`.
- `a01b12fe36e0`: no `color` on the icon.
- `ca0c2398f054`: `icon: React.ComponentType`, required, rendered `<Icon as={IconComponent} w="8" h="8" />`. This site's call sites pass elements today (`grep -rn "icon={<\|icon: <" app`: `app/page.tsx`, `app/about/page.tsx`, `app/legal/page.tsx`, `app/subscribe/page.tsx`, and `app/tools-and-resources/page.tsx` in its data entries), so the bump adapts them: `kipu note 99f2fe62c62f` naming each file and the edit (`icon={<FaCut />}` to `icon={FaCut}`, `icon: <FaCut />` to `icon: FaCut`); with the override in place `pnpm typecheck` is red on those files for that reason alone, and the Outcome lists the errors and confirms nothing else breaks.
- `2c024e4d002a`: the icon exposed as legacy's live tree exposes it, an unnamed `img` before the heading (`audit/legal/dom/legacy.aria.yaml:24`); v3's `Icon` writes `aria-hidden`, so override it. The live tree is the visual and interaction truth (`bfa9a416`).
- `bd05a2d3642d`: `Heading size="md"` with no `as`; confirm v3's `Heading` renders `h2` by default (`node_modules/@chakra-ui/react/dist/esm/components/heading/index.js`) else set `as="h2"`. The routes that put an `h2` above the cards have their own outline items.
- `2cbb4f4b8497`: `aria-label={title}` on the `HoverCard` wrapper as 0.9.0 had; the overlay anchor stays unnamed as on both sides (naming it is the accessibility pass after M2, note `eeba2a65cee4`, not this port).
- `8a3babf21c3c`: `Container maxW` at the v3 token for 768 px (`breakpoint-md`, generated from the breakpoints in `node_modules/@chakra-ui/react/dist/esm/styled-system/token-dictionary.js`; confirm the rendered `--chakra-sizes-breakpoint-md` is `48rem`); the routes' consumption of `CardsLayout` is their records' (`/contact`, `/legal`, `/tools-and-resources`), so the item's note says the width half landed here.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- Verify on this site through the override on `/legal` and `/tools-and-resources` at 1280 against `audit/legal/1280/legacy.png` and `audit/tools-and-resources/1280/legacy.png` (the cards' size and spread; the routes' own grid items remain).
- Closes (to `upstream`) `852324855146`, `7a92b233069a`, `a01b12fe36e0`, `bd05a2d3642d`, `2c024e4d002a`, `ca0c2398f054`, `2cbb4f4b8497`, `8a3babf21c3c`.
- Not this slice: the routes' layouts around the cards.

## Seams under test

None pure.

## Done when

- with the override in place (and the call sites edited locally to pass component types for the check, reverted with the override): every card on `/legal` and `/tools-and-resources` measures 224 by 256 px with its icon near-black, the tree shows an unnamed `img` before each card's `h2`, and the wrapper carries `aria-label` equal to the title; the override then reverted and `git status --porcelain` clean of the probe
- in `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` are green and the commit there is by pathspec, its hash in each item's note
- the eight items are `upstream`, `99f2fe62c62f` is `blocked_by` this slice and carries the bump note, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log

- 2026-09-26: From the framework boundary slice (plan 1c74a465996d, ui commit 4e11d57): the mechanism to follow is the framework context in ../ui/src/framework.tsx, filled by NavContextProvider({ items, usePathname?, linkComponent? }) and read through useFramework() by every composite that renders its own anchors; the leaf link components keep the explicit `as`. The override that shows a sibling change on this site is pnpm.overrides["@villagekit/ui"] = "file:../ui" (link: fails under next dev --turbopack), with pnpm install after each sibling edit, reverted by `git restore -- package.json pnpm-lock.yaml` and `pnpm install --frozen-lockfile` before the commit.

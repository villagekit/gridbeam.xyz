---
title: "ui nav: the inline mobile menu panel re-ported"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by: 1c74a465996d
tags:
  - "worker:fable"
priority: medium
---
The mobile menu is legacy's again: a panel that slides in under the sticky header with no backdrop and one toggle, the toggle named `Toggle menu` and wired to the panel by `aria-controls` and `aria-expanded`, the list padded 4, focus held inside and Escape closing it. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f` (rule 4 covers the loss of v2's `Slide` and no more), `28c1a536`.

## Work

- Legacy source: `../node-modules/packages/ui-nav/src/components/{NavHeader,NavMobileMenu}.tsx` at `fce357d` (v2 `useDisclosure`'s `getButtonProps` and `getDisclosureProps`, `react-focus-on`, a `Slide` offset by `useTopNavHeight`, a `role="toolbar"` region). Current: `../ui/src/components/nav/{NavHeader,NavMobileMenu}.tsx` (an Ark `Drawer` in a portal with a backdrop and a second close button).
- `e6d3a2a3181a`, `5070227f4411`, `077f0641851a`: re-port the two files onto the framework boundary slice's mechanism: the slide as Chakra v3's `Presence` with a slide-from-left animation (already in `@chakra-ui/react`; weigh it against adding `motion` to the package and say which won), `top: topNavHeight`, the panel under the header, no portal, no backdrop, no second close button; the toggle `title="Toggle menu"` with `aria-expanded` and `aria-controls` naming the panel's id; focus held and Escape handled through `react-focus-on` (MIT, the legacy dependency) or Ark's focus trap from the same package; `containerProps={{ alignItems: 'flex-start', py: 4 }}` on the list; the `data-autofocus` focus on open as legacy's `handleActivation` did.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- Verify on this site through the override at 375 with the menu open: a Playwright snippet in the scratchpad clicks the toggle, saves a screenshot and prints the accessibility snapshot, since the audit tooling captures the menu closed.
- Closes (to `upstream`) `e6d3a2a3181a`, `5070227f4411`, `077f0641851a`.
- Not this slice: the top nav's items and order (the site's nav slice); the header brand (its site slice).

## Seams under test

None pure.

## Done when

- with the override at 375: the toggle's `aria-controls` names the panel and `aria-expanded` flips with it; the open panel sits below the header with no backdrop, no `dialog` role and one toggle; Escape closes it and focus returns to the toggle; the list's vertical padding is 16 px; the override then reverted
- in `../ui`: `pnpm lint`, `pnpm types` and `pnpm build:pkg` are green and the commit there is by pathspec, its hash in each item's note
- the three items are `upstream` and `99f2fe62c62f` is `blocked_by` this slice, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log

- 2026-09-26: From the framework boundary slice (plan 1c74a465996d, ui commit 4e11d57): the mechanism to follow is the framework context in ../ui/src/framework.tsx, filled by NavContextProvider({ items, usePathname?, linkComponent? }) and read through useFramework() by every composite that renders its own anchors; the leaf link components keep the explicit `as`. The override that shows a sibling change on this site is pnpm.overrides["@villagekit/ui"] = "file:../ui" (link: fails under next dev --turbopack), with pnpm install after each sibling edit, reverted by `git restore -- package.json pnpm-lock.yaml` and `pnpm install --frozen-lockfile` before the commit.

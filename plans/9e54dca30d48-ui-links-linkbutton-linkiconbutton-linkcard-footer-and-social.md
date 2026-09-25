---
title: "ui links: LinkButton, LinkIconButton, LinkCard, Footer and Social render rel noopener for an external href"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
The five ui components that still write `rel="noopener noreferrer"` render what legacy rendered for an external link: `noopener`, what Chakra v2's `Link` wrote for `isExternal`, the mechanism the recipes slice `45d6f5634a11` gave the ui `Link` and the mdx slice `bc0407533650` gave `MdxLink`. Closes [[f85e98a67092]] on `shell` for the shell record `a78b167170b8`, finished with this slice minted beside it (decision `40abdb2f222a`). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit), reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui`, one line each: `src/components/LinkButton.tsx:29`, `src/components/LinkIconButton.tsx:26` and `src/components/LinkCard.tsx:71` write `rel={isExternal ? 'noopener noreferrer' : undefined}`; `src/components/layouts/Footer.tsx:127,148` and `src/components/Social.tsx:85` write `target="_blank" rel="noopener noreferrer"` on the ui `Link` directly. Legacy at `fce357d`: `Footer` and `Social` rendered their external links through the ui `Link` with `isExternal` (Chakra v2's `noopener`), so those two take `isExternal` on the `Link` and drop the two attributes; `LinkCard` passed `isExternal` to Chakra v2's `LinkOverlay` (`noopener`), so its overlay writes `noopener`; 0.9.0's `LinkButton` and `LinkIconButton` took no `isExternal` and wrote no `rel`, the caller passing `target` and `rel`. For those two, keep 1.2.0's `isExternal` prop and render `noopener` for it, the smallest change that is not a breaking change for a consumer; dropping the prop is the 0.9.0 shape and a Breaking entry, the worker's call stated in the Outcome. Read `d04a1827b838`'s Log for the `noopener` evidence against Chakra v2's `Link` source.
Verify first: `grep -rn noreferrer ../ui/src` lists exactly those five lines.
Docs: `../ui/CHANGELOG.md`, an entry under Fixed; the TSDoc on each `isExternal` prop says `rel="noopener"`, as `Link.tsx`'s does.
Not this slice: the story pages' own links; any site-side `rel` (the routes' ledgers).

## Seams under test

None pure; the proof is the rendered markup on `pnpm dev` under the override.

## Done when

- `grep -rn noreferrer ../ui/src` prints nothing
- On `pnpm dev` under the override, the footer's external links, the social links and an external `LinkCard` on `/tools-and-resources` render `target="_blank" rel="noopener"` (read with `curl` or `pnpm audit:dom`); an internal footer link renders neither attribute
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[f85e98a67092]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish)
- The override reverted by path (`git restore -- package.json pnpm-lock.yaml`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log

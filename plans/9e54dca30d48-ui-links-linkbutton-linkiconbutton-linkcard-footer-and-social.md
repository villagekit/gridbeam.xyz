---
title: "ui links: LinkButton, LinkIconButton, LinkCard, Footer and Social render rel noopener for an external href"
status: done
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

Shipped in `../ui` as commit 46eab3c on its `main` (not pushed; the push goes with the operator's publish, decision `28c1a536`), by pathspec: `CHANGELOG.md`, `src/components/{LinkButton,LinkIconButton,LinkCard,Social}.tsx`, `src/components/layouts/Footer.tsx`. The package version stays 1.2.0.

What shipped: `LinkButton` and `LinkIconButton` pass `isExternal` through to the ui `Link`, which renders it as `target="_blank" rel="noopener"` since the recipes slice, the 0.9.0 shape (`Button as={Link}` with `isExternal` among the link props); `Footer`'s external column links, its villagekit.com credit and `Social`'s external links render `<Link isExternal>` as `packages/ui-page/src/components/Footer.tsx:89` and `packages/ui-brand/src/components/{Footer.tsx:47,Social.tsx:72}` did at `fce357d`, in place of the explicit `target` and `rel`. The TSDoc on the three `isExternal` props names the rendered `rel`, and the CHANGELOG has a Fixed entry.

Deviation from the plan's letter, on evidence: `LinkCard`'s overlay keeps `rel="noopener noreferrer"` and only its TSDoc changed, so `grep -rn noreferrer ../ui/src` prints `LinkCard.tsx:30,71` on purpose. The plan's Work line said Chakra v2's `LinkOverlay` wrote `noopener`; its source (`@chakra-ui/layout@2.3.1`, `chunk-NRJBSIIZ.mjs:16`, `npm pack` into the scratchpad) writes `rel: isExternal ? "noopener noreferrer" : rel`, where its `Link` (`chunk-K7XRJ7NL.mjs:19`) writes `noopener`, and the live legacy `/stories` renders its four external story cards (legacy's `LinkOverlay isExternal`) as `rel="noopener noreferrer" target="_blank"`; the M1 item `ed16aad27638` (sanctioned, rule upgrade) already recorded both. No legacy route passed `isExternal` to a `LinkCard`, so the Done when's external card on `/tools-and-resources` has no legacy counterpart (those two cards are `25f533094133`). A second correction: the plan and the item said 0.9.0's `LinkButton` and `LinkIconButton` took no `isExternal`; 0.9.0's `LinkButtonProps` is `Omit<ButtonProps, 'isDisabled'> & Omit<LinkProps, 'variant'>` and its `Link` declares `isExternal`, so the prop existed and rendered `noopener` through Chakra v2's `Link`; keeping it is the 0.9.0 shape, not a breaking question. Both corrections are notes on `f85e98a67092`, its Legacy section left as filed.

Verified: in `../ui`, `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green (1077 `"use client"` directive warnings, the baseline's). On this site under the `file:../ui` override, with `app/_components/SiteFooter.tsx` swapped for the brand footer slice's thin version (so the ui `Footer` renders) and the LinkCard bump note's `app/_lib/icons.ts` probed on `/tools-and-resources` (all reverted by path): `/faq`, `/suppliers` and `/tools-and-resources` served 200; the footer's seven external social links and the villagekit.com credit render `target="_blank" rel="noopener"` on each, as the live legacy `/faq` does; an internal footer link renders `<a href="/designs">` with neither attribute; `/suppliers`' two `LinkButton isExternal` render `rel="noopener"`; the two `LinkCard` overlays on `/tools-and-resources` render `rel="noopener noreferrer"`. No screenshot pairs: the change is anchor attributes, invisible on a screenshot; the saved HTML is the stand-in. The override reverted by path and `pnpm install --frozen-lockfile` run; `timeout 900 just check` green against the published 1.2.0 (78 tests).

Reviews on three fresh Opus sub-agents (Standards, Spec, Parity), none critical. Taken: `isExternal` passed through to `Link` in both buttons rather than the ternaries repeated (Standards, Spec: one home for the value, and 0.9.0's shape); the CHANGELOG's "1.2.0 wrote it on all four" narrowed, since `Social` and the credit are new in Unreleased (Spec, checked with `git grep noreferrer v1.2.0`); the two correcting notes on `f85e98a67092`; a correcting note on `ecfa31cea5a0`, whose fix note said the ui `Link` renders `noopener noreferrer`. Parity found the routes' own anchors writing `noopener noreferrer` in their JSX where legacy rendered `<Link isExternal>` (`noopener`), with no ledger item: filed as `154bcd2abdfb` (`/faq`, six anchors) and `58252b32e362` (`/`, two), regression, code, for their route records; the privacy policy's, contact's and legal's sit under `f0fe0e2150da`, `fc861bd50946` and `d3f88003fbfb`. `StoryCard`'s `noopener noreferrer` on its `LinkOverlay` matches legacy's overlay output and gets no item. Dropped: nothing. The two shell items filed after the verdicts plan, `c14d1a8d177f` and `53f8a05a03fa`, are untouched.

Items: `f85e98a67092` moved to `upstream` with the ui commit in its note; `99f2fe62c62f` already `blocked_by` this slice (written at the mint) and carrying a note that no site edit follows beyond the brand footer's swap, and what the bump's DOM extraction should show. No visitor-facing copy in the change. This was the last `../ui` slice beside the shell record; `a849fca1426c` is site-side.

## Log

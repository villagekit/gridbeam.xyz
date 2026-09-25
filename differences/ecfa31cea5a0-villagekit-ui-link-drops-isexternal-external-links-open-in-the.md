---
title: "@villagekit/ui Link drops isExternal: external links open in the same tab"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Link.tsx:6-14,23` `LinkProps.isExternal` forwarded to Chakra v2 `Link`, which renders `target="_blank" rel="noopener noreferrer"`.

## Current

`@villagekit/ui@1.2.0 src/components/Link.tsx:6-8,16` `LinkProps` omits `isExternal` and spreads the props onto Chakra v3 `Link`, which has no such prop; the anchors render with no `target` or `rel` (`curl localhost:3000/stories/whats-a-grid-unit`: `<a href="https://civilchapola.medium.com/..." class="chakra-link ...">`). Call sites still pass it: `content/stories/whats-a-grid-unit.mdx:60,74,241,255`, `content/stories/how-to-furniture-bolts.mdx:307`, `content/stories/2021-winter-newsletter.mdx:46,64`. The site's other external links go through `LinkButton`, `LinkCard` and `LinkIconButton`, which keep their own `isExternal` (`src/components/LinkButton.tsx:9,28-29`), or pass `target` and `rel` themselves (`app/_components/SiteFooter.tsx`).

## Verdict

## Log

- 2026-09-12: Found by the stories ledger (plan 843901f4); a ui fix lands in ../ui and waits for a publish.

- 2026-09-26: From the recipes slice [[45d6f5634a11]]: the Legacy line above overstates v2. Chakra v2's `Link` (`@chakra-ui/layout@2.3.1`, the version the legacy lockfile pins) renders `isExternal` as `target="_blank" rel="noopener"`, and the live legacy story page shows `rel="noopener"`; only v2's `LinkOverlay` wrote `noopener noreferrer`. The port renders `noopener`.

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Link.tsx: LinkProps.isExternal renders target _blank and rel noopener noreferrer; the External story in stories/Link.stories.tsx carries it. Waits in upstream for the bump plan [[99f2fe62c62f]].

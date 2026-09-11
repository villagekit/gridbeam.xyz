---
title: "@villagekit/ui Link drops isExternal: external links open in the same tab"
status: regression
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

---
title: "Tools and resources cards: a ul of li cards to grid divs"
status: upstream
route: /tools-and-resources
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/tools-and-resources.tsx:12` `<LinkCard as="li" ...>` inside `CardsLayout`'s `Wrap` (`<ul class="chakra-wrap__list">`): `audit/tools-and-resources/dom/legacy.aria.yaml` `list: - listitem "Cutting planner"` (the `li` named by the HoverCard `aria-label`).

## Current

No `as="li"` on any of the eight `LinkCard`s and no list around them (`app/tools-and-resources/page.tsx:131-161` `SimpleGrid`): no `list` or `listitem` under `main` in `audit/tools-and-resources/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: The shell cause is the CardsLayout item 8a3babf21c3c; this item is the route's outcome.

- 2026-09-28: The site half is done by plan 63d3330f8e00: app/tools-and-resources/page.tsx:15 writes as=li on the one LinkCard inside the ui CardsLayout, legacy's line. On the published 1.2.0 the li sits in the Wrap's div (Chakra v3's Wrap is one chakra.div), so audit/tools-and-resources/dom/current.aria.yaml shows listitem under main with no list around it, where legacy's shows list then listitem. The ul is the ui slice 4a780ccf1f6a's (the shell item 2417fc2e82e5), which moves this item; it stays regression until then.

- 2026-09-28: Both halves are done: the site half by the re-port (plan 63d3330f8e00, app/tools-and-resources/page.tsx:15 as="li" on the one LinkCard inside the ui CardsLayout, legacy's line), and the ul by ../ui commit ca72207 (plan 4a780ccf1f6a, CardsLayout's Wrap rendered as a ul, the shell item 2417fc2e82e5). Under the file:../ui override on pnpm dev the route's aria tree under main is legacy's line for line: heading "Tools and resources" [level=1], then list holding listitem "Cutting planner" with the img, heading "Cutting planner" [level=2], the paragraph and the link to /tools/cutting-planner. Waits in upstream for the bump plan 99f2fe62c62f, which fixes it after its DOM extraction reads the same on the published package; no site edit is needed.

---
title: "CardsLayout wrap: Chakra v2's ul.chakra-wrap__list to Chakra v3's Wrap div, so the cards lose their list"
status: upstream
route: shell
axis: accessibility
kind: changed
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:24` at `fce357d`: `<Wrap spacing={8} justify="center" sx={{ overflow: 'visible' }}>`. Chakra v2's `Wrap` renders `div.chakra-wrap` around `ul.chakra-wrap__list` (`listStyleType: none`, `padding: 0`, the gap on the list), so the cards are a `list`: `audit/tools-and-resources/dom/legacy.aria.yaml` `list: - listitem "Cutting planner"`, where the page passes `as="li"` on its `LinkCard` (`apps/gridkit/pages/tools-and-resources.tsx:12`), and `audit/legal/dom/legacy.aria.yaml:23-38` and the contact tree a `list` holding the cards' contents, where the contact and legal pages pass no `as`.

## Current

`@villagekit/ui@1.2.0 dist/components/layouts/CardsLayout.js` and the sibling `../ui/src/components/layouts/CardsLayout.tsx:24` at `6b18227`: `<Wrap gap="8" justify="center" overflow="visible">`. Chakra v3's `Wrap` is one `chakra.div` with `display: flex; flex-wrap: wrap` and no list element (`node_modules/@chakra-ui/react/dist/esm/components/wrap/wrap.js:9-27`), so a consumer's `as="li"` lands inside a `div` and no `list` is exposed. No route consumes the ui `CardsLayout` yet, so no current pair shows it; the shell item 8a3babf21c3c's Current says the 1.2.0 `Wrap` is a `ul`, which it is not.

## Verdict

## Log

- 2026-09-28: Filed at the tools and resources record's split (plan a0b4d829f7a9): no rule of 2032533f covers a list role lost by the ui's port, so regression. The three route items whose cause was cited as 8a3babf21c3c (3f0cb2c1395a, 30adc5dc852e, e005d2df8c8a) have this item as their cause; 8a3babf21c3c keeps the width half (upstream at ui a4ef8ed) and the routes' consumption. The fix is the ui slice minted at the split, a Wrap rendered as a ul, which parks this item in upstream for the bump plan 99f2fe62c62f (decision 28c1a536).

- 2026-09-28: Fixed in ../ui as commit ca72207 on its main over 6b18227 (not pushed; the push goes with the operator's publish, decision 28c1a536), by plan 4a780ccf1f6a: src/components/layouts/CardsLayout.tsx:24 renders the Wrap as a ul (Wrap as="ul" gap="8" justify="center" overflow="visible"), the element Chakra v2's chakra-wrap__list was; Chakra v3's preflight already sets the ul's margin and padding to 0 and its list style to none, so no style is added. Read under the file:../ui override on pnpm dev, on /tools-and-resources: audit/tools-and-resources/dom/current.aria.yaml under main is legacy's tree line for line (the h1, then list holding listitem "Cutting planner" with the img, the h2, the paragraph and the link to /tools/cutting-planner); a Playwright read at 1280 and 375 gives the ul padding 0px, margin 0px, list-style-type none, display flex, flex-wrap wrap, justify-content center, gap 32px, 736px wide at 1280 and 343px at 375, and the path ul > div > li[aria-label=Cutting planner], every reading the live legacy site's ul.chakra-wrap__list gives beside it. Waits in upstream for the bump plan 99f2fe62c62f. The legal and contact routes' list items (30adc5dc852e, e005d2df8c8a) close when their records consume CardsLayout after the publish.

- 2026-09-28: The reviews of plan 4a780ccf1f6a read one more thing on the pairs: legacy's ul sat inside an outer div.chakra-wrap, and Chakra v3's one-element Wrap renders none, so the ul.chakra-wrap is a direct child of the container's div. No visible effect; filed as its own code item 760c0c51b389 on shell, open for the operator. This item stays the list role alone.

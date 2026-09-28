---
title: "Legal cards: the list role around the cards dropped"
status: fixed
route: /legal
axis: accessibility
kind: changed
---
## Legacy

`CardsLayout.tsx:24` `Wrap` renders `<ul class="chakra-wrap__list">` around the three cards: `audit/legal/dom/legacy.aria.yaml:23` a `list` holding them.

## Current

`app/legal/page.tsx:52` `<SimpleGrid ...>`: no `list` node under `main` in `audit/legal/dom/current.aria.yaml`.

## Verdict

plan 70e5734d5b7a

## Log

- 2026-09-12: The shell cause is the CardsLayout item 8a3babf21c3c; this item is the route's outcome.

- 2026-09-28: From the tools and resources split (plan a0b4d829f7a9): the shell cause is 2417fc2e82e5 (Chakra v3's Wrap renders a div, not v2's ul), filed at the split; 8a3babf21c3c is the width and the consumption. The ui slice minted at that split fixes the ul, and this route's record consumes CardsLayout.

- 2026-09-28: From the legal re-port (plan 70e5734d5b7a): the route's own Wrap as="ul" at app/legal/page.tsx:20 renders legacy's ul on the published @villagekit/ui 1.2.0, no CardsLayout consumed. Read on pnpm dev: audit/legal/dom/current.aria.yaml under main holds heading Our legal information [level=1], heading Policies [level=2], then list: holding the one card's heading Privacy policy [level=3], its paragraph and its link with /url: /legal/privacy-policy, no listitem, as legacy's legacy.aria.yaml:23-38 holds its three cards in one list with no listitem; curl -s localhost:3000/legal | grep -o '<ul class="chakra-wrap' | wc -l prints 1; the Playwright read (audit/_probe70e5/width-probe.mjs, gitignored) gives the ul.chakra-wrap padding 0px, margin 0px, list-style-type none, display flex, flex-wrap wrap, justify-content center, gap 32px, 704px wide at 1280 and 343px at 375, the live legacy site's ul.chakra-wrap__list reading beside it apart from the width the container padding item 5c1af396cc2e owns. The shell cause 2417fc2e82e5 stays upstream for the two routes on CardsLayout (/contact, /tools-and-resources); the ui's ul at ca72207 reaches this route only if the operator sends it onto CardsLayout (call (c) on the verdicts plan d2beea2f9659), which moves this item back to upstream, as the plan said.

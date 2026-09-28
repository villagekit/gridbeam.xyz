---
title: "Contact card: the list role around the card dropped"
status: upstream
route: /contact
axis: accessibility
kind: changed
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:24` `<Wrap ...>` renders a `<ul class="chakra-wrap__list">` around the card: `audit/contact/dom/legacy.aria.yaml:23-28` a `list` holding the img, heading, paragraph and link (no `listitem`, since the card does not pass `as="li"`).

## Current

`app/contact/page.tsx:52-104` two `VStack`s in a `VStack`: no `list` or `listitem` under `main` in `audit/contact/dom/current.aria.yaml:22-35`.

## Verdict

## Log

- 2026-09-12: The shell cause is the CardsLayout item 8a3babf21c3c; this item is the route's outcome.

- 2026-09-28: From the tools and resources split (plan a0b4d829f7a9): the shell cause is 2417fc2e82e5 (Chakra v3's Wrap renders a div, not v2's ul), filed at the split; 8a3babf21c3c is the width and the consumption. The ui slice minted at that split fixes the ul, and this route's record consumes CardsLayout.

- 2026-09-28: From the contact re-port (plan 73062532dff7): the route consumes the ui CardsLayout now (app/contact/page.tsx:14), so the list is the layout's. The ul is committed in ../ui at ca72207 (src/components/layouts/CardsLayout.tsx:24, Wrap as="ul", the shell's 2417fc2e82e5) by the ui CardsLayout wrap slice 4a780ccf1f6a and waits on the operator's publish (decision 28c1a536). Read on this route under the uncommitted file:../ui override with transpilePackages and the bump's icon edit as a probe, on pnpm dev: pnpm audit:dom on /contact wrote audit/contact/dom/current.aria.yaml whose main reads heading "Contact us" [level=1], then list: holding img, heading "Email us" [level=2], paragraph: Send us a message and we will get back to you as soon as we can. and link: with /url: mailto:hello+gridbeam@mikey.nz, legacy's legacy.aria.yaml:22-28 line for line beside the address (the K2 verdict on 3b00b0149b6b). On the published 1.2.0 the card sits in the Wrap's div and no list is exposed: main reads the h1, then heading "Email us" [level=3], the paragraph and the link. Legacy's card passes no as, so its tree is a list with no listitem, and so is this page's under the sibling.

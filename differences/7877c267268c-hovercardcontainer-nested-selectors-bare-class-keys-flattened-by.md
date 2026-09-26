---
title: "HoverCardContainer nested selectors: bare class keys flattened by Chakra v3 css, a kebab-case console error on every consumer"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/HoverCard.tsx:68-90` `HoverCardContainer` writes `_focusWithin: { '.ui-hover-card': focusStyle }` and `_hover: { '.ui-hover-card': hoverStyle, ...containerHoverStyle }` under Chakra v2's `sx`, which reads a bare class key as a nested selector: a `HoverCard` inside a hovered container takes the `accentB` fill and border, and the console is clean.

## Current

`@villagekit/ui@1.2.0 dist/components/HoverCard.js:50-61` writes the same keys under Chakra v3's `css`, which treats only keys holding `&` or `@`, or starting with `_`, as conditions (`node_modules/@chakra-ui/react/dist/esm/styled-system/conditions.js:5,14`), so `.ui-hover-card` is flattened into a property and Emotion logs `Using kebab-case for css properties in objects is not supported. Did you mean .uiHoverCard?` once per page, as a console error, on every route that renders a `HoverCardContainer`: `/` and `/stories` (the story cards, `app/_components/stories/Item.tsx:41`) and `/designs` (`app/_components/catalogue/ItemCard.tsx:26`); Next's dev overlay shows it as `1 Issue` (`audit/stories/1280/current.png`). The container's own hover (`scale(1.05)`, the pointer cursor) and focus-within styles still apply; the nested hover-card recolor is lost, though no current consumer nests a `HoverCard` in a container. The same key form is in the sibling (`../ui/src/components/HoverCard.tsx:75,78` at 46eab3c). The fix is the ui's: the two keys in the `& .ui-hover-card` form, which a ui slice the operator mints makes.

## Verdict

## Log

- 2026-09-26: Filed by the story card slice (plan [[e332105c3b52]]); pre-existing on /designs at 1.2.0 and now on / and /stories, where the console error replaces the one the StoryCard selector logged (150c408aba5a). Not the site's to fix: no ../ui edit in that slice.

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): the fix in ../ui is the slice [[8235bd4bea81]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]); the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Correction at the home record's finish (plan [[fd9a92bd8abd]], the review's finding): the Current text's clause that no current consumer nests a HoverCard in a container is wrong. The catalog's ItemCard does (app/_components/catalogue/ItemCard.tsx:26,29, legacy's components/catalogue/item.tsx:33,48 at fce357d), so on /designs a hovered card's inner .ui-hover-card loses the accentB.100 fill and accentB.300 border today; the slice [[8235bd4bea81]] restores it and its Done when reads it on /designs.

- 2026-09-26: Fixed in ../ui as commit 2e2d68c (plan [[8235bd4bea81]]): HoverCardContainer's two nested keys read '& .ui-hover-card', the form Chakra v3's css reads as a selector. Under the file:../ui override the console on /, /stories and /designs holds no kebab-case line and Next's dev overlay shows no issue badge, the stylesheet carries the hover and focus-within rules for the nested card, and on /designs the first card's inner .ui-hover-card reads rgb(254, 252, 191) on rgb(246, 224, 94) under the pointer and the outlineColor border with focus inside, the live legacy site's readings. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.

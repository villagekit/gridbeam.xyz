---
title: "HoverCardContainer nested selectors: bare class keys flattened by Chakra v3 css, a kebab-case console error on every consumer"
status: regression
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

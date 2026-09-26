---
title: "External story icon: an exposed unnamed image to aria-hidden"
status: regression
route: /stories
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:98` `<Icon as={FaExternalLinkAlt} sx={{ color: 'gray.300' }} boxSize="4" />` with no `aria-hidden`: a bare `img` after each inspiration card's date, `audit/stories/dom/legacy.aria.yaml:84,93,102,111`.

## Current

`app/_components/StoryCard.tsx:104-108` `<Icon ... aria-hidden>`; no `img` on the four cards in `audit/stories/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: Legacy exposes an unnamed image; a fix plan should ask the operator (rule 5) before restoring that.

- 2026-09-26: The story card slice (plan [[e332105c3b52]]) re-ported the card as app/_components/stories/Item.tsx and renders the icon as legacy's item.tsx:98 does, line for line: <Icon as={FaExternalLinkAlt} css={{ color: 'gray.300' }} boxSize="4" />. Chakra v3's Icon writes aria-hidden="true" itself (node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:20), so the icon stays hidden and the four inspiration cards show no bare img in audit/stories/dom/current.aria.yaml. Left regression for the stories index record's split or verdicts plan, as this Log asks; restoring legacy's exposed unnamed image would need an aria-hidden override the legacy line does not carry.

- 2026-09-26: Handed to the operator on the attended verdicts plan [[239f17128896]] at the split of the stories index record [[ca353de8b645]] (decision 40abdb2f222a, the plan minted at the split rather than the finish), beside its twins 1ea1f9eda079 (the home's plan 8bb4a4380264) and 89301ca8a1fc (the shell's 77cf83a1285a); unlike theirs, the accessibility tree differs here, and Chakra's line is icon.js:22, not :20. The state stays until the operator judges it.

- 2026-09-26: At the stories index record's finish (plan [[ca353de8b645]]): the Current section's file, app/_components/StoryCard.tsx, no longer exists; the line is app/_components/stories/Item.tsx, the card the home's slice [[e332105c3b52]] re-ported, and the page re-port [[278fb531e229]] left it untouched. The state stays until the operator judges it on [[239f17128896]].

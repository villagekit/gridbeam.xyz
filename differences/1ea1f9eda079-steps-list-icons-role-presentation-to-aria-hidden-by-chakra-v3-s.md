---
title: "Steps list icons: role presentation to aria-hidden by Chakra v3's Icon"
status: open
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:226-268` at `fce357d` renders each step's icon as `<ListIcon as={...} />`, and Chakra v2's `ListIcon` writes `role="presentation"` on the `svg`; a probe of the live site on 2026-09-26 reads `focusable="false" role="presentation" height="1em" width="1em"` on every list icon.

## Current

`app/HomePage.tsx:228-230` and the five items after it render `<List.Indicator asChild><Icon as={...} /></List.Indicator>`; Chakra v3's `Icon` writes `aria-hidden="true"` and `focusable="false"` and no role (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:20-22`); the same probe on `pnpm dev` reads `focusable="false" aria-hidden="true" height="1em" width="1em"`. The accessibility tree is identical on both sides: every `listitem` exposes its text and link only (`audit/_root/dom/{legacy,current}.aria.yaml`, the `How to get started` list).

## Verdict

## Log

- 2026-09-26: Filed open by the page re-port (plan [[159c621d8a1a]]), the same mechanism as [[89301ca8a1fc]] on shell: Chakra v3's Icon hides itself by default and the tree is the same. A rule 4 candidate for the operator; the alternative is role="presentation" written on each Icon beside v3's aria-hidden, as ../ui's BlockSection does. Goes on the home's verdicts plan at the record's finish.

---
title: "LinkCard icon: an exposed unnamed image to aria-hidden"
status: upstream
route: shell
axis: accessibility
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:50` `<Icon as={IconComponent} w="8" h="8" />`. The live tree exposes it: `audit/legal/dom/legacy.aria.yaml:24,29,34` a bare `img` before each card heading; `audit/tools-and-resources/dom/legacy.aria.yaml` `listitem "Cutting planner": - img`; `audit/contact/dom/legacy.aria.yaml:24`. The legacy server HTML carries `aria-hidden="true" focusable="false"` on the same `<svg>` (`curl https://gridkit-landing-villagekit.vercel.app/legal`), so the exposed node is what the page shows after hydration.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:35-37` `<Icon w="8" h="8" color="primary.600">{icon}</Icon>`; Chakra v3's `Icon` sets `"aria-hidden": "true"` (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:22`). No `img` node inside any card in `audit/legal/dom/current.aria.yaml`, `audit/tools-and-resources/dom/current.aria.yaml` or `audit/subscribe/dom/current.aria.yaml`; the hand-built `<Icon>` cards on `/contact` are hidden the same way (`audit/contact/dom/current.aria.yaml`).

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f. The rule is absent, so regression by default; the legacy server HTML already hides the icon and the current markup matches it, which the operator may weigh under rule 5. Same shape as the footer heart item c49a53197086.

- 2026-09-26: Fixed in ../ui as commit a4ef8ed on its main (not pushed; the push goes with the operator's publish, decision 28c1a536): src/components/LinkCard.tsx re-ported from @villagekit/ui@0.9.0 by plan [[1cc03cfabcf2]]. Waits in upstream for the bump plan [[99f2fe62c62f]].

- 2026-09-26: Correction to the Legacy section, from the Parity review of plan [[1cc03cfabcf2]]: the legacy card's own svg carries no aria-hidden in the served HTML (the hidden svgs on the legacy page are other icons), so the exposed img the live tree shows is the markup as served, not a hydration change. The port matches it: Chakra v3's Icon writes aria-hidden true by default and the sibling passes aria-hidden undefined to clear it; the DOM pairs under audit/legal/dom/current.aria.yaml and audit/tools-and-resources/dom/current.aria.yaml show an unnamed img before each card's h2.

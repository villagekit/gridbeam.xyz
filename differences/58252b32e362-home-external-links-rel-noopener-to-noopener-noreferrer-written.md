---
title: "Home external links: rel noopener to noopener noreferrer written on the anchors"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`../node-modules/apps/gridkit/pages/index.tsx:270,347` at `fce357d` render the community link and the villagekit.com link as `<Link href=... isExternal>`, and Chakra v2's `Link` (`@chakra-ui/layout@2.3.1`, `chunk-K7XRJ7NL.mjs:19`) renders `isExternal` as `target="_blank" rel="noopener"`.

## Current

`app/page.tsx:235,312` write `target="_blank" rel="noopener noreferrer"` on the anchors directly, where the ui `Link` takes `isExternal` again since the recipes slice and renders `noopener`; the Join the community button beside them is [[0e32d2acb530]].

## Verdict

## Log

- 2026-09-26: Filed by the Parity review of the ui links slice [[9e54dca30d48]], which closed the same question in the ui components ([[f85e98a67092]]); the M1 ledger for / has no item on it. The route's own JSX, for the home record [[fd9a92bd8abd]]: render the ui Link with isExternal, as legacy did. The privacy policy's, contact's and legal's anchors of the same shape sit under [[f0fe0e2150da]], [[fc861bd50946]] and [[d3f88003fbfb]], which re-port or remove them.

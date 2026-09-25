---
title: "FAQ external links: rel noopener to noopener noreferrer written on the anchors"
status: regression
route: /faq
axis: code
kind: changed
---
## Legacy

`../node-modules/apps/gridkit/pages/faq.tsx:36,157,189,229,380` at `fce357d` render the page's external links as `<Link href=... isExternal>`, and Chakra v2's `Link` (`@chakra-ui/layout@2.3.1`, `chunk-K7XRJ7NL.mjs:19`) renders `isExternal` as `target="_blank" rel="noopener"`. Live legacy `/faq`: `<a target="_blank" rel="noopener" href="https://gridbeam.xyz">`, the same on the EPA, Stripe and discuss.villagekit.com anchors.

## Current

`app/faq/page.tsx:111,148,225,234,250,322` write `target="_blank" rel="noopener noreferrer"` on the ui `Link` directly, where the ui `Link` takes `isExternal` again since the recipes slice and renders `noopener`. `pnpm dev`, `/faq`: `<a target="_blank" rel="noopener noreferrer" href="https://discuss.villagekit.com">`.

## Verdict

## Log

- 2026-09-26: Filed by the Parity review of the ui links slice [[9e54dca30d48]], which closed the same question in the ui components ([[f85e98a67092]]); the M1 ledger for /faq has no item on it. The route's own JSX, for the faq record [[7f0b60d948c5]]: render the ui Link with isExternal, as legacy did.

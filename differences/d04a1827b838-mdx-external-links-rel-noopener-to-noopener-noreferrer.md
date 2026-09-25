---
title: "MDX external links: rel noopener to noopener noreferrer"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-mdx/src/link.tsx:15` at `fce357d` renders a story's non-hash link as `<Link variant="paragraph" isExternal>`, and Chakra v2's `Link` (`@chakra-ui/layout@2.3.1`) renders `isExternal` as `target="_blank" rel="noopener"`. Live legacy site, `/stories/whats-a-grid-unit`: `<a target="_blank" rel="noopener" class="chakra-link ...">`.

## Current

`../ui/src/mdx/link.tsx:14` (`@villagekit/ui@1.2.0` `src/mdx/link.tsx`): an `http(s)` href renders `<Link target="_blank" rel="noopener noreferrer">`, the 1.2.0 fix's own attributes rather than `isExternal`. `pnpm dev`, `/stories/whats-a-grid-unit`: `<a target="_blank" rel="noopener noreferrer" ...>`. The ui `Link`'s own `isExternal` renders `noopener` alone again since the recipes slice; `LinkButton`, `LinkIconButton` and `LinkCard` write `noopener noreferrer` too.

## Verdict

## Log

- 2026-09-26: Found by the recipes slice [[45d6f5634a11]] checking a story page after `Link` regained `isExternal`; the MDX link is the mdx and media slice's [[bc0407533650]], beside [[63baa85427e0]], which re-ports `MdxLink` and is where this is closed or judged (the same `rel` on the three link components is the same question).

---
title: "MDX external links: rel noopener to noopener noreferrer"
status: upstream
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

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]) for the MDX link: MdxLink renders the ui Link with isExternal, which writes rel="noopener" as Chakra v2's Link did (probed: <a target="_blank" rel="noopener" ...> on the story pages). The last clause here, the same rel on LinkButton, LinkIconButton, LinkCard, Footer and Social, is split out as [[f85e98a67092]]. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.

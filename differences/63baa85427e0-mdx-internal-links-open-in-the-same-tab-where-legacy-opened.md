---
title: MDX internal links open in the same tab where legacy opened every non-hash link in a new tab
status: upstream
route: shell
axis: interaction
kind: changed
---


## Legacy

`packages/ui-mdx/src/link.tsx:15` at `fce357d`: `MarkdownLink` renders every link whose href does not start with `#` as `<Link variant="paragraph" isExternal>`, so an internal link written in a story, such as `[design catalogue](/designs)` in `pages/stories/building-with-grid-kit.mdx:54`, opens in a new tab; wired in through `apps/gridkit/components/mdx/index.tsx:1`.

## Current

`@villagekit/ui@1.2.0` `src/mdx/link.tsx:12-20`: only an `http(s)` href is external; an internal href renders as a route link in the same tab (`content/stories/building-with-grid-kit.mdx:61`). Found by the Parity review of the ui framework boundary slice, which keeps the behavior; the ui mdx and media slice `bc0407533650` re-ports `MdxLink` and is where this is closed or judged.

## Verdict

## Log

- 2026-09-26: Filed from the Parity review of the ui framework boundary slice (plan 1c74a465996d), which keeps the current behavior; the ui mdx and media slice bc0407533650 re-ports MdxLink and judges or closes it.

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/mdx/link.tsx is legacy's MarkdownLink again, every href that is not a #hash rendered <Link variant="paragraph" isExternal>, so a story's internal link opens in a new tab as on the live legacy site (probed on /stories/building-with-grid-kit: <a target="_blank" rel="noopener" href="/designs">). The framework link component is no longer read by MdxLink. Closed by the port rule, legacy being the baseline; if the operator prefers the same tab for an internal link, a note here and a new state supersede this at the bump. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.

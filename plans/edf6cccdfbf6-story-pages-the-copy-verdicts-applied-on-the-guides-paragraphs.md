---
title: "Story pages: the copy verdicts applied on the guides' paragraphs, alts, labels, links and headings"
status: done
parent: 56e6eb197e6c
derived_from: 56e6eb197e6c
blocked_by:
  - target: 9f174b0d4c72
    strength: soft
    note: "the same MDX files: the removals first"
tags:
  - "worker:sonnet"
---
The three guides carry the copy the stories grilling settled (P4 and P5): the Grid Panels sentence with the rule 1 swap, the hero alt with the Title Case wordmark, the hex key sentence and the grid label with no hyphen, the two closing links to the Village Kit discussion board at legacy's link extent, the cutting tip with the dead store link removed, and the three connection headings back at h4. Seven items on four story routes, every verdict the operator's, each a stated string, so the diff is given and the work is Sonnet's. Applied on the current MDX before the components and the page are re-ported, so the re-ports carry settled text and their reviews are structure only. Record `56e6eb197e6c`; decisions `ee86d68a`, `2032533f`, `ca677697`, `6fce53c0`.

## Work

Read each item (`kipu show <id>`) and write exactly the text its last Log line gives; where the line says legacy verbatim, the string is `../node-modules/apps/gridkit/pages/stories/<file>.mdx` at `fce357d`, character for character. In `content/stories/*.mdx` as the removals slice (`Story pages: the editorial notes, the originally-on byline, the publish date and their component and field removed`) leaves them, searching by the current text.

- `whats-a-grid-unit.mdx`, [[1ab305e446c7]]: the paragraph `Grid Panels are another application of Grid Units and one of the essential building blocks of grid beam.` (legacy `:109` with `Grid Kit` to `grid beam`, rule 1, the verdict).
- `how-to-cut-grid-beams.mdx`, [[40e89fd36d02]]: the hero `StoryImage`'s `alt="A person cutting a Grid Beam with a handsaw"` (legacy `:52` verbatim, the Title Case wordmark; the `metadata` alt at the top of the file stays lowercase, as legacy `:15`); [[e0746ac4eebc]]: the closing paragraph `For further tips, advice, and inspiration, visit the Village Kit [discussion board](https://discuss.villagekit.com/).` (`Grid Kit` to `Village Kit`, the verdict; the verdict line says legacy's link extent and href and quotes the href without its trailing slash, so the href is legacy `:428`'s with the slash, the visible text the same either way: `kipu note` the item saying so).
- `how-to-furniture-bolts.mdx`, [[a80668016926]]: `> All grid beam furniture bolts use a 4mm hex key.` and `ariaLabel="Grid of common grid beam connections"` (no hyphen, the verdict); [[ef21d53da4cd]]: `#### Beam To Beam Connections`, `#### Beam To 12mm Panel Connections`, `#### Beam To 18mm Panel Connections` (legacy `:187,209,246`, the three h4s under `## What Sizes To Use` (`:99`) and before `### Here's How To Determine Which Size Combo To Use` (`:283`); the item's Legacy text and verdict line place them under that h3, which the legacy source does not, so `kipu note` the item with the order above); [[fc3776853af3]]: `For further tips, advice, and inspiration, visit the Village Kit [discussion board](https://discuss.villagekit.com).` (legacy `:386`, no trailing slash in the href, as legacy wrote this one).
- `building-with-grid-kit.mdx`, [[cbb90b8648bb]]: the blockquote `> Make use of a cutting jig to help guide cuts. Otherwise, use a tape measure to mark each cut precisely.` (the verdict: legacy `:135` with the `/products/cutting-jig` link removed under rule 2 and `our` to `a`).
- Verify first: `grep -c 'building blocks of the system' content/stories/whats-a-grid-unit.mdx` prints 1; `grep -c 'community forum' content/stories/how-to-cut-grid-beams.mdx content/stories/how-to-furniture-bolts.mdx` prints 1 for each (the 2022 newsletter's `community forum` is legacy's own line and stays); `grep -n 'grid-beam' content/stories/how-to-furniture-bolts.mdx` prints the hex key line and the `ariaLabel` line and nothing else; `grep -c '^### Beam To' content/stories/how-to-furniture-bolts.mdx` prints 3; `grep -c 'guide for the full walkthrough' content/stories/building-with-grid-kit.mdx` prints 1; `grep -c 'cutting a grid beam with a handsaw' content/stories/how-to-cut-grid-beams.mdx` prints 2 (the metadata alt and the hero alt). After: 0, 0 and 0, nothing, 0 (and `^#### Beam To` 3), 0, 1.
- Docs: none.
- Not this slice: the `ariaLabel` prop's fate on the grid component (the components re-port keeps legacy's dead prop and the MDX keeps passing it); everything structural.

## Seams under test

None pure; the proof is the copy diff and the aria tree of the DOM pairs.

## Done when

- Against a running `pnpm dev`, `pnpm audit:dom --routes <a file naming the three guide routes and /stories/building-with-grid-kit>`: `audit/stories__whats-a-grid-unit/dom/current.txt` holds `building blocks of grid beam.`; `audit/stories__how-to-cut-grid-beams/dom/current.txt` and `audit/stories__how-to-furniture-bolts/dom/current.txt` each hold `visit the Village Kit discussion board.` and neither holds `community forum`; `audit/stories__how-to-cut-grid-beams/dom/current.aria.yaml` holds `img "A person cutting a Grid Beam with a handsaw"`; `audit/stories__how-to-furniture-bolts/dom/current.aria.yaml` holds the three `Beam To ... Connections` headings at `[level=4]` after `What Sizes To Use` `[level=2]` and before `Here's How To Determine Which Size Combo To Use` `[level=3]`, as `legacy.aria.yaml:83,91,104` has them, and the grid's label reading `Grid of common grid beam connections`; its `current.txt` holds `All grid beam furniture bolts use a 4mm hex key.`; `audit/stories__building-with-grid-kit/dom/current.txt` holds `Make use of a cutting jig to help guide cuts.` and `diff` against `legacy.txt` shows that line differing from legacy's by `our cutting jig` to `a cutting jig` alone
- The verify-first greps print their after values
- The seven items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), [[ef21d53da4cd]] and [[e0746ac4eebc]] with their notes, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped as written: the seven verdicts applied on the four guide MDX files, each string from the item's last Log line or legacy at fce357d. Verify-first greps print their after values (0; 0 and 0; nothing; 3 h4s; 0; 1 for the lowercase handsaw alt). The DOM pairs (`audit:dom` over the four routes) show the Grid Panels sentence, both `Village Kit discussion board.` closings with no `community forum`, the Title Case hero alt, the three `Beam To ... Connections` headings at level 4 between the level 2 `What Sizes To Use` and the level 3 `Here's How To Determine Which Size Combo To Use`, the label `Grid of common grid beam connections`, the hex key sentence, and the cutting tip differing from legacy by `our` to `a` alone. Two deviations recorded as notes on the items: the closing link on the cut guide keeps legacy's trailing slash (the verdict line quotes it without), and the three headings follow legacy's order under the h2, not under the h3. No visual gate beyond the DOM pairs; no route markup changed.

## Log

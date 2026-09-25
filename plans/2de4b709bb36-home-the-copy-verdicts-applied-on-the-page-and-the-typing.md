---
title: "Home: the copy verdicts applied on the page and the typing section"
status: done
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
blocked_by: 4faefea81c76
tags:
  - "worker:sonnet"
priority: medium
---
The home page's copy is what the copy grilling settled: thirty verdicts applied verbatim on the page and the typing section as they stand today, before the page is re-ported, so the re-port carries settled text and its review is structure only. Every string comes from the item's Verdict or Log, or the legacy line it names, and from nowhere else (`ca677697`, `6fce53c0a18e` for the American spellings, `edad0df805f0` for the one legacy em dash); the diff is stated line by line below, so the work is Sonnet's. The two paragraphs written plain also close the bold-span item. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`, `ca677697`, `5dfd824923c9`.

## Work

Read each item (`kipu show <id>`) and write exactly the text its last Log line or Verdict gives; where the line says `as legacy verbatim`, the string in its Legacy section. In `app/page.tsx` (line numbers after the removals slice, so search by the current text):

- [[0a0006cc97ad]]: the hero subhead reads `Start building custom furniture, ` before the `Span`, the span and the rest unchanged (one paragraph until the page re-port).
- [[4c1ebb703f37]]: the hero button reads `Buy a Grid Beam` and links to `/suppliers`; its `size` stays until the page re-port.
- [[9dde32cfd21c]]: `ariaLabel="Showcase of things made with grid beam"`.
- [[fd7c81337f46]], [[c3a296eba369]], [[d39745816683]], [[f0241131f4ab]]: the four `HERO_SLIDES` alts are the legacy strings quoted under each item's Legacy section (`../node-modules/apps/gridkit/pages/index.tsx:114,122,129,136` at `fce357d`), whole.
- [[465553a58b1a]]: Rhona's quote ends `The kits are super fun, versatile and easy to use ❤`.
- [[56cb9b399094]]: the kit heading reads `One modular kit, unlimited creations`.
- [[6fe8e939eea6]]: the kit paragraph is the verdict's sentence, plain text with no `Span`.
- [[189fa096bad6]]: the kit button reads `Learn more`.
- [[d580fbefb012]]: the video `title` is `Assembling and disassembling a coffee table`.
- [[41bcb10951cc]]: step 1 reads `Browse designs from our catalog, or imagine your own`, the link on `our catalog`, no period.
- [[ee94ef3bd6b3]]: step 2 reads `See how many beams, panels, and other components you need`, plain text, no link.
- [[60611ae7f507]]: step 4 reads `Cut your beams and panels to size`, no period.
- [[d282fb00e101]]: step 5 reads `Have fun assembling your design`, no period.
- [[cdf41a910161]]: step 6 reads `Share your creation with the community!`, the link text `with the community!`.
- [[5c15073c3e18]]: the button under the list reads `Buy a Grid Beam` and links to `/suppliers`.
- [[856f469bd3fb]]: the stories heading reads `Our stories`.
- [[e8ab994180ec]]: the stories description is the verdict's sentence (the `Title` with `description` stays until the page re-port).
- [[613676de7804]]: the stories button reads `See all stories`.
- [[dfe5287a9729]]: `A future without waste`, no period.
- [[5e547d6c6ec6]]: the sustainability paragraph is the verdict's two sentences, plain text with no `Span`.
- [[6de9c0ef5984]]: the forest alt is `Forest of douglas fir trees`.
- [[f3009ad59942]]: `A place to share ideas`, no period.
- [[05450d115617]]: the community paragraph is the verdict's two sentences, the `wider vision` link kept on those two words as legacy has it (`index.tsx:347-349`).
- [[b3b93efed018]]: the community button reads `Join our community` (its `isExternal` is the page re-port's item [[0e32d2acb530]]).
- [[f1bb2d262d1e]]: the camp kitchen alt is `A temporary camp kitchen constructed with grid beam`.

In `app/_components/landing/TypingDesignSection.tsx`:

- [[96923b9015dd]]: the paragraph is the verdict's text, its legacy em dash kept (`edad0df805f0`).
- [[f0cda5ac29c5]]: the button reads `Explore our design catalog`.

- [[1884fc2e2752]] closes with the kit and sustainability paragraphs written plain above: legacy's paragraphs carry no emphasis (`index.tsx:189-192,323-326`).
- Verify first: `grep -c 'fontWeight="bold"' app/page.tsx` prints 3 before (the hero span and the two paragraph spans) and 1 after (the hero span, legacy's `index.tsx:92`).
- Not this slice: the second hero button, the title and the description (the removals slice, first); the two fixed story cards [[774792ad37d6]], whose fix is the MDX imports of the page re-port; the button sizes, the paragraph split and every other visual item.

## Seams under test

None pure; the proof is the copy diff of the DOM pair.

## Done when

- `pnpm audit:dom --routes <a file naming />` against a running `pnpm dev`, then `diff audit/_root/dom/legacy.txt audit/_root/dom/current.txt`: every remaining line of difference maps to a `sanctioned` item on `/` (the rebrand, the two `Buy a Grid Beam` CTAs, the sustainability line, the removed footnote and starter kit, the `Buy` step), to a `regression` item a later slice closes (the two fixed story cards, the carousel's live text, the story cards' dates), to a shell item in the footer, or to the typing heading, whose typed label differs on every run; the Outcome lists the residual lines and the item each maps to
- `grep -c 'fontWeight="bold"' app/page.tsx` prints 1
- The thirty-one items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

Applied all 31 items verbatim from each item's last Log line (or the legacy line it names) in `app/page.tsx` and `app/_components/landing/TypingDesignSection.tsx`: the hero subhead, CTA and carousel label, the four hero slide alts, Rhona's testimonial, the kit heading, paragraph, button and video title, the six-step list (three link/period edits, the cutting-planner step made plain), the list CTA, the stories heading, description and button, the two headings that lose or keep a period, the sustainability paragraph and forest alt, the community paragraph, button and camp-kitchen alt, and the typing section's paragraph and button. The kit and sustainability paragraphs were also written plain (no `Span`), closing the bold-span item; `grep -c 'fontWeight="bold"' app/page.tsx` now prints 1 (the hero span), down from 3.

Proof: `pnpm audit:dom` against a running `pnpm dev`, then `diff audit/_root/dom/legacy.txt audit/_root/dom/current.txt`. Every residual line maps as expected: the shell rebrand and nav (Grid Kit/Grid Beam, Store, the skip link, Find a supplier, the free-shipping banner and cookie notice, the footer columns), the two "Buy a Grid Beam" CTAs and the removed store footnote and starter kit, the "Find a supplier" step replacing the legacy Buy step, the hero's one-paragraph structure and the carousel's "Slide N of M" prefix (both the page and carousel re-ports), the typing heading's live label (differs on every run by design), and the two fixed story cards with their dates (item [[774792ad37d6]], the page re-port's MDX-import fix). No line indicated an unsanctioned or untracked regression.

Three fresh Opus reviewers ran before the commit: Standards (Biome and tsc clean, no unused imports, module shape unchanged, no new logging, the one em dash in copy is legacy's own kept by `edad0df805f0`), Spec (all 31 items match their Log/Verdict text and the Done-when checks hold, nothing out of scope touched) and Parity (every new string traced to `../node-modules/apps/gridkit/pages/index.tsx` at `fce357d` or its item's verdict, no JSX shape change beyond what each verdict asked for, no untracked difference introduced against the route's 118-item ledger). None found a fix to make.

The 31 items closed: [[0a0006cc97ad]], [[4c1ebb703f37]], [[9dde32cfd21c]], [[fd7c81337f46]], [[c3a296eba369]], [[d39745816683]], [[f0241131f4ab]], [[465553a58b1a]], [[56cb9b399094]], [[6fe8e939eea6]], [[189fa096bad6]], [[d580fbefb012]], [[41bcb10951cc]], [[ee94ef3bd6b3]], [[60611ae7f507]], [[d282fb00e101]], [[cdf41a910161]], [[5c15073c3e18]], [[856f469bd3fb]], [[e8ab994180ec]], [[613676de7804]], [[dfe5287a9729]], [[5e547d6c6ec6]], [[6de9c0ef5984]], [[f3009ad59942]], [[05450d115617]], [[b3b93efed018]], [[f1bb2d262d1e]], [[96923b9015dd]], [[f0cda5ac29c5]], [[1884fc2e2752]].

No deviation from the plan's Work text: every item's Work-section line matched its own Log line, so nothing needed the item's word to override the plan's. `timeout 900 just check` is green.

## Log

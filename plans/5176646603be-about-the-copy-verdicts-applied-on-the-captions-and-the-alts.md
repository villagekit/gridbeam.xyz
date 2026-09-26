---
title: "About: the copy verdicts applied on the captions and the alts"
status: done
parent: 40179ab9e779
derived_from: 40179ab9e779
blocked_by: 5ac30176aa70
tags:
  - "worker:sonnet"
priority: medium
---
The about page's copy is what the copy grilling settled: eleven verdicts applied verbatim on the page as the removals slice leaves it, before the page is re-ported, so the re-port carries settled text and its review is structure only. Every string comes from the item's Log line or the legacy line it names, and from nowhere else (`ca677697`); the diff is stated line by line below, so the work is Sonnet's. Record `40179ab9e779`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

Read each item (`kipu show <id>`) and write exactly the text its last Log line gives; where the line says `as legacy verbatim`, the string in its Legacy section, from `../node-modules/apps/gridkit/pages/about.tsx` at `fce357d`. In `app/about/page.tsx` (line numbers after the removals slice, so search by the current text). The bold spans stay `Span fontWeight="bold"` (`01ae1e943907`, sanctioned) with legacy's words inside them; the `&nbsp;` entities and the em dash characters the current captions carry go with the strings, since legacy's text has neither.

- [[b60740a84adf]]: caption 1 reads `Grid beam is a <Span fontWeight="bold">modular system based on a 40mm grid</Span>.` (legacy `about.tsx:18-24` with the rule 1 swap, the item's verdict line).
- [[45283323e3ed]]: caption 3 reads `<Span fontWeight="bold">Beam</Span> profiles are 40mm x 40mm and have a repeating pattern of 8mm holes drilled 40mm apart.` (`about.tsx:61-66`).
- [[547b0a4b92ce]]: caption 4 reads `<Span fontWeight="bold">Plywood panels</Span> have holes drilled in a 40mm grid.` (`about.tsx:77-82`).
- [[0e029af68390]]: caption 5 reads `<Span fontWeight="bold">Hex-nut fasteners</Span> bolt together beams and panels quickly for simple assembly (and disassembly!)` with no period, as legacy (`about.tsx:93-98`).
- [[d19bc2fe8044]]: caption 6 reads `When <Span fontWeight="bold">three beams are joined with three connectors</Span> a strong connection is created.` (`about.tsx:109-115`).
- [[fde584087061]], [[da3845c72595]], [[a8cb80eee630]], [[ea001d8f3c25]], [[12f205a40fb6]], [[1be8e5c18f77]]: the six `alt`s are legacy's strings whole, in order: `The 40mm grid`, `40mm grid overlaid on grid beam & panel`, `Grid beams`, `Grid panels`, `Hex-nut fasteners`, `Tri joint made with grid beams` (`about.tsx:29,38,55,71,87,103`); the bare `&` is legacy's own JSX and lints.
- Caption 2 (`The primary building components are beams, panels, and fasteners.`) already matches legacy and has no item; leave it.
- Verify first: `grep -c '&nbsp;' app/about/page.tsx` prints 4 before (captions 1, 3 and 4; the intro's and the removed section's lines went with the removals slice) and 0 after; `grep -cP '\x{2014}' app/about/page.tsx` prints at least 3 before (the current captions' and alts' em dashes) and 0 after.
- Not this slice: the images' component and `sizes`, the text helper, the section wrapper and every visual item (the page re-port, `About page re-ported from the legacy about page`).

## Seams under test

None pure; the proof is the copy diff of the DOM pair.

## Done when

- `pnpm audit:dom --routes <a file naming /about>` against a running `pnpm dev`, then `diff audit/about/dom/legacy.txt audit/about/dom/current.txt`: between the nav and the footer the only lines of difference are the heading (`What is Grid Kit?` to `What is grid beam?`, `1f742640f27f`) and caption 1's first words (`Grid Kit is` to `Grid beam is`, this slice's [[b60740a84adf]] verdict); every other residual line is the shell's (the nav items, the cookie notice, the footer columns); the Outcome lists the residual lines and the item each maps to
- `grep -c 'alt="The 40mm grid"\|alt="40mm grid overlaid on grid beam & panel"\|alt="Grid beams"\|alt="Grid panels"\|alt="Hex-nut fasteners"\|alt="Tri joint made with grid beams"' app/about/page.tsx` prints 6
- `grep -c '&nbsp;' app/about/page.tsx` prints 0 and `grep -cP '\x{2014}' app/about/page.tsx` prints 0
- The eleven items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped as scoped. app/about/page.tsx now carries the eleven verdicts verbatim: caption 1 (legacy with the rule 1 swap), captions 3, 4, 5 and 6 as legacy, and the six alts as legacy's strings; the nbsp entities and the em dashes went with the old strings. Caption 2 already matched and is untouched. The eleven items are fixed with outcome "plan 51766466".

Proof: grep -c for the six alts prints 6; grep -c '&nbsp;' prints 0 (4 before); the em dash grep prints 0 (3 before). Against a running pnpm dev, pnpm audit:dom on /about then diff of legacy.txt and current.txt: between the nav and the footer the only differing lines are the heading (What is Grid Kit? to What is grid beam?, 1f742640f27f) and caption 1's first words (Grid Kit is to Grid beam is, b60740a84adf); every other residual line is the shell's (skip link, nav items, Find a supplier action, cookie notice, footer columns). Dev server stopped by pid. timeout 900 just check exited 0. No visual gate: copy only, covered by the DOM pair.

Reviewed on a fresh Opus sub-agent (Standards, Spec, Parity): no findings above minor; the minor ones (write the Outcome, stage the page) taken. Dropped: none.

## Log

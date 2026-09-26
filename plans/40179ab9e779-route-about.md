---
title: "Route: about"
status: doing
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: fd9a92bd8abd
    strength: soft
    note: route order
---

## Goal

The route `/about` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `/about` in the ledger (`kipu list --collection difference --filter route=/about --json`): forty-two items at the split, thirty-nine `regression`, three `sanctioned`, none `open`. The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place; here the page is re-ported, the removals and the copy landing first on the current page.

The removals, twenty-one items, every verdict the operator's from the copy grilling (`5ac30176aa70`): the title and the meta description `f6ebf1620bad`, `494cc9baa8bd`; the description line `fb23903a3c70`; the intro block `5d2c47f5c255`, `4613624745c4`, `54acd326d718`, `5ee924ad245e`; the `Where it came from` section `473fb083a0e7`, `e6071f319f08`, `88cde35fe693`, `24c7ab53652c`, `00b6bb04683c`, `49b374146247`; the `Start building` section `d9ced6913e2b`, `ca856b1fae92`, `f40c010ea9c4`, `1b8f98bd363b`, `d5bc3b1abc0f`, `d0caa4bf0339`, `cae5306ea71e`, `e66dbbbf6d1f`.

The copy verdicts, eleven items (`5176646603be`): the captions `b60740a84adf`, `45283323e3ed`, `547b0a4b92ce`, `0e029af68390`, `d19bc2fe8044`; the alts `fde584087061`, `da3845c72595`, `a8cb80eee630`, `ea001d8f3c25`, `12f205a40fb6`, `1be8e5c18f77`.

The page re-port, seven items (`97e702d40df5`): the shape `bfe876779ed0`, the heading size `5f618057b23d`, the gap `2b1dce44fd7a`, the images `878fefa617c4`, `13bdc7d5ca36`, the text helper `61dedaa19b75`, `c52a29c7ef8c`.

Sanctioned, not a slice's: `01ae1e943907` the bold spans, `1f742640f27f` the heading's text, `3741ad0e8bbf` the re-hosted assets.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/about --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log

- 2026-09-26: Split into three slices (plan 40179ab9e779), reviewed once on one Opus sub-agent. Against `@villagekit/ui@1.2.0`, in the order the edges give: `5ac30176aa70` the added intro, the two added sections and the per-page metadata removed (Sonnet, twenty-one items, every verdict the operator's from the copy grilling); `5176646603be` the copy verdicts applied on the captions and the alts (Sonnet, eleven items); `97e702d40df5` the page re-ported from `pages/about.tsx` (Fable, seven items), last, consuming both and the shell's `MediaProvider` (`6f90e7e24ca6`) and layout (`a7bf623f885c`) slices. Every `regression` on `/about` is closed by exactly one slice, thirty-nine in all; no item is `open`; the three `sanctioned` items (`01ae1e943907`, `1f742640f27f`, `3741ad0e8bbf`) need no slice. Calls made at the split, for the operator to read: (1) the page is re-ported, not fixed in place: the current page has three `Section`s, a route-local `next/image` wrapper and a children-only text helper where legacy has a `Title`, a `Container` and a `VStack` of captions and ui `Image`s, and the port rule says in doubt re-port; the removals and the copy land first on the current page, on Sonnet, so the re-port carries settled text and its review is structure only, the home's shape (`fd9a92bd8abd`); (2) the removals slice blocks on the document head slice `ffe8e5d56f8e`, whose title template renders `Grid Beam: About`, and on the home's removals slice `4faefea81c76`, whose bump note it corrects (`/about` renders no `LinkCard` after it), both done, so the slice is ready at the split; (3) as on the home, the published `1.2.0` size hooks throw on legacy's `sizes={{ base: 'container.md' }}` (`dist/components/media/hooks.js:52`, the name restored only in the sibling, `252edab16c7a`, `upstream`), and no slice waits on a publish (`28c1a536`), so the re-port writes `'768px'`, the width `0.9.0` resolved `container.md` to, which renders the identical `sizes="768.00px"` attribute, and files that as one code item on `/about` moved to `upstream` citing ui commit `1c3e3e8`, with a bump note naming the six call sites; (4) the ui `Title` at `1.2.0` wraps its heading in `Container maxW="2xl"` (672px) where legacy's `ui-page` `Title` used `container.md` (768px); no shell item named it (`8a3babf21c3c` is `CardsLayout`'s container, the same rename), so it is filed at the split as `318456ddabc6` (`shell`, code, `regression`), the ui's to fix by a slice beside the shell record at the about's finish (decision `40abdb2f222a`), never in the route; (5) Chakra v2's `container.md` on the page's own `Container` becomes v3's `breakpoint-md` (768px, the same width), rule 4, named in the re-port's Outcome; (6) the page stays one server file, since legacy's page calls no hook of its own and every ui component it renders is a client module, so the home's two-file mechanism (`091a47cb93e7`) is not forced; the Outcome says so if it turns out to be. Items already the operator's: none `open` on `/about` at the split. Expected stops: none for the slices; at the finish, the `upstream` sizes item waits on the bump plan `99f2fe62c62f` as the home's does, and the record finishes on `40abdb2f222a`. Review findings taken, all eleven: the caption count is six, not seven, in both DOM checks and the re-port's paragraph; the copy slice's `&nbsp;` count before is 4 on the page the removals leave; a client file, if one is forced, files an `open` code item citing `091a47cb93e7` rather than treating it as settled; the `Title` container item filed now rather than on a condition the about heading never meets; the removals' bump note also takes `/about` out of the links note's `isExternal` list and the `Section` note's band list, and drops an untested claim about the sibling override; the verify-first grep's output described as it is; `65c21e08b3f1` cited for `NextSeo` to `metadata`; the fasteners image at its intrinsic 685px on the pairs; the `sizes` item filed `regression` then moved to `upstream`, with the publish-first case; two `HomePage.tsx` lines. Dropped: none.

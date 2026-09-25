---
title: "Route: home"
status: doing
parent: 337e35d86920
blocked_by: a78b167170b8
---

## Goal

The route `/` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `/` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=/ --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/ --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log

- 2026-09-26: Split into eight slices (plan fd9a92bd8abd), reviewed once on two Opus sub-agents. Site-side against `@villagekit/ui@1.2.0`, in the order the edges give: `4faefea81c76` the added sections, the second hero button and the per-page metadata removed (Sonnet); `2de4b709bb36` the copy verdicts applied on the current page (Sonnet); `6f90e7e24ca6` `MediaProvider` mounted in the shell for the home's ui `Image` and `Video` (Fable); `0bb6cc8ab1ad` `Testimonial` fixed in place (Opus); `e332105c3b52` the story card re-ported from legacy's stories `Item` (Fable); `c92c235205f5` `ImageCarousel` re-ported onto `react-responsive-carousel` (Fable); `60cca8519469` `DesignCarousel` and `useDesignTypingEffect` re-ported (Fable); `159c621d8a1a` the page re-ported from `pages/index.tsx` (Fable), last, consuming the rest. Every `regression` on `/` is closed by exactly one slice except `272613135119`, whose fix is the designs lib's (`app/_lib/designs.ts`: the generated module, the label sort and the nullable image, the same mechanism as `abb539b3555e` on `/designs`) and not the home's to make: at the finish it goes on the home's verdicts plan (decision `40abdb2f222a`), the item carrying a note. No home item cites `app/_lib/url-state.ts`. Calls made at the split, for the operator to read: (1) the page is re-ported, not fixed in place, since 107 items span every axis and the port rule says in doubt re-port; its slice is the largest, over the five hundred lines the layout slice held itself to, because a re-port replaces the file whole and deletes the drifted module, and a split by section would leave every intermediate state a hybrid of two frames; (2) the copy lands first, on the current page, on Sonnet, so the re-port carries settled text and its review is structure only; (3) the published `1.2.0` size hooks throw on legacy's `sizes={{ base: 'full' }}` (`dist/components/media/hooks.js`, `Unexpected size value`), the name restored only in the unpublished sibling (`252edab16c7a`, `upstream`), and no slice waits on a publish (`28c1a536`), so the three slices that write a `sizes` object write `'100%'`, the value legacy's own `useSizeWidths` resolved `full` to, which renders the identical `sizes` attribute (`100.00vw`); the carousel slice files that deviation as one code item on `/`, moved to `upstream` citing ui commit `1c3e3e8`, with the bump note naming every call site to swap back to `'full'`; (4) the ui `Image` and `Video` need a cloud name at `1.2.0`, so a prefactor slice mounts `MediaProvider` in `SiteProvider` and files the mount on `shell` as an `open` addition superseding `0efe45924dbe`, which moves to `open` with a note; both go on the shell's verdicts plan `77cf83a1285a`; at the bump the provider takes `imageComponent={NextImage}`; (5) `1.2.0`'s `Link` takes no `isExternal`, so the two inline anchors' `rel` (`58252b32e362`) moves to `upstream` at the page slice with a bump note, the fix being the recipes slice's ui commit `540e9c3`; (6) the story card re-port fixes the `/stories` items the same change closes, the ledger being the current state, and leaves `2c38c9e6a5da` (the icon's exposure, whose Log asks the operator first) with a note; (7) at `1.2.0` a `local` ui `Image` has no loader of its own and falls through to the site's Cloudinary `loaderFile`, so the design images keep `unoptimized`, filed by the design carousel slice as an `open` code item on `/` for rule 4 (a consequence of `6c566c2715e0`); (8) the two-file page (server metadata, client body) is upgrade-forced and filed `open` by the page slice for rule 4, as the adapter slice filed `1eddda919812`. Items already the operator's: none `open` on `/` at the split. Expected stops: none for the slices; at the finish, the three `open` items on `/` the slices file (the `unoptimized` design images, the two-file page, and `272613135119`) go on the home's verdicts plan, so the record finishes on `40abdb2f222a`. Review findings taken: the leftover's owner named; the expected stops named; the testimonial's aria line rewritten to legacy's two paragraphs; the carousel and design carousel slices blocked by the copy slice, since they touch the hero's alts and the typing section's file; the DOM-diff lines in three slices name the typed label and the later slices' residuals; the media slice's baseline capture and its check timing; the testimonial slice's Interfaces line; the LinkCard bump note corrected by the removals slice; the story card's external overlay in the `asChild` shape, since Chakra v3's `LinkOverlay` drops `rel`; the `unoptimized` finding above; the MDX metadata imported in the server page and cast; five line citations. Dropped: a 200 check on each carousel clone's image URL at the bump (the bump plan's pairs cover it).

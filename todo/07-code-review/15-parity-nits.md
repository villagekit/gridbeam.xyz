# 15 — Small parity nits batch (visual / a11y)

**Status:** TODO

## Why

Individually-small deviations from the legacy baseline, none with a stated reason. Batched so a future agent can knock them out in one or two passes. Per stream rules: restore legacy unless there's a concrete reason not to; a few items below are flagged as "possibly fine — decide and record".

## The inventory (2026-08-03 — verify each before changing)

**Theme / global:**
- Smooth scrolling lost: legacy theme set `html { scrollBehavior: 'smooth' }` (`../node-modules/apps/gridkit/theme.ts:17-23`); neither ui's theme nor the app sets it. Affects anchor/skip-nav jumps site-wide. (Respect `prefers-reduced-motion` when restoring.)
- `radii.xl: '1rem'` override lost (legacy theme.ts:13-15) — landing media corners are squarer than legacy. Decide: restore in app-level theme extension or accept Chakra v3 default (record either way).
- No `preconnect` to `res.cloudinary.com` (legacy `_app.tsx:75-86` had it; hero LCP image is served from there). Cheap win — add to `app/layout.tsx`. Legacy also shipped `site.webmanifest` + mask-icon; decide whether to port.

**Landing:**
- `LandingSection.tsx:15` `maxW='6xl'` (1152 px) vs legacy `maxW="1500px"` + `paddingX 16` — desktop landing reads noticeably narrower. Check against the live legacy site before changing; Stream 06's 03-home task may have chosen this deliberately (its decision table is the place to check/record).
- Legacy media rows were height-capped (200/350 px, `objectFit: cover`); new `LandingPhoto`/`LandingVideo` render natural aspect — much taller. Same check-then-decide.
- `LandingPhoto.tsx:26` — `fill` with no `objectFit`; add `objectFit: 'cover'` (also noted in `./10-media-transforms.md`; tick once).
- `TypingDesignSection.tsx:49-58` — the `<Heading as="h2">` is `aria-hidden` and the accessible text lives in a sibling non-heading `VisuallyHidden`, so the h2 vanishes from the page outline. Legacy nested the VisuallyHidden *inside* the Heading. Restore that structure (keep the live region separate if the re-render concern was real).
- `not-found.tsx:41-44` hard-codes `#831843`/`#fffbea` — use theme tokens; verify the `metadata` export in not-found files is actually honored by Next.

**Catalogue / designs:**
- Suspense fallback grid ≠ live grid: `CatalogueStatic.tsx:23` `{base:1, sm:2, lg:3, xl:4}` vs `Catalogue.tsx:245` `{base:1, sm:2, xl:3}` — visible column reflow on hydration. Make them identical (whichever is intended).
- Mobile density: legacy list was `{base: 2, lg: 3}` (2-up on phones); new is 1-up. Restore 2-up or record why not.
- `role="search"` landmark lost on the catalogue search (legacy InputGroup had it).
- Card focus style: legacy had `_focusWithin` box-shadow on the card image when the link is focused; new `ItemCard` has no visible focus treatment. Restore an equivalent.
- Category-badge keyboard pattern: new `role="radio"` badges are all `tabIndex={0}` with no roving tabindex/arrow keys — not the ARIA radiogroup contract. Options: proper roving-tabindex radiogroup, or plain `aria-pressed` toggle buttons like `StoriesBrowser` deliberately uses (consistency argues for the latter). Legacy was equally non-conforming, so this is upgrade-not-parity — small, but do it right.
- Overview tab is nearly empty: legacy Overview held `{description}` + Product Care; new moved description under the h1, leaving just "Product care". Defensible — but decide and record (merge tab away, or move description back).

**Stories:**
- Category color drift: legacy guide=`primary` (pink), inspiration=`purple`, newsletter=`accentA`, All-chip=`accentB`; new guide=`accentB` — indistinguishable from the All chip (`StoryCard.tsx:28-32`, `StoriesBrowser.tsx:21-26`). `primary` exists in the new theme (`ui/src/theme/colors.ts:49`). Restore guide=`primary`.
- Index width: legacy grid in `maxW="8xl"`; new constrains to `5xl`/`4xl` — cards render smaller at desktop (`app/stories/page.tsx:36-41`). Check vs live legacy; restore or record.
- Newsletter `Description` component dropped: legacy wrapped intro/outro lines in `<Description textAs='div'>` (centered, larger); ui still exports `Description`. Restore in the two newsletter MDX files.
- Story-page h2 alignment: legacy story MDX centered h2s; ui's `MdxHeading` forces `flex-start`. Story-scoped override or recorded decision.
- Filter param `?f=` vs legacy `?filter=` and replace-vs-push history: gratuitous deviation; cheap to align, or record.
- Filter animation: legacy animated card enter/exit with `AnimatePresence` (framer-motion is already a dep); new list just re-renders. Nice-to-restore, low priority.
- Card date format `15 Sept 2021` vs legacy numeric `15/09/2021`, and the new date line on story pages — arguably improvements; get a keep/revert call and record it (fold into `./11-copy-reconciliation.md`'s decision list if presenting to Mikey anyway).

## Steps

- [ ] Verify each against current code + the live legacy site (https://gridkit-landing-villagekit.vercel.app/) — several may have been deliberate Stream 06 choices; check the 06 task decision tables before "fixing".
- [ ] Batch by area (theme/global → landing → catalogue → stories), commit per batch.
- [ ] For every "decide and record" item, write the decision into the relevant Stream 06 task file or this one — the point is ending the *silent* deviations, not mandating reverts.
- [ ] Re-run the Stream 06 audit tooling (`pnpm audit:pages`) after, for before/after screenshots.

## Notes

- Wiggle room is the design of this task: each item is restore-or-record, never silent either way.

## Depends on

- `./11-copy-reconciliation.md` overlaps on a few judgment items — coordinate the Mikey-decision list.
- Stream 06 audit tooling for verification (`todo/06-design-parity/01-audit-tooling.md`).

## Files

- See inventory; legacy references in `../node-modules/apps/gridkit/` (update checkout first — stream README point 4).

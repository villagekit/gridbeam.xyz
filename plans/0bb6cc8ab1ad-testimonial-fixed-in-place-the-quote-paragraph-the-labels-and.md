---
title: "Testimonial fixed in place: the quote paragraph, the labels and the breakpoint hook"
status: done
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
tags:
  - "worker:opus"
priority: medium
---
`Testimonial` is legacy's `components/testimonial.tsx` again, fixed in place: the quote renders a paragraph, the section is named `Testimonial` and the quote and name carry their `aria-label`s, and the font size comes from `useBreakpointValue` at the `xl` breakpoint, as the legacy component did; the file moves out of the `landing` module, which the page re-port deletes, to `app/_components/Testimonial.tsx`, the module location legacy's `@/components` gave it. The shape is legacy's file line for line, the edges (Chakra v3 props, the client boundary) are the work, so Opus. Four items on `/`. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`.

## Work

- Legacy: `../node-modules/apps/gridkit/components/testimonial.tsx` at `fce357d` (40 lines). Current: `app/_components/landing/Testimonial.tsx`.
- [[188c3f4b718f]]: the quote is `<Text>` with no `as="span"`, so it renders `<p>` (Chakra v3's `Text` defaults to `p`); [[4bae9fe2b245]]: `aria-label="Quote"` on it and `aria-label="Name"` on the name; [[0538bfb1e38a]]: `aria-label="Testimonial"` on the `VStack as="section"`, one shared name; [[1bbb3def5d97]]: `isXlScreen = useBreakpointValue<boolean>({ base: false, xl: true }, { fallback: 'xl' })` from `@villagekit/ui` picking `fontSize={isXlScreen ? 'md' : 'sm'}` on both texts, the `alignSelf="center"` on the name gone (legacy's `VStack` centers its children by default). Chakra v3 translations: `spacing="2"` to `gap="2"`, `sx={{ flex: 1 }}` to `flex="1"`, `BlockSection`'s `sx={{ flex: 1, width: '100%' }}` to `css`, `sx={{ fontStyle: 'italic', textAlign: 'center' }}` and `sx={{ color: 'gray.500' }}` to style props or `css`, each named in the Outcome. The `'use client'` directive stays: the hook forces it, and legacy's component is a separate module too (the item's note), so the boundary is upgrade-forced.
- Move the file to `app/_components/Testimonial.tsx` with `git mv`; update `app/_components/landing/index.ts` (drop the export) and the import in `app/page.tsx`.
- Interfaces: produces `Testimonial` at `app/_components/Testimonial.tsx` for the page re-port.
- Verify first: `grep -n 'as="span"\|alignSelf\|aria-label' app/_components/landing/Testimonial.tsx` prints the three lines to change; `node_modules/@villagekit/ui/dist/index.d.ts` exports `useBreakpointValue` and `BlockSection`.
- Not this slice: the row of three testimonials in the page (its `Stack` gap is the page re-port's [[fde554c6891c]]); the testimonials' copy (the copy slice).

## Seams under test

None pure; the proof is the aria tree and the pairs.

## Done when

- `pnpm audit:dom --routes <a file naming />` against a running `pnpm dev`: `audit/_root/dom/current.aria.yaml` holds three `region "Testimonial"`, each holding two `paragraph` children (the quote, then the name), as `legacy.aria.yaml` lines 41-49 do; `grep -c 'aria-label="Quote"' app/_components/Testimonial.tsx` prints 1 and the same for `Name`
- At 1280 the quote's computed font size is 16px and at 1024 it is 14px (a Playwright read of one `.chakra-text` inside a testimonial region, or the pairs at 768 and 1280 looked at against legacy)
- `ls app/_components/Testimonial.tsx` succeeds and `ls app/_components/landing/Testimonial.tsx` fails
- The four items are `fixed`, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped: `Testimonial` fixed in place against legacy's `components/testimonial.tsx` at `fce357d` and moved with `git mv` to `app/_components/Testimonial.tsx`, the `landing` barrel's export dropped and `app/page.tsx` importing the new path. The file follows legacy line for line (the `TestimonalProps` spelling, the `useBreakpointValue<boolean>({ base: false, xl: true }, { fallback: 'xl' }) as boolean` call and cast, the three `aria-label`s), with its `// ported from` header. The current code's own additions are gone: the per-author region name, `as="span"` on the quote, `w="full"` and `alignItems="stretch"` on the stack and `alignSelf="center"` on the name (Chakra v3's `VStack` centers its children, `node_modules/@chakra-ui/react/dist/esm/components/stack/v-stack.js`). Fixed: `188c3f4b718f`, `4bae9fe2b245`, `0538bfb1e38a`, `1bbb3def5d97`.

Chakra v2 to v3 translations: `spacing="2"` to `gap="2"`; the stack's `sx={{ flex: 1 }}` to `flex="1"`; `BlockSection`'s `sx={{ flex: 1, width: '100%' }}` to `css={{ flex: 1, width: '100%' }}` (typed on `BlockSectionProps`); the quote's `sx={{ fontStyle: 'italic', textAlign: 'center' }}` to the `fontStyle` and `textAlign` style props; the name's `sx={{ color: 'gray.500' }}` to `color="gray.500"`; `BlockSection` imported from `@villagekit/ui` in place of the private `@villagekit-private/ui-page`. The `'use client'` directive stays: the hook forces it, which makes the boundary upgrade-forced (a note on `1bbb3def5d97`).

Proof: `pnpm audit:dom` on `/` against `pnpm dev`: `audit/_root/dom/current.aria.yaml` holds three `region "Testimonial"`, each with two `paragraph` children, quote then name, as `legacy.aria.yaml` lines 41-49 do. A Playwright read of the first testimonial on both sides: the quote and the name at 14px at 375 and 1024 and at 16px at 1280, italic and centered, the same as legacy. The pairs at 375, 768 and 1280 looked at: the row gap and card widths are `fde554c6891c` (the page re-port's) and the grays are the shell palette's. `timeout 900 just check` green.

Review: Standards, Spec and Parity on fresh Opus sub-agents, no critical finding. Taken: the four items fixed after the fixes; a note on `1bbb3def5d97` saying the directive is kept as upgrade-forced; a note on `418682fd0f5f` whose Places list named the moved file. The Parity reviewer asked whether the dev "1 Issue" badge is new: a console read shows its cause is `app/_components/StoryCard.tsx:57`, the `'[data-story-image]'` selector key that Emotion reads as a kebab-case property, committed before this slice and not the testimonial's; left for the story card slice `e332105c3b52`. Dropped: none.

## Log

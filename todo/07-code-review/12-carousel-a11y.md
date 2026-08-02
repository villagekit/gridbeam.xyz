# 12 — ImageCarousel: accessibility + dead half

**Status:** TODO

## Why

The hero carousel (`app/_components/landing/ImageCarousel.tsx`, 2026-08-03) has three a11y problems and carries a large unreachable code path:

1. **No pause affordance.** WCAG 2.2.2 (Pause, Stop, Hide) requires auto-moving content lasting >5 s to be pausable. Legacy's `react-responsive-carousel` paused on hover (`stopOnHover` default). The new component auto-rotates forever with no pause.
2. **`aria-live="polite"` while auto-rotating** (~lines 127-129) — re-announces every slide change every 4 s to screen readers, forever. WAI-ARIA APG carousel pattern: the live region must be `off` during automatic rotation, `polite` only when the user controls rotation.
3. **Reduced-motion users lose content** (~lines 42-47): `prefers-reduced-motion` → slide 1 only, and because `isInteractive` requires `!autoPlay`, they get **no controls** — slides 2-4 are unreachable.
4. **~Half the component is dead**: arrows, dot indicators, keyboard handler, `tabIndex`, `goPrev/goNext` (~lines 49-79, 131-189) are only reachable when `autoPlay` is false, and the sole consumer (`app/page.tsx:137`) sets `autoPlay`. `CarouselSlide`/`ImageCarouselProps` type exports in `landing/index.ts:1` are unused. Legacy's generic carousel was shared with the store; that consumer is gone.

Bonus nit: interval 4000 ms vs legacy 5000 ms, no reason stated.

## What

A carousel that meets WCAG 2.2.2 and the APG carousel pattern, with no unreachable code — ideally by making the interactive half *earn its keep* as the pause/reduced-motion experience rather than deleting it.

## Steps

- [ ] Re-read the component first — Stream 06 built it recently and it may have moved.
- [ ] Design pass (small): the elegant resolution ties findings together — rotation pauses on hover/focus AND via a visible pause button; reduced-motion → autoplay off but dots/arrows shown (the "dead" interactive half becomes the fallback UI); `aria-live` flips `off`↔`polite` with rotation state per APG. Compare with the APG "auto-rotating image carousel" example before implementing.
- [ ] Implement; restore the 5000 ms legacy interval unless there's a reason for 4000.
- [ ] Trim what's still dead after the redesign (e.g. unused type exports in `landing/index.ts`).
- [ ] Test: keyboard-only operation, VoiceOver/NVDA announcement behavior while rotating vs paused, `prefers-reduced-motion` emulation, hover-pause.

## Notes

- Wiggle room: if making the interactive half the reduced-motion/pause UI turns into a rewrite, the acceptable fallback is: hover/focus-pause + pause button + live-region fix + reduced-motion shows controls, and delete the rest. WCAG 2.2.2 and content reachability are the non-negotiables; the code-shape is flexible.
- This component matters beyond the hero: `./11-copy-reconciliation.md` M2-adjacent — the newsletter stories downgraded legacy image *carousels* to grids citing a dep cost that no longer exists now this in-repo carousel exists. If this task leaves the component solid, filing a follow-up to restore `StoryImageCarousel` on top of it becomes attractive (one-large-image viewing, portrait orientation support, LCP `priority` were the losses). Record a decision either way.

## Depends on

- Nothing.

## Files

- `app/_components/landing/ImageCarousel.tsx`, `app/_components/landing/index.ts`, `app/page.tsx` (consumer)
- Legacy behavior reference: `../node-modules/apps/gridkit/components/image-carousel.tsx` (+ `react-responsive-carousel` defaults)

# 05 — Uplift: FAQ (`/faq`)

**Status:** TODO

## Why

The FAQ content has been correctly rewritten for the non-commercial framing (Orders/Returns gone, Suppliers added). The remaining issues are visual: the spacing between accordion items is too generous, and the per-category section headings ("The system", "Lifespan and reuse") are smaller than the questions and read as labels rather than dividers.

## Concrete regressions

From `audit/faq/{375,768,1280}/{legacy,current}.png` and `app/faq/page.tsx` ↔ `node-modules/apps/gridkit/pages/faq.tsx`:

### Visual
- Accordion items have noticeably more vertical air between them than legacy. The page reads taller and emptier.
- Section headings ("The system", "Lifespan and reuse", "Suppliers", "Other") are rendered at `size="lg"` but with similar weight to the question text. They don't read as dividers — easy to miss when scanning.
- The dotted/dashed borders on accordion items match Chakra v3 default; legacy used a similar treatment, but tighter.

### Interaction, Accessibility, Copy, Code
At parity. Categories use `<section aria-labelledby="faq-…">`, accordion behaviour is `multiple collapsible` (matches legacy), copy is rewritten appropriately for non-commercial.

## Recommended mode

**Restore close to legacy on visual.** Tighten accordion item spacing; bump section heading weight/size so they read as dividers; otherwise leave the page as-is.

## Steps

- [ ] Tighten the `gap` on each category's `Accordion.Root` (and the gap between accordion items inside it) to roughly half what's there now. Compare side-by-side with `audit/faq/1280/legacy.png`.
- [ ] Bump section heading from `size="lg"` to `size="xl"` (or apply `fontWeight="bold"` + a margin-bottom that creates clear visual separation from the questions below).
- [ ] Consider adding a thin top border on each category section for additional visual separation (legacy used spacing alone, but a border can help if spacing tweaks aren't enough).
- [ ] Re-verify at 375 / 768 / 1280 px.

## Notes
- The `Accordion` indicator (chevron) and per-item dashed underline are appropriate; don't change those.
- This is a small task — likely 30 mins of CSS tweaking. Ship it as a single commit.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/faq/page.tsx`
- Legacy: `node-modules/apps/gridkit/pages/faq.tsx`

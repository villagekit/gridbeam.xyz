# 05 — Uplift: FAQ (`/faq`)

**Status:** DONE

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

- [x] Tighten the per-row padding on each `Accordion.ItemTrigger` / `Accordion.ItemContent` (paddingY="3" override; the shared `@villagekit/ui` Accordion recipe still defaults to 4 since other consumers may want the looser default).
- [x] Bump section heading from `size="lg"` to `size="xl"` so it reads as a divider, not a label.
- [x] Bump parent `VStack` `gap="10"` → `gap="12"` (matches legacy `spacing="12"`); inner `VStack` `gap="3"` → `gap="4"` (matches legacy `marginBottom: 4` on heading).
- [x] Re-verify at 375 / 768 / 1280 px.
- [x] Fix incidental a11y: `<Text>` (renders `<p>`) inside `Accordion.ItemTrigger` (renders `<button>`) is invalid HTML; added `as="span"`.

## Notes
- The `Accordion` indicator (chevron) and per-item dashed underline are appropriate; don't change those.
- The shared `@villagekit/ui` `Accordion` recipe is intentionally NOT modified — the tighter spacing is a /faq-page choice, applied via style props locally so future consumers keep the looser default.
- The `paddingX: 2` on trigger vs `paddingX: 4` on content in `ui/src/components/Accordion.recipe.ts` is asymmetric; not in scope for this task but worth a `// Note(cc):` follow-up.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/faq/page.tsx`
- Legacy: `node-modules/apps/gridkit/pages/faq.tsx`

---
title: "FAQ data: an object keyed by category label with lodash map to a typed array with slugs"
status: regression
route: /faq
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:22-29` `interface FaqEntries { [category: string]: Array<{ question, answer }> }`, `const faq: FaqEntries`, iterated with lodash-es `map` (`:341,348`); the section id is the label, `` `faq-${category}` `` (`:342-343`), giving `faq-Product` and `faq-Returns & Support` (a space and an ampersand in an id, so that section's `aria-labelledby` resolves to nothing: `audit/faq/dom/legacy.aria.yaml` an unnamed `region` before `heading "Returns & Support"`).

## Current

`app/faq/page.tsx:32-43` `interface FaqEntry`, `interface FaqCategory { heading, slug, entries }`, `const categories: Array<FaqCategory>`, iterated with native `.map` (`:294,306`); ids from the slug, `` `faq-${category.slug}` `` (`:298,302`): `faq-system`, `faq-lifespan`, `faq-suppliers`, `faq-other`, every region named.

## Verdict

## Log

- 2026-09-12: Regression by the rule's absence; the slug field is what fixes the legacy id defect, which the operator may weigh under rule 5.

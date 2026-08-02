# 01 — Fix fabricated "Phelps" history + attribution errors

**Status:** DONE

## Why

The site presents itself as educational, and it currently teaches a false history. The copy credits the original 1½″ grid beam to "Phelps" — a person/name that appears in **no legacy source and no external source**. The real lineage: Ken Isaacs (Matrix / Living Structures, 1950s–70s) → **Phil and Richard Jergenson**, who standardized the system and named it "grid beam". The legacy site's own 2022 newsletter states this: it thanks "Phil and Richard Jergenson … the original inventors of Grid Beam" (`../node-modules/apps/gridkit/pages/stories/2022-newsletter.mdx`, ~line 256). "Phelps" is a hallucination that has also spread into this repo's todo docs, where it's now cited as established fact — so a code-only fix will get re-introduced by the next agent that reads the docs.

Secondary attribution errors in the same copy: Richard Jergenson (and co-author Wilma Keppel) are erased — the book is credited as "Phil Jergenson's 'How to Build with Gridbeam'". The book is *How to Build with Grid Beam* (two words) by Phil Jergenson, Richard Jergenson, **and Wilma Keppel**.

## What

Every occurrence of "Phelps" removed from shipped copy AND from todo docs; attribution corrected to the Jergensons (both) and Isaacs where the history is told; book title and authorship corrected.

## Known occurrence inventory (2026-08-03 — re-grep, don't trust this list)

Shipped copy:
- `app/about/page.tsx:61` — "the original 1½″ Phelps grid beam in the 1970s"
- `app/about/page.tsx:155-156` — "Phil Jergenson took that idea, refined the geometry, and named the result grid beam" (erases Richard)
- `app/faq/page.tsx:52-53` — "Developed by Phil Jergenson in the 1970s"
- `app/faq/page.tsx:123` — "Phil Jergenson's original grid beam"
- `content/suppliers.ts:41` — "Imperial profile — the original Phelps grid beam, traced back to Ken Isaacs' Living Structures."
- `content/suppliers.ts:43` — "Phil Jergenson's 'How to Build with Gridbeam' book"

Todo docs (the contamination vector; inventory re-verified by grep on 2026-08-03):
- `todo/01-website/03-home-page.md:13,25` — "Original Phelps grid beam was 1.5″ on a four-bolt cycle"
- `todo/01-website/04-educational-pages.md:50` — flags home-page "Phelps detail" copy for a future pass
- `todo/01-website/08-suppliers.md:29,36` — "the OG Phelps grid beam, Ken Isaacs / Phil Jergenson lineage"
- `todo/06-design-parity/04-about.md:7,38,39,56,60` — the audit praises "the Phelps history" as an improvement
- `todo/06-design-parity/initial-audit/findings.md:40,42`

Note: `app/faq/page.tsx` contains no "Phelps" — its issue is only the Phil-alone attribution lines listed above. `app/page.tsx` describes the original profile (~line 104, "1.5″ … four-bolt cycle") *without* naming anyone — check whether surrounding home copy needs the corrected attribution once about/suppliers are fixed.

## Steps

- [x] `grep -ri phelps` across the whole repo (including `todo/`) to build the real inventory; the list above may be stale or incomplete.
- [x] Independently sanity-check the corrected lineage before writing it (don't take this task file's word either): the legacy 2022 newsletter credit line, plus e.g. the book's own listing (*How to Build with Grid Beam*, Jergenson/Jergenson/Keppel, Microcosm 2008) and Ken Isaacs' Living Structures. If sources disagree with this task, follow the sources and note it below.
- [x] Fix shipped copy: replace the fabricated attribution. Where a name isn't needed, "the original 1½″ grid beam" is fine; where the history is told (about page), credit Isaacs as the precursor and "Phil and Richard Jergenson" as the people who refined and named grid beam.
- [x] Fix the book reference in `content/suppliers.ts`: correct title, all three authors (or "the Jergensons' *How to Build with Grid Beam*" if space is tight).
- [x] Scrub `todo/` docs: correct the Phelps mentions in place (don't delete the historical task files — annotate, e.g. "~~Phelps~~ (fabricated — see 07-code-review/01)" so the record shows why the docs changed).
- [x] Re-grep to confirm zero remaining occurrences.
- [x] Optional but recommended: add one `// Note(cc):` near the about-page history block pointing at the primary sources, so future copy edits have a citation trail.

## Notes

### Outcome (2026-08-03)

**Finding confirmed.** No "Phelps" source exists. Verified independently of this task file:

- Legacy 2022 newsletter (`node-modules@917daac apps/gridkit/pages/stories/2022-newsletter.mdx:256`) — "We are forever grateful to Phil and Richard Jergenson for sharing the Grid Beam system with the world", and calls Phil "one of the original inventors".
- Book listings (Amazon / Google Books / AbeBooks, ISBN 9780865716131) — *How to Build with Grid Beam: A Fast, Easy and Affordable System for Constructing Almost Anything*, by **Phil Jergenson, Richard Jergenson, and Wilma Keppel**. Publisher is **New Society Publishers, 2008** (this task file said Microcosm — wrong; corrected here, not in shipped copy since the publisher isn't cited on the site).
- faircompanies interview + P2P Foundation / replimat write-ups — Isaacs' precursor system was **Matrix** (2×2 lumber, trilap joints, *uneven* hole pattern); the Jergensons' contribution was regularising the hole pattern into a full grid and naming it. Two targeted searches for a "Phelps" in grid-beam history returned nothing.

**Copy changed:**

- `app/about/page.tsx:61` — dropped the fabricated name: "the original 1½″ grid beam in the 1970s".
- `app/about/page.tsx` "Where it came from" — now "Phil and Richard Jergenson"; also corrected the *Isaacs* sentence, which said his manual showed structures "built from a kit of identical drilled timbers". That overstates Matrix (uneven holes) and quietly attributes the Jergensons' actual contribution to Isaacs. Now: Isaacs showed "a kit of bolted-together timbers", and the Jergensons "made the hole pattern regular so that every beam was interchangeable".
- `app/faq/page.tsx:52` — "Developed by Phil and Richard Jergenson in the 1970s".
- `app/faq/page.tsx:123` — "The Jergensons' original grid beam".
- `content/suppliers.ts:41` — "the original grid beam" (name dropped).
- `content/suppliers.ts:43` — full correct title + all three authors. Kept long rather than "the Jergensons'" — restoring erased credit is the point of the task, and the blurb renders as a full-width `Text` in the supplier card, so length is fine.
- `Note(cc):` citation trail added above the about-page history block.

**Stale items in this task file's inventory** (the code moved since the review):

- `app/page.tsx` no longer contains the "1.5″ … four-bolt cycle" sentence at all — Stream 06's home-page rework removed it. Nothing to fix there, and the corresponding follow-up in `todo/01-website/04-educational-pages.md:50` is now struck through as stale.
- `todo/06-design-parity/04-about.md` had 5 mentions as listed; `initial-audit/findings.md` had 2. Both annotated with a dated correction note rather than silently rewritten.

**Remaining "Phelps" hits are intentional:** this task file, the two Stream 07 task files that cross-reference it, the dated annotations in the Stream 01/06 docs, and the `Note(cc)` in `app/about/page.tsx`. Zero occurrences remain as an *asserted fact*.

**Verification:** `pnpm typecheck` clean, `pnpm lint` (biome, 81 files) clean.

- Wiggle room: if you find a legitimate "Phelps" source (a real person in grid-beam history the reviewer missed), STOP and ask Mikey before scrubbing — but the reviewer searched both legacy repos and the web and found nothing.
- The FAQ "Developed by Phil Jergenson in the 1970s" fix overlaps with `./03-faq-and-suppliers-claims.md`; do the attribution part here, the unsourced-materials claims there.
- External references used by the review: replimat.org grid-beam history page; faircompanies video interview with the Jergenson brothers; the book's Google Books entry; Ken Isaacs' Wikipedia page.

## Depends on

- Nothing. Do this first.

## Files

- `app/about/page.tsx`, `app/faq/page.tsx`, `content/suppliers.ts`
- `todo/01-website/03-home-page.md`, `todo/01-website/08-suppliers.md`, `todo/06-design-parity/04-about.md`
- Legacy ground truth: `../node-modules/apps/gridkit/pages/stories/2022-newsletter.mdx`

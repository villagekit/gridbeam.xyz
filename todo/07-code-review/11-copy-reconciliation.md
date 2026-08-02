# 11 — Copy-rewrite reconciliation (decision list for Mikey)

**Status:** TODO (decision-gated — every item below needs an explicit keep/revert call from Mikey)

## Why

Beyond the copy decisions locked in during Stream 06, the rebuild rewrote baseline copy in many places with no stated reason. Per the repo's rules, legacy copy is the default and rewrites need approval. This task is deliberately structured as a **decision list**: present each item to Mikey, record the call, then apply. Do NOT batch-revert without asking, and do NOT silently keep the rewrites.

## The list (verify each against current code before presenting — line refs are 2026-08-03)

**Home (`app/page.tsx`):**
1. `:184-191` — "How does it work?" section heading + paragraph → "One simple part. Endless configurations." + new paragraph; CTA "Learn more" → "Read the full intro".
2. `:241` — legacy "Have fun assembling your imagination." → "Have fun assembling your design." (Stream 06's 03-home.md locked hero/testimonials/sustainability/step 6 — this line wasn't in the locked set.)
3. `:270` — stories blurb: invented "Build logs, field reports, and explainers from people doing it." Legacy: "Discover all things Grid Kit in our collection of articles, guides, and newsletters." The rebrand audit (`todo/04-content/01-rebrand-copy/audit.md:83`) approved: "Articles, guides, and newsletters about building with grid beam." — matches neither.
4. `:319-331` — community paragraph rewritten; lost "solarpunk" and the "showcase your creations, discuss learnings from the past, and present ideas for the future" cadence.
5. `TypingDesignSection.tsx:60-64` — legacy "Perfect for creators, inventors, and other innovative folk…" paragraph fully replaced.

**Stories:**
6. `app/stories/page.tsx:10-11` — same invented "Build logs, field reports…" as item 3 (index page description + meta). Recommend the audited rewrite.
7. `StoryEditorialNote` (`app/_components/StoryEditorialNote.tsx`, used in 3 stories) — the whole device is a defensible invention (newsletters keep "Grid Kit" text + get a historical note), but the note's copy is invented editorial voice, and "the system is what it always was; only the brand has moved" is subtly wrong (Grid Kit was a product line *on top of* grid beam, not an old name for it). Needs: keep/drop the device; if keep, Mikey-approved wording. Also the invented "· originally on gridkit.nz" byline + `originallyPublishedOn` metadata (`app/stories/[slug]/page.tsx:92-96`).
8. `content/stories/how-to-furniture-bolts.mdx:186,208,245` — three `####` headings promoted to `###`, flattening the author's hierarchy. If it was an a11y skip-level fix, state it; else restore h4.

**Cutting planner (`app/tools/cutting-planner/`):**
9. Captions/labels/headings rewritten: "Enter your desired beam lengths here." → "The cuts you need."; "Infeasible beams / We couldn't figure out how to cut these beams." → "Infeasible cuts / These cuts couldn't be made…"; "Unused beams" → "Unused stock"; button "Plan it!" → "Plan it"; meta description leads with the jargon "First-fit-decreasing bin packing".
10. Defaults/controls changed without sign-off: required rows `[{4×30},{8×15}]` → `[{8×10},{4×15}]`; default stock `[{4×60}]` → empty; unlimited-supply **Switch (default off)** → **Select defaulting to 60 gu top-up** with a new 30 gu option. Note: the 30 gu option is plausibly a real improvement (1200 mm is real stock) and `DesignCuttingPlan` depends on it — recommend keeping the Select+30gu and reverting the default quantities, but it's Mikey's call.

**Catalogue (`app/_components/catalogue/Catalogue.tsx` ~`:521-529`):**
11. Empty-state: legacy "…match your search criteria" / "Try again using a different keyword or hit reset" / "Reset search" → "…match your search." / "Try a different keyword or category, or hit reset." / "Reset".

**Subscribe (`app/subscribe/page.tsx:50`):**
12. "there's no audience pressure to rush one" — maintainer-voice justification leaked into visitor-facing copy; suggest cutting the clause.

## Steps

- [ ] Re-verify each item against current code; drop any that have since changed, note any new rewrites found while checking (diff-read each page against its legacy counterpart's copy).
- [ ] Present the list to Mikey item-by-item (a table with legacy text / current text / recommendation works well). Recommendations above are suggestions, not authorization.
- [ ] Apply the calls: revert-to-legacy items get legacy wording with minimal de-branding edits only; approved rewrites get a one-line stated reason in the relevant Stream 06/07 task file.
- [ ] Update `todo/06-design-parity/03-home.md` (and 06-stories-index.md) decision tables so the copy record stays in one place.

## Notes

- Related but handled elsewhere: supplier promises + FAQ claims (`./03-faq-and-suppliers-claims.md`), stories-index description shares item 3's wording.
- The MDX story *prose* needs no reconciliation — it was verified word-for-word faithful apart from sanctioned rebrand edits. Items 7-8 are the only story-file issues.

## Depends on

- Mikey. Nothing technical.

## Files

- `app/page.tsx`, `app/_components/landing/TypingDesignSection.tsx`, `app/stories/page.tsx`, `app/stories/[slug]/page.tsx`, `app/_components/StoryEditorialNote.tsx`, `content/stories/how-to-furniture-bolts.mdx`, `app/tools/cutting-planner/*`, `app/_components/catalogue/Catalogue.tsx`, `app/subscribe/page.tsx`
- Legacy copy ground truth: `../node-modules/apps/gridkit/` (update checkout first — stream README point 4)

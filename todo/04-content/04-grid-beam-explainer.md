# 04 — Rewrite the About / grid-beam explainer page

**Status:** DONE

## Why
The legacy About page explains how Grid Kit's specific products work. The new site's About page should explain **the grid-beam system** as a concept — historically rooted, mathematically clean, modular — that any number of suppliers (or DIYers) can produce parts for.

## What
A fully rewritten About page that:
1. Introduces grid beam as a concept (40 mm grid, holes, fasteners)
2. Names and shows the parts (beams, panels, fasteners)
3. Explains how things connect
4. Gives historical context (Phil Jergenson's open construction system, NopSCADlib, similar systems like Open Structures, t-slot extrusions)
5. Tells the reader what they can do next: browse designs, find suppliers, build their own

## Steps
- [x] Start from `node-modules/apps/gridkit/pages/about.tsx` — review structure (sections, diagrams).
- [x] Outline the new page:
  - Hero: "A 40 mm grid system for building real things."
  - Section 1: The grid — what does "40 mm grid" mean? Diagram.
  - Section 2: Beams — what they look like, dimensions, hole spacing.
  - Section 3: Panels — what they look like, how they fit.
  - Section 4: Fasteners — bolts, nuts, tri-joints.
  - Section 5: How it goes together — show a simple assembly with photos.
  - Section 6: Where it came from — historical credit (Jergenson, the original "Box Beam" book), related systems.
  - Section 7: What you can do — links to designs, stories, suppliers, building your own.
- [x] Draft each section's prose. Aim for ~150 words per section.
- [x] Identify or commission diagrams (the legacy site has some good ones — re-use where possible).
- [x] Cross-check facts: hole spacing? Beam cross-section? Common bolt sizes? Don't write authoritatively about specifics without verifying. *(Verified against `gridkit/parts/{gridbeam,gridpanel,fastener}/src/variants.ts` — see spec table in draft.)*
- [x] Sensitivity check: is there anything that implies "you must buy this from a specific company"? Rewrite. *(Sensitivity check section in draft.)*
- [ ] Pass to Stream 01 task 04 for JSX implementation. *(Draft handed off; Stream 01 task 04 owns JSX.)*

## Notes
- Be honest about the system's lineage. The "open construction" lineage is a credibility win for an open-source educational site.
- Don't be apologetic about the system being "small" or "niche". Lean into the focus.
- Draft v1 lives at `./04-grid-beam-explainer/draft.md`. Four open items at the bottom of the draft for Mikey to confirm before JSX (Jergenson/Isaacs attribution, story KEEP statuses, optional fastener diagram).

## Depends on
- [./01-rebrand-copy.md](./01-rebrand-copy.md)

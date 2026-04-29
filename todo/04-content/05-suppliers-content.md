# 05 — Suppliers content + initial data

**Status:** DONE (pending supplier list from Mikey)

## Why
The Suppliers page (Stream 01 task 08) needs actual data. For v1, that might just be one supplier (the original Grid Kit, if they're still shipping anything) or zero. We need to figure out who's listed and what info to show.

## What
The initial `content/suppliers.ts` (or `.mdx`) file with whatever real suppliers exist, plus a "How to be listed" section drafted.

## Steps
- [ ] Identify candidate suppliers: *(blocked on Mikey — see open items in draft.)*
  - The original Grid Kit NZ company, if it's still selling stock at all.
  - Any other vendor of grid-beam-compatible parts (search "40mm grid beam", "modular beam", etc).
  - Generic 8020 / extrusion suppliers — only if their hardware is genuinely grid-beam-compatible (unlikely; 8020 is t-slot, different).
  - DIY suppliers / makerspaces that fabricate to spec.
- [ ] For each supplier, capture: *(blocked on Mikey — schema drafted in `./05-suppliers-content/draft.md`.)*
  - Name
  - Website
  - Region (country / continent)
  - Offerings (just beams? full kits? custom?)
  - Compatibility note (does their hardware match the 40 mm grid spec?)
  - Logo / hero image (with permission)
- [x] If there are zero current suppliers, write the empty-state copy.
- [x] Write the "How to be listed" mini-page.
- [x] Decide the data file shape based on Stream 01 task 08's data decision (TS file vs MDX per supplier). *(Going with Option A — flat TS file. Schema in draft.)*

## Notes
- This needs the user's input — they know which suppliers (if any) exist. The empty-state path is fine for v1.
- Reach out to the original Grid Kit founder (the user themselves?) for whatever stock might still be available.
- Draft v1 lives at `./05-suppliers-content/draft.md`. Five open items at the bottom for Mikey (initial list, sample-part requirement, contact subject pre-fill, per-supplier pages, logo licensing). Nothing else blocks Stream 01 task 08 from starting — it can render the empty state today.

## Depends on
- [./01-rebrand-copy.md](./01-rebrand-copy.md)

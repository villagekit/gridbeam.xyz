# 05 — Suppliers content + initial data

**Status:** TODO

## Why
The Suppliers page (Stream 01 task 08) needs actual data. For v1, that might just be one supplier (the original Grid Kit, if they're still shipping anything) or zero. We need to figure out who's listed and what info to show.

## What
The initial `content/suppliers.ts` (or `.mdx`) file with whatever real suppliers exist, plus a "How to be listed" section drafted.

## Steps
- [ ] Identify candidate suppliers:
  - The original Grid Kit NZ company, if it's still selling stock at all.
  - Any other vendor of grid-beam-compatible parts (search "40mm grid beam", "modular beam", etc).
  - Generic 8020 / extrusion suppliers — only if their hardware is genuinely grid-beam-compatible (unlikely; 8020 is t-slot, different).
  - DIY suppliers / makerspaces that fabricate to spec.
- [ ] For each supplier, capture:
  - Name
  - Website
  - Region (country / continent)
  - Offerings (just beams? full kits? custom?)
  - Compatibility note (does their hardware match the 40 mm grid spec?)
  - Logo / hero image (with permission)
- [ ] If there are zero current suppliers, write the empty-state copy:
  - "No suppliers are currently listed. Interested in stocking grid-beam compatible hardware? [Contact us](/contact?subject=become-a-supplier)."
- [ ] Write the "How to be listed" mini-page:
  - What "grid-beam compatible" means (link to about / explainer)
  - What we ask of suppliers (no fee, just real-deal)
  - How to get in touch
- [ ] Decide the data file shape based on Stream 01 task 08's data decision (TS file vs MDX per supplier).

## Notes
- This needs the user's input — they know which suppliers (if any) exist. The empty-state path is fine for v1.
- Reach out to the original Grid Kit founder (the user themselves?) for whatever stock might still be available.

## Depends on
- [./01-rebrand-copy.md](./01-rebrand-copy.md)

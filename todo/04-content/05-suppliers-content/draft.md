# Suppliers content + schema — draft

Content for the new `/suppliers` page on gridbeam.xyz. Stream 01 task 08 owns the JSX. The default storage shape is **Option A** from that task: a flat TypeScript file (`content/suppliers.ts`) with strongly-typed entries. This draft proposes the schema and the page copy.

## Schema (TypeScript)

```ts
// content/suppliers.ts
export type Region =
  | 'NZ'        // New Zealand
  | 'AU'        // Australia
  | 'EU'        // Europe (broad — supplier-level country can be a separate field)
  | 'UK'        // United Kingdom
  | 'US'        // United States
  | 'CA'        // Canada
  | 'global'    // ships internationally

export type SupplierOffering =
  | 'beams'           // grid beams (any material)
  | 'panels'          // grid panels
  | 'fasteners'       // bolts, tubular nuts, washers
  | 'kits'            // packaged starter kits
  | 'custom'          // custom mill / cut-to-size service
  | 'design-build'    // supplier also builds designs to order

export interface Supplier {
  id: string                    // url-safe slug, e.g. "gridkit-nz"
  name: string                  // display name
  region: Region
  country: string               // human-readable, e.g. "New Zealand"
  website: string               // outbound URL
  offerings: SupplierOffering[]
  compatibility: string         // freeform: e.g. "40 mm grid, 8 mm holes, M6 bolts — fully compatible"
  blurb: string                 // ~50 words about who they are
  logoUrl?: string              // optional, hosted under our image CDN
  notes?: string                // optional editorial note (e.g. "stocking limited quantities")
  status: 'active' | 'paused' | 'archived'
}

export const suppliers: Supplier[] = []  // see open items
```

Notes:
- Keep `country` as a freeform string rather than ISO codes — easier for "Aotearoa New Zealand" or regional notes.
- `status` matters: a supplier might pause restocking; we don't want to either silently drop them or imply they're shipping. The page filters out `archived` by default and shows a paused-status badge for `paused`.
- `Region` is for filtering. A future v2 can switch to ISO codes once there are enough entries to justify it.

## Page copy

### Hero

> # Suppliers
>
> Places that sell grid-beam-compatible hardware: beams, panels, fasteners, and sometimes full kits. Every supplier on this page makes parts that fit the [40 mm grid spec](/about) — so anything from one supplier mixes with parts from another.

### Empty state (v1, if no suppliers are listed)

> No suppliers are listed yet.
>
> If you make or stock grid-beam-compatible hardware, [get in touch](/contact?subject=become-a-supplier) — we'll add you. Until then:
>
> - **Build your own.** A drill press and a jig is enough to mill beams in your own workshop. The [How to mark and cut grid beams](/stories/how-to-cut-grid-beams) story walks through the basics.
> - **Adapt t-slot.** 80/20-style extrusion isn't directly grid-beam-compatible (different profile, different fastener system) but it's the closest off-the-shelf alternative if you don't want to mill your own.

### Single-supplier card layout (when there are entries)

For each supplier, a card showing:
- Logo (optional)
- Name + country (one line)
- 2-line blurb
- Offerings as small badges (Beams / Panels / Fasteners / Kits / Custom)
- Compatibility note (one line)
- "Visit website" outbound link

Optional: clicking a card opens `/suppliers/[id]` with the full blurb if there's appetite for per-supplier pages. For v1, all info fits on the cards; per-supplier pages can come later.

### Filters (when the list grows)

- By region (NZ / AU / EU / UK / US / CA / global)
- By offering (Beams / Panels / Fasteners / Kits / Custom / Design-build)

Hide the filter UI when fewer than ~5 suppliers are listed.

### "How to be listed" section

> ## How to be listed
>
> If you produce or resell grid-beam-compatible hardware, you can be listed for free.
>
> **What "compatible" means.** Your beams (or panels, or fasteners) honour the [40 mm grid](/about): 40 mm hole spacing, 8 mm hole diameter, M6 bolts. We're material-agnostic — wood, aluminium, recycled, anything that holds a bolt is fine.
>
> **What we ask.** Just that the parts genuinely fit. We don't charge listing fees, take commissions, or require exclusivity.
>
> **How to apply.** [Contact us](/contact?subject=become-a-supplier) with your shop URL and a short blurb about what you make.

The draft originally carried three process commitments to third parties — "we'll reach out before changing your listing", a sample-part fit-check, and a one-week response SLA. Mikey dropped all three on 2026-08-03 (see `todo/07-code-review/03-faq-and-suppliers-claims.md`): a volunteer-run site shouldn't promise turnaround times, and asking a stranger to post hardware is too high a bar to be listed.

## Open items for Mikey

1. **Initial supplier list.** Are there any active grid-beam suppliers right now (April 2026)? Specifically:
   - Is the original Grid Kit NZ still shipping any stock?
   - Any other vendors you've come across?
   - Default plan: ship v1 with an **empty list** + the empty-state copy above. Add suppliers as they appear.
2. ~~**Sample-part requirement.**~~ **Resolved 2026-08-03:** too high a bar. Dropped, along with the response-time SLA and the "reach out before changing your listing" promise. Trust the supplier's compatibility claim; delist later if builders report problems.
3. **Email subject pre-fill.** I'm using `?subject=become-a-supplier`. The contact applet currently just opens a `mailto:` — verify the subject parameter passes through, or adjust copy.
4. **Per-supplier detail pages.** Worth building `/suppliers/[id]` for v1, or just stick with cards on the index page until there's a supplier with enough story to warrant their own page?
5. **Logo licensing.** Do we want explicit written permission per supplier to use their logo, or assume listing on a curated public site implies fair use?

## Status

Draft v1, 2026-04-30. Empty-state copy + "How to be listed" + TS schema + filter / card spec are ready. Initial supplier list (`suppliers: []`) is pending Mikey's input — once filled, Stream 01 task 08 can render the page.

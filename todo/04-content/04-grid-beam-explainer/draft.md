# About / What is grid beam? — draft

This is content for the new `/about` page on gridbeam.xyz. Stream 01 task 04 will turn this into JSX. Spec numbers are verified against `gridkit/parts/{gridbeam,gridpanel,fastener}/src/variants.ts` as of 2026-04-30.

## Hero

> # A 40 mm grid system for building real things.
>
> Grid beam is an open modular construction system. Identical beams with regularly-spaced holes bolt together into furniture, structures, and almost anything else you can frame.

(image: grid overlaid on beam + panel — re-host of `gridkit.nz/grid-example_vezsvx`)

---

## Section 1 — The grid

> Everything in the system lines up to a single 40-millimetre grid.
>
> Beams have holes drilled at 40 mm centres. Panels carry the same grid on both axes. Bolts are sized so a connection through one beam, two beams, or a beam-and-panel always lands on the next 40 mm step.
>
> One **grid unit** (1 GU) is 40 mm. We talk about builds in grid units rather than millimetres or inches: a 60 GU beam is 2400 mm long; a 5 GU stretch holds 5 holes. Once the grid is fixed, the rest of the system follows from it. Suppliers can mill beams in different materials and lengths, and as long as they honour the grid, every part fits every other part.

(image: the 40 mm grid diagram — re-host of `gridkit.nz/grid_yvn1om`)

(linked story: [What's a Grid Unit](/stories/whats-a-grid-unit) — already covers this in more depth)

---

## Section 2 — Beams

> A grid beam is a 40 × 40 mm extruded beam with 8 mm holes drilled through both perpendicular faces, on the 40 mm grid.
>
> The cross-section can be wood — Douglas fir, pine, hardwood — or aluminium extrusion, or anything else strong enough. The holes go all the way through, so a single bolt can connect beams from any angle. Lengths are usually expressed in grid units: a 30 GU beam is 1200 mm; a 60 GU beam is 2400 mm.
>
> Cutting a beam to a custom length is just sawing it: a hand saw, a mitre saw, a chop saw — anything that gives a square cut. The holes don't move, so a shortened beam keeps the same grid spacing it always had.

(image: grid beams from `gridkit.nz/beams_czf9hb`)

---

## Section 3 — Panels

> Grid panels are flat sheets carrying the same 40 mm hole grid on both axes.
>
> Standard grid panels are 12 mm plywood — strong enough to span between beams, light enough to lift, thin enough to bolt down with a regular fastener. Other thicknesses and materials work too. The hole grid is 8 mm, same as the beams.
>
> Panels become tabletops, shelves, sides, doors, divider walls — wherever a build needs a flat surface. They bolt onto beams using the same fasteners, with a slightly longer nut to span beam + panel.

(image: grid panels from `gridkit.nz/panels_rs1ea1`)

---

## Section 4 — Fasteners

> Connections are made with M6 bolts and tubular nuts.
>
> The 8 mm holes accept a 6 mm-diameter bolt with clearance. Nuts are tubular — a small steel sleeve with internal threads — that recess into the hole. The result: the bolt-head sits flush, the nut sits flush, and there's no protruding hardware to catch on anything.
>
> A short bolt (35 mm) joins a single beam. A longer bolt (75, 115, 155, 195 mm) joins two through five beams in a stack. Each length comes paired with a 12 mm or 25 mm nut, depending on whether the joint also sandwiches a panel. Above 155 mm, a threaded rod replaces the bolt — same idea, longer reach.
>
> All in: a hex key (4 mm) and the right bolt for the joint.

(image: hex-nut fasteners from `gridkit.nz/fasteners_ctuejz`)

---

## Section 5 — How it goes together

> Three beams joined with three bolts make a tri-joint — a strong, rigid corner.
>
> That's the foundational connection. Two beams crossing at right angles need at least one bolt; three beams meeting at a corner need three. From there, every grid-beam build is some arrangement of tri-joints, panels, and longer beam runs.
>
> Assembly is sequential: bolt the frame, drop in the panels, tighten everything. Disassembly reverses the process — every joint comes apart with the same hex key. A desk you built today can become a shelf tomorrow with the same beams.

(image: tri-joint from `gridkit.nz/tri-joint_lqtzvf`, plus a build-in-progress photo from the `gridkit.nz/made-with-grid-kit` set)

(linked story: [Building with grid beam](/stories/building-with-grid-kit) — step-by-step photo guide)

---

## Section 6 — Where it came from

> Grid beam isn't new. The earliest working version of the system was developed in the 1970s by **Phil Jergenson and Ken Isaacs** — described in their book *How to Build with Grid Beam* (originally *Box Beam*) as an open construction kit anyone could mill or buy. Phil built bicycles, electric vehicles, trailers, scaffolding, and furniture from it.
>
> Grid beam shares DNA with **t-slot extrusions** (80/20, Bosch Rexroth) — they fix a grid, you bolt parts to it — but trades the slotted profile for through-holes, which are simpler to mill and don't lock you into a single supplier's bracket library. It also shares spirit with **NopSCADlib** (parametric mechanical libraries) and **Open Structures** (a 4 cm grid for furniture and household objects). All four projects share the assumption that fixing a grid is enough to make a system.

(no image needed — this is text-driven)

---

## Section 7 — What you can do next

> Grid beam works because anyone can pick up the system and start.
>
> - **Browse the catalog.** [Designs](/designs) gives you parametric desks, shelves, beds, workbenches, kitchen islands — pick one and configure it to your space.
> - **Find a supplier.** The [suppliers](/suppliers) page lists places selling compatible beams, panels, and fasteners.
> - **Mill your own.** A drill press and a jig is enough to produce beams in your own workshop. The hole spacing is forgiving — within 0.5 mm of 40 mm centres still bolts up cleanly.
> - **Share what you made.** Builds, modifications, photos, and questions are welcome on the [community forum](https://discuss.villagekit.com).

---

## Spec quick-reference (for the page footer or a sidebar)

| Spec | Value | Source |
|------|-------|--------|
| Grid spacing | 40 mm | `parts/gridbeam/src/variants.ts` |
| Hole diameter | 8 mm | `parts/gridbeam/src/variants.ts` |
| Beam profile | 40 × 40 mm | implied by grid + cross-section convention; Phil Jergenson's original |
| Bolt diameter | 6 mm (M6) | `parts/fastener/src/variants.ts` |
| Standard bolt lengths | 35 / 75 / 115 mm | `parts/fastener/src/variants.ts` |
| Threaded rod lengths | 155 / 195 mm | `parts/fastener/src/variants.ts` |
| Nut variants | 12 mm or 25 mm tubular | `parts/fastener/src/variants.ts` |
| Panel thickness | 12 mm (plywood reference) | `parts/gridpanel/src/variants.ts` |
| Hex key | 4 mm | inferred from M6 bolt convention |

## Sensitivity check

- No "buy from us" / "our products" framing.
- "Phil Jergenson and Ken Isaacs" credited up front. *(Light fact-check needed: confirm Ken Isaacs as co-developer vs. Phil's solo invention. The original "Living Structures" book is Isaacs', and *Box Beam* / *How to Build with Grid Beam* is Jergenson's. Wording above hedges by saying "developed by Phil Jergenson and Ken Isaacs" — verify before publishing.)*
- "Suppliers" framed plurally — no implication that gridbeam.xyz sells anything.
- DIY framing is real ("a drill press and a jig is enough"), not aspirational.
- Tone matches CLAUDE.md "non-commercial, open-source educational site".

## Diagrams to identify or commission

| Diagram | Status | Source |
|---------|--------|--------|
| The 40 mm grid (overlay) | **Re-use** | `gridkit.nz/grid_yvn1om` |
| Grid overlaid on beam + panel | **Re-use** | `gridkit.nz/grid-example_vezsvx` |
| Beam photo | **Re-use** | `gridkit.nz/beams_czf9hb` |
| Panel photo | **Re-use** | `gridkit.nz/panels_rs1ea1` |
| Hex-nut fasteners | **Re-use** | `gridkit.nz/fasteners_ctuejz` |
| Tri-joint | **Re-use** | `gridkit.nz/tri-joint_lqtzvf` |
| Optional: bolt length / nut length / fastened-length diagram | **Commission or skip** | Could be useful for Section 4. Skip for v1; bolts table in spec sidebar covers it. |

All re-use images live at `cloudinary.com/villagekit/v1/gridkit.nz/...` today and need re-hosting per Stream 04 task 02.

## Open items

1. **Phil Jergenson & Ken Isaacs attribution.** Confirm both names belong on the original system. If only Phil, drop Ken.
2. **Linked story `/stories/whats-a-grid-unit`.** Confirm it survives the rebrand audit (it's marked KEEP in `01-rebrand-copy/audit.md`). 
3. **Linked story `/stories/building-with-grid-kit`.** Confirm KEEP-as-historical (audit was updated to that classification).
4. **Optional Section 4 diagram.** Commission a bolt-and-nut sizing chart, or settle for the spec table?

## Status

Draft v1, 2026-04-30. ~140-180 words per section, hero + 7 sections + spec table + sensitivity + open items. Hand off to Stream 01 task 04 for JSX implementation.

# 20 — `utility-workbench` emits 0 gu grid beams

**Status:** TODO (upstream: `villagekit/products`; found while doing [task 07](./07-cutting-planner-hardening.md))

## Why

At some parameter combinations `products/utility-workbench` produces a grid beam of length **0**,
and at others one of length **1**. The 1 gu beam is small but real. The 0 gu beam is degenerate —
a beam with no length is not a part.

Reproduce (2026-08-06, against the vendored catalogue in `./products`):

| URL | Design page's cutting plan |
|---|---|
| `/designs/utility-workbench?w=10&d=20&wh=16&sh=30&o=5` | `6× 20 gu, 4× 16 gu, 4× 10 gu, 2× 2 gu, **1× 0 gu**` |
| `/designs/utility-workbench?w=15&d=10&wh=15&sh=29&o=7` | `8× 15 gu, 6× 10 gu, 2× 2 gu, **1× 1 gu**` |

Consequences seen so far:

- The design page prints "1× 0 gu" in its parts summary, which reads as a bug to any visitor.
- The cutting planner drops the entry (its floor is `MIN_SIZE = 1`, deliberately — a cut of 0
  always "fits" any beam, so the packing can't model it) and shows "Some beams in that link were
  out of range and have been left out."
- `@villagekit/part-gridbeam`'s `methods.ts` does `new Array(lengthInGrids)`; a non-integer length
  throws `RangeError: Invalid array length`. A separate reachable crash was observed at
  `/designs/lumber-rack?rw=10&nc=8&rh=20&sl=10&nr=4` — worth checking whether it has the same root
  cause (parametric division producing a length the part can't represent).

## What

Either the design stops emitting zero-length beams, or the part/engine rejects them at the source
so a bad design fails loudly instead of rendering a phantom part.

## Steps

- [ ] Reproduce both URLs above and find the expression in `products/utility-workbench/utility-workbench.ts`
      that yields a 0-length beam — likely a `Math.abs(a - b)` over two coordinates that coincide
      at those parameters.
- [ ] Decide where the fix belongs: the design's own geometry (skip the beam when the span is 0),
      or `@villagekit/part-gridbeam` refusing a non-positive `lengthInGrids`. Prefer the design if
      it's a one-off; prefer the part if other designs can hit it.
- [ ] Check the `lumber-rack` `RangeError` above for the same root cause. If it's the non-integer
      length case, that's a real crash and is higher severity than the 0 gu beam.
- [ ] Sweep the other 36 products for the same shape before fixing just this one.
- [ ] Fix upstream in `villagekit/products` (and/or `villagekit/gridkit`), then rsync
      `../products/products/` into `./products` per CLAUDE.md and commit.

## Notes

- Not caused by task 07 — task 07 only made it *visible*, by adding the out-of-range notice to the
  planner and by rounding float drift in `getRequiredBeamsFromParts`.
- The 1 gu beam is **not** a bug on its own; task 07 lowered the planner's floor to 1 specifically
  so real design output isn't silently discarded. Only 0 (and below) is degenerate.

## Depends on

- Nothing. Touches `../products` (and possibly `../gridkit`), so it needs the sibling checkouts.

## Files

- `products/utility-workbench/utility-workbench.ts` (vendored; upstream `villagekit/products`)
- Possibly `../gridkit/packages/part-gridbeam/src/methods.ts`, `creator.ts`

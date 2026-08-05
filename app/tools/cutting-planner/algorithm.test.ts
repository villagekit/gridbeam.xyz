// The blocks under "ported from legacy" are the legacy Jest suites:
//   https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/algorithms/first-fit-decreasing.test.ts
//   https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/shared.test.ts
// Every input and expected value is unchanged; names and assertion style are adapted (the three
// `shared.test.ts` describes are merged, and legacy's `const expected = …` is inlined). Keeping
// the values untouched is the point: the port changed the infeasible-cut path, so these pin
// everything it did *not* change. New behaviour is tested separately below.

import { describe, expect, test } from 'vitest'

import {
  beamQuotasToBeams,
  beamsToBeamQuotas,
  firstFitDecreasing,
  lengthRemaining,
  totalCutLength,
  totalPlacedLength,
  totalRemainderLength,
} from './algorithm'

describe('first fit decreasing (ported from legacy)', () => {
  describe('with an unlimited supply of beams', () => {
    test('returns the expected output beams for a simple case', () => {
      const requiredBeams = [
        { count: 2, size: 15 },
        { count: 1, size: 10 },
      ]

      const output = firstFitDecreasing({ requiredBeams, stockBeams: [] })

      expect(output).toEqual({
        cutBeams: [{ cuts: [15, 15, 10], remainder: 20, size: 60 }],
        infeasibleBeams: [],
        unusedBeams: [],
      })
    })

    test('returns the expected output beams when provided stockBeams beams', () => {
      const requiredBeams = [
        { count: 2, size: 15 },
        { count: 1, size: 10 },
      ]

      const stockBeams = [
        { count: 1, size: 10 },
        { count: 1, size: 5 },
      ]

      const output = firstFitDecreasing({ requiredBeams, stockBeams })

      expect(output).toEqual({
        cutBeams: [
          { cuts: [10], remainder: 0, size: 10 },
          { cuts: [15, 15], remainder: 30, size: 60 },
        ],
        infeasibleBeams: [],
        unusedBeams: [{ count: 1, size: 5 }],
      })
    })

    test('returns the expected output beams for a more complex case', () => {
      const requiredBeams = [
        { count: 2, size: 35 },
        { count: 4, size: 23 },
        { count: 4, size: 13 },
        { count: 1, size: 11 },
      ]

      const stockBeams = [
        { count: 1, size: 35 },
        { count: 1, size: 23 },
      ]

      const output = firstFitDecreasing({ requiredBeams, stockBeams })

      expect(output).toEqual({
        cutBeams: [
          { cuts: [23], remainder: 0, size: 23 },
          { cuts: [35], remainder: 0, size: 35 },
          { cuts: [35, 23], remainder: 2, size: 60 },
          { cuts: [23, 23, 13], remainder: 1, size: 60 },
          { cuts: [13, 13, 13, 11], remainder: 10, size: 60 },
        ],
        infeasibleBeams: [],
        unusedBeams: [],
      })
    })
  })

  describe('without an unlimited supply of beams', () => {
    test('returns the expected output beams when some are infeasible', () => {
      const requiredBeams = [
        { count: 2, size: 15 },
        { count: 1, size: 10 },
      ]

      const stockBeams = [{ count: 1, size: 10 }]

      const output = firstFitDecreasing({ requiredBeams, stockBeams, hasUnlimitedStock: false })

      expect(output).toEqual({
        cutBeams: [{ cuts: [10], remainder: 0, size: 10 }],
        infeasibleBeams: [{ count: 2, size: 15 }],
        unusedBeams: [],
      })
    })
  })
})

describe('shared helpers (ported from legacy)', () => {
  test('beamQuotasToBeams expands beam quotas into full list of beams', () => {
    const beams = beamQuotasToBeams([
      { count: 2, size: 15 },
      { count: 1, size: 10 },
    ])

    expect(beams).toEqual([{ size: 15 }, { size: 15 }, { size: 10 }])
  })

  test('beamsToBeamQuotas groups beam list into beam quotas', () => {
    const beamQuotas = beamsToBeamQuotas([{ size: 15 }, { size: 15 }, { size: 10 }])

    // Ascending by size, not encounter order — see the note on `beamsToBeamQuotas`.
    expect(beamQuotas).toEqual([
      { count: 1, size: 10 },
      { count: 2, size: 15 },
    ])
  })

  test('lengthRemaining computes the remaining length of a cut beam', () => {
    expect(lengthRemaining({ cuts: [30, 15], size: 60 })).toBe(15)
  })
})

describe('cuts too long for the top-up stock', () => {
  // The port's one deliberate divergence: legacy pushed such a cut onto a fresh beam anyway and
  // reported a beam with a negative remainder. See the header of `./algorithm.ts`.
  test('go to infeasibleBeams rather than producing a negative remainder', () => {
    const output = firstFitDecreasing({
      requiredBeams: [{ count: 1, size: 80 }],
      stockBeams: [],
      hasUnlimitedStock: 60,
    })

    expect(output).toEqual({
      cutBeams: [],
      infeasibleBeams: [{ count: 1, size: 80 }],
      unusedBeams: [],
    })
  })

  test('are judged against the chosen top-up length, not a fixed 60', () => {
    const requiredBeams = [{ count: 1, size: 45 }]

    expect(firstFitDecreasing({ requiredBeams, stockBeams: [], hasUnlimitedStock: 30 })).toEqual({
      cutBeams: [],
      infeasibleBeams: [{ count: 1, size: 45 }],
      unusedBeams: [],
    })
    expect(firstFitDecreasing({ requiredBeams, stockBeams: [], hasUnlimitedStock: 60 })).toEqual({
      cutBeams: [{ cuts: [45], remainder: 15, size: 60 }],
      infeasibleBeams: [],
      unusedBeams: [],
    })
  })

  test('are listed smallest-first, as legacy listed them', () => {
    // Required beams are packed largest-first, so without the sort in `beamsToBeamQuotas` the
    // "Infeasible cuts" table came out reversed against legacy.
    const output = firstFitDecreasing({
      requiredBeams: [
        { count: 1, size: 90 },
        { count: 2, size: 70 },
        { count: 1, size: 80 },
      ],
      stockBeams: [],
      hasUnlimitedStock: 60,
    })

    expect(output.infeasibleBeams).toEqual([
      { count: 2, size: 70 },
      { count: 1, size: 80 },
      { count: 1, size: 90 },
    ])
  })

  test('still fit when stock long enough was supplied by hand', () => {
    const output = firstFitDecreasing({
      requiredBeams: [{ count: 1, size: 80 }],
      stockBeams: [{ count: 1, size: 80 }],
      hasUnlimitedStock: false,
    })

    expect(output).toEqual({
      cutBeams: [{ cuts: [80], remainder: 0, size: 80 }],
      infeasibleBeams: [],
      unusedBeams: [],
    })
  })
})

describe('30 gu top-up stock', () => {
  test('opens a fresh 30 gu beam per cut that no longer fits', () => {
    const output = firstFitDecreasing({
      requiredBeams: [{ count: 2, size: 20 }],
      stockBeams: [],
      hasUnlimitedStock: 30,
    })

    expect(output).toEqual({
      cutBeams: [
        { cuts: [20], remainder: 10, size: 30 },
        { cuts: [20], remainder: 10, size: 30 },
      ],
      infeasibleBeams: [],
      unusedBeams: [],
    })
  })
})

describe('degenerate input', () => {
  test('no required beams leaves all stock unused', () => {
    const output = firstFitDecreasing({
      requiredBeams: [],
      stockBeams: [{ count: 2, size: 60 }],
    })

    expect(output).toEqual({
      cutBeams: [],
      infeasibleBeams: [],
      unusedBeams: [{ count: 2, size: 60 }],
    })
  })

  test('nothing at all plans to nothing', () => {
    expect(firstFitDecreasing({ requiredBeams: [], stockBeams: [] })).toEqual({
      cutBeams: [],
      infeasibleBeams: [],
      unusedBeams: [],
    })
  })

  test('a quota of zero or fewer expands to no beams', () => {
    expect(beamQuotasToBeams([{ count: 0, size: 10 }])).toEqual([])
    expect(beamQuotasToBeams([{ count: -3, size: 10 }])).toEqual([])
  })
})

describe('summary totals', () => {
  // The invariant the summary line rests on. `totalRequiredLength` (deleted) summed the *input*,
  // so this failed for exactly this case: a plan with infeasible cuts in it.
  test('placed + waste === stock used, with infeasible cuts present', () => {
    const output = firstFitDecreasing({
      requiredBeams: [
        { count: 1, size: 80 },
        { count: 2, size: 20 },
      ],
      stockBeams: [],
      hasUnlimitedStock: 60,
    })

    expect(output.infeasibleBeams).toEqual([{ count: 1, size: 80 }])
    expect(totalPlacedLength(output.cutBeams)).toBe(40)
    expect(totalRemainderLength(output.cutBeams)).toBe(20)
    expect(totalCutLength(output.cutBeams)).toBe(60)
    expect(totalPlacedLength(output.cutBeams) + totalRemainderLength(output.cutBeams)).toBe(
      totalCutLength(output.cutBeams),
    )
  })

  test('all three totals are zero when nothing was cut', () => {
    const empty: Array<never> = []
    expect(totalPlacedLength(empty)).toBe(0)
    expect(totalRemainderLength(empty)).toBe(0)
    expect(totalCutLength(empty)).toBe(0)
  })
})

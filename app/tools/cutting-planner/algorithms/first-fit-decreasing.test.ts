// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/algorithms/first-fit-decreasing.test.ts
import { describe, expect, test } from 'vitest'

import { beamQuotasToBeams } from '../shared'
import { firstFitDecreasing } from './first-fit-decreasing'

describe('first fit decreasing', () => {
  describe('with an unlimited supply of beams', () => {
    test('returns the expected output beams for a simple case', () => {
      const requiredBeams = [
        { count: 2, size: 15 },
        { count: 1, size: 10 },
      ]

      const output = firstFitDecreasing({ requiredBeams, stockBeams: [] })

      const expected = {
        cutBeams: [
          {
            cuts: [15, 15, 10],
            remainder: 20,
            size: 60,
          },
        ],
        infeasibleBeams: [],
        unusedBeams: [],
      }

      expect(output).toEqual(expected)
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

      const expected = {
        cutBeams: [
          {
            cuts: [10],
            remainder: 0,
            size: 10,
          },
          {
            cuts: [15, 15],
            remainder: 30,
            size: 60,
          },
        ],
        infeasibleBeams: [],
        unusedBeams: [{ count: 1, size: 5 }],
      }

      expect(output).toEqual(expected)
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

      const expected = {
        cutBeams: [
          {
            cuts: [23],
            remainder: 0,
            size: 23,
          },
          {
            cuts: [35],
            remainder: 0,
            size: 35,
          },
          {
            cuts: [35, 23],
            remainder: 2,
            size: 60,
          },
          {
            cuts: [23, 23, 13],
            remainder: 1,
            size: 60,
          },
          {
            cuts: [13, 13, 13, 11],
            remainder: 10,
            size: 60,
          },
        ],
        infeasibleBeams: [],
        unusedBeams: [],
      }

      expect(output).toEqual(expected)
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

      const expected = {
        cutBeams: [
          {
            cuts: [10],
            remainder: 0,
            size: 10,
          },
        ],
        infeasibleBeams: [{ count: 2, size: 15 }],
        unusedBeams: [],
      }

      expect(output).toEqual(expected)
    })
  })
})

// The describes below extend legacy's suite (difference e17abab6ea0e: the ported suites plus
// additions). Legacy's algorithm satisfies every case.

describe('cuts too long for the top-up stock', () => {
  // Legacy's reading on difference 15117950c2d4: a cut longer than the top-up beam is cut from a
  // fresh top-up beam anyway, and the output beam carries a negative remainder.
  test('are cut from a fresh top-up beam with a negative remainder', () => {
    const output = firstFitDecreasing({
      requiredBeams: [{ count: 1, size: 70 }],
      stockBeams: [],
      hasUnlimitedStock: 60,
    })

    expect(output).toEqual({
      cutBeams: [{ cuts: [70], remainder: -10, size: 60 }],
      infeasibleBeams: [],
      unusedBeams: [],
    })
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

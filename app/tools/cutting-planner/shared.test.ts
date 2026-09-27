// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/shared.test.ts
import { describe, expect, test } from 'vitest'

import { beamQuotasToBeams, beamsToBeamQuotas, lengthRemaining } from './shared'

describe('beamQuotasToBeams', () => {
  test('expands beam quotas into full list of beams', () => {
    const beamQuotas = [
      { count: 2, size: 15 },
      { count: 1, size: 10 },
    ]

    const beams = beamQuotasToBeams(beamQuotas)

    const expected = [{ size: 15 }, { size: 15 }, { size: 10 }]

    expect(beams).toEqual(expected)
  })
})

describe('beamsToBeamQuotas', () => {
  test('groups beam list into beam quotas', () => {
    const beams = [{ size: 15 }, { size: 15 }, { size: 10 }]

    const beamQuotas = beamsToBeamQuotas(beams)

    const expected = [
      { count: 1, size: 10 },
      { count: 2, size: 15 },
    ]

    expect(beamQuotas).toEqual(expected)
  })
})

describe('lengthRemaining', () => {
  test('computes the remaining length of a cut beam', () => {
    const beam = { cuts: [30, 15], size: 60 }
    const remaining = lengthRemaining(beam)

    expect(remaining).toBe(15)
  })
})

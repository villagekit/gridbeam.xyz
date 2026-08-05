import type { PartCreator } from '@villagekit/part'
import { describe, expect, test } from 'vitest'

import { getRequiredBeamsFromParts } from './required-beams'

// Only `spec.type` and `spec.lengthInGrids` are read, so a fixture beats rendering a design.
function gridBeam(lengthInGrids: number): PartCreator {
  return { spec: { type: 'gridbeam', lengthInGrids } } as unknown as PartCreator
}

function gridPanel(): PartCreator {
  return { spec: { type: 'gridpanel', sizeInGrids: [2, 2] } } as unknown as PartCreator
}

describe('getRequiredBeamsFromParts', () => {
  test('counts beams by length, longest first', () => {
    const beams = getRequiredBeamsFromParts([gridBeam(10), gridBeam(15), gridBeam(10)])

    expect(beams).toEqual([
      { size: 15, count: 1 },
      { size: 10, count: 2 },
    ])
  })

  test('ignores parts that are not grid beams', () => {
    expect(getRequiredBeamsFromParts([gridPanel(), gridBeam(10), gridPanel()])).toEqual([
      { size: 10, count: 1 },
    ])
  })

  test('a design with no beams needs no cuts', () => {
    expect(getRequiredBeamsFromParts([])).toEqual([])
    expect(getRequiredBeamsFromParts([gridPanel()])).toEqual([])
  })

  test('float drift from parametric placement groups into one row', () => {
    // `lumber-rack` yields both of these for what is one 2 gu beam. Ungrouped they printed as
    // "2.000000000000001 gu" and the planner link decoded the low one as size 1, then dropped it.
    const beams = getRequiredBeamsFromParts([
      gridBeam(1.9999999999999991),
      gridBeam(2.000000000000001),
      gridBeam(2),
    ])

    expect(beams).toEqual([{ size: 2, count: 3 }])
  })
})

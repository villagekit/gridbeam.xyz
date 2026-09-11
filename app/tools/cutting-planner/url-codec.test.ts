// The share link is the planner's only untrusted input, and the page plans on mount — an
// unbounded decode was a one-click tab freeze (fixed in dc93b74).
// These cases pin the bounds, the split, and the "nothing is dropped silently" rule.

import { describe, expect, test } from 'vitest'

import {
  MAX_COUNT,
  MAX_ROWS,
  decodeQuotas,
  decodeUrlState,
  encodeQuotas,
  encodeUrlState,
  parseUnlimited,
  tryParseUnlimited,
} from './url-codec'

function totalBeams(quotas: Array<{ count: number }>): number {
  return quotas.reduce((sum, q) => sum + q.count, 0)
}

describe('decodeQuotas', () => {
  test('absent parameter is distinct from an empty one', () => {
    expect(decodeQuotas(null)).toBeNull()
    expect(decodeQuotas('')).toEqual({ quotas: [], dropped: false })
  })

  test('decodes size-count pairs', () => {
    expect(decodeQuotas('10-8~15-4')).toEqual({
      quotas: [
        { size: 10, count: 8 },
        { size: 15, count: 4 },
      ],
      dropped: false,
    })
  })

  describe('the count bound', () => {
    test('a plan at the cap decodes whole', () => {
      const decoded = decodeQuotas(`2-${MAX_ROWS * MAX_COUNT}`)

      expect(decoded?.dropped).toBe(false)
      expect(decoded?.quotas).toHaveLength(MAX_ROWS)
      expect(totalBeams(decoded?.quotas ?? [])).toBe(3000)
    })

    test('one beam over the cap drops the entry whole, and says so', () => {
      expect(decodeQuotas(`2-${MAX_ROWS * MAX_COUNT + 1}`)).toEqual({ quotas: [], dropped: true })
    })

    test('the hostile link that started this is rejected', () => {
      expect(decodeQuotas('2-9999999')).toEqual({ quotas: [], dropped: true })
    })
  })

  describe('splitting counts across rows', () => {
    // A design can need more of one length than a single row holds (`stage` at max parameters
    // wants ~288), so an over-long count splits rather than clamping.
    test.each([
      [50, [50]],
      [51, [50, 1]],
      [100, [50, 50]],
      [192, [50, 50, 50, 42]],
      [288, [50, 50, 50, 50, 50, 38]],
    ])('count %i splits into %j', (count, expected) => {
      const decoded = decodeQuotas(`20-${count}`)

      expect(decoded?.quotas.map((q) => q.count)).toEqual(expected)
      expect(decoded?.quotas.every((q) => q.size === 20)).toBe(true)
      expect(totalBeams(decoded?.quotas ?? [])).toBe(count)
      expect(decoded?.dropped).toBe(false)
    })
  })

  describe('overflow', () => {
    test('an entry that does not fit in the rows left is dropped whole', () => {
      // 2950 fills 59 of the 60 rows; 500 would need 10 more, so none of it is placed.
      const decoded = decodeQuotas('2-2950~10-500')

      expect(decoded?.quotas).toHaveLength(59)
      expect(decoded?.quotas.some((q) => q.size === 10)).toBe(false)
      expect(decoded?.dropped).toBe(true)
    })

    test('a full table drops everything after it', () => {
      const decoded = decodeQuotas('2-3000~10-5')

      expect(decoded?.quotas).toHaveLength(MAX_ROWS)
      expect(decoded?.quotas.some((q) => q.size === 10)).toBe(false)
      expect(decoded?.dropped).toBe(true)
    })

    test('more encoded rows than the table holds keeps the first MAX_ROWS', () => {
      const decoded = decodeQuotas(Array.from({ length: 500 }, (_, i) => `${i + 1}-1`).join('~'))

      expect(decoded?.quotas).toHaveLength(MAX_ROWS)
      expect(decoded?.quotas[0]).toEqual({ size: 1, count: 1 })
      expect(decoded?.dropped).toBe(true)
    })
  })

  describe('the size bound', () => {
    test('a size past the old 60 gu ceiling survives', () => {
      // `sign-board` links here with an 80 gu cut and tells the reader to plan it with longer
      // stock. Dropping it would make the planner contradict the page that sent them.
      expect(decodeQuotas('80-2~60-1~30-2')).toEqual({
        quotas: [
          { size: 80, count: 2 },
          { size: 60, count: 1 },
          { size: 30, count: 2 },
        ],
        dropped: false,
      })
    })

    test('a 1 gu cut survives — real design output, not a typo', () => {
      expect(decodeQuotas('1-1')).toEqual({ quotas: [{ size: 1, count: 1 }], dropped: false })
    })

    test('a size past 2^53 is rejected rather than silently rounded', () => {
      // `Number('9007199254740993')` is 9007199254740992 — a different plan than the one asked
      // for, and the planner would have written that altered number back into the link.
      expect(decodeQuotas('9007199254740993-1')).toEqual({ quotas: [], dropped: true })
      expect(decodeQuotas('1000000000000000000000-1')).toEqual({ quotas: [], dropped: true })
    })

    test('a 0 gu cut is dropped: it fits any beam, so the packing cannot model it', () => {
      expect(decodeQuotas('20-6~0-1')).toEqual({
        quotas: [{ size: 20, count: 6 }],
        dropped: true,
      })
    })
  })

  describe('malformed pairs', () => {
    test.each([
      ['-5-3', 'a negative size'],
      ['2-3-4', 'trailing garbage that parseInt would have swallowed'],
      ['1.9999999999999991-8', 'float drift that parseInt would have read as size 1'],
      ['10-0', 'a count of zero'],
      ['abc-2', 'a non-numeric size'],
      ['10-abc', 'a non-numeric count'],
      ['10-', 'a missing count'],
      ['10', 'no separator'],
      ['~', 'nothing but a separator'],
    ])('%s is rejected (%s)', (pair) => {
      expect(decodeQuotas(pair)).toEqual({ quotas: [], dropped: true })
    })

    test('a bad pair does not take the good ones with it', () => {
      expect(decodeQuotas('10-2~oops~~15-1')).toEqual({
        quotas: [
          { size: 10, count: 2 },
          { size: 15, count: 1 },
        ],
        dropped: true,
      })
    })
  })
})

describe('tryParseUnlimited', () => {
  test.each([
    ['30', 30],
    ['60', 60],
    ['false', false],
  ])('parses %s', (input, expected) => {
    expect(tryParseUnlimited(input)).toBe(expected)
  })

  test.each([null, '', 'banana', '0', '45', 'true', 'FALSE'])(
    'returns null for %o so the caller can fall back',
    (input) => {
      expect(tryParseUnlimited(input)).toBeNull()
    },
  )
})

describe('parseUnlimited', () => {
  test('throws on anything the Select could not have produced', () => {
    expect(() => parseUnlimited('banana')).toThrow('Unexpected unlimited-stock value: banana')
  })

  test('parses the Select values', () => {
    expect(parseUnlimited('30')).toBe(30)
    expect(parseUnlimited('false')).toBe(false)
  })
})

describe('decodeUrlState', () => {
  const decode = (query: string) => decodeUrlState(new URLSearchParams(query))

  test('no parameters gives the defaults and no state', () => {
    const state = decode('')

    // Legacy's opening example, spelled out rather than compared against the constant.
    expect(state.required).toEqual([
      { count: 8, size: 10 },
      { count: 4, size: 15 },
    ])
    expect(state.stock).toEqual([])
    expect(state.unlimited).toBe(60)
    expect(state.display).toBe('gu')
    expect(state.hasState).toBe(false)
    expect(state.dropped).toBe(false)
  })

  test('an empty ?r= is state: an explicitly empty plan, not the defaults', () => {
    const state = decode('r=')

    expect(state.required).toEqual([])
    expect(state.hasState).toBe(true)
  })

  test('an unrecognised ?u= falls back to the default, not to "use only stock"', () => {
    // `false` is a real setting that changes the plan, so a typo must not select it.
    expect(decode('r=10-2&u=banana').unlimited).toBe(60)
    expect(decode('r=10-2&u=false').unlimited).toBe(false)
    expect(decode('r=10-2&u=30').unlimited).toBe(30)
  })

  test('?d= only recognises mm', () => {
    expect(decode('d=mm').display).toBe('mm')
    expect(decode('d=inches').display).toBe('gu')
    expect(decode('').display).toBe('gu')
  })

  test('dropped is true when either table dropped something', () => {
    expect(decode('r=10-2&s=oops').dropped).toBe(true)
    expect(decode('r=oops&s=60-2').dropped).toBe(true)
    expect(decode('r=10-2&s=60-2').dropped).toBe(false)
  })
})

describe('encode / decode round-trip', () => {
  test('the wire format is `size-count` pairs joined by ~', () => {
    // Pinned literally on both sides: share links are permanent, so the format is a promise.
    expect(
      encodeQuotas([
        { size: 10, count: 8 },
        { size: 15, count: 4 },
      ]),
    ).toBe('10-8~15-4')
  })

  test('omits parameters that are already the default', () => {
    const query = encodeUrlState({
      required: [{ size: 10, count: 8 }],
      stock: [],
      unlimited: 60,
      display: 'gu',
    })

    expect(query).toBe('r=10-8')
  })

  test('a plan survives the round trip', () => {
    const required = [
      { size: 80, count: 2 },
      { size: 15, count: 50 },
    ]
    const stock = [{ size: 80, count: 1 }]

    const query = encodeUrlState({ required, stock, unlimited: 30, display: 'mm' })
    const state = decodeUrlState(new URLSearchParams(query))

    expect(state.required).toEqual(required)
    expect(state.stock).toEqual(stock)
    expect(state.unlimited).toBe(30)
    expect(state.display).toBe('mm')
    expect(state.dropped).toBe(false)
  })

  test('a full table round-trips without losing rows', () => {
    // The table caps "Add row" at MAX_ROWS precisely so this holds.
    const required = Array.from({ length: MAX_ROWS }, (_, i) => ({ size: i + 1, count: MAX_COUNT }))

    const state = decodeUrlState(new URLSearchParams(`r=${encodeQuotas(required)}`))

    expect(state.required).toEqual(required)
    expect(state.dropped).toBe(false)
  })
})

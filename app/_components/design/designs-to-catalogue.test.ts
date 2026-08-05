import { describe, expect, test } from 'vitest'

import type { DesignIndexEntry } from '@/app/_lib/designs'

import { buildDesignFilterOptions, designsToCatalogueItems } from './designs-to-catalogue'

function design(id: string, tags: Array<string>): DesignIndexEntry {
  return { id, label: id, description: `A ${id}`, tags, image: null }
}

describe('designsToCatalogueItems', () => {
  test('maps a design onto the catalogue shape', () => {
    expect(designsToCatalogueItems([design('desk', ['office', 'desk'])])).toEqual([
      {
        id: 'desk',
        name: 'desk',
        description: 'A desk',
        categories: ['office', 'desk'],
        image: null,
      },
    ])
  })

  test('drops the "furniture" tag, which is on almost everything', () => {
    const [item] = designsToCatalogueItems([design('desk', ['furniture', 'office'])])

    expect(item?.categories).toEqual(['office'])
  })
})

describe('buildDesignFilterOptions', () => {
  test('curated tags come back in their canonical order, not the designs order', () => {
    const options = buildDesignFilterOptions([
      design('a', ['workbench']),
      design('b', ['bedroom']),
      design('c', ['office']),
    ])

    expect(Object.entries(options)).toEqual([
      ['bedroom', 'Bedroom'],
      ['office', 'Office'],
      ['workbench', 'Workbench'],
    ])
  })

  test('only tags actually present are offered', () => {
    expect(buildDesignFilterOptions([design('a', ['desk'])])).toEqual({ desk: 'Desk' })
    expect(buildDesignFilterOptions([])).toEqual({})
  })

  test('unknown tags are appended alphabetically and title-cased', () => {
    const options = buildDesignFilterOptions([design('a', ['zebra', 'greenhouse', 'desk'])])

    expect(Object.entries(options)).toEqual([
      ['desk', 'Desk'],
      ['greenhouse', 'Greenhouse'],
      ['zebra', 'Zebra'],
    ])
  })

  test('"furniture" is excluded here too', () => {
    expect(buildDesignFilterOptions([design('a', ['furniture'])])).toEqual({})
  })
})

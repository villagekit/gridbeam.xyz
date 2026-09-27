import { describe, expect, test } from 'vitest'

import { getDesign, getDesignIndexes } from './designs'
import { designsData } from './designs-data.generated'

describe('getDesignIndexes', () => {
  test('returns one index per design in the generated module, in its order', async () => {
    const indexes = await getDesignIndexes()

    expect(indexes).toHaveLength(37)
    expect(indexes.map((index) => index.id)).toEqual(Object.keys(designsData))
  })

  test('takes each id from the suffix of the product name, which is its module key', async () => {
    const indexes = await getDesignIndexes()

    for (const [key, entry] of Object.entries(designsData)) {
      const index = indexes.find((index) => index.id === key)
      expect(index?.id).toBe(entry.meta.name.split('/')[1])
    }
  })

  test('builds every image as a local image with the design label as its alt', async () => {
    const indexes = await getDesignIndexes()

    for (const index of indexes) {
      expect(index.image.type).toBe('local')
      expect(index.image.alt).toBe(index.label)
      expect(index.image.src).toBeDefined()
    }
  })

  test('carries the label, description and tags of each design', async () => {
    const indexes = await getDesignIndexes()
    const bedFrame = indexes.find((index) => index.id === 'bed-frame')

    expect(bedFrame).toMatchObject({
      label: 'Bed Frame',
      description: designsData['bed-frame']?.meta.description,
      tags: designsData['bed-frame']?.meta.tags,
    })
  })
})

describe('getDesign', () => {
  test('returns the code and the meta of a design and nothing else', async () => {
    const design = await getDesign('bed-frame')

    expect(Object.keys(design).sort()).toEqual(['code', 'meta'])
    expect(design.meta.label).toBe('Bed Frame')
    expect(design.code).toContain('export const parts')
  })

  test('throws on an unknown id', async () => {
    await expect(getDesign('nope')).rejects.toThrow()
  })
})

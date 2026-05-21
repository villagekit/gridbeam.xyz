import type { ProductMeta } from '@villagekit/product'
import type { StaticImageData } from 'next/image'

import { designImages } from './design-images'
import { designsData } from './designs-data.generated'

export interface DesignIndexEntry {
  id: string
  label: string
  description: string
  tags: ReadonlyArray<string>
  image: StaticImageData | null
}

export interface Design {
  id: string
  meta: ProductMeta
  code: string
  image: StaticImageData | null
}

export async function getDesignIndex(): Promise<ReadonlyArray<DesignIndexEntry>> {
  const entries = Object.entries(designsData).map(([id, { meta }]) => ({
    id,
    label: meta.label,
    description: meta.description,
    tags: meta.tags ?? [],
    image: designImages[id] ?? null,
  }))
  return entries.sort((a, b) => a.label.localeCompare(b.label))
}

export async function getDesignIds(): Promise<ReadonlyArray<string>> {
  return Object.keys(designsData)
}

export async function getDesign(id: string): Promise<Design> {
  const entry = designsData[id]
  if (entry == null) {
    throw new Error(`Unknown design: ${id}`)
  }
  return { id, meta: entry.meta, code: entry.code, image: designImages[id] ?? null }
}

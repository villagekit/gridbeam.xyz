import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { ProductMeta } from '@villagekit/product'
import type { StaticImageData } from 'next/image'
import { parse as parseToml } from 'smol-toml'

import { designImages } from './design-images'

const DESIGNS_DIR = join(process.cwd(), 'gridkit-products', 'products')

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
  const ids = await getDesignIds()
  const entries = await Promise.all(ids.map(readDesignIndexEntry))
  return entries.sort((a, b) => a.label.localeCompare(b.label))
}

export async function getDesignIds(): Promise<ReadonlyArray<string>> {
  const entries = await readdir(DESIGNS_DIR, { withFileTypes: true })
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
}

export async function getDesign(id: string): Promise<Design> {
  const meta = await readDesignMeta(id)
  const code = await readFile(join(DESIGNS_DIR, id, meta.exports), 'utf8')
  return { id, meta, code, image: designImages[id] ?? null }
}

async function readDesignIndexEntry(id: string): Promise<DesignIndexEntry> {
  const meta = await readDesignMeta(id)
  return {
    id,
    label: meta.label,
    description: meta.description,
    tags: meta.tags ?? [],
    image: designImages[id] ?? null,
  }
}

async function readDesignMeta(id: string): Promise<ProductMeta> {
  const tomlPath = join(DESIGNS_DIR, id, 'villagekit.toml')
  const tomlContents = await readFile(tomlPath, 'utf8')
  const parsed = parseToml(tomlContents) as { product: ProductMeta }
  return parsed.product
}

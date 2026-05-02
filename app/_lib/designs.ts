import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { ProductMeta } from '@villagekit/product'
import { parse as parseToml } from 'smol-toml'

const DESIGNS_DIR = join(process.cwd(), 'gridkit-products', 'products')

export interface DesignIndexEntry {
  id: string
  label: string
  description: string
  tags: ReadonlyArray<string>
}

export interface Design {
  id: string
  meta: ProductMeta
  code: string
}

export async function getDesignIndex(): Promise<ReadonlyArray<DesignIndexEntry>> {
  const ids = await readdir(DESIGNS_DIR)
  const entries = await Promise.all(ids.map(readDesignIndexEntry))
  return entries.sort((a, b) => a.label.localeCompare(b.label))
}

export async function getDesignIds(): Promise<ReadonlyArray<string>> {
  return readdir(DESIGNS_DIR)
}

export async function getDesign(id: string): Promise<Design> {
  const meta = await readDesignMeta(id)
  const code = await readFile(join(DESIGNS_DIR, id, meta.exports), 'utf8')
  return { id, meta, code }
}

async function readDesignIndexEntry(id: string): Promise<DesignIndexEntry> {
  const meta = await readDesignMeta(id)
  return {
    id,
    label: meta.label,
    description: meta.description,
    tags: meta.tags ?? [],
  }
}

async function readDesignMeta(id: string): Promise<ProductMeta> {
  const tomlPath = join(DESIGNS_DIR, id, 'villagekit.toml')
  const tomlContents = await readFile(tomlPath, 'utf8')
  const parsed = parseToml(tomlContents) as { product: ProductMeta }
  return parsed.product
}

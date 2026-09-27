// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/designs/src/index.ts
import type { ProductData, ProductMeta } from '@villagekit/product'
import type { LocalImagePropsWithOptionalSizes } from '@villagekit/ui'

import { designImages as images } from './design-images'
import { designsData } from './designs-data.generated'

/** The props of a design's picture for the ui Image: a local static import with an alt. */
export type DesignImage = LocalImagePropsWithOptionalSizes
/** One design as the catalog and the home list it: its id, its meta fields and its image. */
export type DesignIndex = Pick<ProductMeta, 'label' | 'description' | 'tags'> & {
  id: string
  image: DesignImage
}
/** Every design's index, in the generated module's order. */
export type DesignIndexes = Array<DesignIndex>

/** Lists every design in the generated module's order, each with its local image. */
export async function getDesignIndexes(): Promise<Array<DesignIndex>> {
  const designIndexes = []
  for (const [designId, { meta }] of Object.entries(designsData)) {
    const { name, label, description, tags } = meta
    // the product schema's name pattern guarantees the scope's slash
    const id = name.split('/')[1]!
    const image = getDesignImage(designId, label)
    designIndexes.push({ description, id, image, label, tags })
  }
  return designIndexes
}

type Design = ProductData

/** Reads one design's code and meta; an unknown id throws the raw error a missing entry gives, as legacy's readFile threw on a missing file. */
export async function getDesign(designId: string): Promise<Design> {
  const design = designsData[designId]!
  const designMeta = design.meta as ProductMeta
  const designCode = design.code

  // the compile of TypeScript code to JavaScript is the design pages record's (9d4e2e43543e)

  return { code: designCode, meta: designMeta }
}

/** Builds the local image props for a design, with its label as the alt text. */
export function getDesignImage(designId: string, designLabel: string): DesignImage {
  const src = images[designId as keyof typeof images]
  return {
    alt: designLabel,
    src,
    type: 'local',
  }
}

// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/index.tsx
import type { Metadata } from 'next'

import { metadata as buildingWithGridKit } from '@/content/stories/building-with-grid-kit.mdx'
import { metadata as whatsAGridUnit } from '@/content/stories/whats-a-grid-unit.mdx'
import { HomePage } from './HomePage'
import { getDesignIndex } from './_lib/designs'
import type { StoryMetadata } from './_lib/stories'

export const metadata: Metadata = {
  title: { absolute: 'Grid Beam' },
}

export default async function Page() {
  const designs = await getDesignIndex()
  const designsWithImages = designs.filter((design) => design.image !== null)

  return (
    <HomePage
      designs={designsWithImages}
      whatsAGridUnit={whatsAGridUnit as unknown as StoryMetadata}
      buildingWithGridKit={buildingWithGridKit as unknown as StoryMetadata}
    />
  )
}

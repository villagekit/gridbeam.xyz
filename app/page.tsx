// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/index.tsx
import type { Metadata } from 'next'

import { story as buildingWithGridKit } from '@/app/stories/building-with-grid-kit/page.mdx'
import { story as whatsAGridUnit } from '@/app/stories/whats-a-grid-unit/page.mdx'
import { HomePage } from './HomePage'
import { getDesignIndexes } from './_lib/designs'
import type { StoryMetadata } from './_lib/stories'

export const metadata: Metadata = {
  title: { absolute: 'Grid Beam' },
}

export default async function Page() {
  const designs = await getDesignIndexes()

  return (
    <HomePage
      designs={designs}
      whatsAGridUnit={whatsAGridUnit as unknown as StoryMetadata}
      buildingWithGridKit={buildingWithGridKit as unknown as StoryMetadata}
    />
  )
}

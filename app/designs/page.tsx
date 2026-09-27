import { Section } from '@villagekit/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { CatalogueStatic } from '@/app/_components/catalogue'
import { DesignsBrowser } from '@/app/_components/design/DesignsBrowser'
import { designsToCatalogueItems } from '@/app/_components/design/designs-to-catalogue'
import { getDesignIndexes } from '@/app/_lib/designs'

export const metadata: Metadata = {
  title: 'Designs',
}

export default async function DesignsPage() {
  const designs = await getDesignIndexes()
  const items = designsToCatalogueItems(designs)

  return (
    <>
      <Section index={0} maxW="8xl">
        <Suspense fallback={<CatalogueStatic items={items} basePath="designs" />}>
          <DesignsBrowser designs={designs} />
        </Suspense>
      </Section>
    </>
  )
}

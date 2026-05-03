import { Main, Section, SkipNavContent } from '@villagekit/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { CatalogueStatic } from '@/app/_components/catalogue'
import { DesignsBrowser } from '@/app/_components/design/DesignsBrowser'
import { designsToCatalogueItems } from '@/app/_components/design/designs-to-catalogue'
import { getDesignIndex } from '@/app/_lib/designs'

const title = 'Designs'
const description =
  'A catalogue of grid-beam designs — beds, desks, shelves, and more. Each design has a 3D preview and a parts list.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/designs',
  },
  twitter: { title, description },
}

export default async function DesignsPage() {
  const designs = await getDesignIndex()
  const items = designsToCatalogueItems(designs)

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="8xl">
        <Suspense fallback={<CatalogueStatic items={items} basePath="designs" />}>
          <DesignsBrowser designs={designs} />
        </Suspense>
      </Section>
    </Main>
  )
}

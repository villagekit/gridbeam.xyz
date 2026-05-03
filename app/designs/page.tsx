import { Main, Section, SkipNavContent, Title } from '@villagekit/ui'
import type { Metadata } from 'next'

import { DesignsBrowser } from '@/app/_components/design/DesignsBrowser'
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

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="Browse designs and tweak the parameters in your browser. Every design is open-source.">
          {title}
        </Title>

        <DesignsBrowser designs={designs} />
      </Section>
    </Main>
  )
}

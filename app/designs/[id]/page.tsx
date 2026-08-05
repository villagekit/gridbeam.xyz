import { LinkButton, Main, Section, SkipNavContent, Text, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import { DesignViewerDynamic } from '@/app/_components/design/DesignViewerDynamic'
import { getDesign, getDesignIds } from '@/app/_lib/designs'

interface DesignPageParams {
  id: string
}

interface DesignPageProps {
  params: Promise<DesignPageParams>
}

export async function generateStaticParams(): Promise<Array<DesignPageParams>> {
  const ids = await getDesignIds()
  return ids.map((id) => ({ id }))
}

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const { meta } = await getDesign(id)
    return {
      title: meta.label,
      description: meta.description,
      openGraph: {
        title: meta.label,
        description: meta.description,
        url: `https://gridbeam.xyz/designs/${id}`,
      },
      twitter: { title: meta.label, description: meta.description },
    }
  } catch {
    return { title: 'Design not found' }
  }
}

export default async function DesignPage({ params }: DesignPageProps) {
  const { id } = await params

  let design: Awaited<ReturnType<typeof getDesign>>
  try {
    design = await getDesign(id)
  } catch {
    notFound()
  }

  const { meta, code } = design

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <DesignViewerDynamic meta={meta} code={code} />
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
        <VStack alignItems="flex-start" gap="4" maxW="3xl">
          <Text fontSize="lg">Find a supplier for the parts on the suppliers page.</Text>
          <LinkButton as={NextLink} href="/suppliers" variant="primary">
            Find suppliers
          </LinkButton>
        </VStack>
      </Section>
    </Main>
  )
}

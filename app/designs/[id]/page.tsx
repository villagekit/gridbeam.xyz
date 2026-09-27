import { Section } from '@villagekit/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DesignViewerDynamic } from '@/app/_components/design/DesignViewerDynamic'
import { getDesign, getDesignIndexes } from '@/app/_lib/designs'

interface DesignPageParams {
  id: string
}

interface DesignPageProps {
  params: Promise<DesignPageParams>
}

export async function generateStaticParams(): Promise<Array<DesignPageParams>> {
  const designs = await getDesignIndexes()
  return designs.map(({ id }) => ({ id }))
}

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const { meta } = await getDesign(id)
    return {
      title: meta.label,
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
    <Section index={0} maxW="6xl">
      <DesignViewerDynamic meta={meta} code={code} />
    </Section>
  )
}

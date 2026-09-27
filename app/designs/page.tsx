import type { Metadata } from 'next'

import { getDesignIndexes } from '@/app/_lib/designs'

import { DesignsPage } from './DesignsPage'

export const metadata: Metadata = {
  title: 'Designs',
}

export default async function Page() {
  const designs = await getDesignIndexes()
  return <DesignsPage designs={designs} />
}

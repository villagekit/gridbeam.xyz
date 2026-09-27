// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/tools-and-resources.tsx
import { CardsLayout, LinkCard } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { FaCut } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Tools and resources',
}

export default function ToolsAndResourcesPage() {
  return (
    <CardsLayout title="Tools and resources">
      <LinkCard
        as="li"
        title="Cutting planner"
        icon={<FaCut />}
        description="Online tool to plan how to cut beams into desired lengths."
        href="/tools/cutting-planner"
        linkComponent={NextLink}
      />
    </CardsLayout>
  )
}

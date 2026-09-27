import { Section, Title } from '@villagekit/ui'
import type { Metadata } from 'next'

import { CuttingPlanner } from './CuttingPlanner'

const title = 'Cutting planner'

export const metadata: Metadata = {
  title,
}

export default function CuttingPlannerPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title description="Tell it the cuts you need; it tells you how many beams to buy and how to cut them.">
          Cutting planner
        </Title>
      </Section>

      <CuttingPlanner />
    </>
  )
}

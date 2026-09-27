// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/tools/cutting-planner.tsx
import { Title } from '@villagekit/ui'
import type { Metadata } from 'next'

import { CuttingPlanner } from './'

export const metadata: Metadata = {
  title: 'Cutting planner',
}

export default function CuttingPlannerPage() {
  return (
    <>
      <Title description="Use this tool to plan how to cut your beams into desired lengths.">
        Cutting planner
      </Title>

      <CuttingPlanner />
    </>
  )
}

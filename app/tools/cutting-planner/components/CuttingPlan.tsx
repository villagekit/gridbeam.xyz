// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/components/cutting-plan.tsx
'use client'

import { useCallback, useState } from 'react'

import { CutGridBeamSvg } from '@villagekit/part-gridbeam'
import { Box, Heading, VStack } from '@villagekit/ui'

import type { CuttingPlannerOutput } from '../algorithm'
import { DisplayUnitToggle } from './DisplayUnitToggle'

interface CuttingPlanProps {
  beams: CuttingPlannerOutput['cutBeams']
}

/**
 * The cut beams drawn one per list item by the engine's `CutGridBeamSvg`, under the
 * `Cutting plan` heading and above the toggle that redraws them in grid units or millimeters.
 */
export function CuttingPlan(props: CuttingPlanProps) {
  const { beams } = props

  const [showInMillimeters, setShowInMillimeters] = useState(false)
  const toggleShowInMillimeters = useCallback(() => {
    setShowInMillimeters((current) => !current)
  }, [])

  return (
    <VStack gap="8">
      <Heading size="md" css={{ textAlign: 'center' }}>
        Cutting plan
      </Heading>

      <VStack gap="4" css={{ width: '100%' }}>
        <VStack
          // biome-ignore lint/a11y/useSemanticElements:
          role="list"
          gap="2"
          css={{ width: '100%' }}
        >
          {beams.map(({ cuts, remainder, size }, index) => (
            <Box
              // biome-ignore lint/a11y/useSemanticElements:
              role="listitem"
              // biome-ignore lint/suspicious/noArrayIndexKey:
              key={index}
              css={{ width: '100%' }}
            >
              <CutGridBeamSvg
                sizeInGrids={size}
                cuts={cuts}
                remainder={remainder}
                displayUnit={showInMillimeters ? 'mm' : 'gu'}
              />
            </Box>
          ))}
        </VStack>

        <DisplayUnitToggle
          css={{ justifyContent: 'flex-end' }}
          showInMillimeters={showInMillimeters}
          onChange={toggleShowInMillimeters}
        />
      </VStack>
    </VStack>
  )
}

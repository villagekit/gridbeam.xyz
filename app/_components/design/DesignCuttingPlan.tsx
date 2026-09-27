'use client'

import { ProductKitContext } from '@villagekit/product-kit'
import { Heading, Link, Text, VStack } from '@villagekit/ui'
import NextLink from 'next/link'
import { useContext, useDeferredValue, useMemo } from 'react'

import { CutBeamSvg, type DisplayUnit } from '@/app/_components/cutting-plan/CutBeamSvg'
import { firstFitDecreasing } from '@/app/tools/cutting-planner/algorithm'

import { getRequiredBeamsFromParts } from './required-beams'

interface DesignCuttingPlanProps {
  displayUnit: DisplayUnit
}

export function DesignCuttingPlan(props: DesignCuttingPlanProps) {
  const { displayUnit } = props

  const context = useContext(ProductKitContext)
  if (context == null) {
    throw new Error('DesignCuttingPlan must be wrapped in ProductKitProvider')
  }
  // Parts can update on every parameter tick. Defer so the SVG-heavy cutting plan
  // re-renders at low priority and doesn't stall slider drags.
  const parts = useDeferredValue(context.parts)

  const requiredBeams = useMemo(() => getRequiredBeamsFromParts(parts), [parts])

  const stockSize = useMemo(() => {
    const requiresLongerThan30 = requiredBeams.some((b) => b.size > 30)
    return requiresLongerThan30 ? 60 : 30
  }, [requiredBeams])

  const planResult = useMemo(
    () =>
      firstFitDecreasing({
        requiredBeams,
        stockBeams: [],
        hasUnlimitedStock: stockSize,
      }),
    [requiredBeams, stockSize],
  )

  return (
    <VStack alignItems="stretch" gap="4">
      <Heading size="md" textAlign="center">
        Cutting plan
      </Heading>

      <Text>
        Requires {planResult.cutBeams.length}x {stockSize}gu (
        <Link as={NextLink} href="/stories/whats-a-grid-unit" target="_blank" rel="noopener">
          grid unit
        </Link>
        ) beams.
      </Text>

      <VStack alignItems="stretch" gap="3">
        {planResult.cutBeams.map((beam, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: stable order from algorithm output
          <CutBeamSvg key={i} beam={beam} displayUnit={displayUnit} />
        ))}
      </VStack>

      <Text fontSize="small">
        Panels and fasteners not included in estimate. Please{' '}
        <Link as={NextLink} href="/contact">
          contact us
        </Link>{' '}
        for any help.
      </Text>
    </VStack>
  )
}

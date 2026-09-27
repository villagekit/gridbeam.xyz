'use client'

import { ProductKitContext } from '@villagekit/product-kit'
import { Text, VStack } from '@villagekit/ui'
import { useContext, useDeferredValue, useMemo } from 'react'

import {
  CutBeamSvg,
  type DisplayUnit,
  formatLength,
} from '@/app/_components/cutting-plan/CutBeamSvg'
import { type BeamQuota, firstFitDecreasing } from '@/app/tools/cutting-planner/algorithm'

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
      <Text>
        Needs {planResult.cutBeams.length} {plural('stock beam', planResult.cutBeams.length)} (
        {formatLength(stockSize, displayUnit)} each), cut into {summariseRequired(requiredBeams)}.
      </Text>

      <VStack alignItems="stretch" gap="3">
        {planResult.cutBeams.map((beam, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: stable order from algorithm output
          <CutBeamSvg key={i} beam={beam} displayUnit={displayUnit} />
        ))}
      </VStack>
    </VStack>
  )
}

function summariseRequired(beams: Array<BeamQuota>): string {
  return beams.map((b) => `${b.count}× ${b.size} gu`).join(', ')
}

function plural(noun: string, n: number): string {
  return n === 1 ? noun : `${noun}s`
}

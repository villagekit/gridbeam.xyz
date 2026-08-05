'use client'

import { ProductKitContext } from '@villagekit/product-kit'
import { HStack, Link, LinkButton, Text, VStack } from '@villagekit/ui'
import NextLink from 'next/link'
import { useContext, useDeferredValue, useMemo } from 'react'

import {
  CutBeamSvg,
  type DisplayUnit,
  formatLength,
} from '@/app/_components/cutting-plan/CutBeamSvg'
import {
  type BeamQuota,
  firstFitDecreasing,
  totalCutLength,
  totalPlacedLength,
  totalRemainderLength,
} from '@/app/tools/cutting-planner/algorithm'

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

  // Placed, not required: cuts too long for the stock never enter a beam, so the required
  // total wouldn't reconcile against the stock used. `placed + waste === stock used` always.
  const totalPlaced = totalPlacedLength(planResult.cutBeams)
  const totalCut = totalCutLength(planResult.cutBeams)
  const totalWaste = totalRemainderLength(planResult.cutBeams)

  const plannerHref = useMemo(() => {
    if (requiredBeams.length === 0) return '/tools/cutting-planner'
    const params = new URLSearchParams()
    params.set('r', requiredBeams.map((b) => `${b.size}-${b.count}`).join('~'))
    params.set('u', String(stockSize))
    if (displayUnit === 'mm') params.set('d', 'mm')
    return `/tools/cutting-planner?${params.toString()}`
  }, [requiredBeams, stockSize, displayUnit])

  return (
    <VStack alignItems="stretch" gap="4">
      {requiredBeams.length === 0 ? (
        <Text variant="secondary">This design has no grid-beam parts to cut.</Text>
      ) : planResult.infeasibleBeams.length > 0 && planResult.cutBeams.length === 0 ? (
        <Text>
          All required cuts are longer than the {stockSize} gu stock length — needs custom-length
          stock. Try the{' '}
          <Link as={NextLink} href={plannerHref}>
            cutting planner
          </Link>{' '}
          for full control.
        </Text>
      ) : (
        <>
          <Text>
            Needs {planResult.cutBeams.length} {plural('stock beam', planResult.cutBeams.length)} (
            {formatLength(stockSize, displayUnit)} each), cut into{' '}
            {summariseRequired(requiredBeams)}.
          </Text>
          <Text variant="secondary" fontSize="sm">
            Cuts placed total {formatLength(totalPlaced, displayUnit)}; off-cut waste{' '}
            {formatLength(totalWaste, displayUnit)} from {formatLength(totalCut, displayUnit)} of
            stock.
          </Text>

          <VStack alignItems="stretch" gap="3">
            {planResult.cutBeams.map((beam, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: stable order from algorithm output
              <CutBeamSvg key={i} beam={beam} displayUnit={displayUnit} />
            ))}
          </VStack>

          {planResult.infeasibleBeams.length > 0 && (
            <Text color="red.700" fontSize="sm">
              Some cuts are too long for the {stockSize} gu stock —{' '}
              {summariseRequired(planResult.infeasibleBeams)}. Open the cutting planner to use
              longer stock.
            </Text>
          )}
        </>
      )}

      <HStack justifyContent="flex-end">
        <LinkButton as={NextLink} href={plannerHref} variant="secondary" size="sm">
          Open in cutting planner
        </LinkButton>
      </HStack>
    </VStack>
  )
}

function summariseRequired(beams: Array<BeamQuota>): string {
  return beams.map((b) => `${b.count}× ${b.size} gu`).join(', ')
}

function plural(noun: string, n: number): string {
  return n === 1 ? noun : `${noun}s`
}

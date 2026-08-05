'use client'

import type { PartCreator } from '@villagekit/part'
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

// `parts` is a flat list of individual PartCreators (the kit context flattens
// any grouped parts before exposing them), so each gridbeam entry == one beam.
function getRequiredBeamsFromParts(parts: Array<PartCreator>): Array<BeamQuota> {
  const countBySize: Record<number, number> = {}
  for (const part of parts) {
    const { spec } = part
    if (spec.type === 'gridbeam') {
      // Parametric designs divide to place beams, so lengthInGrids arrives with float drift
      // (lumber-rack yields both 1.9999999999999991 and 2.000000000000001 for the same beam).
      // Beams are cut on the 40 mm grid, so the whole number is the real length. Without this
      // the drift splits one length into two rows, prints "2.000000000000001 gu", and the
      // planner's URL decode reads 1.9999999999999991 as 1 and drops the row entirely.
      const size = Math.round(spec.lengthInGrids)
      countBySize[size] = (countBySize[size] ?? 0) + 1
    }
  }
  return Object.entries(countBySize)
    .map(([size, count]) => ({ size: Number(size), count }))
    .sort((a, b) => b.size - a.size)
}

function summariseRequired(beams: Array<BeamQuota>): string {
  return beams.map((b) => `${b.count}× ${b.size} gu`).join(', ')
}

function plural(noun: string, n: number): string {
  return n === 1 ? noun : `${noun}s`
}

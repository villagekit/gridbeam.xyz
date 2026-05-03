'use client'

import type { PartCreator } from '@villagekit/part'
import { ProductKitContext } from '@villagekit/product-kit'
import { Box, HStack, Heading, Link, LinkButton, Text, VStack } from '@villagekit/ui'
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
  totalRemainderLength,
  totalRequiredLength,
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

  const totalRequired = totalRequiredLength(requiredBeams)
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
    <Box
      p="6"
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentA.300"
      w="full"
    >
      <VStack alignItems="stretch" gap="4">
        <Heading as="h2" size="md">
          Cutting plan
        </Heading>

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
              Needs {planResult.cutBeams.length} {plural('stock beam', planResult.cutBeams.length)}{' '}
              ({formatLength(stockSize, displayUnit)} each), cut into{' '}
              {summariseRequired(requiredBeams)}.
            </Text>
            <Text variant="secondary" fontSize="sm">
              Required cuts total {formatLength(totalRequired, displayUnit)}; off-cut waste{' '}
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
          <LinkButton href={plannerHref} variant="secondary" size="sm">
            Open in cutting planner
          </LinkButton>
        </HStack>
      </VStack>
    </Box>
  )
}

// `parts` is a flat list of individual PartCreators (the kit context flattens
// any grouped parts before exposing them), so each gridbeam entry == one beam.
function getRequiredBeamsFromParts(parts: Array<PartCreator>): Array<BeamQuota> {
  const countBySize: Record<number, number> = {}
  for (const part of parts) {
    const { spec } = part
    if (spec.type === 'gridbeam') {
      const size = spec.lengthInGrids
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

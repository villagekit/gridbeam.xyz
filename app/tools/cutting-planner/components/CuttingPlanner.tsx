// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/components/cutting-planner.tsx
'use client'

import dotProp from 'dot-prop-immutable'
import type React from 'react'
import { useCallback, useState } from 'react'

import {
  Button,
  Field,
  Flex,
  FormLabel,
  Section,
  Select,
  Stack,
  Text,
  VStack,
  useIsMobile,
} from '@villagekit/ui'

import { firstFitDecreasing } from '../algorithms'
import type { BeamQuota, CuttingPlannerOptions, CuttingPlannerOutput } from '../shared'
import { BeamsTable, CuttingPlan } from './'

/** The planner takes no props; the interface is legacy's, kept for its signature. */
export interface CuttingPlannerProps {}

/**
 * The cutting planner applet: the controls above the result, the result computed by the
 * first-fit-decreasing algorithm each time `Plan it!` is pressed.
 */
export function CuttingPlanner(_props: CuttingPlannerProps) {
  const [result, setResult] = useState<CuttingPlannerOutput | null>(null)
  const handlePlan = useCallback((options: CuttingPlannerOptions) => {
    setResult(firstFitDecreasing(options))
  }, [])

  return (
    <>
      <CuttingPlannerControls onPlan={handlePlan} />
      <CuttingPlannerResult result={result} />
    </>
  )
}

/** The controls' one prop: `onPlan`, called with the planner's options when `Plan it!` is pressed. */
export type CuttingPlannerControlsProps = {
  onPlan: (options: CuttingPlannerOptions) => void
}

/**
 * The planner's inputs on a gray band: the editable `Beams you want` and `Beams you have` tables,
 * the top-up select under the stock table and the centered `Plan it!` button.
 */
export function CuttingPlannerControls(props: CuttingPlannerControlsProps) {
  const { onPlan } = props

  const isMobile = useIsMobile()

  const [requiredBeams, setRequiredBeams] = useState<Array<BeamQuota>>([
    { count: 8, size: 10 },
    { count: 4, size: 15 },
  ])

  const [stockBeams, setStockBeams] = useState<Array<BeamQuota>>([])

  const handleCreateRequiredBeam = useCallback((beam: BeamQuota) => {
    setRequiredBeams((current) => [...current, beam])
  }, [])

  const handleCreateStockBeam = useCallback((beam: BeamQuota) => {
    setStockBeams((current) => [...current, beam])
  }, [])

  const handleChangeRequiredBeam = useCallback((index: number, beam: BeamQuota) => {
    setRequiredBeams((current) => dotProp.set(current, index, beam))
  }, [])

  const handleChangeStockBeam = useCallback((index: number, beam: BeamQuota) => {
    setStockBeams((current) => dotProp.set(current, index, beam))
  }, [])

  const handleDeleteRequiredBeam = useCallback((index: number) => {
    setRequiredBeams((current) => {
      return dotProp.delete(current, index).filter((beam: BeamQuota) => beam != null)
    })
  }, [])

  const handleDeleteStockBeam = useCallback((index: number) => {
    setStockBeams((current) =>
      dotProp.delete(current, index).filter((beam: BeamQuota) => beam != null),
    )
  }, [])

  const [hasUnlimitedStock, setUnlimitedStock] = useState<false | 30 | 60>(30)
  const handleUnlimitedStockChange = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value
    switch (value) {
      case 'false':
        setUnlimitedStock(false)
        break
      case '30':
        setUnlimitedStock(30)
        break
      case '60':
        setUnlimitedStock(60)
        break
      default:
        throw new Error(`Unexpected value: ${value}`)
    }
  }, [])

  const handlePlanClick = useCallback(() => {
    onPlan({ requiredBeams, stockBeams, hasUnlimitedStock })
  }, [onPlan, requiredBeams, stockBeams, hasUnlimitedStock])

  return (
    <Section index={0} aria-label="Controls" colorPalette="gray">
      <Stack justifyContent="center" direction={isMobile ? 'column' : 'row'} gap="8">
        <BeamsTable
          title="Beams you want"
          beams={requiredBeams}
          caption="Enter your desired beam lengths here."
          onCreateBeam={handleCreateRequiredBeam}
          onChangeBeam={handleChangeRequiredBeam}
          onDeleteBeam={handleDeleteRequiredBeam}
          css={{ flex: 1 }}
        />

        <VStack gap="4" css={{ flex: 1 }}>
          <BeamsTable
            title="Beams you have"
            beams={stockBeams}
            caption="Enter any beam lengths you already have here."
            onCreateBeam={handleCreateStockBeam}
            onChangeBeam={handleChangeStockBeam}
            onDeleteBeam={handleDeleteStockBeam}
          />

          {/* Chakra v3's field is a column by default; the row is legacy's display: flex on
              v2's block FormControl. */}
          <Field.Root
            css={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <FormLabel htmlFor="unlimited-beams" css={{ marginBottom: 0 }}>
              <Text fontSize="sm" variant="tertiary">
                Automatically add full length beams if needed
              </Text>
            </FormLabel>

            <Select.Root>
              <Select.Field
                id="unlimited-beams"
                value={String(hasUnlimitedStock)}
                onChange={handleUnlimitedStockChange}
              >
                <option value="false">None</option>
                <option value="30">30gu</option>
                <option value="60">60gu</option>
              </Select.Field>
              <Select.Indicator />
            </Select.Root>
          </Field.Root>
        </VStack>
      </Stack>

      <Flex justifyContent="space-evenly">
        <Button onClick={handlePlanClick} disabled={requiredBeams.length === 0}>
          Plan it!
        </Button>
      </Flex>
    </Section>
  )
}

/** The planner's output to render, or `null` before a plan is computed. */
export type CuttingPlannerResultProps = {
  result: CuttingPlannerOutput | null
}

/**
 * The planner's output: the cutting plan in its `Cut beams` section when any beam was cut, and
 * the infeasible and unused beams in read-only tables under `Uncut beams` when there are any.
 */
export function CuttingPlannerResult(props: CuttingPlannerResultProps) {
  const { result } = props

  const isMobile = useIsMobile()

  if (result == null) return null

  return (
    <>
      {result.cutBeams.length > 0 && (
        <Section index={1} aria-label="Cut beams" maxW="6xl">
          <CuttingPlan beams={result.cutBeams} />
        </Section>
      )}

      {(result.infeasibleBeams.length > 0 || result.unusedBeams.length > 0) && (
        <Section index={result.cutBeams.length > 0 ? 2 : 1} aria-label="Uncut beams">
          <Stack justifyContent="center" direction={isMobile ? 'column' : 'row'} gap="8">
            {result.infeasibleBeams.length > 0 && (
              <BeamsTable
                title="Infeasible beams"
                beams={result.infeasibleBeams}
                caption="We couldn't figure out how to cut these beams."
              />
            )}

            {result.unusedBeams.length > 0 && (
              <BeamsTable
                title="Unused beams"
                beams={result.unusedBeams}
                caption="We didn't end up using the following beams."
              />
            )}
          </Stack>
        </Section>
      )}
    </>
  )
}

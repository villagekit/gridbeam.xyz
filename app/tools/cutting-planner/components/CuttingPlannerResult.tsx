// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/components/cutting-planner.tsx#L161-L203
'use client'

import { Section, Stack, useIsMobile } from '@villagekit/ui'

import type { CuttingPlannerOutput } from '../algorithm'
import { BeamsTable, CuttingPlan } from './'

// Note(cc): legacy's cutting-planner.tsx also holds CuttingPlanner and CuttingPlannerControls;
// they join this file when the cutting planner record re-ports the monolith CuttingPlanner.tsx.

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

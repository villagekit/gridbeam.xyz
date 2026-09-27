// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/design/parts-breakdown.tsx
'use client'

import { useCallback, useState } from 'react'

import { ProductSummary } from '@villagekit/product'
import { Field, FormLabel, Switch, Text, VStack } from '@villagekit/ui'

import { DisplayUnitToggle } from '@/app/tools/cutting-planner/components'

/**
 * The Parts tab: the engine's parts summary, then the Settings menu with the unit toggle and the
 * switch that groups same-size parts.
 */
export function PartsBreakdown() {
  const [showInMillimeters, setShowInMillimeters] = useState(false)
  const [groupParts, setGroupParts] = useState(true)
  const toggleShowInMillimeters = useCallback(() => setShowInMillimeters((current) => !current), [])
  const toggleGroupParts = useCallback(() => setGroupParts((current) => !current), [])

  return (
    <>
      <ProductSummary displayUnit={showInMillimeters ? 'mm' : 'gu'} groupParts={groupParts} />

      <VStack role="menu" aria-labelledby="design-parts-breakdown-settings" alignItems="flex-start">
        <Text id="design-parts-breakdown-settings" css={{ fontWeight: 'bold' }}>
          Settings
        </Text>

        <DisplayUnitToggle
          showInMillimeters={showInMillimeters}
          onChange={toggleShowInMillimeters}
        />

        <Field.Root css={{ display: 'flex', flexDirection: 'row' }}>
          <FormLabel htmlFor="design-parts-breakdown-group-parts">
            <Text fontSize="sm" variant="tertiary">
              Group same size parts
            </Text>
          </FormLabel>

          {/* The id goes on the hidden input, where Chakra v2 put it, so the label's htmlFor names it;
              passing ids replaces Ark's field ids whole, so the switch's aria-labelledby dangles and
              the name falls to the label, as on the applet's toggle. */}
          <Switch.Root
            ids={{ hiddenInput: 'design-parts-breakdown-group-parts' }}
            checked={groupParts}
            onCheckedChange={toggleGroupParts}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
        </Field.Root>
      </VStack>
    </>
  )
}

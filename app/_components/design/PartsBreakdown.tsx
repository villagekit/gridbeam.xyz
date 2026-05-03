'use client'

import { ProductSummary } from '@villagekit/product'
import { Box, FormLabel, HStack, Heading, Switch, Text, VStack } from '@villagekit/ui'
import { useState } from 'react'

import type { DisplayUnit } from '@/app/_components/cutting-plan/CutBeamSvg'

interface PartsBreakdownProps {
  displayUnit: DisplayUnit
  onDisplayUnitChange: (unit: DisplayUnit) => void
}

export function PartsBreakdown(props: PartsBreakdownProps) {
  const { displayUnit, onDisplayUnitChange } = props
  const [groupParts, setGroupParts] = useState(true)

  return (
    <Box
      p="6"
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentB.300"
      w="full"
    >
      <VStack alignItems="stretch" gap="4">
        <HStack justifyContent="space-between" alignItems="flex-start" gap="4" flexWrap="wrap">
          <Heading as="h2" size="md">
            Parts list
          </Heading>

          <HStack gap="4" flexWrap="wrap">
            <DisplayUnitToggle value={displayUnit} onChange={onDisplayUnitChange} />
            <GroupPartsToggle value={groupParts} onChange={setGroupParts} />
          </HStack>
        </HStack>

        <ProductSummary displayUnit={displayUnit} groupParts={groupParts} />
      </VStack>
    </Box>
  )
}

interface DisplayUnitToggleProps {
  value: DisplayUnit
  onChange: (unit: DisplayUnit) => void
}

function DisplayUnitToggle(props: DisplayUnitToggleProps) {
  const { value, onChange } = props
  return (
    <HStack gap="2">
      <Text fontSize="sm" variant="secondary">
        gu
      </Text>
      <Switch.Root
        size="sm"
        checked={value === 'mm'}
        onCheckedChange={({ checked }) => onChange(checked ? 'mm' : 'gu')}
        aria-label="Show measurements in millimetres"
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
      <Text fontSize="sm" variant="secondary">
        mm
      </Text>
    </HStack>
  )
}

interface GroupToggleProps {
  value: boolean
  onChange: (value: boolean) => void
}

function GroupPartsToggle(props: GroupToggleProps) {
  const { value, onChange } = props
  return (
    <HStack gap="2">
      <FormLabel htmlFor="design-parts-group" mb="0">
        <Text fontSize="sm" variant="secondary">
          Group same size
        </Text>
      </FormLabel>
      <Switch.Root
        id="design-parts-group"
        size="sm"
        checked={value}
        onCheckedChange={({ checked }) => onChange(checked)}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </HStack>
  )
}

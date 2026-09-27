'use client'

import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  NumberInput,
  Section,
  Select,
  Stack,
  Switch,
  Table,
  Text,
  VStack,
  VisuallyHidden,
  chakra,
} from '@villagekit/ui'
import { useCallback, useState } from 'react'

import { CutBeamSvg, type DisplayUnit } from '@/app/_components/cutting-plan/CutBeamSvg'

import {
  type BeamQuota,
  type CuttingPlannerOutput,
  type UnlimitedStock,
  firstFitDecreasing,
} from './algorithm'

export function CuttingPlanner() {
  const [requiredBeams, setRequiredBeams] = useState<Array<BeamQuota>>([
    { count: 8, size: 10 },
    { count: 4, size: 15 },
  ])
  const [stockBeams, setStockBeams] = useState<Array<BeamQuota>>([])
  const [hasUnlimitedStock, setHasUnlimitedStock] = useState<UnlimitedStock>(60)
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('gu')
  const [result, setResult] = useState<CuttingPlannerOutput | null>(null)

  const handlePlan = useCallback(() => {
    setResult(firstFitDecreasing({ requiredBeams, stockBeams, hasUnlimitedStock }))
  }, [requiredBeams, stockBeams, hasUnlimitedStock])

  return (
    <>
      <Section index={1} aria-label="Controls" maxW="6xl" colorPalette="gray">
        <VStack alignItems="stretch" gap="6">
          <Stack direction={{ base: 'column', md: 'row' }} gap="6" alignItems="stretch">
            <BeamsTable
              title="Beams you want"
              caption="The cuts you need."
              beams={requiredBeams}
              onChange={setRequiredBeams}
              defaultSize={10}
            />
            <BeamsTable
              title="Beams you have"
              caption="Stock you already own. Leave empty to use only fresh beams."
              beams={stockBeams}
              onChange={setStockBeams}
              defaultSize={60}
            />
          </Stack>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap="4"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <HStack gap="3">
              {/* Legacy's shape was `FormLabel > Text variant="tertiary"`. `chakra.label`
                  stands in for FormLabel because Chakra v3's `FieldLabel` needs a `Field.Root`
                  and its polymorphic `as` doesn't widen htmlFor onto Text's props. */}
              <chakra.label htmlFor="unlimited-stock">
                <Text as="span" fontSize="sm" variant="tertiary">
                  Top up with full-length beams
                </Text>
              </chakra.label>
              <Select.Root size="sm" maxW="36">
                <Select.Field
                  id="unlimited-stock"
                  value={String(hasUnlimitedStock)}
                  onChange={(ev) => setHasUnlimitedStock(parseUnlimited(ev.target.value))}
                  bg="white"
                >
                  <option value="60">2400 mm (60 gu)</option>
                  <option value="30">1200 mm (30 gu)</option>
                  <option value="false">None — use only stock</option>
                </Select.Field>
                <Select.Indicator />
              </Select.Root>
            </HStack>

            <DisplayUnitToggle value={displayUnit} onChange={setDisplayUnit} />

            <Button
              onClick={handlePlan}
              disabled={requiredBeams.length === 0}
              size="md"
              variant="primary"
            >
              Plan it
            </Button>
          </Stack>
        </VStack>
      </Section>

      {result != null && (
        <Section index={2} aria-label="Cut beams" maxW="6xl" colorPalette="gray">
          <VStack alignItems="stretch" gap="6">
            <Center>
              <Heading as="h2" size="lg">
                Cutting plan
              </Heading>
            </Center>
            {result.cutBeams.length > 0 && (
              <VStack alignItems="stretch" gap="3">
                {result.cutBeams.map((beam, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable order from algorithm output
                  <CutBeamSvg key={i} beam={beam} displayUnit={displayUnit} />
                ))}
              </VStack>
            )}
          </VStack>
        </Section>
      )}

      {result != null && (result.infeasibleBeams.length > 0 || result.unusedBeams.length > 0) && (
        <Section index={3} aria-label="Uncut beams" maxW="6xl">
          <Stack direction={{ base: 'column', md: 'row' }} gap="6" alignItems="stretch">
            {result.infeasibleBeams.length > 0 && (
              <Box flex="1">
                <BeamsTable
                  title="Infeasible cuts"
                  caption="These cuts couldn't be made — typically a single cut longer than any available beam."
                  beams={result.infeasibleBeams}
                  defaultSize={10}
                />
              </Box>
            )}
            {result.unusedBeams.length > 0 && (
              <Box flex="1">
                <BeamsTable
                  title="Unused stock"
                  caption="These stock beams weren't needed for the plan."
                  beams={result.unusedBeams}
                  defaultSize={60}
                />
              </Box>
            )}
          </Stack>
        </Section>
      )}
    </>
  )
}

interface BeamsTableProps {
  title: string
  caption: string
  beams: Array<BeamQuota>
  onChange?: (beams: Array<BeamQuota>) => void
  defaultSize: number
}

function BeamsTable(props: BeamsTableProps) {
  const { title, caption, beams, onChange, defaultSize } = props

  const handleAdd = () => {
    onChange?.([...beams, { count: 1, size: defaultSize }])
  }

  const handleChange = (index: number, beam: BeamQuota) => {
    onChange?.(beams.map((b, i) => (i === index ? beam : b)))
  }

  const handleDelete = (index: number) => {
    onChange?.(beams.filter((_, i) => i !== index))
  }

  return (
    <VStack
      as="section"
      aria-label={title}
      gap="3"
      flex="1"
      p="4"
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
    >
      <Heading as="h3" size="md" textAlign="center">
        {title}
      </Heading>
      <Text variant="tertiary" fontSize="sm" textAlign="center">
        {caption}
      </Text>

      <Table.Root size="sm" variant="line" w="full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="45%">Length (gu)</Table.ColumnHeader>
            <Table.ColumnHeader w="35%">Quantity</Table.ColumnHeader>
            <Table.ColumnHeader w="20%">
              <VisuallyHidden>Delete</VisuallyHidden>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {beams.map((beam, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: row identity is the index in user-managed list
            <Table.Row key={index}>
              <Table.Cell>
                <BeamSizeInput
                  value={beam.size}
                  disabled={onChange == null}
                  onChange={(size) => handleChange(index, { ...beam, size })}
                />
              </Table.Cell>
              <Table.Cell>
                <BeamCountInput
                  value={beam.count}
                  disabled={onChange == null}
                  onChange={(count) => handleChange(index, { ...beam, count })}
                />
              </Table.Cell>
              <Table.Cell>
                {onChange != null && (
                  <IconButton
                    title={`Remove row ${index + 1}`}
                    onClick={() => handleDelete(index)}
                    variant="tertiary"
                    size="sm"
                  >
                    <MinusIcon />
                  </IconButton>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
          {onChange != null && (
            <Table.Row>
              <Table.Cell colSpan={3}>
                <Center>
                  <Button onClick={handleAdd} variant="secondary" size="sm">
                    <PlusIcon /> Add row
                  </Button>
                </Center>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </VStack>
  )
}

interface BeamSizeInputProps {
  value: number
  disabled?: boolean
  onChange: (size: number) => void
}

function BeamSizeInput(props: BeamSizeInputProps) {
  const { value, disabled, onChange } = props
  return (
    <NumberInput.Root
      size="sm"
      value={Number.isFinite(value) ? String(value) : ''}
      min={1}
      step={1}
      disabled={disabled}
      onValueChange={({ valueAsNumber }) => {
        if (Number.isFinite(valueAsNumber)) onChange(Math.round(valueAsNumber))
      }}
    >
      {!disabled && (
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      )}
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

interface BeamCountInputProps {
  value: number
  disabled?: boolean
  onChange: (count: number) => void
}

function BeamCountInput(props: BeamCountInputProps) {
  const { value, disabled, onChange } = props
  return (
    <NumberInput.Root
      size="sm"
      value={Number.isFinite(value) ? String(value) : ''}
      min={1}
      max={50}
      step={1}
      disabled={disabled}
      onValueChange={({ valueAsNumber }) => {
        if (Number.isFinite(valueAsNumber)) onChange(Math.round(valueAsNumber))
      }}
    >
      {!disabled && (
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      )}
      <NumberInput.Input />
    </NumberInput.Root>
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
      {/* aria-hidden because the switch carries the whole announcement, so a bare "gu" / "mm"
          either side would just be noise. Legacy also made these clickable (they were FormLabels
          bound to the switch); these are plain text, which is a smaller click target than legacy
          offered; the ledger carries it as a difference on /tools/cutting-planner. */}
      <Text fontSize="sm" variant="secondary" aria-hidden>
        gu
      </Text>
      <Switch.Root
        size="sm"
        checked={value === 'mm'}
        onCheckedChange={({ checked }) => onChange(checked ? 'mm' : 'gu')}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        {/* The control carries legacy's explicit name (display-unit-toggle.tsx).
            It goes in Switch.Label rather than an aria-label because Switch.Root unconditionally
            points the input's aria-labelledby here, and a real element beats the dangling idref
            an aria-label-only version would leave behind. */}
        <Switch.Label>
          <VisuallyHidden>Display units as millimeters or grid units</VisuallyHidden>
        </Switch.Label>
      </Switch.Root>
      <Text fontSize="sm" variant="secondary" aria-hidden>
        mm
      </Text>
    </HStack>
  )
}

function tryParseUnlimited(value: string | null): UnlimitedStock | null {
  if (value === '30') return 30
  if (value === '60') return 60
  if (value === 'false') return false
  return null
}

// Trusted input: the Select's option values are literals in the component, so anything else is a
// bug in this codebase rather than user data. Legacy threw here too
// (../node-modules/apps/gridkit/pages/tools/cutting-planner.tsx:86-95 at fce357d).
function parseUnlimited(value: string): UnlimitedStock {
  const parsed = tryParseUnlimited(value)
  if (parsed == null) throw new Error(`Unexpected unlimited-stock value: ${value}`)
  return parsed
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <title>Minus</title>
      <rect x="3" y="7" width="10" height="2" rx="1" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <title>Plus</title>
      <rect x="3" y="7" width="10" height="2" rx="1" />
      <rect x="7" y="3" width="2" height="10" rx="1" />
    </svg>
  )
}

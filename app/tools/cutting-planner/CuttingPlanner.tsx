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
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import {
  CutBeamSvg,
  type DisplayUnit,
  formatLength,
} from '@/app/_components/cutting-plan/CutBeamSvg'
import { replaceUrl } from '@/app/_lib/url-state'

import {
  type BeamQuota,
  type CuttingPlannerOutput,
  type UnlimitedStock,
  firstFitDecreasing,
  totalCutLength,
  totalPlacedLength,
  totalRemainderLength,
} from './algorithm'
import {
  MAX_COUNT,
  MAX_ROWS,
  MIN_COUNT,
  MIN_SIZE,
  decodeUrlState,
  encodeUrlState,
  parseUnlimited,
} from './url-codec'

const PRINT_STYLES = `
@media print {
  body { background: white; }
  .vk-cutting-controls, .vk-cutting-unused, header, footer, [data-skip-nav-link] {
    display: none !important;
  }
  .vk-cutting-result, .vk-cutting-infeasible {
    border: none !important;
    padding: 0 !important;
    background: white !important;
  }
  .vk-cutting-result figure {
    page-break-inside: avoid;
    break-inside: avoid;
  }
}
`

export function CuttingPlanner() {
  const searchParams = useSearchParams()

  const initial = useMemo(() => decodeUrlState(searchParams), [searchParams])

  const [requiredBeams, setRequiredBeams] = useState<Array<BeamQuota>>(initial.required)
  const [stockBeams, setStockBeams] = useState<Array<BeamQuota>>(initial.stock)
  const [hasUnlimitedStock, setHasUnlimitedStock] = useState<UnlimitedStock>(initial.unlimited)
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>(initial.display)
  // Plan straight away when the URL carried state, so a shared link lands on its result.
  // A lazy initialiser rather than a mount effect: it is the same run-once semantics without
  // the ref guard, and it avoids rendering the empty state for a frame first.
  const [result, setResult] = useState<CuttingPlannerOutput | null>(() =>
    initial.hasState && initial.required.length > 0
      ? firstFitDecreasing({
          requiredBeams: initial.required,
          stockBeams: initial.stock,
          hasUnlimitedStock: initial.unlimited,
        })
      : null,
  )

  const handlePlan = useCallback(() => {
    setResult(firstFitDecreasing({ requiredBeams, stockBeams, hasUnlimitedStock }))
    const query = encodeUrlState({
      required: requiredBeams,
      stock: stockBeams,
      unlimited: hasUnlimitedStock,
      display: displayUnit,
    })
    replaceUrl(query ? `/tools/cutting-planner?${query}` : '/tools/cutting-planner')
  }, [requiredBeams, stockBeams, hasUnlimitedStock, displayUnit])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <>
      <style>{PRINT_STYLES}</style>

      <Section
        index={1}
        aria-label="Controls"
        maxW="6xl"
        className="vk-cutting-controls"
        colorPalette="gray"
      >
        <VStack alignItems="stretch" gap="6">
          {/* A dropped entry leaves a table that looks like the whole plan. Say so, or the
              planner is as misleading as the truncation this avoids. */}
          {initial.dropped && (
            <Text variant="tertiary" color="red.700" textAlign="center">
              Some beams in that link were out of range and have been left out.
            </Text>
          )}

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
        <Section
          index={2}
          aria-label="Cut beams"
          maxW="6xl"
          className="vk-cutting-result"
          colorPalette="gray"
        >
          <VStack alignItems="stretch" gap="6">
            <Center>
              <Heading as="h2" size="lg">
                Cutting plan
              </Heading>
            </Center>
            <ResultSummary result={result} displayUnit={displayUnit} />
            {result.cutBeams.length > 0 && (
              <VStack alignItems="stretch" gap="3">
                {result.cutBeams.map((beam, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable order from algorithm output
                  <CutBeamSvg key={i} beam={beam} displayUnit={displayUnit} />
                ))}
              </VStack>
            )}
            <Center>
              <Button onClick={handlePrint} variant="secondary" size="sm">
                Print plan
              </Button>
            </Center>
          </VStack>
        </Section>
      )}

      {result != null && (result.infeasibleBeams.length > 0 || result.unusedBeams.length > 0) && (
        <Section index={3} aria-label="Uncut beams" maxW="6xl">
          <Stack direction={{ base: 'column', md: 'row' }} gap="6" alignItems="stretch">
            {result.infeasibleBeams.length > 0 && (
              <Box flex="1" className="vk-cutting-infeasible">
                <BeamsTable
                  title="Infeasible cuts"
                  caption="These cuts couldn't be made — typically a single cut longer than any available beam."
                  beams={result.infeasibleBeams}
                  defaultSize={10}
                />
              </Box>
            )}
            {result.unusedBeams.length > 0 && (
              <Box flex="1" className="vk-cutting-unused">
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
                  {/* Capped at MAX_ROWS so the table can't build a plan its own share link
                      would truncate on the way back in. No tooltip explaining the cap: a
                      `disabled` button fires no mouse events, so `title` would never show. */}
                  <Button
                    onClick={handleAdd}
                    disabled={beams.length >= MAX_ROWS}
                    variant="secondary"
                    size="sm"
                  >
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
      min={MIN_SIZE}
      step={1}
      disabled={disabled}
      // Rounded because the share link only carries integers: `?r=10.5-2` is rejected by the
      // decode, so a fractional value here would make the planner refuse a link it had just
      // written. Nothing in zag guarantees one — `step` doesn't snap the value, and
      // `clampValueOnBlur` only clamps to `min`/`max` — so this round is what makes it true.
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
      min={MIN_COUNT}
      max={MAX_COUNT}
      step={1}
      disabled={disabled}
      // Rounded for the same reason as the size input above.
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
          offered — see todo/07-code-review/15-parity-nits.md. */}
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
        {/* Legacy named this control explicitly (display-unit-toggle.tsx); the port dropped it.
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

interface ResultSummaryProps {
  result: CuttingPlannerOutput
  displayUnit: DisplayUnit
}

function ResultSummary(props: ResultSummaryProps) {
  const { result, displayUnit } = props
  // Placed, not required: with infeasible cuts in play the required total doesn't reconcile
  // against the stock used. These three always satisfy `placed + waste === stock used`.
  const totalPlaced = totalPlacedLength(result.cutBeams)
  const totalCut = totalCutLength(result.cutBeams)
  const totalWaste = totalRemainderLength(result.cutBeams)

  return (
    <Center>
      <VStack alignItems="center" gap="1" textAlign="center">
        <Text>
          {result.cutBeams.length} {plural('stock beam', result.cutBeams.length)} used —{' '}
          {formatLength(totalCut, displayUnit)}.
        </Text>
        <Text variant="secondary">
          Cuts placed total {formatLength(totalPlaced, displayUnit)}; off-cut waste{' '}
          {formatLength(totalWaste, displayUnit)}.
        </Text>
        {result.infeasibleBeams.length > 0 && (
          <Text variant="tertiary" color="red.700">
            Some cuts are infeasible — see below.
          </Text>
        )}
      </VStack>
    </Center>
  )
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

function plural(noun: string, n: number): string {
  return n === 1 ? noun : `${noun}s`
}

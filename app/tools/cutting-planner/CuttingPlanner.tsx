'use client'

import {
  Box,
  Button,
  Center,
  FormLabel,
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
} from '@villagekit/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  type BeamQuota,
  type CuttingPlannerOutput,
  type OutputBeam,
  type UnlimitedStock,
  firstFitDecreasing,
  totalCutLength,
  totalRemainderLength,
  totalRequiredLength,
} from './algorithm'

const MM_PER_GU = 40
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

type DisplayUnit = 'gu' | 'mm'

const DEFAULT_REQUIRED: Array<BeamQuota> = [
  { count: 8, size: 10 },
  { count: 4, size: 15 },
]
const DEFAULT_STOCK: Array<BeamQuota> = []
const DEFAULT_UNLIMITED: UnlimitedStock = 60
const DEFAULT_DISPLAY: DisplayUnit = 'gu'

export function CuttingPlanner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initial = useMemo(() => decodeUrlState(searchParams), [searchParams])

  const [requiredBeams, setRequiredBeams] = useState<Array<BeamQuota>>(initial.required)
  const [stockBeams, setStockBeams] = useState<Array<BeamQuota>>(initial.stock)
  const [hasUnlimitedStock, setHasUnlimitedStock] = useState<UnlimitedStock>(initial.unlimited)
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>(initial.display)
  const [result, setResult] = useState<CuttingPlannerOutput | null>(null)

  // Auto-plan on first mount if URL state was present (so a shared link shows the result).
  const didAutoPlan = useRef(false)
  useEffect(() => {
    if (didAutoPlan.current) return
    didAutoPlan.current = true
    if (initial.hasState) {
      setResult(firstFitDecreasing({ requiredBeams, stockBeams, hasUnlimitedStock }))
    }
  }, [initial.hasState, requiredBeams, stockBeams, hasUnlimitedStock])

  const handlePlan = useCallback(() => {
    setResult(firstFitDecreasing({ requiredBeams, stockBeams, hasUnlimitedStock }))
    const query = encodeUrlState({
      required: requiredBeams,
      stock: stockBeams,
      unlimited: hasUnlimitedStock,
      display: displayUnit,
    })
    router.replace(query ? `/tools/cutting-planner?${query}` : '/tools/cutting-planner', {
      scroll: false,
    })
  }, [router, requiredBeams, stockBeams, hasUnlimitedStock, displayUnit])

  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') window.print()
  }, [])

  return (
    <>
      <style>{PRINT_STYLES}</style>

      <Section index={1} maxW="6xl" className="vk-cutting-controls">
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
              <FormLabel htmlFor="unlimited-stock" mb="0">
                <Text fontSize="sm" variant="secondary">
                  Top up with full-length beams
                </Text>
              </FormLabel>
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
        <Section index={2} maxW="6xl" className="vk-cutting-result" colorPalette="accentA">
          <VStack alignItems="stretch" gap="6">
            <Center>
              <Heading as="h2" size="lg">
                Cutting plan
              </Heading>
            </Center>
            <ResultSummary result={result} required={requiredBeams} displayUnit={displayUnit} />
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
        <Section index={3} maxW="6xl">
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
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentA.300"
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
      min={2}
      max={60}
      step={1}
      disabled={disabled}
      onValueChange={({ valueAsNumber }) => {
        if (Number.isFinite(valueAsNumber)) onChange(valueAsNumber)
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
        if (Number.isFinite(valueAsNumber)) onChange(valueAsNumber)
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
      <Text fontSize="sm" variant="secondary">
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
      </Switch.Root>
      <Text fontSize="sm" variant="secondary">
        mm
      </Text>
    </HStack>
  )
}

interface ResultSummaryProps {
  result: CuttingPlannerOutput
  required: Array<BeamQuota>
  displayUnit: DisplayUnit
}

function ResultSummary(props: ResultSummaryProps) {
  const { result, required, displayUnit } = props
  const totalRequired = totalRequiredLength(required)
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
          Required cuts total {formatLength(totalRequired, displayUnit)}; off-cut waste{' '}
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

interface CutBeamSvgProps {
  beam: OutputBeam
  displayUnit: DisplayUnit
}

function CutBeamSvg(props: CutBeamSvgProps) {
  const { beam, displayUnit } = props
  // viewBox: 0 0 60 6 — beam normalised to a 60 gu reference width.
  const VIEW_W = 60
  const VIEW_H = 6
  const cuts = beam.cuts
  const segments: Array<{ size: number; x: number; isRemainder: boolean }> = []
  let x = 0
  for (const cut of cuts) {
    segments.push({ size: cut, x, isRemainder: false })
    x += cut
  }
  if (beam.remainder > 0) {
    segments.push({ size: beam.remainder, x, isRemainder: true })
  }

  return (
    <Box
      as="figure"
      aria-label={`${beam.size} ${displayUnit === 'mm' ? 'mm' : 'gu'} stock beam, cuts: ${cuts.map((c) => formatLength(c, displayUnit)).join(', ')}, remainder ${formatLength(beam.remainder, displayUnit)}`}
      bg="white"
      p="3"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <HStack justifyContent="space-between" mb="2" gap="3">
        <Text fontWeight="bold" fontSize="sm">
          {formatLength(beam.size, displayUnit)} stock beam
        </Text>
        <Text variant="tertiary" fontSize="xs">
          cuts: {cuts.map((c) => formatLength(c, displayUnit)).join(' + ')}
          {beam.remainder > 0 ? ` + ${formatLength(beam.remainder, displayUnit)} waste` : ''}
        </Text>
      </HStack>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '40px', display: 'block' }}
        role="presentation"
      >
        <title>Cutting plan visualisation</title>
        {/* Beam outline */}
        <rect
          x={0}
          y={0}
          width={beam.size}
          height={VIEW_H}
          fill="none"
          stroke="#1f2937"
          strokeWidth="0.15"
        />
        {/* Segments */}
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1
          return (
            <g key={`${seg.x}-${seg.size}-${seg.isRemainder ? 'r' : 'c'}`}>
              <rect
                x={seg.x}
                y={0}
                width={seg.size}
                height={VIEW_H}
                fill={seg.isRemainder ? '#fef3c7' : segmentFill(i)}
                opacity={seg.isRemainder ? 0.6 : 0.85}
              />
              {!isLast && (
                <line
                  x1={seg.x + seg.size}
                  x2={seg.x + seg.size}
                  y1={-0.5}
                  y2={VIEW_H + 0.5}
                  stroke="#dc2626"
                  strokeWidth="0.2"
                  strokeDasharray="0.4 0.3"
                />
              )}
              {seg.size >= 4 && (
                <text
                  x={seg.x + seg.size / 2}
                  y={VIEW_H / 2 + 0.4}
                  fontSize="1.4"
                  textAnchor="middle"
                  fill="#1f2937"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {formatLength(seg.size, displayUnit)}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </Box>
  )
}

const SEGMENT_FILLS = ['#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4'] as const
function segmentFill(index: number): string {
  return SEGMENT_FILLS[index % SEGMENT_FILLS.length] ?? SEGMENT_FILLS[0]
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

function formatLength(value: number, unit: DisplayUnit): string {
  if (unit === 'mm') return `${(value * MM_PER_GU).toLocaleString('en-US')} mm`
  return `${value} gu`
}

function plural(noun: string, n: number): string {
  return n === 1 ? noun : `${noun}s`
}

function parseUnlimited(value: string): UnlimitedStock {
  if (value === '30') return 30
  if (value === '60') return 60
  return false
}

interface UrlState {
  required: Array<BeamQuota>
  stock: Array<BeamQuota>
  unlimited: UnlimitedStock
  display: DisplayUnit
  hasState: boolean
}

function decodeUrlState(params: URLSearchParams): UrlState {
  const required = decodeQuotas(params.get('r')) ?? DEFAULT_REQUIRED
  const stock = decodeQuotas(params.get('s')) ?? DEFAULT_STOCK
  const unlimited = parseUnlimited(params.get('u') ?? String(DEFAULT_UNLIMITED))
  const display = params.get('d') === 'mm' ? 'mm' : DEFAULT_DISPLAY
  const hasState = params.has('r') || params.has('s')
  return { required, stock, unlimited, display, hasState }
}

function decodeQuotas(value: string | null): Array<BeamQuota> | null {
  if (value == null) return null
  if (value === '') return []
  const out: Array<BeamQuota> = []
  for (const pair of value.split('~')) {
    const [sizeStr, countStr] = pair.split('-')
    const size = Number.parseInt(sizeStr ?? '', 10)
    const count = Number.parseInt(countStr ?? '', 10)
    if (Number.isFinite(size) && Number.isFinite(count) && size >= 2 && count >= 1) {
      out.push({ size, count })
    }
  }
  return out
}

function encodeUrlState(state: {
  required: Array<BeamQuota>
  stock: Array<BeamQuota>
  unlimited: UnlimitedStock
  display: DisplayUnit
}): string {
  const params = new URLSearchParams()
  if (state.required.length > 0) params.set('r', encodeQuotas(state.required))
  if (state.stock.length > 0) params.set('s', encodeQuotas(state.stock))
  if (state.unlimited !== DEFAULT_UNLIMITED) params.set('u', String(state.unlimited))
  if (state.display !== DEFAULT_DISPLAY) params.set('d', state.display)
  return params.toString()
}

function encodeQuotas(quotas: Array<BeamQuota>): string {
  return quotas.map((q) => `${q.size}-${q.count}`).join('~')
}

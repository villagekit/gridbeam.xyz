import { Box, HStack, Text } from '@villagekit/ui'

import type { OutputBeam } from '@/app/tools/cutting-planner/algorithm'

export type DisplayUnit = 'gu' | 'mm'

const MM_PER_GU = 40
const VIEW_W = 60
const VIEW_H = 6
const SEGMENT_FILLS = ['#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4'] as const

interface CutBeamSvgProps {
  beam: OutputBeam
  displayUnit: DisplayUnit
}

export function CutBeamSvg(props: CutBeamSvgProps) {
  const { beam, displayUnit } = props
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
        // Stock longer than a standard beam is legal (the planner accepts custom stock), so the
        // canvas has to grow with it or the bar draws past the right edge.
        viewBox={`0 0 ${Math.max(VIEW_W, beam.size)} ${VIEW_H}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '40px', display: 'block' }}
        role="presentation"
      >
        <title>Cutting plan visualisation</title>
        <rect
          x={0}
          y={0}
          width={beam.size}
          height={VIEW_H}
          fill="none"
          stroke="#1f2937"
          strokeWidth="0.15"
        />
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

export function formatLength(value: number, unit: DisplayUnit): string {
  if (unit === 'mm') return `${(value * MM_PER_GU).toLocaleString('en-US')} mm`
  return `${value} gu`
}

function segmentFill(index: number): string {
  return SEGMENT_FILLS[index % SEGMENT_FILLS.length] ?? SEGMENT_FILLS[0]
}

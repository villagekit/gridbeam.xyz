// Shared layout primitives for the home page. The legacy site enforced
// alternating row direction (`isEven ? 'row' : 'row-reverse'`) so the eye
// settled into a left-right-left rhythm down the page. Centralising the rule
// here keeps every section consistent — no per-section direction flags to
// drift out of sync.

import { Section, type SectionProps, Stack, type StackProps, VStack } from '@villagekit/ui'
import type { ReactNode } from 'react'

interface LandingSectionProps extends Omit<SectionProps, 'children'> {
  children: ReactNode
}

export function LandingSection(props: LandingSectionProps) {
  const { index, children, maxW = '6xl', ...sectionProps } = props

  // Tint odd sections so the page reads as alternating bands. The legacy
  // site used the same trick (`colorScheme={isEven ? undefined : 'gray'}`).
  const colorPalette = index % 2 === 0 ? undefined : 'gray'

  return (
    <Section index={index} colorPalette={colorPalette} maxW={maxW} {...sectionProps}>
      {children}
    </Section>
  )
}

interface LandingRowProps extends Omit<StackProps, 'direction' | 'children'> {
  /** Section index this row sits inside. Drives the row direction at lg+. */
  sectionIndex: number
  children: ReactNode
}

export function LandingRow(props: LandingRowProps) {
  const { sectionIndex, children, gap, alignItems = 'center', ...rest } = props

  // At lg+, alternate row direction by section index so the image and copy
  // swap sides every section (left-right-left rhythm down the page). Below
  // lg, always stack image-above-copy via column-reverse — matches the
  // legacy mobile layout where the visual leads each section.
  const direction =
    sectionIndex % 2 === 0
      ? { base: 'column-reverse' as const, lg: 'row' as const }
      : { base: 'column-reverse' as const, lg: 'row-reverse' as const }

  return (
    <Stack direction={direction} alignItems={alignItems} gap={gap ?? { base: 8, lg: 16 }} {...rest}>
      {children}
    </Stack>
  )
}

interface LandingColumnProps {
  children: ReactNode
  /** Optional flex weight; defaults to 1. */
  flex?: number | string
  /** Vertical gap between children. */
  gap?: number | string
}

export function LandingColumn(props: LandingColumnProps) {
  const { children, flex = 1, gap = 5 } = props
  return (
    <VStack alignItems="flex-start" gap={gap} flex={flex} w="full">
      {children}
    </VStack>
  )
}

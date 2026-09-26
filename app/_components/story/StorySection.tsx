// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-section.tsx
import { Section } from '@villagekit/ui'
import type React from 'react'

export interface StorySectionProps {
  index: number
  children: React.ReactNode | Array<React.ReactNode>
}

export function StorySection(props: StorySectionProps) {
  const { index, children } = props

  const isEven = index % 2 === 0

  return (
    <Section
      index={index}
      maxW="breakpoint-lg"
      colorPalette={isEven ? 'gray' : undefined}
      gap={[8, null, 12]}
    >
      {children}
    </Section>
  )
}

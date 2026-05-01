import { Section } from '@villagekit/ui'
import type { ReactNode } from 'react'

interface StorySectionProps {
  index: number
  children: ReactNode
}

export function StorySection(props: StorySectionProps) {
  const { index, children } = props

  const isEven = index % 2 === 0

  return (
    <Section
      index={index}
      maxW="5xl"
      colorPalette={isEven ? 'gray' : undefined}
      gap={{ base: 8, md: 12 }}
    >
      {children}
    </Section>
  )
}

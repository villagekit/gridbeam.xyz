'use client'

import { Row, useSectionIndex } from '@villagekit/ui'
import type { ReactNode } from 'react'

interface StoryRowProps {
  index: number
  children: ReactNode
}

export function StoryRow(props: StoryRowProps) {
  const { index: rowIndex, children } = props

  const sectionIndex = useSectionIndex()
  const isEven = (sectionIndex + rowIndex) % 2 === 0

  return (
    <Row
      index={rowIndex}
      direction={{ base: 'column', md: isEven ? 'row' : 'row-reverse' }}
      gap={{ base: 4, md: 12 }}
      alignItems="stretch"
    >
      {children}
    </Row>
  )
}

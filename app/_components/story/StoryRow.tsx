// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-row.tsx
'use client'

import { Row, type StackProps, useIsMobile, useSectionIndex } from '@villagekit/ui'
import type React from 'react'

interface StoryRowProps {
  index: number
  children: React.ReactNode | Array<React.ReactNode>
}

export function StoryRow(props: StoryRowProps) {
  const { index: rowIndex, children } = props

  const sectionIndex = useSectionIndex()

  const index = sectionIndex + rowIndex

  const isMobile = useIsMobile()
  const isEven = index % 2 === 0
  const direction: StackProps['direction'] = isMobile ? 'column' : isEven ? 'row' : 'row-reverse'

  return (
    <Row index={rowIndex} direction={direction} gap={[4, null, 12]}>
      {children}
    </Row>
  )
}

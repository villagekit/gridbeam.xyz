// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-column.tsx
import { Column } from '@villagekit/ui'
import type React from 'react'

interface StoryColumnProps {
  index: number
  children: React.ReactNode | Array<React.ReactNode>
}

export function StoryColumn(props: StoryColumnProps) {
  const { index, children } = props

  return (
    <Column index={index} alignItems="center" gap="4" css={{ flex: 1 }}>
      {children}
    </Column>
  )
}

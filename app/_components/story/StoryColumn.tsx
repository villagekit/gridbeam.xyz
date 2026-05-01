import { Column } from '@villagekit/ui'
import type { ReactNode } from 'react'

interface StoryColumnProps {
  index: number
  children: ReactNode
}

export function StoryColumn(props: StoryColumnProps) {
  const { index, children } = props

  return (
    <Column index={index} alignItems="center" gap="4" flex="1" justifyContent="center">
      {children}
    </Column>
  )
}

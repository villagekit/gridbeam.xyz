// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/tip.tsx
'use client'

import { BlockSection, type SystemStyleObject } from '@villagekit/ui'
import type React from 'react'
import { FaRegLightbulb } from 'react-icons/fa'

interface TipProps {
  children: React.ReactNode | Array<React.ReactNode>
  css?: SystemStyleObject
}

export function Tip(props: TipProps) {
  const { children, css } = props

  return (
    <BlockSection Icon={FaRegLightbulb} css={css}>
      {children}
    </BlockSection>
  )
}

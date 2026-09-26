// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/mdx/blockquote.tsx
import type React from 'react'

import { Tip } from '../Tip'

interface BlockQuoteProps {
  children?: React.ReactNode | Array<React.ReactNode>
}

export function blockquote(props: BlockQuoteProps) {
  return (
    <Tip {...props} css={{ alignSelf: 'center', maxWidth: 'lg' }}>
      {/*
        ensure null child because Tip expects this.
        we have to accept undefined children because MDXComponents type.
      */}
      {props.children || null}
    </Tip>
  )
}

// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/mdx/index.tsx
import { mdxComponents as baseComponents } from '@villagekit/ui/mdx'
import type { MDXComponents } from 'mdx/types'

import { blockquote } from './blockquote'

export const components: MDXComponents = {
  ...baseComponents,
  blockquote,
}

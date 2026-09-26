// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/mdx.tsx
import type { HeadingProps } from '@villagekit/ui'
import type { MDXComponents } from 'mdx/types'

import { components as baseComponents } from '../mdx'

export const components: MDXComponents = {
  ...baseComponents,
  h2,
}

const { h2: BaseH2 } = baseComponents

function h2(props: HeadingProps) {
  // Chakra v3 resolves the `css` prop before the style props, so the base map's
  // `alignSelf="flex-start"` would beat a `css` override: the centering is a style
  // prop, written before the caller's so a caller's `alignSelf` prop still wins.
  // @ts-expect-error
  return <BaseH2 alignSelf="center" {...props} />
}

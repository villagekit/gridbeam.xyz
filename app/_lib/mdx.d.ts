declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const story: Record<string, unknown>
  export const metadata: Record<string, unknown>

  const MDXComponent: ComponentType
  export default MDXComponent
}

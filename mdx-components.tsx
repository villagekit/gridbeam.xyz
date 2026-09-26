import type { MDXComponents } from 'mdx/types'

import { components as storyMdxComponents } from '@/app/_components/story/mdx'

// The app router's hook is where legacy's `<MDXProvider components={mdxComponents}>`
// (layouts/stories.tsx) mounted; the six story files are the only MDX on the site,
// so the story map is the site map.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...storyMdxComponents,
  }
}

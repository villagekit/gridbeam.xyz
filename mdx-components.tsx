import {
  AnchorHeading,
  type AnchorHeadingProps,
  Box,
  HStack,
  Link,
  type LinkProps,
  List,
  type ListItemProps,
  type ListProps,
  Text,
  type TextProps,
  Title,
  type TitleProps,
} from '@villagekit/ui'
import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

function MdxLink(props: LinkProps) {
  const { href } = props
  const isHash = typeof href === 'string' && href.startsWith('#')
  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href)
  const externalProps = isExternal && !isHash ? { isExternal: true } : {}

  return <Link variant="paragraph" {...externalProps} {...props} />
}

function H1(props: TitleProps) {
  return <Title as="h1" hasAnchor {...props} />
}

function makeHeading(as: 'h2' | 'h3' | 'h4' | 'h5', size: 'lg' | 'md' | 'sm' | 'xs') {
  return function MdxHeading(props: AnchorHeadingProps) {
    return (
      <AnchorHeading
        as={as}
        size={size}
        hasAnchor
        alignSelf={as === 'h2' ? 'center' : 'flex-start'}
        pt="2"
        {...props}
      />
    )
  }
}

function MdxParagraph(props: TextProps) {
  return <Text width="100%" {...props} />
}

function MdxBlockquote(props: { children?: ReactNode }) {
  return (
    <Box
      as="blockquote"
      width="100%"
      borderRadius="xl"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentB.300"
      bg="accentB.50"
      px="5"
      py="3"
    >
      <HStack gap="3" alignItems="flex-start">
        <QuoteIcon />
        <Box flex="1" color="gray.700">
          {props.children}
        </Box>
      </HStack>
    </Box>
  )
}

function QuoteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      style={{
        color: 'var(--chakra-colors-primary-400)',
        marginTop: 6,
        flexShrink: 0,
      }}
    >
      <title>Quote</title>
      <path d="M5 4H2v3h2c0 1.5-.7 2.5-2 3v1c2.5-.5 4-2.5 4-5V4Zm9 0h-3v3h2c0 1.5-.7 2.5-2 3v1c2.5-.5 4-2.5 4-5V4Z" />
    </svg>
  )
}

function MdxUnorderedList(props: ListProps) {
  return <List.Root as="ul" alignSelf="flex-start" pl="4" gap="1" {...props} />
}

function MdxOrderedList(props: ListProps) {
  return <List.Root as="ol" alignSelf="flex-start" pl="4" gap="1" {...props} />
}

function MdxListItem(props: ListItemProps) {
  return <List.Item {...props} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MdxLink as MDXComponents['a'],
    blockquote: MdxBlockquote as MDXComponents['blockquote'],
    h1: H1 as MDXComponents['h1'],
    h2: makeHeading('h2', 'lg') as MDXComponents['h2'],
    h3: makeHeading('h3', 'md') as MDXComponents['h3'],
    h4: makeHeading('h4', 'sm') as MDXComponents['h4'],
    h5: makeHeading('h5', 'xs') as MDXComponents['h5'],
    li: MdxListItem as MDXComponents['li'],
    ol: MdxOrderedList as MDXComponents['ol'],
    p: MdxParagraph as MDXComponents['p'],
    ul: MdxUnorderedList as MDXComponents['ul'],
  }
}

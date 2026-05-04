'use client'

import { Box, HStack, Heading, Link, type NavBrandProps } from '@villagekit/ui'
import NextLink from 'next/link'

import { CubeLogo } from './CubeLogo'

export function SiteBrand(props: NavBrandProps) {
  const { onHideMobileMenu } = props

  return (
    <Link
      as={NextLink}
      href="/"
      onClick={onHideMobileMenu}
      variant="secondary"
      _hover={{ textDecoration: 'none' }}
    >
      <HStack gap="2.5" alignItems="center" pr={{ base: 0, md: 4 }}>
        <Box w="10" h="10" lineHeight="0" flexShrink="0">
          <CubeLogo size="100%" ariaLabel={null} />
        </Box>
        <Heading as="span" size="xl" whiteSpace="nowrap">
          Grid Beam
        </Heading>
      </HStack>
    </Link>
  )
}

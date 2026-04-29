'use client'

import { Heading, Link, type NavBrandProps } from '@villagekit/ui'
import NextLink from 'next/link'

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
      <Heading as="span" size="lg">
        gridbeam.xyz
      </Heading>
    </Link>
  )
}

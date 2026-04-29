'use client'

import { LinkButton, type NavActionProps } from '@villagekit/ui'
import NextLink from 'next/link'

export function SiteHeaderAction(props: NavActionProps) {
  const { onHideMobileMenu } = props

  return (
    <LinkButton as={NextLink} href="/subscribe" onClick={onHideMobileMenu} size="sm">
      Subscribe
    </LinkButton>
  )
}

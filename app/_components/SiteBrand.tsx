// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/layouts/main.tsx
'use client'

import { type NavBrandProps, NavLink } from '@villagekit/ui'
import NextLink from 'next/link'

import { LogoSvg } from './logo'

export function SiteBrand(props: NavBrandProps) {
  const { onHideMobileMenu } = props

  return (
    <>
      <LogoSvg size="10" marginRight={2} />

      <NavLink as={NextLink} href="/" onClick={onHideMobileMenu} size="xl">
        Grid Beam
      </NavLink>
    </>
  )
}

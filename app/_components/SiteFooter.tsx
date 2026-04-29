'use client'

import { Footer, Text } from '@villagekit/ui'

import { footerSections } from '../_lib/nav'

export function SiteFooter() {
  return (
    <Footer sections={footerSections}>
      <Text fontSize="sm" color="gray.700" textAlign="center">
        gridbeam.xyz — open-source educational site about grid beam construction.
      </Text>
    </Footer>
  )
}

// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-legal/src/pages/legal.tsx
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-page/src/components/layouts/CardsLayout.tsx
import { Container, LinkCard, Title, Wrap } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { FaLock } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Our legal information',
}

export default function LegalPage() {
  return (
    <>
      <Title>Our legal information</Title>

      <Title as="h2">Policies</Title>

      <Container maxW="breakpoint-md">
        <Wrap as="ul" gap="8" justify="center" overflow="visible">
          <LinkCard
            title="Privacy policy"
            icon={<FaLock />}
            description="How we collect, use, store, and share personal information."
            href="/legal/privacy-policy"
            linkComponent={NextLink}
          />
        </Wrap>
      </Container>
    </>
  )
}

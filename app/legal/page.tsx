import { LinkCard, Section, SimpleGrid, Title } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { FaLock } from 'react-icons/fa'

const title = 'Our legal information'

export const metadata: Metadata = {
  title,
}

export default function LegalPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title>Our legal information</Title>
      </Section>

      <Section index={1} maxW="6xl">
        <Title as="h2">Policies</Title>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          <LinkCard
            linkComponent={NextLink}
            title="Privacy policy"
            icon={<FaLock />}
            description="How we collect, use, store, and share personal information."
            href="/legal/privacy-policy"
          />
        </SimpleGrid>
      </Section>
    </>
  )
}

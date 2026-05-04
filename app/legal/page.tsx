import {
  Container,
  Heading,
  Link,
  LinkCard,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import { FaCode, FaUserShield } from 'react-icons/fa'

import { ObfuscatedEmailLink } from '../_components/ObfuscatedEmail'

const title = 'Legal'
const description = 'Privacy policy and licensing information for gridbeam.xyz.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/legal',
  },
  twitter: { title, description },
}

export default function LegalPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="The legal small-print, kept as small as possible.">Legal</Title>
        <Container maxW="3xl">
          <Text textAlign="center">
            gridbeam.xyz is a non-commercial educational site. We don't sell, advertise, or track.
          </Text>
        </Container>
      </Section>

      <Section index={1} maxW="6xl">
        <Title as="h2" description="Two policies and a licence — that's the whole legal stack.">
          Policies
        </Title>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          <LinkCard
            title="Privacy policy"
            icon={<FaUserShield />}
            description="What we collect, what we don't, and what we do with anything you send us. Short — we collect almost nothing."
            href="/legal/privacy-policy"
          />
          <LinkCard
            title="Site licence"
            icon={<FaCode />}
            description="The site, the design catalogue, the engine, and the @villagekit/ui component library are all open source under the European Union Public Licence (EUPL-1.2)."
            href="https://github.com/villagekit"
            isExternal
          />
        </SimpleGrid>
      </Section>

      <Section index={2} maxW="6xl" colorPalette="gray">
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="4">
            <Heading as="h2" size="lg">
              Questions
            </Heading>
            <Text>
              Anything unclear? Email{' '}
              <ObfuscatedEmailLink user="hello+gridbeam" domain="mikey.nz" /> or open an issue at{' '}
              <Link
                variant="paragraph"
                href="https://github.com/villagekit/gridbeam.xyz/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/villagekit/gridbeam.xyz/issues
              </Link>
              .
            </Text>
          </VStack>
        </Container>
      </Section>
    </Main>
  )
}

import {
  Container,
  Heading,
  Link,
  LinkButton,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'

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
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          <LegalCard
            title="Privacy policy"
            body="What we collect, what we don't, and what we do with anything you send us. Short — we collect almost nothing."
            href="/legal/privacy-policy"
            cta="Read the privacy policy"
          />
          <LegalCard
            title="Site licence"
            body="The site, the design catalogue, the engine, and the @villagekit/ui component library are all open source under the European Union Public Licence (EUPL-1.2)."
            href="https://github.com/villagekit"
            cta="Source on GitHub"
            isExternal
          />
        </SimpleGrid>
      </Section>

      <Section index={2} maxW="6xl" colorPalette="accentA">
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

interface LegalCardProps {
  title: string
  body: string
  href: string
  cta: string
  isExternal?: boolean
}

function LegalCard(props: LegalCardProps) {
  const { title, body, href, cta, isExternal } = props
  return (
    <VStack
      alignItems="flex-start"
      gap="4"
      p="6"
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentA.300"
      h="full"
    >
      <Heading as="h2" size="md">
        {title}
      </Heading>
      <Text flex="1">{body}</Text>
      <LinkButton href={href} variant="secondary" size="sm" isExternal={isExternal}>
        {cta}
      </LinkButton>
    </VStack>
  )
}

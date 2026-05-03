import {
  Container,
  Heading,
  Link,
  Main,
  Section,
  SkipNavContent,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'

import { ObfuscatedEmail } from '../_components/ObfuscatedEmail'

const title = 'Contact'
const description =
  'Email the maintainer or open an issue on GitHub. Suppliers, contributors, and curious folks all welcome.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/contact',
  },
  twitter: { title, description },
}

export default function ContactPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="How to reach the gridbeam.xyz maintainer.">Get in touch</Title>
        <Container maxW="3xl">
          <Text fontSize="lg">
            We'd love to hear from suppliers wanting to be listed, contributors with patches or
            ideas, and anyone with questions about the system or the catalogue.
          </Text>
        </Container>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
        <Title as="h2" description="Email for private notes. GitHub for anything public.">
          Two channels
        </Title>
        <VStack alignItems="stretch" gap="6" maxW="3xl" mx="auto" w="full">
          <VStack
            alignItems="center"
            gap="4"
            p="8"
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
          >
            <Heading as="h3" size="md">
              Email
            </Heading>
            <Text variant="secondary" textAlign="center">
              Best for private questions, supplier listings, or anything you'd rather not say in
              public.
            </Text>
            <ObfuscatedEmail
              user="hello+gridbeam"
              domain="mikey.nz"
              css={{
                '& a': {
                  color: 'primary.600',
                  fontWeight: 'bold',
                  fontSize: 'xl',
                  textDecoration: 'underline',
                  textDecorationThickness: '2px',
                  wordBreak: 'break-all',
                  textAlign: 'center',
                },
                '& a:hover': {
                  color: 'primary.700',
                },
              }}
            />
          </VStack>

          <VStack
            alignItems="flex-start"
            gap="3"
            p="6"
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
          >
            <Heading as="h3" size="md">
              GitHub Issues
            </Heading>
            <Text>
              Public, traceable, and great for bugs in the site or the catalogue, missing designs,
              or feature requests.
            </Text>
            <Link
              variant="paragraph"
              href="https://github.com/villagekit/gridbeam.xyz/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/villagekit/gridbeam.xyz/issues
            </Link>
          </VStack>
        </VStack>
      </Section>
    </Main>
  )
}

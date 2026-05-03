import {
  Box,
  Container,
  HStack,
  Heading,
  LinkButton,
  Main,
  Section,
  SkipNavContent,
  Text,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'

const title = 'Page not found'
const description =
  "That page isn't here. It may have moved, or never existed. Try the home page or browse the design catalogue."

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="4xl">
        <Container maxW="3xl">
          <VStack alignItems="center" gap="8" textAlign="center">
            <Box>
              <svg
                viewBox="0 0 240 80"
                width="240"
                height="80"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="6" y="20" width="228" height="40" rx="6" fill="#831843" />
                <circle cx="48" cy="40" r="9" fill="#fffbea" />
                <circle cx="120" cy="40" r="9" fill="#fffbea" />
                <circle cx="192" cy="40" r="9" fill="#fffbea" />
              </svg>
            </Box>
            <VStack gap="3">
              <Heading as="h1" size={{ base: '3xl', md: '4xl' }}>
                404 — page not found
              </Heading>
              <Text fontSize="lg" variant="secondary">
                That page isn't here. It may have moved, or never existed.
              </Text>
            </VStack>
            <HStack gap="3" flexWrap="wrap" justifyContent="center">
              <LinkButton href="/">Home</LinkButton>
              <LinkButton href="/designs" variant="secondary">
                Browse designs
              </LinkButton>
            </HStack>
          </VStack>
        </Container>
      </Section>
    </Main>
  )
}

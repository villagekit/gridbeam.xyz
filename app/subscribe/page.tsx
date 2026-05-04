import {
  Container,
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
import { FaEnvelope, FaGithub } from 'react-icons/fa'

const title = 'Newsletter'
const description =
  'A low-volume newsletter about new designs, suppliers, and stories. Not active yet — here is the plan.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/subscribe',
  },
  twitter: { title, description },
}

export default function SubscribePage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="A low-volume newsletter is on the way. No signup form yet.">
          Newsletter
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="5">
            <Text fontSize="lg">
              gridbeam.xyz will publish an occasional newsletter — new designs, supplier news, and
              stories from the community — when there's enough material to make it worth reading.
            </Text>
            <Text>
              The plan is to use <em>Buttondown</em> as the email provider: independent,
              privacy-friendly, no tracking pixels. No signup form is wired up yet, and there's no
              audience pressure to rush one.
            </Text>
            <Text variant="secondary">
              No spam. No marketing automation. No third-party trackers. When the signup ships, the
              terms will be on this page and in the privacy policy.
            </Text>
          </VStack>
        </Container>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
        <Title as="h2" description="Two ways to be told when the newsletter goes live.">
          Find out when it launches
        </Title>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          <LinkCard
            title="Email the maintainer"
            icon={<FaEnvelope />}
            description="Drop a quick note via the contact page and ask to be told when signups open. Same channel for any other newsletter questions."
            href="/contact"
          />
          <LinkCard
            title="Watch the repository"
            icon={<FaGithub />}
            description="The launch will land as a site update in the GitHub repo. Star or watch it to see updates as they ship."
            href="https://github.com/villagekit/gridbeam.xyz"
            isExternal
          />
        </SimpleGrid>
      </Section>
    </Main>
  )
}

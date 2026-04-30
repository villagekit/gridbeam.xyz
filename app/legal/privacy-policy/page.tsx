import {
  Container,
  Heading,
  Link,
  Main,
  Section,
  SkipNavContent,
  Span,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'

import { ObfuscatedEmailLink } from '../../_components/ObfuscatedEmail'

const title = 'Privacy policy'
const description =
  'gridbeam.xyz collects almost nothing. No cookies, no analytics, no third-party trackers. Here is the full picture.'
const lastUpdated = '2026-04-30'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/legal/privacy-policy',
  },
  twitter: { title, description },
}

export default function PrivacyPolicyPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description={`Last updated ${lastUpdated}.`}>Privacy policy</Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="6">
            <Text fontSize="lg">
              gridbeam.xyz is a non-commercial educational site. The short version of this policy
              is: <Span fontWeight="bold">we collect almost nothing</Span>. The longer version
              explains the few exceptions.
            </Text>

            <Heading as="h2" size="lg" pt="4">
              What we don't collect
            </Heading>
            <Text>
              No cookies. No analytics — no Google Analytics, no Plausible, no Matomo, no Sentry. No
              third-party tracking pixels. No advertising. No social-media share-trackers. The site
              does not run any JavaScript that phones home.
            </Text>
            <Text>
              You can verify this. The site is open source at{' '}
              <Link
                variant="paragraph"
                href="https://github.com/villagekit"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/villagekit
              </Link>
              ; everything that ships to your browser is in that repository.
            </Text>

            <Heading as="h2" size="lg" pt="4">
              What we do collect
            </Heading>

            <Heading as="h3" size="md">
              Server access logs
            </Heading>
            <Text>
              Whichever hosting provider serves the site records standard server access logs: IP
              address, request URL, user-agent string, and timestamp. These are retained according
              to that provider's policy. We don't aggregate or analyse them. Once the site is
              deployed, the named provider and a link to their privacy policy will be added here.
            </Text>

            <Heading as="h3" size="md">
              Newsletter signups
            </Heading>
            <Text>
              If a newsletter form ships in future, signups will be handled by an email-newsletter
              provider (most likely Buttondown). Your email address would be stored by that provider
              and used only to deliver newsletter issues. You'd be able to unsubscribe from every
              email. <Span fontWeight="bold">No newsletter is currently active.</Span>
            </Text>

            <Heading as="h3" size="md">
              Contact form
            </Heading>
            <Text>
              If a contact form ships in future, the message you send is delivered to the
              maintainer's email inbox. The provider used to forward the message will receive your
              email address and the message body.{' '}
              <Span fontWeight="bold">No contact form is currently active</Span> — to reach us,
              email a published address or open an issue on the GitHub repository.
            </Text>

            <Heading as="h2" size="lg" pt="4">
              Third parties
            </Heading>
            <Text>
              The only third party currently in the path is the hosting provider, which receives the
              access logs described above. When the newsletter or contact form ship, the providers
              handling them will be listed here. We will not use any third party that requires
              cookies or runs tracking scripts in your browser.
            </Text>

            <Heading as="h2" size="lg" pt="4">
              Your rights
            </Heading>
            <Text>
              You can ask us what data we hold about you and request correction or deletion. The
              quickest way is to email{' '}
              <ObfuscatedEmailLink user="hello+gridbeam" domain="mikey.nz" /> or open an issue at{' '}
              <Link
                variant="paragraph"
                href="https://github.com/villagekit/gridbeam.xyz/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/villagekit/gridbeam.xyz/issues
              </Link>
              . The same channels are linked from the contact page.
            </Text>
            <Text>
              If you live in the European Union, the United Kingdom, or another jurisdiction with
              equivalent rules, the same rights apply under GDPR or your local equivalent.
            </Text>

            <Heading as="h2" size="lg" pt="4">
              Changes
            </Heading>
            <Text>
              When this policy changes, the change is visible in the GitHub commit history of the
              site. The "Last updated" date at the top of this page reflects the most recent change.
              We'll update this page before — not after — any new third-party service starts
              processing your data.
            </Text>

            <Heading as="h2" size="lg" pt="4">
              Contact
            </Heading>
            <Text>
              Questions about this policy? Email{' '}
              <ObfuscatedEmailLink user="hello+gridbeam" domain="mikey.nz" />.
            </Text>
          </VStack>
        </Container>
      </Section>
    </Main>
  )
}

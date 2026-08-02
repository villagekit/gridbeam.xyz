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
import NextLink from 'next/link'

import { ObfuscatedEmailLink } from '../../_components/ObfuscatedEmail'

const title = 'Privacy policy'
const description =
  'gridbeam.xyz collects almost nothing. No cookies, no analytics, no third-party trackers. Here is the full picture.'
const lastUpdated = '2026-08-03'

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
              does not run any JavaScript that reports on you. Even the web fonts are served from
              this site's own domain rather than from Google Fonts. Two pages do fetch a file from
              somewhere else — a YouTube embed on one guide, a graphics-benchmark file on the design
              pages — and both are described under Third parties below.
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
              The site is hosted on Cloudflare Workers. Serving a page means Cloudflare necessarily
              sees standard server-log data: your IP address, the URL you requested, your user-agent
              string, and a timestamp. Cloudflare retains that data under{' '}
              <Link
                variant="paragraph"
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                its own privacy policy
              </Link>
              . We can see recent requests in the Cloudflare dashboard when debugging a problem; we
              don't aggregate, analyse, or export them, and we don't build any profile of you from
              them.
            </Text>

            <Heading as="h3" size="md">
              Images and video
            </Heading>
            <Text>
              Photos and videos are served by{' '}
              <Link
                variant="paragraph"
                href="https://cloudinary.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudinary
              </Link>
              , a media CDN. Your browser fetches those files from Cloudinary directly, so
              Cloudinary sees the same kind of server-log data — IP address, requested file,
              user-agent string, timestamp — for every page that has a photo or a video on it. That
              includes the home page, the about page, and the stories. The design images in the
              catalogue, the icons, and the fonts come from this site's own domain instead.
            </Text>

            <Heading as="h3" size="md">
              Settings kept in your browser
            </Heading>
            <Text>
              The 3D viewer on a design page remembers two display preferences — whether the model
              auto-rotates and whether the grid is shown — in your browser's local storage. That
              stays on your device: it isn't a cookie, it's never sent to us or to anyone else, and
              clearing your browser data removes it.
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
              Two third parties are in the path across the site:{' '}
              <Span fontWeight="bold">Cloudflare</Span>, which hosts it, and{' '}
              <Span fontWeight="bold">Cloudinary</Span>, which serves the photos and videos. Both
              receive the server-log data described above. Neither runs any script in your browser —
              they hand over pages and media files, nothing else.
            </Text>
            <Text>
              Two places reach one step further. The guide on{' '}
              <Link as={NextLink} variant="paragraph" href="/stories/how-to-furniture-bolts">
                installing furniture bolts
              </Link>{' '}
              embeds a YouTube video. It loads from{' '}
              <Span fontStyle="italic">youtube-nocookie.com</Span>, YouTube's privacy-enhanced
              domain, which Google says holds off on tracking cookies until you press play — but
              YouTube receives your IP address and user-agent as soon as the player appears. It's
              the only embed of its kind anywhere on the site.
            </Text>
            <Text>
              And the 3D viewer on a{' '}
              <Link as={NextLink} variant="paragraph" href="/designs">
                design page
              </Link>{' '}
              downloads a graphics-benchmark file from <Span fontStyle="italic">unpkg.com</Span>, a
              public CDN for open-source packages. The rendering library uses it to judge how much
              detail your graphics hardware can handle. It's a plain file download — nothing about
              you or your session is sent along — but unpkg does see your IP address and user-agent
              when it happens.
            </Text>
            <Text>
              When the newsletter or contact form ship, the providers handling them will be listed
              here. We will not add any third party that requires cookies or runs tracking scripts
              in your browser.
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

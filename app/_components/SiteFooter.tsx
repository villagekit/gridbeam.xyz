// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/footer.tsx
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-brand/src/components/Footer.tsx
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-brand/src/components/Social.tsx
'use client'

import {
  Container,
  Footer,
  type FooterSections,
  HStack,
  Icon,
  type IconProps,
  Link,
  type LinkProps,
  type StackProps,
  Text,
  VStack,
} from '@villagekit/ui'
import NextLink from 'next/link'
import type React from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaInstagram,
  FaMastodon,
  FaUsers,
  FaYoutube,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const footerSections: FooterSections = [
  {
    heading: 'Explore',
    links: [
      { href: '/designs', label: 'Designs' },
      { href: '/stories', label: 'Stories' },
      { href: '/tools-and-resources', label: 'Tools and resources' },
      { href: '/suppliers', label: 'Suppliers' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/subscribe', label: 'Newsletter' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/legal/privacy-policy', label: 'Privacy policy' },
      { href: '/legal', label: 'Site licence' },
    ],
  },
]

const socialLinks: Array<SocialLinkDescriptor> = [
  {
    Icon: FaEnvelope,
    href: '/subscribe',
    isExternal: false,
    label: 'Newsletter',
  },
  {
    Icon: FaMastodon,
    href: 'https://sunrise.social/@villagekit',
    isExternal: true,
    label: 'Mastodon',
  },
  {
    Icon: FaInstagram,
    href: 'https://instagram.com/village_kit',
    isExternal: true,
    label: 'Instagram',
  },
  {
    Icon: FaXTwitter,
    href: 'https://x.com/villagekit',
    isExternal: true,
    label: 'X / Twitter',
  },
  {
    Icon: FaFacebook,
    href: 'https://facebook.com/villagekit',
    isExternal: true,
    label: 'Facebook',
  },
  {
    Icon: FaYoutube,
    href: 'https://www.youtube.com/@villagekit',
    isExternal: true,
    label: 'YouTube',
  },
  {
    Icon: FaGithub,
    href: 'https://github.com/villagekit',
    isExternal: true,
    label: 'GitHub',
  },
  {
    Icon: FaUsers,
    href: 'https://discuss.villagekit.com',
    isExternal: true,
    label: 'Community forum',
  },
]

export function SiteFooter() {
  return (
    <Footer sections={footerSections}>
      <Container>
        <Social socialLinks={socialLinks} width="full" iconMaxWidth={8} />
      </Container>

      <FooterSlogan />
    </Footer>
  )
}

interface SocialLinkDescriptor {
  href: string
  isExternal: boolean
  label: string
  Icon: React.ComponentType
}

interface SocialProps {
  socialLinks: Array<SocialLinkDescriptor>
  width?: StackProps['width']
  iconBoxSize?: IconProps['boxSize']
  iconMaxWidth?: IconProps['maxWidth']
}

function Social(props: SocialProps) {
  const { socialLinks, width, iconBoxSize, iconMaxWidth } = props

  return (
    <HStack
      as="section"
      gap="4"
      width={width}
      justifyContent="flex-end"
      alignItems="baseline"
      aria-label="Village Kit on social media"
    >
      {socialLinks.map((socialLink) => (
        <SocialLink
          key={socialLink.href}
          {...socialLink}
          iconBoxSize={iconBoxSize}
          iconMaxWidth={iconMaxWidth}
        />
      ))}
    </HStack>
  )
}

interface SocialLinkProps extends SocialLinkDescriptor {
  iconBoxSize?: IconProps['boxSize']
  iconMaxWidth?: IconProps['maxWidth']
}

function SocialLink(props: SocialLinkProps) {
  const { label, href, Icon: SocialIcon, isExternal, iconBoxSize = 'auto', iconMaxWidth } = props

  const flexGrow = iconBoxSize === 'auto' ? 1 : undefined
  // Chakra v3's Icon writes aria-hidden="true" on every icon; undefined removes the attribute
  // so the icon carries the link's name, as legacy's Chakra v2 Icon did.
  const icon = (
    <Icon
      as={SocialIcon}
      aria-label={label}
      aria-hidden={undefined}
      boxSize={iconBoxSize}
      flexGrow={flexGrow}
      maxWidth={iconMaxWidth}
    />
  )
  const linkProps: LinkProps = {
    variant: 'tertiary',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexGrow,
  }

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
        {icon}
      </Link>
    )
  }

  return (
    <Link as={NextLink} href={href} {...linkProps}>
      {icon}
    </Link>
  )
}

function FooterSlogan() {
  return (
    <VStack as="section" aria-label="Site credit">
      <Text variant="tertiary" fontSize="sm">
        Created with{' '}
        {/* Chakra v3's icon recipe adds verticalAlign middle, which v2's Icon did not set;
            baseline keeps the heart where legacy's line puts it. */}
        <Icon aria-hidden={undefined} color="primary.400" verticalAlign="baseline">
          <FaHeart title="love" />
        </Icon>{' '}
        by{' '}
        <Link href="https://villagekit.com" target="_blank" rel="noopener noreferrer">
          Village Kit
        </Link>
      </Text>

      <Text variant="tertiary" fontSize="xs">
        © {new Date().getFullYear()}
      </Text>
    </VStack>
  )
}

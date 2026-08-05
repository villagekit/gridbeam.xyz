'use client'

import { Container, Footer, HStack, Icon, Link, Text, VStack } from '@villagekit/ui'
import NextLink from 'next/link'
import type { ReactNode } from 'react'
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

import { footerSections } from '../_lib/nav'

interface SocialLinkDescriptor {
  href: string
  label: string
  icon: ReactNode
  isExternal?: boolean
}

const socialLinks: ReadonlyArray<SocialLinkDescriptor> = [
  { href: '/contact', label: 'Email', icon: <FaEnvelope /> },
  {
    href: 'https://sunrise.social/@villagekit',
    label: 'Mastodon',
    icon: <FaMastodon />,
    isExternal: true,
  },
  {
    href: 'https://instagram.com/village_kit',
    label: 'Instagram',
    icon: <FaInstagram />,
    isExternal: true,
  },
  {
    href: 'https://x.com/villagekit',
    label: 'X / Twitter',
    icon: <FaXTwitter />,
    isExternal: true,
  },
  {
    href: 'https://facebook.com/villagekit',
    label: 'Facebook',
    icon: <FaFacebook />,
    isExternal: true,
  },
  {
    href: 'https://www.youtube.com/@villagekit',
    label: 'YouTube',
    icon: <FaYoutube />,
    isExternal: true,
  },
  {
    href: 'https://github.com/villagekit',
    label: 'GitHub',
    icon: <FaGithub />,
    isExternal: true,
  },
  {
    href: 'https://discuss.villagekit.com',
    label: 'Community forum',
    // Note(cc): added vs legacy footer — discuss.villagekit.com is the project's
    // forum; FaUsers chosen for the community-of-people semantic.
    icon: <FaUsers />,
    isExternal: true,
  },
]

export function SiteFooter() {
  return (
    <Footer sections={footerSections}>
      <Container>
        <HStack
          as="nav"
          gap={{ base: 4, md: 5 }}
          justifyContent="center"
          flexWrap="wrap"
          aria-label="Village Kit on social media"
        >
          {socialLinks.map((link) => (
            <SocialIconLink key={link.href} {...link} />
          ))}
        </HStack>
      </Container>

      <VStack as="section" gap="1" textAlign="center" aria-label="Site credit">
        <Text fontSize="sm" color="gray.700">
          Created with{' '}
          <Icon display="inline-block" verticalAlign="-0.125em" boxSize="3.5" color="primary.500">
            <FaHeart title="love" />
          </Icon>{' '}
          by{' '}
          <Link
            href="https://villagekit.com"
            variant="paragraph"
            target="_blank"
            rel="noopener noreferrer"
          >
            Village Kit
          </Link>
        </Text>
        <Text fontSize="xs" color="gray.700">
          © {new Date().getFullYear()}
        </Text>
      </VStack>
    </Footer>
  )
}

function SocialIconLink(props: SocialLinkDescriptor) {
  const { href, label, icon, isExternal } = props

  return (
    <Link
      as={isExternal ? undefined : NextLink}
      href={href}
      variant="tertiary"
      aria-label={label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <Icon boxSize="7">{icon}</Icon>
    </Link>
  )
}

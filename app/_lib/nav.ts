import type { FooterSections, NavItemDescriptors } from '@villagekit/ui'

export const navItems: NavItemDescriptors = [
  { href: '/designs', label: 'Designs', location: 'top' },
  { href: '/tools-and-resources', label: 'Tools', location: 'top' },
  { href: '/about', label: 'About', location: 'top' },
  { href: '/stories', label: 'Stories', location: 'top' },
]

export const footerSections: FooterSections = [
  {
    heading: 'Learn',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
      { href: '/tools-and-resources', label: 'Tools and resources' },
    ],
  },
  {
    heading: 'Browse',
    links: [
      { href: '/designs', label: 'Designs' },
      { href: '/stories', label: 'Stories' },
      { href: '/suppliers', label: 'Suppliers' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/subscribe', label: 'Newsletter' },
      {
        href: 'https://github.com/villagekit',
        label: 'GitHub',
        isExternal: true,
      },
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

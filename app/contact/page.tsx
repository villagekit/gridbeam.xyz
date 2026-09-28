// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-contact/src/pages/contact.tsx
import { CardsLayout, LinkCard } from '@villagekit/ui'
import type { Metadata } from 'next'
import { FaEnvelope } from 'react-icons/fa'

const contactEmail = 'hello+gridbeam@mikey.nz'

export const metadata: Metadata = {
  title: 'Contact us',
}

export default function ContactPage() {
  return (
    <CardsLayout title="Contact us">
      <LinkCard
        title="Email us"
        icon={<FaEnvelope />}
        description="Send us a message and we will get back to you as soon as we can."
        href={`mailto:${contactEmail}`}
      />
    </CardsLayout>
  )
}

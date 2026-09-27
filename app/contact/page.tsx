import { Heading, Icon, Section, Text, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'
import { FaEnvelope } from 'react-icons/fa'

import { ObfuscatedEmail } from '../_components/ObfuscatedEmail'

const title = 'Contact us'

export const metadata: Metadata = {
  title,
}

export default function ContactPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title>Contact us</Title>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
        <VStack alignItems="stretch" gap="6" maxW="3xl" mx="auto" w="full">
          <VStack alignItems="center" gap="4" p="8" bg="white" borderRadius="xl" boxShadow="sm">
            <Icon w="8" h="8" color="primary.600">
              <FaEnvelope />
            </Icon>
            <Heading as="h3" size="md">
              Email us
            </Heading>
            <Text variant="secondary" textAlign="center">
              Send us a message and we will get back to you as soon as we can.
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
        </VStack>
      </Section>
    </>
  )
}

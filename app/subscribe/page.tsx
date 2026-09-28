import { Container, Section, Text, Title } from '@villagekit/ui'
import type { Metadata } from 'next'

const title = 'Subscribe'

export const metadata: Metadata = {
  title,
}

export default function SubscribePage() {
  return (
    <Section index={0} maxW="6xl">
      <Title>Subscribe to Grid Beam</Title>
      <Container maxW="3xl">
        <Text textAlign="center">
          Subscribe to stay tuned for news and updates, we have a journey ahead!{' '}
          <span role="img" aria-label="seedling">
            🌱
          </span>
        </Text>
      </Container>
    </Section>
  )
}

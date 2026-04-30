import { Container, Main, Section, SkipNavContent, Text, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { CuttingPlanner } from './CuttingPlanner'

const title = 'Cutting planner'
const description =
  'Plan how to cut a list of grid beams from your stock with the least off-cut waste. First-fit-decreasing bin packing.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/tools/cutting-planner',
  },
  twitter: { title, description },
}

export default function CuttingPlannerPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="Tell it the cuts you need; it tells you how many beams to buy and how to cut them.">
          Cutting planner
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="4">
            <Text fontSize="lg">
              List the beams you want and any beams you already have, then click{' '}
              <Text as="span" fontWeight="bold">
                Plan it
              </Text>
              . The planner sorts your cuts longest-first and packs them into the available stock,
              topping up with full-length beams where needed.
            </Text>
            <Text variant="secondary">
              Lengths are in <em>grid units</em> (1 gu = 40 mm) by default. Toggle to mm if you
              prefer. Share the planned cut by copying the URL — your inputs encode into the query
              string when you press Plan it.
            </Text>
          </VStack>
        </Container>
      </Section>

      <Suspense fallback={null}>
        <CuttingPlanner />
      </Suspense>
    </Main>
  )
}

// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-subscribe/src/page.tsx
'use client'

import { Container, Text, Title, VStack } from '@villagekit/ui'
import { useCallback, useState } from 'react'

import { SubscribeForm } from './SubscribeForm'
import { SubscriptionTag } from './types'

// Legacy's `createSubscribePage` options, for the one site this repo is.
const websiteName = 'Grid Beam'
const subscribeApiPath = '/api/subscribe'
const subscriptionTag = SubscriptionTag.gridbeam

/** The subscribe page's body: the title and sentence over the form, or the thanks once subscribed. */
export default function SubscribePage() {
  const [hasSubscribed, setSubscribed] = useState<boolean>(false)

  const handleFormSuccess = useCallback(() => {
    setSubscribed(true)
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Title>{hasSubscribed ? 'Thanks for subscribing!' : `Subscribe to ${websiteName}`}</Title>

      <Container maxW="breakpoint-md">
        <VStack gap={[8, null, 12]}>
          {hasSubscribed ? (
            <Text textAlign="center">
              We&apos;ve just sent an email with a link to confirm your subscription. You&apos;ll
              need to click the link to start receiving updates.{' '}
              <span role="img" aria-label="sunflower">
                🌻
              </span>
            </Text>
          ) : (
            <>
              <Text textAlign="center">
                Subscribe to stay tuned for news and updates, we have a journey ahead!{' '}
                <span role="img" aria-label="seedling">
                  🌱
                </span>
              </Text>

              <SubscribeForm
                subscribeApiPath={subscribeApiPath}
                subscriptionTag={subscriptionTag}
                onSuccess={handleFormSuccess}
                websiteName={websiteName}
              />
            </>
          )}
        </VStack>
      </Container>
    </>
  )
}

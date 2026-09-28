// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-subscribe/src/component.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Field, FormLabel, Input, Textarea, VStack } from '@villagekit/ui'
import ky, { HTTPError } from 'ky'
import { upperFirst } from 'lodash-es'
import { useCallback } from 'react'
import { type FieldError, type SubmitHandler, useForm } from 'react-hook-form'

import { toaster } from '@/app/_components/Toaster'

import { subscriptionFormSchema } from './schema'
import {
  type SubscriptionFormData,
  type SubscriptionFormInput,
  type SubscriptionRequestData,
  type SubscriptionTag,
  isSubscriptionResponseError,
} from './types'

/** Where the form posts, the tag it sends, what runs on success and the site name its label reads. */
export interface SubscribeFormProps {
  subscribeApiPath: string
  subscriptionTag: SubscriptionTag
  onSuccess: () => void
  websiteName: string
}

/**
 * The newsletter form: six fields validated by `subscriptionFormSchema`, posted to the API route
 * with the site's tag. A 400 puts each field error on its field and a toast carries the rest; any
 * other failure shows the error toast; success shows its toast and calls `onSuccess`.
 */
export function SubscribeForm(props: SubscribeFormProps) {
  const { subscribeApiPath, subscriptionTag, onSuccess, websiteName } = props

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SubscriptionFormInput, unknown, SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema),
  })

  const onSubmit: SubmitHandler<SubscriptionFormData> = useCallback(
    async (values: SubscriptionFormData) => {
      const requestData: SubscriptionRequestData = {
        ...values,
        subscriptionTag,
      }

      try {
        // The route answers 204 with no body; ky 2's `.json()` throws on an empty body where
        // legacy's ky 0.31 returned an empty string, so the response is not read.
        await ky.post(subscribeApiPath, {
          json: requestData,
        })
      } catch (err: unknown) {
        let toastMessage: string | undefined

        if (err instanceof HTTPError && err.response.status === 400) {
          // ky 2 reads the error body into `data` before it throws, so `err.response.json()`
          // would find the body consumed.
          const response: unknown = err.data

          if (isSubscriptionResponseError(response)) {
            Object.entries(response.fieldErrors).map(([name, errors]) => {
              setError(name as keyof SubscriptionFormData, {
                message: errors.join('; '),
              })
            })
            toastMessage = response.formErrors.join('; ')
          }
        }

        toaster.create({
          description: toastMessage || 'Uh oh, something went wrong!',
          duration: 10000,
          closable: true,
          type: 'error',
          title: 'Error!',
        })

        return
      }

      toaster.create({
        duration: 10000,
        closable: true,
        type: 'success',
        title: 'Subscription successful!',
      })
      onSuccess()
    },
    [subscribeApiPath, subscriptionTag, setError, onSuccess],
  )

  function getErrorMessage(name: keyof SubscriptionFormData): string | undefined {
    const error = errors[name] as FieldError

    if (error != null) {
      return upperFirst(error.message)
    }

    return undefined
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      {/* Chakra v2's `container.sm`, 640px; v3's `breakpoint-sm` is the 480px breakpoint. */}
      <Container maxW="640px">
        <VStack gap="8" width="100%">
          <VStack gap="4" width="100%">
            <Field.Root invalid={!!errors.name} required>
              <FormLabel htmlFor="name">
                Preferred name <Field.RequiredIndicator />
              </FormLabel>
              <Input id="name" placeholder="Charlie Doe" {...register('name')} />
              <Field.ErrorText>{getErrorMessage('name')}</Field.ErrorText>
              <Field.HelperText>What should we call you?</Field.HelperText>
            </Field.Root>

            <Field.Root invalid={!!errors.email} required>
              <FormLabel htmlFor="email">
                Email <Field.RequiredIndicator />
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="charlie@example.com"
                {...register('email')}
              />
              <Field.ErrorText>{getErrorMessage('email')}</Field.ErrorText>
              <Field.HelperText>How do we get in contact with you?</Field.HelperText>
            </Field.Root>

            <Field.Root invalid={!!errors.location}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                placeholder="Wellington, New Zealand"
                {...register('location')}
              />
              <Field.ErrorText>{getErrorMessage('location')}</Field.ErrorText>
              <Field.HelperText>Where are you?</Field.HelperText>
            </Field.Root>

            <Field.Root invalid={!!errors.referral}>
              <FormLabel htmlFor="referral">How did you find out about us?</FormLabel>
              <Textarea id="referral" {...register('referral')} />
              <Field.ErrorText>{getErrorMessage('referral')}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.whyInterested}>
              <FormLabel htmlFor="whyInterested">
                Why are you interested in {websiteName}?
              </FormLabel>
              <Textarea id="whyInterested" {...register('whyInterested')} />
              <Field.ErrorText>{getErrorMessage('whyInterested')}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.feedback}>
              <FormLabel htmlFor="feedback">Do you have any questions or comments?</FormLabel>
              <Textarea id="feedback" {...register('feedback')} />
              <Field.ErrorText>{getErrorMessage('feedback')}</Field.ErrorText>
              <Field.HelperText>What&apos;s something we need to hear?</Field.HelperText>
            </Field.Root>
          </VStack>

          <Button size="lg" variant="primary" loading={isSubmitting} type="submit" marginTop="4">
            Subscribe!
          </Button>
        </VStack>
      </Container>
    </form>
  )
}

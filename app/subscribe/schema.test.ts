import { describe, expect, test } from 'vitest'

import { SubscriptionTag, subscriptionFormSchema, subscriptionRequestSchema } from './schema'

const validForm = {
  email: 'charlie@example.com',
  name: 'Charlie',
  location: 'Wellington',
  referral: '',
  whyInterested: '',
  feedback: '',
}

describe('subscriptionFormSchema', () => {
  test('an email with spaces around it is trimmed and accepted', () => {
    const result = subscriptionFormSchema.safeParse({
      ...validForm,
      email: '  charlie@example.com ',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('charlie@example.com')
    }
  })

  test("a malformed email fails on email with zod's message", () => {
    const result = subscriptionFormSchema.safeParse({ ...validForm, email: 'a@b' })

    expect(result.success).toBe(false)
    if (!result.success) {
      const { fieldErrors, formErrors } = result.error.flatten()
      expect(fieldErrors).toEqual({ email: ['Invalid email'] })
      expect(formErrors).toEqual([])
    }
  })

  test('a missing location defaults to the empty string', () => {
    const { location: _location, ...withoutLocation } = validForm
    const result = subscriptionFormSchema.safeParse(withoutLocation)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.location).toBe('')
    }
  })
})

describe('subscriptionRequestSchema', () => {
  test('a request body with an unknown subscriptionTag fails on that field', () => {
    const result = subscriptionRequestSchema.safeParse({
      ...validForm,
      subscriptionTag: 'Grid Cat',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(Object.keys(result.error.flatten().fieldErrors)).toEqual(['subscriptionTag'])
    }
  })

  test('the Grid Beam tag is accepted as the enum member', () => {
    const result = subscriptionRequestSchema.safeParse({
      ...validForm,
      subscriptionTag: SubscriptionTag.gridbeam,
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.subscriptionTag).toBe('Grid Beam')
    }
  })

  test('the flattened errors of a body with a bad email and no name name both fields', () => {
    const { name: _name, ...withoutName } = validForm
    const result = subscriptionRequestSchema.safeParse({
      ...withoutName,
      email: 'nobody',
      subscriptionTag: SubscriptionTag.gridbeam,
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      const { fieldErrors } = result.error.flatten()
      expect(Object.keys(fieldErrors).sort()).toEqual(['email', 'name'])
    }
  })
})

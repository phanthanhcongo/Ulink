import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Newsletter subscription schema
const newsletterSchema = z.object({
  email: z.string().email('invalid_email'),
  name: z.string().optional(),
  locale: z.string().optional().default('en'),
  preferences: z.object({
    marketing: z.boolean().optional().default(true),
    updates: z.boolean().optional().default(true),
    promotions: z.boolean().optional().default(false)
  }).optional()
});

test('newsletter - validates email', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com'
  });

  assert.equal(result.success, true);
});

test('newsletter - rejects invalid email', () => {
  const result = newsletterSchema.safeParse({
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('newsletter - accepts optional name', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com',
    name: 'John Subscriber'
  });

  assert.equal(result.success, true);
});

test('newsletter - defaults locale to en', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.locale, 'en');
  }
});

test('newsletter - accepts locale preference', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com',
    locale: 'vi'
  });

  assert.equal(result.success, true);
});

test('newsletter - accepts subscription preferences', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com',
    preferences: {
      marketing: true,
      updates: true,
      promotions: true
    }
  });

  assert.equal(result.success, true);
});

test('newsletter - defaults marketing preference to true', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com',
    preferences: {}
  });

  assert.equal(result.success, true);
  if (result.success && result.data.preferences) {
    assert.equal(result.data.preferences.marketing, true);
  }
});

test('newsletter - defaults promotions to false', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com',
    preferences: {}
  });

  assert.equal(result.success, true);
  if (result.success && result.data.preferences) {
    assert.equal(result.data.preferences.promotions, false);
  }
});

test('newsletter - allows opting out of all', () => {
  const result = newsletterSchema.safeParse({
    email: 'subscriber@example.com',
    preferences: {
      marketing: false,
      updates: false,
      promotions: false
    }
  });

  assert.equal(result.success, true);
});

test('newsletter - response structure', () => {
  const responseSchema = z.object({
    success: z.literal(true),
    data: z.object({
      subscription_id: z.string().optional(),
      email: z.string(),
      status: z.enum(['pending', 'confirmed', 'subscribed']).optional()
    })
  });

  const validResponse = {
    success: true,
    data: {
      subscription_id: 'sub-123',
      email: 'subscriber@example.com',
      status: 'subscribed'
    }
  };

  const result = responseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

test('newsletter - handles duplicate subscription', () => {
  const errorSchema = z.object({
    success: z.literal(false),
    error: z.object({
      code: z.string(),
      message: z.string()
    })
  });

  const errorResponse = {
    success: false,
    error: {
      code: 'already_subscribed',
      message: 'Email is already subscribed'
    }
  };

  const result = errorSchema.safeParse(errorResponse);
  assert.equal(result.success, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Subscription validation schema
const subscriptionSchema = z.object({
  email: z.string().email('invalid_email'),
  plan_type: z.enum(['free', 'basic', 'pro', 'enterprise']),
  billing_cycle: z.enum(['monthly', 'yearly']).optional().default('monthly'),
  currency: z.string().length(3).optional().default('USD'),
  auto_renew: z.boolean().optional().default(true),
  accept_terms: z.boolean().refine(val => val === true, 'terms_must_be_accepted')
});

test('subscription - validates required fields', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    accept_terms: true
  });

  assert.equal(result.success, true);
});

test('subscription - requires valid email', () => {
  const result = subscriptionSchema.safeParse({
    email: 'invalid-email',
    plan_type: 'pro',
    accept_terms: true
  });

  assert.equal(result.success, false);
});

test('subscription - requires plan type', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    accept_terms: true
  });

  assert.equal(result.success, false);
});

test('subscription - accepts all plan types', () => {
  const plans = ['free', 'basic', 'pro', 'enterprise'];

  for (const plan of plans) {
    const result = subscriptionSchema.safeParse({
      email: 'user@example.com',
      plan_type: plan,
      accept_terms: true
    });

    assert.equal(result.success, true);
  }
});

test('subscription - requires terms acceptance', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    accept_terms: false
  });

  assert.equal(result.success, false);
});

test('subscription - defaults billing cycle to monthly', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    accept_terms: true
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.billing_cycle, 'monthly');
  }
});

test('subscription - accepts yearly billing', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    billing_cycle: 'yearly',
    accept_terms: true
  });

  assert.equal(result.success, true);
});

test('subscription - defaults currency to USD', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    accept_terms: true
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.currency, 'USD');
  }
});

test('subscription - accepts different currencies', () => {
  for (const currency of ['USD', 'EUR', 'VND']) {
    const result = subscriptionSchema.safeParse({
      email: 'user@example.com',
      plan_type: 'pro',
      currency,
      accept_terms: true
    });

    assert.equal(result.success, true);
  }
});

test('subscription - defaults auto renew to true', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    accept_terms: true
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.auto_renew, true);
  }
});

test('subscription - accepts auto renew false', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'pro',
    auto_renew: false,
    accept_terms: true
  });

  assert.equal(result.success, true);
});

test('subscription - full yearly enterprise', () => {
  const result = subscriptionSchema.safeParse({
    email: 'enterprise@company.com',
    plan_type: 'enterprise',
    billing_cycle: 'yearly',
    currency: 'USD',
    auto_renew: true,
    accept_terms: true
  });

  assert.equal(result.success, true);
});

test('subscription - free plan with monthly billing', () => {
  const result = subscriptionSchema.safeParse({
    email: 'user@example.com',
    plan_type: 'free',
    billing_cycle: 'monthly',
    accept_terms: true
  });

  assert.equal(result.success, true);
});

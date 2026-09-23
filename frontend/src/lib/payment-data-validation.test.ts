import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Payment/Transaction schema
const paymentSchema = z.object({
  id: z.string().or(z.number()),
  order_id: z.string().or(z.number()),
  customer_id: z.string().or(z.number()).optional(),
  amount: z.number().positive('amount_must_be_positive'),
  currency: z.string().length(3).default('USD'),
  method: z.enum(['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'vnpay']),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'refunded']).default('pending'),
  transaction_id: z.string().optional(),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('payment - validates required fields', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card'
  });

  assert.equal(result.success, true);
});

test('payment - requires positive amount', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 0,
    method: 'credit_card'
  });

  assert.equal(result.success, false);
});

test('payment - requires valid payment method', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'bitcoin'
  });

  assert.equal(result.success, false);
});

test('payment - accepts all payment methods', () => {
  const methods = ['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'vnpay'];

  for (const method of methods) {
    const result = paymentSchema.safeParse({
      id: 'pay-001',
      order_id: 'ord-001',
      amount: 99.99,
      method
    });

    assert.equal(result.success, true);
  }
});

test('payment - defaults status to pending', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('payment - accepts all status values', () => {
  const statuses = ['pending', 'processing', 'completed', 'failed', 'refunded'];

  for (const status of statuses) {
    const result = paymentSchema.safeParse({
      id: 'pay-001',
      order_id: 'ord-001',
      amount: 99.99,
      method: 'credit_card',
      status
    });

    assert.equal(result.success, true);
  }
});

test('payment - defaults currency to USD', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.currency, 'USD');
  }
});

test('payment - accepts different currencies', () => {
  for (const currency of ['USD', 'EUR', 'GBP', 'VND', 'JPY']) {
    const result = paymentSchema.safeParse({
      id: 'pay-001',
      order_id: 'ord-001',
      amount: 99.99,
      method: 'credit_card',
      currency
    });

    assert.equal(result.success, true);
  }
});

test('payment - currency must be 3 characters', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card',
    currency: 'US'
  });

  assert.equal(result.success, false);
});

test('payment - accepts customer ID', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    customer_id: 'cust-123',
    amount: 99.99,
    method: 'credit_card'
  });

  assert.equal(result.success, true);
});

test('payment - accepts transaction ID', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card',
    transaction_id: 'txn-abc123'
  });

  assert.equal(result.success, true);
});

test('payment - accepts reference number', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card',
    reference_number: 'REF-2024-001'
  });

  assert.equal(result.success, true);
});

test('payment - accepts notes', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 99.99,
    method: 'credit_card',
    notes: 'Payment received with tracking ID'
  });

  assert.equal(result.success, true);
});

test('payment - numeric or string IDs', () => {
  const result1 = paymentSchema.safeParse({
    id: 123,
    order_id: 456,
    amount: 99.99,
    method: 'credit_card'
  });

  const result2 = paymentSchema.safeParse({
    id: 'pay-123',
    order_id: 'ord-456',
    amount: 99.99,
    method: 'credit_card'
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

test('payment - large amount', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 1000000.00,
    method: 'bank_transfer'
  });

  assert.equal(result.success, true);
});

test('payment - decimal amounts', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    amount: 0.01,
    method: 'credit_card'
  });

  assert.equal(result.success, true);
});

test('payment - full completed payment', () => {
  const result = paymentSchema.safeParse({
    id: 'pay-001',
    order_id: 'ord-001',
    customer_id: 'cust-123',
    amount: 1500.50,
    currency: 'VND',
    method: 'vnpay',
    status: 'completed',
    transaction_id: 'vnpay-txn-12345',
    reference_number: 'REF-2024-001',
    notes: 'Payment processed successfully'
  });

  assert.equal(result.success, true);
});

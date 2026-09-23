import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Webhook subscription schema
const webhookSchema = z.object({
  id: z.string().or(z.number()),
  url: z.string().url('invalid_url'),
  events: z.array(z.enum(['order.created', 'order.updated', 'order.completed', 'payment.received', 'product.created', 'product.updated', 'customer.created'])).min(1, 'at_least_one_event'),
  active: z.boolean().optional().default(true),
  secret: z.string().optional(),
  retry_policy: z.object({
    max_retries: z.number().int().positive().optional().default(3),
    retry_delay: z.number().int().positive().optional().default(300)
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Webhook event schema
const webhookEventSchema = z.object({
  id: z.string().or(z.number()),
  webhook_id: z.string().or(z.number()),
  event_type: z.string(),
  payload: z.record(z.any()),
  status: z.enum(['pending', 'delivered', 'failed', 'skipped']).default('pending'),
  attempts: z.number().int().nonnegative().optional().default(0),
  last_error: z.string().optional(),
  delivered_at: z.string().datetime('invalid_date').optional(),
  created_at: z.string().optional()
});

test('webhook - validates required fields', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks/orders',
    events: ['order.created', 'order.updated']
  });

  assert.equal(result.success, true);
});

test('webhook - requires valid URL', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'invalid-url',
    events: ['order.created']
  });

  assert.equal(result.success, false);
});

test('webhook - requires at least one event', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks',
    events: []
  });

  assert.equal(result.success, false);
});

test('webhook - accepts all event types', () => {
  const events = ['order.created', 'order.updated', 'order.completed', 'payment.received', 'product.created', 'product.updated', 'customer.created'];

  for (const event of events) {
    const result = webhookSchema.safeParse({
      id: 'webhook-001',
      url: 'https://example.com/webhooks',
      events: [event]
    });

    assert.equal(result.success, true);
  }
});

test('webhook - defaults active to true', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks',
    events: ['order.created']
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.active, true);
  }
});

test('webhook - accepts inactive webhook', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks',
    events: ['order.created'],
    active: false
  });

  assert.equal(result.success, true);
});

test('webhook - accepts secret', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks',
    events: ['order.created'],
    secret: 'webhook_secret_key_12345'
  });

  assert.equal(result.success, true);
});

test('webhook - accepts retry policy', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks',
    events: ['order.created'],
    retry_policy: {
      max_retries: 5,
      retry_delay: 600
    }
  });

  assert.equal(result.success, true);
});

test('webhook - event validation', () => {
  const result = webhookEventSchema.safeParse({
    id: 'event-001',
    webhook_id: 'webhook-001',
    event_type: 'order.created',
    payload: { order_id: 'ord-001', amount: 1000 }
  });

  assert.equal(result.success, true);
});

test('webhook - event defaults status to pending', () => {
  const result = webhookEventSchema.safeParse({
    id: 'event-001',
    webhook_id: 'webhook-001',
    event_type: 'order.created',
    payload: { order_id: 'ord-001' }
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('webhook - event with delivery', () => {
  const result = webhookEventSchema.safeParse({
    id: 'event-001',
    webhook_id: 'webhook-001',
    event_type: 'order.created',
    payload: { order_id: 'ord-001', status: 'pending' },
    status: 'delivered',
    attempts: 1,
    delivered_at: '2024-06-01T10:05:00Z'
  });

  assert.equal(result.success, true);
});

test('webhook - event with failures', () => {
  const result = webhookEventSchema.safeParse({
    id: 'event-001',
    webhook_id: 'webhook-001',
    event_type: 'order.updated',
    payload: { order_id: 'ord-001' },
    status: 'failed',
    attempts: 3,
    last_error: 'Connection timeout'
  });

  assert.equal(result.success, true);
});

test('webhook - multiple events subscription', () => {
  const result = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks/events',
    events: [
      'order.created',
      'order.updated',
      'order.completed',
      'payment.received',
      'product.created'
    ],
    active: true,
    secret: 'secure_key',
    retry_policy: {
      max_retries: 5,
      retry_delay: 300
    }
  });

  assert.equal(result.success, true);
});

test('webhook - numeric and string IDs', () => {
  const result1 = webhookSchema.safeParse({
    id: 123,
    url: 'https://example.com/webhooks',
    events: ['order.created']
  });

  const result2 = webhookSchema.safeParse({
    id: 'webhook-001',
    url: 'https://example.com/webhooks',
    events: ['order.created']
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

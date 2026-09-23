import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Queue job schema
const queueJobSchema = z.object({
  id: z.string().or(z.number()),
  queue_name: z.string().min(1),
  payload: z.record(z.any()),
  priority: z.number().int().min(-10).max(10).optional().default(0),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'retry']).default('pending'),
  retries: z.number().int().nonnegative().optional().default(0),
  max_retries: z.number().int().positive().optional().default(3),
  created_at: z.string().datetime('invalid_date'),
  started_at: z.string().datetime('invalid_date').optional(),
  completed_at: z.string().datetime('invalid_date').optional(),
  error: z.string().optional()
});

// Rate limit schema
const rateLimitSchema = z.object({
  window_size: z.number().int().positive(),
  max_requests: z.number().int().positive(),
  current_requests: z.number().int().nonnegative(),
  reset_at: z.string().datetime('invalid_date'),
  remaining: z.number().int().nonnegative()
});

// Retry policy schema
const retryPolicySchema = z.object({
  max_attempts: z.number().int().min(1).max(10),
  initial_delay_ms: z.number().int().positive(),
  max_delay_ms: z.number().int().positive(),
  backoff_multiplier: z.number().positive(),
  jitter_enabled: z.boolean().optional().default(true),
  retryable_errors: z.array(z.string()).optional()
});

test('queue - job validation', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'emails',
    payload: { to: 'user@example.com', subject: 'Welcome' },
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('queue - requires queue name', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: '',
    payload: { data: 'test' },
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, false);
});

test('queue - priority range', () => {
  for (const priority of [-10, -5, 0, 5, 10]) {
    const result = queueJobSchema.safeParse({
      id: 'job-001',
      queue_name: 'tasks',
      payload: {},
      priority,
      created_at: '2024-06-01T10:00:00Z'
    });

    assert.equal(result.success, true);
  }
});

test('queue - priority out of range', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'tasks',
    payload: {},
    priority: 11,
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, false);
});

test('queue - defaults status to pending', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'tasks',
    payload: {},
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('queue - all status values', () => {
  for (const status of ['pending', 'processing', 'completed', 'failed', 'retry']) {
    const result = queueJobSchema.safeParse({
      id: 'job-001',
      queue_name: 'tasks',
      payload: {},
      status,
      created_at: '2024-06-01T10:00:00Z'
    });

    assert.equal(result.success, true);
  }
});

test('queue - defaults max retries to 3', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'tasks',
    payload: {},
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.max_retries, 3);
  }
});

test('queue - processing with start time', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'tasks',
    payload: { task: 'process' },
    status: 'processing',
    started_at: '2024-06-01T10:05:00Z',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('queue - completed with times', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'tasks',
    payload: {},
    status: 'completed',
    started_at: '2024-06-01T10:05:00Z',
    completed_at: '2024-06-01T10:15:00Z',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('queue - failed with error', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'tasks',
    payload: {},
    status: 'failed',
    error: 'Connection timeout',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('rate limit - validation', () => {
  const result = rateLimitSchema.safeParse({
    window_size: 60,
    max_requests: 100,
    current_requests: 45,
    reset_at: '2024-06-01T10:01:00Z',
    remaining: 55
  });

  assert.equal(result.success, true);
});

test('rate limit - at capacity', () => {
  const result = rateLimitSchema.safeParse({
    window_size: 60,
    max_requests: 100,
    current_requests: 100,
    reset_at: '2024-06-01T10:01:00Z',
    remaining: 0
  });

  assert.equal(result.success, true);
});

test('rate limit - different windows', () => {
  for (const window of [60, 300, 3600]) {
    const result = rateLimitSchema.safeParse({
      window_size: window,
      max_requests: 1000,
      current_requests: 500,
      reset_at: '2024-06-01T11:00:00Z',
      remaining: 500
    });

    assert.equal(result.success, true);
  }
});

test('retry policy - exponential backoff', () => {
  const result = retryPolicySchema.safeParse({
    max_attempts: 5,
    initial_delay_ms: 100,
    max_delay_ms: 10000,
    backoff_multiplier: 2.0,
    jitter_enabled: true
  });

  assert.equal(result.success, true);
});

test('retry policy - linear backoff', () => {
  const result = retryPolicySchema.safeParse({
    max_attempts: 3,
    initial_delay_ms: 1000,
    max_delay_ms: 5000,
    backoff_multiplier: 1.5,
    jitter_enabled: false
  });

  assert.equal(result.success, true);
});

test('retry policy - with retryable errors', () => {
  const result = retryPolicySchema.safeParse({
    max_attempts: 4,
    initial_delay_ms: 100,
    max_delay_ms: 5000,
    backoff_multiplier: 2.0,
    retryable_errors: ['TIMEOUT', 'NETWORK_ERROR', 'SERVICE_UNAVAILABLE']
  });

  assert.equal(result.success, true);
});

test('retry policy - min attempts', () => {
  const result = retryPolicySchema.safeParse({
    max_attempts: 1,
    initial_delay_ms: 100,
    max_delay_ms: 1000,
    backoff_multiplier: 1.0
  });

  assert.equal(result.success, true);
});

test('retry policy - max attempts limit', () => {
  const result = retryPolicySchema.safeParse({
    max_attempts: 11,
    initial_delay_ms: 100,
    max_delay_ms: 1000,
    backoff_multiplier: 1.0
  });

  assert.equal(result.success, false);
});

test('queue - full job with retries', () => {
  const result = queueJobSchema.safeParse({
    id: 'job-001',
    queue_name: 'critical-tasks',
    payload: { order_id: 'ord-001', action: 'process_payment' },
    priority: 5,
    status: 'retry',
    retries: 2,
    max_retries: 5,
    created_at: '2024-06-01T10:00:00Z',
    started_at: '2024-06-01T10:05:00Z',
    error: 'Payment gateway timeout'
  });

  assert.equal(result.success, true);
});

test('queue - bulk job processing', () => {
  const jobs = Array(100).fill(null).map((_, i) => ({
    id: `job-${String(i + 1).padStart(6, '0')}`,
    queue_name: 'bulk-processing',
    payload: { item_id: i + 1 },
    priority: Math.floor(Math.random() * 10) - 5,
    created_at: '2024-06-01T10:00:00Z'
  }));

  for (const job of jobs) {
    const result = queueJobSchema.safeParse(job);
    assert.equal(result.success, true);
  }
});

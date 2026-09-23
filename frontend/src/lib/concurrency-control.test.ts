import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Lock/Mutex schema
const lockSchema = z.object({
  id: z.string(),
  resource_id: z.string(),
  owner_id: z.string(),
  acquired_at: z.string().datetime('invalid_date'),
  expires_at: z.string().datetime('invalid_date'),
  lock_type: z.enum(['exclusive', 'shared', 'read', 'write']),
  timeout_ms: z.number().int().positive()
});

// Semaphore schema
const semaphoreSchema = z.object({
  name: z.string(),
  permits: z.number().int().positive(),
  available: z.number().int().nonnegative(),
  waiting_count: z.number().int().nonnegative().optional().default(0),
  created_at: z.string().datetime('invalid_date')
});

// Transaction schema
const transactionSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'active', 'committed', 'aborted', 'rolled_back']),
  isolation_level: z.enum(['read_uncommitted', 'read_committed', 'repeatable_read', 'serializable']),
  started_at: z.string().datetime('invalid_date'),
  modified_rows: z.array(z.object({
    table: z.string(),
    operation: z.enum(['insert', 'update', 'delete']),
    row_count: z.number().int().positive()
  })).optional(),
  conflicts: z.array(z.string()).optional()
});

// Concurrent request schema
const concurrentRequestSchema = z.object({
  batch_id: z.string(),
  request_count: z.number().int().positive(),
  parallel_degree: z.number().int().positive(),
  timeout_ms: z.number().int().positive(),
  fail_on_first_error: z.boolean().optional().default(false)
});

test('concurrency - exclusive lock', () => {
  const result = lockSchema.safeParse({
    id: 'lock-001',
    resource_id: 'res-001',
    owner_id: 'proc-001',
    acquired_at: '2024-06-01T10:00:00Z',
    expires_at: '2024-06-01T10:05:00Z',
    lock_type: 'exclusive',
    timeout_ms: 5000
  });

  assert.equal(result.success, true);
});

test('concurrency - shared lock', () => {
  const result = lockSchema.safeParse({
    id: 'lock-002',
    resource_id: 'res-002',
    owner_id: 'proc-002',
    acquired_at: '2024-06-01T10:00:00Z',
    expires_at: '2024-06-01T10:01:00Z',
    lock_type: 'shared',
    timeout_ms: 60000
  });

  assert.equal(result.success, true);
});

test('concurrency - read/write locks', () => {
  for (const lockType of ['read', 'write']) {
    const result = lockSchema.safeParse({
      id: `lock-${lockType}`,
      resource_id: 'res-001',
      owner_id: 'proc-001',
      acquired_at: '2024-06-01T10:00:00Z',
      expires_at: '2024-06-01T10:05:00Z',
      lock_type: lockType,
      timeout_ms: 10000
    });

    assert.equal(result.success, true);
  }
});

test('concurrency - semaphore creation', () => {
  const result = semaphoreSchema.safeParse({
    name: 'db-connection-pool',
    permits: 10,
    available: 10,
    waiting_count: 0,
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('concurrency - semaphore with waiters', () => {
  const result = semaphoreSchema.safeParse({
    name: 'shared-resource',
    permits: 5,
    available: 0,
    waiting_count: 3,
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('concurrency - transaction pending', () => {
  const result = transactionSchema.safeParse({
    id: 'txn-001',
    status: 'pending',
    isolation_level: 'read_committed',
    started_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('concurrency - transaction active', () => {
  const result = transactionSchema.safeParse({
    id: 'txn-002',
    status: 'active',
    isolation_level: 'serializable',
    started_at: '2024-06-01T10:00:00Z',
    modified_rows: [
      { table: 'orders', operation: 'insert', row_count: 1 },
      { table: 'order_items', operation: 'insert', row_count: 3 }
    ]
  });

  assert.equal(result.success, true);
});

test('concurrency - transaction committed', () => {
  const result = transactionSchema.safeParse({
    id: 'txn-003',
    status: 'committed',
    isolation_level: 'repeatable_read',
    started_at: '2024-06-01T10:00:00Z',
    modified_rows: [
      { table: 'products', operation: 'update', row_count: 5 }
    ]
  });

  assert.equal(result.success, true);
});

test('concurrency - transaction rolled back', () => {
  const result = transactionSchema.safeParse({
    id: 'txn-004',
    status: 'rolled_back',
    isolation_level: 'read_uncommitted',
    started_at: '2024-06-01T10:00:00Z',
    conflicts: ['txn-003', 'txn-005']
  });

  assert.equal(result.success, true);
});

test('concurrency - isolation levels', () => {
  for (const level of ['read_uncommitted', 'read_committed', 'repeatable_read', 'serializable']) {
    const result = transactionSchema.safeParse({
      id: 'txn-001',
      status: 'active',
      isolation_level: level,
      started_at: '2024-06-01T10:00:00Z'
    });

    assert.equal(result.success, true);
  }
});

test('concurrency - concurrent request batch', () => {
  const result = concurrentRequestSchema.safeParse({
    batch_id: 'batch-001',
    request_count: 100,
    parallel_degree: 10,
    timeout_ms: 30000
  });

  assert.equal(result.success, true);
});

test('concurrency - high concurrency', () => {
  const result = concurrentRequestSchema.safeParse({
    batch_id: 'batch-002',
    request_count: 10000,
    parallel_degree: 100,
    timeout_ms: 60000,
    fail_on_first_error: false
  });

  assert.equal(result.success, true);
});

test('concurrency - fail fast mode', () => {
  const result = concurrentRequestSchema.safeParse({
    batch_id: 'batch-003',
    request_count: 50,
    parallel_degree: 5,
    timeout_ms: 10000,
    fail_on_first_error: true
  });

  assert.equal(result.success, true);
});

test('concurrency - sequential execution', () => {
  const result = concurrentRequestSchema.safeParse({
    batch_id: 'batch-004',
    request_count: 20,
    parallel_degree: 1,
    timeout_ms: 5000
  });

  assert.equal(result.success, true);
});

test('concurrency - multiple locks on same resource', () => {
  const locks = Array(5).fill(null).map((_, i) => ({
    id: `lock-${i + 1}`,
    resource_id: 'shared-resource',
    owner_id: `process-${i + 1}`,
    acquired_at: `2024-06-01T10:0${i}:00Z`,
    expires_at: `2024-06-01T10:0${i}:30Z`,
    lock_type: i % 2 === 0 ? 'shared' : 'exclusive',
    timeout_ms: 30000
  }));

  for (const lock of locks) {
    const result = lockSchema.safeParse(lock);
    assert.equal(result.success, true);
  }
});

test('concurrency - semaphore pool exhaustion', () => {
  const result = semaphoreSchema.safeParse({
    name: 'api-rate-limit',
    permits: 1000,
    available: 0,
    waiting_count: 500,
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('concurrency - complex transaction', () => {
  const result = transactionSchema.safeParse({
    id: 'txn-complex-001',
    status: 'active',
    isolation_level: 'serializable',
    started_at: '2024-06-01T10:00:00Z',
    modified_rows: [
      { table: 'orders', operation: 'insert', row_count: 1 },
      { table: 'order_items', operation: 'insert', row_count: 5 },
      { table: 'inventory', operation: 'update', row_count: 5 },
      { table: 'sales_summary', operation: 'update', row_count: 1 }
    ],
    conflicts: []
  });

  assert.equal(result.success, true);
});

test('concurrency - large scale concurrent', () => {
  const result = concurrentRequestSchema.safeParse({
    batch_id: 'scale-test-001',
    request_count: 100000,
    parallel_degree: 500,
    timeout_ms: 120000
  });

  assert.equal(result.success, true);
});

test('concurrency - timeout validation', () => {
  const result = lockSchema.safeParse({
    id: 'lock-timeout',
    resource_id: 'critical-resource',
    owner_id: 'process-critical',
    acquired_at: '2024-06-01T10:00:00Z',
    expires_at: '2024-06-01T10:00:30Z',
    lock_type: 'exclusive',
    timeout_ms: 500
  });

  assert.equal(result.success, true);
});

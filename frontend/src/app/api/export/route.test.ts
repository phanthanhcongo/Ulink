import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Export request schema
const exportRequestSchema = z.object({
  export_type: z.enum(['products', 'orders', 'customers', 'invoices', 'reports']),
  format: z.enum(['csv', 'excel', 'pdf', 'json']),
  filters: z.object({
    date_from: z.string().datetime('invalid_date').optional(),
    date_to: z.string().datetime('invalid_date').optional(),
    status: z.string().optional(),
    category: z.string().optional()
  }).optional(),
  columns: z.array(z.string()).optional(),
  include_headers: z.boolean().optional().default(true),
  async_export: z.boolean().optional().default(false)
});

// Export job schema
const exportJobSchema = z.object({
  id: z.string().or(z.number()),
  job_id: z.string(),
  export_type: z.string(),
  format: z.string(),
  status: z.enum(['queued', 'processing', 'completed', 'failed']),
  file_size: z.number().nonnegative().optional(),
  download_url: z.string().optional(),
  expiration_time: z.number().int().positive().optional(),
  created_at: z.string().optional(),
  completed_at: z.string().optional()
});

test('export - validates export type', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'products',
    format: 'csv'
  });

  assert.equal(result.success, true);
});

test('export - accepts all export types', () => {
  for (const type of ['products', 'orders', 'customers', 'invoices', 'reports']) {
    const result = exportRequestSchema.safeParse({
      export_type: type,
      format: 'csv'
    });

    assert.equal(result.success, true);
  }
});

test('export - accepts all formats', () => {
  for (const format of ['csv', 'excel', 'pdf', 'json']) {
    const result = exportRequestSchema.safeParse({
      export_type: 'products',
      format
    });

    assert.equal(result.success, true);
  }
});

test('export - with date range filter', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'orders',
    format: 'csv',
    filters: {
      date_from: '2024-01-01T00:00:00Z',
      date_to: '2024-06-30T23:59:59Z'
    }
  });

  assert.equal(result.success, true);
});

test('export - with status filter', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'orders',
    format: 'csv',
    filters: {
      status: 'completed'
    }
  });

  assert.equal(result.success, true);
});

test('export - with custom columns', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'products',
    format: 'csv',
    columns: ['id', 'name', 'sku', 'price', 'stock']
  });

  assert.equal(result.success, true);
});

test('export - defaults include headers to true', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'products',
    format: 'csv'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.include_headers, true);
  }
});

test('export - accepts exclude headers', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'products',
    format: 'csv',
    include_headers: false
  });

  assert.equal(result.success, true);
});

test('export - defaults async export to false', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'products',
    format: 'csv'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.async_export, false);
  }
});

test('export - async export request', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'orders',
    format: 'excel',
    async_export: true
  });

  assert.equal(result.success, true);
});

test('export - job validation', () => {
  const result = exportJobSchema.safeParse({
    id: 'export-001',
    job_id: 'job-export-123456',
    export_type: 'products',
    format: 'csv',
    status: 'processing'
  });

  assert.equal(result.success, true);
});

test('export - completed job with download', () => {
  const result = exportJobSchema.safeParse({
    id: 'export-001',
    job_id: 'job-export-123456',
    export_type: 'orders',
    format: 'excel',
    status: 'completed',
    file_size: 2048576,
    download_url: 'https://api.example.com/exports/download/job-export-123456',
    expiration_time: 86400,
    created_at: '2024-06-01T10:00:00Z',
    completed_at: '2024-06-01T10:05:00Z'
  });

  assert.equal(result.success, true);
});

test('export - failed job', () => {
  const result = exportJobSchema.safeParse({
    id: 'export-001',
    job_id: 'job-export-123456',
    export_type: 'reports',
    format: 'pdf',
    status: 'failed'
  });

  assert.equal(result.success, true);
});

test('export - queued job', () => {
  const result = exportJobSchema.safeParse({
    id: 'export-001',
    job_id: 'job-export-123456',
    export_type: 'customers',
    format: 'csv',
    status: 'queued',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('export - large product export', () => {
  const result = exportRequestSchema.safeParse({
    export_type: 'products',
    format: 'excel',
    filters: {
      category: 'electronics'
    },
    columns: ['id', 'name', 'sku', 'price', 'stock', 'status', 'created_at'],
    include_headers: true,
    async_export: true
  });

  assert.equal(result.success, true);
});

test('export - numeric and string job IDs', () => {
  const result1 = exportJobSchema.safeParse({
    id: 123,
    job_id: 'job-123',
    export_type: 'products',
    format: 'csv',
    status: 'completed'
  });

  const result2 = exportJobSchema.safeParse({
    id: 'export-001',
    job_id: 'job-export-123456',
    export_type: 'products',
    format: 'csv',
    status: 'completed'
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

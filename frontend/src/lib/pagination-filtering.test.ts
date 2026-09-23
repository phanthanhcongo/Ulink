import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Pagination params schema
const paginationParamsSchema = z.object({
  limit: z.number().int().positive().min(1).max(1000).optional().default(20),
  offset: z.number().int().nonnegative().optional().default(0),
  page: z.number().int().positive().optional(),
  per_page: z.number().int().positive().optional()
});

// Pagination response schema
const paginationResponseSchema = z.object({
  data: z.array(z.record(z.any())).min(0),
  pagination: z.object({
    total: z.number().int().nonnegative(),
    limit: z.number().int().positive(),
    offset: z.number().int().nonnegative(),
    page: z.number().int().positive().optional(),
    total_pages: z.number().int().positive().optional(),
    has_more: z.boolean()
  })
});

// Filter params schema
const filterParamsSchema = z.object({
  status: z.string().optional(),
  category: z.string().optional(),
  date_from: z.string().datetime('invalid_date').optional(),
  date_to: z.string().datetime('invalid_date').optional(),
  price_min: z.number().nonnegative().optional(),
  price_max: z.number().positive().optional(),
  rating_min: z.number().min(0).max(5).optional(),
  search: z.string().optional()
});

// Sort params schema
const sortParamsSchema = z.object({
  sort_by: z.string().optional(),
  sort_order: z.enum(['asc', 'desc']).optional().default('asc'),
  multiple_sorts: z.array(z.object({
    field: z.string(),
    order: z.enum(['asc', 'desc'])
  })).optional()
});

test('pagination - defaults to limit 20', () => {
  const result = paginationParamsSchema.safeParse({});

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.limit, 20);
    assert.equal(result.data.offset, 0);
  }
});

test('pagination - accepts custom limit', () => {
  const result = paginationParamsSchema.safeParse({
    limit: 50,
    offset: 100
  });

  assert.equal(result.success, true);
});

test('pagination - limit max 1000', () => {
  const valid = paginationParamsSchema.safeParse({
    limit: 1000
  });

  const invalid = paginationParamsSchema.safeParse({
    limit: 1001
  });

  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});

test('pagination - rejects zero limit', () => {
  const result = paginationParamsSchema.safeParse({
    limit: 0
  });

  assert.equal(result.success, false);
});

test('pagination - rejects negative offset', () => {
  const result = paginationParamsSchema.safeParse({
    offset: -1
  });

  assert.equal(result.success, false);
});

test('pagination - response with data', () => {
  const result = paginationResponseSchema.safeParse({
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ],
    pagination: {
      total: 150,
      limit: 20,
      offset: 0,
      has_more: true
    }
  });

  assert.equal(result.success, true);
});

test('pagination - response with page info', () => {
  const result = paginationResponseSchema.safeParse({
    data: [{ id: 1 }],
    pagination: {
      total: 100,
      limit: 10,
      offset: 20,
      page: 3,
      total_pages: 10,
      has_more: true
    }
  });

  assert.equal(result.success, true);
});

test('pagination - last page has_more false', () => {
  const result = paginationResponseSchema.safeParse({
    data: [{ id: 1 }, { id: 2 }],
    pagination: {
      total: 22,
      limit: 20,
      offset: 20,
      has_more: false
    }
  });

  assert.equal(result.success, true);
});

test('filter - empty filters', () => {
  const result = filterParamsSchema.safeParse({});

  assert.equal(result.success, true);
});

test('filter - accepts status', () => {
  const result = filterParamsSchema.safeParse({
    status: 'active'
  });

  assert.equal(result.success, true);
});

test('filter - accepts date range', () => {
  const result = filterParamsSchema.safeParse({
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-06-30T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('filter - rejects invalid date', () => {
  const result = filterParamsSchema.safeParse({
    date_from: '2024-01-01'
  });

  assert.equal(result.success, false);
});

test('filter - price range', () => {
  const result = filterParamsSchema.safeParse({
    price_min: 100,
    price_max: 1000
  });

  assert.equal(result.success, true);
});

test('filter - rejects negative price min', () => {
  const result = filterParamsSchema.safeParse({
    price_min: -100
  });

  assert.equal(result.success, false);
});

test('filter - rejects zero max price', () => {
  const result = filterParamsSchema.safeParse({
    price_max: 0
  });

  assert.equal(result.success, false);
});

test('filter - rating 0-5', () => {
  for (let rating = 0; rating <= 5; rating += 0.5) {
    const result = filterParamsSchema.safeParse({
      rating_min: rating
    });

    assert.equal(result.success, true);
  }
});

test('filter - rejects rating above 5', () => {
  const result = filterParamsSchema.safeParse({
    rating_min: 5.5
  });

  assert.equal(result.success, false);
});

test('filter - search text', () => {
  const result = filterParamsSchema.safeParse({
    search: 'electronics laptop'
  });

  assert.equal(result.success, true);
});

test('sort - defaults to asc', () => {
  const result = sortParamsSchema.safeParse({
    sort_by: 'price'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.sort_order, 'asc');
  }
});

test('sort - accepts desc', () => {
  const result = sortParamsSchema.safeParse({
    sort_by: 'price',
    sort_order: 'desc'
  });

  assert.equal(result.success, true);
});

test('sort - multiple sorts', () => {
  const result = sortParamsSchema.safeParse({
    multiple_sorts: [
      { field: 'category', order: 'asc' },
      { field: 'price', order: 'desc' },
      { field: 'rating', order: 'desc' }
    ]
  });

  assert.equal(result.success, true);
});

test('pagination - cursor-based pagination', () => {
  const result = paginationResponseSchema.safeParse({
    data: [{ id: 1, cursor: 'abc123' }],
    pagination: {
      total: 1000,
      limit: 20,
      offset: 0,
      has_more: true
    }
  });

  assert.equal(result.success, true);
});

test('filter - complete filter with pagination', () => {
  const params = filterParamsSchema.safeParse({
    status: 'active',
    category: 'electronics',
    price_min: 100,
    price_max: 5000,
    rating_min: 4.0,
    search: 'laptop'
  });

  assert.equal(params.success, true);
});

test('sort - field name validation', () => {
  const result = sortParamsSchema.safeParse({
    sort_by: 'created_at'
  });

  assert.equal(result.success, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Search query schema
const searchQuerySchema = z.object({
  q: z.string().min(1, 'query_required'),
  type: z.enum(['products', 'suppliers', 'categories', 'all']).optional().default('all'),
  limit: z.number().int().positive().optional().default(20),
  offset: z.number().int().nonnegative().optional().default(0),
  filters: z.object({
    price_min: z.number().nonnegative().optional(),
    price_max: z.number().positive().optional(),
    category: z.string().optional(),
    status: z.string().optional(),
    rating_min: z.number().min(0).max(5).optional()
  }).optional(),
  sort_by: z.enum(['relevance', 'price_asc', 'price_desc', 'rating', 'newest']).optional().default('relevance')
});

// Search result schema
const searchResultSchema = z.object({
  id: z.string().or(z.number()),
  type: z.enum(['product', 'supplier', 'category']),
  title: z.string(),
  description: z.string().optional(),
  url: z.string().url('invalid_url').optional(),
  image: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

// Search response schema
const searchResponseSchema = z.object({
  query: z.string(),
  results: z.array(searchResultSchema),
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
  execution_time_ms: z.number().positive().optional()
});

test('search - validates query', () => {
  const result = searchQuerySchema.safeParse({
    q: 'electronics'
  });

  assert.equal(result.success, true);
});

test('search - requires query', () => {
  const result = searchQuerySchema.safeParse({
    q: ''
  });

  assert.equal(result.success, false);
});

test('search - accepts all search types', () => {
  for (const type of ['products', 'suppliers', 'categories', 'all']) {
    const result = searchQuerySchema.safeParse({
      q: 'test',
      type
    });

    assert.equal(result.success, true);
  }
});

test('search - defaults type to all', () => {
  const result = searchQuerySchema.safeParse({
    q: 'electronics'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.type, 'all');
  }
});

test('search - with pagination', () => {
  const result = searchQuerySchema.safeParse({
    q: 'electronics',
    limit: 50,
    offset: 100
  });

  assert.equal(result.success, true);
});

test('search - with price filters', () => {
  const result = searchQuerySchema.safeParse({
    q: 'laptop',
    filters: {
      price_min: 1000,
      price_max: 5000
    }
  });

  assert.equal(result.success, true);
});

test('search - with category filter', () => {
  const result = searchQuerySchema.safeParse({
    q: 'phone',
    filters: {
      category: 'electronics'
    }
  });

  assert.equal(result.success, true);
});

test('search - with rating filter', () => {
  const result = searchQuerySchema.safeParse({
    q: 'supplier',
    type: 'suppliers',
    filters: {
      rating_min: 4.0
    }
  });

  assert.equal(result.success, true);
});

test('search - defaults sort to relevance', () => {
  const result = searchQuerySchema.safeParse({
    q: 'product'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.sort_by, 'relevance');
  }
});

test('search - accepts all sort options', () => {
  for (const sort of ['relevance', 'price_asc', 'price_desc', 'rating', 'newest']) {
    const result = searchQuerySchema.safeParse({
      q: 'test',
      sort_by: sort
    });

    assert.equal(result.success, true);
  }
});

test('search - result validation', () => {
  const result = searchResultSchema.safeParse({
    id: 'prod-001',
    type: 'product',
    title: 'Product Name',
    description: 'Product description'
  });

  assert.equal(result.success, true);
});

test('search - product result with URL', () => {
  const result = searchResultSchema.safeParse({
    id: 'prod-001',
    type: 'product',
    title: 'Laptop',
    description: 'High performance laptop',
    url: 'https://example.com/products/laptop',
    image: 'https://example.com/images/laptop.jpg'
  });

  assert.equal(result.success, true);
});

test('search - supplier result', () => {
  const result = searchResultSchema.safeParse({
    id: 'sup-001',
    type: 'supplier',
    title: 'Tech Supplies Inc',
    url: 'https://example.com/suppliers/tech-supplies',
    metadata: { rating: 4.5, products: 250 }
  });

  assert.equal(result.success, true);
});

test('search - response validation', () => {
  const result = searchResponseSchema.safeParse({
    query: 'electronics',
    results: [
      { id: 'prod-001', type: 'product', title: 'Product 1' },
      { id: 'prod-002', type: 'product', title: 'Product 2' }
    ],
    total: 100,
    limit: 20,
    offset: 0
  });

  assert.equal(result.success, true);
});

test('search - response with execution time', () => {
  const result = searchResponseSchema.safeParse({
    query: 'laptop',
    results: [
      { id: 'prod-001', type: 'product', title: 'Laptop Model A' }
    ],
    total: 50,
    limit: 20,
    offset: 0,
    execution_time_ms: 150
  });

  assert.equal(result.success, true);
});

test('search - empty results', () => {
  const result = searchResponseSchema.safeParse({
    query: 'nonexistent-product',
    results: [],
    total: 0,
    limit: 20,
    offset: 0
  });

  assert.equal(result.success, true);
});

test('search - complex query with multiple filters', () => {
  const result = searchQuerySchema.safeParse({
    q: 'industrial equipment',
    type: 'products',
    limit: 50,
    offset: 0,
    filters: {
      price_min: 5000,
      price_max: 50000,
      category: 'machinery',
      status: 'in_stock',
      rating_min: 3.5
    },
    sort_by: 'price_asc'
  });

  assert.equal(result.success, true);
});

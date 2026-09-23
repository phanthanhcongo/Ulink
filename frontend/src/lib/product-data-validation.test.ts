import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Product schema validation
const productSchema = z.object({
  id: z.string().or(z.number()),
  sku: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().min(1),
  price: z.number().positive().optional(),
  stock: z.number().nonnegative().optional(),
  image: z.string().optional(),
  status: z.enum(['active', 'inactive', 'discontinued']).default('active'),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

test('product validates minimal required fields', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product Name',
    category: 'Electronics'
  });

  assert.equal(result.success, true);
});

test('product rejects missing sku', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: '',
    name: 'Product',
    category: 'Cat'
  });

  assert.equal(result.success, false);
});

test('product rejects missing name', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: '',
    category: 'Cat'
  });

  assert.equal(result.success, false);
});

test('product rejects negative price', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat',
    price: -100
  });

  assert.equal(result.success, false);
});

test('product rejects negative stock', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat',
    stock: -5
  });

  assert.equal(result.success, false);
});

test('product accepts zero stock', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat',
    stock: 0
  });

  assert.equal(result.success, true);
});

test('product accepts valid status', () => {
  const statuses = ['active', 'inactive', 'discontinued'];

  for (const status of statuses) {
    const result = productSchema.safeParse({
      id: 'prod-123',
      sku: 'SKU-001',
      name: 'Product',
      category: 'Cat',
      status
    });

    assert.equal(result.success, true);
  }
});

test('product rejects invalid status', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat',
    status: 'pending'
  });

  assert.equal(result.success, false);
});

test('product defaults status to active', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('product accepts numeric or string id', () => {
  const withNumId = productSchema.safeParse({
    id: 123,
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat'
  });

  const withStringId = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat'
  });

  assert.equal(withNumId.success, true);
  assert.equal(withStringId.success, true);
});

test('product accepts optional fields', () => {
  const result = productSchema.safeParse({
    id: 'prod-123',
    sku: 'SKU-001',
    name: 'Product',
    category: 'Cat',
    description: 'Full description',
    price: 99.99,
    stock: 100,
    image: '/images/product.jpg',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  });

  assert.equal(result.success, true);
});

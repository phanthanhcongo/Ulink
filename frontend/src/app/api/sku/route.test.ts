import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// SKU lookup/search schema
const skuSearchSchema = z.object({
  code: z.string().min(1, 'code_required').toUpperCase(),
  category: z.string().optional(),
  limit: z.number().int().positive().optional().default(10),
  offset: z.number().int().nonnegative().optional().default(0)
});

// SKU response schema
const skuResponseSchema = z.object({
  id: z.string().or(z.number()),
  code: z.string(),
  name: z.string(),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().nonnegative().optional(),
  status: z.enum(['active', 'inactive', 'discontinued']).optional()
});

test('SKU API - search by code', () => {
  const result = skuSearchSchema.safeParse({
    code: 'SKU-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.code, 'SKU-001');
  }
});

test('SKU API - requires SKU code', () => {
  const result = skuSearchSchema.safeParse({
    code: ''
  });

  assert.equal(result.success, false);
});

test('SKU API - converts code to uppercase', () => {
  const result = skuSearchSchema.safeParse({
    code: 'sku-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.code, 'SKU-001');
  }
});

test('SKU API - search with category filter', () => {
  const result = skuSearchSchema.safeParse({
    code: 'SKU-001',
    category: 'electronics'
  });

  assert.equal(result.success, true);
});

test('SKU API - search with pagination', () => {
  const result = skuSearchSchema.safeParse({
    code: 'SKU',
    limit: 20,
    offset: 40
  });

  assert.equal(result.success, true);
});

test('SKU API - rejects negative limit', () => {
  const result = skuSearchSchema.safeParse({
    code: 'SKU-001',
    limit: -5
  });

  assert.equal(result.success, false);
});

test('SKU API - defaults limit to 10', () => {
  const result = skuSearchSchema.safeParse({
    code: 'SKU-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.limit, 10);
  }
});

test('SKU API - defaults offset to 0', () => {
  const result = skuSearchSchema.safeParse({
    code: 'SKU-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.offset, 0);
  }
});

test('SKU API - response validation', () => {
  const validResponse = {
    id: 'sku-123',
    code: 'SKU-001',
    name: 'Product Name',
    category: 'Electronics',
    price: 99.99,
    stock: 100,
    status: 'active'
  };

  const result = skuResponseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

test('SKU API - requires code and name', () => {
  const result = skuResponseSchema.safeParse({
    id: 'sku-123',
    code: 'SKU-001'
  });

  assert.equal(result.success, false);
});

test('SKU API - accepts numeric price', () => {
  const result = skuResponseSchema.safeParse({
    id: 'sku-123',
    code: 'SKU-001',
    name: 'Product',
    price: 99.99
  });

  assert.equal(result.success, true);
});

test('SKU API - rejects zero price', () => {
  const result = skuResponseSchema.safeParse({
    id: 'sku-123',
    code: 'SKU-001',
    name: 'Product',
    price: 0
  });

  assert.equal(result.success, false);
});

test('SKU API - accepts zero stock', () => {
  const result = skuResponseSchema.safeParse({
    id: 'sku-123',
    code: 'SKU-001',
    name: 'Product',
    stock: 0
  });

  assert.equal(result.success, true);
});

test('SKU API - accepts all status values', () => {
  const statuses = ['active', 'inactive', 'discontinued'];

  for (const status of statuses) {
    const result = skuResponseSchema.safeParse({
      id: 'sku-123',
      code: 'SKU-001',
      name: 'Product',
      status
    });

    assert.equal(result.success, true);
  }
});

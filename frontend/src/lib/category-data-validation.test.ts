import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Category schema
const categorySchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1, 'name_required'),
  slug: z.string().min(1, 'slug_required').regex(/^[a-z0-9-]+$/, 'slug_invalid'),
  description: z.string().optional(),
  parent_id: z.string().or(z.number()).optional().nullable(),
  image: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  sort_order: z.number().int().nonnegative().optional().default(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('category - validates required fields', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics'
  });

  assert.equal(result.success, true);
});

test('category - requires name', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: '',
    slug: 'electronics'
  });

  assert.equal(result.success, false);
});

test('category - requires slug', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: ''
  });

  assert.equal(result.success, false);
});

test('category - validates slug format', () => {
  // Valid slugs
  const validSlugs = ['electronics', 'home-appliances', 'test-123', 'a-b-c'];

  for (const slug of validSlugs) {
    const result = categorySchema.safeParse({
      id: 'cat-1',
      name: 'Category',
      slug
    });

    assert.equal(result.success, true);
  }

  // Invalid slugs
  const invalidSlugs = ['Electronics', 'home_appliances', 'TEST-CAT', 'cat@123'];

  for (const slug of invalidSlugs) {
    const result = categorySchema.safeParse({
      id: 'cat-1',
      name: 'Category',
      slug
    });

    assert.equal(result.success, false);
  }
});

test('category - defaults status to active', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('category - defaults sort order to 0', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.sort_order, 0);
  }
});

test('category - accepts parent category', () => {
  const result = categorySchema.safeParse({
    id: 'cat-2',
    name: 'Phones',
    slug: 'phones',
    parent_id: 'cat-1'
  });

  assert.equal(result.success, true);
});

test('category - accepts numeric parent ID', () => {
  const result = categorySchema.safeParse({
    id: 'cat-2',
    name: 'Phones',
    slug: 'phones',
    parent_id: 1
  });

  assert.equal(result.success, true);
});

test('category - allows null parent_id', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    parent_id: null
  });

  assert.equal(result.success, true);
});

test('category - rejects negative sort order', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    sort_order: -1
  });

  assert.equal(result.success, false);
});

test('category - accepts zero sort order', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    sort_order: 0
  });

  assert.equal(result.success, true);
});

test('category - accepts positive sort order', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    sort_order: 100
  });

  assert.equal(result.success, true);
});

test('category - accepts both status values', () => {
  for (const status of ['active', 'inactive']) {
    const result = categorySchema.safeParse({
      id: 'cat-1',
      name: 'Electronics',
      slug: 'electronics',
      status
    });

    assert.equal(result.success, true);
  }
});

test('category - accepts optional description', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'All electronic devices and gadgets'
  });

  assert.equal(result.success, true);
});

test('category - accepts optional image', () => {
  const result = categorySchema.safeParse({
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    image: '/images/electronics.jpg'
  });

  assert.equal(result.success, true);
});

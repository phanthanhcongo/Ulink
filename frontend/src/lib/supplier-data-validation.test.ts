import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Supplier schema
const supplierSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1, 'name_required'),
  slug: z.string().min(1, 'slug_required'),
  email: z.string().email('invalid_email'),
  phone: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  address: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  total_products: z.number().int().nonnegative().optional(),
  status: z.enum(['active', 'pending', 'suspended', 'inactive']).default('pending'),
  verified: z.boolean().optional().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('supplier - validates required fields', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Tech Supplies Ltd',
    slug: 'tech-supplies',
    email: 'contact@techsupplies.com'
  });

  assert.equal(result.success, true);
});

test('supplier - requires name', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: '',
    slug: 'supplier',
    email: 'email@example.com'
  });

  assert.equal(result.success, false);
});

test('supplier - requires valid email', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('supplier - defaults status to pending', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('supplier - accepts all status values', () => {
  for (const status of ['active', 'pending', 'suspended', 'inactive']) {
    const result = supplierSchema.safeParse({
      id: 'sup-001',
      name: 'Supplier',
      slug: 'supplier',
      email: 'supplier@example.com',
      status
    });

    assert.equal(result.success, true);
  }
});

test('supplier - defaults verified to false', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.verified, false);
  }
});

test('supplier - accepts verified flag', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    verified: true
  });

  assert.equal(result.success, true);
});

test('supplier - validates rating between 0-5', () => {
  const validZero = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    rating: 0
  });

  const validFive = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    rating: 5
  });

  const invalidSix = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    rating: 6
  });

  assert.equal(validZero.success, true);
  assert.equal(validFive.success, true);
  assert.equal(invalidSix.success, false);
});

test('supplier - accepts decimal ratings', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    rating: 4.5
  });

  assert.equal(result.success, true);
});

test('supplier - accepts optional phone', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    phone: '+1-800-555-0123'
  });

  assert.equal(result.success, true);
});

test('supplier - accepts country and province', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    country: 'Vietnam',
    province: 'Ho Chi Minh'
  });

  assert.equal(result.success, true);
});

test('supplier - accepts total products count', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    total_products: 250
  });

  assert.equal(result.success, true);
});

test('supplier - rejects negative product count', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Supplier',
    slug: 'supplier',
    email: 'supplier@example.com',
    total_products: -5
  });

  assert.equal(result.success, false);
});

test('supplier - full verified supplier', () => {
  const result = supplierSchema.safeParse({
    id: 'sup-001',
    name: 'Premium Tech Supplies',
    slug: 'premium-tech-supplies',
    email: 'contact@premiumtech.com',
    phone: '+84243123456',
    country: 'Vietnam',
    province: 'Ho Chi Minh',
    address: '123 Tech Street',
    rating: 4.8,
    total_products: 500,
    status: 'active',
    verified: true
  });

  assert.equal(result.success, true);
});

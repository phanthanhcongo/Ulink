import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Discount/Voucher schema
const discountSchema = z.object({
  id: z.string().or(z.number()),
  code: z.string().min(1, 'code_required').toUpperCase(),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed_amount']),
  discount_value: z.number().positive('value_must_be_positive'),
  max_uses: z.number().int().positive().optional(),
  current_uses: z.number().int().nonnegative().optional().default(0),
  minimum_order_value: z.number().nonnegative().optional(),
  applicable_categories: z.array(z.string()).optional().default([]),
  applicable_products: z.array(z.string()).optional().default([]),
  start_date: z.string().datetime('invalid_date'),
  end_date: z.string().datetime('invalid_date'),
  active: z.boolean().optional().default(true),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('discount - validates required fields', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - requires code', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: '',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, false);
});

test('discount - converts code to uppercase', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'summer20',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.code, 'SUMMER20');
  }
});

test('discount - requires positive discount value', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 0,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, false);
});

test('discount - accepts percentage type', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - accepts fixed amount type', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'FLAT100',
    discount_type: 'fixed_amount',
    discount_value: 100,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - accepts description', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    description: 'Summer sale - 20% off everything',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - defaults current uses to 0', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.current_uses, 0);
  }
});

test('discount - accepts max uses', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    max_uses: 100,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - accepts minimum order value', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    minimum_order_value: 500,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - defaults applicable categories to empty', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.applicable_categories, []);
  }
});

test('discount - accepts applicable categories', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    applicable_categories: ['electronics', 'clothing'],
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - accepts applicable products', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    applicable_products: ['prod-001', 'prod-002'],
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - defaults active to true', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.active, true);
  }
});

test('discount - accepts active false', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    discount_type: 'percentage',
    discount_value: 20,
    active: false,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('discount - full discount with limits', () => {
  const result = discountSchema.safeParse({
    id: 'disc-001',
    code: 'SUMMER20',
    description: 'Summer sale - 20% off electronics',
    discount_type: 'percentage',
    discount_value: 20,
    max_uses: 500,
    current_uses: 45,
    minimum_order_value: 1000,
    applicable_categories: ['electronics'],
    applicable_products: [],
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z',
    active: true
  });

  assert.equal(result.success, true);
});

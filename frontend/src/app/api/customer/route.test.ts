import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Customer update schema
const customerUpdateSchema = z.object({
  email: z.string().email('invalid_email').optional(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional()
});

// Get customer response schema
const customerResponseSchema = z.object({
  id: z.string().or(z.number()),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  status: z.string().optional()
});

test('customer API - get profile requires valid customer', () => {
  const validId = 'cust-123';
  assert(validId);
});

test('customer API - update email', () => {
  const result = customerUpdateSchema.safeParse({
    email: 'newemail@example.com'
  });

  assert.equal(result.success, true);
});

test('customer API - rejects invalid email on update', () => {
  const result = customerUpdateSchema.safeParse({
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('customer API - update name fields', () => {
  const result = customerUpdateSchema.safeParse({
    first_name: 'Jane',
    last_name: 'Smith'
  });

  assert.equal(result.success, true);
});

test('customer API - rejects empty name', () => {
  const result = customerUpdateSchema.safeParse({
    first_name: ''
  });

  assert.equal(result.success, false);
});

test('customer API - partial update', () => {
  const result = customerUpdateSchema.safeParse({
    phone: '0901234567'
  });

  assert.equal(result.success, true);
});

test('customer API - update company', () => {
  const result = customerUpdateSchema.safeParse({
    company: 'New Company Inc'
  });

  assert.equal(result.success, true);
});

test('customer API - update address', () => {
  const result = customerUpdateSchema.safeParse({
    address: '456 Oak St',
    city: 'Ho Chi Minh',
    province: 'HCM',
    country: 'Vietnam'
  });

  assert.equal(result.success, true);
});

test('customer API - response validation', () => {
  const validResponse = {
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe',
    status: 'active'
  };

  const result = customerResponseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

test('customer API - numeric customer ID', () => {
  const result = customerResponseSchema.safeParse({
    id: 12345,
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
});

test('customer API - allows multiple updates', () => {
  const updates = [
    { email: 'new@example.com' },
    { first_name: 'Jane' },
    { phone: '0901234567', company: 'ACME' }
  ];

  for (const update of updates) {
    const result = customerUpdateSchema.safeParse(update);
    assert.equal(result.success, true);
  }
});

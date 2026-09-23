import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Customer profile schema
const customerSchema = z.object({
  id: z.string().or(z.number()),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional().default('Vietnam'),
  status: z.enum(['active', 'inactive', 'banned']).default('active'),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Customer update schema (partial)
const customerUpdateSchema = customerSchema.partial().omit({ id: true, created_at: true });

test('customer - validates required fields', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
});

test('customer - requires valid email', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'invalid-email',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, false);
});

test('customer - requires first name', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: '',
    last_name: 'Doe'
  });

  assert.equal(result.success, false);
});

test('customer - requires last name', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: ''
  });

  assert.equal(result.success, false);
});

test('customer - defaults country to Vietnam', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.country, 'Vietnam');
  }
});

test('customer - defaults status to active', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('customer - accepts optional fields', () => {
  const result = customerSchema.safeParse({
    id: 'cust-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe',
    company: 'ACME Corp',
    phone: '0901234567',
    address: '123 Main St',
    city: 'Hanoi',
    province: 'Hanoi',
    country: 'Vietnam',
    status: 'active'
  });

  assert.equal(result.success, true);
});

test('customer - accepts different statuses', () => {
  const statuses = ['active', 'inactive', 'banned'];

  for (const status of statuses) {
    const result = customerSchema.safeParse({
      id: 'cust-123',
      email: 'customer@example.com',
      first_name: 'John',
      last_name: 'Doe',
      status
    });

    assert.equal(result.success, true);
  }
});

test('customer update - allows partial updates', () => {
  const result = customerUpdateSchema.safeParse({
    email: 'newemail@example.com',
    first_name: 'Jane'
  });

  assert.equal(result.success, true);
});

test('customer update - validates email on update', () => {
  const result = customerUpdateSchema.safeParse({
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('customer - numeric ID', () => {
  const result = customerSchema.safeParse({
    id: 12345,
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
});

test('customer - string ID', () => {
  const result = customerSchema.safeParse({
    id: 'cust-abc-123',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
});

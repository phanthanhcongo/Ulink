import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Sample Request schema
const sampleRequestSchema = z.object({
  contact_name: z.string().min(1, 'required'),
  email: z.string().email('invalid_email'),
  company: z.string().min(1, 'required'),
  phone: z.string().regex(/^\d{10,11}$/, 'invalid_phone'),
  province: z.string().min(1, 'required'),
  district: z.string().min(1, 'required'),
  address_detail: z.string().min(1, 'required'),
  product_slug: z.string().min(1, 'required'),
  skus: z.array(z.string()).optional().default([]),
  message: z.string().optional()
});

test('sample request - validates minimal fields', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John Doe',
    email: 'john@example.com',
    company: 'ACME Corp',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 Main St',
    product_slug: 'product-name'
  });

  assert.equal(result.success, true);
});

test('sample request - requires contact name', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: '',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(result.success, false);
});

test('sample request - requires valid email', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'invalid',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(result.success, false);
});

test('sample request - validates phone 10-11 digits', () => {
  // Too short
  const tooShort = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '090123456',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(tooShort.success, false);

  // Valid 10 digits
  const valid10 = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(valid10.success, true);

  // Valid 11 digits
  const valid11 = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '09012345678',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(valid11.success, true);

  // Too long
  const tooLong = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '090123456789',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(tooLong.success, false);
});

test('sample request - requires province', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: '',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(result.success, false);
});

test('sample request - requires district', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: '',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(result.success, false);
});

test('sample request - requires address detail', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '',
    product_slug: 'prod'
  });

  assert.equal(result.success, false);
});

test('sample request - accepts SKU array', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod',
    skus: ['SKU-001', 'SKU-002', 'SKU-003']
  });

  assert.equal(result.success, true);
});

test('sample request - defaults empty SKU array', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.skus, []);
  }
});

test('sample request - accepts optional message', () => {
  const result = sampleRequestSchema.safeParse({
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '0901234567',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 St',
    product_slug: 'prod',
    message: 'Please send high quality samples'
  });

  assert.equal(result.success, true);
});

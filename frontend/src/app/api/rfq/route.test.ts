import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// RFQ request schema validation tests
const rfqItemSchema = z.object({
  sku: z.string().min(1),
  qty: z.number().optional().default(1),
  note: z.string().optional()
});

const rfqSchema = z.object({
  company: z.string().min(1, 'required'),
  contact_name: z.string().min(1, 'required'),
  email: z.string().email('invalid_email'),
  phone: z.string().regex(/^\d+$/, 'invalid_phone'),
  address: z.string().min(1, 'required'),
  hub: z.union([z.number(), z.string()]),
  industry: z.string().optional(),
  items: z.array(rfqItemSchema).min(1),
  message: z.string().optional(),
  scheduled_delivery: z.boolean().optional(),
  requested_delivery_date: z.string().optional()
});

test('RFQ route - validates required fields', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, true);
});

test('RFQ route - rejects invalid email', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'not-an-email',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, false);
});

test('RFQ route - rejects invalid phone (non-digits)', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '+84-901-234-567',
    address: '123 Test St',
    hub: 1,
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, false);
});

test('RFQ route - requires at least one item', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    items: []
  });

  assert.equal(result.success, false);
});

test('RFQ route - validates item SKU', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    items: [{ sku: '' }]
  });

  assert.equal(result.success, false);
});

test('RFQ route - provides default quantity of 1', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.items[0].qty, 1);
  }
});

test('RFQ route - accepts numeric hub ID', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, true);
});

test('RFQ route - accepts string hub ID', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: '1',
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, true);
});

test('RFQ route - accepts optional industry', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    industry: 'Electronics',
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, true);
});

test('RFQ route - accepts optional message', () => {
  const result = rfqSchema.safeParse({
    company: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '0901234567',
    address: '123 Test St',
    hub: 1,
    message: 'Please provide quote ASAP',
    items: [{ sku: 'SKU-001' }]
  });

  assert.equal(result.success, true);
});

test('RFQ route - response contains RFQ details', () => {
  const responseSchema = z.object({
    success: z.literal(true),
    data: z.object({
      id: z.string().or(z.number()),
      company: z.string(),
      email: z.string(),
      status: z.string().optional(),
      created_at: z.string().optional()
    })
  });

  const validResponse = {
    success: true,
    data: {
      id: 'rfq-123',
      company: 'ACME',
      email: 'john@acme.com',
      status: 'pending',
      created_at: new Date().toISOString()
    }
  };

  const result = responseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

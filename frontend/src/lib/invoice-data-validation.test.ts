import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Invoice schema
const invoiceSchema = z.object({
  id: z.string().or(z.number()),
  invoice_number: z.string().min(1, 'invoice_number_required'),
  order_id: z.string().or(z.number()),
  customer_id: z.string().or(z.number()),
  supplier_id: z.string().or(z.number()).optional(),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative().optional().default(0),
  shipping_cost: z.number().nonnegative().optional().default(0),
  total: z.number().positive(),
  currency: z.string().length(3).default('USD'),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).default('draft'),
  issue_date: z.string().datetime('invalid_date').optional(),
  due_date: z.string().datetime('invalid_date').optional(),
  paid_date: z.string().datetime('invalid_date').optional(),
  notes: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('invoice - validates required fields', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
});

test('invoice - requires invoice number', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: '',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, false);
});

test('invoice - requires positive total', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 0
  });

  assert.equal(result.success, false);
});

test('invoice - subtotal can be zero', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 0,
    total: 10.00
  });

  assert.equal(result.success, true);
});

test('invoice - defaults tax to 0', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.tax, 0);
  }
});

test('invoice - accepts tax amount', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    tax: 100.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
});

test('invoice - defaults shipping cost to 0', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.shipping_cost, 0);
  }
});

test('invoice - accepts shipping cost', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    shipping_cost: 25.00,
    total: 1025.00
  });

  assert.equal(result.success, true);
});

test('invoice - defaults currency to USD', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.currency, 'USD');
  }
});

test('invoice - accepts different currencies', () => {
  for (const currency of ['USD', 'EUR', 'VND']) {
    const result = invoiceSchema.safeParse({
      id: 'inv-001',
      invoice_number: 'INV-2024-001',
      order_id: 'ord-001',
      customer_id: 'cust-001',
      subtotal: 1000.00,
      total: 1100.00,
      currency
    });

    assert.equal(result.success, true);
  }
});

test('invoice - defaults status to draft', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'draft');
  }
});

test('invoice - accepts all status values', () => {
  const statuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];

  for (const status of statuses) {
    const result = invoiceSchema.safeParse({
      id: 'inv-001',
      invoice_number: 'INV-2024-001',
      order_id: 'ord-001',
      customer_id: 'cust-001',
      subtotal: 1000.00,
      total: 1100.00,
      status
    });

    assert.equal(result.success, true);
  }
});

test('invoice - accepts optional supplier ID', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    supplier_id: 'sup-001',
    subtotal: 1000.00,
    total: 1100.00
  });

  assert.equal(result.success, true);
});

test('invoice - accepts dates', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00,
    issue_date: '2024-06-01T09:00:00Z',
    due_date: '2024-07-01T09:00:00Z'
  });

  assert.equal(result.success, true);
});

test('invoice - accepts paid date', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00,
    paid_date: '2024-06-15T14:30:00Z'
  });

  assert.equal(result.success, true);
});

test('invoice - accepts notes', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    subtotal: 1000.00,
    total: 1100.00,
    notes: 'Payment due within 30 days of receipt'
  });

  assert.equal(result.success, true);
});

test('invoice - full paid invoice', () => {
  const result = invoiceSchema.safeParse({
    id: 'inv-001',
    invoice_number: 'INV-2024-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    supplier_id: 'sup-001',
    subtotal: 1000.00,
    tax: 100.00,
    shipping_cost: 25.00,
    total: 1125.00,
    currency: 'VND',
    status: 'paid',
    issue_date: '2024-06-01T09:00:00Z',
    due_date: '2024-07-01T09:00:00Z',
    paid_date: '2024-06-15T14:30:00Z',
    notes: 'Payment received in full'
  });

  assert.equal(result.success, true);
});

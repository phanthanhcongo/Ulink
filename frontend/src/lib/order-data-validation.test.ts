import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Order schema validation
const orderLineItemSchema = z.object({
  product_id: z.string().or(z.number()),
  sku: z.string().min(1),
  quantity: z.number().int().positive(),
  unit_price: z.number().positive(),
  subtotal: z.number().positive(),
});

const orderSchema = z.object({
  id: z.string().optional(),
  customer_id: z.string().or(z.number()),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  total_amount: z.number().positive(),
  items: z.array(orderLineItemSchema).min(1),
  shipping_address: z.string().min(1),
  payment_method: z.enum(['credit_card', 'bank_transfer', 'cash']),
  notes: z.string().optional(),
  created_at: z.string().optional(),
});

test('order validates minimal required fields', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 100,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 2,
        unit_price: 50,
        subtotal: 100
      }
    ],
    shipping_address: '123 Main St',
    payment_method: 'credit_card'
  });

  assert.equal(result.success, true);
});

test('order requires at least one item', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 0,
    items: [],
    shipping_address: '123 Main St',
    payment_method: 'credit_card'
  });

  assert.equal(result.success, false);
});

test('order rejects negative total', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: -100,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 1,
        unit_price: 50,
        subtotal: 50
      }
    ],
    shipping_address: '123 Main St',
    payment_method: 'credit_card'
  });

  assert.equal(result.success, false);
});

test('order validates status values', () => {
  const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  for (const status of statuses) {
    const result = orderSchema.safeParse({
      customer_id: 'cust-123',
      status,
      total_amount: 100,
      items: [
        {
          product_id: 'prod-1',
          sku: 'SKU-001',
          quantity: 1,
          unit_price: 100,
          subtotal: 100
        }
      ],
      shipping_address: '123 Main St',
      payment_method: 'credit_card'
    });

    assert.equal(result.success, true);
  }
});

test('order validates payment methods', () => {
  const methods = ['credit_card', 'bank_transfer', 'cash'];

  for (const method of methods) {
    const result = orderSchema.safeParse({
      customer_id: 'cust-123',
      status: 'pending',
      total_amount: 100,
      items: [
        {
          product_id: 'prod-1',
          sku: 'SKU-001',
          quantity: 1,
          unit_price: 100,
          subtotal: 100
        }
      ],
      shipping_address: '123 Main St',
      payment_method: method
    });

    assert.equal(result.success, true);
  }
});

test('order rejects invalid payment method', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 100,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 1,
        unit_price: 100,
        subtotal: 100
      }
    ],
    shipping_address: '123 Main St',
    payment_method: 'wire_transfer'
  });

  assert.equal(result.success, false);
});

test('order item requires positive quantity', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 100,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 0,
        unit_price: 100,
        subtotal: 0
      }
    ],
    shipping_address: '123 Main St',
    payment_method: 'credit_card'
  });

  assert.equal(result.success, false);
});

test('order item requires positive price', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 50,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 1,
        unit_price: -50,
        subtotal: 50
      }
    ],
    shipping_address: '123 Main St',
    payment_method: 'credit_card'
  });

  assert.equal(result.success, false);
});

test('order accepts optional id and notes', () => {
  const result = orderSchema.safeParse({
    id: 'order-123',
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 100,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 1,
        unit_price: 100,
        subtotal: 100
      }
    ],
    shipping_address: '123 Main St',
    payment_method: 'credit_card',
    notes: 'Handle with care',
    created_at: '2024-01-15T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('order requires shipping address', () => {
  const result = orderSchema.safeParse({
    customer_id: 'cust-123',
    status: 'pending',
    total_amount: 100,
    items: [
      {
        product_id: 'prod-1',
        sku: 'SKU-001',
        quantity: 1,
        unit_price: 100,
        subtotal: 100
      }
    ],
    shipping_address: '',
    payment_method: 'credit_card'
  });

  assert.equal(result.success, false);
});

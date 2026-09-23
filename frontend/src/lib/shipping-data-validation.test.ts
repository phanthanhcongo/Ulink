import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Shipping/Logistics schema
const shippingSchema = z.object({
  id: z.string().or(z.number()),
  order_id: z.string().or(z.number()),
  tracking_number: z.string().optional(),
  carrier: z.enum(['dhl', 'fedex', 'ups', 'viettel', 'ghn', 'lalamove', 'other']),
  origin_address: z.string().min(1, 'address_required'),
  destination_address: z.string().min(1, 'address_required'),
  estimated_delivery: z.string().datetime('invalid_date').optional(),
  actual_delivery: z.string().datetime('invalid_date').optional(),
  status: z.enum(['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed']).default('pending'),
  weight: z.number().positive().optional(),
  dimensions: z.string().optional(),
  cost: z.number().nonnegative().optional(),
  notes: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('shipping - validates required fields', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave'
  });

  assert.equal(result.success, true);
});

test('shipping - requires origin address', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '',
    destination_address: '456 Destination Ave'
  });

  assert.equal(result.success, false);
});

test('shipping - requires destination address', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: ''
  });

  assert.equal(result.success, false);
});

test('shipping - validates carrier', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'amazon',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave'
  });

  assert.equal(result.success, false);
});

test('shipping - accepts all carriers', () => {
  const carriers = ['dhl', 'fedex', 'ups', 'viettel', 'ghn', 'lalamove', 'other'];

  for (const carrier of carriers) {
    const result = shippingSchema.safeParse({
      id: 'ship-001',
      order_id: 'ord-001',
      carrier,
      origin_address: '123 Origin St',
      destination_address: '456 Destination Ave'
    });

    assert.equal(result.success, true);
  }
});

test('shipping - defaults status to pending', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('shipping - accepts all status values', () => {
  const statuses = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed'];

  for (const status of statuses) {
    const result = shippingSchema.safeParse({
      id: 'ship-001',
      order_id: 'ord-001',
      carrier: 'dhl',
      origin_address: '123 Origin St',
      destination_address: '456 Destination Ave',
      status
    });

    assert.equal(result.success, true);
  }
});

test('shipping - accepts optional tracking number', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    tracking_number: '1Z999AA10123456784',
    carrier: 'ups',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave'
  });

  assert.equal(result.success, true);
});

test('shipping - accepts positive weight', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    weight: 2.5
  });

  assert.equal(result.success, true);
});

test('shipping - rejects zero weight', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    weight: 0
  });

  assert.equal(result.success, false);
});

test('shipping - accepts dimensions', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    dimensions: '20x15x10cm'
  });

  assert.equal(result.success, true);
});

test('shipping - accepts cost', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    cost: 15.99
  });

  assert.equal(result.success, true);
});

test('shipping - cost can be zero', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    cost: 0
  });

  assert.equal(result.success, true);
});

test('shipping - accepts estimated delivery', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    estimated_delivery: '2024-06-20T18:00:00Z'
  });

  assert.equal(result.success, true);
});

test('shipping - accepts actual delivery', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    actual_delivery: '2024-06-20T14:30:00Z'
  });

  assert.equal(result.success, true);
});

test('shipping - accepts notes', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    carrier: 'dhl',
    origin_address: '123 Origin St',
    destination_address: '456 Destination Ave',
    notes: 'Fragile package, handle with care'
  });

  assert.equal(result.success, true);
});

test('shipping - full delivered shipment', () => {
  const result = shippingSchema.safeParse({
    id: 'ship-001',
    order_id: 'ord-001',
    tracking_number: '1Z999AA10123456784',
    carrier: 'fedex',
    origin_address: '123 Origin St, Hanoi',
    destination_address: '456 Destination Ave, HCMC',
    estimated_delivery: '2024-06-20T18:00:00Z',
    actual_delivery: '2024-06-19T10:30:00Z',
    status: 'delivered',
    weight: 5.2,
    dimensions: '30x25x15cm',
    cost: 25.50,
    notes: 'Delivered successfully'
  });

  assert.equal(result.success, true);
});

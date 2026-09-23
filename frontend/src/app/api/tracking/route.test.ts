import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Tracking lookup schema
const trackingLookupSchema = z.object({
  tracking_number: z.string().min(1, 'tracking_required'),
  order_id: z.string().or(z.number()).optional()
});

// Tracking response schema
const trackingResponseSchema = z.object({
  id: z.string().or(z.number()),
  tracking_number: z.string(),
  order_id: z.string().or(z.number()),
  carrier: z.string(),
  status: z.enum(['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed']),
  estimated_delivery: z.string().optional(),
  actual_delivery: z.string().optional(),
  current_location: z.string().optional(),
  events: z.array(z.object({
    timestamp: z.string().datetime('invalid_date'),
    status: z.string(),
    location: z.string().optional(),
    description: z.string().optional()
  })).optional()
});

test('tracking API - lookup by tracking number', () => {
  const result = trackingLookupSchema.safeParse({
    tracking_number: '1Z999AA10123456784'
  });

  assert.equal(result.success, true);
});

test('tracking API - requires tracking number', () => {
  const result = trackingLookupSchema.safeParse({
    tracking_number: ''
  });

  assert.equal(result.success, false);
});

test('tracking API - lookup with order ID', () => {
  const result = trackingLookupSchema.safeParse({
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001'
  });

  assert.equal(result.success, true);
});

test('tracking API - numeric order ID', () => {
  const result = trackingLookupSchema.safeParse({
    tracking_number: '1Z999AA10123456784',
    order_id: 12345
  });

  assert.equal(result.success, true);
});

test('tracking API - response validation', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'ups',
    status: 'in_transit'
  });

  assert.equal(result.success, true);
});

test('tracking API - response with estimated delivery', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'dhl',
    status: 'in_transit',
    estimated_delivery: '2024-06-20T18:00:00Z'
  });

  assert.equal(result.success, true);
});

test('tracking API - response with actual delivery', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'fedex',
    status: 'delivered',
    actual_delivery: '2024-06-19T14:30:00Z'
  });

  assert.equal(result.success, true);
});

test('tracking API - response with current location', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'ghn',
    status: 'out_for_delivery',
    current_location: 'Ho Chi Minh City Sorting Hub'
  });

  assert.equal(result.success, true);
});

test('tracking API - accepts all status values', () => {
  const statuses = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed'];

  for (const status of statuses) {
    const result = trackingResponseSchema.safeParse({
      id: 'track-001',
      tracking_number: '1Z999AA10123456784',
      order_id: 'ord-001',
      carrier: 'ups',
      status
    });

    assert.equal(result.success, true);
  }
});

test('tracking API - with tracking events', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'dhl',
    status: 'in_transit',
    events: [
      {
        timestamp: '2024-06-15T10:00:00Z',
        status: 'picked_up',
        location: 'Origin Hub',
        description: 'Package picked up'
      },
      {
        timestamp: '2024-06-16T08:30:00Z',
        status: 'in_transit',
        location: 'Hanoi Hub',
        description: 'In transit to destination'
      }
    ]
  });

  assert.equal(result.success, true);
});

test('tracking API - full delivered tracking', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'fedex',
    status: 'delivered',
    estimated_delivery: '2024-06-20T18:00:00Z',
    actual_delivery: '2024-06-19T14:30:00Z',
    current_location: 'Delivered',
    events: [
      {
        timestamp: '2024-06-15T10:00:00Z',
        status: 'picked_up',
        location: 'New York Hub',
        description: 'Package picked up'
      },
      {
        timestamp: '2024-06-16T12:00:00Z',
        status: 'in_transit',
        location: 'Memphis Hub',
        description: 'In transit'
      },
      {
        timestamp: '2024-06-19T14:30:00Z',
        status: 'delivered',
        location: 'Hanoi',
        description: 'Delivered successfully'
      }
    ]
  });

  assert.equal(result.success, true);
});

test('tracking API - failed delivery', () => {
  const result = trackingResponseSchema.safeParse({
    id: 'track-001',
    tracking_number: '1Z999AA10123456784',
    order_id: 'ord-001',
    carrier: 'lalamove',
    status: 'failed',
    current_location: 'Return to sender'
  });

  assert.equal(result.success, true);
});

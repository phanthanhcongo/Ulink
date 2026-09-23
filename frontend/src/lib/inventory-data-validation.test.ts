import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Inventory schema
const inventorySchema = z.object({
  id: z.string().or(z.number()),
  sku: z.string().min(1, 'sku_required'),
  warehouse_id: z.string().or(z.number()),
  quantity_on_hand: z.number().int().nonnegative(),
  quantity_reserved: z.number().int().nonnegative().optional().default(0),
  quantity_available: z.number().int().nonnegative(),
  reorder_point: z.number().int().nonnegative().optional(),
  reorder_quantity: z.number().int().positive().optional(),
  location: z.string().optional(),
  unit: z.string().optional().default('unit'),
  cost_per_unit: z.number().nonnegative().optional(),
  last_counted_at: z.string().datetime('invalid_date').optional(),
  status: z.enum(['in_stock', 'low_stock', 'out_of_stock', 'discontinued']).default('in_stock'),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('inventory - validates required fields', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100
  });

  assert.equal(result.success, true);
});

test('inventory - requires SKU', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: '',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100
  });

  assert.equal(result.success, false);
});

test('inventory - requires nonnegative quantity on hand', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: -5,
    quantity_available: 100
  });

  assert.equal(result.success, false);
});

test('inventory - quantity on hand can be zero', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 0,
    quantity_available: 0
  });

  assert.equal(result.success, true);
});

test('inventory - defaults reserved quantity to 0', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.quantity_reserved, 0);
  }
});

test('inventory - accepts reserved quantity', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_reserved: 20,
    quantity_available: 80
  });

  assert.equal(result.success, true);
});

test('inventory - accepts location', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100,
    location: 'Shelf A-12'
  });

  assert.equal(result.success, true);
});

test('inventory - defaults unit to unit', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.unit, 'unit');
  }
});

test('inventory - accepts different units', () => {
  for (const unit of ['unit', 'kg', 'liter', 'meter', 'box']) {
    const result = inventorySchema.safeParse({
      id: 'inv-001',
      sku: 'SKU-001',
      warehouse_id: 'wh-001',
      quantity_on_hand: 100,
      quantity_available: 100,
      unit
    });

    assert.equal(result.success, true);
  }
});

test('inventory - accepts cost per unit', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100,
    cost_per_unit: 25.50
  });

  assert.equal(result.success, true);
});

test('inventory - accepts reorder point', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100,
    reorder_point: 20
  });

  assert.equal(result.success, true);
});

test('inventory - accepts positive reorder quantity', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100,
    reorder_quantity: 50
  });

  assert.equal(result.success, true);
});

test('inventory - rejects zero reorder quantity', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100,
    reorder_quantity: 0
  });

  assert.equal(result.success, false);
});

test('inventory - defaults status to in_stock', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'in_stock');
  }
});

test('inventory - accepts all status values', () => {
  const statuses = ['in_stock', 'low_stock', 'out_of_stock', 'discontinued'];

  for (const status of statuses) {
    const result = inventorySchema.safeParse({
      id: 'inv-001',
      sku: 'SKU-001',
      warehouse_id: 'wh-001',
      quantity_on_hand: 100,
      quantity_available: 100,
      status
    });

    assert.equal(result.success, true);
  }
});

test('inventory - accepts last counted at', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100,
    last_counted_at: '2024-06-01T09:00:00Z'
  });

  assert.equal(result.success, true);
});

test('inventory - full low stock item', () => {
  const result = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 15,
    quantity_reserved: 5,
    quantity_available: 10,
    reorder_point: 20,
    reorder_quantity: 100,
    location: 'Shelf B-5',
    unit: 'unit',
    cost_per_unit: 45.00,
    last_counted_at: '2024-06-01T09:00:00Z',
    status: 'low_stock'
  });

  assert.equal(result.success, true);
});

test('inventory - numeric and string warehouse IDs', () => {
  const result1 = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 123,
    quantity_on_hand: 100,
    quantity_available: 100
  });

  const result2 = inventorySchema.safeParse({
    id: 'inv-001',
    sku: 'SKU-001',
    warehouse_id: 'wh-001',
    quantity_on_hand: 100,
    quantity_available: 100
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

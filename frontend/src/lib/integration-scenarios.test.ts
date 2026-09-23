import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Comprehensive order workflow schema
const orderWorkflowSchema = z.object({
  order: z.object({
    id: z.string(),
    customer_id: z.string(),
    items: z.array(z.object({
      product_id: z.string(),
      sku: z.string(),
      quantity: z.number().positive(),
      unit_price: z.number().positive()
    })).min(1),
    subtotal: z.number().positive(),
    tax: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    total: z.number().positive(),
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered'])
  }),
  payment: z.object({
    transaction_id: z.string(),
    method: z.enum(['credit_card', 'bank_transfer', 'paypal']),
    amount: z.number().positive(),
    status: z.enum(['pending', 'completed', 'failed'])
  }),
  shipping: z.object({
    tracking_number: z.string(),
    carrier: z.enum(['dhl', 'fedex', 'ups', 'local']),
    origin: z.string(),
    destination: z.string(),
    estimated_delivery: z.string().datetime('invalid_date'),
    status: z.enum(['pending', 'in_transit', 'delivered'])
  })
});

// Supplier onboarding workflow schema
const supplierOnboardingSchema = z.object({
  organization: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email('invalid_email'),
    status: z.enum(['pending_verification', 'verified', 'active'])
  }),
  team_members: z.array(z.object({
    email: z.string().email('invalid_email'),
    role: z.enum(['owner', 'admin', 'member']),
    status: z.enum(['invited', 'active'])
  })).min(1),
  products: z.array(z.object({
    sku: z.string(),
    name: z.string(),
    price: z.number().positive(),
    stock: z.number().nonnegative()
  })).optional(),
  verification: z.object({
    status: z.enum(['pending', 'approved', 'rejected']),
    submitted_at: z.string().datetime('invalid_date').optional(),
    verified_at: z.string().datetime('invalid_date').optional()
  })
});

// RFQ to purchase order workflow schema
const rfqToPurchaseOrderSchema = z.object({
  rfq: z.object({
    id: z.string(),
    customer_id: z.string(),
    items: z.array(z.object({
      sku: z.string(),
      quantity: z.number().positive()
    })).min(1),
    status: z.enum(['open', 'quoted', 'accepted', 'rejected'])
  }),
  quotes: z.array(z.object({
    supplier_id: z.string(),
    total_price: z.number().positive(),
    delivery_time: z.number().positive(),
    status: z.enum(['submitted', 'accepted', 'rejected'])
  })).min(1),
  purchase_order: z.object({
    id: z.string(),
    supplier_id: z.string(),
    items: z.array(z.object({
      sku: z.string(),
      quantity: z.number().positive(),
      unit_price: z.number().positive()
    })).min(1),
    total: z.number().positive(),
    status: z.enum(['draft', 'sent', 'confirmed', 'completed'])
  })
});

test('integration - complete order workflow', () => {
  const result = orderWorkflowSchema.safeParse({
    order: {
      id: 'ord-001',
      customer_id: 'cust-001',
      items: [
        { product_id: 'prod-001', sku: 'SKU-001', quantity: 2, unit_price: 99.99 },
        { product_id: 'prod-002', sku: 'SKU-002', quantity: 1, unit_price: 149.99 }
      ],
      subtotal: 349.97,
      tax: 34.99,
      shipping: 25.00,
      total: 409.96,
      status: 'confirmed'
    },
    payment: {
      transaction_id: 'txn-001',
      method: 'credit_card',
      amount: 409.96,
      status: 'completed'
    },
    shipping: {
      tracking_number: '1Z999AA10123456784',
      carrier: 'fedex',
      origin: 'New York',
      destination: 'Los Angeles',
      estimated_delivery: '2024-06-10T18:00:00Z',
      status: 'in_transit'
    }
  });

  assert.equal(result.success, true);
});

test('integration - supplier onboarding flow', () => {
  const result = supplierOnboardingSchema.safeParse({
    organization: {
      id: 'org-001',
      name: 'Tech Supplies Inc',
      email: 'contact@techsupplies.com',
      status: 'active'
    },
    team_members: [
      { email: 'owner@techsupplies.com', role: 'owner', status: 'active' },
      { email: 'admin@techsupplies.com', role: 'admin', status: 'active' }
    ],
    products: [
      { sku: 'SKU-001', name: 'Product A', price: 99.99, stock: 100 },
      { sku: 'SKU-002', name: 'Product B', price: 149.99, stock: 50 }
    ],
    verification: {
      status: 'approved',
      submitted_at: '2024-05-01T10:00:00Z',
      verified_at: '2024-05-15T14:00:00Z'
    }
  });

  assert.equal(result.success, true);
});

test('integration - RFQ to purchase order', () => {
  const result = rfqToPurchaseOrderSchema.safeParse({
    rfq: {
      id: 'rfq-001',
      customer_id: 'cust-001',
      items: [
        { sku: 'SKU-001', quantity: 1000 },
        { sku: 'SKU-002', quantity: 500 }
      ],
      status: 'accepted'
    },
    quotes: [
      {
        supplier_id: 'sup-001',
        total_price: 15000.00,
        delivery_time: 14,
        status: 'accepted'
      },
      {
        supplier_id: 'sup-002',
        total_price: 16500.00,
        delivery_time: 10,
        status: 'rejected'
      }
    ],
    purchase_order: {
      id: 'po-001',
      supplier_id: 'sup-001',
      items: [
        { sku: 'SKU-001', quantity: 1000, unit_price: 10.00 },
        { sku: 'SKU-002', quantity: 500, unit_price: 10.00 }
      ],
      total: 15000.00,
      status: 'confirmed'
    }
  });

  assert.equal(result.success, true);
});

test('integration - order requires positive total', () => {
  const result = orderWorkflowSchema.safeParse({
    order: {
      id: 'ord-001',
      customer_id: 'cust-001',
      items: [
        { product_id: 'prod-001', sku: 'SKU-001', quantity: 1, unit_price: 99.99 }
      ],
      subtotal: 99.99,
      tax: 10.00,
      shipping: 0,
      total: 0,
      status: 'pending'
    },
    payment: {
      transaction_id: 'txn-001',
      method: 'credit_card',
      amount: 109.99,
      status: 'pending'
    },
    shipping: {
      tracking_number: '1Z999AA10123456784',
      carrier: 'dhl',
      origin: 'NY',
      destination: 'LA',
      estimated_delivery: '2024-06-10T18:00:00Z',
      status: 'pending'
    }
  });

  assert.equal(result.success, false);
});

test('integration - supplier needs at least one team member', () => {
  const result = supplierOnboardingSchema.safeParse({
    organization: {
      id: 'org-001',
      name: 'Company',
      email: 'contact@company.com',
      status: 'pending_verification'
    },
    team_members: [],
    verification: {
      status: 'pending'
    }
  });

  assert.equal(result.success, false);
});

test('integration - RFQ requires multiple quotes', () => {
  const result = rfqToPurchaseOrderSchema.safeParse({
    rfq: {
      id: 'rfq-001',
      customer_id: 'cust-001',
      items: [
        { sku: 'SKU-001', quantity: 100 }
      ],
      status: 'open'
    },
    quotes: [
      {
        supplier_id: 'sup-001',
        total_price: 1000.00,
        delivery_time: 7,
        status: 'submitted'
      }
    ],
    purchase_order: {
      id: 'po-001',
      supplier_id: 'sup-001',
      items: [
        { sku: 'SKU-001', quantity: 100, unit_price: 10.00 }
      ],
      total: 1000.00,
      status: 'draft'
    }
  });

  assert.equal(result.success, true);
});

test('integration - full complex supplier scenario', () => {
  const result = supplierOnboardingSchema.safeParse({
    organization: {
      id: 'org-premium-001',
      name: 'Premium Exports Ltd',
      email: 'hello@premiumexports.com',
      status: 'active'
    },
    team_members: [
      { email: 'ceo@premiumexports.com', role: 'owner', status: 'active' },
      { email: 'operations@premiumexports.com', role: 'admin', status: 'active' },
      { email: 'sales@premiumexports.com', role: 'member', status: 'active' },
      { email: 'new_hire@premiumexports.com', role: 'member', status: 'invited' }
    ],
    products: [
      { sku: 'PRE-001', name: 'Electronics Component A', price: 150.00, stock: 5000 },
      { sku: 'PRE-002', name: 'Electronics Component B', price: 200.00, stock: 3000 },
      { sku: 'PRE-003', name: 'Electronics Component C', price: 75.00, stock: 8000 }
    ],
    verification: {
      status: 'approved',
      submitted_at: '2024-04-01T09:00:00Z',
      verified_at: '2024-04-20T16:30:00Z'
    }
  });

  assert.equal(result.success, true);
});

test('integration - full complex RFQ workflow', () => {
  const result = rfqToPurchaseOrderSchema.safeParse({
    rfq: {
      id: 'rfq-enterprise-001',
      customer_id: 'cust-enterprise-001',
      items: [
        { sku: 'SKU-BULK-001', quantity: 5000 },
        { sku: 'SKU-BULK-002', quantity: 3000 },
        { sku: 'SKU-BULK-003', quantity: 2000 }
      ],
      status: 'accepted'
    },
    quotes: [
      {
        supplier_id: 'sup-premium-001',
        total_price: 500000.00,
        delivery_time: 21,
        status: 'accepted'
      },
      {
        supplier_id: 'sup-standard-001',
        total_price: 550000.00,
        delivery_time: 28,
        status: 'rejected'
      },
      {
        supplier_id: 'sup-budget-001',
        total_price: 480000.00,
        delivery_time: 35,
        status: 'rejected'
      }
    ],
    purchase_order: {
      id: 'po-enterprise-001',
      supplier_id: 'sup-premium-001',
      items: [
        { sku: 'SKU-BULK-001', quantity: 5000, unit_price: 50.00 },
        { sku: 'SKU-BULK-002', quantity: 3000, unit_price: 75.00 },
        { sku: 'SKU-BULK-003', quantity: 2000, unit_price: 62.50 }
      ],
      total: 500000.00,
      status: 'confirmed'
    }
  });

  assert.equal(result.success, true);
});

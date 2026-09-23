import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Audit log schema
const auditLogSchema = z.object({
  id: z.string().or(z.number()),
  user_id: z.string().or(z.number()),
  organization_id: z.string().or(z.number()),
  action: z.string().min(1, 'action_required'),
  resource_type: z.string().min(1, 'resource_type_required'),
  resource_id: z.string().or(z.number()),
  changes: z.record(z.object({
    old_value: z.any().optional(),
    new_value: z.any().optional()
  })).optional(),
  status: z.enum(['success', 'failure']).default('success'),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  error_message: z.string().optional(),
  created_at: z.string().datetime('invalid_date')
});

test('audit log - validates required fields', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'create',
    resource_type: 'product',
    resource_id: 'prod-001',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - requires action', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: '',
    resource_type: 'product',
    resource_id: 'prod-001',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, false);
});

test('audit log - requires resource type', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'create',
    resource_type: '',
    resource_id: 'prod-001',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, false);
});

test('audit log - defaults status to success', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'create',
    resource_type: 'product',
    resource_id: 'prod-001',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'success');
  }
});

test('audit log - accepts failure status', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'delete',
    resource_type: 'order',
    resource_id: 'ord-001',
    status: 'failure',
    error_message: 'Order already shipped',
    created_at: '2024-06-01T10:05:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - with changes tracking', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'update',
    resource_type: 'product',
    resource_id: 'prod-001',
    changes: {
      price: { old_value: 100.00, new_value: 120.00 },
      status: { old_value: 'active', new_value: 'inactive' },
      stock: { old_value: 50, new_value: 45 }
    },
    created_at: '2024-06-01T10:10:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - with IP and user agent', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'login',
    resource_type: 'user',
    resource_id: 'user-001',
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    created_at: '2024-06-01T09:00:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - common actions', () => {
  const actions = [
    { action: 'create', resource_type: 'product' },
    { action: 'read', resource_type: 'order' },
    { action: 'update', resource_type: 'customer' },
    { action: 'delete', resource_type: 'invoice' },
    { action: 'export', resource_type: 'report' },
    { action: 'import', resource_type: 'inventory' },
    { action: 'approve', resource_type: 'rfq' },
    { action: 'reject', resource_type: 'payment' },
    { action: 'download', resource_type: 'document' },
    { action: 'share', resource_type: 'file' }
  ];

  for (const { action, resource_type } of actions) {
    const result = auditLogSchema.safeParse({
      id: 'audit-001',
      user_id: 'user-001',
      organization_id: 'org-001',
      action,
      resource_type,
      resource_id: 'res-001',
      created_at: '2024-06-01T10:00:00Z'
    });

    assert.equal(result.success, true);
  }
});

test('audit log - numeric and string IDs', () => {
  const numId = auditLogSchema.safeParse({
    id: 123,
    user_id: 456,
    organization_id: 789,
    action: 'create',
    resource_type: 'product',
    resource_id: 101112,
    created_at: '2024-06-01T10:00:00Z'
  });

  const stringId = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'create',
    resource_type: 'product',
    resource_id: 'prod-001',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(numId.success, true);
  assert.equal(stringId.success, true);
});

test('audit log - product creation', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-001',
    user_id: 'user-001',
    organization_id: 'org-001',
    action: 'create',
    resource_type: 'product',
    resource_id: 'prod-001',
    changes: {
      name: { new_value: 'New Product' },
      sku: { new_value: 'SKU-001' },
      price: { new_value: 99.99 }
    },
    status: 'success',
    ip_address: '192.168.1.1',
    created_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - order status update', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-002',
    user_id: 'user-002',
    organization_id: 'org-001',
    action: 'update',
    resource_type: 'order',
    resource_id: 'ord-001',
    changes: {
      status: { old_value: 'pending', new_value: 'shipped' },
      tracking_number: { new_value: '1Z999AA10123456784' }
    },
    status: 'success',
    created_at: '2024-06-01T11:00:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - failed authorization', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-003',
    user_id: 'user-999',
    organization_id: 'org-001',
    action: 'delete',
    resource_type: 'invoice',
    resource_id: 'inv-001',
    status: 'failure',
    error_message: 'Insufficient permissions',
    ip_address: '203.0.113.45',
    user_agent: 'curl/7.68.0',
    created_at: '2024-06-01T12:00:00Z'
  });

  assert.equal(result.success, true);
});

test('audit log - bulk operations', () => {
  const result = auditLogSchema.safeParse({
    id: 'audit-004',
    user_id: 'user-003',
    organization_id: 'org-001',
    action: 'bulk_update',
    resource_type: 'inventory',
    resource_id: 'batch-2024-06-01',
    changes: {
      records_updated: { new_value: 1000 },
      total_stock_change: { old_value: 5000, new_value: 6000 }
    },
    status: 'success',
    created_at: '2024-06-01T13:00:00Z'
  });

  assert.equal(result.success, true);
});

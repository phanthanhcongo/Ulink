import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Role schema
const roleSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1, 'name_required'),
  description: z.string().optional(),
  permissions: z.array(z.string()).default([]),
  status: z.enum(['active', 'inactive']).default('active'),
  is_system_role: z.boolean().optional().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Permission schema
const permissionSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1, 'name_required'),
  action: z.string().min(1, 'action_required'),
  resource: z.string().min(1, 'resource_required'),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('role - validates required fields', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Administrator'
  });

  assert.equal(result.success, true);
});

test('role - requires name', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: ''
  });

  assert.equal(result.success, false);
});

test('role - accepts description', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Administrator',
    description: 'Full system access'
  });

  assert.equal(result.success, true);
});

test('role - defaults permissions to empty array', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Viewer'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.permissions, []);
  }
});

test('role - accepts permissions array', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Editor',
    permissions: ['create_post', 'edit_post', 'delete_post']
  });

  assert.equal(result.success, true);
});

test('role - defaults status to active', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Moderator'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('role - accepts status values', () => {
  for (const status of ['active', 'inactive']) {
    const result = roleSchema.safeParse({
      id: 'role-001',
      name: 'Role',
      status
    });

    assert.equal(result.success, true);
  }
});

test('role - defaults is_system_role to false', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Custom Role'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.is_system_role, false);
  }
});

test('role - accepts is_system_role flag', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Administrator',
    is_system_role: true
  });

  assert.equal(result.success, true);
});

test('role - numeric and string IDs', () => {
  const result1 = roleSchema.safeParse({
    id: 123,
    name: 'Role'
  });

  const result2 = roleSchema.safeParse({
    id: 'role-001',
    name: 'Role'
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

test('role - full administrator role', () => {
  const result = roleSchema.safeParse({
    id: 'role-001',
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['manage_users', 'manage_roles', 'manage_products', 'manage_orders', 'manage_settings'],
    status: 'active',
    is_system_role: true
  });

  assert.equal(result.success, true);
});

test('permission - validates required fields', () => {
  const result = permissionSchema.safeParse({
    id: 'perm-001',
    name: 'Create Product',
    action: 'create',
    resource: 'product'
  });

  assert.equal(result.success, true);
});

test('permission - requires name', () => {
  const result = permissionSchema.safeParse({
    id: 'perm-001',
    name: '',
    action: 'create',
    resource: 'product'
  });

  assert.equal(result.success, false);
});

test('permission - requires action', () => {
  const result = permissionSchema.safeParse({
    id: 'perm-001',
    name: 'Create Product',
    action: '',
    resource: 'product'
  });

  assert.equal(result.success, false);
});

test('permission - requires resource', () => {
  const result = permissionSchema.safeParse({
    id: 'perm-001',
    name: 'Create Product',
    action: 'create',
    resource: ''
  });

  assert.equal(result.success, false);
});

test('permission - accepts description', () => {
  const result = permissionSchema.safeParse({
    id: 'perm-001',
    name: 'Create Product',
    action: 'create',
    resource: 'product',
    description: 'Allows users to create new products'
  });

  assert.equal(result.success, true);
});

test('permission - numeric and string IDs', () => {
  const result1 = permissionSchema.safeParse({
    id: 123,
    name: 'Read',
    action: 'read',
    resource: 'order'
  });

  const result2 = permissionSchema.safeParse({
    id: 'perm-001',
    name: 'Read',
    action: 'read',
    resource: 'order'
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

test('permission - various action and resource combinations', () => {
  const permissions = [
    { action: 'create', resource: 'product' },
    { action: 'read', resource: 'order' },
    { action: 'update', resource: 'customer' },
    { action: 'delete', resource: 'invoice' },
    { action: 'approve', resource: 'rfq' },
    { action: 'export', resource: 'report' }
  ];

  for (const perm of permissions) {
    const result = permissionSchema.safeParse({
      id: 'perm-001',
      name: `${perm.action} ${perm.resource}`,
      action: perm.action,
      resource: perm.resource
    });

    assert.equal(result.success, true);
  }
});

test('permission - full permission', () => {
  const result = permissionSchema.safeParse({
    id: 'perm-001',
    name: 'Manage Users',
    action: 'manage',
    resource: 'user',
    description: 'Create, read, update, and delete user accounts'
  });

  assert.equal(result.success, true);
});

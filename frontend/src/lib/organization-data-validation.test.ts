import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Organization schema
const organizationSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1, 'name_required'),
  slug: z.string().min(1, 'slug_required'),
  email: z.string().email('invalid_email'),
  phone: z.string().optional(),
  website: z.string().url('invalid_url').optional(),
  industry: z.string().optional(),
  size: z.enum(['startup', 'small', 'medium', 'enterprise']).optional(),
  country: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending', 'suspended']).default('pending'),
  verified: z.boolean().optional().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Team member schema
const teamMemberSchema = z.object({
  id: z.string().or(z.number()),
  organization_id: z.string().or(z.number()),
  user_id: z.string().or(z.number()),
  role: z.enum(['owner', 'admin', 'member', 'viewer']),
  email: z.string().email('invalid_email'),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  permissions: z.array(z.string()).optional().default([]),
  status: z.enum(['active', 'invited', 'inactive']).default('active'),
  joined_at: z.string().datetime('invalid_date').optional(),
  invited_at: z.string().datetime('invalid_date').optional()
});

test('organization - validates required fields', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Tech Company',
    slug: 'tech-company',
    email: 'contact@techcompany.com'
  });

  assert.equal(result.success, true);
});

test('organization - requires name', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: '',
    slug: 'org',
    email: 'contact@example.com'
  });

  assert.equal(result.success, false);
});

test('organization - requires valid email', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Company',
    slug: 'company',
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('organization - accepts optional website', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Company',
    slug: 'company',
    email: 'contact@example.com',
    website: 'https://example.com'
  });

  assert.equal(result.success, true);
});

test('organization - accepts all sizes', () => {
  for (const size of ['startup', 'small', 'medium', 'enterprise']) {
    const result = organizationSchema.safeParse({
      id: 'org-001',
      name: 'Company',
      slug: 'company',
      email: 'contact@example.com',
      size
    });

    assert.equal(result.success, true);
  }
});

test('organization - defaults status to pending', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Company',
    slug: 'company',
    email: 'contact@example.com'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('organization - defaults verified to false', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Company',
    slug: 'company',
    email: 'contact@example.com'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.verified, false);
  }
});

test('organization - full verified enterprise', () => {
  const result = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Enterprise Solutions',
    slug: 'enterprise-solutions',
    email: 'contact@enterprise.com',
    phone: '+1-800-555-0123',
    website: 'https://enterprise.com',
    industry: 'Technology',
    size: 'enterprise',
    country: 'United States',
    status: 'active',
    verified: true
  });

  assert.equal(result.success, true);
});

test('team member - validates required fields', () => {
  const result = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'admin',
    email: 'admin@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(result.success, true);
});

test('team member - accepts all roles', () => {
  for (const role of ['owner', 'admin', 'member', 'viewer']) {
    const result = teamMemberSchema.safeParse({
      id: 'member-001',
      organization_id: 'org-001',
      user_id: 'user-001',
      role,
      email: 'user@example.com',
      first_name: 'John',
      last_name: 'Doe'
    });

    assert.equal(result.success, true);
  }
});

test('team member - defaults status to active', () => {
  const result = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'member',
    email: 'member@example.com',
    first_name: 'Jane',
    last_name: 'Smith'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('team member - invited status', () => {
  const result = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'member',
    email: 'newmember@example.com',
    first_name: 'Bob',
    last_name: 'Wilson',
    status: 'invited',
    invited_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('team member - with permissions', () => {
  const result = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'admin',
    email: 'admin@example.com',
    first_name: 'Alice',
    last_name: 'Johnson',
    permissions: ['manage_team', 'manage_products', 'manage_orders']
  });

  assert.equal(result.success, true);
});

test('team member - defaults permissions to empty', () => {
  const result = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'viewer',
    email: 'viewer@example.com',
    first_name: 'Charlie',
    last_name: 'Brown'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.permissions, []);
  }
});

test('team member - owner with full permissions', () => {
  const result = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'owner',
    email: 'owner@example.com',
    first_name: 'David',
    last_name: 'Lee',
    permissions: ['all'],
    status: 'active',
    joined_at: '2024-01-01T00:00:00Z'
  });

  assert.equal(result.success, true);
});

test('organization - numeric and string IDs', () => {
  const numId = organizationSchema.safeParse({
    id: 123,
    name: 'Company',
    slug: 'company',
    email: 'contact@example.com'
  });

  const stringId = organizationSchema.safeParse({
    id: 'org-001',
    name: 'Company',
    slug: 'company',
    email: 'contact@example.com'
  });

  assert.equal(numId.success, true);
  assert.equal(stringId.success, true);
});

test('team member - numeric and string IDs', () => {
  const numId = teamMemberSchema.safeParse({
    id: 123,
    organization_id: 456,
    user_id: 789,
    role: 'member',
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  const stringId = teamMemberSchema.safeParse({
    id: 'member-001',
    organization_id: 'org-001',
    user_id: 'user-001',
    role: 'member',
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });

  assert.equal(numId.success, true);
  assert.equal(stringId.success, true);
});

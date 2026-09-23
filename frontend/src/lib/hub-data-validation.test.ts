import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Hub/Regional Center schema
const hubSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'name_required'),
  slug: z.string().min(1, 'slug_required'),
  location: z.string().min(1, 'location_required'),
  province: z.string().min(1, 'province_required'),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('invalid_email').optional(),
  status: z.enum(['active', 'inactive', 'planning']).default('active'),
  capacity: z.number().positive().optional(),
  services: z.array(z.string()).optional().default([])
});

test('hub - validates required fields', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hanoi Hub',
    slug: 'hanoi',
    location: 'Ha Nam Province',
    province: 'Ha Nam'
  });

  assert.equal(result.success, true);
});

test('hub - requires positive ID', () => {
  const result = hubSchema.safeParse({
    id: 0,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province'
  });

  assert.equal(result.success, false);
});

test('hub - requires name', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: '',
    slug: 'hub',
    location: 'Location',
    province: 'Province'
  });

  assert.equal(result.success, false);
});

test('hub - defaults status to active', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('hub - accepts all status values', () => {
  for (const status of ['active', 'inactive', 'planning']) {
    const result = hubSchema.safeParse({
      id: 1,
      name: 'Hub',
      slug: 'hub',
      location: 'Location',
      province: 'Province',
      status
    });

    assert.equal(result.success, true);
  }
});

test('hub - accepts optional email', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province',
    email: 'hub@example.com'
  });

  assert.equal(result.success, true);
});

test('hub - validates email format', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province',
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('hub - accepts optional phone', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province',
    phone: '+84243123456'
  });

  assert.equal(result.success, true);
});

test('hub - accepts capacity', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province',
    capacity: 10000
  });

  assert.equal(result.success, true);
});

test('hub - rejects zero capacity', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province',
    capacity: 0
  });

  assert.equal(result.success, false);
});

test('hub - accepts services array', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province',
    services: ['warehouse', 'packaging', 'logistics']
  });

  assert.equal(result.success, true);
});

test('hub - defaults empty services', () => {
  const result = hubSchema.safeParse({
    id: 1,
    name: 'Hub',
    slug: 'hub',
    location: 'Location',
    province: 'Province'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.services, []);
  }
});

test('hub - all Vietnam provinces', () => {
  const provinces = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Ha Nam', 'Hai Phong'];

  for (const province of provinces) {
    const result = hubSchema.safeParse({
      id: 1,
      name: `${province} Hub`,
      slug: province.toLowerCase(),
      location: province,
      province
    });

    assert.equal(result.success, true);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Settings/Configuration schema
const settingsSchema = z.object({
  id: z.string().or(z.number()),
  key: z.string().min(1, 'key_required'),
  value: z.string().or(z.number()).or(z.boolean()),
  category: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['string', 'number', 'boolean', 'json']).optional().default('string'),
  required: z.boolean().optional().default(false),
  editable: z.boolean().optional().default(true),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('settings - validates required fields', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My B2B Platform'
  });

  assert.equal(result.success, true);
});

test('settings - requires key', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: '',
    value: 'value'
  });

  assert.equal(result.success, false);
});

test('settings - accepts string values', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'Platform Name'
  });

  assert.equal(result.success, true);
});

test('settings - accepts numeric values', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'max_upload_size',
    value: 10485760
  });

  assert.equal(result.success, true);
});

test('settings - accepts boolean values', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'enable_notifications',
    value: true
  });

  assert.equal(result.success, true);
});

test('settings - accepts optional category', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Site',
    category: 'general'
  });

  assert.equal(result.success, true);
});

test('settings - accepts description', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Site',
    description: 'The name of the website shown to users'
  });

  assert.equal(result.success, true);
});

test('settings - defaults type to string', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Site'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.type, 'string');
  }
});

test('settings - accepts all type values', () => {
  const types = ['string', 'number', 'boolean', 'json'];

  for (const type of types) {
    const result = settingsSchema.safeParse({
      id: 'setting-001',
      key: 'test_key',
      value: 'test',
      type
    });

    assert.equal(result.success, true);
  }
});

test('settings - defaults required to false', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Site'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.required, false);
  }
});

test('settings - accepts required flag', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Site',
    required: true
  });

  assert.equal(result.success, true);
});

test('settings - defaults editable to true', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Site'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.editable, true);
  }
});

test('settings - accepts editable flag false', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'version',
    value: '1.0.0',
    editable: false
  });

  assert.equal(result.success, true);
});

test('settings - numeric and string IDs', () => {
  const result1 = settingsSchema.safeParse({
    id: 123,
    key: 'setting_key',
    value: 'value'
  });

  const result2 = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'setting_key',
    value: 'value'
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

test('settings - various key formats', () => {
  const keys = ['site_name', 'MAX_UPLOAD_SIZE', 'enable-notifications', 'apiKey'];

  for (const key of keys) {
    const result = settingsSchema.safeParse({
      id: 'setting-001',
      key,
      value: 'value'
    });

    assert.equal(result.success, true);
  }
});

test('settings - string setting', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My B2B Platform',
    category: 'general',
    description: 'The name of the website',
    type: 'string',
    required: true,
    editable: true
  });

  assert.equal(result.success, true);
});

test('settings - number setting', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-002',
    key: 'max_upload_size',
    value: 10485760,
    category: 'uploads',
    description: 'Maximum file upload size in bytes',
    type: 'number',
    required: true,
    editable: true
  });

  assert.equal(result.success, true);
});

test('settings - boolean setting', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-003',
    key: 'enable_api',
    value: true,
    category: 'features',
    description: 'Enable public API access',
    type: 'boolean',
    required: false,
    editable: true
  });

  assert.equal(result.success, true);
});

test('settings - system setting read-only', () => {
  const result = settingsSchema.safeParse({
    id: 'setting-004',
    key: 'system_version',
    value: '2.1.0',
    category: 'system',
    description: 'System version number',
    type: 'string',
    required: true,
    editable: false
  });

  assert.equal(result.success, true);
});

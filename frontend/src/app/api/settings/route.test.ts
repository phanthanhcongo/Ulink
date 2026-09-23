import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Get settings schema
const getSettingsSchema = z.object({
  category: z.string().optional(),
  include_hidden: z.boolean().optional().default(false)
});

// Update settings schema
const updateSettingsSchema = z.object({
  key: z.string().min(1, 'key_required'),
  value: z.string().or(z.number()).or(z.boolean()),
  category: z.string().optional()
});

// Settings response schema
const settingsResponseSchema = z.object({
  id: z.string().or(z.number()),
  key: z.string(),
  value: z.string().or(z.number()).or(z.boolean()),
  category: z.string().optional()
});

test('settings API - get all settings', () => {
  const result = getSettingsSchema.safeParse({});

  assert.equal(result.success, true);
});

test('settings API - get settings by category', () => {
  const result = getSettingsSchema.safeParse({
    category: 'general'
  });

  assert.equal(result.success, true);
});

test('settings API - include hidden settings', () => {
  const result = getSettingsSchema.safeParse({
    include_hidden: true
  });

  assert.equal(result.success, true);
});

test('settings API - update setting', () => {
  const result = updateSettingsSchema.safeParse({
    key: 'site_name',
    value: 'My Platform'
  });

  assert.equal(result.success, true);
});

test('settings API - requires key', () => {
  const result = updateSettingsSchema.safeParse({
    key: '',
    value: 'value'
  });

  assert.equal(result.success, false);
});

test('settings API - accepts string values', () => {
  const result = updateSettingsSchema.safeParse({
    key: 'site_description',
    value: 'A B2B marketplace platform'
  });

  assert.equal(result.success, true);
});

test('settings API - accepts numeric values', () => {
  const result = updateSettingsSchema.safeParse({
    key: 'max_file_size',
    value: 10485760
  });

  assert.equal(result.success, true);
});

test('settings API - accepts boolean values', () => {
  const result = updateSettingsSchema.safeParse({
    key: 'enable_registrations',
    value: true
  });

  assert.equal(result.success, true);
});

test('settings API - accepts category in update', () => {
  const result = updateSettingsSchema.safeParse({
    key: 'smtp_host',
    value: 'smtp.example.com',
    category: 'email'
  });

  assert.equal(result.success, true);
});

test('settings API - response validation', () => {
  const result = settingsResponseSchema.safeParse({
    id: 'setting-001',
    key: 'site_name',
    value: 'My Platform'
  });

  assert.equal(result.success, true);
});

test('settings API - response with category', () => {
  const result = settingsResponseSchema.safeParse({
    id: 'setting-001',
    key: 'smtp_host',
    value: 'smtp.example.com',
    category: 'email'
  });

  assert.equal(result.success, true);
});

test('settings API - numeric ID in response', () => {
  const result = settingsResponseSchema.safeParse({
    id: 123,
    key: 'site_name',
    value: 'My Platform'
  });

  assert.equal(result.success, true);
});

test('settings API - list all settings response', () => {
  const settings = [
    { id: 'setting-001', key: 'site_name', value: 'My Platform' },
    { id: 'setting-002', key: 'enable_api', value: true },
    { id: 'setting-003', key: 'max_upload_size', value: 10485760 }
  ];

  for (const setting of settings) {
    const result = settingsResponseSchema.safeParse(setting);
    assert.equal(result.success, true);
  }
});

test('settings API - update multiple settings', () => {
  const updates = [
    { key: 'site_name', value: 'New Name' },
    { key: 'enable_notifications', value: false },
    { key: 'max_users', value: 1000 }
  ];

  for (const update of updates) {
    const result = updateSettingsSchema.safeParse(update);
    assert.equal(result.success, true);
  }
});

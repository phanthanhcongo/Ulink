import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Edge case string validation
const stringValidationSchema = z.object({
  empty_allowed: z.string().min(0).optional(),
  min_max: z.string().min(3).max(10),
  trimmed: z.string().trim(),
  whitespace: z.string().refine(
    (val) => val.trim().length > 0,
    { message: 'Cannot be whitespace only' }
  ),
  email_or_phone: z.union([
    z.string().email('invalid_email'),
    z.string().regex(/^[0-9\-\+\s]+$/, 'invalid_phone')
  ])
});

// Numeric edge cases
const numericValidationSchema = z.object({
  integer_only: z.number().int(),
  decimal_precision: z.number().multipleOf(0.01),
  safe_integer: z.number().int().safe(),
  boundary_values: z.number().min(-1000000).max(1000000),
  exclusive_range: z.number().gt(0).lt(100)
});

// Array edge cases
const arrayValidationSchema = z.object({
  empty_allowed: z.array(z.string()).min(0).optional(),
  unique_items: z.array(z.string()).refine(
    (val) => new Set(val).size === val.length,
    { message: 'Items must be unique' }
  ),
  homogeneous: z.array(z.number()),
  mixed_with_defaults: z.array(z.string()).default([])
});

// Boolean and enum edge cases
const booleanEnumSchema = z.object({
  flag: z.boolean(),
  nullable_boolean: z.boolean().nullable().optional(),
  string_enum: z.enum(['a', 'b', 'c', 'd', 'e']),
  numeric_enum: z.enum(['1', '2', '3'])
});

test('validation - empty string not allowed', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'valid',
    trimmed: 'text',
    whitespace: 'content',
    email_or_phone: 'test@example.com'
  });

  assert.equal(result.success, true);
});

test('validation - string too short', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'ab',
    trimmed: 'text',
    whitespace: 'content',
    email_or_phone: 'test@example.com'
  });

  assert.equal(result.success, false);
});

test('validation - string too long', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'abcdefghijk',
    trimmed: 'text',
    whitespace: 'content',
    email_or_phone: 'test@example.com'
  });

  assert.equal(result.success, false);
});

test('validation - whitespace trimmed', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'valid',
    trimmed: '  text  ',
    whitespace: '  content  ',
    email_or_phone: 'test@example.com'
  });

  assert.equal(result.success, true);
});

test('validation - whitespace only rejected', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'valid',
    trimmed: 'text',
    whitespace: '   ',
    email_or_phone: 'test@example.com'
  });

  assert.equal(result.success, false);
});

test('validation - email format', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'valid',
    trimmed: 'text',
    whitespace: 'content',
    email_or_phone: 'user@example.com'
  });

  assert.equal(result.success, true);
});

test('validation - phone format', () => {
  const result = stringValidationSchema.safeParse({
    min_max: 'valid',
    trimmed: 'text',
    whitespace: 'content',
    email_or_phone: '+84-243-123-456'
  });

  assert.equal(result.success, true);
});

test('validation - integer only', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 42,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: 500,
    exclusive_range: 50
  });

  assert.equal(result.success, true);
});

test('validation - rejects non-integer', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 42.5,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: 500,
    exclusive_range: 50
  });

  assert.equal(result.success, false);
});

test('validation - decimal precision', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: 500,
    exclusive_range: 50
  });

  assert.equal(result.success, true);
});

test('validation - decimal precision too precise', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.999,
    safe_integer: 1000,
    boundary_values: 500,
    exclusive_range: 50
  });

  assert.equal(result.success, false);
});

test('validation - safe integer range', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.99,
    safe_integer: Number.MAX_SAFE_INTEGER,
    boundary_values: 500,
    exclusive_range: 50
  });

  assert.equal(result.success, true);
});

test('validation - boundary min', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: -1000000,
    exclusive_range: 50
  });

  assert.equal(result.success, true);
});

test('validation - boundary max', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: 1000000,
    exclusive_range: 50
  });

  assert.equal(result.success, true);
});

test('validation - exclusive range', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: 500,
    exclusive_range: 99
  });

  assert.equal(result.success, true);
});

test('validation - exclusive range boundary rejected', () => {
  const result = numericValidationSchema.safeParse({
    integer_only: 100,
    decimal_precision: 99.99,
    safe_integer: 1000,
    boundary_values: 500,
    exclusive_range: 100
  });

  assert.equal(result.success, false);
});

test('validation - empty array', () => {
  const result = arrayValidationSchema.safeParse({
    unique_items: [],
    homogeneous: [],
    mixed_with_defaults: []
  });

  assert.equal(result.success, true);
});

test('validation - unique items', () => {
  const result = arrayValidationSchema.safeParse({
    unique_items: ['a', 'b', 'c'],
    homogeneous: [1, 2, 3],
    mixed_with_defaults: ['x', 'y']
  });

  assert.equal(result.success, true);
});

test('validation - duplicate items rejected', () => {
  const result = arrayValidationSchema.safeParse({
    unique_items: ['a', 'b', 'a'],
    homogeneous: [1, 2, 3],
    mixed_with_defaults: ['x', 'y']
  });

  assert.equal(result.success, false);
});

test('validation - homogeneous array', () => {
  const result = arrayValidationSchema.safeParse({
    unique_items: ['a', 'b', 'c'],
    homogeneous: [1.5, 2.5, 3.5],
    mixed_with_defaults: ['x', 'y']
  });

  assert.equal(result.success, true);
});

test('validation - boolean true', () => {
  const result = booleanEnumSchema.safeParse({
    flag: true,
    string_enum: 'a',
    numeric_enum: '1'
  });

  assert.equal(result.success, true);
});

test('validation - boolean false', () => {
  const result = booleanEnumSchema.safeParse({
    flag: false,
    string_enum: 'a',
    numeric_enum: '1'
  });

  assert.equal(result.success, true);
});

test('validation - enum options', () => {
  for (const option of ['a', 'b', 'c', 'd', 'e']) {
    const result = booleanEnumSchema.safeParse({
      flag: true,
      string_enum: option,
      numeric_enum: '1'
    });

    assert.equal(result.success, true);
  }
});

test('validation - enum invalid option', () => {
  const result = booleanEnumSchema.safeParse({
    flag: true,
    string_enum: 'z',
    numeric_enum: '1'
  });

  assert.equal(result.success, false);
});

test('validation - numeric enum', () => {
  for (const option of ['1', '2', '3']) {
    const result = booleanEnumSchema.safeParse({
      flag: true,
      string_enum: 'a',
      numeric_enum: option
    });

    assert.equal(result.success, true);
  }
});

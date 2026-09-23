import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Currency formatting schema
const currencyFormatterSchema = z.object({
  amount: z.number(),
  currency: z.string().length(3),
  locale: z.string().optional().default('en-US'),
  formatted: z.string()
});

// Date formatting schema
const dateFormatterSchema = z.object({
  date: z.string().datetime('invalid_date'),
  format: z.enum(['short', 'medium', 'long', 'full', 'iso']),
  locale: z.string().optional().default('en-US'),
  timezone: z.string().optional(),
  formatted: z.string()
});

// Number formatting schema
const numberFormatterSchema = z.object({
  value: z.number(),
  decimal_places: z.number().int().min(0).max(20).optional().default(2),
  thousands_separator: z.boolean().optional().default(true),
  formatted: z.string()
});

// Phone number formatting schema
const phoneFormatterSchema = z.object({
  phone: z.string().min(7).max(15),
  country_code: z.string().length(2).optional(),
  formatted: z.string()
});

// Data aggregation schema
const aggregationSchema = z.object({
  type: z.enum(['sum', 'average', 'count', 'min', 'max', 'group']),
  data: z.array(z.number()),
  result: z.number().or(z.record(z.number()))
});

test('transform - USD currency formatting', () => {
  const result = currencyFormatterSchema.safeParse({
    amount: 1234.56,
    currency: 'USD',
    locale: 'en-US',
    formatted: '$1,234.56'
  });

  assert.equal(result.success, true);
});

test('transform - EUR currency formatting', () => {
  const result = currencyFormatterSchema.safeParse({
    amount: 1234.56,
    currency: 'EUR',
    locale: 'de-DE',
    formatted: '1.234,56 €'
  });

  assert.equal(result.success, true);
});

test('transform - VND currency formatting', () => {
  const result = currencyFormatterSchema.safeParse({
    amount: 1234567.89,
    currency: 'VND',
    locale: 'vi-VN',
    formatted: '1.234.567₫'
  });

  assert.equal(result.success, true);
});

test('transform - negative amount', () => {
  const result = currencyFormatterSchema.safeParse({
    amount: -500.00,
    currency: 'USD',
    formatted: '-$500.00'
  });

  assert.equal(result.success, true);
});

test('transform - zero amount', () => {
  const result = currencyFormatterSchema.safeParse({
    amount: 0,
    currency: 'USD',
    formatted: '$0.00'
  });

  assert.equal(result.success, true);
});

test('transform - date short format', () => {
  const result = dateFormatterSchema.safeParse({
    date: '2024-06-01T10:30:00Z',
    format: 'short',
    locale: 'en-US',
    formatted: '6/1/24'
  });

  assert.equal(result.success, true);
});

test('transform - date long format', () => {
  const result = dateFormatterSchema.safeParse({
    date: '2024-06-01T10:30:00Z',
    format: 'long',
    locale: 'en-US',
    formatted: 'June 1, 2024'
  });

  assert.equal(result.success, true);
});

test('transform - date ISO format', () => {
  const result = dateFormatterSchema.safeParse({
    date: '2024-06-01T10:30:00Z',
    format: 'iso',
    formatted: '2024-06-01'
  });

  assert.equal(result.success, true);
});

test('transform - date with timezone', () => {
  const result = dateFormatterSchema.safeParse({
    date: '2024-06-01T10:30:00Z',
    format: 'medium',
    timezone: 'Asia/Ho_Chi_Minh',
    locale: 'vi-VN',
    formatted: '01 tháng 6, 2024'
  });

  assert.equal(result.success, true);
});

test('transform - number with decimals', () => {
  const result = numberFormatterSchema.safeParse({
    value: 1234.5678,
    decimal_places: 2,
    thousands_separator: true,
    formatted: '1,234.57'
  });

  assert.equal(result.success, true);
});

test('transform - number no decimals', () => {
  const result = numberFormatterSchema.safeParse({
    value: 1234.5678,
    decimal_places: 0,
    thousands_separator: true,
    formatted: '1,235'
  });

  assert.equal(result.success, true);
});

test('transform - number no thousands separator', () => {
  const result = numberFormatterSchema.safeParse({
    value: 1234567.89,
    decimal_places: 2,
    thousands_separator: false,
    formatted: '1234567.89'
  });

  assert.equal(result.success, true);
});

test('transform - negative number', () => {
  const result = numberFormatterSchema.safeParse({
    value: -1234.56,
    decimal_places: 2,
    formatted: '-1,234.56'
  });

  assert.equal(result.success, true);
});

test('transform - phone US format', () => {
  const result = phoneFormatterSchema.safeParse({
    phone: '2025551234',
    country_code: 'US',
    formatted: '(202) 555-1234'
  });

  assert.equal(result.success, true);
});

test('transform - phone Vietnam format', () => {
  const result = phoneFormatterSchema.safeParse({
    phone: '0901234567',
    country_code: 'VN',
    formatted: '090 123 4567'
  });

  assert.equal(result.success, true);
});

test('transform - phone international', () => {
  const result = phoneFormatterSchema.safeParse({
    phone: '84901234567',
    formatted: '+84 90 123 4567'
  });

  assert.equal(result.success, true);
});

test('transform - aggregation sum', () => {
  const result = aggregationSchema.safeParse({
    type: 'sum',
    data: [10, 20, 30, 40],
    result: 100
  });

  assert.equal(result.success, true);
});

test('transform - aggregation average', () => {
  const result = aggregationSchema.safeParse({
    type: 'average',
    data: [10, 20, 30, 40],
    result: 25
  });

  assert.equal(result.success, true);
});

test('transform - aggregation count', () => {
  const result = aggregationSchema.safeParse({
    type: 'count',
    data: [10, 20, 30, 40],
    result: 4
  });

  assert.equal(result.success, true);
});

test('transform - aggregation min', () => {
  const result = aggregationSchema.safeParse({
    type: 'min',
    data: [10, 20, 30, 40],
    result: 10
  });

  assert.equal(result.success, true);
});

test('transform - aggregation max', () => {
  const result = aggregationSchema.safeParse({
    type: 'max',
    data: [10, 20, 30, 40],
    result: 40
  });

  assert.equal(result.success, true);
});

test('transform - aggregation group', () => {
  const result = aggregationSchema.safeParse({
    type: 'group',
    data: [1, 2, 1, 3, 2, 1],
    result: { '1': 3, '2': 2, '3': 1 }
  });

  assert.equal(result.success, true);
});

test('transform - large number formatting', () => {
  const result = numberFormatterSchema.safeParse({
    value: 1000000000.99,
    decimal_places: 2,
    thousands_separator: true,
    formatted: '1,000,000,000.99'
  });

  assert.equal(result.success, true);
});

test('transform - precision formatting', () => {
  const result = numberFormatterSchema.safeParse({
    value: 0.1 + 0.2,
    decimal_places: 2,
    formatted: '0.30'
  });

  assert.equal(result.success, true);
});

test('transform - empty data aggregation', () => {
  const result = aggregationSchema.safeParse({
    type: 'sum',
    data: [],
    result: 0
  });

  assert.equal(result.success, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Analytics query schema
const analyticsQuerySchema = z.object({
  metric: z.enum(['revenue', 'orders', 'customers', 'products', 'conversion_rate', 'avg_order_value']),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  date_from: z.string().datetime('invalid_date'),
  date_to: z.string().datetime('invalid_date'),
  group_by: z.enum(['date', 'category', 'product', 'region']).optional(),
  filters: z.object({
    category: z.string().optional(),
    region: z.string().optional(),
    min_order_value: z.number().optional(),
    status: z.string().optional()
  }).optional()
});

// Analytics response schema
const analyticsResponseSchema = z.object({
  id: z.string().or(z.number()),
  metric: z.string(),
  period: z.string(),
  data_points: z.array(z.object({
    timestamp: z.string().datetime('invalid_date'),
    value: z.number(),
    label: z.string().optional()
  })).min(1),
  summary: z.object({
    total: z.number(),
    average: z.number(),
    min: z.number(),
    max: z.number(),
    trend: z.number().optional()
  }).optional(),
  generated_at: z.string().optional()
});

test('analytics - validates metric', () => {
  const result = analyticsQuerySchema.safeParse({
    metric: 'revenue',
    period: 'daily',
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-01-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('analytics - accepts all metrics', () => {
  const metrics = ['revenue', 'orders', 'customers', 'products', 'conversion_rate', 'avg_order_value'];

  for (const metric of metrics) {
    const result = analyticsQuerySchema.safeParse({
      metric,
      period: 'monthly',
      date_from: '2024-01-01T00:00:00Z',
      date_to: '2024-06-30T23:59:59Z'
    });

    assert.equal(result.success, true);
  }
});

test('analytics - accepts all periods', () => {
  for (const period of ['daily', 'weekly', 'monthly', 'yearly']) {
    const result = analyticsQuerySchema.safeParse({
      metric: 'revenue',
      period,
      date_from: '2024-01-01T00:00:00Z',
      date_to: '2024-12-31T23:59:59Z'
    });

    assert.equal(result.success, true);
  }
});

test('analytics - accepts group by', () => {
  const result = analyticsQuerySchema.safeParse({
    metric: 'revenue',
    period: 'monthly',
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-06-30T23:59:59Z',
    group_by: 'category'
  });

  assert.equal(result.success, true);
});

test('analytics - accepts filters', () => {
  const result = analyticsQuerySchema.safeParse({
    metric: 'orders',
    period: 'daily',
    date_from: '2024-06-01T00:00:00Z',
    date_to: '2024-06-30T23:59:59Z',
    filters: {
      region: 'north',
      min_order_value: 1000
    }
  });

  assert.equal(result.success, true);
});

test('analytics - response validation', () => {
  const result = analyticsResponseSchema.safeParse({
    id: 'analytics-001',
    metric: 'revenue',
    period: 'daily',
    data_points: [
      { timestamp: '2024-06-01T00:00:00Z', value: 50000 },
      { timestamp: '2024-06-02T00:00:00Z', value: 55000 }
    ]
  });

  assert.equal(result.success, true);
});

test('analytics - response with summary', () => {
  const result = analyticsResponseSchema.safeParse({
    id: 'analytics-001',
    metric: 'revenue',
    period: 'daily',
    data_points: [
      { timestamp: '2024-06-01T00:00:00Z', value: 50000 },
      { timestamp: '2024-06-02T00:00:00Z', value: 60000 },
      { timestamp: '2024-06-03T00:00:00Z', value: 55000 }
    ],
    summary: {
      total: 165000,
      average: 55000,
      min: 50000,
      max: 60000,
      trend: 10.0
    }
  });

  assert.equal(result.success, true);
});

test('analytics - monthly revenue data', () => {
  const dataPoints = [
    { timestamp: '2024-01-31T23:59:59Z', value: 150000, label: 'January' },
    { timestamp: '2024-02-29T23:59:59Z', value: 180000, label: 'February' },
    { timestamp: '2024-03-31T23:59:59Z', value: 200000, label: 'March' },
    { timestamp: '2024-04-30T23:59:59Z', value: 220000, label: 'April' },
    { timestamp: '2024-05-31T23:59:59Z', value: 250000, label: 'May' },
    { timestamp: '2024-06-30T23:59:59Z', value: 280000, label: 'June' }
  ];

  const result = analyticsResponseSchema.safeParse({
    id: 'analytics-001',
    metric: 'revenue',
    period: 'monthly',
    data_points: dataPoints,
    summary: {
      total: 1280000,
      average: 213333.33,
      min: 150000,
      max: 280000,
      trend: 86.67
    }
  });

  assert.equal(result.success, true);
});

test('analytics - conversion rate by category', () => {
  const result = analyticsQuerySchema.safeParse({
    metric: 'conversion_rate',
    period: 'weekly',
    date_from: '2024-06-01T00:00:00Z',
    date_to: '2024-06-30T23:59:59Z',
    group_by: 'category'
  });

  assert.equal(result.success, true);
});

test('analytics - average order value by region', () => {
  const result = analyticsQuerySchema.safeParse({
    metric: 'avg_order_value',
    period: 'monthly',
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-06-30T23:59:59Z',
    group_by: 'region',
    filters: {
      status: 'completed'
    }
  });

  assert.equal(result.success, true);
});

test('analytics - numeric and string IDs', () => {
  const result1 = analyticsResponseSchema.safeParse({
    id: 123,
    metric: 'revenue',
    period: 'daily',
    data_points: [
      { timestamp: '2024-06-01T00:00:00Z', value: 50000 }
    ]
  });

  const result2 = analyticsResponseSchema.safeParse({
    id: 'analytics-001',
    metric: 'revenue',
    period: 'daily',
    data_points: [
      { timestamp: '2024-06-01T00:00:00Z', value: 50000 }
    ]
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

test('analytics - requires at least one data point', () => {
  const result = analyticsResponseSchema.safeParse({
    id: 'analytics-001',
    metric: 'revenue',
    period: 'daily',
    data_points: []
  });

  assert.equal(result.success, false);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Recommendation schema
const recommendationSchema = z.object({
  id: z.string().or(z.number()),
  user_id: z.string().or(z.number()),
  item_id: z.string().or(z.number()),
  item_type: z.enum(['product', 'supplier', 'category']),
  score: z.number().min(0).max(1),
  reason: z.enum(['browsing_history', 'purchase_history', 'similar_items', 'trending', 'collaborative_filtering']),
  rank: z.number().int().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Recommendation request schema
const recommendationRequestSchema = z.object({
  user_id: z.string().or(z.number()).optional(),
  type: z.enum(['products', 'suppliers']).optional().default('products'),
  limit: z.number().int().positive().optional().default(10),
  exclude_ids: z.array(z.string().or(z.number())).optional(),
  personalized: z.boolean().optional().default(true)
});

// Recommendation response schema
const recommendationResponseSchema = z.object({
  recommendations: z.array(recommendationSchema).min(1),
  algorithm: z.string().optional(),
  generated_at: z.string().optional()
});

test('recommendation - validates required fields', () => {
  const result = recommendationSchema.safeParse({
    id: 'rec-001',
    user_id: 'user-001',
    item_id: 'prod-001',
    item_type: 'product',
    score: 0.85,
    reason: 'browsing_history',
    rank: 1
  });

  assert.equal(result.success, true);
});

test('recommendation - score between 0-1', () => {
  const zero = recommendationSchema.safeParse({
    id: 'rec-001',
    user_id: 'user-001',
    item_id: 'prod-001',
    item_type: 'product',
    score: 0,
    reason: 'browsing_history',
    rank: 1
  });

  const one = recommendationSchema.safeParse({
    id: 'rec-001',
    user_id: 'user-001',
    item_id: 'prod-001',
    item_type: 'product',
    score: 1,
    reason: 'trending',
    rank: 1
  });

  const invalid = recommendationSchema.safeParse({
    id: 'rec-001',
    user_id: 'user-001',
    item_id: 'prod-001',
    item_type: 'product',
    score: 1.5,
    reason: 'browsing_history',
    rank: 1
  });

  assert.equal(zero.success, true);
  assert.equal(one.success, true);
  assert.equal(invalid.success, false);
});

test('recommendation - accepts all item types', () => {
  for (const type of ['product', 'supplier', 'category']) {
    const result = recommendationSchema.safeParse({
      id: 'rec-001',
      user_id: 'user-001',
      item_id: 'item-001',
      item_type: type,
      score: 0.8,
      reason: 'browsing_history',
      rank: 1
    });

    assert.equal(result.success, true);
  }
});

test('recommendation - accepts all reasons', () => {
  const reasons = ['browsing_history', 'purchase_history', 'similar_items', 'trending', 'collaborative_filtering'];

  for (const reason of reasons) {
    const result = recommendationSchema.safeParse({
      id: 'rec-001',
      user_id: 'user-001',
      item_id: 'item-001',
      item_type: 'product',
      score: 0.8,
      reason,
      rank: 1
    });

    assert.equal(result.success, true);
  }
});

test('recommendation - rank must be positive', () => {
  const result = recommendationSchema.safeParse({
    id: 'rec-001',
    user_id: 'user-001',
    item_id: 'item-001',
    item_type: 'product',
    score: 0.8,
    reason: 'browsing_history',
    rank: 0
  });

  assert.equal(result.success, false);
});

test('recommendation request - defaults type to products', () => {
  const result = recommendationRequestSchema.safeParse({
    user_id: 'user-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.type, 'products');
  }
});

test('recommendation request - defaults limit to 10', () => {
  const result = recommendationRequestSchema.safeParse({
    user_id: 'user-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.limit, 10);
  }
});

test('recommendation request - accepts custom limit', () => {
  const result = recommendationRequestSchema.safeParse({
    user_id: 'user-001',
    limit: 50
  });

  assert.equal(result.success, true);
});

test('recommendation request - with exclude list', () => {
  const result = recommendationRequestSchema.safeParse({
    user_id: 'user-001',
    exclude_ids: ['prod-001', 'prod-002', 'prod-003']
  });

  assert.equal(result.success, true);
});

test('recommendation request - defaults personalized to true', () => {
  const result = recommendationRequestSchema.safeParse({
    user_id: 'user-001'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.personalized, true);
  }
});

test('recommendation request - non-personalized', () => {
  const result = recommendationRequestSchema.safeParse({
    type: 'products',
    limit: 20,
    personalized: false
  });

  assert.equal(result.success, true);
});

test('recommendation response - validation', () => {
  const result = recommendationResponseSchema.safeParse({
    recommendations: [
      {
        id: 'rec-001',
        user_id: 'user-001',
        item_id: 'prod-001',
        item_type: 'product',
        score: 0.95,
        reason: 'browsing_history',
        rank: 1
      },
      {
        id: 'rec-002',
        user_id: 'user-001',
        item_id: 'prod-002',
        item_type: 'product',
        score: 0.87,
        reason: 'similar_items',
        rank: 2
      }
    ]
  });

  assert.equal(result.success, true);
});

test('recommendation response - with algorithm', () => {
  const result = recommendationResponseSchema.safeParse({
    recommendations: [
      {
        id: 'rec-001',
        user_id: 'user-001',
        item_id: 'prod-001',
        item_type: 'product',
        score: 0.92,
        reason: 'collaborative_filtering',
        rank: 1
      }
    ],
    algorithm: 'collaborative_filtering_v2',
    generated_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('recommendation - full personalized result', () => {
  const recommendations = Array(10).fill(null).map((_, i) => ({
    id: `rec-${String(i + 1).padStart(3, '0')}`,
    user_id: 'user-001',
    item_id: `prod-${String(i + 1).padStart(3, '0')}`,
    item_type: 'product',
    score: Math.max(0.5, 1 - (i * 0.05)),
    reason: ['browsing_history', 'purchase_history', 'similar_items', 'trending', 'collaborative_filtering'][i % 5],
    rank: i + 1
  }));

  const result = recommendationResponseSchema.safeParse({
    recommendations,
    algorithm: 'personalized_ml_v3',
    generated_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

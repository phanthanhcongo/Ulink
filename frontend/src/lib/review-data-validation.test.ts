import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Review/Rating schema
const reviewSchema = z.object({
  id: z.string().or(z.number()),
  product_id: z.string().or(z.number()),
  supplier_id: z.string().or(z.number()).optional(),
  customer_id: z.string().or(z.number()),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  verified_purchase: z.boolean().optional().default(false),
  helpful_count: z.number().int().nonnegative().optional().default(0),
  unhelpful_count: z.number().int().nonnegative().optional().default(0),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('review - validates required fields', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Excellent product',
    content: 'This product exceeded all my expectations'
  });

  assert.equal(result.success, true);
});

test('review - requires rating between 1-5', () => {
  const zeroRating = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 0,
    title: 'Review',
    content: 'Content'
  });

  const sixRating = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 6,
    title: 'Review',
    content: 'Content'
  });

  assert.equal(zeroRating.success, false);
  assert.equal(sixRating.success, false);
});

test('review - accepts all ratings 1-5', () => {
  for (let rating = 1; rating <= 5; rating++) {
    const result = reviewSchema.safeParse({
      id: 'rev-001',
      product_id: 'prod-001',
      customer_id: 'cust-001',
      rating,
      title: 'Review',
      content: 'Content here'
    });

    assert.equal(result.success, true);
  }
});

test('review - requires title', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: '',
    content: 'Content'
  });

  assert.equal(result.success, false);
});

test('review - requires content', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Title',
    content: ''
  });

  assert.equal(result.success, false);
});

test('review - title max 100 characters', () => {
  const shortTitle = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Good product',
    content: 'Content'
  });

  const longTitle = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'a'.repeat(101),
    content: 'Content'
  });

  assert.equal(shortTitle.success, true);
  assert.equal(longTitle.success, false);
});

test('review - content max 1000 characters', () => {
  const shortContent = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Short content'
  });

  const longContent = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'a'.repeat(1001)
  });

  assert.equal(shortContent.success, true);
  assert.equal(longContent.success, false);
});

test('review - defaults verified purchase to false', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.verified_purchase, false);
  }
});

test('review - accepts verified purchase flag', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content',
    verified_purchase: true
  });

  assert.equal(result.success, true);
});

test('review - accepts optional supplier ID', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    supplier_id: 'sup-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content'
  });

  assert.equal(result.success, true);
});

test('review - defaults helpful count to 0', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.helpful_count, 0);
  }
});

test('review - accepts helpful count', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content',
    helpful_count: 42
  });

  assert.equal(result.success, true);
});

test('review - defaults unhelpful count to 0', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.unhelpful_count, 0);
  }
});

test('review - rejects negative helpful count', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content',
    helpful_count: -1
  });

  assert.equal(result.success, false);
});

test('review - defaults status to pending', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Review',
    content: 'Content'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('review - accepts all status values', () => {
  for (const status of ['pending', 'approved', 'rejected']) {
    const result = reviewSchema.safeParse({
      id: 'rev-001',
      product_id: 'prod-001',
      customer_id: 'cust-001',
      rating: 5,
      title: 'Review',
      content: 'Content',
      status
    });

    assert.equal(result.success, true);
  }
});

test('review - full approved review', () => {
  const result = reviewSchema.safeParse({
    id: 'rev-001',
    product_id: 'prod-001',
    supplier_id: 'sup-001',
    customer_id: 'cust-001',
    rating: 5,
    title: 'Outstanding Quality and Service',
    content: 'This product is exactly what we needed for our business. The quality is exceptional and the supplier provided excellent customer service throughout the entire process.',
    verified_purchase: true,
    helpful_count: 127,
    unhelpful_count: 3,
    status: 'approved'
  });

  assert.equal(result.success, true);
});

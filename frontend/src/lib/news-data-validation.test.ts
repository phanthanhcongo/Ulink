import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// News/Article schema
const newsSchema = z.object({
  id: z.string().or(z.number()),
  title: z.string().min(1, 'title_required'),
  slug: z.string().min(1, 'slug_required'),
  content: z.string().min(1, 'content_required'),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  featured_image: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  published_at: z.string().datetime('invalid_date').optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  tags: z.array(z.string()).optional().default([])
});

test('news - validates required fields', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'Breaking News',
    slug: 'breaking-news',
    content: 'This is the news content'
  });

  assert.equal(result.success, true);
});

test('news - requires title', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: '',
    slug: 'news',
    content: 'Content here'
  });

  assert.equal(result.success, false);
});

test('news - requires slug', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: '',
    content: 'Content here'
  });

  assert.equal(result.success, false);
});

test('news - requires content', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: ''
  });

  assert.equal(result.success, false);
});

test('news - defaults status to draft', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'draft');
  }
});

test('news - accepts all status values', () => {
  for (const status of ['draft', 'published', 'archived']) {
    const result = newsSchema.safeParse({
      id: 'news-001',
      title: 'News',
      slug: 'news',
      content: 'Content',
      status
    });

    assert.equal(result.success, true);
  }
});

test('news - accepts optional author', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content',
    author: 'John Reporter'
  });

  assert.equal(result.success, true);
});

test('news - accepts optional category', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content',
    category: 'Technology'
  });

  assert.equal(result.success, true);
});

test('news - accepts featured image', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content',
    featured_image: '/images/news-cover.jpg'
  });

  assert.equal(result.success, true);
});

test('news - accepts excerpt', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Full content here',
    excerpt: 'Brief summary...'
  });

  assert.equal(result.success, true);
});

test('news - validates published_at datetime format', () => {
  const validResult = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content',
    published_at: '2024-06-15T10:30:00Z'
  });

  const invalidResult = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content',
    published_at: '2024-06-15'
  });

  assert.equal(validResult.success, true);
  assert.equal(invalidResult.success, false);
});

test('news - accepts tags array', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content',
    tags: ['tech', 'industry', 'innovation']
  });

  assert.equal(result.success, true);
});

test('news - defaults empty tags', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'News',
    slug: 'news',
    content: 'Content'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.tags, []);
  }
});

test('news - numeric or string ID', () => {
  const withNumId = newsSchema.safeParse({
    id: 123,
    title: 'News',
    slug: 'news',
    content: 'Content'
  });

  const withStringId = newsSchema.safeParse({
    id: 'news-123',
    title: 'News',
    slug: 'news',
    content: 'Content'
  });

  assert.equal(withNumId.success, true);
  assert.equal(withStringId.success, true);
});

test('news - full published article', () => {
  const result = newsSchema.safeParse({
    id: 'news-001',
    title: 'Major Breakthrough in B2B Commerce',
    slug: 'major-breakthrough-b2b',
    content: 'This is a detailed article about B2B commerce innovations...',
    excerpt: 'New partnership opens doors for exporters',
    author: 'Jane Journalist',
    category: 'Business',
    featured_image: '/images/business-news.jpg',
    status: 'published',
    published_at: '2024-06-15T09:00:00Z',
    tags: ['business', 'partnership', 'exporter']
  });

  assert.equal(result.success, true);
});

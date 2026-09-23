import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Blog post schema validation
const blogPostSchema = z.object({
  id: z.number(),
  status: z.enum(['published', 'draft', 'archived']),
  slug: z.string().min(1),
  cover: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  author_role: z.string().optional().nullable(),
  author_avatar: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  published_at: z.string().optional().nullable(),
});

const blogTranslationSchema = z.object({
  languages_code: z.string(),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
});

test('blog post validates required fields', () => {
  const validPost = {
    id: 1,
    status: 'published',
    slug: 'my-blog-post'
  };

  const result = blogPostSchema.safeParse(validPost);
  assert.equal(result.success, true);
});

test('blog post rejects invalid status', () => {
  const invalidPost = {
    id: 1,
    status: 'scheduled',
    slug: 'post'
  };

  const result = blogPostSchema.safeParse(invalidPost);
  assert.equal(result.success, false);
});

test('blog post requires slug', () => {
  const result = blogPostSchema.safeParse({
    id: 1,
    status: 'published',
    slug: ''
  });

  assert.equal(result.success, false);
});

test('blog post accepts optional fields', () => {
  const result = blogPostSchema.safeParse({
    id: 1,
    status: 'published',
    slug: 'post',
    author: 'John Doe',
    author_role: 'Editor',
    category: 'Tech',
    published_at: '2024-01-15T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('blog post allows null optional fields', () => {
  const result = blogPostSchema.safeParse({
    id: 1,
    status: 'published',
    slug: 'post',
    author: null,
    cover: null
  });

  assert.equal(result.success, true);
});

test('blog translation requires title', () => {
  const result = blogTranslationSchema.safeParse({
    languages_code: 'en',
    title: ''
  });

  assert.equal(result.success, false);
});

test('blog translation accepts valid data', () => {
  const result = blogTranslationSchema.safeParse({
    languages_code: 'en',
    title: 'My Blog Post',
    description: 'A great post',
    body: 'Full content here',
    meta_title: 'SEO Title',
    meta_description: 'SEO Description'
  });

  assert.equal(result.success, true);
});

test('blog translation allows null descriptions', () => {
  const result = blogTranslationSchema.safeParse({
    languages_code: 'vi',
    title: 'Bài viết của tôi',
    description: null,
    body: null
  });

  assert.equal(result.success, true);
});

test('blog post with translations', () => {
  const postWithTranslations = {
    id: 1,
    status: 'published',
    slug: 'blog-post',
    translations: [
      {
        languages_code: 'en',
        title: 'Blog Post',
        description: 'English description'
      },
      {
        languages_code: 'vi',
        title: 'Bài viết',
        description: 'Mô tả Việt'
      }
    ]
  };

  const result = blogPostSchema.merge(
    z.object({
      translations: z.array(blogTranslationSchema).optional()
    })
  ).safeParse(postWithTranslations);

  assert.equal(result.success, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Event schema
const eventSchema = z.object({
  id: z.string().or(z.number()),
  title: z.string().min(1, 'title_required'),
  slug: z.string().min(1, 'slug_required'),
  description: z.string().optional(),
  start_date: z.string().datetime('invalid_date'),
  end_date: z.string().datetime('invalid_date'),
  location: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).default('upcoming'),
  max_attendees: z.number().int().positive().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('event - validates required fields', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Tech Summit 2024',
    slug: 'tech-summit-2024',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z'
  });

  assert.equal(result.success, true);
});

test('event - requires title', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: '',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z'
  });

  assert.equal(result.success, false);
});

test('event - requires slug', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: '',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z'
  });

  assert.equal(result.success, false);
});

test('event - validates start date format', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01',
    end_date: '2024-06-03T18:00:00Z'
  });

  assert.equal(result.success, false);
});

test('event - defaults status to upcoming', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'upcoming');
  }
});

test('event - accepts all status values', () => {
  for (const status of ['upcoming', 'ongoing', 'completed', 'cancelled']) {
    const result = eventSchema.safeParse({
      id: 'evt-001',
      title: 'Event',
      slug: 'event',
      start_date: '2024-06-01T08:00:00Z',
      end_date: '2024-06-03T18:00:00Z',
      status
    });

    assert.equal(result.success, true);
  }
});

test('event - accepts optional location', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z',
    location: 'Hanoi Convention Center'
  });

  assert.equal(result.success, true);
});

test('event - accepts max attendees', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z',
    max_attendees: 500
  });

  assert.equal(result.success, true);
});

test('event - rejects zero max attendees', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z',
    max_attendees: 0
  });

  assert.equal(result.success, false);
});

test('event - accepts event image', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z',
    image: '/images/event-banner.jpg'
  });

  assert.equal(result.success, true);
});

test('event - accepts description', () => {
  const result = eventSchema.safeParse({
    id: 'evt-001',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z',
    description: 'Join us for this amazing event with industry leaders'
  });

  assert.equal(result.success, true);
});

test('event - numeric or string ID', () => {
  const withNumId = eventSchema.safeParse({
    id: 123,
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z'
  });

  const withStringId = eventSchema.safeParse({
    id: 'evt-123',
    title: 'Event',
    slug: 'event',
    start_date: '2024-06-01T08:00:00Z',
    end_date: '2024-06-03T18:00:00Z'
  });

  assert.equal(withNumId.success, true);
  assert.equal(withStringId.success, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Date-time validation schema
const dateTimeSchema = z.object({
  timestamp: z.string().datetime('invalid_datetime').optional(),
  date_only: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'invalid_date_format').optional(),
  time_only: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'invalid_time_format').optional(),
  timezone: z.string().optional(),
  is_utc: z.boolean().optional()
}).refine(
  (obj) => obj.timestamp || obj.date_only || obj.time_only,
  { message: 'At least one of timestamp, date_only, or time_only is required' }
);

// Duration schema
const durationSchema = z.object({
  start_time: z.string().datetime('invalid_datetime'),
  end_time: z.string().datetime('invalid_datetime'),
  duration_ms: z.number().int().positive(),
  duration_seconds: z.number().int().positive(),
  duration_minutes: z.number().positive()
});

// Recurring event schema
const recurringEventSchema = z.object({
  title: z.string(),
  start_time: z.string().datetime('invalid_datetime'),
  end_time: z.string().datetime('invalid_datetime'),
  recurrence: z.enum(['daily', 'weekly', 'monthly', 'yearly', 'none']),
  recurrence_days: z.array(z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])).optional(),
  recurrence_end: z.string().datetime('invalid_datetime').optional()
});

test('datetime - ISO 8601 format', () => {
  const result = dateTimeSchema.safeParse({
    timestamp: '2024-06-01T10:30:00Z'
  });

  assert.equal(result.success, true);
});

test('datetime - with timezone offset', () => {
  const result = dateTimeSchema.safeParse({
    timestamp: '2024-06-01T10:30:00Z'
  });

  assert.equal(result.success, true);
});

test('datetime - rejects invalid format', () => {
  const result = dateTimeSchema.safeParse({
    timestamp: '2024-06-01'
  });

  assert.equal(result.success, false);
});

test('datetime - date only YYYY-MM-DD', () => {
  const result = dateTimeSchema.safeParse({
    date_only: '2024-06-01'
  });

  assert.equal(result.success, true);
});

test('datetime - rejects invalid date format', () => {
  const result = dateTimeSchema.safeParse({
    date_only: '06/01/2024'
  });

  assert.equal(result.success, false);
});

test('datetime - time only HH:MM:SS', () => {
  const result = dateTimeSchema.safeParse({
    time_only: '14:30:00'
  });

  assert.equal(result.success, true);
});

test('datetime - rejects invalid time format', () => {
  const result = dateTimeSchema.safeParse({
    time_only: '2:30 PM'
  });

  assert.equal(result.success, false);
});

test('datetime - with timezone info', () => {
  const result = dateTimeSchema.safeParse({
    timestamp: '2024-06-01T10:30:00Z',
    timezone: 'Asia/Ho_Chi_Minh',
    is_utc: true
  });

  assert.equal(result.success, true);
});

test('duration - valid duration', () => {
  const result = durationSchema.safeParse({
    start_time: '2024-06-01T10:00:00Z',
    end_time: '2024-06-01T11:30:00Z',
    duration_ms: 5400000,
    duration_seconds: 5400,
    duration_minutes: 90
  });

  assert.equal(result.success, true);
});

test('duration - rejects zero duration', () => {
  const result = durationSchema.safeParse({
    start_time: '2024-06-01T10:00:00Z',
    end_time: '2024-06-01T10:00:00Z',
    duration_ms: 0,
    duration_seconds: 0,
    duration_minutes: 0
  });

  assert.equal(result.success, false);
});

test('duration - one day', () => {
  const result = durationSchema.safeParse({
    start_time: '2024-06-01T00:00:00Z',
    end_time: '2024-06-02T00:00:00Z',
    duration_ms: 86400000,
    duration_seconds: 86400,
    duration_minutes: 1440
  });

  assert.equal(result.success, true);
});

test('duration - minutes only', () => {
  const result = durationSchema.safeParse({
    start_time: '2024-06-01T10:00:00Z',
    end_time: '2024-06-01T10:15:00Z',
    duration_ms: 900000,
    duration_seconds: 900,
    duration_minutes: 15
  });

  assert.equal(result.success, true);
});

test('recurring - daily', () => {
  const result = recurringEventSchema.safeParse({
    title: 'Daily standup',
    start_time: '2024-06-01T09:00:00Z',
    end_time: '2024-06-01T09:30:00Z',
    recurrence: 'daily'
  });

  assert.equal(result.success, true);
});

test('recurring - weekly with specific days', () => {
  const result = recurringEventSchema.safeParse({
    title: 'Team meeting',
    start_time: '2024-06-01T10:00:00Z',
    end_time: '2024-06-01T11:00:00Z',
    recurrence: 'weekly',
    recurrence_days: ['MON', 'WED', 'FRI']
  });

  assert.equal(result.success, true);
});

test('recurring - monthly', () => {
  const result = recurringEventSchema.safeParse({
    title: 'Monthly review',
    start_time: '2024-06-01T14:00:00Z',
    end_time: '2024-06-01T15:30:00Z',
    recurrence: 'monthly'
  });

  assert.equal(result.success, true);
});

test('recurring - yearly', () => {
  const result = recurringEventSchema.safeParse({
    title: 'Company anniversary',
    start_time: '2024-06-01T09:00:00Z',
    end_time: '2024-06-01T17:00:00Z',
    recurrence: 'yearly'
  });

  assert.equal(result.success, true);
});

test('recurring - with end date', () => {
  const result = recurringEventSchema.safeParse({
    title: 'Temporary daily task',
    start_time: '2024-06-01T08:00:00Z',
    end_time: '2024-06-01T08:30:00Z',
    recurrence: 'daily',
    recurrence_end: '2024-12-31T23:59:59Z'
  });

  assert.equal(result.success, true);
});

test('recurring - non-recurring', () => {
  const result = recurringEventSchema.safeParse({
    title: 'One-time event',
    start_time: '2024-06-15T10:00:00Z',
    end_time: '2024-06-15T11:00:00Z',
    recurrence: 'none'
  });

  assert.equal(result.success, true);
});

test('datetime - midnight', () => {
  const result = dateTimeSchema.safeParse({
    timestamp: '2024-06-01T00:00:00Z'
  });

  assert.equal(result.success, true);
});

test('datetime - milliseconds precision', () => {
  const result = dateTimeSchema.safeParse({
    timestamp: '2024-06-01T10:30:45.123Z'
  });

  assert.equal(result.success, true);
});

test('duration - millisecond precision', () => {
  const result = durationSchema.safeParse({
    start_time: '2024-06-01T10:00:00.000Z',
    end_time: '2024-06-01T10:00:00.100Z',
    duration_ms: 100,
    duration_seconds: 1,
    duration_minutes: 0.0017
  });

  assert.equal(result.success, true);
});

test('recurring - all weekdays', () => {
  const result = recurringEventSchema.safeParse({
    title: 'Business day event',
    start_time: '2024-06-03T09:00:00Z',
    end_time: '2024-06-03T09:30:00Z',
    recurrence: 'weekly',
    recurrence_days: ['MON', 'TUE', 'WED', 'THU', 'FRI']
  });

  assert.equal(result.success, true);
});

test('datetime - different timezones', () => {
  const zones = ['UTC', 'Asia/Ho_Chi_Minh', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

  for (const zone of zones) {
    const result = dateTimeSchema.safeParse({
      timestamp: '2024-06-01T10:30:00Z',
      timezone: zone
    });

    assert.equal(result.success, true);
  }
});

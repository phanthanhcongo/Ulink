import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Notification schema
const notificationSchema = z.object({
  id: z.string().or(z.number()),
  recipient_id: z.string().or(z.number()),
  recipient_email: z.string().email('invalid_email'),
  type: z.enum(['order_confirmation', 'shipment_update', 'payment_received', 'new_message', 'system_alert', 'promotion']),
  subject: z.string().min(1, 'subject_required'),
  message: z.string().min(1, 'message_required'),
  status: z.enum(['pending', 'sent', 'failed', 'opened']).default('pending'),
  sent_at: z.string().datetime('invalid_date').optional(),
  opened_at: z.string().datetime('invalid_date').optional(),
  reference_id: z.string().optional(),
  channel: z.enum(['email', 'sms', 'in_app']).default('email'),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('notification - validates required fields', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Order Confirmed',
    message: 'Your order has been confirmed'
  });

  assert.equal(result.success, true);
});

test('notification - requires recipient email', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'invalid-email',
    type: 'order_confirmation',
    subject: 'Order Confirmed',
    message: 'Your order has been confirmed'
  });

  assert.equal(result.success, false);
});

test('notification - requires subject', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: '',
    message: 'Your order has been confirmed'
  });

  assert.equal(result.success, false);
});

test('notification - requires message', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Order Confirmed',
    message: ''
  });

  assert.equal(result.success, false);
});

test('notification - accepts all notification types', () => {
  const types = ['order_confirmation', 'shipment_update', 'payment_received', 'new_message', 'system_alert', 'promotion'];

  for (const type of types) {
    const result = notificationSchema.safeParse({
      id: 'notif-001',
      recipient_id: 'cust-001',
      recipient_email: 'customer@example.com',
      type,
      subject: 'Subject',
      message: 'Message'
    });

    assert.equal(result.success, true);
  }
});

test('notification - defaults status to pending', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'pending');
  }
});

test('notification - accepts all status values', () => {
  const statuses = ['pending', 'sent', 'failed', 'opened'];

  for (const status of statuses) {
    const result = notificationSchema.safeParse({
      id: 'notif-001',
      recipient_id: 'cust-001',
      recipient_email: 'customer@example.com',
      type: 'order_confirmation',
      subject: 'Subject',
      message: 'Message',
      status
    });

    assert.equal(result.success, true);
  }
});

test('notification - defaults channel to email', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.channel, 'email');
  }
});

test('notification - accepts all channels', () => {
  const channels = ['email', 'sms', 'in_app'];

  for (const channel of channels) {
    const result = notificationSchema.safeParse({
      id: 'notif-001',
      recipient_id: 'cust-001',
      recipient_email: 'customer@example.com',
      type: 'order_confirmation',
      subject: 'Subject',
      message: 'Message',
      channel
    });

    assert.equal(result.success, true);
  }
});

test('notification - accepts sent at', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message',
    sent_at: '2024-06-01T10:00:00Z'
  });

  assert.equal(result.success, true);
});

test('notification - accepts opened at', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message',
    opened_at: '2024-06-01T10:30:00Z'
  });

  assert.equal(result.success, true);
});

test('notification - accepts reference ID', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message',
    reference_id: 'ord-001'
  });

  assert.equal(result.success, true);
});

test('notification - numeric and string IDs', () => {
  const result1 = notificationSchema.safeParse({
    id: 123,
    recipient_id: 456,
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message'
  });

  const result2 = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Subject',
    message: 'Message'
  });

  assert.equal(result1.success, true);
  assert.equal(result2.success, true);
});

test('notification - full sent and opened notification', () => {
  const result = notificationSchema.safeParse({
    id: 'notif-001',
    recipient_id: 'cust-001',
    recipient_email: 'customer@example.com',
    type: 'order_confirmation',
    subject: 'Your Order #ORD-2024-001 Has Been Confirmed',
    message: 'Thank you for your order. Your order has been confirmed and will be processed soon.',
    status: 'opened',
    sent_at: '2024-06-01T10:00:00Z',
    opened_at: '2024-06-01T10:30:00Z',
    reference_id: 'ord-2024-001',
    channel: 'email'
  });

  assert.equal(result.success, true);
});

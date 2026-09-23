import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Message schema
const messageSchema = z.object({
  id: z.string().or(z.number()),
  conversation_id: z.string().or(z.number()),
  sender_id: z.string().or(z.number()),
  recipient_id: z.string().or(z.number()),
  content: z.string().min(1, 'content_required'),
  type: z.enum(['text', 'image', 'file', 'system']).optional().default('text'),
  attachments: z.array(z.object({
    id: z.string(),
    filename: z.string(),
    size: z.number().positive(),
    mime_type: z.string()
  })).optional(),
  read: z.boolean().optional().default(false),
  read_at: z.string().datetime('invalid_date').optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Conversation schema
const conversationSchema = z.object({
  id: z.string().or(z.number()),
  participants: z.array(z.string().or(z.number())).min(2, 'at_least_two_participants'),
  subject: z.string().optional(),
  last_message_at: z.string().datetime('invalid_date').optional(),
  status: z.enum(['active', 'archived', 'closed']).optional().default('active'),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

test('message - validates required fields', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Hello, how are you?'
  });

  assert.equal(result.success, true);
});

test('message - requires content', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: ''
  });

  assert.equal(result.success, false);
});

test('message - accepts all types', () => {
  for (const type of ['text', 'image', 'file', 'system']) {
    const result = messageSchema.safeParse({
      id: 'msg-001',
      conversation_id: 'conv-001',
      sender_id: 'user-001',
      recipient_id: 'user-002',
      content: 'Message',
      type
    });

    assert.equal(result.success, true);
  }
});

test('message - defaults type to text', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Hello'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.type, 'text');
  }
});

test('message - defaults read to false', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Hello'
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.read, false);
  }
});

test('message - with attachments', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Check attached files',
    type: 'file',
    attachments: [
      { id: 'att-001', filename: 'document.pdf', size: 1024000, mime_type: 'application/pdf' },
      { id: 'att-002', filename: 'image.jpg', size: 512000, mime_type: 'image/jpeg' }
    ]
  });

  assert.equal(result.success, true);
});

test('message - marked as read', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Message',
    read: true,
    read_at: '2024-06-01T10:05:00Z'
  });

  assert.equal(result.success, true);
});

test('conversation - validates required fields', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001', 'user-002']
  });

  assert.equal(result.success, true);
});

test('conversation - requires at least 2 participants', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001']
  });

  assert.equal(result.success, false);
});

test('conversation - accepts multiple participants', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001', 'user-002', 'user-003', 'user-004']
  });

  assert.equal(result.success, true);
});

test('conversation - accepts subject', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001', 'user-002'],
    subject: 'Project Discussion'
  });

  assert.equal(result.success, true);
});

test('conversation - defaults status to active', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001', 'user-002']
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.status, 'active');
  }
});

test('conversation - accepts all status values', () => {
  for (const status of ['active', 'archived', 'closed']) {
    const result = conversationSchema.safeParse({
      id: 'conv-001',
      participants: ['user-001', 'user-002'],
      status
    });

    assert.equal(result.success, true);
  }
});

test('conversation - with last message timestamp', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001', 'user-002'],
    last_message_at: '2024-06-01T10:30:00Z'
  });

  assert.equal(result.success, true);
});

test('message - full message with all fields', () => {
  const result = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Here are the project files',
    type: 'file',
    attachments: [
      { id: 'att-001', filename: 'project.zip', size: 5242880, mime_type: 'application/zip' }
    ],
    read: true,
    read_at: '2024-06-01T10:35:00Z',
    created_at: '2024-06-01T10:30:00Z'
  });

  assert.equal(result.success, true);
});

test('conversation - full archived group conversation', () => {
  const result = conversationSchema.safeParse({
    id: 'conv-001',
    participants: ['user-001', 'user-002', 'user-003', 'user-004'],
    subject: 'Q2 Planning & Strategy',
    last_message_at: '2024-06-15T16:45:00Z',
    status: 'archived',
    created_at: '2024-04-01T09:00:00Z',
    updated_at: '2024-06-15T16:45:00Z'
  });

  assert.equal(result.success, true);
});

test('message - numeric and string IDs', () => {
  const numId = messageSchema.safeParse({
    id: 123,
    conversation_id: 456,
    sender_id: 789,
    recipient_id: 101112,
    content: 'Message'
  });

  const stringId = messageSchema.safeParse({
    id: 'msg-001',
    conversation_id: 'conv-001',
    sender_id: 'user-001',
    recipient_id: 'user-002',
    content: 'Message'
  });

  assert.equal(numId.success, true);
  assert.equal(stringId.success, true);
});

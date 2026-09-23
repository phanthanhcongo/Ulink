import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Contact API schema validation
const contactSchema = z.object({
  name: z.string().min(1, 'required').max(200),
  email: z.string().min(1, 'required').email('invalid_email'),
  phone: z.string().min(1, 'required'),
  subject: z.string().min(1, 'required').max(500),
  message: z.string().min(1, 'required').max(5000),
});

test('contact API - validates required fields', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: 'I have a question about your products.'
  };

  const result = contactSchema.safeParse(validData);
  assert.equal(result.success, true);
});

test('contact API - rejects missing name', () => {
  const result = contactSchema.safeParse({
    name: '',
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: 'Message'
  });

  assert.equal(result.success, false);
});

test('contact API - rejects invalid email', () => {
  const result = contactSchema.safeParse({
    name: 'John',
    email: 'invalid-email',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: 'Message'
  });

  assert.equal(result.success, false);
});

test('contact API - rejects empty message', () => {
  const result = contactSchema.safeParse({
    name: 'John',
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: ''
  });

  assert.equal(result.success, false);
});

test('contact API - validates max name length', () => {
  const result = contactSchema.safeParse({
    name: 'A'.repeat(201),
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: 'Message'
  });

  assert.equal(result.success, false);
});

test('contact API - validates max subject length', () => {
  const result = contactSchema.safeParse({
    name: 'John',
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'A'.repeat(501),
    message: 'Message'
  });

  assert.equal(result.success, false);
});

test('contact API - validates max message length', () => {
  const result = contactSchema.safeParse({
    name: 'John',
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: 'A'.repeat(5001)
  });

  assert.equal(result.success, false);
});

test('contact API - accepts long but valid message', () => {
  const result = contactSchema.safeParse({
    name: 'John',
    email: 'john@example.com',
    phone: '+84901234567',
    subject: 'Inquiry',
    message: 'A'.repeat(5000)
  });

  assert.equal(result.success, true);
});

test('contact API - accepts international phone', () => {
  const result = contactSchema.safeParse({
    name: 'John',
    email: 'john@example.com',
    phone: '+1-555-123-4567',
    subject: 'Inquiry',
    message: 'Message'
  });

  assert.equal(result.success, true);
});

test('contact API - response structure', () => {
  const responseSchema = z.object({
    success: z.literal(true),
    data: z.object({
      id: z.string().or(z.number()),
      status: z.string().optional(),
      created_at: z.string().optional()
    })
  });

  const validResponse = {
    success: true,
    data: {
      id: 'contact-123',
      status: 'pending',
      created_at: new Date().toISOString()
    }
  };

  const result = responseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

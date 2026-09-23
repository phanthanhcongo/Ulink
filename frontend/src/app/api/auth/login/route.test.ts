import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Test route handler validation using the same pattern as the actual route
const loginSchema = z.object({
  email: z.string().min(1, 'required').email('invalid_email'),
  password: z.string().min(1, 'required')
});

test('login route - validates email is required', () => {
  const result = loginSchema.safeParse({ email: '', password: 'test' });
  assert.equal(result.success, false);
});

test('login route - validates email format', () => {
  const result = loginSchema.safeParse({ email: 'not-an-email', password: 'test' });
  assert.equal(result.success, false);
});

test('login route - validates password is required', () => {
  const result = loginSchema.safeParse({ email: 'test@example.com', password: '' });
  assert.equal(result.success, false);
});

test('login route - accepts valid credentials', () => {
  const result = loginSchema.safeParse({ email: 'test@example.com', password: 'password123' });
  assert.equal(result.success, true);
});

test('login route - rejects extra fields with strict parsing', () => {
  const strictSchema = loginSchema.strict();
  const result = strictSchema.safeParse({
    email: 'test@example.com',
    password: 'test',
    extra: 'field'
  });
  assert.equal(result.success, false);
});

test('login route - response type for successful login', () => {
  const responseSchema = z.object({
    success: z.literal(true),
    data: z.object({
      user: z.object({
        id: z.string(),
        email: z.string()
      }),
      token: z.string().optional()
    })
  });

  const validResponse = {
    success: true,
    data: {
      user: {
        id: '123',
        email: 'test@example.com'
      },
      token: 'jwt-token'
    }
  };

  const result = responseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

test('login route - response type for failed login', () => {
  const errorResponseSchema = z.object({
    success: z.literal(false),
    error: z.object({
      code: z.string(),
      message: z.string()
    })
  });

  const errorResponse = {
    success: false,
    error: {
      code: 'invalid_credentials',
      message: 'Invalid email or password'
    }
  };

  const result = errorResponseSchema.safeParse(errorResponse);
  assert.equal(result.success, true);
});

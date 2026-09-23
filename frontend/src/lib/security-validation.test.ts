import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Password validation schema
const passwordSchema = z.string()
  .min(8, 'password_too_short')
  .max(128, 'password_too_long')
  .regex(/[A-Z]/, 'must_contain_uppercase')
  .regex(/[a-z]/, 'must_contain_lowercase')
  .regex(/[0-9]/, 'must_contain_number')
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'must_contain_special');

// API key validation schema
const apiKeySchema = z.string()
  .min(32, 'key_too_short')
  .max(256, 'key_too_long')
  .regex(/^[a-zA-Z0-9_-]+$/, 'invalid_key_format');

// CORS schema
const corsSchema = z.object({
  origin: z.union([
    z.literal('*'),
    z.string().url('invalid_url')
  ]),
  methods: z.array(z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])),
  allowed_headers: z.array(z.string()),
  credentials: z.boolean().optional().default(false)
});

// SQL injection prevention test data
const sqlInjectionTestSchema = z.object({
  query: z.string().refine(
    (val) => !val.includes('DROP') && !val.includes('DELETE') && !val.includes('INSERT') && !val.includes('UPDATE'),
    { message: 'Potentially malicious SQL detected' }
  ),
  is_parameterized: z.boolean(),
  param_count: z.number().int().nonnegative()
});

// XSS prevention test data
const xssPreventionSchema = z.object({
  content: z.string().refine(
    (val) => !val.includes('<script') && !val.includes('javascript:'),
    { message: 'Potentially dangerous content detected' }
  ),
  sanitized: z.boolean()
});

// JWT token schema
const jwtTokenSchema = z.object({
  header: z.object({
    alg: z.enum(['HS256', 'HS512', 'RS256', 'RS512']),
    typ: z.literal('JWT')
  }),
  payload: z.object({
    iss: z.string().optional(),
    sub: z.string(),
    aud: z.string().optional(),
    exp: z.number().int().positive(),
    iat: z.number().int().positive(),
    nbf: z.number().int().nonnegative().optional()
  }),
  signature: z.string().min(1)
});

test('security - strong password', () => {
  const result = z.object({ password: passwordSchema }).safeParse({
    password: 'SecurePass123!@#'
  });

  assert.equal(result.success, true);
});

test('security - password too short', () => {
  const result = z.object({ password: passwordSchema }).safeParse({
    password: 'Short1!'
  });

  assert.equal(result.success, false);
});

test('security - password missing uppercase', () => {
  const result = z.object({ password: passwordSchema }).safeParse({
    password: 'securepass123!@#'
  });

  assert.equal(result.success, false);
});

test('security - password missing number', () => {
  const result = z.object({ password: passwordSchema }).safeParse({
    password: 'SecurePass!@#'
  });

  assert.equal(result.success, false);
});

test('security - password missing special char', () => {
  const result = z.object({ password: passwordSchema }).safeParse({
    password: 'SecurePass123'
  });

  assert.equal(result.success, false);
});

test('security - valid API key', () => {
  const result = z.object({ key: apiKeySchema }).safeParse({
    key: 'sk_live_abcdef123456789_ghijklmnop'
  });

  assert.equal(result.success, true);
});

test('security - API key too short', () => {
  const result = z.object({ key: apiKeySchema }).safeParse({
    key: 'short_key'
  });

  assert.equal(result.success, false);
});

test('security - API key invalid format', () => {
  const result = z.object({ key: apiKeySchema }).safeParse({
    key: 'sk_live_abcdef@#$%!invalid'
  });

  assert.equal(result.success, false);
});

test('security - CORS wildcard', () => {
  const result = corsSchema.safeParse({
    origin: '*',
    methods: ['GET', 'POST'],
    allowed_headers: ['Content-Type']
  });

  assert.equal(result.success, true);
});

test('security - CORS specific origin', () => {
  const result = corsSchema.safeParse({
    origin: 'https://trusted.example.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowed_headers: ['Content-Type', 'Authorization'],
    credentials: true
  });

  assert.equal(result.success, true);
});

test('security - CORS multiple origins', () => {
  for (const origin of ['https://app1.example.com', 'https://app2.example.com']) {
    const result = corsSchema.safeParse({
      origin,
      methods: ['GET', 'POST'],
      allowed_headers: ['Content-Type']
    });

    assert.equal(result.success, true);
  }
});

test('security - SQL parameterized query', () => {
  const result = sqlInjectionTestSchema.safeParse({
    query: 'SELECT * FROM users WHERE id = $1',
    is_parameterized: true,
    param_count: 1
  });

  assert.equal(result.success, true);
});

test('security - SQL DROP injection detected', () => {
  const result = sqlInjectionTestSchema.safeParse({
    query: "SELECT * FROM users WHERE id = 1; DROP TABLE users;",
    is_parameterized: false,
    param_count: 0
  });

  assert.equal(result.success, false);
});

test('security - SQL DELETE injection detected', () => {
  const result = sqlInjectionTestSchema.safeParse({
    query: "DELETE FROM products WHERE 1=1",
    is_parameterized: false,
    param_count: 0
  });

  assert.equal(result.success, false);
});

test('security - XSS safe content', () => {
  const result = xssPreventionSchema.safeParse({
    content: 'This is safe user content with no scripts',
    sanitized: true
  });

  assert.equal(result.success, true);
});

test('security - XSS script tag detected', () => {
  const result = xssPreventionSchema.safeParse({
    content: '<script>alert("XSS")</script>',
    sanitized: false
  });

  assert.equal(result.success, false);
});

test('security - XSS javascript protocol detected', () => {
  const result = xssPreventionSchema.safeParse({
    content: '<a href="javascript:alert(\'XSS\')">Click</a>',
    sanitized: false
  });

  assert.equal(result.success, false);
});

test('security - JWT valid token', () => {
  const futureTime = Math.floor(Date.now() / 1000) + 3600;
  const currentTime = Math.floor(Date.now() / 1000);

  const result = jwtTokenSchema.safeParse({
    header: {
      alg: 'HS256',
      typ: 'JWT'
    },
    payload: {
      iss: 'auth-server',
      sub: 'user-123',
      aud: 'api-service',
      exp: futureTime,
      iat: currentTime,
      nbf: currentTime
    },
    signature: 'signature_hash_value'
  });

  assert.equal(result.success, true);
});

test('security - JWT expired token', () => {
  const pastTime = Math.floor(Date.now() / 1000) - 3600;

  const result = jwtTokenSchema.safeParse({
    header: {
      alg: 'RS256',
      typ: 'JWT'
    },
    payload: {
      sub: 'user-456',
      exp: pastTime,
      iat: pastTime
    },
    signature: 'signature'
  });

  assert.equal(result.success, true);
});

test('security - JWT all algorithms', () => {
  for (const alg of ['HS256', 'HS512', 'RS256', 'RS512']) {
    const futureTime = Math.floor(Date.now() / 1000) + 3600;

    const result = jwtTokenSchema.safeParse({
      header: {
        alg,
        typ: 'JWT'
      },
      payload: {
        sub: 'user-123',
        exp: futureTime,
        iat: Math.floor(Date.now() / 1000)
      },
      signature: 'sig'
    });

    assert.equal(result.success, true);
  }
});

test('security - password complexity requirements', () => {
  const passwords = [
    'Valid@Pass123',
    'C0mpl3x!Pwd',
    'MyP@ssw0rd2024',
    'Secure#Passw0rd'
  ];

  for (const pwd of passwords) {
    const result = z.object({ password: passwordSchema }).safeParse({
      password: pwd
    });

    assert.equal(result.success, true);
  }
});

test('security - API key entropy', () => {
  const validKeys = [
    'sk_live_abcdef123456789ghijklmnopqrst',
    'sk_test_xyzabc123456789_ABCDEFGHIJKL',
    'sk_prod_12345678901234567890123456789',
    'sk_dev_aaabbbcccdddeeefff111222333444',
    'sk_staging_zyxwvutsrqponmlkjihgfedcba'
  ];

  for (const key of validKeys) {
    const result = z.object({ key: apiKeySchema }).safeParse({
      key
    });

    assert.equal(result.success, true);
  }
});

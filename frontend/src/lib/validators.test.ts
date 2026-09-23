import test from 'node:test';
import assert from 'node:assert/strict';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  changePasswordInSessionSchema,
  changePasswordViaTokenSchema,
  otpIssueSchema,
  otpVerifySchema,
  rfqSchema,
  contactSchema,
  hubRfqSchema,
  sampleRequestSchema,
  PASSWORD_REGEX
} from './validators';

test('loginSchema validates email and password', () => {
  const valid = { email: 'test@example.com', password: 'password123' };
  const result = loginSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('loginSchema rejects invalid email', () => {
  const invalid = { email: 'not-an-email', password: 'password123' };
  const result = loginSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('loginSchema requires password', () => {
  const invalid = { email: 'test@example.com', password: '' };
  const result = loginSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('registerSchema validates all required fields', () => {
  const valid = {
    company_name: 'ACME Corp',
    contact_name: 'John Doe',
    email: 'john@acme.com',
    phone: '0901234567',
    password: 'password123',
    confirm_password: 'password123',
    agree: true,
    agree_at: new Date().toISOString()
  };
  const result = registerSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('registerSchema requires matching passwords', () => {
  const invalid = {
    company_name: 'ACME Corp',
    contact_name: 'John Doe',
    email: 'john@acme.com',
    phone: '0901234567',
    password: 'password123',
    confirm_password: 'different123',
    agree: true,
    agree_at: new Date().toISOString()
  };
  const result = registerSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('registerSchema requires agree to be true', () => {
  const invalid = {
    company_name: 'ACME Corp',
    contact_name: 'John Doe',
    email: 'john@acme.com',
    phone: '0901234567',
    password: 'password123',
    confirm_password: 'password123',
    agree: false,
    agree_at: new Date().toISOString()
  };
  const result = registerSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('registerSchema requires 6-40 digit phone', () => {
  const tooShort = {
    company_name: 'ACME',
    contact_name: 'John',
    email: 'john@acme.com',
    phone: '12345',
    password: 'pass123',
    confirm_password: 'pass123',
    agree: true,
    agree_at: new Date().toISOString()
  };
  const result = registerSchema.safeParse(tooShort);
  assert.equal(result.success, false);
});

test('forgotPasswordSchema validates email', () => {
  const valid = { email: 'test@example.com' };
  const result = forgotPasswordSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('changePasswordInSessionSchema matches passwords', () => {
  const valid = {
    current_password: 'oldpass123',
    new_password: 'newpass123',
    confirm_new_password: 'newpass123'
  };
  const result = changePasswordInSessionSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('changePasswordInSessionSchema requires matching new passwords', () => {
  const invalid = {
    current_password: 'oldpass123',
    new_password: 'newpass123',
    confirm_new_password: 'different123'
  };
  const result = changePasswordInSessionSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('otpVerifySchema validates 6-digit code', () => {
  const valid = {
    email: 'test@example.com',
    code: '123456',
    purpose: 'login-2fa'
  };
  const result = otpVerifySchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('otpVerifySchema rejects non-6-digit code', () => {
  const invalid = {
    email: 'test@example.com',
    code: '12345',
    purpose: 'login-2fa'
  };
  const result = otpVerifySchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('rfqSchema validates minimal RFQ', () => {
  const valid = {
    company: 'ACME',
    email: 'contact@acme.com',
    items: [{ sku: 'SKU-001' }]
  };
  const result = rfqSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('rfqSchema provides default empty items array', () => {
  const valid = { company: 'ACME', email: 'contact@acme.com' };
  const result = rfqSchema.safeParse(valid);
  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.items, []);
  }
});

test('contactSchema validates all required fields', () => {
  const valid = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0901234567',
    subject: 'Inquiry',
    message: 'I have a question'
  };
  const result = contactSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('hubRfqSchema validates phone with 10-11 digits', () => {
  const valid = {
    hub_id: 1,
    contact_name: 'John',
    company: 'ACME',
    phone: '09012345678',
    email: 'john@acme.com'
  };
  const result = hubRfqSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('hubRfqSchema rejects invalid phone', () => {
  const invalid = {
    hub_id: 1,
    contact_name: 'John',
    company: 'ACME',
    phone: '090123',
    email: 'john@acme.com'
  };
  const result = hubRfqSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test('sampleRequestSchema validates all fields', () => {
  const valid = {
    contact_name: 'John',
    email: 'john@example.com',
    company: 'ACME',
    phone: '09012345678',
    province: 'Hanoi',
    district: 'Ba Dinh',
    address_detail: '123 Street',
    product_slug: 'product-slug'
  };
  const result = sampleRequestSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test('PASSWORD_REGEX requires at least 6 characters', () => {
  assert.equal(PASSWORD_REGEX.test('pass'), false);
  assert.equal(PASSWORD_REGEX.test('password'), true);
});

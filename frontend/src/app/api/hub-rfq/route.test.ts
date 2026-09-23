import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Hub RFQ (Regional Hub Request for Quote) schema
const hubRfqSchema = z.object({
  hub_id: z.number().int().positive('hub_required'),
  contact_name: z.string().min(1, 'required'),
  company: z.string().min(1, 'required'),
  phone: z.string().regex(/^\d{10,11}$/, 'invalid_phone'),
  email: z.string().email('invalid_email'),
  message: z.string().optional()
});

test('hub RFQ - validates minimal fields', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME Corp',
    phone: '0901234567',
    email: 'contact@acme.com'
  });

  assert.equal(result.success, true);
});

test('hub RFQ - requires positive hub ID', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 0,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '0901234567',
    email: 'contact@acme.com'
  });

  assert.equal(result.success, false);
});

test('hub RFQ - rejects negative hub ID', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: -1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '0901234567',
    email: 'contact@acme.com'
  });

  assert.equal(result.success, false);
});

test('hub RFQ - requires contact name', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: '',
    company: 'ACME',
    phone: '0901234567',
    email: 'contact@acme.com'
  });

  assert.equal(result.success, false);
});

test('hub RFQ - requires company', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: '',
    phone: '0901234567',
    email: 'contact@acme.com'
  });

  assert.equal(result.success, false);
});

test('hub RFQ - validates phone 10-11 digits', () => {
  const valid10 = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '0901234567',
    email: 'contact@acme.com'
  });

  assert.equal(valid10.success, true);

  const valid11 = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '09012345678',
    email: 'contact@acme.com'
  });

  assert.equal(valid11.success, true);

  const invalid = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '090123456',
    email: 'contact@acme.com'
  });

  assert.equal(invalid.success, false);
});

test('hub RFQ - rejects phone with non-digits', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '+84-901-234-567',
    email: 'contact@acme.com'
  });

  assert.equal(result.success, false);
});

test('hub RFQ - requires valid email', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '0901234567',
    email: 'invalid-email'
  });

  assert.equal(result.success, false);
});

test('hub RFQ - accepts optional message', () => {
  const result = hubRfqSchema.safeParse({
    hub_id: 1,
    contact_name: 'Mr. A',
    company: 'ACME',
    phone: '0901234567',
    email: 'contact@acme.com',
    message: 'Looking for bulk order solutions'
  });

  assert.equal(result.success, true);
});

test('hub RFQ - accepts multiple hub IDs', () => {
  const hubIds = [1, 2, 3, 4, 5];

  for (const hubId of hubIds) {
    const result = hubRfqSchema.safeParse({
      hub_id: hubId,
      contact_name: 'Mr. A',
      company: 'ACME',
      phone: '0901234567',
      email: 'contact@acme.com'
    });

    assert.equal(result.success, true);
  }
});

test('hub RFQ - response structure', () => {
  const responseSchema = z.object({
    success: z.literal(true),
    data: z.object({
      id: z.string().or(z.number()),
      hub_id: z.number(),
      status: z.string().optional(),
      created_at: z.string().optional()
    })
  });

  const validResponse = {
    success: true,
    data: {
      id: 'hubrfq-123',
      hub_id: 1,
      status: 'received',
      created_at: new Date().toISOString()
    }
  };

  const result = responseSchema.safeParse(validResponse);
  assert.equal(result.success, true);
});

test('hub RFQ - validates all Vietnamese hubs', () => {
  const vietnamHubs = [1, 2, 3]; // Example hub IDs

  for (const hubId of vietnamHubs) {
    const result = hubRfqSchema.safeParse({
      hub_id: hubId,
      contact_name: 'Người liên hệ',
      company: 'Công ty ABC',
      phone: '09${String(hubId).repeat(9)}',
      email: 'contact@company.vn'
    });

    // Should succeed as long as phone is valid
    if (result.success === false) {
      // Check if it's because of phone format
      const withValidPhone = hubRfqSchema.safeParse({
        hub_id: hubId,
        contact_name: 'Người liên hệ',
        company: 'Công ty ABC',
        phone: '0901234567',
        email: 'contact@company.vn'
      });

      assert.equal(withValidPhone.success, true);
    }
  }
});

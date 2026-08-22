import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getDirectusUrl,
  getDirectusUrlClient,
  requireDirectusToken
} from './directus-runtime.mjs';

test('getDirectusUrl prefers DIRECTUS_PUBLIC_URL over localhost fallback', () => {
  const originalUrl = process.env.DIRECTUS_URL;
  const originalPublicUrl = process.env.DIRECTUS_PUBLIC_URL;

  delete process.env.DIRECTUS_URL;
  process.env.DIRECTUS_PUBLIC_URL = 'https://cms.example.com';

  try {
    assert.equal(getDirectusUrl(undefined), 'https://cms.example.com');
  } finally {
    if (originalUrl === undefined) {
      delete process.env.DIRECTUS_URL;
    } else {
      process.env.DIRECTUS_URL = originalUrl;
    }
    if (originalPublicUrl === undefined) {
      delete process.env.DIRECTUS_PUBLIC_URL;
    } else {
      process.env.DIRECTUS_PUBLIC_URL = originalPublicUrl;
    }
  }
});

test('getDirectusUrl preserves an explicit URL', () => {
  assert.equal(getDirectusUrl('https://cms.example.com'), 'https://cms.example.com');
});

test('getDirectusUrlClient prefers NEXT_PUBLIC_DIRECTUS_URL', () => {
  const originalDirectus = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const originalSite = process.env.NEXT_PUBLIC_SITE_URL;

  delete process.env.NEXT_PUBLIC_DIRECTUS_URL;
  process.env.NEXT_PUBLIC_SITE_URL = 'https://cms.example.com';

  try {
    assert.equal(getDirectusUrlClient(undefined), 'https://cms.example.com');
  } finally {
    if (originalDirectus === undefined) {
      delete process.env.NEXT_PUBLIC_DIRECTUS_URL;
    } else {
      process.env.NEXT_PUBLIC_DIRECTUS_URL = originalDirectus;
    }
    if (originalSite === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSite;
    }
  }
});

test('requireDirectusToken throws when missing', () => {
  assert.throws(
    () => requireDirectusToken(undefined),
    /DIRECTUS_TOKEN is required for server-side RFQ writes/
  );
});

test('requireDirectusToken returns the provided token', () => {
  assert.equal(requireDirectusToken('token-123'), 'token-123');
});

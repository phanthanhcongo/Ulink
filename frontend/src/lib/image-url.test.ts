import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveImageUrl } from './image-url';

test('keeps root-relative frontend image paths', () => {
  assert.equal(resolveImageUrl('/images/products/a.webp'), '/images/products/a.webp');
});

test('resolves relative paths against the frontend origin', () => {
  assert.equal(
    resolveImageUrl('images/products/a.webp', 'https://ulink.test'),
    'https://ulink.test/images/products/a.webp'
  );
});

test('preserves absolute URLs and rejects empty values', () => {
  assert.equal(resolveImageUrl('https://cdn.test/a.webp'), 'https://cdn.test/a.webp');
  assert.equal(resolveImageUrl(''), null);
  assert.equal(resolveImageUrl(null), null);
});

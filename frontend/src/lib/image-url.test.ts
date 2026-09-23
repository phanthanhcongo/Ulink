import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveImageUrl } from './image-url';

test('resolveImageUrl returns null for empty input', () => {
  assert.equal(resolveImageUrl(''), null);
  assert.equal(resolveImageUrl('   '), null);
  assert.equal(resolveImageUrl(null), null);
  assert.equal(resolveImageUrl(undefined), null);
});

test('resolveImageUrl returns null for empty array', () => {
  assert.equal(resolveImageUrl([]), null);
});

test('resolveImageUrl handles array by picking first element', () => {
  const url = resolveImageUrl(['/images/test.jpg', '/images/other.jpg']);
  assert.equal(url, '/images/test.jpg');
});

test('resolveImageUrl handles JSON string array', () => {
  const url = resolveImageUrl('["/images/first.jpg", "/images/second.jpg"]');
  assert.equal(url, '/images/first.jpg');
});

test('resolveImageUrl handles invalid JSON array string as relative path', () => {
  const url = resolveImageUrl('[invalid json');
  // Invalid JSON falls through to relative path handling
  assert.equal(url, '/[invalid json');
});

test('resolveImageUrl handles UUID as Directus asset ID', () => {
  const uuid = '550e8400-e29b-41d4-a716-446655440000';
  const url = resolveImageUrl(uuid);
  assert(url?.includes('/assets/'));
  assert(url?.includes(uuid));
});

test('resolveImageUrl handles absolute URLs', () => {
  const url = resolveImageUrl('https://example.com/image.jpg');
  assert.equal(url, 'https://example.com/image.jpg');
});

test('resolveImageUrl handles http URLs', () => {
  const url = resolveImageUrl('http://example.com/image.jpg');
  assert.equal(url, 'http://example.com/image.jpg');
});

test('resolveImageUrl handles data URLs', () => {
  const dataUrl = 'data:image/png;base64,ABC123';
  const url = resolveImageUrl(dataUrl);
  assert.equal(url, dataUrl);
});

test('resolveImageUrl handles blob URLs', () => {
  const blobUrl = 'blob:https://example.com/123';
  const url = resolveImageUrl(blobUrl);
  assert.equal(url, blobUrl);
});

test('resolveImageUrl handles root-relative paths', () => {
  const url = resolveImageUrl('/images/test.jpg');
  assert.equal(url, '/images/test.jpg');
});

test('resolveImageUrl prepends slash for relative paths without origin', () => {
  const url = resolveImageUrl('images/test.jpg');
  assert.equal(url, '/images/test.jpg');
});

test('resolveImageUrl prepends origin for relative paths with origin', () => {
  const url = resolveImageUrl('images/test.jpg', 'https://example.com');
  assert.equal(url, 'https://example.com/images/test.jpg');
});

test('resolveImageUrl removes trailing slash from origin', () => {
  const url = resolveImageUrl('images/test.jpg', 'https://example.com/');
  assert.equal(url, 'https://example.com/images/test.jpg');
});

test('resolveImageUrl trims whitespace from input', () => {
  const url = resolveImageUrl('  /images/test.jpg  ');
  assert.equal(url, '/images/test.jpg');
});

test('resolveImageUrl recognizes UUID with lowercase', () => {
  const uuid = '550e8400-e29b-41d4-a716-446655440000';
  const url = resolveImageUrl(uuid);
  assert(url?.includes(uuid));
});

test('resolveImageUrl recognizes UUID with uppercase', () => {
  const uuid = '550E8400-E29B-41D4-A716-446655440000';
  const url = resolveImageUrl(uuid);
  assert(url?.includes(uuid));
});

test('resolveImageUrl recognizes mixed case UUID', () => {
  const uuid = '550E8400-e29b-41D4-A716-446655440000';
  const url = resolveImageUrl(uuid);
  assert(url?.includes(uuid));
});

test('resolveImageUrl rejects invalid UUID formats', () => {
  const notUuid = '550e8400-e29b-41d4-a716-44665544000';
  const url = resolveImageUrl(notUuid);
  // Should treat as relative path
  assert.equal(url, '/550e8400-e29b-41d4-a716-44665544000');
});

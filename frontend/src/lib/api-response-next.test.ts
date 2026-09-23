import test from 'node:test';
import assert from 'node:assert/strict';
import { successJson, errorJson } from './api-response-next';

test('successJson returns NextResponse with proper structure', async () => {
  const response = successJson({ id: '123', name: 'Test' });
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.success, true);
  assert.deepEqual(json.data, { id: '123', name: 'Test' });
});

test('successJson includes meta when provided', async () => {
  const response = successJson({ items: [] }, { meta: { total: 0, page: 1 } });
  const json = await response.json();
  assert.equal(json.success, true);
  assert.deepEqual(json.meta, { total: 0, page: 1 });
});

test('successJson respects custom init options', async () => {
  const response = successJson({ data: 'test' }, { init: { status: 201 } });
  assert.equal(response.status, 201);
});

test('successJson omits meta when not provided', async () => {
  const response = successJson({ data: 'test' });
  const json = await response.json();
  assert(!json.meta);
});

test('errorJson returns NextResponse with error structure', async () => {
  const response = errorJson(422, 'validation_error', 'Invalid input');
  assert.equal(response.status, 422);
  const json = await response.json();
  assert.equal(json.success, false);
  assert.equal(json.error.code, 'validation_error');
  assert.equal(json.error.message, 'Invalid input');
});

test('errorJson includes details when provided', async () => {
  const details = { email: ['invalid'], phone: ['required'] };
  const response = errorJson(422, 'validation_error', 'Validation failed', details);
  const json = await response.json();
  assert.deepEqual(json.error.details, details);
});

test('errorJson includes timestamp', async () => {
  const response = errorJson(400, 'bad_request', 'Bad request');
  const json = await response.json();
  assert(json.error.timestamp);
  assert(typeof json.error.timestamp === 'string');
});

test('errorJson handles different status codes', () => {
  const response400 = errorJson(400, 'bad_request', 'Bad request');
  const response404 = errorJson(404, 'not_found', 'Not found');
  const response500 = errorJson(500, 'internal_error', 'Server error');

  assert.equal(response400.status, 400);
  assert.equal(response404.status, 404);
  assert.equal(response500.status, 500);
});

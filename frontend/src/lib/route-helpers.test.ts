import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import {
  jsonOk,
  jsonCreated,
  jsonNoContent,
  jsonErrorRaw
} from './route-helpers';
import { ApiError } from './api-error';

test('jsonOk returns 200 response with data', async () => {
  const response = jsonOk({ message: 'success' });
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.deepEqual(json, { message: 'success' });
});

test('jsonOk accepts custom status code', async () => {
  const response = jsonOk({ data: 'test' }, 201);
  assert.equal(response.status, 201);
});

test('jsonCreated returns 201 response', async () => {
  const response = jsonCreated({ id: '123' });
  assert.equal(response.status, 201);
  const json = await response.json();
  assert.deepEqual(json, { id: '123' });
});

test('jsonNoContent returns 204 with no body', async () => {
  const response = jsonNoContent();
  assert.equal(response.status, 204);
  const text = await response.text();
  assert.equal(text, '');
});

test('jsonErrorRaw returns error response with code and status', async () => {
  const response = jsonErrorRaw(400, 'bad_request', 'Invalid input');
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.deepEqual(json, {
    error: 'bad_request',
    message: 'Invalid input'
  });
});

test('jsonErrorRaw includes details when provided', async () => {
  const details = { email: ['invalid'], phone: ['required'] };
  const response = jsonErrorRaw(422, 'validation_error', 'Validation failed', details);
  assert.equal(response.status, 422);
  const json = await response.json();
  assert.deepEqual(json, {
    error: 'validation_error',
    message: 'Validation failed',
    details
  });
});

test('jsonErrorRaw omits message when not provided', async () => {
  const response = jsonErrorRaw(500, 'internal_error');
  const json = await response.json();
  assert(!json.message);
  assert.equal(json.error, 'internal_error');
});

test('jsonErrorRaw omits details when not provided', async () => {
  const response = jsonErrorRaw(400, 'bad_request');
  const json = await response.json();
  assert(!json.details);
});

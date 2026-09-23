import test from 'node:test';
import assert from 'node:assert/strict';
import { ApiError, extractErrorMessage, ERRORS } from './api-error';

test('ApiError constructor sets all properties', () => {
  const error = new ApiError(400, 'bad_request', 'Bad request message');
  assert.equal(error.status, 400);
  assert.equal(error.code, 'bad_request');
  assert.equal(error.message, 'Bad request message');
  assert.equal(error.name, 'ApiError');
});

test('ApiError.toJSON returns proper structure', () => {
  const error = new ApiError(422, 'validation_error', 'Validation failed', {
    email: ['invalid_email'],
    phone: ['required']
  });
  const json = error.toJSON();
  assert.equal(json.error, 'validation_error');
  assert.equal(json.message, 'Validation failed');
  assert.deepEqual(json.details, { email: ['invalid_email'], phone: ['required'] });
});

test('ApiError.toJSON omits message if same as code', () => {
  const error = new ApiError(500, 'internal_error');
  const json = error.toJSON();
  assert.equal(json.error, 'internal_error');
  assert(!json.message);
});

test('ApiError.toJSON includes payload when present', () => {
  const payload = { remaining: 2, lockedUntil: '2024-01-01T10:00:00Z' };
  const error = new ApiError(429, 'rate_limit', 'Rate limited', undefined, payload);
  const json = error.toJSON();
  assert.deepEqual(json.payload, payload);
});

test('ApiError.toJSON omits empty payload', () => {
  const error = new ApiError(500, 'internal_error', 'Error', undefined, {});
  const json = error.toJSON();
  assert(!json.payload);
});

test('extractErrorMessage extracts from Error instance', () => {
  const err = new Error('Something went wrong');
  const message = extractErrorMessage(err);
  assert.equal(message, 'Something went wrong');
});

test('extractErrorMessage extracts from Directus SDK errors array', () => {
  const err = {
    errors: [{ message: 'Database error' }]
  };
  const message = extractErrorMessage(err);
  assert.equal(message, 'Database error');
});

test('extractErrorMessage extracts from object.message', () => {
  const err = { message: 'Object error message' };
  const message = extractErrorMessage(err);
  assert.equal(message, 'Object error message');
});

test('extractErrorMessage handles unknown errors', () => {
  const message = extractErrorMessage('raw string error');
  assert.equal(message, 'raw string error');
});

test('extractErrorMessage handles null/undefined gracefully', () => {
  const message1 = extractErrorMessage(null);
  const message2 = extractErrorMessage(undefined);
  assert.equal(typeof message1, 'string');
  assert.equal(typeof message2, 'string');
});

test('ERRORS.VALIDATION creates validation error', () => {
  const error = ERRORS.VALIDATION({ field: ['error1', 'error2'] });
  assert.equal(error.status, 422);
  assert.equal(error.code, 'validation_error');
  assert.deepEqual(error.details, { field: ['error1', 'error2'] });
});

test('ERRORS.NOT_FOUND creates not found error', () => {
  const error = ERRORS.NOT_FOUND('user');
  assert.equal(error.status, 404);
  assert.equal(error.code, 'not_found');
  assert(error.message.includes('user'));
});

test('ERRORS.NOT_FOUND uses default resource name', () => {
  const error = ERRORS.NOT_FOUND();
  assert(error.message.includes('resource'));
});

test('ERRORS.UNAUTHORIZED creates unauthorized error', () => {
  const error = ERRORS.UNAUTHORIZED();
  assert.equal(error.status, 401);
  assert.equal(error.code, 'unauthorized');
});

test('ERRORS.FORBIDDEN creates forbidden error', () => {
  const error = ERRORS.FORBIDDEN();
  assert.equal(error.status, 403);
  assert.equal(error.code, 'forbidden');
});

test('ERRORS.NETWORK creates network error', () => {
  const error = ERRORS.NETWORK();
  assert.equal(error.status, 0);
  assert.equal(error.code, 'network_error');
});

test('ERRORS.INTERNAL creates internal error', () => {
  const error = ERRORS.INTERNAL('Custom error');
  assert.equal(error.status, 500);
  assert.equal(error.code, 'internal_error');
  assert.equal(error.message, 'Custom error');
});

test('ERRORS.INTERNAL uses default message', () => {
  const error = ERRORS.INTERNAL();
  assert.equal(error.message, 'Internal server error');
});

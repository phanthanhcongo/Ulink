import assert from 'node:assert/strict';
import test from 'node:test';
import { parseOrderNotes } from './order-notes';
test('returns empty metadata for legacy plain-text notes', () => assert.deepEqual(parseOrderNotes('Giao trực tiếp tại kho'), {}));
test('parses structured checkout notes', () => assert.equal(parseOrderNotes('{"buyer":{"phone":"0900"}}').buyer?.phone, '0900'));

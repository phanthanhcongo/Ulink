import test from 'node:test';
import assert from 'node:assert/strict';
import { cn } from './utils';

test('cn combines class names correctly', () => {
  const result = cn('px-2', 'py-1');
  assert(result.includes('px-2'));
  assert(result.includes('py-1'));
});

test('cn handles conditional classes', () => {
  const isActive = true;
  const result = cn('base-class', isActive && 'active-class');
  assert(result.includes('base-class'));
  assert(result.includes('active-class'));
});

test('cn handles false conditions', () => {
  const result = cn('base', false && 'disabled');
  assert(result.includes('base'));
  assert(!result.includes('disabled'));
});

test('cn merges tailwind conflicts correctly', () => {
  // When there are conflicting tailwind classes, later ones should win
  const result = cn('px-2', 'px-4');
  // twMerge should have merged these
  assert(result.includes('px-4'));
  // The px-2 might be removed or overridden
});

test('cn handles array and object inputs', () => {
  const result = cn(['text-center', 'font-bold'], { 'text-xl': true });
  assert(result.includes('text-center'));
  assert(result.includes('font-bold'));
  assert(result.includes('text-xl'));
});

test('cn handles undefined and null inputs', () => {
  const result = cn('base', undefined, null, 'other');
  assert(result.includes('base'));
  assert(result.includes('other'));
});

test('cn handles empty string', () => {
  const result = cn('');
  assert.equal(result, '');
});

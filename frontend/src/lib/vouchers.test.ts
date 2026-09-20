import assert from 'node:assert/strict';
import { test, describe } from 'node:test';
import { validateVoucherCode, SAMPLE_VOUCHERS } from './vouchers';

describe('Voucher Validation Module', () => {
  test('validates valid code ULINKB2B with 10% discount', () => {
    const result = validateVoucherCode('ULINKB2B', 10000000, SAMPLE_VOUCHERS);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.discountAmount, 1000000);
    assert.match(result.message, /Áp dụng thành công/);
  });

  test('validates case insensitive code ulinkb2b', () => {
    const result = validateVoucherCode('ulinkb2b', 5000000, SAMPLE_VOUCHERS);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.discountAmount, 500000);
  });

  test('returns error for invalid code', () => {
    const result = validateVoucherCode('INVALID123', 5000000, SAMPLE_VOUCHERS);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.discountAmount, 0);
    assert.match(result.message, /không hợp lệ/);
  });

  test('enforces min_order_amount limit', () => {
    // ULINK10 requires 1,000,000đ subtotal
    const result = validateVoucherCode('ULINK10', 500000, SAMPLE_VOUCHERS);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.discountAmount, 0);
    assert.match(result.message, /chỉ áp dụng cho đơn hàng từ/);
  });

  test('calculates fixed discount ULINK50K', () => {
    const result = validateVoucherCode('ULINK50K', 1000000, SAMPLE_VOUCHERS);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.discountAmount, 50000);
  });
});

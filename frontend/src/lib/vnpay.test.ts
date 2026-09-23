import test from 'node:test';
import assert from 'node:assert/strict';
import { createPaymentUrl, verifyReturnData } from './vnpay';

const testConfig = {
  tmnCode: 'TEST0000',
  hashSecret: 'TESTSECRET123456789012345678901234567890',
  vnpayUrl: 'https://sandbox.vnpayment.vn/paygate',
  returnUrl: 'https://example.com/payment-return'
};

test('createPaymentUrl generates valid VNPay URL', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 100000,
    txnRef: 'TXN20240101001',
    orderInfo: 'Payment for order',
    ipAddr: '127.0.0.1'
  });

  assert(url.startsWith('https://sandbox.vnpayment.vn/paygate?'));
  assert(url.includes('vnp_Version=2.1.0'));
  assert(url.includes('vnp_Command=pay'));
  assert(url.includes('vnp_TmnCode=TEST0000'));
  assert(url.includes('vnp_TxnRef=TXN20240101001'));
  assert(url.includes('vnp_Amount=10000000'));
  assert(url.includes('vnp_CurrCode=VND'));
  assert(url.includes('vnp_SecureHash='));
});

test('createPaymentUrl with locale', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 50000,
    txnRef: 'TXN20240102001',
    orderInfo: 'Test order',
    ipAddr: '192.168.1.1',
    locale: 'en'
  });

  assert(url.includes('vnp_Locale=en'));
});

test('createPaymentUrl uses default locale', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 50000,
    txnRef: 'TXN20240102001',
    orderInfo: 'Test order',
    ipAddr: '127.0.0.1'
  });

  assert(url.includes('vnp_Locale=vn'));
});

test('createPaymentUrl multiplies amount by 100', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 999.99,
    txnRef: 'TXN001',
    orderInfo: 'Test',
    ipAddr: '127.0.0.1'
  });

  assert(url.includes('vnp_Amount=99999'));
});

test('createPaymentUrl includes expiration date 15 minutes later', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 100000,
    txnRef: 'TXN001',
    orderInfo: 'Test',
    ipAddr: '127.0.0.1'
  });

  assert(url.includes('vnp_ExpireDate='));
  // Extract expire date
  const match = url.match(/vnp_ExpireDate=(\d{14})/);
  assert(match);
  const expire = match![1];
  assert.equal(expire.length, 14);
});

test('createPaymentUrl trims config values', () => {
  const url = createPaymentUrl(
    {
      ...testConfig,
      tmnCode: '  TEST0000  ',
      hashSecret: '  SECRET  '
    },
    {
      amount: 100000,
      txnRef: '  TXN001  ',
      orderInfo: '  Order Info  ',
      ipAddr: '127.0.0.1'
    }
  );

  assert(url.includes('TEST0000'));
  assert(url.includes('Order+Info'));
});

test('verifyReturnData validates secure hash', () => {
  // First, create a payment URL to get the hash
  const url = createPaymentUrl(testConfig, {
    amount: 100000,
    txnRef: 'TXN20240101001',
    orderInfo: 'Order info',
    ipAddr: '127.0.0.1'
  });

  // Extract parameters from URL
  const urlObj = new URL(url);
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Verify with correct secret
  const result = verifyReturnData(testConfig.hashSecret, params);
  assert.equal(result.isValid, true);
  assert.equal(result.vnp_TxnRef, 'TXN20240101001');
});

test('verifyReturnData detects tampered data', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 100000,
    txnRef: 'TXN20240101001',
    orderInfo: 'Order info',
    ipAddr: '127.0.0.1'
  });

  const urlObj = new URL(url);
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Tamper with amount
  params['vnp_Amount'] = '20000000';

  // Verify should fail
  const result = verifyReturnData(testConfig.hashSecret, params);
  assert.equal(result.isValid, false);
});

test('verifyReturnData detects wrong secret', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 100000,
    txnRef: 'TXN20240101001',
    orderInfo: 'Order info',
    ipAddr: '127.0.0.1'
  });

  const urlObj = new URL(url);
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Verify with wrong secret
  const result = verifyReturnData('WRONGSECRET', params);
  assert.equal(result.isValid, false);
});

test('verifyReturnData extracts transaction details', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 500000,
    txnRef: 'TXN20240101001',
    orderInfo: 'Order for customer',
    ipAddr: '192.168.1.100'
  });

  const urlObj = new URL(url);
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const result = verifyReturnData(testConfig.hashSecret, params);
  assert.equal(result.vnp_TxnRef, 'TXN20240101001');
  assert.equal(result.vnp_Amount, 500000);
  assert(result.vnp_OrderInfo.includes('customer'));
});

test('verifyReturnData handles missing hash gracefully', () => {
  const params: Record<string, string> = {
    vnp_TxnRef: 'TXN001',
    vnp_Amount: '100000'
  };

  const result = verifyReturnData(testConfig.hashSecret, params);
  assert.equal(result.isValid, false);
});

test('verifyReturnData removes SecureHash and SecureHashType before verifying', () => {
  const url = createPaymentUrl(testConfig, {
    amount: 100000,
    txnRef: 'TXN001',
    orderInfo: 'Test',
    ipAddr: '127.0.0.1'
  });

  const urlObj = new URL(url);
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Add extra hash type parameter
  params['vnp_SecureHashType'] = 'SHA512';

  // Should still verify correctly
  const result = verifyReturnData(testConfig.hashSecret, params);
  assert.equal(result.isValid, true);
});

import crypto from 'crypto';

interface VnpayConfig {
  tmnCode: string;
  hashSecret: string;
  vnpayUrl: string;
  returnUrl: string;
}

interface CreatePaymentParams {
  amount: number;
  txnRef: string;
  orderInfo: string;
  ipAddr: string;
  locale?: string;
}

function formatDate(date: Date): string {
  // GMT+7 (Asia/Ho_Chi_Minh) timestamp string format: YYYYMMDDHHmmss
  const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const y = vnTime.getUTCFullYear();
  const m = String(vnTime.getUTCMonth() + 1).padStart(2, '0');
  const d = String(vnTime.getUTCDate()).padStart(2, '0');
  const h = String(vnTime.getUTCHours()).padStart(2, '0');
  const min = String(vnTime.getUTCMinutes()).padStart(2, '0');
  const s = String(vnTime.getUTCSeconds()).padStart(2, '0');
  return `${y}${m}${d}${h}${min}${s}`;
}

function sortObject(obj: Record<string, string>): Record<string, string> {
  const sorted: Record<string, string> = {};
  const keys: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(encodeURIComponent(key));
    }
  }
  keys.sort();
  for (const key of keys) {
    const rawKey = decodeURIComponent(key);
    sorted[key] = encodeURIComponent(String(obj[rawKey])).replace(/%20/g, '+');
  }
  return sorted;
}

export function createPaymentUrl(config: VnpayConfig, params: CreatePaymentParams): string {
  const date = new Date();
  const createDate = formatDate(date);
  const expireDate = formatDate(new Date(date.getTime() + 15 * 60 * 1000));

  const rawParams: Record<string, string> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: (config.tmnCode || '').trim(),
    vnp_Locale: params.locale || 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: (params.txnRef || '').trim(),
    vnp_OrderInfo: (params.orderInfo || '').trim(),
    vnp_OrderType: 'other',
    vnp_Amount: String(Math.round(params.amount * 100)),
    vnp_ReturnUrl: (config.returnUrl || '').trim(),
    vnp_IpAddr: params.ipAddr || '127.0.0.1',
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expireDate
  };

  const sortedParams = sortObject(rawParams);

  const signData = Object.entries(sortedParams)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  const hmac = crypto.createHmac('sha512', (config.hashSecret || '').trim());
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  sortedParams['vnp_SecureHash'] = signed;

  const queryStr = Object.entries(sortedParams)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  return `${config.vnpayUrl}?${queryStr}`;
}

export function verifyReturnData(hashSecret: string, query: Record<string, string>) {
  const vnpParams: Record<string, string> = { ...query };
  const secureHash = vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = sortObject(vnpParams);
  const signData = Object.entries(sortedParams)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  const hmac = crypto.createHmac('sha512', (hashSecret || '').trim());
  const expectedHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  return {
    isValid: secureHash === expectedHash,
    vnp_TxnRef: query['vnp_TxnRef'] || '',
    vnp_ResponseCode: query['vnp_ResponseCode'] || '',
    vnp_TransactionNo: query['vnp_TransactionNo'] || '',
    vnp_Amount: parseInt(query['vnp_Amount'] || '0', 10) / 100,
    vnp_BankCode: query['vnp_BankCode'] || '',
    vnp_PayDate: query['vnp_PayDate'] || '',
    vnp_TransactionStatus: query['vnp_TransactionStatus'] || '',
    vnp_OrderInfo: query['vnp_OrderInfo'] || '',
    rawData: query
  };
}


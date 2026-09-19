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

function sortObject(obj: Record<string, unknown>): Record<string, string> {
  const sorted: Record<string, string> = {};
  const keys: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(encodeURIComponent(key));
    }
  }
  keys.sort();
  for (const key of keys) {
    sorted[key] = encodeURIComponent(String(obj[decodeURIComponent(key)])).replace(/%20/g, '+');
  }
  return sorted;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}${h}${min}${s}`;
}

export function createPaymentUrl(config: VnpayConfig, params: CreatePaymentParams): string {
  const date = new Date();
  const vnpParams: Record<string, unknown> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: config.tmnCode,
    vnp_Locale: params.locale || 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: params.txnRef,
    vnp_OrderInfo: params.orderInfo,
    vnp_OrderType: 'other',
    vnp_Amount: params.amount * 100,
    vnp_ReturnUrl: config.returnUrl,
    vnp_IpAddr: params.ipAddr,
    vnp_CreateDate: formatDate(date),
    vnp_ExpireDate: formatDate(new Date(date.getTime() + 15 * 60 * 1000))
  };

  const sorted = sortObject(vnpParams);
  const signData = Object.entries(sorted).map(([k, v]) => `${k}=${v}`).join('&');
  const hmac = crypto.createHmac('sha512', config.hashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  sorted['vnp_SecureHash'] = signed;
  return config.vnpayUrl + '?' + Object.entries(sorted).map(([k, v]) => `${k}=${v}`).join('&');
}

export function verifyReturnData(hashSecret: string, query: Record<string, string>) {
  const vnpParams: Record<string, unknown> = { ...query };
  const secureHash = String(vnpParams['vnp_SecureHash']);
  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sorted = sortObject(vnpParams);
  const signData = Object.entries(sorted).map(([k, v]) => `${k}=${v}`).join('&');
  const hmac = crypto.createHmac('sha512', hashSecret);
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

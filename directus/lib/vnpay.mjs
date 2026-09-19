import crypto from 'crypto';

export class VnpayService {
  constructor(config = {}) {
    this.tmnCode = config.tmnCode || process.env.VNPAY_TMN_CODE || '';
    this.hashSecret = config.hashSecret || process.env.VNPAY_HASH_SECRET || '';
    this.vnpayUrl = config.vnpayUrl || process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    this.returnUrl = config.returnUrl || process.env.VNPAY_RETURN_URL || 'http://localhost:3000';
  }

  createPaymentUrl(params) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = this._formatDate(date);
    const expireDate = this._formatDate(new Date(date.getTime() + 15 * 60 * 1000));
    const returnUrl = params.returnUrl || this.returnUrl;

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = this.tmnCode;
    vnp_Params['vnp_Locale'] = params.locale || 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = params.txnRef;
    vnp_Params['vnp_OrderInfo'] = params.orderInfo;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = params.amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = params.ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = expireDate;

    vnp_Params = this._sortObject(vnp_Params);
    const signData = Object.entries(vnp_Params).map(([k, v]) => `${k}=${v}`).join('&');
    const hmac = crypto.createHmac('sha512', this.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;
    const paymentUrl = this.vnpayUrl + '?' + Object.entries(vnp_Params).map(([k, v]) => `${k}=${v}`).join('&');
    console.log(`[VNPay] Created payment URL for txnRef=${params.txnRef}, amount=${params.amount} VND`);
    return paymentUrl;
  }

  verifyReturnData(query) {
    let vnp_Params = { ...query };
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = this._sortObject(vnp_Params);
    const signData = Object.entries(vnp_Params).map(([k, v]) => `${k}=${v}`).join('&');
    const hmac = crypto.createHmac('sha512', this.hashSecret);
    const expectedHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const isValid = secureHash === expectedHash;
    if (!isValid) {
      console.warn(`[VNPay] Invalid signature for TxnRef=${query['vnp_TxnRef']}`);
    }

    return {
      isValid,
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

  _sortObject(obj) {
    const sorted = {};
    const keys = [];
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

  _formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}

export function createVnpayService(config = {}) {
  return new VnpayService(config);
}

export default VnpayService;

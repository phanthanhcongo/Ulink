'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function PaymentResult() {
  const params = useSearchParams();
  const responseCode = params.get('vnp_ResponseCode');
  const txnRef = params.get('vnp_TxnRef');
  const amount = params.get('vnp_Amount');
  const isSuccess = responseCode === '00';

  const displayAmount = amount ? (parseInt(amount, 10) / 100).toLocaleString('vi-VN') : '0';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {isSuccess ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h1>
            <p className="text-gray-600 mb-4">Đơn hàng của bạn đã được xác nhận.</p>
            <div className="bg-gray-50 rounded p-4 mb-6 text-left">
              <p className="text-sm text-gray-500">Mã giao dịch: <span className="font-mono text-gray-900">{txnRef}</span></p>
              <p className="text-sm text-gray-500">Số tiền: <span className="font-semibold text-gray-900">{displayAmount} VND</span></p>
            </div>
            <p className="text-sm text-gray-500 mb-6">Thông tin tài khoản đã được gửi qua email của bạn.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thất bại</h1>
            <p className="text-gray-600 mb-4">Giao dịch không thành công. Vui lòng thử lại.</p>
            <p className="text-sm text-gray-500 mb-6">Mã lỗi: {responseCode}</p>
          </>
        )}
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang xử lý...</div>}>
      <PaymentResult />
    </Suspense>
  );
}

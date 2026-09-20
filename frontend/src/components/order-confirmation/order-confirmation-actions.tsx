'use client';

import { Link } from '@/i18n/navigation';

interface OrderConfirmationActionsProps {
  orderCode: string;
}

export function OrderConfirmationActions({ orderCode }: OrderConfirmationActionsProps) {
  return (
    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto font-sans">
      <Link
        href="/solutions/listProduct"
        className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-lg bg-white border-[1.5px] border-[#1769E2] text-[#212121] font-semibold text-lg hover:bg-slate-50 transition-colors text-center shadow-xs"
      >
        Tiếp tục mua hàng
      </Link>
      <Link
        href={`/order-tracking/payment-invoice?orderId=${orderCode}`}
        className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-lg bg-[#2185F5] hover:bg-[#1769E2] text-white font-semibold text-lg transition-colors text-center shadow-sm"
      >
        Xem Hóa đơn
      </Link>
    </div>
  );
}

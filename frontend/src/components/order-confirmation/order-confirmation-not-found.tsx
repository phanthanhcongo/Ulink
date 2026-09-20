'use client';

import { AlertCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function OrderConfirmationNotFound() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-20 py-16 text-center space-y-6 font-sans">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <AlertCircle className="w-8 h-8 text-[#617084]" />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#162233]">Không tìm thấy đơn hàng</h1>
        <p className="text-sm text-[#617084]">
          Vui lòng kiểm tra lại mã đơn hàng hoặc đường dẫn. Thông tin đơn hàng không tồn tại trong hệ thống.
        </p>
      </div>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-[#1769E2] text-white font-semibold text-sm hover:bg-[#1257C0] transition-colors"
        >
          Quay lại trang chủ
        </Link>
        <Link
          href="/order-tracking"
          className="px-6 py-3 rounded-lg border border-[#DCE0E5] text-[#162233] font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          Danh sách đơn hàng
        </Link>
      </div>
    </div>
  );
}

'use client';

import { CheckCircle2 } from 'lucide-react';

interface OrderCustomerInfoProps {
  buyerName: string;
  taxCode: string;
  phone: string;
  address: string;
  shippingMethod: string;
  paymentMethod: string;
  isPaid: boolean;
  total: number;
}

export function OrderCustomerInfo({
  buyerName,
  taxCode,
  phone,
  address,
  shippingMethod,
  paymentMethod,
  isPaid,
  total
}: OrderCustomerInfoProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Shipping Info Card */}
      <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-8 space-y-5 shadow-2xs">
        <h3 className="text-lg font-bold text-[#162233]">
          Thông tin nhận hàng Doanh nghiệp
        </h3>
        <div className="border-b border-[#DCE0E5]" />

        <div className="space-y-4 text-sm sm:text-base">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Tên doanh nghiệp:</span>
            <span className="sm:col-span-8 font-semibold text-[#162233]">
              {buyerName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Mã số thuế:</span>
            <span className="sm:col-span-8 font-normal text-[#162233] font-mono">
              {taxCode}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Người nhận bàn giao:</span>
            <span className="sm:col-span-8 font-normal text-[#162233]">
              {buyerName} - {phone}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Địa chỉ giao hàng:</span>
            <span className="sm:col-span-8 font-normal text-[#162233] leading-relaxed">
              {address}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Phương thức vận chuyển:</span>
            <span className="sm:col-span-8 font-semibold text-[#1769E2]">
              {shippingMethod}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Details Card */}
      <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-8 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-bold text-[#162233]">
            Trạng thái thanh toán B2B
          </h3>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${isPaid ? 'bg-[#DBEAFE] text-[#1769E2]' : 'bg-amber-50 text-amber-600'}`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{isPaid ? 'Đã thanh toán' : 'Chờ xác nhận'}</span>
          </div>
        </div>
        <div className="border-b border-[#DCE0E5]" />

        <div className="space-y-4 text-sm sm:text-base">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Hình thức thanh toán:</span>
            <span className="sm:col-span-8 font-normal text-[#162233]">
              {paymentMethod}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Ngân hàng giao dịch:</span>
            <span className="sm:col-span-8 font-normal text-[#162233]">
              Vietcombank (VCB) - Chi nhánh Hồ Chí Minh
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Chủ tài khoản:</span>
            <span className="sm:col-span-8 font-semibold text-[#162233]">
              CÔNG TY TNHH ULINK VIỆT NAM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
            <span className="sm:col-span-4 text-[#617084] font-medium">Số tiền:</span>
            <span className="sm:col-span-8 font-bold text-base text-[#1769E2]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

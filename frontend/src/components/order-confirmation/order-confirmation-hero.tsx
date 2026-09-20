'use client';

import { useState } from 'react';
import { Check, Ticket, Copy, UserCheck } from 'lucide-react';
import { normalizeOrderStatus } from '@/components/orders/shared';

interface OrderConfirmationHeroProps {
  orderCode: string;
  orderDate: string;
  status?: string;
  paymentStatus?: string;
  buyerName?: string;
}

export function OrderConfirmationHero({
  orderCode,
  orderDate,
  status = '',
  paymentStatus = '',
  buyerName = ''
}: OrderConfirmationHeroProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const normStatus = normalizeOrderStatus(status, paymentStatus);
  const isCompleted = normStatus === 'completed';

  const handleCopyOrderCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (isCompleted) {
    return (
      <div className="bg-[#EBFBF5] border border-[#A3E635] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-center text-left gap-6 shadow-xs font-sans">
        {/* Checkmark Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#10B981] flex items-center justify-center shrink-0 shadow-md">
          <Check className="w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[3]" />
        </div>

        {/* Banner Text Block */}
        <div className="space-y-2 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#064E3B] tracking-tight">
            Đơn hàng đã được giao thành công!
          </h1>

          {/* Details Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base text-[#047857] pt-1">
            <div>
              <span>Mã đơn hàng: </span>
              <strong className="font-bold font-mono text-[#064E3B]">{orderCode}</strong>
              <button
                onClick={handleCopyOrderCode}
                title="Sao chép mã"
                className="ml-1.5 text-[#047857] hover:text-[#064E3B] p-0.5 inline-flex items-center cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              {copiedCode && <span className="text-xs text-emerald-700 font-bold ml-1">Đã chép!</span>}
            </div>

            <div className="hidden sm:block w-px h-4 bg-[#A3E635]" />

            <div>
              <span>Thời gian giao: </span>
              <strong className="font-semibold text-[#064E3B]">{orderDate || 'Đã giao'}</strong>
            </div>

            {buyerName && buyerName !== 'Chưa cập nhật' && (
              <>
                <div className="hidden sm:block w-px h-4 bg-[#A3E635]" />
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Người ký nhận: </span>
                  <strong className="font-semibold text-[#064E3B]">{buyerName}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F8FC] border border-[#E9EFF6] rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-6 shadow-xs font-sans">
      {/* Icon Container */}
      <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
        <Check className="w-8 h-8 text-[#1769E2] stroke-[3]" />
      </div>

      {/* Banner Text */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold text-[#162233] tracking-tight">
          Đặt hàng thành công!
        </h1>
        <p className="text-base sm:text-lg text-[#617084] font-normal leading-relaxed">
          Cảm ơn quý khách đã tin tưởng và lựa chọn ULink Industries. Đơn hàng của bạn đang được xử lý tự động.
        </p>
      </div>

      {/* Order Meta Info Pill */}
      <div className="bg-white border border-[#CAD5E2] rounded-lg px-6 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 shadow-2xs">
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <Ticket className="w-5 h-5 text-[#1769E2]" />
          <span className="text-[#162233]">
            Mã đơn hàng:{' '}
            <strong className="text-[#1769E2] font-bold font-mono ml-1">{orderCode}</strong>
          </span>
          <button
            onClick={handleCopyOrderCode}
            title="Sao chép mã đơn hàng"
            className="ml-1 text-[#1769E2] hover:text-[#1257C0] p-1 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copiedCode && <span className="text-xs text-emerald-600 font-semibold ml-1">Đã chép!</span>}
        </div>

        <div className="hidden sm:block w-px h-5 bg-[#CAD5E2]" />

        <div className="flex items-center gap-2 text-sm sm:text-base text-[#617084]">
          <span>
            Ngày đặt:{' '}
            <strong className="text-[#162233] font-semibold ml-1">{orderDate}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

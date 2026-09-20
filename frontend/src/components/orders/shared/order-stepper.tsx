'use client';

import { Check } from 'lucide-react';

interface OrderStepperProps {
  status: string;
  paymentStatus?: string;
}

export type OrderStatusKey = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'completed' | 'cancelled';

export function normalizeOrderStatus(status: string, paymentStatus?: string): OrderStatusKey {
  const s = (status || '').toLowerCase().trim();
  const p = (paymentStatus || '').toLowerCase().trim();
  const isPaid = p === 'success' || p === 'paid';

  if (s === 'cancelled' || s === 'da_huy' || s.includes('hủy') || s.includes('huy')) {
    return 'cancelled';
  }

  // 1. Giao thành công / Đã giao -> Hoàn thành (Step 5)
  if (
    s === 'completed' ||
    s === 'delivered' ||
    s === 'finished' ||
    s === 'hoan_tat' ||
    s === 'da_giao' ||
    s === 'giao_thanh_cong' ||
    s.includes('đã giao') ||
    s.includes('da giao') ||
    s.includes('hoàn tất') ||
    s.includes('hoan tat') ||
    s.includes('hoàn thành') ||
    s.includes('hoan thanh')
  ) {
    return 'completed';
  }

  // 2. Đang giao hàng / Đang vận chuyển / shipped (Step 4)
  if (
    s === 'shipped' ||
    s === 'shipping' ||
    s === 'delivering' ||
    s === 'dispatched' ||
    s === 'dang_giao' ||
    s.includes('đang giao') ||
    s.includes('dang giao') ||
    s.includes('vận chuyển')
  ) {
    return 'shipping';
  }

  // 3. Đang xử lý / Đang sản xuất (Step 3)
  if (
    s === 'processing' ||
    s === 'in_production' ||
    s === 'dang_xu_ly' ||
    s.includes('đang xử lý') ||
    s.includes('dang xu ly') ||
    s.includes('sản xuất')
  ) {
    return 'processing';
  }

  // 4. Đã xác nhận (Step 2)
  if (
    s === 'confirmed' ||
    s === 'da_xac_nhan' ||
    s.includes('xác nhận') ||
    s.includes('xac nhan')
  ) {
    return 'confirmed';
  }

  // 5. Nếu thanh toán thành công và chưa cập nhật trạng thái khác -> Mặc định Đang xử lý (Step 3)
  if (isPaid) {
    return 'processing';
  }

  // 6. Chờ xử lý / Đặt hàng / Chờ thanh toán (Step 1)
  return 'pending';
}

export function getStepIndex(status: string, paymentStatus?: string): number {
  const norm = normalizeOrderStatus(status, paymentStatus);
  switch (norm) {
    case 'completed':
      return 5;
    case 'shipping':
      return 4;
    case 'processing':
      return 3;
    case 'confirmed':
      return 2;
    case 'pending':
    case 'cancelled':
    default:
      return 1;
  }
}

export function OrderStepper({ status, paymentStatus }: OrderStepperProps) {
  const currentStep = getStepIndex(status, paymentStatus);

  const steps = [
    { number: 1, label: 'Đặt hàng' },
    { number: 2, label: 'Xác nhận' },
    { number: 3, label: 'Đang xử lý' },
    { number: 4, label: 'Đang giao' },
    { number: 5, label: 'Hoàn thành' }
  ];

  return (
    <div className="space-y-4 font-sans">
      <h2 className="text-xl font-bold text-[#162233]">
        Trạng thái xử lý đơn hàng B2B
      </h2>

      {/* Step Progress Bar (Checkout Stepper Style) */}
      <div className="overflow-x-auto pb-1">
        <div className="flex w-full min-w-[650px] overflow-hidden rounded-lg border border-[#DCE0E5] shadow-2xs">
          {steps.map((step) => {
            const isPast = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            let containerBg = 'bg-[#F5F8FC] text-[#617084] border-r border-[#E9EFF6] last:border-r-0';
            let badgeStyle = 'bg-white border border-[#CAD5E2] text-[#617084]';
            let textStyle = 'font-medium text-[#617084]';

            if (isCurrent) {
              containerBg = 'bg-[#1769E2] text-white border-r border-[#1257C0] last:border-r-0';
              badgeStyle = 'bg-white text-[#1769E2]';
              textStyle = 'font-bold text-white';
            } else if (isPast) {
              containerBg = 'bg-[#E5EDFA] text-[#1769E2] border-r border-[#CAD5E2] last:border-r-0';
              badgeStyle = 'bg-[#1769E2] text-white';
              textStyle = 'font-semibold text-[#1769E2]';
            }

            return (
              <div
                key={step.number}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-3 text-sm transition-colors ${containerBg}`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs shrink-0 font-bold ${badgeStyle}`}>
                  {isPast || isCurrent ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    step.number
                  )}
                </span>
                <span className={`tracking-wide text-xs sm:text-sm whitespace-nowrap ${textStyle}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

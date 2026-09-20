'use client';

import Image from 'next/image';
import { Package } from 'lucide-react';
import { resolveImageUrl } from '@/lib/image-url';
import type { DetailedOrderItem } from '@/lib/order-data';

interface OrderItemsSummaryProps {
  itemsList: DetailedOrderItem[];
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
  subtotal: number;
  tax: number;
  total: number;
}

export function OrderItemsSummary({
  itemsList,
  dbProductMap = {},
  subtotal,
  tax,
  total
}: OrderItemsSummaryProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="bg-[#F5F8FC] border border-[#DCE0E5] rounded-xl p-6 space-y-5 shadow-2xs font-sans">
      <h3 className="text-lg font-bold text-[#162233]">
        Đơn hàng đã đặt
      </h3>
      <div className="border-b border-[#DCE0E5]" />

      {/* Cart Items List */}
      <div className="space-y-4">
        {itemsList.map((item, idx) => {
          const rawHero =
            item.hero ||
            dbProductMap[item.sku]?.hero ||
            dbProductMap[item.productName]?.hero ||
            dbProductMap[item.productName?.trim()?.toLowerCase()]?.hero;

          let resolvedHeroUrl = resolveImageUrl(rawHero);
          if (
            resolvedHeroUrl &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
              resolvedHeroUrl.replace(/^\//, '')
            )
          ) {
            resolvedHeroUrl = `/api/files/${resolvedHeroUrl.replace(/^\//, '')}`;
          }

          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] rounded bg-[#DDE1E6] shrink-0 overflow-hidden relative flex items-center justify-center border border-slate-200">
                {resolvedHeroUrl ? (
                  <Image
                    src={resolvedHeroUrl}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Package className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#162233] truncate">
                  {item.productName}
                </h4>
                <p className="text-xs text-[#617084] mt-0.5">
                  SL: {item.quantity} x {formatPrice(item.unitPrice)}
                </p>
              </div>
              <span className="text-sm font-bold text-[#162233] shrink-0">
                {formatPrice(item.lineTotal)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-b border-[#DCE0E5]" />

      {/* Price Calculations */}
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-[#495057]">Tạm tính</span>
          <span className="font-semibold text-[#162233]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#495057]">Thuế VAT (8%)</span>
          <span className="font-semibold text-[#162233]">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#495057]">Phí vận chuyển</span>
          <span className="font-semibold text-[#16A34A]">Miễn phí</span>
        </div>
      </div>

      <div className="border-b border-[#DCE0E5]" />

      {/* Total Row */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="text-base font-bold text-[#162233]">Tổng cộng</span>
          <span className="text-2xl font-bold text-[#1769E2]">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-[#617084]">
          Đã bao gồm thuế GTGT nhập khẩu B2B đầy đủ.
        </p>
      </div>
    </div>
  );
}

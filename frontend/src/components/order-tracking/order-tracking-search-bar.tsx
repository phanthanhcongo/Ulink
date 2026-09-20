'use client';

import { Search, ShoppingBag, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import type { DetailedOrder } from '@/lib/order-data';

interface OrderTrackingSearchBarProps {
  inputCode: string;
  setInputCode: (val: string) => void;
  searchLoading: boolean;
  errorMsg: string | null;
  trackedOrder: DetailedOrder | null;
  allOrders: DetailedOrder[];
  onSearchSubmit: (e: React.FormEvent) => void;
  onSelectOrder: (ord: DetailedOrder) => void;
  onBackToList: () => void;
}

export function OrderTrackingSearchBar({
  inputCode,
  setInputCode,
  searchLoading,
  errorMsg,
  trackedOrder,
  allOrders,
  onSearchSubmit,
  onSelectOrder,
  onBackToList
}: OrderTrackingSearchBarProps) {
  return (
    <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-8 space-y-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9EFF6] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#162233] tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#1769E2]" />
            <span>Tra cứu & Danh sách đơn hàng B2B</span>
          </h1>
          <p className="text-sm text-[#617084] mt-1">
            Nhập mã đơn hàng (e.g. ULK-14, ORD_14_...), SĐT hoặc Email để tra cứu thông tin và tiến độ thực tế.
          </p>
        </div>
        {trackedOrder && (
          <button
            onClick={onBackToList}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#162233] hover:text-[#1769E2] bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors w-fit shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem tất cả đơn hàng</span>
          </button>
        )}
      </div>

      {/* Search Bar Form */}
      <form onSubmit={onSearchSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#617084]" />
            <input
              type="text"
              placeholder="Nhập mã đơn hàng (e.g. ULK-14, ORD_14_1789883794180)..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#DCE0E5] bg-white text-sm text-[#162233] font-semibold outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={searchLoading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1769E2] hover:bg-[#1257C0] text-white font-bold text-sm shadow-xs transition-colors disabled:opacity-70 shrink-0 cursor-pointer"
          >
            {searchLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang tra cứu...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Tra cứu đơn hàng</span>
              </>
            )}
          </button>
        </div>

        {allOrders.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-[#617084] overflow-x-auto pt-1">
            <span className="font-semibold shrink-0">Mã đơn hàng mẫu trong DB:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {allOrders.slice(0, 4).map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => onSelectOrder(ord)}
                  className="font-mono bg-blue-50 text-[#1769E2] border border-blue-200 hover:bg-blue-100 px-2.5 py-0.5 rounded text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                >
                  {ord.code}
                </button>
              ))}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-xs text-rose-700 flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}
      </form>
    </div>
  );
}

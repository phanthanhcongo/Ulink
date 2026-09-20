'use client';

import { Package, Search, FileText, Check, Truck, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { DetailedOrder } from '@/lib/order-data';
import { normalizeOrderStatus } from '@/components/orders/shared';

interface OrderTrackingListViewProps {
  allOrders: DetailedOrder[];
  filteredOrders: DetailedOrder[];
  activeTab: 'all' | 'confirmed' | 'shipping' | 'completed';
  setActiveTab: (tab: 'all' | 'confirmed' | 'shipping' | 'completed') => void;
  onSelectOrder: (ord: DetailedOrder) => void;
  formatPrice: (amount: number) => string;
}

export function OrderTrackingListView({
  allOrders,
  filteredOrders,
  activeTab,
  setActiveTab,
  onSelectOrder,
  formatPrice
}: OrderTrackingListViewProps) {
  const getStatusBadge = (status: string, paymentStatus?: string) => {
    const norm = normalizeOrderStatus(status, paymentStatus);
    switch (norm) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            Đã hoàn thành
          </span>
        );
      case 'shipping':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
            <Truck className="w-3 h-3 text-blue-600" />
            Đang vận chuyển
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Đang xử lý
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
            <Check className="w-3 h-3 text-slate-500" />
            Đã xác nhận
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-200">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
            <Clock className="w-3 h-3 text-slate-500" />
            Chờ xử lý
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-[#DCE0E5] rounded-xl shadow-2xs overflow-hidden space-y-4 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9EFF6] pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#162233]">
            Danh sách đơn hàng đã đặt ({filteredOrders.length})
          </h2>
          <p className="text-xs text-[#617084] mt-0.5">
            Xem lại danh sách tất cả các đơn hàng B2B đã khởi tạo trong hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#F5F8FC] p-1 rounded-lg text-xs font-medium self-start sm:self-auto overflow-x-auto border border-[#E9EFF6]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-white text-[#1769E2] font-bold shadow-2xs' : 'text-[#617084] hover:text-[#162233]'
            }`}
          >
            Tất cả ({allOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'confirmed' ? 'bg-white text-[#1769E2] font-bold shadow-2xs' : 'text-[#617084] hover:text-[#162233]'
            }`}
          >
            Đã xác nhận
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'shipping' ? 'bg-white text-[#1769E2] font-bold shadow-2xs' : 'text-[#617084] hover:text-[#162233]'
            }`}
          >
            Đang giao
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-[#162233]">Chưa có đơn hàng nào</p>
          <p className="text-xs text-[#617084]">Khởi tạo đơn hàng mới trên hệ thống để xem lịch sử.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#E9EFF6] overflow-x-auto">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 px-3 rounded-lg transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-sm text-[#162233]">{ord.code}</span>
                  {getStatusBadge(ord.status, ord.payment_status)}
                </div>
                <p className="text-xs text-[#617084]">
                  Khách hàng: <strong className="font-medium text-[#162233]">{ord.buyerName || 'B2B Partner'}</strong>
                  {ord.order_date && ` • ${ord.order_date}`}
                </p>
                <p className="text-xs text-[#617084]">
                  Sản phẩm: {ord.items.length} mặt hàng ({ord.items.map((i) => i.productName).slice(0, 2).join(', ')}...)
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-xs text-[#617084]">Tổng tiền:</p>
                  <p className="text-sm font-bold text-[#1769E2]">{formatPrice(ord.total)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectOrder(ord)}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-blue-50 text-[#1769E2] hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Chi tiết</span>
                  </button>

                  <Link
                    href={`/order-tracking/payment-invoice?orderId=${ord.code}`}
                    className="inline-flex items-center gap-1 text-xs font-bold border border-[#DCE0E5] hover:border-[#1769E2] text-[#162233] hover:text-[#1769E2] px-3 py-2 rounded-lg transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Hóa đơn</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

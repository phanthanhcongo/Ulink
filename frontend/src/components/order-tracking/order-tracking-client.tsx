'use client';

import { useState } from 'react';
import {
  Check,
  Ticket,
  Copy,
  ChevronRight,
  Truck,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { AuthUser } from '@/lib/auth-helpers';
import type { DetailedOrder } from '@/lib/order-data';

import {
  OrderStepper,
  OrderCustomerInfo,
  OrderItemsSummary,
  OrderDeliveryCompletedView,
  normalizeOrderStatus
} from '@/components/orders/shared';
import { OrderTrackingSearchBar } from './order-tracking-search-bar';
import { OrderTrackingListView } from './order-tracking-list-view';
import { OrderConfirmationHero } from '@/components/order-confirmation/order-confirmation-hero';

interface OrderTrackingClientProps {
  user: AuthUser | null;
  locale: string;
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
  initialOrder?: DetailedOrder | null;
  allOrders?: DetailedOrder[];
}

export default function OrderTrackingClient({
  user,
  locale,
  dbProductMap = {},
  initialOrder = null,
  allOrders = []
}: OrderTrackingClientProps) {
  const [inputCode, setInputCode] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<DetailedOrder | null>(initialOrder || null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'shipping' | 'completed'>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const handleCopyOrderCode = () => {
    if (!trackedOrder) return;
    navigator.clipboard.writeText(trackedOrder.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanQuery = inputCode.trim();
    if (!cleanQuery) {
      setErrorMsg('Vui lòng nhập mã đơn hàng, số điện thoại hoặc email để tra cứu.');
      return;
    }

    // 1. Check memory first
    const foundInMemory = allOrders.find((ord) => {
      const q = cleanQuery.toLowerCase();
      const c = ord.code.toLowerCase();
      const idStr = String(ord.id);
      const ordId = `ord_${idStr}_`;
      const phone = ord.phone?.toLowerCase() || '';
      const email = ord.email?.toLowerCase() || '';
      return (
        c === q ||
        c.includes(q) ||
        idStr === q ||
        q.startsWith(ordId) ||
        (phone && phone.includes(q)) ||
        (email && email.includes(q))
      );
    });

    if (foundInMemory) {
      setTrackedOrder(foundInMemory);
      return;
    }

    // 2. Fetch API by code
    setSearchLoading(true);
    try {
      const res = await fetch(`/api/orders?code=${encodeURIComponent(cleanQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setTrackedOrder(data.order);
          setSearchLoading(false);
          return;
        }
      }
      setErrorMsg(`Không tìm thấy thông tin đơn hàng phù hợp với "${cleanQuery}".`);
    } catch {
      setErrorMsg('Đã xảy ra lỗi khi kết nối máy chủ. Vui lòng thử lại sau.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleBackToList = () => {
    setTrackedOrder(null);
  };

  const handleSelectOrder = (ord: DetailedOrder) => {
    setTrackedOrder(ord);
  };

  const filteredOrders = allOrders.filter((ord) => {
    const norm = normalizeOrderStatus(ord.status, ord.payment_status);
    if (activeTab === 'all') return true;
    if (activeTab === 'confirmed') return norm === 'confirmed' || norm === 'processing';
    if (activeTab === 'shipping') return norm === 'shipping';
    if (activeTab === 'completed') return norm === 'completed';
    return true;
  });

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
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-20 pt-3 pb-10 space-y-6 font-sans text-[#162233]">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-[#617084] font-medium"
      >
        <Link href="/" className="hover:text-[#1769E2] transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#617084]" />
        <Link href="/order-tracking" className="hover:text-[#1769E2] transition-colors">
          Tra cứu & Danh sách đơn hàng
        </Link>
        {trackedOrder && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-[#617084]" />
            <span className="text-[#162233] font-semibold">{trackedOrder.code}</span>
          </>
        )}
      </nav>

      {/* 1. Top Search Bar (Chỉ xuất hiện đối với tài khoản Khách vãng lai và không xem chi tiết) */}
      {!user && !trackedOrder && (
        <OrderTrackingSearchBar
          inputCode={inputCode}
          setInputCode={setInputCode}
          searchLoading={searchLoading}
          errorMsg={errorMsg}
          trackedOrder={trackedOrder}
          allOrders={allOrders}
          onSearchSubmit={handleTrackSubmit}
          onSelectOrder={handleSelectOrder}
          onBackToList={handleBackToList}
        />
      )}

      {/* 2. STATE 1: VIEW DETAILED ORDER CONFIRMATION & TRACKING */}
      {trackedOrder ? (
        <div className="space-y-8">
          {/* Order Status Hero */}
          <OrderConfirmationHero
            orderCode={trackedOrder.code}
            orderDate={trackedOrder.order_date}
            status={trackedOrder.status}
            paymentStatus={trackedOrder.payment_status}
            buyerName={trackedOrder.buyerName}
          />

          {/* Stepper */}
          <OrderStepper status={trackedOrder.status} paymentStatus={trackedOrder.payment_status} />

          {/* Two Column Layout / Delivery Completed Layout */}
          {normalizeOrderStatus(trackedOrder.status, trackedOrder.payment_status) === 'completed' ? (
            <OrderDeliveryCompletedView
              orderCode={trackedOrder.code}
              shippingMethod={trackedOrder.shippingMethod}
              itemCount={trackedOrder.items?.length || 2}
              totalWeight={700}
              totalAmount={trackedOrder.total}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Customer & Delivery Cards */}
              <div className="lg:col-span-7">
                <OrderCustomerInfo
                  buyerName={trackedOrder.buyerName || 'Chưa cập nhật'}
                  taxCode={trackedOrder.taxCode || 'Chưa cập nhật'}
                  phone={trackedOrder.phone || 'Chưa cập nhật'}
                  address={trackedOrder.address || 'Chưa cập nhật'}
                  shippingMethod={trackedOrder.shippingMethod || 'Giao hàng tiêu chuẩn ULink Fleet (Miễn phí)'}
                  paymentMethod={trackedOrder.paymentMethod || 'Chuyển khoản tài khoản ngân hàng Doanh nghiệp'}
                  isPaid={trackedOrder.payment_status === 'success' || trackedOrder.payment_status === 'paid' || trackedOrder.status === 'confirmed'}
                  total={trackedOrder.total}
                />
              </div>

              {/* Order Items & Totals Summary */}
              <div className="lg:col-span-5">
                <OrderItemsSummary
                  itemsList={trackedOrder.items || []}
                  dbProductMap={dbProductMap}
                  subtotal={trackedOrder.subtotal}
                  tax={trackedOrder.tax}
                  total={trackedOrder.total}
                />
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <button
              onClick={handleBackToList}
              className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-lg bg-white border-[1.5px] border-[#1769E2] text-[#212121] font-semibold text-lg hover:bg-slate-50 transition-colors text-center shadow-xs cursor-pointer"
            >
              Danh sách đơn hàng
            </button>
            <Link
              href={`/order-tracking/payment-invoice?orderId=${trackedOrder.code}`}
              className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-lg bg-[#2185F5] hover:bg-[#1769E2] text-white font-semibold text-lg transition-colors text-center shadow-sm"
            >
              Xem Hóa đơn
            </Link>
          </div>
        </div>
      ) : (
        /* 3. STATE 2: LIST OF ALL ORDERS */
        <OrderTrackingListView
          allOrders={allOrders}
          filteredOrders={filteredOrders}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectOrder={handleSelectOrder}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
}

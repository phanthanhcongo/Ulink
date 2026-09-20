'use client';

import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { AuthUser } from '@/lib/auth-helpers';
import type { DetailedOrder } from '@/lib/order-data';

import {
  OrderStepper,
  OrderCustomerInfo,
  OrderItemsSummary,
  OrderVatForm,
  OrderDeliveryCompletedView,
  normalizeOrderStatus
} from '@/components/orders/shared';
import { OrderConfirmationNotFound } from './order-confirmation-not-found';
import { OrderConfirmationHero } from './order-confirmation-hero';
import { OrderConfirmationActions } from './order-confirmation-actions';

interface OrderConfirmationClientProps {
  user: AuthUser | null;
  locale: string;
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
  orderData?: DetailedOrder | null;
}

export default function OrderConfirmationClient({
  user,
  locale,
  dbProductMap = {},
  orderData = null
}: OrderConfirmationClientProps) {
  if (!orderData) {
    return <OrderConfirmationNotFound />;
  }

  const orderCode = orderData.code;
  const orderDate = orderData.order_date;
  const buyerName = orderData.buyerName || 'Chưa cập nhật';
  const taxCode = orderData.taxCode || 'Chưa cập nhật';
  const phone = orderData.phone || 'Chưa cập nhật';
  const address = orderData.address || 'Chưa cập nhật';
  const email = orderData.email || '';
  const shippingMethod = orderData.shippingMethod || 'Giao hàng tiêu chuẩn ULink Fleet (Miễn phí)';
  const paymentMethod = orderData.paymentMethod || 'Chuyển khoản tài khoản ngân hàng Doanh nghiệp';
  const isPaid = orderData.payment_status === 'success' || orderData.payment_status === 'paid' || orderData.status === 'confirmed';

  const subtotal = orderData.subtotal;
  const tax = orderData.tax;
  const total = orderData.total;
  const itemsList = orderData.items || [];

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
          Đơn hàng B2B
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#617084]" />
        <span className="text-[#162233] font-semibold">Xác nhận {orderCode}</span>
      </nav>

      {/* Section 1: Success Hero */}
      <OrderConfirmationHero
        orderCode={orderCode}
        orderDate={orderDate}
        status={orderData.status}
        paymentStatus={orderData.payment_status}
        buyerName={buyerName}
      />

      {/* Section 2: Order Timeline Section */}
      <OrderStepper
        status={orderData.status}
        paymentStatus={orderData.payment_status}
      />

      {/* Section 3: Two Column Details / Delivery Completed Layout */}
      {normalizeOrderStatus(orderData.status, orderData.payment_status) === 'completed' ? (
        <OrderDeliveryCompletedView
          orderCode={orderCode}
          shippingMethod={shippingMethod}
          itemCount={itemsList.length || 2}
          totalWeight={700}
          totalAmount={total}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Shipping & Payment Cards */}
          <div className="lg:col-span-7 space-y-6">
            <OrderCustomerInfo
              buyerName={buyerName}
              taxCode={taxCode}
              phone={phone}
              address={address}
              shippingMethod={shippingMethod}
              paymentMethod={paymentMethod}
              isPaid={isPaid}
              total={total}
            />
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <OrderItemsSummary
              itemsList={itemsList}
              dbProductMap={dbProductMap}
              subtotal={subtotal}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      )}

      {/* Section 4: Action Bar */}
      <OrderConfirmationActions
        orderCode={orderCode}
      />

      {/* Section 5: VAT Invoice Registration Form */}
      <OrderVatForm
        orderCode={orderCode}
        defaultCompanyName={buyerName !== 'Chưa cập nhật' ? buyerName : ''}
        defaultTaxCode={taxCode !== 'Chưa cập nhật' ? taxCode : ''}
        defaultCompanyAddress={address !== 'Chưa cập nhật' ? address : ''}
        defaultInvoiceEmail={email}
        phone={phone !== 'Chưa cập nhật' ? phone : ''}
      />
    </div>
  );
}

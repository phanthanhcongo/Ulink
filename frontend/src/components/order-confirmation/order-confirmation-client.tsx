'use client';

import { useState } from 'react';
import {
  Check,
  Ticket,
  ShoppingBag,
  Factory,
  Truck,
  Package,
  CheckCircle2,
  Copy,
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { AuthUser } from '@/lib/auth-helpers';
import { resolveImageUrl } from '@/lib/image-url';
import { submitContactRequest } from '@/lib/contact-submit';
import type { DetailedOrder } from '@/lib/order-data';

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
  const [copiedCode, setCopiedCode] = useState(false);
  const [vatSubmitting, setVatSubmitting] = useState(false);
  const [vatSubmitted, setVatSubmitted] = useState(false);
  const [vatError, setVatError] = useState<string | null>(null);

  const [vatFormData, setVatFormData] = useState({
    companyName: orderData?.buyerName || '',
    taxCode: orderData?.taxCode || '',
    companyAddress: orderData?.address || '',
    invoiceEmail: orderData?.email || '',
    agreeTerms: true
  });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  if (!orderData) {
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

  const orderCode = orderData.code;
  const orderDate = orderData.order_date;
  const buyerName = orderData.buyerName || 'Chưa cập nhật';
  const taxCode = orderData.taxCode || 'Chưa cập nhật';
  const phone = orderData.phone || 'Chưa cập nhật';
  const address = orderData.address || 'Chưa cập nhật';
  const shippingMethod = orderData.shippingMethod || 'Giao hàng tiêu chuẩn ULink Fleet (Miễn phí)';
  const paymentMethod = orderData.paymentMethod || 'Chuyển khoản tài khoản ngân hàng Doanh nghiệp';
  const isPaid = orderData.payment_status === 'success' || orderData.payment_status === 'paid' || orderData.status === 'confirmed';

  const subtotal = orderData.subtotal;
  const tax = orderData.tax;
  const total = orderData.total;
  const itemsList = orderData.items || [];

  const handleCopyOrderCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleVatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vatFormData.agreeTerms) return;

    setVatSubmitting(true);
    setVatError(null);

    const payload = {
      name: vatFormData.companyName,
      email: vatFormData.invoiceEmail,
      phone: vatFormData.taxCode ? `MST:${vatFormData.taxCode}` : phone,
      subject: `[Đăng ký nhận Hóa đơn VAT] Đơn hàng ${orderCode} - ${vatFormData.companyName}`,
      message: `Yêu cầu xuất hóa đơn VAT điện tử B2B:\n- Mã đơn hàng: ${orderCode}\n- Tên doanh nghiệp: ${vatFormData.companyName}\n- Mã số thuế: ${vatFormData.taxCode}\n- Địa chỉ công ty: ${vatFormData.companyAddress}\n- Email nhận hóa đơn: ${vatFormData.invoiceEmail}`
    };

    const res = await submitContactRequest(payload);
    setVatSubmitting(false);

    if (res.ok) {
      setVatSubmitted(true);
    } else {
      setVatError(res.message);
    }
  };

  // Determine current active step (1 to 5) based on order status from DB
  const getStepIndex = (status: string): number => {
    const s = (status || '').toLowerCase();
    if (s === 'completed' || s === 'delivered' || s === 'finished') return 5;
    if (s === 'shipping' || s === 'delivering' || s === 'dispatched') return 4;
    if (s === 'processing' || s === 'in_production') return 3;
    if (s === 'confirmed' || s === 'pending') return 2;
    return 1; // 'created', 'draft', 'payment_required'
  };

  const currentStep = getStepIndex(orderData.status);

  const steps = [
    { number: 1, label: 'Đặt hàng', icon: ShoppingBag },
    { number: 2, label: 'Xác nhận', icon: Check },
    { number: 3, label: 'Đang xử lý', icon: Factory },
    { number: 4, label: 'Đang giao', icon: Truck },
    { number: 5, label: 'Hoàn thành', icon: Package }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-20 py-8 lg:py-12 space-y-8 font-sans text-[#162233]">
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
      <div className="bg-[#F5F8FC] border border-[#E9EFF6] rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-6 shadow-xs">
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

      {/* Section 2: Order Timeline Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#162233]">
          Trạng thái xử lý đơn hàng B2B
        </h2>

        {/* Timeline Stepper Container */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center justify-between min-w-[700px] px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isPast = step.number < currentStep;
              const isCurrent = step.number === currentStep;

              return (
                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div
                      className={
                        isCurrent
                          ? 'w-14 h-14 rounded-full bg-[#1257C0] flex items-center justify-center shadow-[0_0_16px_2px_rgba(18,87,192,0.2),0_4px_8px_0_rgba(18,87,192,0.1)] ring-4 ring-blue-100'
                          : isPast
                          ? 'w-12 h-12 rounded-full bg-[#1257C0] flex items-center justify-center shadow-[0_4px_8px_0_rgba(18,87,192,0.1)]'
                          : 'w-12 h-12 rounded-full bg-[#F5F8FC] border-2 border-[#E9EFF6] flex items-center justify-center'
                      }
                    >
                      <Icon
                        className={
                          isCurrent || isPast
                            ? 'w-6 h-6 text-white'
                            : 'w-6 h-6 text-[#617084]'
                        }
                      />
                    </div>
                    <div
                      className={
                        isCurrent
                          ? 'bg-[#DBEAFE] px-3 py-1.5 rounded-xl'
                          : 'bg-[#F5F8FC] px-3 py-1.5 rounded-xl'
                      }
                    >
                      <span
                        className={
                          isCurrent
                            ? 'text-sm font-semibold text-[#1257C0]'
                            : isPast
                            ? 'text-sm font-semibold text-[#162233]'
                            : 'text-sm font-semibold text-[#617084]'
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 mx-2 h-1 rounded-full max-w-[120px] ${
                        step.number < currentStep ? 'bg-[#1257C0]' : 'bg-[#E9EFF6]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 3: Two Column Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Shipping & Payment Cards */}
        <div className="lg:col-span-7 space-y-6">
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

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F5F8FC] border border-[#DCE0E5] rounded-xl p-6 space-y-5 shadow-2xs">
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
              {!orderData && (
                <div className="flex justify-between items-center">
                  <span className="text-[#495057]">Mã giảm giá B2B</span>
                  <span className="font-semibold text-[#E54333]">-1.500.000đ</span>
                </div>
              )}
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
        </div>
      </div>

      {/* Section 4: Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
        <Link
          href="/products"
          className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-lg bg-white border-[1.5px] border-[#1769E2] text-[#212121] font-semibold text-lg hover:bg-slate-50 transition-colors text-center shadow-xs"
        >
          Tiếp tục mua hàng
        </Link>
        <Link
          href="/order-tracking/payment-invoice"
          className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-lg bg-[#2185F5] hover:bg-[#1769E2] text-white font-semibold text-lg transition-colors text-center shadow-sm"
        >
          Xem Hóa đơn
        </Link>
      </div>

      {/* Section 5: VAT Invoice Registration Form */}
      <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-10 space-y-6 shadow-2xs">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#162233] uppercase tracking-wide">
            ĐĂNG KÝ NHẬN HÓA ĐƠN VAT
          </h2>
          <p className="text-sm text-[#617084]">
            Vui lòng điền đầy đủ thông tin dưới đây để nhận hóa đơn VAT điện tử. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc.
          </p>
        </div>

        {vatSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Đã gửi yêu cầu nhận hóa đơn VAT thành công!</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Hóa đơn VAT điện tử sẽ được khởi tạo và gửi tới email <strong className="font-semibold">{vatFormData.invoiceEmail}</strong> sau khi xác minh đơn hàng.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVatSubmit} className="space-y-5">
            {vatError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{vatError}</span>
              </div>
            )}

            {/* Grid Row 1: Tên công ty & Mã số thuế */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#162233]">
                  Tên công ty
                </label>
                <input
                  type="text"
                  required
                  value={vatFormData.companyName}
                  onChange={(e) => setVatFormData({ ...vatFormData, companyName: e.target.value })}
                  placeholder="Nhập tên công ty"
                  className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#162233]">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  required
                  value={vatFormData.taxCode}
                  onChange={(e) => setVatFormData({ ...vatFormData, taxCode: e.target.value })}
                  placeholder="Nhập mã số thuế"
                  className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Row 2: Địa chỉ công ty */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#162233]">
                Địa chỉ công ty
              </label>
              <input
                type="text"
                required
                value={vatFormData.companyAddress}
                onChange={(e) => setVatFormData({ ...vatFormData, companyAddress: e.target.value })}
                placeholder="Nhập địa chỉ công ty"
                className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
              />
            </div>

            {/* Row 3: Email nhận hóa đơn */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#162233]">
                Email nhận hóa đơn
              </label>
              <input
                type="email"
                required
                value={vatFormData.invoiceEmail}
                onChange={(e) => setVatFormData({ ...vatFormData, invoiceEmail: e.target.value })}
                placeholder="Nhập email nhận hóa đơn"
                className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
              />
            </div>

            {/* Row 4: Checkbox terms */}
            <div className="pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={vatFormData.agreeTerms}
                  onChange={(e) => setVatFormData({ ...vatFormData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 rounded text-[#1769E2] focus:ring-[#1769E2] accent-[#1769E2] border-[#DCE0E5] cursor-pointer"
                />
                <span className="text-sm font-semibold text-[#162233]">
                  Tôi đồng ý với điều khoản đăng ký
                </span>
              </label>
            </div>

            {/* Row 5: Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!vatFormData.agreeTerms || vatSubmitting}
                className="bg-[#1769E2] hover:bg-[#1257C0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                {vatSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {vatSubmitting ? 'Đang gửi...' : 'Gửi đi'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}



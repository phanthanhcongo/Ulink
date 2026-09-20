'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Tag,
  Package,
  CheckCircle2,
  CalendarDays,
  ShieldCheck,
  Copy,
  Check,
  CreditCard,
  Truck,
  X,
  Search,
  Wallet,
  Landmark,
  ShoppingBag,
  Lock,
  Banknote,
  QrCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AuthUser } from '@/lib/auth-helpers';
import { readCart, persistCart, type CartItem } from '@/components/rfq/cart-types';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getDirectusUrlClient } from '@/lib/directus-runtime.mjs';
import { resolveImageUrl } from '@/lib/image-url';

export interface SuggestedProduct {
  sku: string;
  slug: string;
  name: string;
  priceText: string;
  moq: number;
  moqText: string;
  desc: string;
  hub: string;
  hero: string | null;
}

export default function CheckoutClient({
  user,
  locale,
  dbProductMap = {}
}: {
  user: AuthUser | null;
  locale: string;
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
}) {
  const t = useTranslations('checkoutPage');
  const DIRECTUS_URL = getDirectusUrlClient();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states (prefilled realistic B2B data)
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'purchasing@ulink-partner.vn',
    province: 'Hà Nam',
    district: 'Kim Bảng',
    ward: 'Đại Cương',
    address: 'Lô CN05, KCN Đồng Văn IV, xã Đại Cương, Kim Bảng',
    note: 'Giao hàng vào giờ hành chính, liên hệ trước 30 phút để chuẩn bị xe nâng hạ hàng.'
  });

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod' | 'wallet' | 'vnpay'>('vnpay');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | '3pl'>('standard');
  const [carrierName, setCarrierName] = useState('');
  const [carrierAccount, setCarrierAccount] = useState('');
  const [show3plModal, setShow3plModal] = useState(false);
  const [carrierSearch, setCarrierSearch] = useState('');
  const [unsupportedToast, setUnsupportedToast] = useState('');

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; name: string } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  useEffect(() => {
    setCart(readCart());
    setOrderId('UL-' + Math.floor(100000 + Math.random() * 900000));
    try {
      const savedVoucherStr = localStorage.getItem('ulink_applied_voucher');
      if (savedVoucherStr) {
        const parsed = JSON.parse(savedVoucherStr);
        if (parsed?.code) {
          setPromoCode(parsed.code);
          setAppliedVoucher(parsed.voucher || { code: parsed.code, name: 'Chiết khấu B2B' });
          setDiscountAmount(parsed.discountAmount || 0);
          setPromoSuccess(`Đã áp dụng mã "${parsed.code}" từ giỏ hàng.`);
        }
      }
    } catch {}
  }, []);

  // Simple client-side directus url fallback
  function getDirectusUrlClient() {
    return process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
  }

  // B2B Pricing calculations (aligned with tier multiplier)
  const getProductBasePrice = (sku: string) => {
    const prices: Record<string, number> = {
      'UL-PF-2002': 54861,
      'UL-PE-1008': 33333,
      'CR-GLV-001': 3472,
      'polyester-cleanroom-wipers': 347222,
      'tyvek-cleanroom-coverall': 250000,
      'cleanroom-face-mask-3ply': 104166,
      'esd-wrist-strap': 62500,
      'esd-table-mat-2layer': 1666666,
      'ipa-cleanroom-grade-999': 131944,
      'sticky-mat-30-layers': 208333,
      'esd-shielding-bag': 4861,
      'sterile-latex-cleanroom-gloves': 6250
    };
    return prices[sku] || 100000;
  };

  const getTierMultiplier = (qty: number): number => {
    if (qty < 100) return 1.2;
    if (qty < 300) return 1.0;
    if (qty < 500) return 0.84;
    return 0.72;
  };

  const resolvedItems = useMemo(() => {
    return cart.map((item) => {
      const basePrice = getProductBasePrice(item.sku);
      const multiplier = getTierMultiplier(item.quantity);
      const unitPrice = Math.round(basePrice * multiplier);
      const total = unitPrice * item.quantity;
      const dbInfo = dbProductMap[item.sku];

      return {
        ...item,
        unitPrice,
        total,
        hero: dbInfo?.hero || null,
        slug: dbInfo?.slug || null
      };
    });
  }, [cart, dbProductMap]);

  const subtotal = useMemo(() => {
    return resolvedItems.reduce((sum, item) => sum + item.total, 0);
  }, [resolvedItems]);

  const vat = useMemo(() => Math.round(subtotal * 0.08), [subtotal]);

  const shippingFee = useMemo(() => {
    if (shippingMethod === 'express') return 250000;
    return 0; // standard is free, 3PL is quote (we default to display text)
  }, [shippingMethod]);

  const grandTotal = useMemo(
    () => Math.max(0, subtotal + vat + shippingFee - discountAmount),
    [subtotal, vat, shippingFee, discountAmount]
  );

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(null);

    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Vui lòng nhập mã giảm giá.');
      return;
    }

    setPromoLoading(true);
    try {
      const res = await fetch('/api/vouchers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      const data = await res.json();
      setPromoLoading(false);

      if (res.ok && data.valid) {
        setAppliedVoucher(data.voucher);
        setDiscountAmount(data.discountAmount);
        setPromoSuccess(data.message);
        try {
          localStorage.setItem(
            'ulink_applied_voucher',
            JSON.stringify({
              code: data.voucher.code,
              discountAmount: data.discountAmount,
              voucher: data.voucher
            })
          );
        } catch {}
      } else {
        setAppliedVoucher(null);
        setDiscountAmount(0);
        setPromoError(data.message || 'Mã giảm giá không hợp lệ.');
        try {
          localStorage.removeItem('ulink_applied_voucher');
        } catch {}
      }
    } catch {
      setPromoLoading(false);
      setPromoError('Không thể kết nối máy chủ kiểm tra mã giảm giá.');
    }
  };

  const formatPrice = (amount: number) => {
    if (locale === 'vi') {
      return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    }
    return (
      '$' +
      new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        amount / 25000
      )
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('007100123456789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên người nhận';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email nhận hóa đơn';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ giao hàng';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderCarrierIcon = (name: string) => {
    switch (name) {
      case 'Viettel Post':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[3px] bg-[#EE0000] text-white flex flex-col items-center justify-center font-bold text-caption-responsive shadow-sm select-none"
            title="Viettel Post"
          >
            <span className="leading-none tracking-tighter">VIETTEL</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">POST</span>
          </div>
        );
      case 'Giao Hàng Nhanh':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[3px] bg-[#FFCC00] text-black flex flex-col items-center justify-center font-bold text-[8px] shadow-sm select-none font-bold"
            title="Giao Hàng Nhanh (GHN)"
          >
            <span className="leading-none tracking-tight">GHN</span>
            <span className="text-[6px] opacity-80 leading-none mt-0.5">EXPRESS</span>
          </div>
        );
      case 'Giao Hàng Tiết Kiệm':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[3px] bg-[#069A57] text-white flex flex-col items-center justify-center font-bold text-caption-responsive shadow-sm select-none"
            title="Giao Hàng Tiết Kiệm (GHTK)"
          >
            <span className="leading-none tracking-tighter">GHTK</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">LOGISTICS</span>
          </div>
        );
      case 'J&T Express':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[3px] bg-[#F26522] text-white flex flex-col items-center justify-center font-bold text-caption-responsive shadow-sm select-none font-bold"
            title="J&T Express"
          >
            <span className="leading-none tracking-tighter">J&T</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">EXPRESS</span>
          </div>
        );
      case 'Ninja Van':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[3px] bg-[#FF0000] text-white flex flex-col items-center justify-center font-bold text-caption-responsive shadow-sm select-none"
            title="Ninja Van"
          >
            <span className="leading-none tracking-tighter">NINJA</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">VAN</span>
          </div>
        );
      default:
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[3px] bg-slate-400 text-white flex items-center justify-center font-bold text-caption-responsive shadow-sm select-none"
            title="Other"
          >
            <Truck className="h-5 w-5" />
          </div>
        );
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      const firstErr = Object.keys(errors)[0];
      const el = document.getElementById(firstErr);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!resolvedItems.length) {
      setShowFailureModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id ?? null,
          buyer: formData,
          paymentMethod,
          shippingMethod,
          carrierName: shippingMethod === '3pl' ? carrierName : undefined,
          subtotal,
          tax: vat,
          total: grandTotal,
          voucherCode: appliedVoucher?.code || promoCode || undefined,
          discountAmount: discountAmount || 0,
          items: resolvedItems.map((item) => ({
            sku: item.sku,
            productName: item.product_name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.total
          }))
        })
      });
      if (!response.ok) throw new Error('Không thể tạo đơn hàng. Vui lòng thử lại.');
      const result = (await response.json()) as { data?: { id: string | number } };
      if (!result.data?.id) throw new Error('Đơn hàng chưa được tạo.');

      if (paymentMethod === 'vnpay') {
        const paymentRes = await fetch('/api/orders/create-payment-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: result.data.id, locale })
        });
        if (!paymentRes.ok) throw new Error('Không thể tạo link thanh toán.');
        const paymentData = await paymentRes.json();
        if (!paymentData.data?.paymentUrl) throw new Error('Không nhận được link thanh toán.');
        window.location.href = paymentData.data.paymentUrl;
        return;
      }

      persistCart([]);
      setCart([]);
      window.location.href = `/${locale}/order-confirmation?orderId=${result.data.id}`;
    } catch {
      setShowFailureModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 w-full">
      <div className="page-container flex flex-col gap-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-caption-responsive text-muted-foreground pb-2"
        >
          <Link href="/" className="transition-colors hover:text-brand">
            {t('breadcrumbHome')}
          </Link>
          <ChevronRightIcon className="h-3 w-3 text-muted-foreground/60" />
          <Link href="/cart" className="transition-colors hover:text-brand">
            {t('breadcrumbCart')}
          </Link>
          <ChevronRightIcon className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-medium text-foreground">{t('breadcrumbCheckout')}</span>
        </nav>

        {/* Step Progress bar */}
        <div className="flex w-full overflow-hidden text-caption-responsive font-semibold rounded-[3px] border border-slate-100">
          {/* Step 1: Giỏ hàng */}
          <Link
            href="/cart"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-50/75 text-brand hover:bg-blue-100/50 transition-colors"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-caption-responsive font-bold text-white shrink-0">
              ✓
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepCart')}</span>
          </Link>

          {/* Step 2: Thanh toán */}
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-caption-responsive font-bold text-brand shrink-0">
              2
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepPayment')}</span>
          </div>

          {/* Step 3: Vận chuyển */}
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-caption-responsive font-bold text-slate-300 shrink-0">
              3
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepShipping')}</span>
          </div>

          {/* Step 4: Hoàn tất */}
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-border/40 text-caption-responsive font-bold text-slate-200 shrink-0">
              4
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepComplete')}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[35px] pt-2">
          {/* Left Column (Shipping, Payment, Shipping Method) */}
          <div className="flex-1 space-y-10 min-w-0">
            {/* Card 1: Shipping Info Card (B2B) */}
            <div className="rounded-[12px] border border-[#DCE0E5] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-[#162233] shrink-0" />
                <h2 className="text-[20px] font-semibold text-[#162233] leading-7">
                  Thông tin giao hàng (B2B)
                </h2>
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              <div className="space-y-5 text-left">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                      {t('fullName')} <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={cn(
                        'w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]',
                        errors.fullName && 'border-rose-400 focus:ring-rose-200'
                      )}
                    />
                    {errors.fullName && (
                      <span className="text-caption-responsive text-rose-500 font-medium block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                      {t('phone')} <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={cn(
                        'w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]',
                        errors.phone && 'border-rose-400 focus:ring-rose-200'
                      )}
                    />
                    {errors.phone && (
                      <span className="text-caption-responsive text-rose-500 font-medium block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                    {t('email')} <span className="text-[#E11D48]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn(
                      'w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]',
                      errors.email && 'border-rose-400 focus:ring-rose-200'
                    )}
                  />
                  {errors.email && (
                    <span className="text-caption-responsive text-rose-500 font-medium block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                      {t('province')} <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                      {t('district')} <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                      {t('ward')} <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ward}
                      onChange={(e) => handleInputChange('ward', e.target.value)}
                      className="w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-semibold text-[#162233] flex items-center gap-1">
                    {t('address')} <span className="text-[#E11D48]">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={cn(
                      'w-full rounded-[6px] border border-[#CAD5E2] bg-white px-4 py-3 text-[15px] text-[#162233] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]',
                      errors.address && 'border-rose-400 focus:ring-rose-200'
                    )}
                  />
                  {errors.address && (
                    <span className="text-caption-responsive text-rose-500 font-medium block">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-semibold text-[#162233] block">
                    {t('note')}
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    placeholder={t('notePlaceholder')}
                    className="w-full rounded-[6px] border border-[#CAD5E2] bg-white p-4 text-[15px] text-[#162233] h-[100px] outline-none transition-all focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Payment Method Card (B2B) */}
            <div className="rounded-[12px] border border-[#DCE0E5] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Wallet className="h-8 w-8 text-[#162233] shrink-0" />
                <h2 className="text-[20px] font-bold text-[#162233] leading-7">
                  Phương thức thanh toán B2B
                </h2>
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              <div className="space-y-4">
                {/* VNPay QR Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('vnpay')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full',
                    paymentMethod === 'vnpay'
                      ? 'border-2 border-[#1769E2] bg-white'
                      : 'border border-[#CAD5E2] bg-white hover:bg-slate-50/50'
                  )}
                >
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 border-[#1769E2]">
                    {paymentMethod === 'vnpay' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-[15px] font-semibold text-[#162233] flex items-center gap-2">
                      Thanh toán QR Code (VNPay)
                      <QrCode className="h-4 w-4 text-[#1769E2]" />
                    </p>
                    <p className="text-[13px] font-normal text-[#617084]">
                      Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử. Xác nhận tức thì, không cần đăng nhập.
                    </p>
                  </div>
                </button>

                {/* COD Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full',
                    paymentMethod === 'cod'
                      ? 'border-2 border-[#1769E2] bg-white'
                      : 'border border-[#CAD5E2] bg-white hover:bg-slate-50/50'
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                    paymentMethod === 'cod' ? "border-[#1769E2]" : "border-[#CAD5E2]"
                  )}>
                    {paymentMethod === 'cod' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-[15px] font-semibold text-[#162233]">
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p className="text-[13px] font-normal text-[#617084]">
                      Chỉ áp dụng đối với khách hàng doanh nghiệp có hạn mức tín dụng được duyệt trước bởi ULink.
                    </p>
                  </div>
                </button>

                {/* Bank Transfer Option */}
                <button
                  type="button"
                  onClick={() => { setUnsupportedToast('Chuyển khoản ngân hàng hiện chưa được hỗ trợ. Vui lòng chọn phương thức khác.'); setTimeout(() => setUnsupportedToast(''), 3000); }}
                  className="flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full border border-[#CAD5E2] bg-white hover:bg-slate-50/50 opacity-60"
                >
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 border-[#CAD5E2]">
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-[15px] font-semibold text-[#162233]">
                      Chuyển khoản tài khoản ngân hàng Doanh nghiệp
                    </p>
                    <p className="text-[13px] font-normal text-[#617084]">
                      Hỗ trợ xuất hóa đơn tài chính VAT nhanh. Nhận thông tin chuyển khoản ngay sau khi đặt hàng.
                    </p>
                  </div>
                </button>

                {/* E-Wallet Option */}
                <button
                  type="button"
                  onClick={() => { setUnsupportedToast('Ví điện tử doanh nghiệp hiện chưa được hỗ trợ. Vui lòng chọn phương thức khác.'); setTimeout(() => setUnsupportedToast(''), 3000); }}
                  className="flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full border border-[#CAD5E2] bg-white hover:bg-slate-50/50 opacity-60"
                >
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 border-[#CAD5E2]">
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-[15px] font-semibold text-[#162233]">
                      Thanh toán qua ví điện tử doanh nghiệp
                    </p>
                    <p className="text-[13px] font-normal text-[#617084]">
                      Liên kết tài khoản ví ShopeePay, MoMo Business để thanh toán trực tuyến nhanh gọn.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Card 3: Bank Transfer Details Card */}
            {paymentMethod === 'bank' && (
              <div className="rounded-[12px] border border-[#DCE0E5] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Landmark className="h-8 w-8 text-[#162233] shrink-0" />
                  <h2 className="text-[20px] font-bold text-[#162233] leading-7">
                    Thông tin chuyển khoản
                  </h2>
                </div>

                <div className="h-[1px] w-full bg-[#DCE0E5]" />

                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-left">
                  {/* QR Box */}
                  <div className="w-[200px] shrink-0 flex flex-col items-center gap-3">
                    <div className="w-[180px] h-[180px] rounded-[12px] border border-[#CAD5E2] bg-[#F8FAFC] flex flex-col items-center justify-center p-3 shadow-inner">
                      <QrCode className="w-[120px] h-[120px] text-slate-700" />
                    </div>
                    <span className="text-[14px] font-semibold text-[#162233] text-center">
                      Quét mã QR để thanh toán
                    </span>
                  </div>

                  {/* Bank info details */}
                  <div className="space-y-4 text-caption-responsive flex-1 w-full">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[12px] font-semibold text-[#495057] block">Ngân hàng</span>
                        <span className="text-[15px] font-bold text-[#162233]">Vietcombank (VCB)</span>
                      </div>

                      <div>
                        <span className="text-[12px] font-semibold text-[#495057] block">Chi nhánh</span>
                        <span className="text-[15px] font-bold text-[#162233]">Hồ Chí Minh</span>
                      </div>

                      <div>
                        <span className="text-[12px] font-semibold text-[#495057] block">Số tài khoản</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[15px] font-bold text-[#162233] font-mono">0071 0012 3456 789</span>
                          <button
                            type="button"
                            onClick={handleCopy}
                            className="p-1.5 rounded-[6px] border border-[#CAD5E2] bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all flex items-center justify-center"
                            title="Copy account number"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-emerald-600 stroke-[2.5]" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[12px] font-semibold text-[#495057] block">Chủ tài khoản</span>
                        <span className="text-[15px] font-bold text-[#162233] uppercase">CÔNG TY TNHH ULINK VIỆT NAM</span>
                      </div>

                      <div>
                        <span className="text-[12px] font-semibold text-[#495057] block">Nội dung CK</span>
                        <span className="text-[15px] font-bold text-[#162233] font-mono">
                          [{orderId}] - [Tên công ty]
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-[#CAD5E2] bg-[#E5EDFA] p-4 text-[13px] font-normal text-[#162233] leading-relaxed">
                  Vui lòng chuyển khoản đúng nội dung để đơn hàng được xác nhận tự động trong vòng 5-10 phút.
                </div>
              </div>
            )}

            {/* Card 4: Shipping Method Card */}
            <div className="rounded-[12px] border border-[#DCE0E5] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Banknote className="h-8 w-8 text-[#162233] shrink-0" />
                <h2 className="text-[20px] font-bold text-[#162233] leading-7">
                  Phương thức vận chuyển
                </h2>
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              <div className="space-y-4">
                {/* Standard ULink Fleet */}
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full justify-between',
                    shippingMethod === 'standard'
                      ? 'border-2 border-[#1769E2] bg-white'
                      : 'border border-[#CAD5E2] bg-white hover:bg-slate-50/50'
                  )}
                >
                  <div className="flex gap-4 items-center flex-1">
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 border-[#1769E2]">
                      {shippingMethod === 'standard' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[15px] font-semibold text-[#162233]">
                        Giao hàng tiêu chuẩn ULink Fleet
                      </p>
                      <p className="text-[13px] font-normal text-[#617084]">
                        Thời gian giao từ 3-5 ngày làm việc. Phù hợp cho đơn hàng số lượng lớn, đóng kiện Pallet.
                      </p>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold text-[#162233] shrink-0">Miễn phí</span>
                </button>

                {/* Express 24h */}
                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full justify-between',
                    shippingMethod === 'express'
                      ? 'border-2 border-[#1769E2] bg-white'
                      : 'border border-[#CAD5E2] bg-white hover:bg-slate-50/50'
                  )}
                >
                  <div className="flex gap-4 items-center flex-1">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      shippingMethod === 'express' ? "border-[#1769E2]" : "border-[#CAD5E2]"
                    )}>
                      {shippingMethod === 'express' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[15px] font-semibold text-[#162233]">
                        Giao hàng hỏa tốc trong 24h
                      </p>
                      <p className="text-[13px] font-normal text-[#617084]">
                        Nhận hàng nhanh trong 1-2 ngày đối với các khu vực HUB Hà Nam, Hà Nội và Bắc Ninh.
                      </p>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold text-[#162233] shrink-0">250.000đ</span>
                </button>

                {/* 3PL */}
                <button
                  type="button"
                  onClick={() => { setShippingMethod('3pl'); setCarrierSearch(''); setShow3plModal(true); }}
                  className={cn(
                    'flex gap-4 p-4 rounded-[8px] border text-left cursor-pointer transition-all items-center w-full justify-between',
                    shippingMethod === '3pl'
                      ? 'border-2 border-[#1769E2] bg-white'
                      : 'border border-[#CAD5E2] bg-white hover:bg-slate-50/50'
                  )}
                >
                  <div className="flex gap-4 items-center flex-1">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      shippingMethod === '3pl' ? "border-[#1769E2]" : "border-[#CAD5E2]"
                    )}>
                      {shippingMethod === '3pl' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[15px] font-semibold text-[#162233]">
                        Vận chuyển 3PL
                      </p>
                      <p className="text-[13px] font-normal text-[#617084]">
                        Giao hàng qua đối tác vận chuyển bên thứ 3. Phù hợp cho đơn hàng linh hoạt, đa dạng địa chỉ giao nhận.
                      </p>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold text-[#162233] shrink-0">Theo báo giá</span>
                </button>

                {shippingMethod === '3pl' && carrierName && (
                  <div className="mt-2 p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-[6px] text-left animate-fadeIn flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {renderCarrierIcon(carrierName)}
                      <div>
                        <p className="text-[14px] font-semibold text-[#162233]">{carrierName}</p>
                        {carrierAccount && <p className="text-[12px] text-[#617084]">Mã TK: {carrierAccount}</p>}
                      </div>
                    </div>
                    <button type="button" onClick={() => setShow3plModal(true)} className="text-[13px] text-[#1769E2] font-medium hover:underline">Thay đổi</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (Summary Card & Security Box) */}
          <div className="w-full lg:w-[385px] shrink-0 space-y-6">
            {/* Order Summary Card */}
            <div className="rounded-[12px] border border-[#DCE0E5] bg-[#F5F8FC] p-6 space-y-5 shadow-sm">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-8 w-8 text-[#162233] shrink-0" />
                <h3 className="text-[18px] font-bold text-[#162233]">
                  Đơn hàng của bạn
                </h3>
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              {/* Order Items List */}
              <div className="divide-y divide-[#DCE0E5] max-h-[280px] overflow-y-auto pr-1 space-y-3">
                {resolvedItems.length > 0 ? (
                  resolvedItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pt-3 first:pt-0 items-center">
                      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#F2F4F8] shrink-0 border border-[#DCE0E5] relative flex items-center justify-center overflow-hidden">
                        {item.hero ? (
                          <Image
                            src={resolveImageUrl(item.hero) || '/images/banners/login-hero.webp'}
                            alt={item.product_name || item.sku}
                            fill
                            className="object-cover"
                            sizes="60px"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-semibold text-[#162233] line-clamp-2">
                          {item.product_name}
                        </h4>
                        <p className="text-[12px] font-normal text-[#617084]">
                          SL: {item.quantity} x {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                      <span className="text-[14px] font-bold text-[#162233] shrink-0">
                        {formatPrice(item.total)}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex gap-3 items-center">
                      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#F2F4F8] shrink-0 border border-[#DCE0E5] relative flex items-center justify-center overflow-hidden">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-semibold text-[#162233] line-clamp-2">
                          Màng quấn Pallet - Stretch Film
                        </h4>
                        <p className="text-[12px] font-normal text-[#617084]">
                          SL: 500 kg x 39.500đ
                        </p>
                      </div>
                      <span className="text-[14px] font-bold text-[#162233] shrink-0">
                        19.750.000đ
                      </span>
                    </div>
                    <div className="flex gap-3 pt-3 items-center">
                      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#F2F4F8] shrink-0 border border-[#DCE0E5] relative flex items-center justify-center overflow-hidden">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-semibold text-[#162233] line-clamp-2">
                          Túi PE trong suốt - Đựng hàng
                        </h4>
                        <p className="text-[12px] font-normal text-[#617084]">
                          SL: 200 kg x 28.000đ
                        </p>
                      </div>
                      <span className="text-[14px] font-bold text-[#162233] shrink-0">
                        5.600.000đ
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              {/* Summary Calculations */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="font-normal text-[#495057]">Tạm tính</span>
                  <span className="font-semibold text-[#162233]">
                    {subtotal > 0 ? formatPrice(subtotal) : '25.350.000đ'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="font-normal text-[#495057]">Thuế VAT (8%)</span>
                  <span className="font-semibold text-[#162233]">
                    {vat > 0 ? formatPrice(vat) : '2.028.000đ'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="font-normal text-[#495057]">Phí vận chuyển</span>
                  <span className="font-semibold text-[#16A34A]">
                    {shippingMethod === 'express'
                      ? formatPrice(250000)
                      : shippingMethod === '3pl'
                      ? 'Theo báo giá'
                      : 'Miễn phí'}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="font-semibold text-[#16A34A] flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {appliedVoucher ? `Chiết khấu (${appliedVoucher.code})` : 'Chiết khấu B2B'}
                    </span>
                    <span className="font-semibold text-[#16A34A]">- {formatPrice(discountAmount)}</span>
                  </div>
                )}

                {/* Promo Code Input Form in Checkout */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-1">
                  <label className="text-[12px] font-semibold text-[#212529] block">
                    Mã giảm giá B2B
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="NHẬP MÃ..."
                      className="flex-1 h-[36px] rounded-[4px] border border-[#DCE0E5] bg-white px-3 text-[13px] font-semibold text-[#212529] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1769E2] uppercase"
                    />
                    <button
                      type="submit"
                      disabled={promoLoading}
                      className="h-[36px] rounded-[4px] bg-[#DBEAFE] text-[#1257C0] text-[13px] font-bold px-3 transition-colors hover:bg-blue-100 cursor-pointer shrink-0 disabled:opacity-60"
                    >
                      {promoLoading ? '...' : 'Áp dụng'}
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[11px] text-rose-500 font-semibold block">
                      {promoError}
                    </span>
                  )}
                  {promoSuccess && (
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      {promoSuccess}
                    </span>
                  )}
                </form>
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              {/* Total Row */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-bold text-[#162233]">Tổng cộng</span>
                  <span className="text-[22px] font-bold text-[#1769E2]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
                <p className="text-[12px] font-normal text-[#617084]">
                  Đã bao gồm thuế GTGT nhập khẩu B2B đầy đủ.
                </p>
              </div>

              <div className="h-[1px] w-full bg-[#DCE0E5]" />

              {/* Back to Cart link */}
              <Link
                href="/cart"
                className="block text-center text-[14px] font-semibold text-[#1257C0] hover:underline py-1"
              >
                Quay lại giỏ hàng của bạn
              </Link>

              {/* Submit Payment Button */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full rounded-[3px] bg-[#00B233] py-4 text-[16px] font-bold text-white shadow hover:bg-[#009b2c] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Thanh toán ngay'}
              </button>
            </div>

            {/* Security Guarantee Box */}
            <div className="rounded-[8px] border border-[#CAD5E2] bg-white p-4 flex items-center gap-3 shadow-sm">
              <Lock className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-[13px] font-normal text-[#617084] leading-relaxed">
                Hệ thống mã hóa và chứng thực bảo mật giao dịch SSL 256-bit chuẩn quốc tế.
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-slate-100 max-w-[480px] w-full p-5 sm:p-8 relative flex flex-col items-center text-center space-y-5 sm:space-y-6 animate-scaleIn">
            <button
              onClick={() => {
                setShowSuccessModal(false);
                persistCart([]);
                setCart([]);
                window.location.href = `/${locale}/order-confirmation`;
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-16 w-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-card-title font-bold text-slate-900">{t('successTitle')}</h3>
              <p className="text-caption-responsive text-slate-500 leading-relaxed px-2">
                {t('successMsg', { orderId })}
              </p>
            </div>
            <div className="bg-card rounded-[3px] p-4 w-full flex flex-col items-center justify-center">
              <span className="text-caption-responsive font-bold text-[#3B82F6] tracking-wider uppercase">
                {t('totalPayment')}
              </span>
              <span className="text-section-title font-bold text-[#1D4ED8] mt-1.5">
                {formatPrice(grandTotal)}
              </span>
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                persistCart([]);
                setCart([]);
                window.location.href = `/${locale}/order-confirmation`;
              }}
              className="text-caption-responsive font-bold text-slate-500 hover:text-slate-800 transition-colors pt-2"
            >
              {t('btnBackHome')}
            </button>
          </div>
        </div>
      )}

      {showPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-slate-100 max-w-[480px] w-full p-5 sm:p-8 relative flex flex-col items-center text-center space-y-5 sm:space-y-6 animate-scaleIn">
            <button
              onClick={() => setShowPendingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-16 w-16 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <CalendarDays className="h-8 w-8 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-card-title font-bold text-slate-900">{t('pendingTitle')}</h3>
              <p className="text-caption-responsive text-slate-500 leading-relaxed px-2">
                {t('pendingMsg')}
              </p>
            </div>
            <div className="bg-[#FFFBEB] rounded-[3px] p-4 w-full flex flex-col items-center justify-center border border-amber-100">
              <span className="text-caption-responsive font-bold text-[#D97706] tracking-wider uppercase">
                {t('txnCode')}
              </span>
              <span className="text-card-title font-bold text-[#B45309] mt-1.5 font-mono">
                TXN-{orderId.replace('UL-', '')}
              </span>
            </div>
            <button
              onClick={() => {
                setShowPendingModal(false);
                window.location.href = `/${locale}`;
              }}
              className="text-caption-responsive font-bold text-slate-500 hover:text-slate-800 transition-colors pt-2"
            >
              {t('btnBackHome')}
            </button>
          </div>
        </div>
      )}

      {unsupportedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E293B] text-white px-6 py-3 rounded-lg shadow-lg text-[14px] font-medium animate-fadeIn flex items-center gap-2 max-w-[480px]">
          <ShieldCheck className="h-5 w-5 text-yellow-400 shrink-0" />
          {unsupportedToast}
        </div>
      )}

      {show3plModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-[440px] w-full relative animate-scaleIn">
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h3 className="text-[17px] font-bold text-[#162233]">Chọn đơn vị vận chuyển 3PL</h3>
              <button type="button" onClick={() => setShow3plModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" value={carrierSearch} onChange={(e) => setCarrierSearch(e.target.value)} placeholder="Tìm kiếm đơn vị vận chuyển..." className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]" />
              </div>
            </div>
            <div className="px-6 pt-3 pb-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Đơn vị đề xuất ({formData.province ? `hoạt động tại ${formData.province}` : '5 hãng hoạt động'})</p>
            </div>
            <div className="px-4 pb-6 space-y-2">
              {[
                { name: 'Giao Hàng Nhanh', displayName: 'Giao Hàng Nhanh (GHN)', desc: 'Vận chuyển nhanh toàn quốc, tối ưu cho đơn hàng sỉ nhẹ & trung bình.', price: '45.000đ', time: '2 - 3 ngày' },
                { name: 'Giao Hàng Tiết Kiệm', displayName: 'Giao Hàng Tiết Kiệm (GHTK)', desc: 'Chi phí tối ưu nhất cho khu vực nội tỉnh và liên tỉnh phía Bắc.', price: '35.000đ', time: '3 - 4 ngày' },
                { name: 'Viettel Post', displayName: 'Viettel Post', desc: 'Mạng lưới bưu cục phủ khắp 63 tỉnh thành, hỗ trợ kiện hàng sỉ cực lớn.', price: '60.000đ', time: '1 - 2 ngày' },
                { name: 'J&T Express', displayName: 'J&T Express', desc: 'Phủ sóng rộng, có hỗ trợ lấy hàng tận xưởng/kho sỉ vào ngày chủ nhật.', price: '40.000đ', time: '2 - 4 ngày' },
              ].filter((c) => {
                if (!carrierSearch.trim()) return true;
                const q = carrierSearch.toLowerCase();
                return c.displayName.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
              }).map((carrier) => (
                <button
                  key={carrier.name}
                  type="button"
                  onClick={() => { setCarrierName(carrier.name); setShow3plModal(false); }}
                  className={cn(
                    'flex items-center gap-3 w-full p-4 rounded-lg border text-left transition-all hover:bg-blue-50/50',
                    carrierName === carrier.name ? 'border-2 border-[#1769E2] bg-blue-50/30' : 'border-slate-200'
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                    carrierName === carrier.name ? "border-[#1769E2]" : "border-[#CAD5E2]"
                  )}>
                    {carrierName === carrier.name && <div className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />}
                  </div>
                  {renderCarrierIcon(carrier.name)}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-[#162233]">{carrier.displayName}</p>
                    <p className="text-[12px] text-[#617084] mt-0.5">{carrier.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-bold text-[#1769E2]">{carrier.price}</p>
                    <p className="text-[11px] text-[#617084]">{carrier.time}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-6 pb-5 pt-2 border-t border-slate-100">
              <p className="text-[12px] text-[#617084]">Giá cước thực tế phụ thuộc kích thước kiện hàng.</p>
            </div>
          </div>
        </div>
      )}

      {showFailureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-slate-100 max-w-[480px] w-full p-5 sm:p-8 relative flex flex-col items-center text-center space-y-5 sm:space-y-6 animate-scaleIn">
            <button
              onClick={() => setShowFailureModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-16 w-16 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <div className="border-4 border-[#DC2626] rounded-[3px] p-1.5 flex items-center justify-center h-8 w-8 font-black text-card-title leading-none">
                !
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-card-title font-bold text-slate-900">{t('failureTitle')}</h3>
              <p className="text-caption-responsive text-slate-500 leading-relaxed px-2">
                {t('failureMsg')}
              </p>
            </div>
            <div className="bg-[#FEF2F2] rounded-[3px] p-4 w-full flex flex-col items-center justify-center border border-red-100">
              <span className="text-caption-responsive font-bold text-red-500 tracking-wider uppercase">
                {t('errorDetail')}
              </span>
              <span className="text-caption-responsive font-semibold text-[#991B1B] mt-1.5 text-center px-2 leading-relaxed">
                {t('errBankDeclined')}
              </span>
            </div>
            <div className="flex gap-4 items-center justify-center text-caption-responsive font-bold text-[#1D4ED8] pt-2">
              <button onClick={() => setShowFailureModal(false)} className="hover:underline">
                Đổi phương thức thanh toán
              </button>
              <span className="text-slate-300">|</span>
              <a href="mailto:support@ulinkindustries.com" className="hover:underline">
                Liên hệ hỗ trợ
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Small custom Chevron Icon to avoid missing import
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

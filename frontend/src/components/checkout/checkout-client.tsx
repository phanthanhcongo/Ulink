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
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AuthUser } from '@/lib/auth-helpers';
import { readCart, persistCart, type CartItem } from '@/components/rfq/cart-types';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';

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
  const [clickCount, setClickCount] = useState(0);

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

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod' | 'wallet'>('bank');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | '3pl'>('standard');
  const [carrierName, setCarrierName] = useState('Viettel Post');
  const [carrierAccount, setCarrierAccount] = useState('');

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setCart(readCart());
    // Generate mock order ID
    setOrderId('UL-' + Math.floor(100000 + Math.random() * 900000));
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

  const grandTotal = useMemo(() => subtotal + vat + shippingFee, [subtotal, vat, shippingFee]);

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
            className="w-14 h-10 shrink-0 rounded-[5px] bg-[#EE0000] text-white flex flex-col items-center justify-center font-extrabold text-[9px] shadow-sm select-none"
            title="Viettel Post"
          >
            <span className="leading-none tracking-tighter">VIETTEL</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">POST</span>
          </div>
        );
      case 'Giao Hàng Nhanh':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[5px] bg-[#FFCC00] text-black flex flex-col items-center justify-center font-extrabold text-[8px] shadow-sm select-none font-bold"
            title="Giao Hàng Nhanh (GHN)"
          >
            <span className="leading-none tracking-tight">GHN</span>
            <span className="text-[6px] opacity-80 leading-none mt-0.5">EXPRESS</span>
          </div>
        );
      case 'Giao Hàng Tiết Kiệm':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[5px] bg-[#069A57] text-white flex flex-col items-center justify-center font-extrabold text-[9px] shadow-sm select-none"
            title="Giao Hàng Tiết Kiệm (GHTK)"
          >
            <span className="leading-none tracking-tighter">GHTK</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">LOGISTICS</span>
          </div>
        );
      case 'J&T Express':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[5px] bg-[#F26522] text-white flex flex-col items-center justify-center font-extrabold text-[9px] shadow-sm select-none font-bold"
            title="J&T Express"
          >
            <span className="leading-none tracking-tighter">J&T</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">EXPRESS</span>
          </div>
        );
      case 'Ninja Van':
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[5px] bg-[#FF0000] text-white flex flex-col items-center justify-center font-extrabold text-[9px] shadow-sm select-none"
            title="Ninja Van"
          >
            <span className="leading-none tracking-tighter">NINJA</span>
            <span className="text-[7px] opacity-90 leading-none mt-0.5">VAN</span>
          </div>
        );
      default:
        return (
          <div
            className="w-14 h-10 shrink-0 rounded-[5px] bg-slate-400 text-white flex items-center justify-center font-extrabold text-xs shadow-sm select-none"
            title="Other"
          >
            <Truck className="h-5 w-5" />
          </div>
        );
    }
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) {
      const firstErr = Object.keys(errors)[0];
      const el = document.getElementById(firstErr);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const mode = clickCount % 3;
    if (mode === 0) {
      setShowFailureModal(true);
    } else if (mode === 1) {
      setShowPendingModal(true);
    } else {
      setShowSuccessModal(true);
    }
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-10 w-full">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 sm:px-8 lg:px-12 xl:px-16">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[12px] text-muted-foreground pb-2"
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
        <div className="flex w-full overflow-hidden text-xs sm:text-sm font-semibold rounded-[5px] border border-slate-100">
          {/* Step 1: Giỏ hàng */}
          <Link
            href="/cart"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-50/75 text-brand hover:bg-blue-100/50 transition-colors"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white shrink-0">
              ✓
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepCart')}</span>
          </Link>

          {/* Step 2: Thanh toán */}
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-brand shrink-0">
              2
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepPayment')}</span>
          </div>

          {/* Step 3: Vận chuyển */}
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-slate-300 shrink-0">
              3
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepShipping')}</span>
          </div>

          {/* Step 4: Hoàn tất */}
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-border/40 text-[10px] font-extrabold text-slate-200 shrink-0">
              4
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepComplete')}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 pt-2">
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
                  1
                </span>
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                  {t('shippingInfoTitle')}
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('fullName')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={cn(
                      'w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand',
                      errors.fullName && 'border-rose-400 focus:ring-rose-200'
                    )}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-500 font-medium block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('phone')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={cn(
                      'w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand',
                      errors.phone && 'border-rose-400 focus:ring-rose-200'
                    )}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-500 font-medium block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('email')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn(
                      'w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand',
                      errors.email && 'border-rose-400 focus:ring-rose-200'
                    )}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-500 font-medium block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('province')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('district')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('ward')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => handleInputChange('ward', e.target.value)}
                    className="w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 block">
                    {t('address')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={cn(
                      'w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand',
                      errors.address && 'border-rose-400 focus:ring-rose-200'
                    )}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-rose-500 font-medium block">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 block">{t('note')}</label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    placeholder={t('notePlaceholder')}
                    rows={3}
                    className="w-full rounded-[5px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
                  3
                </span>
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                  {t('paymentMethodTitle')}
                </h2>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[5px] border text-left cursor-pointer transition-all hover:bg-slate-50/50',
                    paymentMethod === 'bank'
                      ? 'border-brand bg-brand-light/10'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="h-4.5 w-4.5 border-slate-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1 flex-1 text-slate-700">
                    <p className="font-bold text-slate-900">{t('payBank')}</p>
                    <p className="text-xs text-slate-500">{t('payBankDesc')}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[5px] border text-left cursor-pointer transition-all hover:bg-slate-50/50',
                    paymentMethod === 'cod'
                      ? 'border-brand bg-brand-light/10'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4.5 w-4.5 border-slate-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1 flex-1 text-slate-700">
                    <p className="font-bold text-slate-900">{t('payCod')}</p>
                    <p className="text-xs text-slate-500">{t('payCodDesc')}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[5px] border text-left cursor-pointer transition-all hover:bg-slate-50/50',
                    paymentMethod === 'wallet'
                      ? 'border-brand bg-brand-light/10'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                      className="h-4.5 w-4.5 border-slate-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1 flex-1 text-slate-700">
                    <p className="font-bold text-slate-900">{t('payWallet')}</p>
                    <p className="text-xs text-slate-500">{t('payWalletDesc')}</p>
                  </div>
                </button>
              </div>
            </div>

            {paymentMethod === 'bank' && (
              <div className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
                    3
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    {t('bankInfoTitle')}
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-left">
                  <div className="border border-slate-200 p-3 bg-white rounded-[5px] flex flex-col items-center justify-center shrink-0 w-[145px] h-[145px] shadow-sm">
                    <svg width="90" height="90" viewBox="0 0 100 100" className="text-slate-800">
                      <path
                        d="M0 0h28v8H8v20H0V0zm72 0h28v28h-8V8H72V0zM0 72h8v20h20v8H0V72zm92 0h8v28H72v-8h20V72z"
                        fill="currentColor"
                      />
                      <rect x="12" y="12" width="16" height="16" fill="currentColor" />
                      <rect x="72" y="12" width="16" height="16" fill="currentColor" />
                      <rect x="12" y="72" width="16" height="16" fill="currentColor" />
                      <rect x="36" y="12" width="8" height="8" fill="currentColor" />
                      <rect x="48" y="20" width="16" height="8" fill="currentColor" />
                      <rect x="36" y="36" width="28" height="8" fill="currentColor" />
                      <rect x="12" y="44" width="8" height="16" fill="currentColor" />
                      <rect x="72" y="44" width="16" height="8" fill="currentColor" />
                      <rect x="44" y="60" width="12" height="12" fill="currentColor" />
                      <rect x="76" y="76" width="12" height="12" fill="currentColor" />
                    </svg>
                    <span className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                      {t('bankQrDesc')}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs flex-1">
                    <div className="grid grid-cols-3 gap-y-2.5 gap-x-2 text-slate-600">
                      <span className="font-bold text-slate-500">{t('bankNameLabel')}</span>
                      <span className="col-span-2 font-extrabold text-slate-900">
                        Vietcombank (VCB)
                      </span>

                      <span className="font-bold text-slate-500">{t('bankBranchLabel')}</span>
                      <span className="col-span-2 font-semibold text-slate-900">Hồ Chí Minh</span>

                      <span className="font-bold text-slate-500">{t('bankAccountLabel')}</span>
                      <div className="col-span-2 flex items-center gap-2 font-mono font-black text-sm text-[#006AA7]">
                        <span>0071 0012 3456 789</span>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="p-1.5 border border-slate-200 rounded-[5px] hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-all"
                          title="Copy account number"
                        >
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      <span className="font-bold text-slate-500">{t('bankAccountOwnerLabel')}</span>
                      <span className="col-span-2 font-extrabold text-slate-900 uppercase">
                        CÔNG TY TNHH ULINK VIỆT NAM
                      </span>

                      <span className="font-bold text-slate-500">{t('bankMemoLabel')}</span>
                      <span className="col-span-2 font-mono font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-[5px] w-fit border border-blue-100">
                        {orderId}
                      </span>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100/80 p-3.5 rounded-[5px] text-xs text-blue-700 leading-relaxed">
                      {t('bankWarning')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
                  2
                </span>
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                  {t('shippingMethodTitle')}
                </h2>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[5px] border text-left cursor-pointer transition-all hover:bg-slate-50/50',
                    shippingMethod === 'standard'
                      ? 'border-brand bg-brand-light/10'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="h-4.5 w-4.5 border-slate-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1 flex-1 text-slate-700">
                    <p className="font-bold text-slate-900">{t('shipStandard')}</p>
                    <p className="text-xs text-slate-500">{t('shipStandardDesc')}</p>
                  </div>
                  <span className="font-extrabold text-emerald-600 text-sm shrink-0">MIỄN PHÍ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[5px] border text-left cursor-pointer transition-all hover:bg-slate-50/50',
                    shippingMethod === 'express'
                      ? 'border-brand bg-brand-light/10'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="h-4.5 w-4.5 border-slate-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1 flex-1 text-slate-700">
                    <p className="font-bold text-slate-900">{t('shipExpress')}</p>
                    <p className="text-xs text-slate-500">{t('shipExpressDesc')}</p>
                  </div>
                  <span className="font-extrabold text-[#006AA7] text-sm shrink-0">{formatPrice(250000)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('3pl')}
                  className={cn(
                    'flex gap-4 p-4 rounded-[5px] border text-left cursor-pointer transition-all hover:bg-slate-50/50',
                    shippingMethod === '3pl'
                      ? 'border-brand bg-brand-light/10'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      checked={shippingMethod === '3pl'}
                      onChange={() => setShippingMethod('3pl')}
                      className="h-4.5 w-4.5 border-slate-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1 flex-1 text-slate-700">
                    <p className="font-bold text-slate-900">{t('ship3pl')}</p>
                    <p className="text-xs text-slate-500">{t('ship3plDesc')}</p>
                  </div>
                </button>

                {shippingMethod === '3pl' && (
                  <div className="mt-2 p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-[5px] space-y-4 text-left animate-fadeIn">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[11px] font-bold text-slate-500 block">
                          {t('carrierName')}
                        </label>
                        <div className="flex gap-3 items-center">
                          {renderCarrierIcon(carrierName)}
                          <select
                            value={carrierName}
                            onChange={(e) => setCarrierName(e.target.value)}
                            className="flex-1 rounded-[5px] border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand font-medium cursor-pointer"
                          >
                            <option value="Viettel Post">Viettel Post</option>
                            <option value="Giao Hàng Nhanh">Giao Hàng Nhanh</option>
                            <option value="Giao Hàng Tiết Kiệm">Giao Hàng Tiết Kiệm</option>
                            <option value="J&T Express">J&T Express</option>
                            <option value="Ninja Van">Ninja Van</option>
                            <option value="Khác">Khác / Tự thỏa thuận</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[11px] font-bold text-slate-500 block">
                          {t('carrierAccount')}
                        </label>
                        <input
                          type="text"
                          value={carrierAccount}
                          onChange={(e) => setCarrierAccount(e.target.value)}
                          className="w-full rounded-[5px] border border-slate-200 bg-white px-3 py-2 text-xs outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand font-medium"
                        />
                      </div>
                    </div>
                    <div className="bg-sky-50 border border-sky-100 p-3 rounded-[5px] text-xs text-sky-700 leading-relaxed">
                      {t('ship3plWarning')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[5px] border border-slate-200 bg-card p-6 shadow-sm space-y-5 text-left">
              <h3 className="text-lg font-bold text-slate-900">{t('orderSummaryTitle')}</h3>

              <div className="divide-y divide-slate-200/60 max-h-[280px] overflow-y-auto pr-2 space-y-3.5">
                {resolvedItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pt-3.5 first:pt-0 items-start">
                    {item.slug ? (
                      <Link
                        href={`/solutions/${item.slug}`}
                        className="relative h-12 w-12 shrink-0 rounded-[5px] border border-slate-200 bg-white flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity block"
                      >
                        {item.hero ? (
                          <Image
                            src={`${DIRECTUS_URL}/assets/${item.hero}`}
                            alt={item.product_name || item.sku}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-slate-300" />
                        )}
                      </Link>
                    ) : (
                      <div className="relative h-12 w-12 shrink-0 rounded-[5px] border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
                        <Package className="h-5 w-5 text-slate-300" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <span className="font-bold text-slate-800 text-xs block truncate">
                        {item.product_name}
                      </span>
                      <p className="text-[10px] text-slate-400">
                        {item.quantity} {item.unit} x {formatPrice(item.unitPrice)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-700 shrink-0">
                      {formatPrice(item.total)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-slate-200" />

              <div className="space-y-4 text-sm pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('subtotal')}</span>
                  <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('vat')}</span>
                  <span className="font-semibold text-slate-800">{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500">{t('shippingFee')}</span>
                  <span className="font-bold text-emerald-600 text-right">
                    {shippingMethod === 'express'
                      ? formatPrice(250000)
                      : shippingMethod === '3pl'
                        ? t('ship3plPrice')
                        : t('shipStandardPrice')}
                  </span>
                </div>

                <hr className="border-slate-200" />

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-base font-bold text-slate-900">{t('total')}</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#006AA7] block leading-none">
                      {formatPrice(grandTotal)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1.5">
                      {t('vatIncluded')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-[5px] bg-brand py-3.5 text-sm font-bold text-white shadow hover:bg-brand/95 transition-all text-center"
                >
                  {t('btnPayNow')}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-[5px] border border-brand text-brand hover:bg-brand/5 py-3.5 text-sm font-bold transition-all text-center"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('btnBackToCart')}
                </Link>
              </div>
            </div>

            <div className="rounded-[5px] border border-slate-200/80 bg-slate-50/50 p-4 flex gap-3 text-left">
              <ShieldCheck className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-[10.5px] text-slate-400 leading-relaxed">
                {t('secureCheckout')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[5px] shadow-xl border border-slate-100 max-w-[480px] w-full p-5 sm:p-8 relative flex flex-col items-center text-center space-y-5 sm:space-y-6 animate-scaleIn">
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
              <h3 className="text-xl font-extrabold text-slate-900">{t('successTitle')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                {t('successMsg', { orderId })}
              </p>
            </div>
            <div className="bg-card rounded-[5px] p-4 w-full flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-[#3B82F6] tracking-wider uppercase">
                {t('totalPayment')}
              </span>
              <span className="text-2xl font-extrabold text-[#1D4ED8] mt-1.5">
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
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors pt-2"
            >
              {t('btnBackHome')}
            </button>
          </div>
        </div>
      )}

      {showPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[5px] shadow-xl border border-slate-100 max-w-[480px] w-full p-5 sm:p-8 relative flex flex-col items-center text-center space-y-5 sm:space-y-6 animate-scaleIn">
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
              <h3 className="text-xl font-extrabold text-slate-900">{t('pendingTitle')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                {t('pendingMsg')}
              </p>
            </div>
            <div className="bg-[#FFFBEB] rounded-[5px] p-4 w-full flex flex-col items-center justify-center border border-amber-100">
              <span className="text-[10px] font-bold text-[#D97706] tracking-wider uppercase">
                {t('txnCode')}
              </span>
              <span className="text-lg font-extrabold text-[#B45309] mt-1.5 font-mono">
                TXN-{orderId.replace('UL-', '')}
              </span>
            </div>
            <button
              onClick={() => {
                setShowPendingModal(false);
                window.location.href = `/${locale}`;
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors pt-2"
            >
              {t('btnBackHome')}
            </button>
          </div>
        </div>
      )}

      {showFailureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[5px] shadow-xl border border-slate-100 max-w-[480px] w-full p-5 sm:p-8 relative flex flex-col items-center text-center space-y-5 sm:space-y-6 animate-scaleIn">
            <button
              onClick={() => setShowFailureModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-16 w-16 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <div className="border-4 border-[#DC2626] rounded-[5px] p-1.5 flex items-center justify-center h-8 w-8 font-black text-lg leading-none">
                !
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900">{t('failureTitle')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                {t('failureMsg')}
              </p>
            </div>
            <div className="bg-[#FEF2F2] rounded-[5px] p-4 w-full flex flex-col items-center justify-center border border-red-100">
              <span className="text-[10px] font-bold text-red-500 tracking-wider uppercase">
                {t('errorDetail')}
              </span>
              <span className="text-xs font-semibold text-[#991B1B] mt-1.5 text-center px-2 leading-relaxed">
                {t('errBankDeclined')}
              </span>
            </div>
            <div className="flex gap-4 items-center justify-center text-xs font-bold text-[#1D4ED8] pt-2">
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


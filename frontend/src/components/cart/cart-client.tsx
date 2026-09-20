'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  FileText,
  Phone,
  Mail,
  MapPin,
  Tag,
  Package,
  CheckCircle2,
  CalendarDays,
  Bookmark,
  Edit3,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AuthUser } from '@/lib/auth-helpers';
import { readCart, persistCart, type CartItem } from '@/components/rfq/cart-types';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { resolveImageUrl } from '@/lib/image-url';
import { ProductCard } from '@/components/solutions/product-card';

/* ───────────────────── static data lookup ───────────────────── */

interface StaticProductInfo {
  name: string;
  spec: string;
  unit: string;
  basePrice: number;
  image?: string;
  moq: number;
}

const PRODUCT_DATABASE: Record<string, StaticProductInfo> = {
  'UL-PF-2002': {
    name: 'Màng quấn Pallet - Đóng kiện hàng (Stretch film)',
    spec: 'Khổ 50cm, Trọng lượng cuộn 3.0 kg, lõi giấy ø 76 mm',
    unit: 'kg',
    basePrice: 54861,
    moq: 500
  },
  'UL-PE-1008': {
    name: 'Túi PE trong suốt - Đựng thực phẩm',
    spec: 'Khổ 30x40cm, dày 0.03mm, PE dẻo dai',
    unit: 'kg',
    basePrice: 33333,
    moq: 200
  },
  'CR-GLV-001': {
    name: 'Găng tay Nitrile - Bảo hộ công nghiệp',
    spec: 'Size M, Phủ Nitrile lòng bàn tay',
    unit: 'đôi',
    basePrice: 3472, // 2500 / 0.72 = ~3472
    moq: 200
  },
  'polyester-cleanroom-wipers': {
    name: 'Khăn lau phòng sạch Polyester',
    spec: '9x9 inches, 150 cái/gói',
    unit: 'gói',
    basePrice: 347222, // 250000 / 0.72
    moq: 100
  },
  'tyvek-cleanroom-coverall': {
    name: 'Bộ quần áo phòng sạch Tyvek',
    spec: 'Chống tĩnh điện, size L',
    unit: 'bộ',
    basePrice: 250000,
    moq: 50
  },
  'cleanroom-face-mask-3ply': {
    name: 'Khẩu trang phòng sạch 3 lớp',
    spec: 'Chỉ số BFE > 99%',
    unit: 'hộp',
    basePrice: 104166,
    moq: 100
  },
  'esd-wrist-strap': {
    name: 'Vòng đeo tay chống tĩnh điện',
    spec: 'Dây co giãn tốt',
    unit: 'cái',
    basePrice: 62500,
    moq: 50
  },
  'esd-table-mat-2layer': {
    name: 'Thảm cao su chống tĩnh điện 2 lớp',
    spec: '10m x 1m x 2mm',
    unit: 'cuộn',
    basePrice: 1666666,
    moq: 10
  },
  'ipa-cleanroom-grade-999': {
    name: 'Cồn IPA phòng sạch 99.9%',
    spec: 'Chai xịt 500ml',
    unit: 'chai',
    basePrice: 131944,
    moq: 50
  },
  'sticky-mat-30-layers': {
    name: 'Thảm dính bụi Sticky Mat',
    spec: '60cm x 90cm, 30 lớp/tấm',
    unit: 'tấm',
    basePrice: 208333,
    moq: 30
  },
  'esd-shielding-bag': {
    name: 'Túi chống tĩnh điện ESD Shielding',
    spec: '15cm x 20cm',
    unit: 'túi',
    basePrice: 4861,
    moq: 500
  },
  'sterile-latex-cleanroom-gloves': {
    name: 'Găng tay Latex phòng sạch tiệt trùng',
    spec: 'Size 7.0, tiệt trùng từng đôi',
    unit: 'đôi',
    basePrice: 6250,
    moq: 200
  }
};

/* ───────────────────── pricing logic ───────────────────── */

function getTierMultiplier(qty: number): number {
  if (qty < 100) return 1.2;
  if (qty < 300) return 1.0;
  if (qty < 500) return 0.84;
  return 0.72;
}

export interface SuggestedProduct {
  id?: number | string;
  sku: string;
  slug: string;
  name: string;
  priceText: string;
  unit?: string;
  moq: number;
  moqText: string;
  desc: string;
  hub: string;
  hero: string | null;
}

export default function CartClient({
  user,
  locale,
  suggestedProducts = [],
  dbProductMap = {}
}: {
  user: AuthUser | null;
  locale: string;
  suggestedProducts?: SuggestedProduct[];
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
}) {
  const t = useTranslations('cartPage');
  const DIRECTUS_URL = getDirectusUrl();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; name: string } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  // Load cart and saved voucher on mount
  useEffect(() => {
    setCart(readCart());
    try {
      const savedVoucherStr = localStorage.getItem('ulink_applied_voucher');
      if (savedVoucherStr) {
        const parsed = JSON.parse(savedVoucherStr);
        if (parsed?.code) {
          setPromoCode(parsed.code);
          setAppliedVoucher(parsed.voucher || { code: parsed.code, name: 'Chiết khấu B2B' });
          setDiscountAmount(parsed.discountAmount || 0);
        }
      }
    } catch {}
  }, []);

  const saveCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    persistCart(newCart);
  }, []);

  const handleQtyChange = useCallback(
    (index: number, newQty: number) => {
      const updated = cart.map((item, idx) => {
        if (idx === index) {
          const info = PRODUCT_DATABASE[item.sku];
          const minQty = info ? info.moq : 1;
          return { ...item, quantity: Math.max(minQty, newQty) };
        }
        return item;
      });
      saveCart(updated);
    },
    [cart, saveCart]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const updated = cart.filter((_, idx) => idx !== index);
      saveCart(updated);
    },
    [cart, saveCart]
  );

  /* ── calculations ── */
  const resolvedItems = useMemo(() => {
    return cart.map((item) => {
      const info = PRODUCT_DATABASE[item.sku] || {
        name: item.product_name || item.sku,
        spec: item.spec || 'Sản phẩm doanh nghiệp',
        unit: item.unit || 'cái',
        basePrice: 100000,
        moq: 1
      };

      const dbInfo = dbProductMap[item.sku];
      const hero = dbInfo?.hero || null;
      const slug = dbInfo?.slug || null;

      const multiplier = getTierMultiplier(item.quantity);
      const unitPrice = Math.round(info.basePrice * multiplier);
      const total = unitPrice * item.quantity;

      return {
        ...item,
        product_name: info.name,
        spec: info.spec,
        unit: info.unit,
        unitPrice,
        total,
        hero,
        slug
      };
    });
  }, [cart, dbProductMap]);

  const subtotal = useMemo(() => {
    return resolvedItems.reduce((sum, item) => sum + item.total, 0);
  }, [resolvedItems]);

  const vat = useMemo(() => Math.round(subtotal * 0.08), [subtotal]);
  const grandTotal = useMemo(
    () => Math.max(0, subtotal + vat - discountAmount),
    [subtotal, vat, discountAmount]
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

  /* ── suggested products click ── */
  const handleAddSuggested = (prod: SuggestedProduct) => {
    const existingIdx = cart.findIndex((item) => item.sku === prod.sku);
    if (existingIdx > -1) {
      handleQtyChange(existingIdx, cart[existingIdx].quantity + prod.moq);
    } else {
      const newItem: CartItem = {
        sku: prod.sku,
        product_name: prod.name,
        spec: prod.desc || 'Sản phẩm phòng sạch công nghiệp',
        unit: prod.sku.includes('PF-2002') || prod.sku.includes('PE-1008') ? 'kg' : 'cái',
        quantity: prod.moq,
        note: ''
      };
      saveCart([...cart, newItem]);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 w-full">
      {/* SECTION 1: Breadcrumbs, Progress, Grid */}
      <div className="page-container flex flex-col gap-4 sm:gap-6">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-caption-responsive text-muted-foreground pb-2"
        >
          <Link href="/" className="transition-colors hover:text-brand">
            {t('breadcrumbHome')}
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-medium text-foreground">{t('breadcrumbCart')}</span>
        </nav>

        {/* Step Progress bar */}
        <div className="flex w-full overflow-hidden text-caption-responsive font-semibold rounded-[3px]">
          {/* Step 1: Giỏ hàng */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-4 bg-brand text-white text-xs sm:text-caption-responsive">
            <span className="flex h-5 sm:h-6 w-5 sm:w-6 items-center justify-center rounded-full bg-white text-caption-responsive font-bold text-brand shrink-0">
              1
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepCart')}</span>
          </div>

          {/* Step 2: Thanh toán */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-4 bg-[#3B82F6]/90 text-white text-xs sm:text-caption-responsive">
            <span className="flex h-5 sm:h-6 w-5 sm:w-6 items-center justify-center rounded-full bg-brand text-caption-responsive font-bold text-white shrink-0">
              2
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepPayment')}</span>
          </div>

          {/* Step 3: Vận chuyển */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-4 bg-slate-200 text-slate-600 text-xs sm:text-caption-responsive">
            <span className="flex h-5 sm:h-6 w-5 sm:w-6 items-center justify-center rounded-full bg-white text-caption-responsive font-bold text-slate-500 shrink-0">
              3
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepShipping')}</span>
          </div>

          {/* Step 4: Hoàn tất */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-4 bg-slate-50 text-slate-400 text-xs sm:text-caption-responsive">
            <span className="flex h-5 sm:h-6 w-5 sm:w-6 items-center justify-center rounded-full bg-white border border-border/40 text-caption-responsive font-bold text-slate-300 shrink-0">
              4
            </span>
            <span className="font-bold tracking-wide hidden sm:inline">{t('stepComplete')}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 lg:gap-[35px]">
          {/* LEFT COLUMN: Cart Items */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            {/* Cart Header Title Row (Item count aligned to end of Column 1) */}
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3 min-h-[36px]">
              <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#162233] tracking-[-0.0107em] leading-[36px]">
                {t('title')}
              </h2>
              <span className="text-[16px] font-normal text-[#495057] leading-[24px]">
                {t('totalItems', { count: cart.length })}
              </span>
            </div>

            {resolvedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-3 sm:px-4 text-center border border-dashed border-[#dce0e5] rounded-[6px] space-y-3 sm:space-y-4 bg-white">
                <Package className="h-10 w-10 text-slate-300" />
                <p className="text-[16px] font-normal text-[#495057] leading-[24px]">{t('emptyCart')}</p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#1257c0] px-4 py-2 text-[14px] font-semibold text-[#1257c0] bg-[#dbeafe] hover:bg-blue-100 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('btnBack')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop/Tablet Table Layout */}
                <div className="hidden md:block overflow-x-auto rounded-[6px] border border-[#dce0e5] bg-white">
                  <table className="w-full border-collapse text-left min-w-[700px]">
                    <thead className="bg-[#f2f4f8] text-[#495057] border-b border-[#cad5e2]">
                      <tr>
                        <th className="px-4 py-3 w-[320px] text-left text-[14px] font-semibold text-[#495057] leading-[20px] tracking-[0.0071em]">
                          {t('colProduct')}
                        </th>
                        <th className="px-3 py-3 w-[120px] text-right text-[14px] font-semibold text-[#495057] leading-[20px] tracking-[0.0071em]">
                          {t('colPrice')}
                        </th>
                        <th className="px-3 py-3 w-[80px] text-center text-[14px] font-semibold text-[#495057] leading-[20px] tracking-[0.0071em]">
                          {t('colUnit')}
                        </th>
                        <th className="px-3 py-3 w-[160px] text-center text-[14px] font-semibold text-[#495057] leading-[20px] tracking-[0.0071em]">
                          {t('colQuantity')}
                        </th>
                        <th className="px-4 py-3 w-[140px] text-right text-[14px] font-semibold text-[#495057] leading-[20px] tracking-[0.0071em]">
                          {t('colTotal')}
                        </th>
                        <th className="px-3 py-3 w-[40px] text-center text-[14px] font-semibold text-[#495057] leading-[20px]" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dce0e5] bg-white">
                      {resolvedItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          {/* Product Name & Specs */}
                          <td className="px-4 py-5">
                            <div className="flex gap-4 items-center w-[320px]">
                              {item.slug ? (
                                <Link
                                  href={`/solutions/listProduct/${item.slug}`}
                                  className="relative h-[80px] w-[80px] shrink-0 rounded-[4px] border border-[#dce0e5] bg-[#f2f4f8] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity block"
                                >
                                  {item.hero ? (
                                    <Image
                                      src={resolveImageUrl(item.hero) || '/images/banners/login-hero.webp'}
                                      alt={item.product_name || item.sku}
                                      fill
                                      className="object-cover"
                                      sizes="80px"
                                    />
                                  ) : (
                                    <Package className="h-8 w-8 text-slate-300" />
                                  )}
                                </Link>
                              ) : (
                                <div className="relative h-[80px] w-[80px] shrink-0 rounded-[4px] border border-[#dce0e5] bg-[#f2f4f8] flex items-center justify-center overflow-hidden">
                                  <Package className="h-8 w-8 text-slate-300" />
                                </div>
                              )}
                              <div className="space-y-1 min-w-0 flex-1">
                                {item.slug ? (
                                  <Link
                                    href={`/solutions/listProduct/${item.slug}`}
                                    className="font-semibold text-[#162233] text-[14px] leading-[20px] tracking-[0.0071em] block hover:text-[#1769e2] transition-colors"
                                  >
                                    {item.product_name}
                                  </Link>
                                ) : (
                                  <span className="font-semibold text-[#162233] text-[14px] leading-[20px] tracking-[0.0071em] block">
                                    {item.product_name}
                                  </span>
                                )}
                                <span className="text-[12px] font-normal text-[#495057] block leading-[16px] tracking-[0.0333em]">
                                  SKU: {item.sku}
                                </span>
                                <span className="text-[12px] font-normal text-[#495057] block truncate leading-[16px] tracking-[0.0333em]">
                                  {locale === 'vi' ? 'Quy cách: ' : 'Spec: '}
                                  {item.spec}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Unit Price */}
                          <td className="px-3 py-5 text-right font-normal text-[#212529] text-[16px] leading-[24px]">
                            {formatPrice(item.unitPrice)}
                          </td>

                          {/* Unit */}
                          <td className="px-3 py-5 text-center text-[#212529] font-semibold text-[14px] leading-[20px]">
                            {item.unit}
                          </td>

                          {/* Quantity Input */}
                          <td className="px-3 py-5 text-center">
                            <div className="flex items-center justify-center w-[110px] h-[32px] mx-auto bg-white rounded-[4px] border border-[#dce0e5] overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleQtyChange(idx, item.quantity - 10)}
                                className="w-[32px] h-full flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold border-r border-[#dce0e5] select-none transition-colors cursor-pointer shrink-0"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="flex-1 text-center font-semibold text-[14px] text-[#212529] leading-[20px]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(idx, item.quantity + 10)}
                                className="w-[32px] h-full flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold border-l border-[#dce0e5] select-none transition-colors cursor-pointer shrink-0"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>

                          {/* Total Price */}
                          <td className="px-4 py-5 text-right font-semibold text-[#1769e2] text-[20px] leading-[28px]">
                            {formatPrice(item.total)}
                          </td>

                          {/* Remove Button */}
                          <td className="px-3 py-5 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemove(idx)}
                              className="w-[32px] h-[32px] flex items-center justify-center hover:text-rose-600 text-slate-400 hover:bg-rose-50 rounded-[4px] transition-colors cursor-pointer mx-auto"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Stacked Card Layout */}
                <div className="block md:hidden space-y-3">
                  {resolvedItems.map((item, idx) => (
                    <div key={idx} className="rounded-[6px] border border-[#dce0e5] bg-white p-4 space-y-3">
                      <div className="flex gap-3">
                        {item.slug ? (
                          <Link
                            href={`/solutions/listProduct/${item.slug}`}
                            className="relative h-16 w-16 shrink-0 rounded-[4px] border border-[#dce0e5] bg-[#f2f4f8] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity block"
                          >
                            {item.hero ? (
                              <Image
                                src={resolveImageUrl(item.hero) || '/images/banners/login-hero.webp'}
                                alt={item.product_name || item.sku}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-slate-300" />
                            )}
                          </Link>
                        ) : (
                          <div className="relative h-16 w-16 shrink-0 rounded-[4px] border border-[#dce0e5] bg-[#f2f4f8] flex items-center justify-center overflow-hidden">
                            <Package className="h-6 w-6 text-slate-300" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-0.5 text-left">
                          {item.slug ? (
                            <Link
                              href={`/solutions/listProduct/${item.slug}`}
                              className="font-semibold text-[#162233] text-[14px] leading-[20px] block hover:text-[#1769e2] transition-colors line-clamp-2"
                            >
                              {item.product_name}
                            </Link>
                          ) : (
                            <span className="font-semibold text-[#162233] text-[14px] leading-[20px] block line-clamp-2">
                              {item.product_name}
                            </span>
                          )}
                          <span className="text-[12px] font-normal text-[#495057] block">
                            SKU: {item.sku}
                          </span>
                          <span className="text-[12px] font-normal text-[#495057] block truncate">
                            {locale === 'vi' ? 'Quy cách: ' : 'Spec: '}
                            {item.spec}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[14px] border-t border-[#dce0e5] pt-2">
                        <span className="text-[#495057] font-normal">{locale === 'vi' ? 'Đơn giá / ĐVT:' : 'Price / Unit:'}</span>
                        <span className="font-semibold text-[#212529]">
                          {formatPrice(item.unitPrice)} / {item.unit}
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-t border-[#dce0e5] pt-2">
                        <div className="flex items-center justify-center w-[100px] h-[32px] bg-white rounded-[4px] border border-[#dce0e5] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(idx, item.quantity - 10)}
                            className="w-[28px] h-full flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold border-r border-[#dce0e5] select-none transition-colors cursor-pointer shrink-0"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex-1 text-center font-semibold text-[13px] text-[#212529]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(idx, item.quantity + 10)}
                            className="w-[28px] h-full flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold border-l border-[#dce0e5] select-none transition-colors cursor-pointer shrink-0"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-[#1769e2] text-[16px]">
                            {formatPrice(item.total)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemove(idx)}
                            className="p-1.5 border border-[#dce0e5] rounded-[4px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar Summary (360px fixed, aligned to top of Table 1) */}
          <div className="w-full lg:w-[360px] lg:shrink-0 lg:pt-[48px]">
            <div className="w-full p-6 space-y-5 bg-[#f5f8fc] border border-[#dce0e5] rounded-[8px] text-left">
              <h3 className="text-[20px] font-semibold text-[#162233] leading-[28px]">
                {t('summaryTitle')}
              </h3>

              <hr className="border-[#dce0e5]" />

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[16px] leading-[24px]">
                  <span className="text-[#495057] font-normal">{t('subtotal')}</span>
                  <span className="font-semibold text-[#212529] text-[14px] leading-[20px] tracking-[0.0071em]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[16px] leading-[24px]">
                  <span className="text-[#495057] font-normal">{t('vat')}</span>
                  <span className="font-semibold text-[#212529] text-[14px] leading-[20px] tracking-[0.0071em]">{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between items-center text-[16px] leading-[24px]">
                  <span className="text-[#495057] font-normal">{t('shipping')}</span>
                  <span className="font-semibold text-[#1257c0] text-[14px] leading-[20px] tracking-[0.0071em]">{t('shippingContact')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[16px] leading-[24px] pt-1 border-t border-dashed border-[#dce0e5]">
                    <span className="text-[#16A34A] font-semibold text-[14px] flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {appliedVoucher ? `Giảm giá (${appliedVoucher.code})` : 'Chiết khấu'}
                    </span>
                    <span className="font-semibold text-[#16A34A] text-[14px] leading-[20px]">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}

                <hr className="border-[#dce0e5]" />

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-[12px] font-semibold text-[#212529] leading-[16px] tracking-[0.0333em] block">
                    {t('promoLabel')}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={t('promoPlaceholder')}
                      className="flex-1 h-[38px] rounded-[4px] border border-[#dce0e5] bg-white px-3 text-[14px] font-normal text-[#212529] placeholder:text-[#495057] focus:outline-none focus:border-[#1769e2] uppercase leading-[20px]"
                    />
                    <button
                      type="submit"
                      disabled={promoLoading}
                      className="h-[38px] rounded-[4px] bg-[#dbeafe] text-[#1257c0] text-[14px] font-semibold leading-[20px] tracking-[0.0071em] px-4 transition-all hover:bg-blue-100 cursor-pointer shrink-0 disabled:opacity-60"
                    >
                      {promoLoading ? 'Đang xử lý...' : t('promoApply')}
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[12px] text-rose-500 font-semibold block mt-1">
                      {promoError}
                    </span>
                  )}
                  {promoSuccess && (
                    <span className="text-[12px] text-emerald-600 font-semibold block mt-1">
                      {promoSuccess}
                    </span>
                  )}
                </form>

                <hr className="border-[#dce0e5]" />

                <div className="space-y-1 pt-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[20px] font-semibold text-[#162233] leading-[28px]">{t('total')}</span>
                    <span className="text-[28px] font-semibold text-[#1769e2] leading-[36px] tracking-[-0.0107em]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#495057] leading-[16px] block">
                    {t('vatIncluded')}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-[10px] pt-1">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 h-[50px] px-6 rounded-[3px] font-bold text-[16px] text-white bg-[#00b233] hover:bg-[#009b2c] transition-colors cursor-pointer shadow-xs text-center leading-[24px]"
                >
                  <span>{t('btnCheckout')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="w-full flex items-center justify-center gap-2 h-[50px] px-6 rounded-[3px] font-normal text-[16px] text-[#1257c0] bg-[#dbeafe] border border-[#1257c0] hover:bg-blue-100 transition-colors cursor-pointer text-center leading-[24px]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t('btnBack')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Quick Quote Promo Banner (Figma Node #929:5910) */}
      <div className="w-full bg-[#F5F8FC] border-t border-[#CAD5E2] py-8 sm:py-10 lg:py-12 my-6 sm:my-8">
        <div className="page-container flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
          <div className="flex flex-col gap-3 max-w-3xl text-left">
            <span className="text-[14px] font-semibold text-[#162233] leading-[20px] tracking-[0.0071em] uppercase block">
              {t('rfqSectionSubtitle')}
            </span>
            <h4 className="text-[20px] font-semibold text-[#162233] leading-[28px]">
              {t('rfqTitle')}
            </h4>
            <p className="text-[16px] font-normal text-[#495057] leading-[24px]">
              {t('rfqDesc')}
            </p>
          </div>
          <Link
            href="/quick-order"
            className="inline-flex items-center justify-center gap-3 rounded-[3px] bg-[#1769E2] hover:bg-[#1257C0] px-6 py-[14px] text-[16px] font-bold text-white transition-colors shrink-0 w-full md:w-auto cursor-pointer shadow-xs leading-[24px]"
          >
            <span>{t('rfqCta')}</span>
            <Edit3 className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* SECTION 3: Suggested Products & Engineer Support Banners */}
      <div className="page-container flex flex-col gap-6 sm:gap-8 lg:gap-10 pb-6 sm:pb-8 lg:pb-12">
        {/* Suggested Products Grid */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-body-regular sm:text-card-title font-bold text-slate-900">{t('suggestTitle')}</h3>
            <Link href="/solutions" className="text-caption-responsive font-semibold text-brand hover:underline">
              {t('viewAll')}
            </Link>
          </div>

          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {suggestedProducts.map((prod, idx) => (
              <ProductCard
                key={prod.id || idx}
                product={{
                  id: prod.id || idx,
                  name: prod.name,
                  slug: prod.slug,
                  image: prod.hero,
                  price: prod.priceText,
                  moq: prod.moqText,
                  status: locale === 'vi' ? 'Có sẵn tại Kho' : 'In Stock',
                  location: prod.hub,
                  unit: prod.unit
                }}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Engineer Support Banner - Full Width */}
      <div className="w-full bg-gradient-to-r from-[#051E44] via-[#0E3E85] to-[#09224A] text-white py-8 sm:py-10 lg:py-12 relative overflow-hidden mt-2 sm:mt-4">
        {/* Background Decorative Accent */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 -mb-10 -ml-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_40%,transparent_40%)] pointer-events-none" />

        <div className="page-container flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl text-left">
            <span className="text-caption-responsive font-bold text-blue-200 uppercase tracking-wider block">
              {t('bannerTitle')}
            </span>
            <h3 className="text-body-regular sm:text-section-title font-bold leading-tight tracking-tight">{t('bannerSubtitle')}</h3>
            <p className="text-caption-responsive sm:text-body-regular text-blue-100 opacity-95 leading-5 sm:leading-relaxed">{t('bannerDesc')}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto shrink-0 pt-1 sm:pt-2">
            <a
              href={`tel:${t('btnHotline').replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-white/60 hover:border-white text-white hover:bg-white/10 px-4 sm:px-6 py-2 sm:py-3.5 text-caption-responsive sm:text-body-regular font-bold transition-all text-center"
            >
              <Phone className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
              {t('btnHotline')}
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#3B82F6] hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3.5 text-caption-responsive sm:text-body-regular font-bold transition-all text-center shadow-md"
            >
              <CalendarDays className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
              {t('btnSchedule')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';

interface HubHeroSectionProps {
  locale: string;
  hubs?: any[];
}

export default function HubHeroSection({ locale }: HubHeroSectionProps) {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState('');

  // Dictionary for multi-language support (vi, en, ja)
  const translations: Record<string, {
    title: string;
    subtitle: string;
    orderNow: string;
    contact: string;
    trackOrder: string;
    placeholder: string;
    search: string;
  }> = {
    vi: {
      title: 'Giải pháp vật tư công nghiệp chuyên biệt cho Doanh nghiệp của bạn',
      subtitle: 'B2B Platform for Manufacturers, Distributors, Retailers, 3PLs, and more',
      orderNow: 'Đặt hàng ngay',
      contact: 'Liên hệ',
      trackOrder: 'Tra cứu Đơn hàng',
      placeholder: 'Nhập mã đơn hàng',
      search: 'Tìm kiếm ngay'
    },
    en: {
      title: 'Specialized industrial supply solutions for your business',
      subtitle: 'B2B Platform for Manufacturers, Distributors, Retailers, 3PLs, and more',
      orderNow: 'Order Now',
      contact: 'Contact',
      trackOrder: 'Track Order',
      placeholder: 'Enter order code',
      search: 'Search Now'
    },
    ja: {
      title: 'あなたのビジネスのための専門的な工業用サプライ品ソリューション',
      subtitle: 'B2B Platform for Manufacturers, Distributors, Retailers, 3PLs, and more',
      orderNow: '今すぐ注文',
      contact: 'お問い合わせ',
      trackOrder: '注文追跡',
      placeholder: '注文コードを入力',
      search: '今すぐ検索'
    }
  };

  // Fallback to English if locale is not supported
  const t = translations[locale] || translations.en;

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      router.push(`/order-tracking?code=${encodeURIComponent(trackingCode.trim())}`);
    } else {
      router.push('/order-tracking');
    }
  };

  return (
    <section className="relative w-full flex flex-col justify-between">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/regional_hubs/hub-2/warehouse-forklift.svg"
          alt="ULink Warehouse Corridor"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-900/25 to-slate-950/10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 page-container pt-20 pb-20 sm:pt-24 lg:pt-32 lg:pb-28 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">
        {/* Left-aligned Info Card */}
        <div className="max-w-[760px] text-left mt-auto mb-auto">
          {/* Title */}
          <h1 className="text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold text-white leading-tight tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-body-regular font-medium leading-relaxed text-slate-200/90">
            {t.subtitle}
          </p>

          {/* Buttons Row (Always 1 single row on all screens) */}
          <div className="mt-8 flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-[460px]">
            <Link
              href="/quick-order"
              className="flex-1 sm:flex-initial bg-brand hover:bg-brand-strong text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-[3px] font-semibold text-caption-responsive leading-relaxed flex items-center justify-center sm:min-w-[180px] lg:min-w-[210px] gap-1.5 sm:gap-2 transition-all group whitespace-nowrap"
            >
              <span>{t.orderNow}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="flex-1 sm:flex-initial bg-white hover:bg-slate-50 text-slate-900 px-4 sm:px-6 py-3 sm:py-3.5 rounded-[3px] font-semibold text-caption-responsive leading-relaxed flex items-center justify-center sm:min-w-[180px] lg:min-w-[210px] gap-1.5 sm:gap-2 border border-slate-200 transition-all group whitespace-nowrap"
            >
              <span>{t.contact}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Order Tracking Card (Overlapping bottom edge) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
        <div className="page-container">
          <div className="w-full bg-white rounded-[3px] p-6 sm:p-8 shadow-2xl border border-slate-100/60">
            <div className="flex flex-col gap-4">
              <span className="text-body-regular font-bold text-slate-900 leading-snug text-center md:text-left">
                {t.trackOrder}
              </span>
              <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-0 w-full max-w-[700px]">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none stroke-[2]" />
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full bg-white border border-slate-300 rounded-[3px] sm:rounded-r-none sm:border-r-0 pl-11 pr-4 py-3 text-body-regular text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand focus:z-10 transition-colors h-[48px]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand-strong text-white font-bold text-body-regular px-8 py-3 rounded-[3px] sm:rounded-l-none flex items-center justify-center transition-colors shrink-0 h-[48px]"
                >
                  {t.search}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


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
          {/* Title (Figma Heading/2: 42px Bold, line-height 46px) */}
          <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-white leading-tight lg:leading-[46px] tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle (Figma Body/L: 18px Regular, line-height 25px) */}
          <p className="mt-5 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed lg:leading-[25px] text-slate-200/90">
            {t.subtitle}
          </p>

          {/* Buttons Row (Figma Button/L: 20px Medium/SemiBold, height 56px) */}
          <div className="mt-8 flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-[500px]">
            <Link
              href="/quick-order"
              className="flex-1 sm:flex-initial bg-brand hover:bg-brand-strong text-white px-5 sm:px-8 py-3.5 lg:py-4 rounded-[3px] font-medium lg:font-semibold text-base sm:text-lg lg:text-[20px] leading-snug flex items-center justify-center sm:min-w-[180px] lg:min-w-[210px] lg:h-[56px] gap-2 transition-all group whitespace-nowrap"
            >
              <span>{t.orderNow}</span>
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="flex-1 sm:flex-initial bg-white hover:bg-slate-50 text-slate-900 px-5 sm:px-8 py-3.5 lg:py-4 rounded-[3px] font-medium lg:font-semibold text-base sm:text-lg lg:text-[20px] leading-snug flex items-center justify-center sm:min-w-[180px] lg:min-w-[210px] lg:h-[56px] gap-2 border border-slate-200 transition-all group whitespace-nowrap"
            >
              <span>{t.contact}</span>
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Order Tracking Card (Overlapping bottom edge) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
        <div className="page-container">
          <div className="w-full bg-[#F5F8FC] rounded-[3px] p-4 sm:p-8 border border-slate-200">
            <div className="flex flex-col gap-2.5 sm:gap-4 w-full sm:w-[80%] mx-auto">
              {/* Header (Figma Heading/5: 20px Bold) */}
              <span className="text-lg sm:text-[20px] font-bold text-slate-900 leading-snug text-center sm:text-left">
                {t.trackOrder}
              </span>
              <form
                onSubmit={handleSearchTracking}
                className="group flex flex-row items-center w-full bg-white border border-slate-300 hover:border-slate-400 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand rounded-[3px] transition-colors overflow-hidden h-[44px] sm:h-[48px]"
              >
                <div className="relative flex-1 h-full flex items-center">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-slate-600 group-focus-within:text-brand pointer-events-none stroke-[2] transition-colors" />
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full h-full bg-transparent pl-9 sm:pl-11 pr-3 text-base font-normal text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand-strong text-white font-bold text-base px-4 sm:px-8 flex items-center justify-center transition-colors shrink-0 h-full whitespace-nowrap"
                >
                  <span className="hidden sm:inline">{t.search}</span>
                  <span className="sm:hidden flex items-center gap-1">
                    <span>{locale === 'vi' ? 'Tìm' : locale === 'ja' ? '検索' : 'Search'}</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


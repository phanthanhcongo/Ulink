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
      placeholder: 'Nhập mã đơn hàng hoặc mã vận đơn...',
      search: 'Tra cứu'
    },
    en: {
      title: 'Specialized industrial supply solutions for your business',
      subtitle: 'B2B Platform for Manufacturers, Distributors, Retailers, 3PLs, and more',
      orderNow: 'Order Now',
      contact: 'Contact',
      trackOrder: 'Track Order',
      placeholder: 'Enter order or tracking code...',
      search: 'Track'
    },
    ja: {
      title: 'あなたのビジネスのための専門的な工業用サプライ品ソリューション',
      subtitle: 'B2B Platform for Manufacturers, Distributors, Retailers, 3PLs, and more',
      orderNow: '今すぐ注文',
      contact: 'お問い合わせ',
      trackOrder: '注文追跡',
      placeholder: '注文または追跡コードを入力...',
      search: '追跡'
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
          src="/images/regional_hubs/hub-2/warehouse-forklift.jpg"
          alt="ULink Warehouse Corridor"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-900/25 to-slate-950/10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pt-20 pb-20 sm:px-8 sm:pt-24 lg:px-12 xl:px-16 lg:pt-32 lg:pb-28 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">
        {/* Left-aligned Info Card */}
        <div className="max-w-[720px] text-left mt-auto mb-auto">
          {/* Title */}
          <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] font-extrabold text-white leading-[1.25] tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-[15px] sm:text-[17px] text-slate-200/90 font-medium leading-relaxed">
            {t.subtitle}
          </p>

          {/* Buttons Row */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/quick-order"
              className="bg-brand hover:bg-brand-strong text-white px-6 py-3.5 rounded-[3px] font-semibold text-[14px] flex items-center gap-2 transition-all group"
            >
              {t.orderNow}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-50 text-slate-900 px-6 py-3.5 rounded-[3px] font-semibold text-[14px] flex items-center gap-2 border border-slate-200 transition-all group"
            >
              {t.contact}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Order Tracking Card (Overlapping bottom edge) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[calc(100%-2rem)] max-w-[1120px] bg-white rounded-[3px] p-6 shadow-2xl border border-slate-100/60 z-20">
        <div className="flex flex-col gap-4">
          <span className="text-[16px] sm:text-[18px] font-bold text-slate-900 tracking-tight text-center md:text-left">
            {t.trackOrder}
          </span>
          <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder={t.placeholder}
              className="w-full border border-slate-300 rounded-[3px] px-4 py-3 text-[14px] text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:border-brand transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand hover:bg-brand-strong text-white font-bold text-[14px] px-8 py-3 rounded-[3px] flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              {t.search}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

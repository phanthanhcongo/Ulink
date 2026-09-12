'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { IndustryData } from '@/components/industries/types';
import { IndustryHeroSection } from '@/components/industries/industry-hero-section';
import { IndustryValueProps } from '@/components/industries/industry-value-props';
import { IndustryOverviewSection } from '@/components/industries/industry-overview';
import { IndustryCategorySection } from '@/components/industries/industry-category-section';
import { IndustryStandardsSection } from '@/components/industries/industry-standards-section';
import { IndustryCasesSection } from '@/components/industries/industry-cases-section';
import { IndustryCtaBanner } from '@/components/industries/industry-cta-banner';
import { PartnersLogosOnly } from '@/components/home/partners-logos-only';

interface FurnitureClientProps {
  industryData: IndustryData;
  products: any[];
  locale: string;
  currentSlug: string;
  translations: Record<string, string>;
}

export default function FurnitureClient({
  industryData,
  products,
  locale,
  currentSlug,
  translations
}: FurnitureClientProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showToast, setShowToast] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleCatalogueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const tabs = [
    { id: 'overview', label: translations.overview },
    { id: 'cleanroom', label: translations.cleanroomSol },
    { id: 'packaging', label: translations.packagingSol },
    { id: 'standards', label: industryData.standardsTitle },
    { id: 'cases', label: translations.cases }
  ];

  const TAB_IDS = ['overview', 'cleanroom', 'packaging', 'standards', 'cases'];

  useEffect(() => {
    let isMounted = true;

    const observerOptions = {
      root: null,
      rootMargin: '-70px 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!isMounted) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    TAB_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      isMounted = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [industryData.slug]);

  const handleTabClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans">
      <IndustryHeroSection
        industryData={industryData}
        locale={locale}
        translations={translations}
        onCatalogueClick={handleCatalogueClick}
      />

      <IndustryValueProps valueProps={industryData.valueProps} />

      <div className="hidden md:block sticky top-0 z-40 bg-white border-b border-[#DDE1E6] transition-all duration-300 shadow-2xs backdrop-blur-md">
        <div className="page-container">
          <div className="flex overflow-x-auto no-scrollbar py-0.5 gap-8 scroll-smooth">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleTabClick(e, tab.id)}
                className={`py-4 text-[14px] lg:text-[15px] font-bold transition-all relative border-b-[3px] whitespace-nowrap leading-none ${activeTab === tab.id
                  ? 'border-[#1769E2] text-[#1769E2]'
                  : 'border-transparent text-[#495057] hover:text-[#1769E2]'
                  }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <IndustryOverviewSection industryData={industryData} locale={locale} />

      <IndustryCategorySection
        id="cleanroom"
        tagText={translations.cleanroomSol}
        title={isVi ? 'Nhóm sản phẩm vật tư xưởng gỗ & sơn nội thất' : isJa ? '木工・塗料工場用資材グループ' : 'Woodworking Consumables Products'}
        intro={industryData.cleanroomIntro}
        categories={industryData.cleanroomCategories}
        locale={locale}
        defaultSlug="cleanroom-consumables"
      />

      <IndustryCategorySection
        id="packaging"
        tagText={translations.packagingSol}
        title={isVi ? 'Bao bì & Đóng gói sản phẩm gỗ xuất khẩu' : isJa ? '輸出用木製品包装＆パッケージング' : 'Export Furniture Packaging'}
        intro={industryData.packagingIntro}
        categories={industryData.packagingCategories}
        locale={locale}
        defaultSlug="industrial-packaging"
      />

      <IndustryStandardsSection industryData={industryData} locale={locale} />

      <IndustryCasesSection industryData={industryData} locale={locale} translations={translations} />

      <PartnersLogosOnly />

      <IndustryCtaBanner locale={locale} industryName={industryData.name} />

      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-500/20">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-[14px] font-semibold">
            {isVi ? 'Tài liệu đang chờ cập nhật' : isJa ? 'カタログドキュメントは準備中です' : 'The document is pending update'}
          </span>
        </div>
      )}
    </div>
  );
}

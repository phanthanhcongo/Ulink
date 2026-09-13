'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  ArrowRight,
  PhoneCall,
  Check
} from 'lucide-react';
import { IndustryData } from '@/components/industries/types';
import { IndustryOverviewSection } from '@/components/industries/industry-overview';
import { PartnersLogosOnly } from '@/components/home/partners-logos-only';

interface ElectronicsClientProps {
  industryData: IndustryData;
  products: any[];
  locale: string;
  currentSlug: string;
  translations: Record<string, string>;
}

export default function ElectronicsClient({
  industryData,
  products,
  locale,
  currentSlug,
  translations
}: ElectronicsClientProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showToast, setShowToast] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  const handleCatalogueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const tabs = [
    { id: 'overview', label: isVi ? 'Tổng quan' : isJa ? '概要' : 'Overview' },
    { id: 'products-section', label: isVi ? 'Sản phẩm chuyên dụng' : isJa ? '専用製品' : 'Specialized Products' },
    { id: 'applications-section', label: isVi ? 'Giải pháp ứng dụng' : isJa ? '応用ソリューション' : 'Applications' },
    { id: 'standards', label: isVi ? 'Chứng nhận & Tiêu chuẩn' : isJa ? '認証・規格' : 'Standards' },
    { id: 'partners', label: isVi ? 'Đối tác tin cậy' : isJa ? '信頼のパートナー' : 'Trusted Partners' }
  ];

  const TAB_IDS = ['overview', 'products-section', 'applications-section', 'standards', 'partners'];

  useEffect(() => {
    let isMounted = true;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
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
  }, []);

  const handleTabClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[520px] lg:min-h-[560px] bg-[#0F172A] text-white flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/industries/electronics/banner.png"
            alt="Giải pháp vật tư tiêu hao cho ngành Điện tử & Bán dẫn"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B153D]/95 via-[#0B153D]/80 to-[#0B153D]/60" />
        </div>

        <div className="relative z-10 page-container py-12 lg:py-16 flex flex-col justify-between flex-1">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-[#DDE1E6] mb-8">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {translations.home}
            </Link>
            <span>&gt;</span>
            <Link href={`/${locale}/industries`} className="hover:text-white transition-colors">
              {isVi ? 'Ngành nghề' : isJa ? '業界' : 'Industries'}
            </Link>
            <span>&gt;</span>
            <span className="text-white font-bold">
              {isVi ? 'Điện tử & Bán dẫn' : isJa ? '電子・半導体' : 'Electronics & Semiconductors'}
            </span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl space-y-6">
            <h1 className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white leading-snug lg:leading-[56px] tracking-tight">
              {isVi
                ? 'Giải pháp vật tư tiêu hao cho ngành Điện tử & Bán dẫn'
                : isJa
                  ? '電子・半導体産業向け消耗品ソリューション'
                  : 'Consumable Solutions for Electronics & Semiconductors'}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {isVi
                ? 'ULINK Industries cung cấp hệ thống vật tư phòng sạch ESD, màng đóng gói bảo vệ tĩnh điện, hóa chất tẩy rửa siêu âm và các giải pháp kiểm soát ô nhiễm chéo tối ưu đạt chuẩn ANSI/ESD S20.20 và ISO Class 5-8.'
                : isJa
                  ? 'ULINK Industriesは、ANSI/ESD S20.20およびISO Class 5-8規格に準拠したESDクリーンルーム用品、静電気保護包装フィルム、超音波洗浄化学薬品を提供しています。'
                  : 'ULINK Industries provides ESD cleanroom supply systems, electrostatic protection packaging films, ultrasonic cleaning chemicals, and cross-contamination control solutions meeting ANSI/ESD S20.20 and ISO Class 5-8.'}
            </p>

            <div className="pt-2">
              <button
                onClick={handleCatalogueClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-[#1769E2] hover:bg-[#1257C0] border border-white/80 text-white font-semibold text-sm rounded-[3px] transition-all shadow-md hover:shadow-lg"
              >
                {isVi ? 'Tải catalogue giải pháp ESD' : isJa ? 'ESDソリューションカタログをダウンロード' : 'Download ESD Solutions Catalogue'}
              </button>
            </div>
          </div>
        </div>

        {/* ================= FEATURE HIGHLIGHTS BAR ================= */}
        <div className="relative z-10 bg-[#E9EFF6] py-3 sm:py-4 lg:py-6">
          <div className="page-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-[2px]">
              {/* Feature 1 */}
              <div className="group bg-white p-3.5 sm:p-4 lg:p-6 flex flex-col justify-center space-y-2 sm:space-y-2.5 min-h-[120px] sm:min-h-[136px] rounded-md border border-[#DDE1E6] shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
                <Image
                  src="/images/industries/electronics/feature-cleanroom.svg"
                  alt="Vật tư phòng sạch"
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-[#212529] mb-1 group-hover:text-[#1769E2] transition-colors">
                    {isVi ? 'Vật tư phòng sạch' : isJa ? 'クリーンルーム資材' : 'Cleanroom Supplies'}
                  </h4>
                  <p className="text-[11px] sm:text-[14px] text-[#495057] leading-[16px] sm:leading-[20px]">
                    {isVi ? 'Kiểm soát nghiêm ngặt đạt tiêu chuẩn ISO Class 5-8' : isJa ? 'ISO Class 5-8規格に準拠した厳格な管理' : 'Strict control meeting ISO Class 5-8 standards'}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white p-3.5 sm:p-4 lg:p-6 flex flex-col justify-center space-y-2 sm:space-y-2.5 min-h-[120px] sm:min-h-[136px] rounded-md border border-[#DDE1E6] shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
                <Image
                  src="/images/industries/electronics/feature-esd.svg"
                  alt="Kiểm soát ESD"
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-[#212529] mb-1 group-hover:text-[#1769E2] transition-colors">
                    {isVi ? 'Kiểm soát ESD' : isJa ? 'ESD制御' : 'ESD Control'}
                  </h4>
                  <p className="text-[11px] sm:text-[14px] text-[#495057] leading-[16px] sm:leading-[20px]">
                    {isVi ? 'Thiết bị bảo hộ chống tĩnh điện chuyên nghiệp' : isJa ? '専門的な静電気防止保護具' : 'Professional anti-static protective equipment'}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white p-3.5 sm:p-4 lg:p-6 flex flex-col justify-center space-y-2 sm:space-y-2.5 min-h-[120px] sm:min-h-[136px] rounded-md border border-[#DDE1E6] shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
                <Image
                  src="/images/industries/electronics/feature-precision.svg"
                  alt="Độ chính xác cao"
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-[#212529] mb-1 group-hover:text-[#1769E2] transition-colors">
                    {isVi ? 'Độ chính xác cao' : isJa ? '高精度' : 'High Precision'}
                  </h4>
                  <p className="text-[11px] sm:text-[14px] text-[#495057] leading-[16px] sm:leading-[20px]">
                    {isVi ? 'Đáp ứng dung sai kỹ thuật khắt khe ±0.01mm' : isJa ? '±0.01mmの厳しい技術公差に対応' : 'Meets strict technical tolerance ±0.01mm'}
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group bg-white p-3.5 sm:p-4 lg:p-6 flex flex-col justify-center space-y-2 sm:space-y-2.5 min-h-[120px] sm:min-h-[136px] rounded-md border border-[#DDE1E6] shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
                <Image
                  src="/images/industries/electronics/feature-cert.svg"
                  alt="Chứng nhận quốc tế"
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-[#162233] mb-1 group-hover:text-[#1769E2] transition-colors">
                    {isVi ? 'Chứng nhận quốc tế' : isJa ? '国際認証' : 'International Certifications'}
                  </h4>
                  <p className="text-[11px] sm:text-[14px] text-[#495057] leading-[16px] sm:leading-[20px]">
                    {isVi ? 'Sản phẩm đạt chuẩn ISO 9001 : 2015; ISO 14644 & SGS' : isJa ? 'ISO 9001:2015, ISO 14644 & SGS規格に準拠' : 'Complies with ISO 9001:2015, ISO 14644 & SGS'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STICKY TAB NAVIGATION ================= */}
      <div className="hidden md:block sticky top-0 z-40 bg-white border-b border-[#DDE1E6] shadow-2xs backdrop-blur-md">
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

      {/* ================= SECTION 1: OVERVIEW ================= */}
      <IndustryOverviewSection industryData={industryData} locale={locale} />

      {/* ================= SECTION 2: SPECIALIZED PRODUCTS ================= */}
      <section id="products-section" className="py-16 lg:py-20 bg-[#F2F4F8]">
        <div className="page-container">
          {/* Section Header */}
          <div className="text-center max-w-full mx-auto mb-12 space-y-4">
            <span className="text-[14px] font-bold text-[#1769E2] uppercase tracking-wider block">
              {isVi ? 'DANH MỤC VẬT TƯ TIÊU HAO' : isJa ? '消耗品カタログ' : 'CONSUMABLES CATALOGUE'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#0B153D] leading-snug lg:leading-[46px]">
              {isVi
                ? 'Nhóm sản phẩm chuyên dụng ngành Điện tử & Bán dẫn'
                : isJa
                  ? '電子・半導体業界向け専用製品グループ'
                  : 'Specialized Product Groups for Electronics & Semiconductors'}
            </h2>
            <p className="text-base text-[#697077] leading-relaxed">
              {isVi
                ? 'Các dòng sản phẩm được sản xuất & bảo quản theo chuẩn phòng sạch quốc tế, đáp ứng đầy đủ yêu cầu nghiêm ngặt của dây chuyền chế tạo linh kiện.'
                : isJa
                  ? '国際クリーンルーム規格に従って製造・保管され、部品製造ラインの厳格な要件を満たす製品ライン。'
                  : 'Product lines manufactured & stored according to international cleanroom standards, meeting strict requirements of component fabrication lines.'}
            </p>
          </div>

          {/* 6 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Phòng sạch */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/cleanroom.png"
                    alt="Phòng sạch"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/industries/electronics/icon-wind-stream.svg"
                      alt="Phòng sạch icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-xl font-semibold text-[#0B153D] group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Phòng sạch' : isJa ? 'クリーンルーム' : 'Cleanroom'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#162233] leading-relaxed">
                    {isVi
                      ? 'Giải pháp toàn diện cho phòng sạch tiêu chuẩn ISO Class 1–8, đảm bảo môi trường sản xuất không nhiễm bẩn hạt bụi cho ngành bán dẫn.'
                      : isJa
                        ? 'ISO Class 1–8クリーンルームの包括的ソリューションにより、半導体業界の塵埃のない環境を確保。'
                        : 'Comprehensive solutions for ISO Class 1–8 cleanrooms, ensuring dust-free environments for semiconductors.'}
                  </p>
                  <hr className="border-[#ECEFF2]" />
                  <ul className="space-y-2.5 text-[14px] text-[#495057]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Trang phục phòng sạch & áo choàng ESD' : isJa ? 'クリーンルームウェア＆ESDローブ' : 'Cleanroom apparel & ESD smocks'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Găng tay phòng sạch Nitrile, Latex Class 100' : isJa ? 'Nitrile・Latex Class 100グローブ' : 'Nitrile, Latex Class 100 cleanroom gloves'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Khăn lau phòng sạch & giấy lau không bụi' : isJa ? 'クリーンルームワイパー＆無塵紙' : 'Cleanroom wipes & dust-free paper'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/products?category=cleanroom-consumables`}
                  className="inline-flex items-center gap-2 text-[#1257C0] font-semibold text-[14px] hover:text-[#1769E2] transition-colors group"
                >
                  <span>{isVi ? 'Xem chi tiết' : isJa ? '詳細を見る' : 'View Details'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 2: Chống tĩnh điện ESD */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/esd-protection.png"
                    alt="Chống tĩnh điện ESD"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/industries/electronics/icon-flash.svg"
                      alt="Chống tĩnh điện ESD icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-xl font-semibold text-[#0B153D] group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Chống tĩnh điện ESD' : isJa ? '静電気防止 ESD' : 'ESD Anti-Static'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#162233] leading-relaxed">
                    {isVi
                      ? 'Sản phẩm chống tĩnh điện chuyên dụng bảo vệ linh kiện nhạy cảm khỏi phóng tĩnh điện trong toàn bộ quy trình sản xuất và lắp ráp.'
                      : isJa
                        ? '製造および組み立てプロセス全体で静電気放電から敏感な電子部品を保護する専用帯電防止製品。'
                        : 'Specialized anti-static products protecting sensitive components from electrostatic discharge during assembly.'}
                  </p>
                  <hr className="border-[#ECEFF2]" />
                  <ul className="space-y-2.5 text-[14px] text-[#495057]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Túi chống tĩnh điện & bao bì ESD shielding' : isJa ? '帯電防止袋＆ESDシールド包装' : 'ESD shielding bags & packaging'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Thảm & vòng tay chống tĩnh điện ESD' : isJa ? 'ESD帯電防止マット＆リストストラップ' : 'ESD mats & wrist straps'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Hộp đựng linh kiện & khay chống tĩnh điện' : isJa ? '帯電防止コンテナ＆トレー' : 'ESD component boxes & trays'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/products?category=esd-supplies`}
                  className="inline-flex items-center gap-2 text-[#1257C0] font-semibold text-[14px] hover:text-[#1769E2] transition-colors group"
                >
                  <span>{isVi ? 'Xem chi tiết' : isJa ? '詳細を見る' : 'View Details'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 3: Bao bì bán dẫn */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/semiconductor-packaging.png"
                    alt="Bao bì bán dẫn"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/industries/electronics/icon-chip.svg"
                      alt="Bao bì bán dẫn icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-xl font-semibold text-[#0B153D] group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Bao bì bán dẫn' : isJa ? '半導体包装' : 'Semiconductor Packaging'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#212529] leading-relaxed">
                    {isVi
                      ? 'Bao bì chuyên dụng bảo vệ wafer, chip IC và linh kiện bán dẫn trong suốt quá trình vận chuyển, lưu kho và xuất khẩu.'
                      : isJa
                        ? '輸送、保管、輸出プロセス全体でウエハ、ICチップ、半導体部品を保護する専用包装。'
                        : 'Specialized packaging protecting wafers, IC chips, and semiconductors during shipping and export.'}
                  </p>
                  <hr className="border-[#ECEFF2]" />
                  <ul className="space-y-2.5 text-[14px] text-[#495057]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Túi moisture barrier đa lớp chống ẩm MBB' : isJa ? '多層防湿MBB袋' : 'Multilayer MBB moisture barrier bags'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Khay wafer & hộp đựng chip JEDEC chuẩn' : isJa ? 'ウエハトレー＆JEDEC標準チップボックス' : 'Wafer trays & JEDEC standard chip boxes'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Gói hút ẩm & chỉ thị độ ẩm HIC chuyên dụng' : isJa ? '乾燥剤＆HIC湿度インジケーター' : 'Desiccant packs & HIC humidity indicators'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/products?category=industrial-packaging`}
                  className="inline-flex items-center gap-2 text-[#1257C0] font-semibold text-[14px] hover:text-[#1769E2] transition-colors group"
                >
                  <span>{isVi ? 'Xem chi tiết' : isJa ? '詳細を見る' : 'View Details'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 4: Hóa chất & Vật liệu */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/chemicals-materials.png"
                    alt="Hóa chất & Vật liệu"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/industries/electronics/icon-chemistry.svg"
                      alt="Hóa chất & Vật liệu icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-xl font-semibold text-[#0B153D] group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Hóa chất & Vật liệu' : isJa ? '化学薬品・材料' : 'Chemicals & Materials'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'Hóa chất công nghệ cao và vật liệu tinh khiết phục vụ quy trình sản xuất wafer, gia công chip và kiểm tra chất lượng bán dẫn.'
                      : isJa
                        ? 'ウエハ製造、チップ加工、半導体品質検査に特化したハイテク化学薬品と高純度材料。'
                        : 'High-tech chemicals and ultra-pure materials for wafer fabrication, chip processing, and testing.'}
                  </p>
                  <hr className="border-[#ECEFF2]" />
                  <ul className="space-y-2.5 text-[14px] text-[#495057]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Dung môi & hóa chất xử lý bề mặt wafer' : isJa ? 'ウエハ表面処理溶剤・化学薬品' : 'Wafer surface treatment solvents & chemicals'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Keo dán, chất tẩy rửa chuyên dụng điện tử' : isJa ? '電子用専用接着剤・洗浄剤' : 'Electronic adhesives & cleaning agents'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Vật liệu mài mòn & đĩa cắt chính xác cao' : isJa ? '高精度研磨材＆ダイシングディスク' : 'High-precision abrasives & dicing blades'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/products?category=industrial-packaging`}
                  className="inline-flex items-center gap-2 text-[#1257C0] font-semibold text-[14px] hover:text-[#1769E2] transition-colors group"
                >
                  <span>{isVi ? 'Xem chi tiết' : isJa ? '詳細を見る' : 'View Details'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 5: Kiểm soát nhiễm bẩn */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/contamination-control.png"
                    alt="Kiểm soát nhiễm bẩn"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/industries/electronics/icon-rule-data-quality.svg"
                      alt="Kiểm soát nhiễm bẩn icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-xl font-semibold text-[#0B153D] group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Kiểm soát nhiễm bẩn' : isJa ? '汚染管理' : 'Contamination Control'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'Hệ thống kiểm soát ô nhiễm hạt bụi, vi khuẩn và tạp chất hóa học, đáp ứng tiêu chuẩn khắt khe của ngành sản xuất vi mạch.'
                      : isJa
                        ? 'マイクロチップ製造業界の厳しい基準を満たす、粒子、細菌、化学不純物の汚染管理システム。'
                        : 'Contamination control systems for particles, bacteria, and chemical impurities in microchip manufacturing.'}
                  </p>
                  <hr className="border-[#ECEFF2]" />
                  <ul className="space-y-2.5 text-[14px] text-[#495057]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Bộ lọc HEPA/ULPA & hệ thống lọc khí sạch' : isJa ? 'HEPA/ULPAフィルター＆クリーンエアシステム' : 'HEPA/ULPA filters & clean air systems'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Thảm dính bụi sticky mat cho cửa phòng sạch' : isJa ? 'クリーンルーム用粘着マット' : 'Sticky mats for cleanroom entrances'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Thiết bị đo hạt bụi & giám sát môi trường' : isJa ? 'パーティクルカウンター＆環境監視装置' : 'Particle counters & monitoring equipment'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/products?category=cleanroom-consumables`}
                  className="inline-flex items-center gap-2 text-[#1257C0] font-semibold text-[14px] hover:text-[#1769E2] transition-colors group"
                >
                  <span>{isVi ? 'Xem chi tiết' : isJa ? '詳細を見る' : 'View Details'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 6: Đóng gói & Vận chuyển */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/packaging-shipping.png"
                    alt="Đóng gói & Vận chuyển"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/industries/electronics/icon-box.svg"
                      alt="Đóng gói & Vận chuyển icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-xl font-semibold text-[#0B153D] group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Đóng gói & Vận chuyển' : isJa ? '梱包と輸送' : 'Packaging & Shipping'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'giải pháp đóng gói an toàn cho linh kiện điện tử và sản phẩm bán dẫn, đảm bảo nguyên vẹn khi vận chuyển quốc tế.'
                      : isJa
                        ? '電子部品や半導体製品の安全な梱包ソリューションにより、国際輸送時の完全性を確保。'
                        : 'Safe packaging solutions for electronic components and semiconductors ensuring integrity in international transport.'}
                  </p>
                  <hr className="border-[#ECEFF2]" />
                  <ul className="space-y-2.5 text-[14px] text-[#495057]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Màng xốp chống rung & Xốp PE chống va đập' : isJa ? '防振緩衝材＆耐衝撃PEフォーム' : 'Anti-vibration film & impact-resistant PE foam'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Màng co PE ESD & Pallet chuyên dụng' : isJa ? 'ESD PEシュリンクフィルム＆専用パレット' : 'ESD PE shrink film & specialized pallets'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1769E2] shrink-0 mt-0.5" />
                      <span>{isVi ? 'Băng keo chống tĩnh điện & nhãn cảnh báo.' : isJa ? '帯電防止テープ＆警告ラベル' : 'Anti-static tape & warning labels'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/products?category=industrial-packaging`}
                  className="inline-flex items-center gap-2 text-[#1257C0] font-semibold text-[14px] hover:text-[#1769E2] transition-colors group"
                >
                  <span>{isVi ? 'Xem chi tiết' : isJa ? '詳細を見る' : 'View Details'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: APPLICATION SOLUTIONS ================= */}
      <section id="applications-section" className="py-16 lg:py-20 bg-white">
        <div className="page-container">
          {/* Section Header */}
          <div className="text-center max-w-full mx-auto mb-12 space-y-4">
            <span className="text-[14px] font-bold text-[#1769E2] uppercase tracking-wider block">
              {isVi ? 'ỨNG DỤNG THỰC TẾ' : isJa ? '実用的な応用' : 'REAL APPLICATIONS'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#0B153D] leading-snug lg:leading-[46px]">
              {isVi
                ? 'Đồng hành cùng quy trình chế tạo công nghệ cao'
                : isJa
                  ? 'ハイテク製造プロセスとともに'
                  : 'Partnering with High-Tech Manufacturing Processes'}
            </h2>
            <p className="text-base text-[#697077] leading-relaxed">
              {isVi
                ? 'Sản phẩm của ULink hiện diện trong mọi khâu quan trọng của chuỗi lắp ráp điện tử và tinh chế bán dẫn.'
                : isJa
                  ? 'ULinkの製品は、電子組立および半導体精製のあらゆる重要な段階で活用されています。'
                  : 'ULink products are present in every critical step of electronic assembly and semiconductor fabrication.'}
            </p>
          </div>

          {/* 4 Application Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/app-wafer-fab.png"
                    alt="Sản xuất chip bán dẫn (Wafer Fab)"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#DBEAFE] text-[#1769E2] text-[12px] font-semibold rounded mb-2">
                      {isVi ? 'Bán dẫn' : isJa ? '半導体' : 'Semiconductors'}
                    </span>
                    <h3 className="text-lg font-semibold text-[#0B153D] leading-snug group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Sản xuất chip bán dẫn (Wafer Fab)' : isJa ? '半導体チップ製造 (Wafer Fab)' : 'Semiconductor Chip Fab (Wafer Fab)'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'Trang phục bảo hộ Class 100 và khăn lau vi sợi ngăn bụi tối ưu trên từng lớp phiến silicon wafer.'
                      : isJa
                        ? 'シリコンウェハ層ごとの粉塵を防ぐClass 100保護服とマイクロファイバーワイパー。'
                        : 'Class 100 protective wear and microfiber wipes ensuring dust prevention on silicon wafers.'}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href={`/${locale}/resources`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#1769E2] hover:bg-[#1257C0] text-white font-semibold text-[13px] rounded-[6px] transition-colors"
                >
                  {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read More'}
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/app-smt-assembly.png"
                    alt="Lắp ráp & kiểm tra PCB (SMT Assembly)"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#DBEAFE] text-[#1769E2] text-[12px] font-semibold rounded mb-2">
                      PCB/SMT
                    </span>
                    <h3 className="text-lg font-semibold text-[#0B153D] leading-snug group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Lắp ráp & kiểm tra PCB (SMT Assembly)' : isJa ? 'PCB実装＆検査 (SMT実装)' : 'PCB Assembly & Inspection (SMT)'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'Băng keo chịu nhiệt Kapton bảo vệ các vị trí hàn chân linh kiện không bị biến dạng bởi luồng nhiệt thiếc.'
                      : isJa
                        ? 'はんだの熱流による変形からコンポーネント脚部を保護するKapton耐熱テープ。'
                        : 'Kapton heat-resistant tape protecting component pins from thermal deformation during soldering.'}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href={`/${locale}/resources`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#1769E2] hover:bg-[#1257C0] text-white font-semibold text-[13px] rounded-[6px] transition-colors"
                >
                  {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read More'}
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-lg border border-[#DDE1E6] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between cursor-pointer">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/app-ic-packaging.png"
                    alt="Đóng gói linh kiện (IC Packaging)"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#DBEAFE] text-[#1769E2] text-[12px] font-semibold rounded mb-2">
                      {isVi ? 'Đóng gói IC' : isJa ? 'ICパッケージング' : 'IC Packaging'}
                    </span>
                    <h3 className="text-lg font-semibold text-[#0B153D] leading-snug group-hover:text-[#1769E2] transition-colors">
                      {isVi ? 'Đóng gói linh kiện (IC Packaging)' : isJa ? 'ICパッケージング' : 'IC Component Packaging'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'Túi nhôm Shielding chống điện từ trường hoàn hảo, bảo vệ các chip nhớ nhạy cảm suốt quá trình lưu kho toàn cầu.'
                      : isJa
                        ? 'グローバル保管中に敏感なメモリチップを保護する完璧な電磁シールドアルミ袋。'
                        : 'Shielding aluminum bags offering electromagnetic protection for sensitive memory chips in global storage.'}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href={`/${locale}/resources`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#1769E2] hover:bg-[#1257C0] text-white font-semibold text-[13px] rounded-[6px] transition-colors"
                >
                  {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read More'}
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg border border-[#DDE1E6] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/images/industries/electronics/app-cleanroom.png"
                    alt="Phòng sạch sản xuất (Cleanroom)"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#DBEAFE] text-[#1769E2] text-[12px] font-semibold rounded mb-2">
                      {isVi ? 'Phòng sạch' : isJa ? 'クリーンルーム' : 'Cleanroom'}
                    </span>
                    <h3 className="text-lg font-semibold text-[#0B153D] leading-snug">
                      {isVi ? 'Phòng sạch sản xuất (Cleanroom)' : isJa ? '製造クリーンルーム' : 'Production Cleanroom'}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#495057] leading-relaxed">
                    {isVi
                      ? 'Môi trường vô trùng tuyệt đối, kiểm soát bụi tĩnh điện tối đa, đáp ứng đầy đủ các tiêu chuẩn kiểm nghiệm của KCN.'
                      : isJa
                        ? '完全無菌環境、静電気・粉塵の最大限の管理、工業団地のすべての検査基準に準拠。'
                        : 'Sterile environment with maximum dust and static control, complying with industrial park standards.'}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href={`/${locale}/resources`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#1769E2] hover:bg-[#1257C0] text-white font-semibold text-[13px] rounded-[6px] transition-colors"
                >
                  {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read More'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: SERVICE COMMITMENTS ================= */}
      <section className="py-16 lg:py-20 bg-[#F2F4F8]">
        <div className="page-container">
          <div className="text-center max-w-full mx-auto mb-12 space-y-4">
            <span className="text-[14px] font-bold text-[#1769E2] uppercase tracking-wider block">
              {isVi ? 'CAM KẾT DỊCH VỤ' : isJa ? 'サービスコミットメント' : 'SERVICE COMMITMENT'}
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-[38px] font-bold text-[#0B153D] leading-snug lg:leading-[46px]">
              {isVi
                ? 'Đối tác tin cậy cho ngành Điện tử'
                : isJa
                  ? '電子産業の信頼できるパートナー'
                  : 'Trusted Partner for Electronics'}
            </h2>
            <p className="text-base text-[#697077] leading-relaxed">
              {isVi
                ? 'Chúng tôi thấu hiểu tính liên tục trong sản xuất công nghiệp và yêu cầu nghiệm thu khắt khe từ các đối tác FDI Nhật Bản, Hàn Quốc.'
                : isJa
                  ? '私たちは産業製造の連続性と、日韓のFDIパートナーからの厳格な検収要件を深理解しています。'
                  : 'We understand production continuity and strict inspection requirements from Japanese & Korean FDI partners.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#DDE1E6] space-y-3 shadow-2xs">
              <h4 className="text-[16px] font-bold text-[#0F172A]">
                {isVi ? 'Kho hàng chuyên dụng ESD' : isJa ? 'ESD専用倉庫' : 'ESD Dedicated Warehouse'}
              </h4>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Tổng kho 10.000m² tại Hà Nam lưu trữ bảo quản chuẩn phòng sạch, độ ẩm lý tưởng.'
                  : isJa
                    ? 'ハナムにある10,000m²の総合倉庫は、クリーンルーム規格と理想的な湿度で保管。'
                    : '10,000m² central warehouse in Ha Nam stored under cleanroom standards and ideal humidity.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#DDE1E6] space-y-3 shadow-2xs">
              <h4 className="text-[16px] font-bold text-[#0F172A]">
                {isVi ? 'Kỹ sư tư vấn chuyên ngành' : isJa ? '専任コンサルティングエンジニア' : 'Specialized Consulting Engineers'}
              </h4>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Hỗ trợ test mẫu dính, đo đạc thông số điện trở bề mặt vật liệu trực tiếp tại nhà xưởng.'
                  : isJa
                    ? '工場内で粘着サンプルテストや材料表面抵抗値の計測を直接サポート。'
                    : 'On-site sticky sample testing and surface resistance measurement directly at customer plants.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#DDE1E6] space-y-3 shadow-2xs">
              <h4 className="text-[16px] font-bold text-[#0F172A]">
                {isVi ? 'Đào tạo ESD định kỳ' : isJa ? '定期ESDトレーニング' : 'Regular ESD Training'}
              </h4>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Đào tạo ESD ANSI/ESD S20.20 cho đội ngũ đảm bảo vận hành đúng quy trình.'
                  : isJa
                    ? '正しいプロセスの運用を保証するため、チーム向けにANSI/ESD S20.20トレーニングを提供。'
                    : 'ANSI/ESD S20.20 training for personnel ensuring correct operating procedures.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#DDE1E6] space-y-3 shadow-2xs">
              <h4 className="text-[16px] font-bold text-[#0F172A]">
                {isVi ? 'Cam kết không trễ hạn' : isJa ? '納期遅延ゼロの約束' : 'On-Time Delivery Guarantee'}
              </h4>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Giao hàng thần tốc 24h tới toàn bộ các KCN điện tử miền Bắc và miền Trung.'
                  : isJa
                    ? '北部および中部のすべての電子工業団地へ24時間以内のスピード配送。'
                    : 'Fast 24h delivery to all electronics industrial parks across Northern and Central Vietnam.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: STANDARDS & CERTIFICATIONS ================= */}
      <section id="standards" className="py-16 lg:py-20 bg-white">
        <div className="page-container">
          <div className="text-center max-w-full mx-auto mb-12 space-y-4">
            <span className="text-[14px] font-bold text-[#1769E2] uppercase tracking-wider block">
              {isVi ? 'TIÊU CHUẨN KỸ THUẬT' : isJa ? '技術基準' : 'TECHNICAL STANDARDS'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#0B153D] leading-snug lg:leading-[46px]">
              {isVi
                ? 'Sản phẩm kiểm định chất lượng quốc tế'
                : isJa
                  ? '国際品質検査済み製品'
                  : 'Internationally Certified Quality Products'}
            </h2>
            <p className="text-base text-[#697077] leading-relaxed">
              {isVi
                ? 'Tất cả sản phẩm ULINK đều trải qua quy trình kiểm định nghiêm ngặt bởi SGS, đạt chứng nhận RoHS và tuân thủ các tiêu chuẩn quốc tế hàng đầu trong ngành điện tử & bán dẫn.'
                : isJa
                  ? 'ULINKの全製品はSGSによる厳格な検査を受け、RoHS認証を取得し、電子・半導体業界のトップクラスの国際規格に準拠しています。'
                  : 'All ULINK products undergo strict SGS inspection, earn RoHS compliance, and meet leading international standards in electronics & semiconductors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cert 1 */}
            <div className="bg-white p-7 rounded-lg border border-[#DDE1E6] flex flex-col items-start text-left space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <Image
                  src="/images/industries/electronics/icon-ibm-security.svg"
                  alt="ISO 14644 Cleanroom icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#0B153D]">
                ISO 14644 Cleanroom
              </h3>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Toàn bộ vật tư phòng sạch đạt chuẩn phân loại hạt bụi ISO Class 5–8, phù hợp môi trường sản xuất bán dẫn.'
                  : isJa
                    ? 'すべてのクリーンルーム用品はISO Class 5–8の塵埃分類規格に適合。'
                    : 'All cleanroom supplies meet ISO Class 5–8 particle classification.'}
              </p>
            </div>

            {/* Cert 2 */}
            <div className="bg-white p-7 rounded-lg border border-[#DDE1E6] flex flex-col items-start text-left space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <Image
                  src="/images/industries/electronics/icon-manage-protection.svg"
                  alt="ANSI/ESD S20.20 icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#0B153D]">
                ANSI/ESD S20.20
              </h3>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Sản phẩm chống tĩnh điện được kiểm định theo chuẩn ANSI/ESD S20.20, bảo vệ tối ưu linh kiện nhạy cảm.'
                  : isJa
                    ? 'ANSI/ESD S20.20規格に従って検査され、敏感なコンポーネントを保護。'
                    : 'Anti-static products tested to ANSI/ESD S20.20 protecting sensitive components.'}
              </p>
            </div>

            {/* Cert 3 */}
            <div className="bg-white p-7 rounded-lg border border-[#DDE1E6] flex flex-col items-start text-left space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <Image
                  src="/images/industries/electronics/icon-recommend.svg"
                  alt="SGS Tested (RoHS) icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#0B153D]">
                SGS Tested (RoHS)
              </h3>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Kiểm nghiệm bởi SGS quốc tế, đạt chứng nhận RoHS — không chứa chì, cadmium hay kim loại nặng gây hại.'
                  : isJa
                    ? '国際機関SGSによる検査を受け、RoHS認証を取得。有害な重金属を含みません。'
                    : 'Tested by international SGS, RoHS certified free from toxic heavy metals.'}
              </p>
            </div>

            {/* Cert 4 */}
            <div className="bg-white p-7 rounded-lg border border-[#DDE1E6] flex flex-col items-start text-left space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                <Image
                  src="/images/industries/electronics/icon-security.svg"
                  alt="ISO 9001:2015 icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#0B153D]">
                ISO 9001:2015
              </h3>
              <p className="text-[14px] text-[#697077] leading-relaxed">
                {isVi
                  ? 'Quy trình sản xuất & kiểm soát chất lượng đạt chuẩn ISO 9001:2015 từ nguyên liệu đầu vào đến thành phẩm.'
                  : isJa
                    ? '原材料から完成品までの製造・品質管理プロセスがISO 9001:2015規格に適合。'
                    : 'Manufacturing & QC processes certified to ISO 9001:2015.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: PARTNERS ================= */}
        <PartnersLogosOnly />


      {/* ================= CTA BANNER ================= */}
      <section className="bg-[#1769E2] text-white py-16 lg:py-20">
        <div className="page-container text-center max-w-6xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white leading-snug lg:leading-[46px]">
            {isVi
              ? 'Sẵn sàng tối ưu hóa quy trình sản xuất của bạn?'
              : isJa
                ? '製造プロセスの最適化をご検討ですか？'
                : 'Ready to Optimize Your Manufacturing Process?'}
          </h2>
          <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
            {isVi
              ? 'Đội ngũ kỹ sư hỗ trợ kỹ thuật của ULINK Industries luôn sẵn sàng đồng hành từ khâu gửi mẫu thử, tư vấn sản phẩm chống tĩnh điện ESD cho tới sản xuất và cung ứng.'
              : isJa
                ? 'ULINK Industriesの技術サポートエンジニアチームが、無料の製品テストとコンサルティングをいつでも提供します。'
                : 'ULINK Industries technical support engineers are always ready to accompany from sample testing, ESD consultation to production and supply.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#1769E2] hover:bg-blue-50 font-bold text-sm rounded-[3px] transition-colors shadow-md"
            >
              {isVi ? 'Nhận báo giá dự án ngay' : isJa ? 'プロジェクトの見積もりを即座に取得' : 'Get Project Quote Immediately'}
            </Link>
            <a
              href="tel:02473099899"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-blue-700/60 hover:bg-blue-700/80 border border-white/30 text-white font-semibold text-sm rounded-[3px] transition-colors"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              {isVi ? 'Liên hệ tư vấn kỹ thuật' : isJa ? '技術コンサルティングの問い合わせ' : 'Contact Technical Consulting'}
            </a>
          </div>
        </div>
      </section>

      {/* ================= TOAST NOTIFICATION ================= */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-[14px] font-semibold">
            {isVi ? 'Tài liệu đang chờ cập nhật' : isJa ? 'カタログドキュメントは準備中です' : 'The document is pending update'}
          </span>
        </div>
      )}
    </div>
  );
}

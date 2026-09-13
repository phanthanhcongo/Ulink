'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Thermometer,
  ShieldCheck,
  Zap,
  RefreshCw,
  MapPin,
  ArrowRight,
  Award,
  Users,
  Activity,
  Settings,
  Building2,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  PhoneCall,
  Check,
  Truck,
  FileText,
  Star,
  ThumbsUp,
  PieChart,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { IndustryData } from '@/components/industries/types';
import { IndustryHeroSection } from '@/components/industries/industry-hero-section';
import { IndustryOverviewSection } from '@/components/industries/industry-overview';
import { IndustryStandardsSection } from '@/components/industries/industry-standards-section';
import { IndustryDistributorSection } from '@/components/industries/industry-distributor-section';
import { IndustryCasesSection } from '@/components/industries/industry-cases-section';
import { IndustryCtaBanner } from '@/components/industries/industry-cta-banner';
import { ProductCard } from '@/components/solutions/product-card';
import { PartnersLogosOnly } from '@/components/home/partners-logos-only';
import { AboutSectionClient } from '@/components/home/about-section-client';

interface ConstructionClientProps {
  industryData: IndustryData;
  products: any[];
  locale: string;
  currentSlug: string;
  translations: Record<string, string>;
}

export default function ConstructionClient({
  industryData,
  products,
  locale,
  currentSlug,
  translations
}: ConstructionClientProps) {
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

  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  // 5 Tabs matching Figma sub-navigation for Construction - HVAC
  const tabs = [
    { id: 'overview', label: isVi ? 'Tổng quan' : isJa ? '概要' : 'Overview' },
    { id: 'products-section', label: isVi ? 'Sản phẩm chuyên dụng' : isJa ? '専用製品' : 'Products' },
    { id: 'applications-section', label: isVi ? 'Giải pháp ứng dụng' : isJa ? '応用ソリューション' : 'Applications' },
    { id: 'standards', label: isVi ? 'Chứng nhận & Tiêu chuẩn' : isJa ? '認証と標準' : 'Standards' },
    { id: 'cases', label: isVi ? 'Khách hàng đối tác' : isJa ? '導入事例' : 'Use Cases' }
  ];

  const TAB_IDS = ['overview', 'products-section', 'applications-section', 'standards', 'cases'];

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

  // HVAC Tape Product Grid matching Figma Node #1228:11460
  const hvacProducts = [
    {
      id: 'p1',
      slug: 'hvac-aluminum-tape-48mm',
      name: isVi ? 'Băng keo nhôm HVAC 48mm x 30m' : 'HVAC Aluminum Tape 48mm x 30m',
      price: '85.000đ - 95.000đ',
      unit: isVi ? 'per cuộn' : 'per roll',
      moq: 'MOQ: 100 cuộn',
      location: isVi ? 'Kho Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Độ dày 40 micron' : '40 Micron Thickness',
      image: '/images/industries/construction/product_1.png'
    },
    {
      id: 'p2',
      slug: 'heat-resistant-tape-72mm',
      name: isVi ? 'Băng keo chịu nhiệt 72mm x 45m' : 'Heat Resistant Tape 72mm x 45m',
      price: '125.000đ - 140.000đ',
      unit: isVi ? 'per cuộn' : 'per roll',
      moq: 'MOQ: 50 cuộn',
      location: isVi ? 'Kho Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Chịu nhiệt 150°C' : '150°C Heat Resistant',
      image: '/images/industries/construction/product_2.png'
    },
    {
      id: 'p3',
      slug: 'fsk-fiberglass-reinforced-tape',
      name: isVi ? 'Băng keo nhôm gia cường sợi thủy tinh' : 'Fiberglass Reinforced Aluminum Tape',
      price: '155.000đ - 175.000đ',
      unit: isVi ? 'per cuộn' : 'per roll',
      moq: 'MOQ: 50 cuộn',
      location: isVi ? 'Kho Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: 'FSK Facing Tape',
      image: '/images/industries/construction/product_3.png'
    },
    {
      id: 'p4',
      slug: 'duct-insulation-tape-96mm',
      name: isVi ? 'Băng keo nhôm bảo ôn ống gió 96mm' : 'Duct Insulation Aluminum Tape 96mm',
      price: '195.000đ - 220.000đ',
      unit: isVi ? 'per cuộn' : 'per roll',
      moq: 'MOQ: 30 cuộn',
      location: isVi ? 'Kho Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Keo acrylic cao cấp' : 'Premium Acrylic Adhesive',
      image: '/images/industries/construction/product_4.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans antialiased">
      {/* 1. HERO SECTION (Figma Node #1228:11368) */}
      <IndustryHeroSection
        industryData={industryData}
        locale={locale}
        translations={translations}
        onCatalogueClick={handleCatalogueClick}
      />

      {/* 2. FEATURE HIGHLIGHTS BAR (Figma Node #1240:2054 - bg #E9EFF6, 4 White Cards in 2 Rows on Mobile) */}
      <section className="w-full bg-[#E9EFF6] py-3 sm:py-4 lg:py-[20px]">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-[2px] items-stretch">
            {/* Feature 1 */}
            <div className="group bg-white p-3 sm:p-4 lg:p-[24px] min-h-[120px] sm:min-h-[136px] flex flex-col justify-start sm:justify-center gap-1.5 sm:gap-[10px] rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
              <Thermometer className="w-5 h-5 sm:w-[28px] sm:h-[28px] text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="text-[13px] sm:text-[15px] font-bold text-[#212529] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Chịu nhiệt cao' : 'High Heat Resistance'}
              </h4>
              <p className="text-[11px] sm:text-[14px] font-normal text-[#495057] leading-[16px] sm:leading-[20px]">
                {isVi ? 'Hoạt động ổn định trong dải nhiệt từ -30°C đến +120°C' : 'Stable operation from -30°C to +120°C.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-3 sm:p-4 lg:p-[24px] min-h-[120px] sm:min-h-[136px] flex flex-col justify-start sm:justify-center gap-1.5 sm:gap-[10px] rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
              <Zap className="w-5 h-5 sm:w-[28px] sm:h-[28px] text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="text-[13px] sm:text-[15px] font-bold text-[#212529] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Bám dính vượt trội' : 'Superior Adhesion'}
              </h4>
              <p className="text-[11px] sm:text-[14px] font-normal text-[#495057] leading-[16px] sm:leading-[20px]">
                {isVi ? 'Keo acrylic chịu lực, bám chắc trên bề mặt kim loại & ống gió' : 'Heavy-duty acrylic adhesive for metal & duct surfaces.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-3 sm:p-4 lg:p-[24px] min-h-[120px] sm:min-h-[136px] flex flex-col justify-start sm:justify-center gap-1.5 sm:gap-[10px] rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
              <ShieldCheck className="w-5 h-5 sm:w-[28px] sm:h-[28px] text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="text-[13px] sm:text-[15px] font-bold text-[#212529] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Chống ẩm & chống ăn mòn' : 'Moisture & Corrosion Barrier'}
              </h4>
              <p className="text-[11px] sm:text-[14px] font-normal text-[#495057] leading-[16px] sm:leading-[20px]">
                {isVi ? 'Lớp nhôm nguyên chất ngăn hơi ẩm, chống rỉ sét hiệu quả' : 'Pure aluminum layer prevents moisture & rusting.'}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white p-3 sm:p-4 lg:p-[24px] min-h-[120px] sm:min-h-[136px] flex flex-col justify-start sm:justify-center gap-1.5 sm:gap-[10px] rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] cursor-pointer">
              <Layers className="w-5 h-5 sm:w-[28px] sm:h-[28px] text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="text-[13px] sm:text-[15px] font-bold text-[#162233] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Thi công nhanh chóng' : 'Quick Installation'}
              </h4>
              <p className="text-[11px] sm:text-[14px] font-normal text-[#495057] leading-[16px] sm:leading-[20px]">
                {isVi ? 'Dễ cắt, dễ dán, tiết kiệm thời gian lắp đặt hệ thống HVAC' : 'Easy to cut & apply, saving installation time.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY SUB-NAVIGATION (Figma Node #1228:11403 - Hidden on mobile, visible on desktop) */}
      <div className="hidden md:block sticky top-0 z-40 bg-white/95 border-b border-[#DDE1E6] transition-all duration-300 shadow-2xs backdrop-blur-md">
        <div className="page-container">
          <div className="flex overflow-x-auto no-scrollbar py-0.5 gap-6 sm:gap-8 scroll-smooth">
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

      {/* 4. OVERVIEW SECTION (Figma Node #1228:11415) */}
      <IndustryOverviewSection industryData={industryData} locale={locale} />

      {/* 5. PRODUCTS SECTION GRID (Figma Node #1228:11455) */}
      <section id="products-section" className="scroll-mt-16 py-10 sm:py-16 lg:py-24 bg-[#F2F4F8] border-y border-[#DCE0E5]">
        <div className="page-container space-y-8 sm:space-y-10">
          <div className="space-y-3">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[#1769E2] block">
              {isVi ? 'DANH MỤC BĂNG KEO NHÔM HVAC' : 'HVAC ALUMINUM TAPE CATALOG'}
            </span>
            <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#1D2A49] tracking-tight">
              {isVi ? 'Giải pháp băng keo nhôm đạt chuẩn kỹ thuật cơ điện' : 'Standard Aluminum Tape Solutions for M&E'}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] sm:leading-[26px] text-[#495057]">
              {isVi ? 'Các sản phẩm được nghiên cứu phát triển chuyên sâu, hỗ trợ đắc lực cho công tác thi công hệ thống ống gió, bảo ôn, cách nhiệt.' : 'Specialized products designed for ductwork, insulation and thermal sealing.'}
            </p>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {hvacProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item as any}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. APPLICATIONS SECTION (Figma Node #1228:11461) */}
      <section id="applications-section" className="scroll-mt-16 w-full">
        {/* App 1: Bịt kín mối nối ống gió (Background White) */}
        <div className="w-full bg-white py-12 sm:py-16 lg:py-[80px]">
          <div className="page-container flex flex-col lg:flex-row items-center gap-8 lg:gap-[80px]">
            {/* Image (Left) */}
            <div className="group w-full lg:w-[600px] shrink-0 h-[280px] sm:h-[360px] lg:h-[400px] relative rounded-[2px] overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <Image
                src="/images/industries/construction/app_image_1.png"
                alt="Bịt kín mối nối ống gió HVAC"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Text Content (Right) */}
            <div className="flex-1 space-y-4 lg:space-y-[24px]">
              <span className="text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-[#1769E2] uppercase tracking-[0.05em] block">
                {isVi ? 'ỨNG DỤNG THI CÔNG' : 'INSTALLATION USE CASE'}
              </span>
              <h3 className="text-[24px] sm:text-[28px] leading-[32px] sm:leading-[36px] font-semibold text-[#0B153D] tracking-[-0.0107em]">
                {isVi ? 'Bịt kín mối nối ống gió HVAC' : 'HVAC Duct Joint Sealing'}
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#697077] font-normal">
                {isVi
                  ? 'Sử dụng băng keo nhôm ULINK để kết nối và bịt kín hoàn hảo các khe hở tại các điểm nối ống thông gió tôn mạ kẽm. Ngăn rò rỉ luồng khí lạnh áp suất lớn, đảm bảo hiệu năng tối đa cho toàn bộ hệ thống điều hòa trung tâm của tòa nhà.'
                  : 'Seal ductwork gaps effectively to prevent air leakage and maximize central AC efficiency.'}
              </p>
            </div>
          </div>
        </div>

        {/* App 2: Bọc cách nhiệt đường ống bảo ôn (Background #F2F4F8) */}
        <div className="w-full bg-[#F2F4F8] py-12 sm:py-16 lg:py-[80px]">
          <div className="page-container flex flex-col lg:flex-row items-center gap-8 lg:gap-[80px]">
            {/* Text Content (Left) */}
            <div className="flex-1 space-y-4 lg:space-y-[24px] order-2 lg:order-1">
              <span className="text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-[#1769E2] uppercase tracking-[0.05em] block">
                {isVi ? 'BẢO ÔN CÁCH NHIỆT' : 'THERMAL INSULATION'}
              </span>
              <h3 className="text-[24px] sm:text-[28px] leading-[32px] sm:leading-[36px] font-semibold text-[#0B153D] tracking-[-0.0107em]">
                {isVi ? 'Bọc cách nhiệt đường ống bảo ôn' : 'Thermal Pipe Wrapping & Sealing'}
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#697077] font-normal">
                {isVi
                  ? 'Hoàn thiện mối ghép cho các tấm cách nhiệt bông thủy tinh (Glasswool), bông khoáng hoặc các ống bảo ôn đồng điều hòa. Đảm bảo màng chắn ẩm hơi nước khép kín, ngăn hiện tượng đọng sương (condensation) làm hư hỏng trần thạch cao.'
                  : 'Seal Glasswool & mineral wool seams to create an airtight vapor barrier, avoiding moisture condensation.'}
              </p>
            </div>
            {/* Image (Right) */}
            <div className="group w-full lg:w-[600px] shrink-0 h-[280px] sm:h-[360px] lg:h-[400px] relative rounded-[2px] overflow-hidden order-1 lg:order-2 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <Image
                src="/images/industries/construction/app_image_2.png"
                alt="Bọc cách nhiệt đường ống bảo ôn"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMITMENT & SERVICE SECTION (Figma Node #1228:11474 - Why_Choose_Ulink) */}
      <section className="py-12 sm:py-16 lg:py-[80px] bg-white">
        <div className="page-container space-y-10 lg:space-y-[40px]">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-3 lg:space-y-[16px]">
            <span className="text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-[#1769E2] uppercase tracking-[0.05em] block">
              {isVi ? 'CAM KẾT DỊCH VỤ' : 'SERVICE COMMITMENTS'}
            </span>
            <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#0B153D] tracking-[-0.0158em]">
              {isVi ? 'Đối tác tin cậy của các nhà thầu M&E hàng đầu' : 'Trusted Partner for Leading M&E Contractors'}
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#697077] font-normal">
              {isVi ? 'Chúng tôi thấu hiểu áp lực về tiến độ thi công và chất lượng nghiệm thu khắt khe của các công trình công nghiệp lớn.' : 'Understanding tight construction deadlines & strict QC inspection requirements.'}
            </p>
          </div>

          {/* 4 Cards Row in 2 Rows on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-[16px]">
            {/* Card 1 */}
            <div className="group p-4 sm:p-6 lg:p-[24px] bg-[#F2F4F8] hover:bg-white rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] min-h-[140px] sm:min-h-[160px] cursor-pointer">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="font-bold text-[14px] sm:text-[16px] text-[#0F172A] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Tiêu chuẩn Nhật Bản' : 'Japanese Quality Standard'}
              </h4>
              <p className="text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#697077] font-normal">
                {isVi ? 'Đảm bảo quy trình sản xuất cơ lý đạt độ chuẩn xác cực cao, độ dính màng cực bền.' : 'Ensuring high mechanical precision and durable film adhesion.'}
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-4 sm:p-6 lg:p-[24px] bg-[#F2F4F8] hover:bg-white rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] min-h-[140px] sm:min-h-[160px] cursor-pointer">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="font-bold text-[14px] sm:text-[16px] text-[#0F172A] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Tư vấn kỹ thuật miễn phí' : 'Free Technical Consulting'}
              </h4>
              <p className="text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#697077] font-normal">
                {isVi ? 'Đội ngũ kỹ sư hỗ trợ tư vấn lựa chọn độ dày băng keo tối ưu phù hợp áp suất thiết kế.' : 'Engineers assist in selecting optimal tape thickness for design pressure.'}
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-4 sm:p-6 lg:p-[24px] bg-[#F2F4F8] hover:bg-white rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] min-h-[140px] sm:min-h-[160px] cursor-pointer">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="font-bold text-[14px] sm:text-[16px] text-[#0F172A] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Mẫu thử miễn phí' : 'Free Product Samples'}
              </h4>
              <p className="text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#697077] font-normal">
                {isVi ? 'Sẵn sàng gửi mẫu thử trực tiếp tới công trường để test độ bám dính trước khi mua số lượng lớn.' : 'Direct jobsite sample delivery for adhesion testing before bulk purchase.'}
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-4 sm:p-6 lg:p-[24px] bg-[#F2F4F8] hover:bg-white rounded-[2px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] min-h-[140px] sm:min-h-[160px] cursor-pointer">
              <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-[#1769E2] shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <h4 className="font-bold text-[14px] sm:text-[16px] text-[#0F172A] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                {isVi ? 'Giao hàng nhanh 24h' : 'Express 24h Delivery'}
              </h4>
              <p className="text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#697077] font-normal">
                {isVi ? 'Tổng kho Hà Nam luôn sẵn lượng hàng dồi dào, đảm bảo không trễ tiến độ nhà thầu.' : 'Abundant Ha Nam warehouse inventory preventing contractor delay.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ABOUT SECTION / HUB HA NAM LOGISTICS */}
      <AboutSectionClient locale={locale} />

      {/* 9. CASE STUDIES & USE CASES SECTION (Figma Node #1228:11500) */}
      <IndustryCasesSection industryData={industryData} locale={locale} translations={translations} />

      {/* 10. STANDARDS & CERTIFICATIONS SECTION (Figma Node #1228:11530) */}
      <IndustryStandardsSection industryData={industryData} locale={locale} />

      {/* 11. DISTRIBUTOR / PARTNER PROGRAM SECTION (Figma Node #1229:2388) */}
      <IndustryDistributorSection locale={locale} />

      {/* 12. PARTNERS LOGOS */}
      <PartnersLogosOnly />

      {/* 13. CTA BANNER */}
      <IndustryCtaBanner locale={locale} industryName={industryData.name} />

      {/* TOAST NOTIFICATION FOR CATALOGUE */}
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

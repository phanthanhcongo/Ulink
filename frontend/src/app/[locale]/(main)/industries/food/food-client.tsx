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
  MessageSquare,
  Award,
  Users,
  Activity,
  Settings,
  Building2,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  Bookmark,
  PhoneCall,
  Check,
  Truck
} from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { IndustryData } from '@/components/industries/types';
import { IndustryHeroSection } from '@/components/industries/industry-hero-section';
import { IndustryOverviewSection } from '@/components/industries/industry-overview';
import { IndustryCategorySection } from '@/components/industries/industry-category-section';
import { IndustryStandardsSection } from '@/components/industries/industry-standards-section';
import { IndustryCasesSection } from '@/components/industries/industry-cases-section';
import { IndustryCtaBanner } from '@/components/industries/industry-cta-banner';
import { ProductCard } from '@/components/solutions/product-card';
import { PartnersLogosOnly } from '@/components/home/partners-logos-only';

interface FoodClientProps {
  industryData: IndustryData;
  products: any[];
  locale: string;
  currentSlug: string;
  translations: Record<string, string>;
}

export default function FoodClient({
  industryData,
  products,
  locale,
  currentSlug,
  translations
}: FoodClientProps) {
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

  // 5 Tabs matching Figma sub-navigation
  const tabs = [
    { id: 'overview', label: isVi ? 'Tổng quan' : isJa ? '概要' : 'Overview' },
    { id: 'solutions-grid', label: isVi ? 'Danh mục giải pháp' : isJa ? 'ソリューション' : 'Solutions' },
    { id: 'featured-products', label: isVi ? 'Sản phẩm nổi bật' : isJa ? '注目の製品' : 'Featured Products' },
    { id: 'cases', label: isVi ? 'Trường hợp áp dụng' : isJa ? '導入事例' : 'Use Cases' },
    { id: 'contact-section', label: isVi ? 'Liên hệ' : isJa ? 'お問い合わせ' : 'Contact' }
  ];

  const TAB_IDS = ['overview', 'solutions-grid', 'featured-products', 'cases', 'contact-section'];

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

  // 8 Product Cards Grid matching Figma Node #1119:10575
  const gridProducts = [
    {
      id: 'p1',
      slug: 'pallet-stretch-film',
      name: isVi ? 'Màng quấn Pallet - Đóng kiện hàng.' : 'Pallet Stretch Film',
      price: '39.500đ - 43.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_1.png'
    },
    {
      id: 'p2',
      slug: 'pe-shrink-film-bottle-blocks',
      name: isVi ? 'Màng co PE - Shrink Film Block Chai' : 'PE Shrink Film for Bottle Blocks',
      price: '50.000đ - 55.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_2.png'
    },
    {
      id: 'p3',
      slug: 'pe-bags-multi-sizes',
      name: isVi ? 'Túi PE - Nhiều kích thước' : 'PE Bags - Multi Sizes',
      price: '35.000đ - 39.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_3.png'
    },
    {
      id: 'p4',
      slug: 'zipper-bags-multi-sizes',
      name: isVi ? 'Túi Ziper - Nhiều kích thước' : 'Zipper Bags - Multi Sizes',
      price: '59.500đ - 65.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_4.png'
    },
    {
      id: 'p5',
      slug: 'pof-shrink-film-cups',
      name: isVi ? 'Màng co POF - Shrink film cup' : 'POF Shrink Film for Cups',
      price: '55.500đ - 60.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_5.png'
    },
    {
      id: 'p6',
      slug: 'packaging-tape',
      name: isVi ? 'Băng keo - Đóng kiện hàng.' : 'Packaging Tape',
      price: '16.500đ - 29.000đ',
      unit: 'per cuộn',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_6.png'
    },
    {
      id: 'p7',
      slug: 'packaging-heavy-bags',
      name: isVi ? 'Túi - Đóng kiện hàng.' : 'Packaging Heavy Bags',
      price: '39.500đ - 43.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_7.png'
    },
    {
      id: 'p8',
      slug: 'pallet-wrapping-film',
      name: isVi ? 'Màng quấn Pallet - Đóng kiện hàng.' : 'Pallet Wrapping Film',
      price: '39.500đ - 43.000đ',
      unit: 'per kg',
      moq: 'MOQ: 500 kg',
      location: isVi ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Custom Order',
      image: '/images/industries/food/product_8.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans antialiased">
      {/* 1. HERO SECTION (Figma Node #1119:10524) */}
      <IndustryHeroSection
        industryData={industryData}
        locale={locale}
        translations={translations}
        onCatalogueClick={handleCatalogueClick}
      />

      {/* 2. FEATURE HIGHLIGHTS BAR (Figma Node #1125:1210 - 1440x175px, bg #E9EFF6, 4 White Cards) */}
      <section className="w-full bg-[#E9EFF6] py-[20px]">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-[2px] items-stretch">
            {/* Feature 1 */}
            <div className="bg-white p-4 sm:p-[24px] min-h-[136px] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] shadow-2xs">
              <Image
                src="/images/industries/food/icon_settings_services.svg"
                width={28}
                height={28}
                alt="Sản xuất theo yêu cầu"
                className="w-6 h-6 sm:w-[28px] sm:h-[28px] shrink-0"
              />
              <h4 className="text-xs sm:text-[15px] font-bold text-[#212529] leading-snug">
                {isVi ? 'Sản xuất theo yêu cầu' : 'Custom Manufacturing'}
              </h4>
              <p className="text-[12px] sm:text-[14px] font-normal text-[#495057] leading-[18px] sm:leading-[20px]">
                {isVi ? 'Thiết kế và sản xuất bao bì, đóng gói theo đúng quy cách và số lượng khách hàng.' : 'Tailored packaging specifications and client quantities.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-4 sm:p-[24px] min-h-[136px] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] shadow-2xs">
              <Image
                src="/images/industries/food/icon_task_approved.svg"
                width={28}
                height={28}
                alt="Chất lượng ổn định"
                className="w-6 h-6 sm:w-[28px] sm:h-[28px] shrink-0"
              />
              <h4 className="text-xs sm:text-[15px] font-bold text-[#212529] leading-snug">
                {isVi ? 'Chất lượng ổn định' : 'Stable Quality'}
              </h4>
              <p className="text-[12px] sm:text-[14px] font-normal text-[#495057] leading-[18px] sm:leading-[20px]">
                {isVi ? 'Quy trình kiểm soát chất lượng nghiêm ngặt, đảm bảo mỗi lô hàng bao bì đều đồng nhất' : 'Strict QC ensures every packaging batch is uniform.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-4 sm:p-[24px] min-h-[136px] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] shadow-2xs">
              <Image
                src="/images/industries/food/icon_tag.svg"
                width={28}
                height={28}
                alt="Giá cả cạnh tranh"
                className="w-6 h-6 sm:w-[28px] sm:h-[28px] shrink-0"
              />
              <h4 className="text-xs sm:text-[15px] font-bold text-[#212529] leading-snug">
                {isVi ? 'Giá cả cạnh tranh' : 'Competitive Pricing'}
              </h4>
              <p className="text-[12px] sm:text-[14px] font-normal text-[#495057] leading-[18px] sm:leading-[20px]">
                {isVi ? 'Tối ưu chi phí sản xuất bao bì và đóng gói nhờ quy mô nhà máy hiện đại' : 'Optimized manufacturing & packaging costs via modern plant.'}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-4 sm:p-[24px] min-h-[136px] flex flex-col justify-start sm:justify-center gap-2 sm:gap-[10px] shadow-2xs">
              <Image
                src="/images/industries/food/icon_delivery_truck.svg"
                width={28}
                height={28}
                alt="Giao hàng nhanh"
                className="w-6 h-6 sm:w-[28px] sm:h-[28px] shrink-0"
              />
              <h4 className="text-xs sm:text-[15px] font-bold text-[#162233] leading-snug">
                {isVi ? 'Giao hàng nhanh' : 'Fast Delivery'}
              </h4>
              <p className="text-[12px] sm:text-[14px] font-normal text-[#495057] leading-[18px] sm:leading-[20px]">
                {isVi ? 'Cam kết giao bao bì và vật tư đóng gói đúng tiến độ, hỗ trợ vận chuyển toàn quốc' : 'Committed to on-time delivery nationwide.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY SUB-NAVIGATION (Figma Node #1120:9287) */}
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

      {/* 4. OVERVIEW SECTION (Figma Node #1119:10538) */}
      <IndustryOverviewSection industryData={industryData} locale={locale} />

      {/* 5. KEY CATEGORIES SOLUTION GRID (Figma Node #1119:10575) */}
      <section id="solutions-grid" className="scroll-mt-16 py-10 sm:py-16 lg:py-24 bg-[#F2F4F8] border-y border-[#DCE0E5]">
        <div className="page-container space-y-8 sm:space-y-10">
          <div className="space-y-3">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[#1769E2] block">
              {isVi ? 'DANH MỤC GIẢI PHÁP CHUYÊN BIỆT' : 'SPECIALIZED SOLUTION CATEGORIES'}
            </span>
            <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#1D2A49] tracking-tight">
              {isVi ? 'Bao bì & Đóng gói - giải pháp cho F&B' : 'Packaging & Wrapping Solutions for F&B'}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] sm:leading-[26px] text-[#495057]">
              {isVi ? 'Sản xuất và cung ứng đồng bộ các giải pháp đóng gói, và các sản phẩm bao bì chuyên biệt.' : 'Manufacturing & supplying synchronized packaging solutions.'}
            </p>
          </div>

          {/* 8 Product Cards Grid using Shared ProductCard Component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {gridProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item as any}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS SECTION (Figma Node #1119:10581) */}
      <section id="featured-products" className="scroll-mt-16 py-10 sm:py-16 lg:py-[80px] bg-white">
        <div className="page-container space-y-[40px]">
          {/* Section Header (Figma Node #1119:10582) */}
          <div className="space-y-[12px]">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-[#1769E2] block">
              {isVi ? 'SẢN PHẨM NỔI BẬT' : 'FEATURED PRODUCTS'}
            </span>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#1D2A49] tracking-[-0.0158em]">
              {isVi ? 'Màng co PE - Shrink Film' : 'PE Shrink Film'}
            </h2>
            <p className="text-[15px] lg:text-[16px] leading-[24px] text-[#495057] font-normal">
              {isVi
                ? 'Màng co PE (Shrink Film) là giải pháp đóng gói hiện đại, dùng để bọc chai nước, lon bia, hộp sữa, thùng carton và sản phẩm tiêu dùng. Màng co nhiệt đều, ôm chặt sản phẩm tạo khối vững chắc, chống xê dịch khi vận chuyển và lưu kho. Sản phẩm bền, trong suốt, hiển thị thương hiệu rõ, chống thấm nước và bụi bẩn. Màng co PE thân thiện môi trường, tái chế 100%, phù hợp dây chuyền đóng gói tự động tốc độ cao, tối ưu chi phí và nâng cao hiệu quả sản xuất.'
                : 'PE Shrink Film is a modern packaging solution for bottling, cans, cartons, and consumer goods. 100% recyclable, optimizing costs.'}
            </p>
          </div>

          {/* 7. PRODUCT DETAIL SPECS SECTION (Figma Node #1206:4824) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-center pt-[16px]">
            {/* Left Image (Figma Node #I1206:4824;176:1625) */}
            <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden border border-[#C1C7CD] bg-white shadow-xs">
              <Image
                src="/images/industries/food/product_detail.png"
                alt="Thông số kỹ thuật Màng co PE"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Specs Grid 2x2 (Figma Node #I1206:4824;176:1610) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-[32px]">
              {/* Spec 1 */}
              <div className="space-y-3 sm:space-y-[16px]">
                <div className="flex h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] items-center justify-center rounded-[8px] bg-[#DBEAFE] text-[#1769E2]">
                  <Thermometer className="h-5 w-5 sm:h-[24px] sm:w-[24px] stroke-[2]" />
                </div>
                <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-[#212529] font-normal leading-snug sm:leading-[28px]">
                  {isVi ? 'Độ dày từ 25–80 micron, độ co ngang (TD) 40–75%, độ co dọc (MD) 5–15%, đảm bảo bó chặt đều và ổn định cho block chai, hộp.' : 'Thickness 25-80 microns, transverse (TD) 40-75%.'}
                </p>
              </div>

              {/* Spec 2 */}
              <div className="space-y-3 sm:space-y-[16px]">
                <div className="flex h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] items-center justify-center rounded-[8px] bg-[#DBEAFE] text-[#1769E2]">
                  <ShieldCheck className="h-5 w-5 sm:h-[24px] sm:w-[24px] stroke-[2]" />
                </div>
                <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-[#212529] font-normal leading-snug sm:leading-[28px]">
                  {isVi ? 'Độ bền kéo đứt ≥ 15 MPa, độ giãn dài đứt ≥ 300%, chịu lực xuyên thủng tốt, bảo vệ sản phẩm trong suốt quá trình vận chuyển và lưu kho.' : 'Tensile strength ≥ 15 MPa, elongation at break ≥ 300%.'}
                </p>
              </div>

              {/* Spec 3 */}
              <div className="space-y-3 sm:space-y-[16px]">
                <div className="flex h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] items-center justify-center rounded-[8px] bg-[#DBEAFE] text-[#1769E2]">
                  <Zap className="h-5 w-5 sm:h-[24px] sm:w-[24px] stroke-[2]" />
                </div>
                <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-[#212529] font-normal leading-snug sm:leading-[28px]">
                  {isVi ? 'Nhiệt độ co tối ưu 130–180°C, thời gian co nhanh 2–5 giây, tương thích với các hệ thống đóng gói tự động tốc độ cao.' : 'Optimal shrink temp 130-180°C, fast shrink 2-5s.'}
                </p>
              </div>

              {/* Spec 4 */}
              <div className="space-y-3 sm:space-y-[16px]">
                <div className="flex h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] items-center justify-center rounded-[8px] bg-[#DBEAFE] text-[#1769E2]">
                  <RefreshCw className="h-5 w-5 sm:h-[24px] sm:w-[24px] stroke-[2]" />
                </div>
                <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-[#212529] font-normal leading-snug sm:leading-[28px]">
                  {isVi ? 'Vật liệu 100% PE nguyên sinh, đạt tiêu chuẩn an toàn thực phẩm, có thể tái chế hoàn toàn, thân thiện với môi trường.' : '100% virgin PE material, food contact safe, fully recyclable.'}
                </p>
              </div>
            </div>
          </div>

          {/* 8. PRODUCT INFO SECTION (Figma Node #1206:4740) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-stretch pt-[48px] border-t border-[#DDE1E6]">
            {/* Left Image (Figma Node #1206:4741 - Stretches to match right text height) */}
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] rounded-[8px] overflow-hidden border border-[#DDE1E6] shadow-xs">
              <Image
                src="/images/industries/food/product_info.png"
                alt="Màng co PE Shrink Film"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Content Frame (Figma Node #1206:4742) */}
            <div className="space-y-[32px] flex flex-col justify-between">
              <div className="space-y-[16px]">
                <h3 className="text-[26px] sm:text-[36px] lg:text-[42px] lg:leading-[46px] font-bold text-[#21272A] tracking-tight">
                  MÀNG CO PE - SHRINK FILM
                </h3>
                <div className="text-[16px] lg:text-[18px] leading-[28px] text-[#212529] font-normal space-y-[16px]">
                  <p>
                    {isVi ? 'Màng co PE (Shrink Film) là vật liệu bao bì nhiệt co chuyên dụng, được sản xuất từ nhựa Polyethylene (PE) nguyên sinh, dùng để bọc kín và bảo vệ sản phẩm bằng phương pháp co nhiệt. Khi đi qua đường hầm nhiệt ở 150–200°C, màng co đều và ôm sát bề mặt sản phẩm, tạo lớp bảo vệ chống bụi, chống ẩm, chống trầy xước và nâng cao tính thẩm mỹ cho hàng hóa.' : 'PE Shrink Film is specialized heat shrink packaging material made from virgin Polyethylene.'}
                  </p>
                  <p>
                    {isVi ? 'ULink Industries ứng dụng công nghệ đùn thổi đa lớp (multi-layer blown film extrusion) kết hợp hệ thống kéo giãn hai chiều, cho phép kiểm soát chính xác tỷ lệ co ngang và co dọc (tối đa 70–80%). Dây chuyền tự động hóa toàn phần với hệ điều khiển PLC–HMI, cảm biến đo độ dày trực tuyến và hệ thống làm mát đồng đều, đảm bảo sản phẩm đạt độ dày đồng nhất từ 15–80 micron, độ trong suốt cao và khả năng co nhiệt ổn định.' : 'ULink Industries applies multi-layer blown film extrusion with PLC-HMI control.'}
                  </p>
                  <p>
                    {isVi ? 'Ứng dụng rộng rãi trong đóng gói chai lọ, hộp mỹ phẩm, thực phẩm, dược phẩm, linh kiện điện tử và vật liệu xây dựng. Sản phẩm đáp ứng tiêu chuẩn an toàn thực phẩm, thân thiện môi trường và có thể tái chế hoàn toàn.' : 'Widely applicable in bottling, cosmetics, food, pharma, and electronics.'}
                  </p>
                </div>
              </div>

              {/* Action Button (Figma Node #1206:4745 - Height 56px) */}
              <div>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-[48px] sm:h-[56px] items-center justify-center px-6 sm:px-[32px] rounded-[3px] bg-[#1769E2] hover:bg-[#1257BD] text-white font-semibold text-[16px] sm:text-[18px] lg:text-[20px] transition-colors"
                >
                  {isVi ? 'Tìm hiểu thêm' : 'Learn More'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ENTERPRISE CUSTOM SOLUTIONS SECTION (Figma Node #1206:4756) */}
      <section className="py-16 lg:py-[80px] bg-white border-t border-[#DDE1E6]">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-stretch">
            {/* Left Content (Figma Node #I1206:4756;168:1782) */}
            <div className="space-y-[32px] flex flex-col justify-between">
              <div className="space-y-[16px]">
                <h2 className="text-[26px] sm:text-[40px] lg:text-[48px] lg:leading-[56px] font-bold text-[#212529] tracking-[-0.0208em]">
                  {isVi ? 'Giải pháp thiết kế riêng cho Doanh nghiệp' : 'Custom Tailored Enterprise Solutions'}
                </h2>
                <p className="text-[16px] lg:text-[18px] leading-[28px] text-[#212529] font-normal">
                  {isVi
                    ? 'Giải pháp đóng gói thông minh dành riêng cho Doanh nghiệp, giúp tối ưu chi phí vật liệu, giảm thiểu hao hụt và tự động hóa quy trình đóng gói theo quy mô đơn hàng. Tích hợp dễ dàng với hệ thống quản lý kho vận hiện có, đảm bảo vận hành liền mạch và tiết kiệm lên đến 30% chi phí logistics.'
                    : 'Smart packaging solutions tailored for enterprises, optimizing material costs, minimizing loss, and cutting logistics costs by up to 30%.'}
                </p>
              </div>

              {/* Action Button (Figma Node #I1206:4756;195:3770 - Height 56px) */}
              <div>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-[48px] sm:h-[56px] items-center justify-center px-6 sm:px-[32px] rounded-[3px] bg-[#1769E2] hover:bg-[#1257BD] text-white font-semibold text-[16px] sm:text-[18px] lg:text-[20px] transition-colors"
                >
                  {isVi ? 'Kết nối với Chuyên gia' : 'Connect with an Expert'}
                </Link>
              </div>
            </div>

            {/* Right Image (Figma Node #I1206:4756;168:1781) */}
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] rounded-[8px] overflow-hidden border border-[#DDE1E6] shadow-xs">
              <Image
                src="/images/industries/food/custom_solution.png"
                alt="Giải pháp Doanh nghiệp"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. HUB HÀ NAM SHOWCASE SECTION (Figma Node #1206:4773) */}
      <section className="py-16 lg:py-[80px] bg-white border-t border-[#DDE1E6]">
        <div className="page-container flex flex-col items-center text-center space-y-[48px]">
          {/* Section Text Frame (Figma Node #I1206:4773;269:8715 - Width 900px) */}
          <div className="space-y-[16px] max-w-[900px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] lg:leading-[56px] font-bold text-[#1769E2] tracking-[-0.0208em] uppercase">
              HUB HÀ NAM
            </h2>
            <p className="text-[16px] lg:text-[18px] leading-[28px] text-[#21272A] font-normal">
              {isVi
                ? 'Trung tâm phân phối và sản xuất các sản phẩm Bao bì và vật tư phòng sạch cho Doanh nghiệp. Chúng tôi cung cấp giải pháp đóng gói toàn diện, vật tư phòng sạch đạt chuẩn quốc tế, đáp ứng nhu cầu sản xuất công nghiệp với chất lượng cao và giá cả cạnh tranh.'
                : 'Distribution and manufacturing hub for Packaging and Cleanroom products for enterprises. International quality standards with competitive pricing.'}
            </p>
          </div>

          {/* Large Image Frame (Figma Node #I1206:4773;269:8914 - 900x580px, rounded 3px) */}
          <div className="relative w-full max-w-[900px] aspect-[900/580] rounded-[3px] overflow-hidden border border-[#DDE1E6] shadow-xs">
            <Image
              src="/images/industries/food/hub_hanam.png"
              alt="Hub Hà Nam ULink"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 11. WHY CHOOSE ULINK (THẾ MẠNH CHÚNG TÔI) (Figma Node #1119:10587) */}
      <section className="py-16 lg:py-[80px] bg-[#F2F4F8] border-t border-[#DCE0E5]">
        <div className="page-container space-y-[40px]">
          {/* Section Header (Figma Node #1119:10588) */}
          <div className="space-y-[12px] text-center max-w-3xl mx-auto">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-[#1769E2] block">
              {isVi ? 'THẾ MẠNH CỦA CHÚNG TÔI' : 'OUR STRENGTHS'}
            </span>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#1D2A49] tracking-[-0.0158em]">
              {isVi ? 'Năng lực công nghệ & Cung ứng thực tế' : 'Technology Capacity & Practical Supply'}
            </h2>
          </div>

          {/* 4 Feature Cards Row (Figma Node #1119:10591 - Gap 16px, Padding 24px, Rounded 3px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] items-stretch">
            {/* Feature 1 */}
            <div className="bg-white p-[24px] rounded-[3px] border border-[#DCE0E5] space-y-[10px] min-h-[160px] flex flex-col justify-center shadow-2xs">
              <Award className="h-[32px] w-[32px] text-[#1769E2] shrink-0" />
              <h4 className="text-[16px] font-bold text-[#212529]">
                {isVi ? 'Công Nghệ Sản Xuất Tiên Tiến' : 'Advanced Production Tech'}
              </h4>
              <p className="text-[14px] font-normal text-[#495057] leading-[20px]">
                {isVi ? 'Dây chuyền sản xuất tự động với máy móc châu Âu, đảm bảo chính xác tuyệt đối trong gia công và lắp ráp.' : 'Automated production line with European machinery.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-[24px] rounded-[3px] border border-[#DCE0E5] space-y-[10px] min-h-[160px] flex flex-col justify-center shadow-2xs">
              <Users className="h-[32px] w-[32px] text-[#1769E2] shrink-0" />
              <h4 className="text-[16px] font-bold text-[#212529]">
                {isVi ? 'Kiểm Soát Chất Lượng Nghiêm Ngặt' : 'Strict Quality Control'}
              </h4>
              <p className="text-[14px] font-normal text-[#495057] leading-[20px]">
                {isVi ? 'Áp dụng QC đa tầng theo ISO 9001:2015, kiểm tra 100% sản phẩm trước xuất xưởng bằng thiết bị chuyên dụng.' : 'Multi-tier QC under ISO 9001:2015, 100% testing.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-[24px] rounded-[3px] border border-[#DCE0E5] space-y-[10px] min-h-[160px] flex flex-col justify-center shadow-2xs">
              <Activity className="h-[32px] w-[32px] text-[#1769E2] shrink-0" />
              <h4 className="text-[16px] font-bold text-[#212529]">
                {isVi ? 'Năng Lực Kỹ Thuật Chuyên Sâu' : 'Deep Technical Expertise'}
              </h4>
              <p className="text-[14px] font-normal text-[#495057] leading-[20px]">
                {isVi ? 'Đội ngũ kỹ sư R&D kinh nghiệm, dùng mô phỏng 3D để tối ưu thiết kế trước sản xuất hàng loạt.' : 'Experienced R&D engineers using 3D simulation.'}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-[24px] rounded-[3px] border border-[#DCE0E5] space-y-[10px] min-h-[160px] flex flex-col justify-center shadow-2xs">
              <Settings className="h-[32px] w-[32px] text-[#1769E2] shrink-0" />
              <h4 className="text-[16px] font-bold text-[#212529]">
                {isVi ? 'Giải Pháp Sản Xuất Tùy Chỉnh' : 'Customized Solutions'}
              </h4>
              <p className="text-[14px] font-normal text-[#495057] leading-[20px]">
                {isVi ? 'Sản xuất theo yêu cầu riêng của khách hàng — từ vật liệu, kích thước đến thông số kỹ thuật phù hợp từng ngành.' : 'Customized manufacturing tailored to clients.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. USE CASES SECTION (Figma Node #1217:4896) */}
      <div id="cases">
        <IndustryCasesSection industryData={industryData} locale={locale} translations={translations} />
      </div>

      {/* 13. PARTNERS LOGOS */}
      <section className="py-6 bg-white border-t border-[#DDE1E6]">
        <PartnersLogosOnly
          title={isVi ? 'HƠN 300 DOANH NGHIỆP F&B VÀ FDI TIN DÙNG GIẢI PHÁP CỦA ULINK INDUSTRIES' : 'OVER 300 F&B & FDI ENTERPRISES TRUST ULINK INDUSTRIES'}
        />
      </section>

      {/* 14. CTA BANNER (Figma Node #1119:10610) */}
      <div id="contact-section">
        <IndustryCtaBanner
          locale={locale}
          industryName={industryData.name}
          title={isVi ? 'Giải pháp đóng gói thực phẩm toàn diện' : 'Comprehensive Food Packaging Solutions'}
          subtitle={isVi
            ? 'Từ bao bì dạng túi, hộp, khay, đến chai lọ và lon — ULINK Industries cung cấp hệ thống đóng gói trọn bộ cho các sản phẩm thực phẩm: thực phẩm khô, đông lạnh, chế biến sẵn, đồ uống, gia vị và nông sản. Đội ngũ kỹ sư của chúng tôi tư vấn giải pháp phù hợp nhất với từng loại bao bì và quy trình sản xuất của bạn.'
            : 'From bags, boxes, trays to bottles and cans — ULINK Industries provides complete packaging systems.'}
        />
      </div>

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-500/20">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-[14px] font-semibold">
            {isVi ? 'Tài liệu đang chờ cập nhật' : 'The document is pending update'}
          </span>
        </div>
      )}
    </div>
  );
}

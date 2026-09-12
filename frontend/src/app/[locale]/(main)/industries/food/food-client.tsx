'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  AlertCircle,
  FileDown,
  Download,
  ChevronRight,
  Cpu,
  Activity,
  Utensils,
  ShieldCheck,
  Settings,
  Globe,
  Zap,
  Sparkles,
  Truck,
  CheckCircle2,
  Factory,
  Package,
  User,
  Clock,
  PhoneCall
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ASSETS } from '@/lib/assets';
import { IndustryData } from '@/components/industries/types';
import { IndustryValueProps } from '@/components/industries/industry-value-props';
import { PartnersLogosOnly } from '@/components/home/partners-logos-only';

interface FoodClientProps {
  industryData: IndustryData;
  products: any[];
  locale: string;
  currentSlug: string;
  translations: Record<string, string>;
}

// Map icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  Activity,
  Utensils,
  ShieldCheck,
  Settings,
  Globe,
  Zap,
  Sparkles,
  Truck,
  CheckCircle2,
  Factory,
  Package,
  User
};

function getCategoryBullets(catName: string, locale: string): string[] {
  const nameLower = catName.toLowerCase();
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  if (nameLower.includes('túi pe')) {
    return isVi
      ? ['Chống tĩnh điện', 'Đa kích thước']
      : isJa
        ? ['帯電防止仕様', '豊富なサイズ展開']
        : ['Anti-static compliance', 'Multiple dimensions available'];
  }
  if (nameLower.includes('zip') || nameLower.includes('túi zip')) {
    return isVi
      ? ['Tiêu chuẩn ESD', 'Trong suốt dễ nhận diện']
      : isJa
        ? ['ESD規格適合', '透明で中身が見えやすい']
        : ['ESD standard compliant', 'Transparent for easy identification'];
  }
  if (nameLower.includes('quần áo') || nameLower.includes('trang phục') || nameLower.includes('wear') || nameLower.includes('suit')) {
    return isVi
      ? ['Vải sợi chống tĩnh điện mật độ cao', 'Thiết kế thoải mái, không xơ vải']
      : isJa
        ? ['高密度帯電防止生地', '発塵のない快適なデザイン']
        : ['High-density anti-static fabric', 'Comfortable, lint-free design'];
  }
  if (nameLower.includes('găng tay') || nameLower.includes('gloves')) {
    return isVi
      ? ['Chứng nhận không bột chống dị ứng', 'Độ nhạy xúc giác cực cao']
      : isJa
        ? ['アレルギー防止無粉証明', '極めて高い触覚感度']
        : ['Powder-free anti-allergy certified', 'Ultra-high tactile sensitivity'];
  }
  if (nameLower.includes('khẩu trang') || nameLower.includes('mask')) {
    return isVi
      ? ['Màng lọc khuẩn hiệu suất cao', 'Thiết kế ôm khít, thông thoáng', 'Tiệt trùng và đóng gói riêng biệt']
      : isJa
        ? ['高効率細菌ろ過フィルター', 'フィット感が高く通気性に優れる', '個別滅菌パック包装']
        : ['High-efficiency bacterial filter', 'Snug fit with high breathability', 'Individually sterilized & packed'];
  }
  if (nameLower.includes('thảm') || nameLower.includes('mat')) {
    return isVi
      ? ['30 - 60 lớp bóc tiện lợi', 'Keo dính giữ chặt, không trơn trượt']
      : isJa
        ? ['30〜60層の剥離タイプ', '強力な粘着性で滑らない']
        : ['30 - 60 peelable layers', 'Strong adhesive non-slip grip'];
  }
  if (nameLower.includes('khăn') || nameLower.includes('wiper') || nameLower.includes('lau')) {
    return isVi
      ? ['Sợi microfiber siêu mịn, không để lại sợi', 'Phù hợp phòng sạch Class ISO 4-8']
      : isJa
        ? ['超極細マイクロファイバー、毛羽立ちゼロ', 'ISO Class 4-8クリーンルーム対応']
        : ['Ultra-fine microfiber, zero lint', 'Suitable for ISO Class 4-8 cleanrooms'];
  }

  return isVi
    ? ['Đạt tiêu chuẩn an toàn kỹ thuật cao', 'Đầy đủ chứng nhận chất lượng CO/CQ', 'Tối ưu hóa chi phí vận hành cho nhà máy']
    : isJa
      ? ['高度な技術安全基準に準拠', 'CO/CQ品質証明書を完備', '工場の運用コストを最適化']
      : ['Complies with high safety standards', 'Complete quality CO/CQ certification', 'Optimizes factory operational costs'];
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

  const tabs = [
    { id: 'overview', label: translations.overview },
    { id: 'cleanroom', label: translations.cleanroomSol },
    { id: 'packaging', label: translations.packagingSol },
    { id: 'standards', label: industryData.standardsTitle },
    { id: 'cases', label: translations.cases }
  ];

  const displayCleanroomItems = industryData.cleanroomCategories.map((cat) => ({
    name: cat.name,
    desc: (cat as any).desc || '',
    image: cat.image,
    href: `/solutions/listProduct?category=${cat.slug || 'cleanroom-consumables'}`,
    bullets: getCategoryBullets(cat.name, locale)
  }));

  const displayPackagingItems = industryData.packagingCategories.map((cat) => ({
    name: cat.name,
    desc: (cat as any).desc || '',
    image: cat.image,
    href: `/solutions/listProduct?category=${cat.slug || 'industrial-packaging'}`,
    bullets: getCategoryBullets(cat.name, locale)
  }));

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
  const currentBreadcrumb = industryData.name;
  const industryCategoryName = isVi ? 'Ngành nghề' : isJa ? '業界別' : 'Industries';

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative w-full overflow-hidden bg-slate-950 flex flex-col justify-center min-h-[460px] lg:min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={industryData.bannerImage}
            alt={industryData.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="page-container z-20 pt-28 pb-16 lg:pt-32 lg:pb-20 relative flex flex-col items-start justify-center h-full">
          <nav className="flex items-center gap-2 text-[13px] text-white/70 font-semibold mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              {translations.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            <Link href="/industries" className="hover:text-white transition-colors">
              {industryCategoryName}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            <span className="text-white font-bold">{currentBreadcrumb}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-white">
              {industryData.title}
            </h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] lg:leading-[28px] font-normal text-white/95 max-w-3xl">
              {industryData.description}
            </p>
          </div>

          <div className="mt-8">
            <Link
              href={industryData.catalogue.url}
              onClick={handleCatalogueClick}
              className="inline-flex h-12 items-center justify-center gap-2.5 border border-white bg-transparent hover:bg-white hover:text-[#141414] text-white font-bold text-[14px] leading-none px-6 py-3 transition-all duration-300 rounded-[3px] shadow-sm"
            >
              <Download className="h-4.5 w-4.5" />
              {isVi ? 'Tải hồ sơ năng lực' : isJa ? '機能プロファイルをダウンロード' : 'Download Capability Profile'}
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING VALUE CARDS */}
      <IndustryValueProps valueProps={industryData.valueProps} />

      {/* STICKY TAB NAV */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#DDE1E6] transition-all duration-300 shadow-2xs backdrop-blur-md">
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

      {/* SECTION 2: OVERVIEW & WHY CHOOSE ULINK */}
      <section id="overview" className="scroll-mt-16 py-12 lg:py-20 w-full bg-white">
        <div className="page-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
                {isVi ? 'TỔNG QUAN GIẢI PHÁP' : isJa ? 'ソリューション概要' : 'SOLUTION OVERVIEW'}
              </span>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
                {isVi ? 'Giải pháp Toàn diện cho Chuỗi Sản xuất F&B' : isJa ? 'F&B生産チェーン向け総合ソリューション' : 'Comprehensive Solution for F&B Production Chain'}
              </h2>
              <div className="text-[15px] lg:text-[16px] leading-[24px] lg:leading-[26px] text-[#495057] font-normal space-y-4 pt-2">
                <p>
                  {isVi
                    ? 'Trong ngành chế biến Thực phẩm và Đồ uống (F&B), việc duy trì và tuân thủ các quy định khắt khe về an toàn thực phẩm như HACCP và ISO 22000 là yếu tố sống còn quyết định sự uy tín thương hiệu. Mọi quy trình từ chuẩn bị nguyên liệu, chế biến, chiết rót đến đóng gói đều yêu cầu các tiêu chuẩn cơ lý và vệ sinh ở mức tối đa.'
                    : 'In the Food & Beverage (F&B) processing industry, maintaining and complying with strict food safety regulations like HACCP and ISO 22000 is vital for brand reputation. Every process from raw preparation, processing, filling to packaging demands maximum physical and hygiene standards.'}
                </p>
                <p>
                  {isVi
                    ? 'Các hệ thống thiết bị và giải pháp công nghiệp của ULink được tối ưu hóa nhằm đáp ứng tốt các yêu cầu về tẩy rửa liên tục (CIP/COP), chống bám bẩn vi sinh, kiểm soát nhiệt độ nghiêm ngặt và tự động hóa truy xuất nguồn gốc. Chúng tôi đồng hành cùng các nhà máy F&B nâng cao công suất, triệt tiêu hao hụt và nâng tầm chất lượng thành phẩm.'
                    : 'ULink equipment systems and industrial solutions are optimized for continuous cleaning (CIP/COP), microbial anti-fouling, temperature control, and automated traceability. We partner with F&B plants to boost capacity, eliminate waste, and elevate finished product quality.'}
                </p>
              </div>
            </div>

            {industryData.overviewImage && (
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-[16px] overflow-hidden mt-6 shadow-sm border border-slate-100">
                <Image
                  src={industryData.overviewImage}
                  alt={industryData.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-[16px] p-6 lg:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <h3 className="text-[22px] lg:text-[26px] font-bold text-[#0F172A] tracking-tight">
                  {industryData.whyUsTitle}
                </h3>
              </div>
              <div className="space-y-5">
                {(industryData.whyUsItems || [
                  { title: industryData.whyUsList[0] || 'Chứng nhận HACCP & ISO 22000', desc: 'Đạt chuẩn vệ sinh an toàn thực phẩm nghiêm ngặt nhất.', iconName: 'ShieldCheck' },
                  { title: industryData.whyUsList[1] || 'Năng lực cung ứng lớn', desc: 'Hệ thống kho vận chuyên dụng bảo quản hàng tối ưu.', iconName: 'Package' },
                  { title: industryData.whyUsList[2] || 'Giao nhận thần tốc', desc: 'Đảm bảo tiến độ sản xuất không ngắt quãng.', iconName: 'Truck' },
                  { title: industryData.whyUsList[3] || 'Tư vấn kỹ thuật F&B', desc: 'Chuyên gia đồng hành cùng dây chuyền chế biến của bạn.', iconName: 'User' }
                ]).map((item, idx) => {
                  const fallbackIcons = [ShieldCheck, Package, Truck, User];
                  const IconComp = (item.iconName && iconMap[item.iconName]) ? iconMap[item.iconName] : fallbackIcons[idx % fallbackIcons.length];

                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF2FF] text-[#1769E2] mt-0.5">
                        <IconComp className="h-5 w-5 stroke-[2]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[15px] lg:text-[16px] font-bold text-[#0F172A] leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[13px] lg:text-[14px] text-[#64748B] font-normal leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#E2E8F0] pt-6 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF2FF] text-[#1769E2]">
                  <PhoneCall className="h-5 w-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[13px] text-[#64748B] block font-normal">
                    {isVi ? 'Liên hệ tư vấn miễn phí' : isJa ? '無料相談のお問い合わせ' : 'Contact for free consultation'}
                  </span>
                  <span className="text-[16px] lg:text-[18px] font-bold text-[#0F172A] block">
                    Hotline: 0247 309 9899
                  </span>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full bg-[#1769E2] hover:bg-[#1257BD] text-white font-bold text-[15px] h-11 lg:h-12 inline-flex items-center justify-center transition-all shadow-xs rounded-[8px]"
              >
                {isVi ? 'Gọi ngay' : isJa ? '今すぐお電話' : 'Call Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CLEANROOM / HYGIENE SOLUTIONS */}
      <section id="cleanroom" className="scroll-mt-16 py-16 lg:py-20 w-full bg-white border-t border-[#DDE1E6]">
        <div className="page-container space-y-10">
          <div className="space-y-2 max-w-5xl">
            <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
              {translations.cleanroomSol}
            </span>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
              {isVi ? 'Nhóm sản phẩm chuyên dụng ngành Thực phẩm & Đồ uống' : isJa ? '食品・飲料業界向け専用製品グループ' : 'Specialized Products for Food & Beverage'}
            </h2>
            <p className="text-[15px] lg:text-[16px] leading-relaxed text-[#495057] font-normal">
              {industryData.cleanroomIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCleanroomItems.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[3px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <Link href={item.href} className="block relative aspect-square w-full bg-[#F9FAFB] border-b border-[#DDE1E6] overflow-hidden p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover p-2"
                    />
                  </Link>
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <Link href={item.href} className="block">
                        <h4 className="text-[16px] lg:text-[18px] font-bold text-[#141414] hover:text-[#1769E2] line-clamp-1 leading-snug transition-colors" title={item.name}>
                          {item.name}
                        </h4>
                      </Link>
                      {item.desc && (
                        <p className="text-[13px] text-[#64748B] font-normal leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      )}
                    </div>
                    <ul className="space-y-2 pt-1">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-[13px] lg:text-[14px] text-[#495057] font-normal leading-snug">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1769E2] shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <Link
                    href={item.href}
                    className="text-[14px] font-bold text-[#1769E2] hover:text-[#1257BD] inline-flex items-center gap-1.5 transition-colors"
                  >
                    {isVi ? 'Xem danh mục sản phẩm' : isJa ? '製品カテゴリを見る' : 'View product category'}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PACKAGING SOLUTIONS */}
      <section id="packaging" className="scroll-mt-16 py-16 lg:py-20 w-full bg-white border-t border-[#DDE1E6]">
        <div className="page-container space-y-10">
          <div className="space-y-2 max-w-5xl">
            <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
              {translations.packagingSol}
            </span>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
              {isVi ? 'Bao bì & Đóng gói thực phẩm' : isJa ? '食品用包装＆パッケージング' : 'Food Packaging & Wrapping'}
            </h2>
            <p className="text-[15px] lg:text-[16px] leading-relaxed text-[#495057] font-normal">
              {industryData.packagingIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPackagingItems.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[3px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <Link href={item.href} className="block relative aspect-square w-full bg-[#F9FAFB] border-b border-[#DDE1E6] overflow-hidden p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover p-2"
                    />
                  </Link>
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <Link href={item.href} className="block">
                        <h4 className="text-[16px] lg:text-[18px] font-bold text-[#141414] hover:text-[#1769E2] line-clamp-1 leading-snug transition-colors" title={item.name}>
                          {item.name}
                        </h4>
                      </Link>
                      {item.desc && (
                        <p className="text-[13px] text-[#64748B] font-normal leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      )}
                    </div>
                    <ul className="space-y-2 pt-1">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-[13px] lg:text-[14px] text-[#495057] font-normal leading-snug">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1769E2] shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <Link
                    href={item.href}
                    className="text-[14px] font-bold text-[#1769E2] hover:text-[#1257BD] inline-flex items-center gap-1.5 transition-colors"
                  >
                    {isVi ? 'Xem danh mục sản phẩm' : isJa ? '製品カテゴリを見る' : 'View product category'}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: STANDARDS */}
      <section id="standards" className="scroll-mt-16 py-16 lg:py-20 w-full bg-[#F2F4F8] border-y border-[#DDE1E6]">
        <div className="page-container space-y-10">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
              {industryData.standardsTitle}
            </span>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
              {isVi ? 'Tiêu chuẩn chất lượng khắt khe nhất' : isJa ? '最も厳格な品質管理基準' : 'Strict Quality Standards'}
            </h2>
            <p className="text-[15px] lg:text-[16px] text-[#495057] font-normal leading-relaxed">
              {isVi
                ? `Tất cả sản phẩm dành cho ngành ${industryData.name} của ULink đều được kiểm định và đạt các tiêu chuẩn quốc tế uy tín nhất.`
                : isJa
                  ? `ULinkの${industryData.name}向け製品はすべて検査を受け、最も信頼性の高い国際基準に適合しています。`
                  : `All ULink products for ${industryData.name} are inspected and meet the most prestigious international standards.`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryData.standards.map((std, idx) => {
              const icons = [ShieldCheck, CheckCircle2, Package, User];
              const IconComp = icons[idx % icons.length];

              return (
                <div
                  key={idx}
                  className="bg-white border border-[#DDE1E6] rounded-[3px] p-6 space-y-4 flex flex-col justify-start hover:shadow-md transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF0F8] text-[#1769E2] border border-[#DBEAFE]">
                    <IconComp className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[18px] font-bold text-[#141414] leading-snug">
                      {std.name}
                    </h4>
                    <p className="text-[14px] text-[#495057] font-normal leading-[20px]">
                      {std.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: CASE STUDIES */}
      <section id="cases" className="scroll-mt-16 py-16 lg:py-20 w-full bg-white">
        <div className="page-container space-y-10">
          <div className="space-y-2 max-w-5xl">
            <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
              {translations.cases}
            </span>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
              {industryData.casesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industryData.cases.map((cs, idx) => {
              const badgeBg = (cs as any).badgeBg || (idx === 0 ? 'bg-[#DBEAFE]' : idx === 1 ? 'bg-[#DCFCE7]' : 'bg-[#FEF9C3]');
              const badgeText = (cs as any).badgeText || (idx === 0 ? 'text-[#1769E2]' : idx === 1 ? 'text-[#16A34A]' : 'text-[#CA8A04]');

              return (
                <div
                  key={idx}
                  className="group bg-white border border-[#DDE1E6] rounded-[3px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="relative aspect-[16/10] w-full bg-[#F9FAFB] overflow-hidden border-b border-[#DDE1E6]">
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-3 flex flex-col justify-between flex-1">
                      <div className="space-y-2">
                        <div>
                          <span className={`inline-block px-2.5 py-1 rounded-[4px] text-[12px] font-semibold leading-none ${badgeBg} ${badgeText}`}>
                            {cs.badge}
                          </span>
                        </div>
                        <h4 className="text-[18px] font-semibold text-[#141414] line-clamp-2 leading-snug group-hover:text-[#1769E2] transition-colors">
                          {cs.title}
                        </h4>
                        <p className="text-[14px] text-[#495057] font-normal leading-[20px]">
                          {cs.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/resources"
                          className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#1769E2] hover:text-[#1257BD] transition-colors"
                        >
                          {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read more'}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRAND PARTNERS */}
      <PartnersLogosOnly />

      {/* BOTTOM CTA BANNER */}
      <section className="w-full bg-[#1769E2] text-white py-16 lg:py-20">
        <div className="page-container flex flex-col items-center text-center space-y-6 max-w-6xl mx-auto">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] xl:text-[38px] lg:leading-[46px] font-bold text-white tracking-tight whitespace-normal">
            {isVi ? 'Giải pháp đóng gói thực phẩm toàn diện' : isJa ? '包括的な食品包装ソリューション' : 'Comprehensive Food Packaging Solutions'}
          </h2>
          <p className="text-[16px] lg:text-[18px] leading-relaxed text-white/90 max-w-5xl font-normal">
            {isVi
              ? 'Từ bao bì dạng túi, hộp, khay, đến chai lọ và lon — ULINK Industries cung cấp hệ thống đóng gói trọn bộ cho các sản phẩm thực phẩm: thực phẩm khô, đông lạnh, chế biến sẵn, đồ uống, gia vị và nông sản. Đội ngũ kỹ sư của chúng tôi tư vấn giải pháp phù hợp nhất với từng loại bao bì và quy trình sản xuất của bạn.'
              : isJa
                ? '袋、箱、トレイからボトル、缶まで — ULINK Industriesは、乾燥食品、冷凍食品、調理済み食品、飲料、調味料、農産物など、あらゆる食品にフルセットの包装システムを提供します。'
                : 'From bags, boxes, trays to bottles and cans — ULINK Industries provides complete packaging systems for food products: dry food, frozen, processed meals, beverages, spices, and agricultural produce.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/quick-order"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center px-8 rounded-[3px] bg-white text-[#1769E2] font-bold text-[15px] sm:text-[16px] shadow-sm hover:bg-slate-100 transition-all duration-200"
            >
              {isVi ? 'Nhận Khảo Sát & Báo Giá Miễn Phí' : isJa ? '無料現地調査・見積もりを取得' : 'Get Free Survey & Quote'}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center px-8 rounded-[3px] border-[1.5px] border-white bg-transparent text-white font-bold text-[15px] sm:text-[16px] hover:bg-white/10 transition-all duration-200"
            >
              {isVi ? 'Trò Chuyện Với Kỹ Sư F&B' : isJa ? 'F&Bエンジニアと相談' : 'Talk with F&B Engineer'}
            </Link>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
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

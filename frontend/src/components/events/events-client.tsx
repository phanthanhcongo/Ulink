'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Calendar, Clock, MapPin, Ticket, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UPCOMING_EVENTS } from '@/components/resources/mock-data';
import { ResourcesNews } from '@/components/home';

const L = {
  vi: {
    heroTitle: 'Chương trình sự kiện B2B',
    heroSubTitle: 'Business Networking',
    heroDesc: 'ULink Industries kết nối doanh nghiệp Việt Nam với mạng lưới đối tác quốc tế thông qua các sự kiện networking chuyên sâu, hội thảo ngành và cơ hội giao thương trực tiếp — giúp mở rộng thị trường và thúc đẩy hợp tác B2B bền vững.',
    heroCta: 'Đăng ký tham dự',
    eventLabel: 'Sự kiện',
    registerBtn: 'Đăng ký ngay',
    newsTitle: 'Tin tức thị trường',
    newsSubTitle: 'Cập nhật xu hướng và diễn biến mới nhất',
    newsCta: 'Xem tất cả',
    readMore: 'Đọc tiếp',
    prev: 'Trước',
    next: 'Sau'
  },
  en: {
    heroTitle: 'B2B Event Programs',
    heroSubTitle: 'Business Networking',
    heroDesc: 'ULink Industries connects Vietnamese businesses with international partner networks through in-depth networking events, industry conferences, and direct trade opportunities — helping to expand markets and promote sustainable B2B collaboration.',
    heroCta: 'Register to Join',
    eventLabel: 'Event',
    registerBtn: 'Register Now',
    newsTitle: 'Market News',
    newsSubTitle: 'Update latest trends and developments',
    newsCta: 'See All',
    readMore: 'Read More',
    prev: 'Prev',
    next: 'Next'
  },
  ja: {
    heroTitle: 'B2Bイベントプログラム',
    heroSubTitle: 'ビジネスネットワーキング',
    heroDesc: 'ULink Industriesは、詳細なネットワーキングイベント、業界カンファレンス、直接的な貿易機会を通じてベトナム企業と国際パートナーネットワークを接続し、市場の拡大と持続可能なB2Bコラボレーション durable の促進を支援します。',
    heroCta: '参加登録する',
    eventLabel: 'イベント',
    registerBtn: '今すぐ登録',
    newsTitle: '市場ニュース',
    newsSubTitle: '最新のトレンドと動向を更新',
    newsCta: 'すべて見る',
    readMore: '詳細を見る',
    prev: '前へ',
    next: '次へ'
  }
};

const NEWS_ARTICLES = [
  {
    category: { vi: 'Tin trong nước', en: 'Domestic News', ja: '国内ニュース' },
    title: {
      vi: 'Thị trường hạt nhựa PVC biến động mạnh đầu năm',
      en: 'PVC Plastic Resin Market Fluctuate Heavily Early in the Year',
      ja: '年初のPVC樹脂市場の激しい変動'
    },
    desc: {
      vi: 'Phân tích nguyên nhân và ảnh hưởng của sự thay đổi giá nguyên liệu đến doanh nghiệp sản xuất...',
      en: 'Analyzing causes and impacts of raw material price changes on manufacturing companies...',
      ja: '原材料価格の変動が製造企業に与える原因と影響を分析する...'
    },
    author: {
      name: { vi: 'Minh Huy', en: 'Minh Huy', ja: 'ミン・フイ' },
      role: { vi: 'Chuyên gia phân tích', en: 'Analyst Specialist', ja: 'アナリスト専門家' }
    },
    image: '/images/resources/news/market-report.webp',
    date: '20/08/2026'
  },
  {
    category: { vi: 'Tin quốc tế', en: 'International News', ja: '国際ニュース' },
    title: {
      vi: 'Xu hướng tự động hóa trong logistics năm 2024',
      en: 'Logistics Automation Trends in 2024',
      ja: '2024年の物流自動化トレンド'
    },
    desc: {
      vi: 'Các công nghệ mới đang định hình tương lai của quản lý chuỗi cung ứng toàn cầu...',
      en: 'New technologies are shaping the future of global supply chain management...',
      ja: '新しい技術が世界のサプライチェーン管理の未来を形作っています...'
    },
    author: {
      name: { vi: 'Thu Hằng', en: 'Thu Hang', ja: 'トゥ・ハン' },
      role: { vi: 'Biên tập viên', en: 'Editor', ja: '編集者' }
    },
    image: '/images/resources/news/cleanroom-workers.webp',
    date: '18/08/2026'
  },
  {
    category: { vi: 'Tin tức sản xuất', en: 'Production News', ja: '生産ニュース' },
    title: {
      vi: 'Hãng tàu tăng phụ phí xếp dỡ tại cảng Việt Nam',
      en: 'Shipping Lines Increase Handling Surcharges at Vietnamese Ports',
      ja: '船会社がベトナム港での荷役付加料を引き上げ'
    },
    desc: {
      vi: 'Quyết định mới ảnh hưởng đến chi phí xuất nhập khẩu hàng hóa của các doanh nghiệp...',
      en: 'The new decision affects import-export costs of goods for businesses...',
      ja: '新しい decision は、企業の商品の輸出入コストに影響を与えます...'
    },
    author: {
      name: { vi: 'Hoàng Nam', en: 'Hoang Nam', ja: 'ホアン・ナム' },
      role: { vi: 'Phóng viên', en: 'Reporter', ja: '記者' }
    },
    image: '/images/resources/news/hvac-system.webp',
    date: '15/08/2026'
  },
  {
    category: { vi: 'Tin công nghệ', en: 'Tech News', ja: '技術ニュース' },
    title: {
      vi: 'Ứng dụng AI trong quản lý chuỗi cung ứng',
      en: 'Applying AI in Supply Chain Management',
      ja: 'サプライチェーン管理におけるAIの適用'
    },
    desc: {
      vi: 'Làm thế nào AI giúp doanh nghiệp dự báo nhu cầu chính xác hơn và giảm thiểu tồn kho...',
      en: 'How AI helps businesses accurately forecast demand and minimize inventory...',
      ja: 'AIが企業が需要を正確に予測し、在庫を最小限に抑えるのにどのように役立つか...'
    },
    author: {
      name: { vi: 'Anh Thư', en: 'Anh Thu', ja: 'アン・トゥー' },
      role: { vi: 'Chuyên viên công nghệ', en: 'Technology Specialist', ja: '技術専門家' }
    },
    image: '/images/resources/news/lab-equipment.webp',
    date: '12/08/2026'
  }
];

export function EventsClient() {
  const locale = useLocale() as 'vi' | 'en' | 'ja';
  const t = L[locale];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Split into 2 items per page to showcase working pagination

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return UPCOMING_EVENTS.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(UPCOMING_EVENTS.length / itemsPerPage);

  const handleScrollToEvents = () => {
    const listSection = document.getElementById('events-list-section');
    if (listSection) {
      listSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FAFCFF] pb-12 sm:pb-16 md:pb-24">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[620px] overflow-hidden">
        <Image
          src="/images/resources/events/event (2).png"
          alt="B2B Business Networking Event"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="page-container text-left">
            <div className="bg-[#0000008C] p-4 sm:p-6 md:p-10 lg:p-12 max-w-2xl rounded-[3px] shadow-2xl border border-white/20 backdrop-blur-xs">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                {t.heroTitle}
                <span className="block mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {t.heroSubTitle}
                </span>
              </h1>
              <p className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal mb-4 sm:mb-6 md:mb-8">
                {t.heroDesc}
              </p>
              <button
                onClick={handleScrollToEvents}
                className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3.5 bg-[#1769E2] hover:bg-[#1257BD] text-white font-bold text-xs sm:text-sm md:text-base rounded-[3px] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
              >
                {t.heroCta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div id="events-list-section" className="mx-auto max-w-[1200px] px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {paginatedEvents.map((event) => {
            const titleText = event.title[locale] || event.title.en;
            const descText = event.description?.[locale] || event.description?.en || '';
            const locationText = event.location[locale] || event.location.en;
            const priceText = event.price?.[locale] || event.price?.en || '';
            const badgeText = event.badge?.[locale] || event.badge?.en || t.eventLabel;

            // Extract detail URL slug: extract 'ev-001' from link '/events/ev-001/register'
            const detailSlug = event.id.toLowerCase();
            const detailHref = `/resources/events/${detailSlug}`;

            return (
              <div
                key={event.id}
                className="group ui-card-hover flex flex-col lg:flex-row bg-white border border-slate-100 rounded-[3px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Event Image */}
                <div className="relative w-full lg:w-[280px] xl:w-[380px] aspect-[16/10] lg:aspect-auto overflow-hidden shrink-0">
                  <Image
                    src={event.images && event.images[1] ? event.images[1] : event.image}
                    alt={titleText}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 380px"
                    className="object-cover"
                  />
                  {/* Overlay Date Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-blue-600 text-white text-xs sm:text-caption-responsive font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-[3px] shadow-md z-10">
                    {event.date}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-4 sm:p-5 md:p-7 lg:p-8 xl:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Category */}
                    <span className="inline-block text-xs sm:text-caption-responsive font-bold text-blue-600 uppercase tracking-widest mb-2 sm:mb-3">
                      {badgeText}
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0E2142] group-hover:text-blue-600 transition-colors duration-300 leading-snug line-clamp-2 sm:line-clamp-none">
                      <Link href={detailHref} className="hover:underline">
                        {titleText}
                      </Link>
                    </h3>

                    {/* Description */}
                    {descText && (
                      <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-slate-500 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {descText}
                      </p>
                    )}

                    {/* Metadata details */}
                    <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 border-t border-slate-100 pt-4 sm:pt-5 md:pt-6">
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-caption-responsive text-slate-600">
                        <Calendar className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700 truncate">
                          {event.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-caption-responsive text-slate-600">
                        <Clock className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700 truncate">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-caption-responsive text-slate-600 sm:col-span-2">
                        <MapPin className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700 truncate">
                          {locationText}
                        </span>
                      </div>
                      {priceText && (
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-caption-responsive text-slate-600 sm:col-span-2">
                          <Ticket className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-blue-600">
                            {priceText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Register CTA Button */}
                  <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8">
                    <Link
                      href={detailHref}
                      className="inline-flex items-center justify-center w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-[#1769E2] hover:bg-[#EBF3FE] text-[#1769E2] font-bold rounded-[3px] text-xs sm:text-caption-responsive md:text-sm transition-all duration-300 shadow-xs group-hover:bg-[#1769E2] group-hover:text-white"
                    >
                      {t.registerBtn}
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 sm:h-10 px-2 sm:px-4 rounded-[3px] border border-slate-200 text-xs sm:text-caption-responsive font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 text-slate-700 bg-white"
            >
              <ArrowLeft className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              <span className="hidden sm:inline">{t.prev}</span>
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={cn(
                  'h-8 sm:h-10 w-8 sm:w-10 rounded-[3px] text-xs sm:text-caption-responsive font-bold transition-all cursor-pointer border',
                  currentPage === index + 1
                    ? 'bg-[#1769E2] border-[#1769E2] text-white shadow-md'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600 bg-white'
                )}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 sm:h-10 px-2 sm:px-4 rounded-[3px] border border-slate-200 text-xs sm:text-caption-responsive font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 text-slate-700 bg-white"
            >
              <span className="hidden sm:inline">{t.next}</span>
              <ArrowRight className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
            </button>
          </div>
        )}
      </div>
      <ResourcesNews />
    </div>
  );
}


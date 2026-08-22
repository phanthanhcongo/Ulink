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
    <div className="w-full bg-[#FAFCFF] pb-24">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden">
        <Image
          src="/images/resources/events/event (2).png"
          alt="B2B Business Networking Event"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-left">
            <div className="bg-[#0000008C] p-8 sm:p-10 md:p-12 max-w-2xl rounded-[3px] shadow-2xl border border-white/20 backdrop-blur-xs">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight">
                {t.heroTitle}
                <span className="block mt-2 text-2xl sm:text-3xl lg:text-[38px] font-bold text-white">
                  {t.heroSubTitle}
                </span>
              </h1>
              <p className="mt-6 text-sm sm:text-base text-slate-200 leading-relaxed font-normal mb-8">
                {t.heroDesc}
              </p>
              <button
                onClick={handleScrollToEvents}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-[3px] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
              >
                {t.heroCta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div id="events-list-section" className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
        <div className="space-y-10">
          {paginatedEvents.map((event) => {
            const titleText = event.title[locale] || event.title.en;
            const descText = event.description?.[locale] || event.description?.en || '';
            const locationText = event.location[locale] || event.location.en;
            const priceText = event.price?.[locale] || event.price?.en || '';
            const badgeText = event.badge?.[locale] || event.badge?.en || t.eventLabel;

            // Extract detail URL slug: extract 'ev-001' from link '/events/ev-001/register'
            const detailSlug = event.id.toLowerCase();
            const detailHref = `/events/${detailSlug}`;

            return (
              <div
                key={event.id}
                className="flex flex-col lg:flex-row bg-white border border-slate-100 rounded-[3px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                {/* Event Image */}
                <div className="relative w-full lg:w-[420px] aspect-[16/10] lg:aspect-auto overflow-hidden shrink-0">
                  <Image
                    src={event.images && event.images[1] ? event.images[1] : event.image}
                    alt={titleText}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay Date Badge */}
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-[3px] shadow-md z-10">
                    {event.date}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Category */}
                    <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                      {badgeText}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0E2142] group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                      <Link href={detailHref} className="hover:underline">
                        {titleText}
                      </Link>
                    </h3>

                    {/* Description */}
                    {descText && (
                      <p className="mt-4 text-sm text-slate-500 font-normal leading-relaxed line-clamp-3">
                        {descText}
                      </p>
                    )}

                    {/* Metadata details */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                        <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700">
                          {event.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                        <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 sm:col-span-2">
                        <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700">
                          {locationText}
                        </span>
                      </div>
                      {priceText && (
                        <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 sm:col-span-2">
                          <Ticket className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-blue-600">
                            {priceText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Register CTA Button */}
                  <div className="mt-8">
                    <Link
                      href={detailHref}
                      className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 hover:bg-blue-50 text-blue-600 font-bold rounded-[3px] text-xs sm:text-sm transition-all duration-300 shadow-xs group-hover:bg-blue-600 group-hover:text-white"
                    >
                      {t.registerBtn}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-10 px-4 rounded-[3px] border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 text-slate-700 bg-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.prev}
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={cn(
                  'h-10 w-10 rounded-[3px] text-xs font-bold transition-all cursor-pointer border',
                  currentPage === index + 1
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600 bg-white'
                )}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-10 px-4 rounded-[3px] border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 text-slate-700 bg-white"
            >
              {t.next}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
      <ResourcesNews />
    </div>
  );
}

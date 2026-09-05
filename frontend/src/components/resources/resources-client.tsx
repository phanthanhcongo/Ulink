'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Calendar, FileText, MapPin, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

import { ResourceItem } from './types';
import { MOST_VIEWED_ARTICLES, TABS, UPCOMING_EVENTS, MOCK_RESOURCES } from './mock-data';
import { getResourceHref } from './resource-utils';
import { ResourceCard } from './resource-card';
import { EventCard } from './event-card';

export function ResourcesClient({
  initialResources = []
}: {
  initialResources?: ResourceItem[];
  directusUrl?: string;
} = {}) {
  const locale = useLocale() as 'vi' | 'en' | 'ja';

  const allAvailableResources = useMemo(() => {
    const combined = [...initialResources];

    MOCK_RESOURCES.forEach((mock) => {
      if (!combined.some((item) => item.id === mock.id)) {
        combined.push(mock);
      }
    });

    return combined;
  }, [initialResources]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  const filteredResources = useMemo(() => {
    let result = [...allAvailableResources];

    if (activeTab !== 'all') {
      result = result.filter((item) => item.category === activeTab);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title[locale].toLowerCase().includes(query) ||
          item.description[locale].toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    return result;
  }, [activeTab, searchQuery, allAvailableResources, locale]);

  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'guide':
        return 'bg-blue-500/10 text-blue-600 border border-blue-200';
      case 'standard':
        return 'bg-emerald-500/10 text-emerald-600 border border-emerald-200';
      case 'case-study':
        return 'bg-purple-500/10 text-purple-600 border border-purple-200';
      case 'news':
        return 'bg-rose-500/10 text-rose-600 border border-rose-200';
      case 'event':
        return 'bg-slate-900/10 text-slate-800 border border-slate-300';
      default:
        return 'bg-slate-500/10 text-slate-600 border border-slate-200';
    }
  };

  const L = {
    resources: { vi: 'Tài nguyên', en: 'Resources', ja: 'リソース' },
    bannerDesc: {
      vi: 'Cẩm nang kỹ thuật, cẩm nang ngành, hướng dẫn sử dụng, chứng chỉ tiêu chuẩn chất lượng.',
      en: 'Technical manuals, industry guides, usage instructions, quality standards and certificates.',
      ja: '技術マニュアル、業界ガイド、使用ガイド、品質基準と証明書。'
    },
    searchPlaceholder: {
      vi: 'Tìm kiếm tài liệu...',
      en: 'Search documents...',
      ja: '資料を検索...'
    },
    readDetails: { vi: 'Đọc chi tiết', en: 'Read details', ja: '詳細を見る' },
    popularTitle: { vi: 'Bài viết được quan tâm', en: 'Popular Articles', ja: '人気の記事' },
    noResults: {
      vi: 'Không tìm thấy tài liệu phù hợp',
      en: 'No matching articles found',
      ja: '該当する記事が見つかりません'
    },
    noResultsDesc: {
      vi: 'Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục tài liệu khác.',
      en: 'Try changing search keywords or selecting another category.',
      ja: '検索キーワードを変えるか、別のカテゴリを選んでください。'
    },
    mostViewed: {
      vi: 'Bài viết được xem nhiều',
      en: 'Most Viewed Articles',
      ja: 'よく読まれている記事'
    },
    upcomingEvents: {
      vi: 'Sự kiện sắp diễn ra',
      en: 'Upcoming Events',
      ja: '近日開催予定のイベント'
    },
    registerEvent: { vi: 'Đăng ký tham gia', en: 'Register', ja: '参加登録' },
    viewDetails: { vi: 'Xem chi tiết', en: 'View details', ja: '詳細を見る' },
    prev: { vi: 'Trước', en: 'Prev', ja: '前へ' },
    next: { vi: 'Sau', en: 'Next', ja: '次へ' },
    seeAll: { vi: 'Xem tất cả', en: 'See all', ja: 'すべて見る' }
  };

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      <div className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] mb-8 overflow-hidden">
        <Image
          src="/images/resources/news/banner.webp"
          alt="ULink Factory Plant"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="page-container text-left text-white">
            <div className="inline-block bg-slate-950/30 backdrop-blur-xs p-6 sm:p-8 border border-white/10 max-w-2xl rounded-[3px] shadow-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                {L.resources[locale]}
              </h1>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-semibold drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.4)]">
                {L.bannerDesc[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="resources-list-section" className="page-container">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer',
                    isActive
                      ? 'bg-[#0E2142] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
                  )}
                >
                  {tab.label[locale]}
                </div>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={L.searchPlaceholder[locale]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-11 pr-10 border border-slate-200 bg-white text-xs sm:text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 rounded-full placeholder:text-slate-400 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredResources.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 p-6 bg-card rounded-[3px]"
            >
              <FileText className="h-12 w-12 text-slate-400 mb-4 animate-pulse" />
              <h3 className="text-base font-bold text-slate-800">{L.noResults[locale]}</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1">
                {L.noResultsDesc[locale]}
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {paginatedResources.map((resource) => {
                if (resource.category === 'event') {
                  return <EventCard key={resource.id} event={resource} locale={locale} />;
                }
                return <ResourceCard key={resource.id} resource={resource} locale={locale} />;
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 px-4 rounded-[3px] border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {L.prev[locale]}
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={cn(
                  'h-9 w-9 rounded-[3px] text-xs font-semibold transition-colors cursor-pointer',
                  currentPage === index + 1
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
                )}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-9 px-4 rounded-[3px] border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {L.next[locale]}
            </button>
          </div>
        )}

        <div className="mt-20 pt-16 border-t border-slate-100">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{L.mostViewed[locale]}</h2>
            <button
              onClick={() => {
                setActiveTab('all');
                const element = document.getElementById('resources-list-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {L.seeAll[locale]}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOST_VIEWED_ARTICLES.map((art) => (
              <ResourceCard key={art.id} resource={art} locale={locale} />
            ))}
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-slate-100">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {L.upcomingEvents[locale]}
            </h2>
            <Link
              href="/resources/events"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
            >
              {L.seeAll[locale]}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



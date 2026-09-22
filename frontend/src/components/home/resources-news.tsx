'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckSquare,
  Shield,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { fetchMarketNews, type MarketNewsItem } from '@/lib/market-news';
import { NewsCard } from './news-card';
import { DocSection } from './doc-section';
import { SupportSection } from './support-section';
import { ComingSoonModal } from './coming-soon-modal';

export function ResourcesNews() {
  const t = useTranslations('home.resourcesSection');
  const locale = useLocale();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('');
  const newsRef = useRef<HTMLDivElement>(null);
  const [newsVisible, setNewsVisible] = useState(false);
  // Market-news items pulled live from Directus (category = 'market-news').
  // Empty until loaded → the hardcoded fallback below is shown meanwhile.
  const [dbNews, setDbNews] = useState<MarketNewsItem[]>([]);

  useEffect(() => {
    let active = true;
    fetchMarketNews(locale, 4).then((items) => {
      if (active && items.length) setDbNews(items);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  useEffect(() => {
    const el = newsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNewsVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDocClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setSelectedDocTitle(title);
    setShowComingSoon(true);
  };

  const docsData = [
    {
      num: 1,
      icon: ASSETS.home.docIcon1,
      category: t('doc1Category'),
      title: t('doc1Title'),
      meta: t('doc1Meta')
    },
    {
      num: 2,
      icon: ASSETS.home.docIcon2,
      category: t('doc2Category'),
      title: t('doc2Title'),
      meta: t('doc2Meta')
    },
    {
      num: 3,
      icon: ASSETS.home.docIcon3,
      category: t('doc3Category'),
      title: t('doc3Title'),
      meta: t('doc3Meta')
    },
    {
      num: 4,
      icon: ASSETS.home.docIcon4,
      category: t('doc4Category'),
      title: t('doc4Title'),
      meta: t('doc4Meta')
    }
  ];

  const newsData = [
    {
      slug: 'news-1',
      date: t('card1Date'),
      title: t('card1Title'),
      image: ASSETS.home.news1,
      category: t('doc1Category') || 'Catalogue',
      author: {
        name: t('card1AuthorName'),
        role: t('card1AuthorRole'),
        avatar: ASSETS.home.avatar2
      }
    },
    {
      slug: 'news-2',
      date: t('card2Date'),
      title: t('card2Title'),
      image: ASSETS.home.news2,
      category: t('doc2Category') || 'Tài liệu kỹ thuật',
      author: {
        name: t('card2AuthorName'),
        role: t('card2AuthorRole'),
        avatar: ASSETS.home.avatar4
      }
    },
    {
      slug: 'news-3',
      date: t('card3Date'),
      title: t('card3Title'),
      image: ASSETS.home.news3,
      category: t('doc1Category') || 'Catalogue',
      author: {
        name: t('card3AuthorName'),
        role: t('card3AuthorRole'),
        avatar: ASSETS.home.avatar1
      }
    },
    {
      slug: 'news-4',
      date: t('card4Date'),
      title: t('card4Title'),
      image: ASSETS.home.news4Eco,
      category: t('doc2Category') || 'Tài liệu kỹ thuật',
      author: {
        name: t('card4AuthorName'),
        role: t('card4AuthorRole'),
        avatar: ASSETS.home.avatar3
      }
    }
  ];

  // Prefer live DB market-news; fall back to the static i18n cards above.
  const displayCards = dbNews.length
    ? dbNews.map((n) => ({
        slug: n.slug,
        date: n.date,
        title: n.description ? `${n.title} - ${n.description}` : n.title,
        image: n.image,
        category: n.badge || t('doc1Category'),
        author: n.author
      }))
    : newsData;

  const supportData = [
    { num: 1, icon: CheckSquare, title: t('supp1Title'), desc: t('supp1Desc') },
    { num: 2, icon: Shield, title: t('supp2Title'), desc: t('supp2Desc') },
    { num: 3, icon: TrendingUp, title: t('supp3Title'), desc: t('supp3Desc') },
    { num: 4, icon: Zap, title: t('supp4Title'), desc: t('supp4Desc') }
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-8 lg:py-8 border-t border-slate-100">
      <div className="page-container">
        {/* ── 2. SUB-SECTION HEADER (TIN TỨC THỊ TRƯỜNG - 2 HÀNG BẰNG CỠ CHỮ) ── */}
        <div className="section-header">
          <span className="text-section-title text-blue-600 leading-tight block">
            {t('newsSectionTitle')}
          </span>
          <h2 className="text-section-title text-slate-900 leading-tight">
            {t('newsSectionSubTitle')}
          </h2>
        </div>

        {/* ── 3. 4 NEWS CARDS GRID ── */}
        <div ref={newsRef} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {displayCards.map((news, idx) => (
            <div
              key={news.slug}
              className={`transition-all duration-500 ${newsVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                } ${idx >= 3 ? 'lg:hidden' : ''}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <NewsCard
                slug={news.slug}
                date={news.date}
                title={news.title}
                image={news.image}
                category={news.category}
                author={news.author}
                readMoreText={t('readMore') || 'Đọc thêm'}
              />
            </div>
          ))}
        </div>

        {/* ── Centered View All News Button ── */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/resources"
            className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-[3px] border border-blue-600 bg-white px-6 text-body-regular text-blue-600 transition-all hover:bg-blue-50/50 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01]"
          >
            {t('viewMore') || 'Xem thêm'}
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

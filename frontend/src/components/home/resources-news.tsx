'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckSquare,
  Shield,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { NewsCard } from './news-card';
import { DocSection } from './doc-section';
import { SupportSection } from './support-section';
import { ComingSoonModal } from './coming-soon-modal';

export function ResourcesNews() {
  const t = useTranslations('home.resourcesSection');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('');
  const newsRef = useRef<HTMLDivElement>(null);
  const [newsVisible, setNewsVisible] = useState(false);

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
        name: 'Nguyễn Minh Tuấn',
        role: 'Trưởng phòng Đóng gói',
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
        name: 'Lê Quốc Hưng',
        role: 'Quản lý Kho vận',
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
        name: 'Trần Thị Hồng Nhung',
        role: 'Giám đốc Sản xuất',
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
        name: 'Phạm Thanh Sơn',
        role: 'Chuyên viên kỹ thuật',
        avatar: ASSETS.home.avatar3
      }
    }
  ];

  const supportData = [
    { num: 1, icon: CheckSquare, title: t('supp1Title'), desc: t('supp1Desc') },
    { num: 2, icon: Shield, title: t('supp2Title'), desc: t('supp2Desc') },
    { num: 3, icon: TrendingUp, title: t('supp3Title'), desc: t('supp3Desc') },
    { num: 4, icon: Zap, title: t('supp4Title'), desc: t('supp4Desc') }
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-4 pb-12 sm:px-8 lg:px-16 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20 xl:pt-10 xl:pb-24 overflow-hidden">

      {/* ── 2. SUB-SECTION HEADER (TIN TỨC THỊ TRƯỜNG - 2 HÀNG BẰNG CỠ CHỮ) ── */}
      <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-2">
        <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tracking-tight text-blue-600 leading-tight lg:leading-[36px] block">
          {t('newsSectionTitle')}
        </span>
        <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tracking-tight text-slate-900 leading-tight lg:leading-[36px]">
          {t('newsSectionSubTitle')}
        </h2>
      </div>

      {/* ── 3. 4 NEWS CARDS GRID ── */}
      <div ref={newsRef} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {newsData.map((news, idx) => (
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
          className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-[3px] border border-blue-600 bg-white px-6 text-sm lg:text-[16px] font-normal text-blue-600 transition-all hover:bg-blue-50/50 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-1 hover:scale-[1.02]"
        >
          {t('viewMore') || 'Xem thêm'}
          <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>


    </section>
  );
}

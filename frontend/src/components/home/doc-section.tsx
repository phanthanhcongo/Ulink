'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ASSETS } from '@/lib/assets';
import { DocCard } from './doc-card';
import { ComingSoonModal } from './coming-soon-modal';

export function DocSection() {
  const t = useTranslations('home.resourcesSection');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('');

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

  return (
    <section className="w-full  py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* ── 4. SUB-SECTION HEADER BAR (TÀI LIỆU & CATALOGUE) ── */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-1 rounded-full bg-blue-600" />
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {t('docsTitle')}
          </h3>
        </div>

        {/* ── 4 DOCUMENT CARDS GRID ── */}
        <div className="mt-8 grid grid-cols-1 gap-[1px] sm:grid-cols-2 sm:gap-[1px] lg:grid-cols-4 lg:gap-[1px]">
          {docsData.map((doc) => (
            <DocCard
              key={doc.num}
              category={doc.category}
              title={doc.title}
              meta={doc.meta}
              icon={doc.icon}
              onClick={(e) => handleDocClick(e, doc.title)}
            />
          ))}
        </div>
      </div>

      {/* ── COMING SOON MODAL DIALOG ── */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title={selectedDocTitle}
      />
    </section>
  );
}

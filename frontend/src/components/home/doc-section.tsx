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
      icon: '/images/icons/figma/_32-download0.svg',
      category: t('doc1Category'),
      title: t('doc1Title'),
      meta: t('doc1Meta')
    },
    {
      num: 2,
      icon: '/images/icons/figma/watson-health-32-save-series0.svg',
      category: t('doc2Category'),
      title: t('doc2Title'),
      meta: t('doc2Meta')
    },
    {
      num: 3,
      icon: '/images/icons/figma/_32-document-configuration0.svg',
      category: t('doc3Category'),
      title: t('doc3Title'),
      meta: t('doc3Meta')
    },
    {
      num: 4,
      icon: '/images/icons/figma/_32-document-pdf0.svg',
      category: t('doc4Category'),
      title: t('doc4Title'),
      meta: t('doc4Meta')
    }
  ];

  return (
    <section className="w-full bg-[#f3f7fc] py-8 sm:py-8 lg:py-8 border-y border-slate-200/60">
      <div className="page-container">
        {/* ── 4. SUB-SECTION HEADER BAR (TÀI LIỆU & CATALOGUE) ── */}
        <div className="flex items-center gap-2.5">
          <div className="h-5 sm:h-6 w-1 rounded-full bg-[#1769E2] shrink-0" />
          <h2 className="text-card-title font-bold text-slate-900 tracking-tight">
            {t('docsTitle')}
          </h2>
        </div>

        {/* ── 4 DOCUMENT CARDS GRID ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {docsData.map((doc) => (
            <DocCard
              key={doc.num}
              num={doc.num}
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

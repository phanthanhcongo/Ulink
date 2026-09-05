'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { NewsArticle } from './news-detail-data';
import { ResourcesNews } from '@/components/home';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface NewsDetailClientProps {
  article: NewsArticle;
  locale: string;
}

export function NewsDetailClient({ article, locale }: NewsDetailClientProps) {
  const localeLang = locale as 'vi' | 'en' | 'ja';

  return (
    <article className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <Breadcrumb
        items={[
          {
            label: localeLang === 'vi' ? 'Trang chủ' : localeLang === 'ja' ? 'ホーム' : 'Home',
            href: '/'
          },
          {
            label: localeLang === 'vi' ? 'Tin tức thị trường' : localeLang === 'ja' ? '市場ニュース' : 'Market News',
            href: '/news'
          },
          {
            label: article.title
          }
        ]}
        backLink={{
          label: localeLang === 'vi'
            ? 'Quay lại Tin tức'
            : localeLang === 'ja'
              ? 'ニュース一覧に戻る'
              : 'Back to News',
          href: '/news'
        }}
      />

      <header className="page-container">
        <div className="rounded-[3px] bg-white p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[3px] bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-100">
              {article.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug lg:leading-tight max-w-4xl">
            {article.title}
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-4xl">
            {article.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={article.authorAvatar}
                    alt={article.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="block font-bold text-slate-950">{article.author}</span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {article.authorRole}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start bg-slate-50 p-5 rounded-[3px] border border-slate-200/50">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-5 px-1">
              {localeLang === 'vi' ? 'Mục lục' : localeLang === 'ja' ? '目次' : 'Mục lục'}
            </h3>
            <nav className="flex flex-col gap-3">
              {article.content.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full flex items-center gap-3 p-3 text-left transition-all duration-200 rounded-[3px] border shadow-sm bg-white border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-900"
                >
                  <span className="h-7 w-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0 bg-slate-100 text-slate-400">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm tracking-tight leading-snug">{sec.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-[3px] border border-slate-200/80 shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-slate-100 shadow-sm mb-8">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-10">
              {article.content.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {sec.title}
                  </h2>
                  <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 font-normal">
                    {sec.body.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-[3px] bg-white border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-brand" />
                {localeLang === 'vi' ? 'Tác giả' : localeLang === 'ja' ? '著者' : 'Author'}
              </h3>
              <div className="flex flex-col items-center text-center">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border border-slate-200 mb-3">
                  <Image
                    src={article.authorAvatar}
                    alt={article.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-slate-900">{article.author}</span>
                <span className="text-xs text-slate-500 mt-0.5">{article.authorRole}</span>
              </div>
            </div>

            <div className="p-6 rounded-[3px] bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10" />
              <h3 className="text-base font-extrabold text-slate-955">
                {localeLang === 'vi' ? 'Cần tư vấn giải pháp?' : localeLang === 'ja' ? 'ソリューション相談' : 'Need solution consultation?'}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                {localeLang === 'vi'
                  ? 'Đội ngũ kỹ sư phòng sạch ULink sẵn sàng tư vấn mẫu sản phẩm và gửi báo giá chi tiết trong 24h.'
                  : localeLang === 'ja'
                    ? 'ULinkクリーンルームエンジニアリングチームが、24時間以内に製品サンプルの提案と詳細な見積書を提供します。'
                    : 'ULink cleanroom engineering team is ready to consult samples and send a detailed quote within 24 hours.'}
              </p>
              <Link
                href="/quick-order"
                className="mt-5 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-[3px] bg-brand hover:bg-brand-strong text-white text-xs font-bold shadow transition-colors"
              >
                {localeLang === 'vi' ? 'Yêu cầu Báo giá Ngay' : localeLang === 'ja' ? 'すぐに見積もりを依頼' : 'Request Quote Now'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <ResourcesNews />
        </div>
      </main>
    </article>
  );
}


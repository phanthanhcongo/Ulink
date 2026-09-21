'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/blog-data';
import { getTranslation } from '@/lib/blog-data';
import { ResourcesNews } from '@/components/home';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { resolveImageUrl } from '@/lib/image-url';

interface BlogDetailClientProps {
  post: BlogPost;
  locale: string;
}

export function BlogDetailClient({ post, locale }: BlogDetailClientProps) {
  const localeLang = locale as 'vi' | 'en' | 'ja';
  const t = getTranslation(post, locale);
  const coverUrl = resolveImageUrl(post.cover);
  const avatarUrl = resolveImageUrl(post.author_avatar);

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        locale === 'vi' ? 'vi-VN' : locale === 'ja' ? 'ja-JP' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )
    : '';

  return (
    <article className="min-h-screen bg-slate-50/50 pb-12 sm:pb-16 md:pb-20 pt-4 sm:pt-6 md:pt-8">
      <Breadcrumb
        items={[
          {
            label: localeLang === 'vi' ? 'Trang chủ' : localeLang === 'ja' ? 'ホーム' : 'Home',
            href: '/'
          },
          {
            label: localeLang === 'vi' ? 'Tin tức thị trường' : localeLang === 'ja' ? '市場ニュース' : 'Market News',
            href: '/resources'
          },
          { label: t.title }
        ]}
        backLink={{
          label: localeLang === 'vi' ? 'Quay lại Tin tức' : localeLang === 'ja' ? 'ニュース一覧に戻る' : 'Back to News',
          href: '/resources'
        }}
      />

      <header className="page-container">
        <div className="rounded-[3px] bg-white p-4 sm:p-6 md:p-8 lg:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

          {post.category && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-[3px] bg-blue-50 text-blue-700 text-xs sm:text-caption-responsive font-bold uppercase tracking-wider border border-blue-100">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug lg:leading-tight max-w-4xl">
            {t.title}
          </h1>

          {t.description && (
            <p className="mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-medium max-w-4xl">
              {t.description}
            </p>
          )}

          <div className="mt-5 sm:mt-6 md:mt-8 flex flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-6 border-t border-slate-100 pt-4 sm:pt-5 md:pt-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6 text-xs sm:text-caption-responsive text-slate-500 font-semibold">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="relative h-8 sm:h-9 w-8 sm:w-9 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={post.author || ''} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="block font-bold text-slate-950 text-xs sm:text-sm line-clamp-1">
                    {post.author || 'ULink Team'}
                  </span>
                  {post.author_role && (
                    <span className="block text-xs sm:text-caption-responsive text-slate-400 font-medium line-clamp-1">
                      {post.author_role}
                    </span>
                  )}
                </div>
              </div>
              {publishDate && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-brand shrink-0" />
                  <span className="text-xs sm:text-caption-responsive">{publishDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="page-container mt-6 sm:mt-8 md:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 md:gap-8 items-start">
          <div className="lg:col-span-8 lg:col-start-1 bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-[3px] border border-slate-200/80 shadow-sm">
            {coverUrl && (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-slate-100 shadow-sm mb-6 sm:mb-7 md:mb-8 lg:mb-10">
                <Image
                  src={coverUrl}
                  alt={t.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover object-center"
                />
              </div>
            )}

            {t.body && (
              <div
                className="prose prose-slate prose-sm sm:prose-base max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-base sm:prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                  prose-p:leading-relaxed prose-p:text-slate-700
                  prose-a:text-brand prose-a:font-semibold
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-img:rounded-[3px] prose-img:border prose-img:border-slate-100"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t.body || '') }}
              />
            )}
          </div>

          <aside className="lg:col-span-4 space-y-4 sm:space-y-5 md:space-y-6">
            <div className="p-4 sm:p-5 md:p-6 rounded-[3px] bg-white border border-slate-200/80 shadow-sm">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 uppercase tracking-wider mb-3 sm:mb-4 md:mb-5 border-b border-slate-100 pb-2 sm:pb-3 flex items-center gap-2">
                <User className="h-3 sm:h-4 w-3 sm:w-4 text-brand shrink-0" />
                {localeLang === 'vi' ? 'Tác giả' : localeLang === 'ja' ? '著者' : 'Author'}
              </h3>
              <div className="flex flex-col items-center text-center">
                <div className="relative h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 rounded-full overflow-hidden border border-slate-200 mb-2 sm:mb-3 bg-slate-100">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={post.author || ''} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      <User className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-900">
                  {post.author || 'ULink Team'}
                </span>
                {post.author_role && (
                  <span className="text-xs sm:text-caption-responsive text-slate-500 mt-0.5">
                    {post.author_role}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 rounded-[3px] bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-blue-500/5 rounded-full blur-2xl -z-10" />
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900">
                {localeLang === 'vi' ? 'Cần tư vấn giải pháp?' : localeLang === 'ja' ? 'ソリューション相談' : 'Need solution consultation?'}
              </h3>
              <p className="text-xs sm:text-caption-responsive text-slate-500 mt-1.5 sm:mt-2 leading-relaxed font-medium">
                {localeLang === 'vi'
                  ? 'Đội ngũ kỹ sư phòng sạch ULink sẵn sàng tư vấn mẫu sản phẩm và gửi báo giá chi tiết trong 24h.'
                  : localeLang === 'ja'
                    ? 'ULinkクリーンルームエンジニアリングチームが、24時間以内に製品サンプルの提案と詳細な見積書を提供します。'
                    : 'ULink cleanroom engineering team is ready to consult samples and send a detailed quote within 24 hours.'}
              </p>
              <Link
                href="/quick-order"
                className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 w-full py-2.5 sm:py-3 md:py-3.5 px-3 sm:px-4 rounded-[3px] bg-brand hover:bg-brand-strong text-white text-xs sm:text-caption-responsive md:text-sm font-bold shadow transition-colors"
              >
                {localeLang === 'vi' ? 'Yêu cầu Báo giá Ngay' : localeLang === 'ja' ? 'すぐに見積もりを依頼' : 'Request Quote Now'}
                <ArrowRight className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4" />
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

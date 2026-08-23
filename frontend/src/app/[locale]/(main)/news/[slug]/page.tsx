import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getNewsArticleBySlug } from '@/components/news/news-detail-data';
import { NewsDetailClient } from '@/components/news/news-detail-client';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return { title: locale === 'vi' ? 'Bài viết không tồn tại' : 'Article not found' };
  }

  return {
    title: `${article.title} | ULink B2B`,
    description: article.description
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <NewsDetailClient article={article} locale={locale} />;
}

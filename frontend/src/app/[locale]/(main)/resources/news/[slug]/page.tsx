import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { fetchBlogPostBySlug, getTranslation } from '@/lib/blog-data';
import { BlogDetailClient } from '@/components/news/blog-detail-client';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return { title: locale === 'vi' ? 'Bài viết không tồn tại' : 'Article not found' };
  }

  const t = getTranslation(post, locale);
  return {
    title: `${t.meta_title || t.title} | ULink B2B`,
    description: t.meta_description || t.description || ''
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const post = await fetchBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} locale={locale} />;
}

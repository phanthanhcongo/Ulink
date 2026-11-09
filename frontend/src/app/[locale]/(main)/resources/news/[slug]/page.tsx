import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { fetchBlogPostBySlug, getTranslation, type BlogPost } from '@/lib/blog-data';
import { BlogDetailClient } from '@/components/news/blog-detail-client';
import { getNewsArticleBySlug } from '@/components/news/news-detail-data';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

function resolvePost(post: BlogPost | null, slug: string, locale: string): BlogPost | null {
  if (post) return post;

  const staticArticle = getNewsArticleBySlug(slug);
  if (!staticArticle) return null;

  const bodyHtml = staticArticle.content
    .map((sec) => `<h2>${sec.title}</h2>${sec.body.map((p) => `<p>${p}</p>`).join('')}`)
    .join('');

  return {
    id: 999999,
    status: 'published',
    slug: staticArticle.slug,
    cover: staticArticle.coverImage,
    author: staticArticle.author,
    author_role: staticArticle.authorRole,
    author_avatar: staticArticle.authorAvatar,
    category: staticArticle.category,
    published_at: new Date('2026-07-22T08:00:00.000Z').toISOString(),
    translations: [
      {
        languages_code: locale,
        title: staticArticle.title,
        description: staticArticle.description,
        body: bodyHtml,
        meta_title: staticArticle.title,
        meta_description: staticArticle.description
      }
    ]
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const rawPost = await fetchBlogPostBySlug(slug);
  const post = resolvePost(rawPost, slug, locale);

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

  const rawPost = await fetchBlogPostBySlug(slug);
  const post = resolvePost(rawPost, slug, locale);

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} locale={locale} />;
}

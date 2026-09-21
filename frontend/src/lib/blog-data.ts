import { getDirectusUrl } from './directus-runtime.mjs';

export interface BlogPost {
  id: number;
  status: string;
  slug: string;
  cover: string | null;
  author: string | null;
  author_role: string | null;
  author_avatar: string | null;
  category: string | null;
  published_at: string | null;
  translations?: {
    languages_code: string;
    title: string;
    description: string | null;
    body: string | null;
    meta_title: string | null;
    meta_description: string | null;
  }[];
}

function getTranslation(post: BlogPost, locale: string) {
  const t = post.translations?.find((t) => t.languages_code === locale)
    || post.translations?.[0];
  return t || { title: '', description: '', body: '', meta_title: '', meta_description: '' };
}

export async function fetchBlogPosts(locale: string): Promise<BlogPost[]> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[status][_eq]': 'published',
    'fields[]': [
      'id', 'status', 'slug', 'cover', 'author', 'author_role', 'author_avatar',
      'category', 'published_at',
      'translations.languages_code', 'translations.title', 'translations.description',
      'translations.body', 'translations.meta_title', 'translations.meta_description'
    ].join(','),
    sort: '-published_at',
    limit: '-1'
  });

  const res = await fetch(`${url}/items/blog_posts?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    'fields[]': [
      'id', 'status', 'slug', 'cover', 'author', 'author_role', 'author_avatar',
      'category', 'published_at',
      'translations.languages_code', 'translations.title', 'translations.description',
      'translations.body', 'translations.meta_title', 'translations.meta_description'
    ].join(','),
    limit: '1'
  });

  const res = await fetch(`${url}/items/blog_posts?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] || null;
}

export { getTranslation };

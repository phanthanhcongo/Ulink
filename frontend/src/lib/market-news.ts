import { getDirectusUrlClient } from '@/lib/directus-runtime.mjs';

export interface MarketNewsItem {
  slug: string;
  date: string;
  title: string;
  description: string;
  image: string;
  /** Distinguishing label (badge) shown on the card, e.g. "Tin thị trường". */
  badge: string;
  author: { name: string; role: string; avatar: string };
}

const FALLBACK_IMAGE = '/images/home/news/image (9).png';
const FALLBACK_AVATAR = '/images/home/section5/image (1).png';

function pickTr(tr: any[] | undefined, field: string, locale: string): string {
  if (!tr?.length) return '';
  const by = (l: string) => tr.find((t) => t.languages_code === l)?.[field];
  return by(locale) || by('vi') || by('en') || '';
}

function formatDate(iso: string | null, locale: string): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'vi-VN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

/**
 * Client-side fetch of "Market News" (Tin tức thị trường) posts from Directus.
 * These are blog_posts flagged with category = 'market-news' and carry a
 * localized `badge` label to distinguish them from regular case-study articles.
 * Returns [] on any failure so callers can fall back to static content.
 */
export async function fetchMarketNews(locale: string, limit = 4): Promise<MarketNewsItem[]> {
  try {
    const base = getDirectusUrlClient();
    const params = new URLSearchParams();
    params.set('filter[status][_eq]', 'published');
    params.set('filter[category][_eq]', 'market-news');
    [
      'slug',
      'cover',
      'badge',
      'author',
      'author_role',
      'author_avatar',
      'published_at',
      'translations.languages_code',
      'translations.title',
      'translations.description',
      'translations.badge'
    ].forEach((f) => params.append('fields[]', f));
    params.set('sort', '-published_at');
    params.set('limit', String(limit));

    const res = await fetch(`${base}/items/blog_posts?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const rows: any[] = json?.data || [];

    return rows.map((row) => {
      const cover = typeof row.cover === 'string' ? row.cover.trim() : '';
      const image = cover.startsWith('/') ? cover : FALLBACK_IMAGE;
      const avatar =
        typeof row.author_avatar === 'string' && row.author_avatar.startsWith('/')
          ? row.author_avatar
          : FALLBACK_AVATAR;
      return {
        slug: row.slug || '',
        date: formatDate(row.published_at, locale),
        title: pickTr(row.translations, 'title', locale),
        description: pickTr(row.translations, 'description', locale),
        badge: pickTr(row.translations, 'badge', locale) || row.badge || '',
        image,
        author: {
          name: row.author || 'ULink',
          role: row.author_role || '',
          avatar
        }
      };
    });
  } catch {
    return [];
  }
}

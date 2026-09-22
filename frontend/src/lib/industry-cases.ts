import { readItems } from '@directus/sdk';
import { publicDirectus } from '@/lib/directus';

export interface IndustryCase {
  title: string;
  description: string;
  image: string;
  badge: string;
  slug: string;
}

// Canonical industry-page slug → Directus industries.slug
const INDUSTRY_DB_SLUG: Record<string, string> = {
  electronics: 'dien-tu',
  'pharmaceutical-cosmetics': 'duoc-pham',
  'food-beverage': 'thuc-pham',
  logistics: 'kho-logistics',
  furniture: 'noi-that',
  construction: 'co-khi-hvac'
};

export function toIndustryDbSlug(canonicalSlug: string): string | undefined {
  return INDUSTRY_DB_SLUG[canonicalSlug];
}

/**
 * Fetch case-study cards for an industry from Directus blog_posts
 * (linked via blog_posts.industry). Accepts either the canonical
 * industry-page slug (e.g. "food-beverage") or the DB slug ("thuc-pham").
 * Returns [] on any failure so callers can fall back to static content.
 */
export async function fetchCaseStudiesByIndustry(
  industrySlug: string,
  locale: string
): Promise<IndustryCase[]> {
  const dbSlug = INDUSTRY_DB_SLUG[industrySlug] || industrySlug;

  try {
    const rows = (await publicDirectus.request(
      readItems('blog_posts' as any, {
        filter: {
          status: { _eq: 'published' },
          industry: { slug: { _eq: dbSlug } }
        },
        fields: [
          'id', 'slug', 'cover', 'badge',
          'translations.languages_code',
          'translations.title',
          'translations.description',
          'translations.badge'
        ],
        sort: ['id'],
        limit: -1
      } as any)
    )) as any[];

    if (!rows?.length) return [];

    const pick = (row: any, field: string): string => {
      const tr = row.translations || [];
      const byLoc = (l: string) => tr.find((t: any) => t.languages_code === l)?.[field];
      return byLoc(locale) || byLoc('vi') || byLoc('en') || row[field] || '';
    };

    return rows.map((row) => {
      const cover = typeof row.cover === 'string' ? row.cover.trim() : '';
      const image = cover.startsWith('/') ? cover : '/images/resources/autohtml/thumb0.png';
      return {
        title: pick(row, 'title'),
        description: pick(row, 'description'),
        badge: pick(row, 'badge'),
        image,
        slug: row.slug || ''
      };
    });
  } catch (err) {
    console.error(`Failed to fetch industry cases for ${dbSlug}:`, err);
    return [];
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/product-data';
import { getTranslatedName } from '@/lib/i18n-content';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q')?.trim() || '';
  const locale = searchParams.get('locale') || 'vi';
  const limit = Math.min(Number(searchParams.get('limit') || '6'), 10);

  if (!q || q.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { products } = await fetchProducts({ search: q, limit });

    const results = products.map((p) => {
      const heroUrl = p.hero
        ? `${getDirectusUrl()}/assets/${p.hero}?width=80&height=80&fit=cover`
        : null;

      return {
        id: p.id,
        name: getTranslatedName(p, locale) || p.name,
        slug: p.slug,
        image: heroUrl,
        categoryName:
          typeof p.category === 'object' && p.category !== null
            ? getTranslatedName(p.category as any, locale) || (p.category as any).name
            : '',
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('[api/products/search] Error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

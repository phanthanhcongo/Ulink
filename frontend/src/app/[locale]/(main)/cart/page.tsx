import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchProducts } from '@/lib/product-data';
import { getTranslatedName, getTranslatedField } from '@/lib/i18n-content';
import CartClient from '@/components/cart/cart-client';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cartPage' });
  return {
    title: `${t('title')} | ULink B2B`,
    description: t('title')
  };
}

export default async function CartPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const user = await getCurrentUser();
  const t = await getTranslations({ locale, namespace: 'cartPage' });

  // Fetch all products to resolve cart item images/metadata
  const { products: allDbProducts } = await fetchProducts({ limit: 100 });
  const dbProductMap: Record<string, { hero: string | null; slug: string }> = {};

  for (const prod of allDbProducts) {
    dbProductMap[prod.slug] = { hero: prod.hero || null, slug: prod.slug };
    if (prod.skus) {
      for (const s of prod.skus) {
        dbProductMap[s.sku_code] = { hero: prod.hero || null, slug: prod.slug };
      }
    }
  }

  // Fetch real suggested products dynamically from Directus DB
  const suggestedProducts = allDbProducts.slice(0, 4).map((prod) => {
    const sku = (prod.skus ?? []).find((s: any) => s.status === 'published') || (prod.skus ?? [])[0];
    const skuCode = sku ? sku.sku_code : prod.slug.toUpperCase();
    const unitLabel = sku?.unit || (locale === 'vi' ? 'kg' : 'kg');

    let priceText = locale === 'vi' ? 'Liên hệ báo giá' : 'Contact for quote';
    if (sku?.price) {
      const priceVal = Number(sku.price) || 0;
      priceText = locale === 'vi'
        ? `${new Intl.NumberFormat('vi-VN').format(priceVal)}đ / ${unitLabel}`
        : `$${(priceVal / 25000).toFixed(2)} / ${unitLabel}`;
    }

    const hub =
      prod.slug.includes('glove') || prod.slug.includes('latex')
        ? locale === 'vi'
          ? 'Hub Bình Dương, Việt Nam'
          : 'Binh Duong Hub, Vietnam'
        : locale === 'vi'
          ? 'Hub Hà Nam, Việt Nam'
          : 'Ha Nam Hub, Vietnam';

    const moqVal = sku?.pack_size ? parseInt(sku.pack_size, 10) || 500 : 500;
    const moqText = locale === 'vi' ? `MOQ: ${moqVal} ${unitLabel}` : `MOQ: ${moqVal} ${unitLabel}`;

    const imageUrl = prod.hero
      ? (prod.hero.startsWith('http') || prod.hero.startsWith('/'))
        ? prod.hero
        : resolveImageUrl(prod.hero)
      : undefined;

    return {
      id: prod.id,
      sku: skuCode,
      slug: prod.slug,
      name: getTranslatedName(prod, locale) || prod.name,
      priceText,
      unit: unitLabel,
      moq: moqVal,
      moqText,
      desc: getTranslatedField(prod, 'short_description', locale) || '',
      hub,
      hero: imageUrl || null
    };
  });

  return (
    <section className="relative overflow-hidden bg-white min-h-screen py-4 sm:py-6 lg:py-8">
      <CartClient
        user={user}
        locale={locale}
        suggestedProducts={suggestedProducts}
        dbProductMap={dbProductMap}
      />
    </section>
  );
}

import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchProducts } from '@/lib/product-data';
import { fetchOrderById, type DetailedOrder } from '@/lib/order-data';
import OrderConfirmationClient from '@/components/order-confirmation/order-confirmation-client';

type Props = {
  params: { locale: string };
  searchParams?: { orderId?: string; order_id?: string; code?: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'orderConfirmationPage' });
  return {
    title: `${t('title')} | ULink B2B`,
    description: t('title')
  };
}

export default async function OrderConfirmationPage({ params: { locale }, searchParams }: Props) {
  setRequestLocale(locale);

  const user = await getCurrentUser();

  const rawOrderId = searchParams?.orderId || searchParams?.order_id || searchParams?.code || '';
  const orderData = rawOrderId ? await fetchOrderById(rawOrderId) : null;

  // Fetch products to map thumbnails
  const { products: allDbProducts } = await fetchProducts({ limit: 100 });
  const dbProductMap: Record<string, { hero: string | null; slug: string }> = {};

  for (const prod of allDbProducts) {
    const hero = prod.hero || null;
    if (hero) {
      dbProductMap[prod.slug] = { hero, slug: prod.slug };
      dbProductMap[prod.name] = { hero, slug: prod.slug };
      dbProductMap[prod.name.trim().toLowerCase()] = { hero, slug: prod.slug };
    }
    if (prod.skus) {
      for (const s of prod.skus) {
        const skuHero = s.hero || hero;
        if (skuHero) {
          dbProductMap[s.sku_code] = { hero: skuHero, slug: prod.slug };
          if (s.name) dbProductMap[s.name] = { hero: skuHero, slug: prod.slug };
          if (s.id != null) dbProductMap[String(s.id)] = { hero: skuHero, slug: prod.slug };
        }
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-white min-h-screen pt-2 pb-12">
      <OrderConfirmationClient
        user={user}
        locale={locale}
        dbProductMap={dbProductMap}
        orderData={orderData}
      />
    </section>
  );
}


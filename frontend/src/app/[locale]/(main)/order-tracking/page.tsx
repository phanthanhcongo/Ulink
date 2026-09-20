import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchProducts } from '@/lib/product-data';
import { fetchAllOrders, fetchOrderById } from '@/lib/order-data';
import OrderTrackingClient from '@/components/order-tracking/order-tracking-client';

type Props = {
  params: { locale: string };
  searchParams?: { orderId?: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'orderTrackingPage' });
  return {
    title: `Danh sách & Tra cứu đơn hàng | ULink B2B`,
    description: t('title')
  };
}

export default async function OrderTrackingPage({ params: { locale }, searchParams }: Props) {
  setRequestLocale(locale);

  const user = await getCurrentUser();
  const rawOrderId = searchParams?.orderId || '';

  const [allOrders, initialOrder] = await Promise.all([
    fetchAllOrders(50),
    rawOrderId ? fetchOrderById(rawOrderId) : Promise.resolve(null)
  ]);

  // Fetch products to map thumbnails
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

  return (
    <section className="relative overflow-hidden bg-slate-50/50 min-h-screen pt-2 pb-12">
      <OrderTrackingClient
        user={user}
        locale={locale}
        dbProductMap={dbProductMap}
        initialOrder={initialOrder}
        allOrders={allOrders}
      />
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { setRequestLocale } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { cookies } from 'next/headers';
import { VMIDashboardClient } from '@/components/admin/vmi-dashboard-client';

async function getSessionClient() {
  const store = await cookies();
  const session = store.get('directus_session_token')?.value;
  const refresh = store.get('directus_refresh_token')?.value;

  if (!session) return createWriteDirectusClient();

  const cookieFetch: typeof globalThis.fetch = (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set(
      'cookie',
      `directus_session_token=${session}${refresh ? `; directus_refresh_token=${refresh}` : ''}`
    );
    return globalThis.fetch(input, { ...init, headers });
  };

  return createDirectus<Schema>(process.env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055', {
    globals: { fetch: cookieFetch }
  }).with(rest());
}

export default async function AdminDashboardPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const user = await getCurrentUser();
  let orders: any[] = [];
  let inventory: any[] = [];
  let skus: any[] = [];
  let hubs: any[] = [];
  let rfqs: any[] = [];

  try {
    const client = await getSessionClient();
    const results = await Promise.allSettled([
      client.request(
        readItems('orders' as any, {
          fields: ['id', 'code', 'status', 'order_date', 'total', 'customer.name', 'customer.email'],
          sort: ['-order_date', '-id'],
          limit: -1
        } as any)
      ),
      client.request(
        readItems('inventory_stock' as any, {
          fields: [
            'id', 'quantity_on_hand', 'quantity_reserved', 'reorder_level',
            'hub.id', 'hub.name',
            'sku.id', 'sku.sku_code', 'sku.stock_status',
            'sku.product.name'
          ],
          limit: -1
        } as any)
      ),
      client.request(
        readItems('product_skus' as any, {
          fields: ['id', 'sku_code', 'stock_status', 'product.name', 'unit'],
          filter: { status: { _neq: 'archived' } },
          limit: -1
        } as any)
      ),
      client.request(
        readItems('regional_hubs' as any, {
          fields: ['id', 'name', 'operating_status'],
          limit: -1
        } as any)
      ),
      client.request(
        readItems('rfq_requests' as any, {
          fields: ['id', 'status', 'date_created'],
          sort: ['-date_created'],
          limit: -1
        } as any)
      )
    ]);

    if (results[0].status === 'fulfilled') orders = results[0].value || [];
    if (results[1].status === 'fulfilled') inventory = results[1].value || [];
    if (results[2].status === 'fulfilled') skus = results[2].value || [];
    if (results[3].status === 'fulfilled') hubs = results[3].value || [];
    if (results[4].status === 'fulfilled') rfqs = results[4].value || [];
  } catch {
    // Data will be empty arrays, dashboard shows zeros
  }

  return <VMIDashboardClient user={user} orders={orders} inventory={inventory} skus={skus} hubs={hubs} rfqs={rfqs} />;
}

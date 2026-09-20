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
          fields: ['quantity_on_hand', 'hub.name'],
          limit: -1
        } as any)
      )
    ]);

    if (results[0].status === 'fulfilled') orders = results[0].value || [];
    if (results[1].status === 'fulfilled') inventory = results[1].value || [];
  } catch {
    // Fallback to default mock data inside VMIDashboardClient if backend fetch fails
  }

  return <VMIDashboardClient user={user} orders={orders} inventory={inventory} />;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, readItems, rest } from '@directus/sdk';
import { cookies } from 'next/headers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import OrdersClient from '@/components/admin/orders-client';

async function getClient() {
  const store = await cookies();
  const token = store.get('directus_session_token')?.value;
  if (!token) return createWriteDirectusClient();
  const cookieFetch: typeof globalThis.fetch = (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set('cookie', `directus_session_token=${token}`);
    return globalThis.fetch(input, { ...init, headers });
  };
  return createDirectus<Schema>(getDirectusUrl(), { globals: { fetch: cookieFetch } }).with(rest());
}

export default async function AdminOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await getCurrentUser())) redirect({ href: '/login', locale });
  let orders: any[] = [];
  let error = '';
  try {
    const client = await getClient();
    orders = await client.request(readItems('orders' as any, {
      fields: ['id', 'code', 'status', 'order_date', 'subtotal', 'tax', 'total', 'notes', 'customer.id', 'customer.name', 'customer.email', 'items.id', 'items.sku.sku_code', 'items.description', 'items.qty', 'items.unit_price', 'items.line_total'],
      sort: ['-order_date', '-id'], limit: -1
    } as any)) as any[];
  } catch (err) { error = err instanceof Error ? err.message : 'Không thể tải danh sách order'; }
  return <OrdersClient initialOrders={orders} error={error} />;
}

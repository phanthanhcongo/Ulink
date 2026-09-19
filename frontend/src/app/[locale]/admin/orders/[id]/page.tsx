/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, readItem, readItems, rest } from '@directus/sdk';
import { cookies } from 'next/headers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import OrderDetailClient from '@/components/admin/order-detail-client';

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

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!(await getCurrentUser())) redirect({ href: '/login', locale });

  let order: any = null;
  let payments: any[] = [];
  let auditLog: any[] = [];
  let error = '';

  try {
    const client = await getClient();
    order = await client.request(readItem('orders' as any, Number(id), {
      fields: [
        'id', 'code', 'status', 'payment_status', 'order_date', 'subtotal', 'tax', 'total', 'notes',
        'customer.id', 'customer.company_name', 'customer.email', 'customer.phone',
        'items.id', 'items.sku.sku_code', 'items.description', 'items.qty', 'items.unit_price', 'items.line_total'
      ]
    } as any));

    if (order) {
      const [paymentsResult, auditResult] = await Promise.allSettled([
        client.request(readItems('payments' as any, {
          filter: { order: { _eq: Number(id) } },
          fields: ['id', 'amount', 'currency', 'payment_method', 'vnp_txn_ref', 'vnp_trans_id', 'status', 'response_code', 'paid_at', 'date_created', 'metadata'],
          sort: ['-date_created'], limit: 50
        } as any)),
        client.request(readItems('payment_audit_log' as any, {
          filter: { payment: { _in: [] } },
          fields: ['id', 'payment', 'event_type', 'status_from', 'status_to', 'actor', 'date_created', 'details'],
          sort: ['-date_created'], limit: 100
        } as any))
      ]);

      if (paymentsResult.status === 'fulfilled') {
        payments = paymentsResult.value as any[] || [];
        // Now fetch audit logs for those payment IDs
        if (payments.length > 0) {
          const paymentIds = payments.map((p: any) => p.id);
          try {
            auditLog = await client.request(readItems('payment_audit_log' as any, {
              filter: { payment: { _in: paymentIds } },
              fields: ['id', 'payment', 'event_type', 'status_from', 'status_to', 'actor', 'date_created', 'details'],
              sort: ['-date_created'], limit: 100
            } as any)) as any[];
          } catch { /* audit log may not exist yet */ }
        }
      }
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Không thể tải thông tin order';
  }

  if (!order && !error) error = 'Order không tồn tại';

  return <OrderDetailClient order={order} payments={payments} auditLog={auditLog} error={error} locale={locale} />;
}

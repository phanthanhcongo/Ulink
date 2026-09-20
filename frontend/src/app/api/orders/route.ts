import { createItem, readItems } from '@directus/sdk';
import { getCurrentUser, getRequestCookieHeader } from '@/lib/auth-helpers';
import { createSessionDirectusClient, createWriteDirectusClient } from '@/lib/directus';
import { submitOrder, type OrderInput } from '@/lib/order-submit';
import { fetchOrderById } from '@/lib/order-data';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (!code) {
      return Response.json({ error: 'Missing code' }, { status: 400 });
    }
    const order = await fetchOrderById(code);
    return Response.json({ order });
  } catch (error) {
    console.error('[GET /api/orders] error:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderInput;
    const user = await getCurrentUser();
    const client = user ? createSessionDirectusClient(getRequestCookieHeader(req)) : createWriteDirectusClient(process.env.DIRECTUS_TOKEN);
    if (user && body.userId) {
      try {
        const customers = await client.request(readItems('customers' as any, { filter: { user: { _eq: String(body.userId) } }, limit: 1, fields: ['id'] } as any));
        body.userId = (customers as any[])[0]?.id ?? null;
      } catch { body.userId = null; }
    }
    const result = await submitOrder(body, {
      create: async (collection, data) => {
        const operation = collection === 'orders' ? (createItem as any)('orders', data) : (createItem as any)('order_items', data);
        return client.request(operation as never) as Promise<{ id: string | number; code?: string }>;
      },
      findSkuId: async (sku) => {
        const byCode = await client.request(readItems('product_skus', { filter: { sku_code: { _eq: sku } }, limit: 1, fields: ['id'] }));
        if ((byCode as any[])[0]?.id) return (byCode as any[])[0].id;
        const bySlug = await client.request(readItems('product_skus', { filter: { product: { slug: { _eq: sku } } }, limit: 1, fields: ['id'] }));
        return (bySlug as any[])[0]?.id ?? null;
      }
    });
    return Response.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/orders] error:', error);
    const message = error instanceof Error ? error.message : typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : JSON.stringify(error);
    const status = /required|empty|unknown sku/i.test(message) ? 400 : 502;
    return Response.json({ error: { message } }, { status });
  }
}

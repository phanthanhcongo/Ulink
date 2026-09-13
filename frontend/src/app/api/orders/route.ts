import { createItem, readItems } from '@directus/sdk';
import { getCurrentUser, getRequestCookieHeader } from '@/lib/auth-helpers';
import { createSessionDirectusClient, createWriteDirectusClient } from '@/lib/directus';
import { submitOrder, type OrderInput } from '@/lib/order-submit';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderInput;
    const user = await getCurrentUser();
    const client = user ? createSessionDirectusClient(getRequestCookieHeader(req)) : createWriteDirectusClient();
    const result = await submitOrder(body, {
      create: async (collection, data) => {
        const operation = collection === 'orders' ? (createItem as any)('orders', data) : (createItem as any)('order_items', data);
        return client.request(operation as never) as Promise<{ id: string | number; code?: string }>;
      },
      findSkuId: async (sku) => {
        const rows = await client.request(readItems('product_skus', { filter: { sku_code: { _eq: sku } }, limit: 1, fields: ['id'] }));
        return (rows as Array<{ id: string | number }>)[0]?.id ?? null;
      }
    });
    return Response.json({ data: result }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create order';
    const status = /required|empty|unknown sku/i.test(message) ? 400 : 502;
    return Response.json({ error: { message } }, { status });
  }
}

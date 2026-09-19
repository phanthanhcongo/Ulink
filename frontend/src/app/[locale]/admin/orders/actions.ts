'use server';
import { updateItem, readItems, createItem } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { createAuthenticatedDirectusClient } from '@/lib/directus';
import { getCurrentUser } from '@/lib/auth-helpers';
export async function updateOrderStatus(id: number, status: string) {
  if (!(await getCurrentUser())) throw new Error('Unauthorized');
  const allowed = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled', 'payment_required', 'payment_failed', 'payment_expired'];
  if (!allowed.includes(status)) throw new Error('Invalid status');
  const client = await createAuthenticatedDirectusClient();
  await client.request(updateItem('orders' as any, id, { status } as any));
  revalidatePath('/[locale]/admin/orders', 'page');
}

export async function cancelOrder(id: number) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  const client = await createAuthenticatedDirectusClient();
  const orderItems: any[] = await client.request(readItems('inventory_movements' as any, { filter: { _and: [{ order_id: { _eq: id } }, { movement_type: { _eq: 'outbound' } }] }, limit: -1 } as any));
  for (const movement of orderItems) {
    const stocks: any[] = await client.request(readItems('inventory_stock' as any, { filter: { _and: [{ sku: { _eq: movement.sku } }, { hub: { _eq: movement.hub } }] }, limit: 1 } as any));
    const stock = stocks[0];
    if (!stock) continue;
    const before = Number(stock.quantity_on_hand || 0); const delta = Math.abs(Number(movement.quantity_delta || 0)); const after = before + delta;
    await client.request(updateItem('inventory_stock' as any, stock.id, { quantity_on_hand: after } as any));
    await client.request(createItem('inventory_movements' as any, { sku: movement.sku, hub: movement.hub, movement_type: 'return', quantity_delta: delta, quantity_before: before, quantity_after: after, order_id: id, performed_by: user.id, note: 'Hoàn tồn do hủy order' } as any));
  }
  await client.request(updateItem('orders' as any, id, { status: 'cancelled' } as any));
  revalidatePath('/[locale]/admin/orders', 'page'); revalidatePath('/[locale]/admin/inventory', 'page'); revalidatePath('/[locale]/admin', 'page');
}
